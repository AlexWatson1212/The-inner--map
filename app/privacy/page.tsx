import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How The Inner Map handles reflection content and basic website data.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="legal-hero">
          <div className="shell legal-hero__inner">
            <p className="eyebrow">Privacy</p>
            <h1>Your reflection belongs to you.</h1>
            <p>Last reviewed: 9 August 2026</p>
          </div>
        </section>

        <section className="section legal-section">
          <div className="shell legal-layout">
            <aside aria-label="Page summary">
              <p className="mini-label">In plain language</p>
              <p>The mapping tool does not send or save what you type. Closing or reloading the tab clears it.</p>
            </aside>
            <div className="legal-copy">
              <h2>Reflection content</h2>
              <p>
                Text, selections and summaries created in the First Signal Map are processed
                only in your browser. They are not submitted to The Inner Map, stored in a
                database or attached to an account. The copy, download and print controls act
                on your device.
              </p>
              <p>
                Because anything visible on a screen can be seen by someone with access to
                that screen, avoid entering names, identifying information or details you
                would not want another person nearby to read.
              </p>

              <h2>Accounts, analytics and marketing</h2>
              <p>
                This version has no user accounts, advertising trackers, email capture,
                marketing pixels or behavioural analytics. It does not deliberately set
                non-essential cookies.
              </p>

              <h2>Technical information</h2>
              <p>
                Like most websites, the hosting service may process limited technical
                information needed to deliver and protect the site, such as an IP address,
                browser type, requested page, timestamp and security logs. Reflection content
                typed into the mapping tool is not part of those requests.
              </p>

              <h2>External links</h2>
              <p>
                Evidence and support pages link to external organisations. Their privacy
                practices apply after you follow a link to their site.
              </p>

              <h2>Changes</h2>
              <p>
                This notice will be revised before adding analytics, forms, accounts, email
                services or any feature that changes how personal information is handled.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
