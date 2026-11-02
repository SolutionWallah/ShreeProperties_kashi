import { Icon } from "./icons";

/** Introduces the Varanasi service and puts direct contact actions first. */
export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <img
        className="hero-image"
        src="/images/varanasi-riverfront.jpg"
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
            <a className="button button--green" href="tel:+919889028504">
              <Icon name="phone" />
              Call Now
            </a>
            <a className="button button--outline" href="https://wa.me/919889028504">
              <Icon name="whatsapp" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
