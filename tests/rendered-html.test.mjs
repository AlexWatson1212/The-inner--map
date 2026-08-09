import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchRoute(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders every primary route", async () => {
  const routes = [
    "/",
    "/start",
    "/map",
    "/map?mode=low",
    "/approach",
    "/evidence",
    "/about",
    "/privacy",
    "/accessibility",
  ];

  for (const route of routes) {
    const response = await fetchRoute(route);
    const html = await response.text();

    assert.equal(response.status, 200, `${route} should return 200`);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      `${route} should return HTML`,
    );
    assert.match(html, /The Inner Map/i, `${route} should include the brand name`);
    assert.match(html, /<h1\b/i, `${route} should include one primary heading`);
    assert.match(html, developmentPreviewMeta, `${route} should include preview metadata`);
  }
});

test("renders the low-capacity route from the query string", async () => {
  const response = await fetchRoute("/map?mode=low");
  const html = await response.text();

  assert.match(html, /30-second version/i);
  assert.match(html, /What might reduce the next ten minutes\?/i);
});

test("returns a useful not-found page", async () => {
  const response = await fetchRoute("/this-route-does-not-exist");
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /The page could not be found/i);
  assert.match(html, /Return home/i);
});
