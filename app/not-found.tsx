import Link from "next/link";
import { SiteShell } from "./components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main-content" className="not-found-main">
        <div className="shell not-found-card">
          <div className="not-found-map" aria-hidden="true"><span>404</span></div>
          <div>
            <p className="eyebrow">This path ends here</p>
            <h1>The page could not be found.</h1>
            <p>The map can change. Use one of these known routes to continue.</p>
            <div className="button-row">
              <Link className="button button--primary" href="/">Return home</Link>
              <a className="text-link" href="/start">Choose a starting point</a>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
