import Link from "next/link";
import { Logo } from "./logo";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link className="brand-link" href="/" aria-label="The Inner Map home">
            <Logo inverse />
          </Link>
          <p>Understand your mind. Map your patterns. Build a life that fits.</p>
        </div>

        <div className="footer-links" aria-label="Footer navigation">
          <div>
            <p className="footer-heading">Explore</p>
            <a href="/start">Start here</a>
            <a href="/map">Create a first map</a>
            <a href="/approach">The approach</a>
          </div>
          <div>
            <p className="footer-heading">Trust</p>
            <a href="/evidence">Evidence &amp; boundaries</a>
            <a href="/privacy">Privacy</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>Educational and reflective. Not therapy, diagnosis or crisis support.</p>
        <p>© 2026 The Inner Map</p>
      </div>
    </footer>
  );
}
