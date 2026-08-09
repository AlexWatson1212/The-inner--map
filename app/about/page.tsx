import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "About the project",
  description: "Why The Inner Map exists, who created it and how it stays distinct from counselling.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="page-hero page-hero--about section--topographic">
          <div className="shell page-hero__grid">
            <div>
              <p className="eyebrow">About the project</p>
              <h1>The website I wish had existed when I began trying to understand myself.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                Not a list of quick tips. Not a personality test. A developing field
                guide for noticing how your own mind, needs and circumstances interact.
              </p>
            </div>
          </div>
        </section>

        <section className="section origin-section">
          <div className="shell editorial-grid">
            <div>
              <p className="eyebrow">Why it exists</p>
              <h2>Information explained the labels. It did not automatically explain my life.</h2>
            </div>
            <div className="long-copy">
              <p>
                I found plenty of descriptions of ADHD, autism, masking and burnout.
                What took longer was learning how those ideas met the practical details:
                why my capacity changed, why some kinds of rest did not restore me, why
                connection could be wanted and exhausting, and why a life that looked
                manageable could still carry a hidden cost.
              </p>
              <p>
                The Inner Map grew from a simple belief: general knowledge becomes more
                useful when it helps a person gather specific evidence from their own life.
                A map can hold uncertainty. It can change when new information appears.
                It can help somebody design around what is true now without turning one
                observation into a permanent identity.
              </p>
              <blockquote>
                I cannot tell you exactly what will work for you. I can help you ask
                better questions, notice repeated conditions and test changes carefully.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section section--mist creator-section">
          <div className="shell creator-grid">
            <div className="creator-mark" aria-hidden="true">
              <Image src="/brand/logo-mark.svg" alt="" width={180} height={180} />
            </div>
            <div>
              <p className="eyebrow">Created by Alexander Watson</p>
              <h2>Lived experience, counselling learning and a commitment to careful language.</h2>
              <p>
                I am a neurodivergent adult and counselling student. The project draws
                on lived experience, reflective practice and research, while staying
                clear about the limits of each.
              </p>
              <p>
                I am not presenting myself here as a diagnostician, medical expert or
                authority on every neurodivergent life. Where a tool is my own developing
                framework, it is labelled as such. Where a claim depends on research or
                guidance, the source and level of certainty should be visible.
              </p>
            </div>
          </div>
        </section>

        <section className="section ecosystem-section">
          <div className="shell editorial-grid">
            <div>
              <p className="eyebrow">Separate on purpose</p>
              <h2>A resource first—not a disguised counselling funnel.</h2>
            </div>
            <div className="long-copy">
              <p>
                The Inner Map stands on its own. You should be able to use it without
                subscribing, buying something or working with me. Its tools are
                educational and reflective; counselling is a separate relationship with
                different responsibilities, boundaries and purposes.
              </p>
              <p>
                In time, the two may sit alongside one another: a person might use a map
                to find language for something they want to explore in therapy. Any link
                to counselling will remain optional, quiet and explicit about what is
                being offered.
              </p>
              <div className="about-actions">
                <a className="button button--primary" href="/start">Find your starting point</a>
                <a className="text-link" href="/evidence">Read the evidence boundaries <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
