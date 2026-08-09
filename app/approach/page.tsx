import type { Metadata } from "next";
import { LineIcon } from "../components/icons";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "The approach",
  description: "How The Inner Map turns specific observations into careful explanations and small experiments.",
};

const maps = [
  ["Capacity", "What changes what is available—not only how motivated you feel."],
  ["Regulation & recovery", "What helps you settle, mobilise, recover or return after demand."],
  ["Sensory environment", "Which kinds, combinations and durations of input alter the cost."],
  ["Attention & initiation", "What helps you begin, switch, focus, stop and re-enter a task."],
  ["Masking & identity", "Where adaptation protects you, costs you or obscures your preferences."],
  ["Communication & people", "Which formats, rhythms, expectations and repair processes fit."],
  ["Work & environment", "How structure, autonomy, place, pace and recovery affect sustainability."],
  ["Meaning & life design", "What gives energy, belonging, agency and a life worth maintaining."],
];

export default function ApproachPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="page-hero section--topographic">
          <div className="shell page-hero__grid">
            <div>
              <p className="eyebrow">The Inner Map approach</p>
              <h1>A field method for learning from your actual life.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                The framework does not begin with “How do I fix this?” It begins with
                “What appears to be happening, under which conditions, and at what cost?”
              </p>
              <a className="button button--primary" href="/map">Try it with one moment</a>
            </div>
          </div>
        </section>

        <section className="section method-section" aria-labelledby="method-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow">Five repeatable moves</p><h2 id="method-title">A loop, not a ladder.</h2></div>
              <p>
                You can enter anywhere. Sometimes the useful result is an experiment.
                Sometimes it is a clearer question, a boundary or permission to stop.
              </p>
            </div>

            <div className="method-path">
              <article>
                <span className="method-number">01</span>
                <span className="icon-disc"><LineIcon name="capacity" /></span>
                <h3>Pause</h3>
                <p>Check current capacity. Use a shorter route—or stop—when reflection itself would add load.</p>
                <p className="method-question">Do I have room for this now?</p>
              </article>
              <article>
                <span className="method-number">02</span>
                <span className="icon-disc"><LineIcon name="notice" /></span>
                <h3>Notice</h3>
                <p>Record one observable moment and the conditions around it. Specificity makes patterns visible.</p>
                <p className="method-question">What happened before, during and after?</p>
              </article>
              <article>
                <span className="method-number">03</span>
                <span className="icon-disc"><LineIcon name="identity" /></span>
                <h3>Make sense</h3>
                <p>Consider needs, fears, habits, adaptations and temporary states without forcing one explanation.</p>
                <p className="method-question">What are two possible readings?</p>
              </article>
              <article>
                <span className="method-number">04</span>
                <span className="icon-disc"><LineIcon name="test" /></span>
                <h3>Test</h3>
                <p>Change one factor in a small, reversible way. Reduce risk, cost and pressure to get it right.</p>
                <p className="method-question">What is the smallest useful test?</p>
              </article>
              <article>
                <span className="method-number">05</span>
                <span className="icon-disc"><LineIcon name="review" /></span>
                <h3>Review</h3>
                <p>Notice what changed, what the experiment cost and whether the result holds in another context.</p>
                <p className="method-question">What deserves keeping or revising?</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--mist" aria-labelledby="maps-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow">The areas you can map</p><h2 id="maps-title">Different questions. One developing picture.</h2></div>
              <p>
                These are lenses, not separate identities or scores. A single moment
                may sit across several maps; you do not need to complete them all.
              </p>
            </div>
            <div className="maps-grid">
              {maps.map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section distinction-section">
          <div className="shell distinction-grid">
            <div>
              <p className="eyebrow">An important distinction</p>
              <h2>Observation is evidence. Explanation is a working hypothesis.</h2>
            </div>
            <div className="distinction-cards">
              <article>
                <p className="mini-label">Observation</p>
                <blockquote>“After three hours of meetings, I could not reply to a simple message.”</blockquote>
                <p>Specific, time-bound and open to further examples.</p>
              </article>
              <article>
                <p className="mini-label">Possible explanation</p>
                <blockquote>“Social monitoring may have used more capacity than I noticed at the time.”</blockquote>
                <p>Plausible, useful to test—and not automatically the only cause.</p>
              </article>
              <article>
                <p className="mini-label">Small experiment</p>
                <blockquote>“After the next meeting block, I will protect 20 minutes without messages.”</blockquote>
                <p>Reversible, observable and small enough to review.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section approach-cta-section">
          <div className="shell approach-cta">
            <div><p className="eyebrow">Begin small</p><h2>Make one map before building a system.</h2></div>
            <div><p>The first tool gives you a complete stopping point. You do not need a new routine, app or identity.</p><a className="button button--signal" href="/map">Create a first signal map</a></div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
