"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";

/** Displays the responsive public navigation and direct contact actions. */
export function SiteHeader({ current = "home" }: { current?: "home" | "properties" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Shree Property Kashi home">
          <Icon className="brand-mark" name="temple" />
          <span className="brand-name">Shree<br />Property Kashi</span>
        </Link>
        <div className="brand-tagline" lang="hi">आप का विश्वास ही, मेरी पहचान हैं</div>
        <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav className="header-nav" data-open={menuOpen} aria-label="Main navigation">
          <Link href="/" aria-current={current === "home" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/properties" aria-current={current === "properties" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Properties</Link>
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="header-phone" href="tel:+919889028504"><Icon name="phone" /> +91 98890 28504</a>
          <a className="header-whatsapp" href="https://wa.me/919889028504" aria-label="Chat on WhatsApp"><Icon name="whatsapp" /> WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
