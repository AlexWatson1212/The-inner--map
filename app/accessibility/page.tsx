import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "The accessibility decisions and current limitations of The Inner Map.",
};

export default function AccessibilityPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="legal-hero">
          <div className="shell legal-hero__inner">
            <p className="eyebrow">Accessibility</p>
            <h1>Designed to reduce unnecessary effort.</h1>
            <p>Last reviewed: 9 August 2026</p>
          </div>
        </section>

        <section className="section legal-section">
          <div className="shell legal-layout">
            <aside aria-label="Accessibility aim">
              <p className="mini-label">The aim</p>
              <p>To work towards WCAG 2.2 AA while also considering fluctuating attention, sensory load and capacity.</p>
            </aside>
            <div className="legal-copy">
              <h2>What has been built in</h2>
              <ul>
                <li>Semantic headings, landmarks, labels and keyboard-operable controls</li>
                <li>A visible skip link and clear focus indicators</li>
                <li>Responsive layouts that reflow without horizontal scrolling at common widths</li>
                <li>Strong text contrast and information that does not rely on colour alone</li>
                <li>No autoplay, flashing, parallax, pop-ups or continuously moving content</li>
                <li>Reduced-motion support for people who request it in their device settings</li>
                <li>A 30-second, low-capacity alternative to the longer mapping tool</li>
                <li>Plain-language summaries and explicit stopping points</li>
              </ul>

              <h2>Text and zoom</h2>
              <p>
                Text uses relative sizing and should remain usable when enlarged. The layout
                is designed to reflow on mobile and at increased browser zoom rather than
                requiring two-dimensional scrolling.
              </p>

              <h2>Known limitations</h2>
              <p>
                The site has been checked with automated and keyboard-based tests, but those
                do not reproduce every combination of assistive technology, browser, device
                and cognitive access need. The download control creates a plain-text file;
                people using a shared device should decide whether saving it is appropriate.
              </p>

              <h2>Ongoing review</h2>
              <p>
                Accessibility is treated as part of the product rather than a final checklist.
                Real-user testing—especially with neurodivergent adults using screen readers,
                keyboard navigation, zoom and reduced-capacity routes—is the next meaningful
                validation step.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
