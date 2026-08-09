import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Evidence & boundaries",
  description: "How The Inner Map distinguishes evidence, emerging ideas, lived experience and practical tools.",
};

const sources = [
  {
    title: "NICE: ADHD diagnosis and management (NG87)",
    description: "UK clinical guidance covering recognition, diagnosis and management of ADHD in children, young people and adults.",
    href: "https://www.nice.org.uk/guidance/ng87",
    type: "Clinical guidance",
  },
  {
    title: "NICE: Autism in adults (CG142)",
    description: "UK clinical guidance on diagnosing and managing suspected or confirmed autism in adults.",
    href: "https://www.nice.org.uk/guidance/cg142",
    type: "Clinical guidance",
  },
  {
    title: "Raymaker et al. (2020): Defining Autistic Burnout",
    description: "A participatory qualitative study describing autistic adults’ experiences of burnout. Useful emerging evidence, not a diagnostic standard.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7313636/",
    type: "Primary research",
  },
  {
    title: "Hull et al. (2017): Social Camouflaging in Autistic Adults",
    description: "A qualitative study of the nature, motivations and reported consequences of camouflaging among autistic adults.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5509825/",
    type: "Primary research",
  },
  {
    title: "NHS: Where to get urgent help for mental health",
    description: "Current routes for urgent mental-health help in England, including NHS 111 and emergency support.",
    href: "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/",
    type: "Support guidance",
  },
];

export default function EvidencePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="page-hero page-hero--evidence section--topographic">
          <div className="shell page-hero__grid">
            <div>
              <p className="eyebrow">Evidence &amp; boundaries</p>
              <h1>Clear about what is known—and what is still being worked out.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                The Inner Map combines established guidance, emerging research,
                practical interpretation and lived experience. Those are useful in
                different ways; they should not be presented as interchangeable.
              </p>
            </div>
          </div>
        </section>

        <section className="section evidence-key-section" aria-labelledby="evidence-key-title">
          <div className="shell">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">The evidence key</p>
              <h2 id="evidence-key-title">Five kinds of claim.</h2>
            </div>
            <div className="evidence-key-grid">
              <article><span className="evidence-badge evidence-badge--established">Established</span><h3>Guidance or well-supported knowledge</h3><p>Used for clinical definitions, diagnostic boundaries and professional support routes.</p></article>
              <article><span className="evidence-badge evidence-badge--emerging">Emerging</span><h3>Research that is useful but incomplete</h3><p>Described with study type and limits; never turned into certainty about one individual.</p></article>
              <article><span className="evidence-badge evidence-badge--lived">Lived experience</span><h3>What people report about their lives</h3><p>Valuable for language and recognition without claiming every person shares the experience.</p></article>
              <article><span className="evidence-badge evidence-badge--interpretation">Interpretation</span><h3>A careful way of making sense</h3><p>Presented as one possible explanation that can be compared with other readings.</p></article>
              <article><span className="evidence-badge evidence-badge--tool">Inner Map tool</span><h3>A practical prompt or experiment</h3><p>Designed to gather personal evidence. It is not a validated assessment or treatment.</p></article>
            </div>
          </div>
        </section>

        <section className="section section--ink boundary-section">
          <div className="shell boundary-grid">
            <div>
              <p className="eyebrow eyebrow--light">What this project is</p>
              <h2>Educational, reflective, practical and evidence-aware.</h2>
              <p>It can help you notice patterns, find language, prepare questions and test small changes.</p>
            </div>
            <div>
              <p className="eyebrow eyebrow--light">What it is not</p>
              <ul className="boundary-list">
                <li>Therapy, diagnosis, medical advice or crisis support</li>
                <li>A screening test or proof that you are autistic, ADHD or AuDHD</li>
                <li>A universal model of neurodivergence</li>
                <li>Evidence that every body signal or first interpretation is accurate</li>
                <li>A promise that unmasking is always possible, desirable or safe</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section support-section" id="support">
          <div className="shell support-card">
            <div>
              <p className="eyebrow">When reflection is not enough</p>
              <h2>Use real-world support when the situation needs it.</h2>
            </div>
            <div>
              <p>
                If you need urgent help for your mental health in England, use NHS 111
                online or call 111 and select the mental-health option. If there is an
                immediate danger to life, call 999 or go to A&amp;E.
              </p>
              <p>
                For confidential listening support, Samaritans can be reached free on
                <a href="tel:116123"> 116 123</a>, any time.
              </p>
              <div className="link-pair">
                <a className="text-link" href="https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/" target="_blank" rel="noreferrer">NHS urgent mental-health help <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="https://www.samaritans.org/how-we-can-help/contact-samaritan/" target="_blank" rel="noreferrer">Contact Samaritans <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section sources-section" aria-labelledby="sources-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow">Starting sources</p><h2 id="sources-title">The foundation beneath the first version.</h2></div>
              <p>This list will grow only when a source is directly relevant to a claim or tool—not to make the site look more authoritative.</p>
            </div>
            <div className="source-list">
              {sources.map((source, index) => (
                <a href={source.href} target="_blank" rel="noreferrer" key={source.title}>
                  <span className="source-number">0{index + 1}</span>
                  <div><span className="source-type">{source.type}</span><h3>{source.title}</h3><p>{source.description}</p></div>
                  <span className="source-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
