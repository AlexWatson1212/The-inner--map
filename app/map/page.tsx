import type { Metadata } from "next";
import { MapBuilder, type FocusKey } from "../components/map-builder";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Your first signal map",
  description: "Map one moment, notice the conditions around it and choose one small experiment.",
};

const validFocuses: FocusKey[] = ["capacity", "starting", "overload", "recovery", "connection", "identity", "cost"];

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; focus?: string }>;
}) {
  const params = await searchParams;
  const initialMode = params.mode === "low" ? "low" : "standard";
  const initialFocus = validFocuses.includes(params.focus as FocusKey)
    ? (params.focus as FocusKey)
    : "capacity";

  return (
    <SiteShell>
      <main id="main-content">
        <section className="page-hero page-hero--tool">
          <div className="shell tool-hero-grid">
            <div>
              <p className="eyebrow">Your first signal map</p>
              <h1>Turn one difficult moment into useful information.</h1>
            </div>
            <div className="privacy-ticket">
              <span className="signal-dot" aria-hidden="true" />
              <div>
                <p className="mini-label">Private by design</p>
                <p>
                  Nothing you enter is sent, saved to an account or stored after
                  this tab closes. Avoid names or details you would not want on screen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="tool-section">
          <div className="shell">
            <MapBuilder initialMode={initialMode} initialFocus={initialFocus} />
          </div>
        </section>

        <section className="section tool-aftercare">
          <div className="shell tool-aftercare-grid">
            <div>
              <p className="eyebrow">A stopping point</p>
              <h2>Your map does not need to be complete to be useful.</h2>
            </div>
            <div>
              <p>
                One specific example is more useful than forcing a final explanation.
                You can save the summary, take it into therapy or simply notice whether
                the experiment changes anything.
              </p>
              <a className="text-link" href="/approach">See how maps build over time <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
