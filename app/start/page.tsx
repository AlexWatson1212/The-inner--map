import type { Metadata } from "next";
import { LineIcon } from "../components/icons";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Start here",
  description: "Choose a recognisable starting point and make your first useful observation.",
};

const routes = [
  {
    icon: "capacity" as const,
    title: "My capacity changes without warning",
    text: "Map the load, recovery, support and timing around a moment when your ability changed.",
    note: "Useful for inconsistent functioning, overload or ‘why could I do it yesterday?’",
    href: "/map?focus=capacity",
  },
  {
    icon: "start" as const,
    title: "I want to begin, but cannot make myself start",
    text: "Look at clarity, size, interest, transitions, pressure and the first visible step.",
    note: "Useful for task initiation, avoidance, freezing or getting stuck between tasks.",
    href: "/map?focus=starting",
  },
  {
    icon: "sensory" as const,
    title: "I feel overwhelmed and do not know what I need",
    text: "Separate sensory input, emotional demand, uncertainty and bodily or practical needs.",
    note: "Useful when ‘too much’ is accurate but not yet specific enough to act on.",
    href: "/map?focus=overload",
  },
  {
    icon: "recovery" as const,
    title: "I have stopped, but I am not recovering",
    text: "Notice whether your version of rest reduces input, responsibility and internal pressure.",
    note: "Useful when downtime remains agitating, numbing, guilty or surprisingly effortful.",
    href: "/map?focus=recovery",
  },
  {
    icon: "connection" as const,
    title: "I want connection, but interaction feels too demanding",
    text: "Map the type, timing, intensity and recovery cost of contact—not only whether you want it.",
    note: "Useful for conflicting needs, messages, calls, plans and post-social recovery.",
    href: "/map?focus=connection",
  },
  {
    icon: "identity" as const,
    title: "I have adapted for so long that I do not know what fits",
    text: "Notice which choices bring steadiness, energy or relief when nobody is grading the result.",
    note: "Useful for masking, inherited expectations, identity and life-design questions.",
    href: "/map?focus=identity",
  },
];

export default function StartPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="page-hero page-hero--start section--topographic">
          <div className="shell page-hero__grid">
            <div>
              <p className="eyebrow">Start here</p>
              <h1>Begin with the part that feels most true today.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                You do not need to decide what everything means. Choose one recent
                moment. The aim is to gather a little more information—not reach a verdict.
              </p>
              <p className="quiet-note">Most routes lead to the same five-minute tool with different starting language.</p>
            </div>
          </div>
        </section>

        <section className="section start-routes" aria-labelledby="route-heading">
          <div className="shell">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Choose a doorway</p>
              <h2 id="route-heading">What is happening?</h2>
            </div>

            <div className="start-route-grid">
              {routes.map((route, index) => (
                <a href={route.href} className="start-route-card" key={route.title}>
                  <div className="start-route-card__top">
                    <span className="card-index">0{index + 1}</span>
                    <span className="icon-disc"><LineIcon name={route.icon} /></span>
                  </div>
                  <h3>{route.title}</h3>
                  <p>{route.text}</p>
                  <p className="route-note">{route.note}</p>
                  <span className="card-link">Map this moment <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section low-route-section">
          <div className="shell low-route-card">
            <div className="low-route-card__mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div>
              <p className="eyebrow">No room for reflection?</p>
              <h2>Use the version that asks only one question.</h2>
              <p>
                Choose whether reducing demand, reducing input, adding support or
                pausing decisions would help most. You can return to the map later—or not.
              </p>
            </div>
            <a className="button button--signal" href="/map?mode=low">Open the 30-second version</a>
          </div>
        </section>

        <section className="section start-expectation-section">
          <div className="shell expectation-grid">
            <div>
              <p className="eyebrow">What happens next</p>
              <h2>One moment. Three questions. One experiment.</h2>
            </div>
            <ol className="expectation-list">
              <li><span>01</span><p>Choose a specific recent moment rather than describing your whole life.</p></li>
              <li><span>02</span><p>Mark the conditions that may have increased or reduced the cost.</p></li>
              <li><span>03</span><p>Choose one reversible change and decide what you will notice afterwards.</p></li>
            </ol>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
