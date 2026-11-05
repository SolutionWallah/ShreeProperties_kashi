import Link from "next/link";

import { Icon } from "./icons";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <img
        className="hero-image"
        src="/images/varanasi-riverfront.webp"
        alt="Golden-hour view across the Ganges and Varanasi ghats"
      />
      <div className="hero-wash" />
      <div className="arch-mark" aria-hidden="true" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Local property guidance in Varanasi</span>
          <h1 id="home-title">
            Property Solutions <span className="accent">in Varanasi</span>
          </h1>
          <p>Buy, sell, or rent homes, commercial spaces, and land with Shree Property Kashi.</p>
          <div className="hero-actions">
            <a className="button button--green" href="#contact">
              <Icon name="phone" />
              Talk to our team
            </a>
            <Link className="button button--outline" href="/properties">
              Browse properties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
