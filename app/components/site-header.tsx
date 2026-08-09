"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/start", label: "Start here" },
  { href: "/map", label: "Your map" },
  { href: "/approach", label: "The approach" },
  { href: "/evidence", label: "Evidence" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-link" href="/" aria-label="The Inner Map home">
          <Logo />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`site-nav ${open ? "site-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <div className="site-nav__links">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          <a
            className="button button--small button--signal nav-capacity"
            href="/map?mode=low"
            onClick={() => setOpen(false)}
          >
            Very little capacity
          </a>
        </nav>
      </div>
    </header>
  );
}
