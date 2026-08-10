# The Inner Map — version three

This folder is the complete, publishable website. It is plain HTML, one CSS file and a handful of
small JavaScript files. There is no build step, no framework and no dependencies.

## Publish it

1. In your GitHub repository, remove the files currently there.
2. Upload the **contents of this folder** (not the folder itself), including `.nojekyll`.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**.
4. Open the temporary Pages address and test: the homepage, Start Here, Your Map, My day, the
   "Very little capacity" route, and the mobile menu.
5. Only after that passes, add `theinnermap.co.uk` as the custom domain and update DNS as
   GitHub instructs.

Do not add a `CNAME` file until you are ready to move the custom domain.

### A note about paths

All page and asset links are **relative**, so the site works correctly at a domain root
(`theinnermap.co.uk`) *and* at a project subpath (`username.github.io/repo/`). Version one used
root-absolute paths, which broke when previewed at the temporary Pages address.

The one exception is `404.html`. GitHub Pages serves it for any missing path, so its links have to
be root-absolute (`/start/`). That means the 404 page's links only resolve correctly once the site
is at a domain root. This is expected and is the standard trade-off.

## What is included

```
index.html                  Homepage
start/                      Start here — six doorways plus the low-capacity route
map/                        The First Signal Map (the interactive tool)
today/                      My day — the optional day-shaping flow
approach/                   The method and the eight lenses
evidence/                   Evidence key, how terms are used, source register, change log
about/                      About the project
privacy/                    Privacy notice
accessibility/              Accessibility statement
404.html                    Not found
offline.html                Shown when a page is unavailable; can open a saved day
assets/css/site.css         The whole stylesheet
assets/js/site.js           Mobile navigation only
assets/js/signal-map.js     The mapping tool
assets/js/today.js          My day
assets/js/local-store.js    Opt-in localStorage wrapper (shared)
assets/js/export-prompt.js  Builds the optional ChatGPT prompt (shared)
assets/js/register-sw.js    Registers the service worker
sw.js                       Service worker: offline shell and fallbacks
manifest.webmanifest        Web app manifest
brand/                      Logos, app icons and the social-sharing image
favicon.svg, robots.txt, sitemap.xml, .nojekyll
CHANGELOG-v2.md             What changed from version one and why
CHANGELOG-v3.md             What changed in version three and why
SOURCE-REGISTER.md          Claim-by-claim source list with limitations
```

## Editing it

- **Copy changes:** edit the HTML directly. Every page is readable, indented HTML.
- **Design tokens:** the palette, type and radii live in the `:root` block at the top of
  `assets/css/site.css`. Changing a token changes the whole site.
- **Tool questions:** the options are plain HTML in `map/index.html` and `today/index.html`. Adding
  a `<label class="choice-card">` or a `<label class="condition-chip">` is enough; the JavaScript
  reads `data-label` for the summary, the draft and the export prompt, and needs no changes.
- **My day's suggestions:** the recovery wording chosen for each hidden cost lives in
  `RECOVERY_BY_COST` at the top of `assets/js/today.js`, and the card roles and placeholder text
  live in `seedCards()` just below it.
- **The export prompts:** the shared preamble and boundary lines are in
  `assets/js/export-prompt.js`; what each tool asks for is in its own file (`buildExport()` in
  `today.js`, `buildExportPrompt()` in `signal-map.js`).
- **Sources:** add a new `<article class="source-item">` in `evidence/index.html`, and add a line to
  the change log at the bottom of the same page. Keep the "What it supports here" and "What it does
  not support" pair — that structure is the point.

## Review dates

Two dates are written into the site and should be kept current:

- `evidence/index.html` — "Evidence page last reviewed" and "Next planned review".
- `privacy/index.html` and `accessibility/index.html` — "Last reviewed".

## Privacy behaviour to preserve

Nothing on this site is ever transmitted. There is no server, no account and no analytics.

- **The First Signal Map holds everything in memory.** It does not use `localStorage`,
  `sessionStorage`, cookies or any network request. Keep it that way.
- **My day is memory-only until the person opts in.** `assets/js/local-store.js` refuses every write
  until saving is switched on, and deletes what it holds when saving is switched off. Do not add a
  write that bypasses it, and do not default it to on.
- **The service worker caches the site's own files only.** Nothing a person writes should ever pass
  through it.
- **The ChatGPT export is text on a screen.** It must stay something the person copies deliberately,
  never something the site sends.

If any of this changes, `privacy/index.html` has to change with it. It makes specific promises.

## Changing the service worker

`sw.js` names its cache at the top (`VERSION`). Bump that string whenever the shell changes, or
returning visitors will keep the old files. The list of precached paths is directly below it; add
new pages there.
