"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
import { Icon } from "./icons";
import { FestiveBanner } from "../../Festive-Design";

export function SiteHeader({ current = "home" }: { current?: "home" | "properties" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="Shree Property Kashi home">
            <BrandMark />
            <span className="brand-copy">
              <span className="brand-name">Shree Property Kashi</span>
              <span className="brand-tagline" lang="hi">
                आपका विश्वास ही, हमारी पहचान हैं
              </span>
            </span>
          </Link>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <nav className="header-nav" data-open={menuOpen} aria-label="Main navigation">
            <Link
              href="/"
              aria-current={current === "home" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/properties"
              aria-current={current === "properties" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Properties
            </Link>
            <a href="/#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="/#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      </header>
      <FestiveBanner />
    </>
  );
}
