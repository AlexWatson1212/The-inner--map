import { LineIcon } from "./components/icons";
import { SiteShell } from "./components/site-shell";

const doorways = [
  {
    icon: "capacity" as const,
    title: "Everything feels like too much",
    text: "Start by separating the demands around you from the capacity available today.",
    href: "/map?focus=capacity",
  },
  {
    icon: "start" as const,
    title: "I know what to do, but cannot start",
    text: "Map what was present before the task—not just what happened after you got stuck.",
    href: "/map?focus=starting",
  },
  {
    icon: "recovery" as const,
    title: "I need rest, but cannot settle",
    text: "Explore the difference between having no demands and actually feeling restored.",
    href: "/map?focus=recovery",
  },
  {
    icon: "identity" as const,
    title: "My life works, but the cost is high",
    text: "Notice what makes the life look sustainable from outside while feeling costly within it.",
    href: "/map?focus=cost",
  },
];

const principles = [
  ["Patterns before labels", "A label may provide context. Your repeated, specific examples show what needs attention."],
  ["Capacity before judgement", "Ask what load, recovery, uncertainty or support surrounded the moment before judging it."],
  ["Experiments before rules", "Try one small, reversible change. Keep what helps; revise what does not."],
  ["A life before performance", "The aim is not endless output. It is a life with enough meaning, connection and room to recover."],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Inner Map",
    url: "https://theinnermap.co.uk",
    description:
      "A practical, non-diagnostic field guide for neurodivergent self-understanding.",
    inLanguage: "en-GB",
  };

  return (
    <SiteShell>
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="hero section--topographic">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">A field guide for neurodivergent self-understanding</p>
              <h1>Understand what changes. Build around what helps.</h1>
              <p className="hero-lede">
                The Inner Map helps you notice how capacity, attention, sensory load,
                masking and recovery shape daily life—then turn those observations
                into small, kinder experiments.
              </p>
              <div className="button-row">
                <a className="button button--primary" href="/start">
                  Start with what is happening
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="/map?mode=low">
                  I have very little capacity today
                </a>
              </div>
              <p className="quiet-note">
                No diagnosis required. No account. Your reflections stay in this browser tab.
              </p>
            </div>

            <div className="hero-map" aria-hidden="true">
              <div className="hero-map__rings" />
              <div className="map-coordinate map-coordinate--one">
                <span />
                <p><strong>Capacity</strong> changes</p>
              </div>
              <div className="map-coordinate map-coordinate--two">
                <span />
                <p><strong>Conditions</strong> matter</p>
              </div>
              <div className="map-coordinate map-coordinate--three">
                <span />
                <p><strong>Patterns</strong> emerge</p>
              </div>
              <div className="map-caption">
                <span className="map-caption__number">01</span>
                <p>A map is built from moments, not assumptions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section doorway-section" aria-labelledby="doorway-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Start where you are</p>
                <h2 id="doorway-title">Which sentence feels closest today?</h2>
              </div>
              <p>
                You do not need to understand the whole framework. Choose one
                recognisable moment and make a small map of what surrounded it.
              </p>
            </div>

            <div className="doorway-grid">
              {doorways.map((doorway, index) => (
                <a className="doorway-card" href={doorway.href} key={doorway.title}>
                  <span className="card-index">0{index + 1}</span>
                  <span className="icon-disc"><LineIcon name={doorway.icon} /></span>
                  <h3>{doorway.title}</h3>
                  <p>{doorway.text}</p>
                  <span className="card-link">Map this moment <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>

            <div className="low-capacity-strip">
              <div className="signal-dot" aria-hidden="true" />
              <div>
                <p className="mini-label">Very little capacity?</p>
                <p>Skip the reflection. Choose one thing that might reduce the next ten minutes.</p>
              </div>
              <a className="button button--small button--ink" href="/map?mode=low">
                Use the 30-second version
              </a>
            </div>
          </div>
        </section>

        <section className="section section--ink" aria-labelledby="process-title">
          <div className="shell process-layout">
            <div className="process-intro">
              <p className="eyebrow eyebrow--light">The mapping process</p>
              <h2 id="process-title">Observe first. Explain carefully. Change one thing.</h2>
              <p>
                The process is deliberately non-linear. Return to whichever step is
                useful; stop when continuing would cost more than it gives.
              </p>
              <a className="button button--signal" href="/approach">See the full approach</a>
            </div>

            <ol className="process-list">
              <li>
                <span>01</span>
                <div><h3>Pause</h3><p>Check whether you have enough capacity to reflect right now.</p></div>
              </li>
              <li>
                <span>02</span>
                <div><h3>Notice</h3><p>Capture one specific moment and the conditions around it.</p></div>
              </li>
              <li>
                <span>03</span>
                <div><h3>Make sense</h3><p>Hold more than one possible explanation; separate evidence from interpretation.</p></div>
              </li>
              <li>
                <span>04</span>
                <div><h3>Test</h3><p>Choose one small, reversible change that reduces cost or adds support.</p></div>
              </li>
              <li>
                <span>05</span>
                <div><h3>Review</h3><p>Ask what changed, what it cost and what deserves to be kept.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section principles-section" aria-labelledby="principles-title">
          <div className="shell principles-grid">
            <div className="principles-heading">
              <p className="eyebrow">A field guide, not a rulebook</p>
              <h2 id="principles-title">The map should become more like you over time.</h2>
              <p>
                Neurodivergent people are not all the same. Context, health, history,
                responsibilities and resources all affect what is possible.
              </p>
            </div>
            <div className="principles-list">
              {principles.map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section first-map-section">
          <div className="shell first-map-card">
            <div>
              <p className="eyebrow">Your first useful page</p>
              <h2>Leave with one observation, not another system to maintain.</h2>
            </div>
            <div>
              <p>
                The first signal map takes about five minutes. It helps you record a
                moment, name the conditions around it and choose one experiment to review.
              </p>
              <ul className="tick-list">
                <li>Works without an account</li>
                <li>Nothing is saved or sent</li>
                <li>Copy, download or print your summary</li>
              </ul>
              <a className="button button--primary" href="/map">Create a first signal map</a>
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="shell trust-grid">
            <div>
              <p className="eyebrow">Clear boundaries</p>
              <h2>Useful without pretending to be clinical care.</h2>
            </div>
            <div>
              <p>
                The Inner Map is educational, reflective and evidence-aware. It does
                not diagnose, provide therapy, replace medical care or tell you that
                one explanation must be true.
              </p>
              <div className="link-pair">
                <a className="text-link" href="/evidence">How evidence is handled <span aria-hidden="true">→</span></a>
                <a className="text-link" href="/about">About the project <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
