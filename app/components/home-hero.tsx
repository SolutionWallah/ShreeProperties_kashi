import { Icon } from "./icons";
import { festiveConfig } from "../../Festive-Design/config";

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
          {festiveConfig.enabled && (
            <p
              className="festive-announcement hero-festive-announcement"
              lang={festiveConfig.language}
            >
              <span className="greeting-popper" aria-hidden="true">
                ✦
              </span>
              <span>{festiveConfig.label}</span>
              {festiveConfig.announcement}
              <span className="greeting-popper" aria-hidden="true">
                ✦
              </span>
            </p>
          )}
          <span className="eyebrow">Local property guidance in Varanasi</span>
          <h1 id="home-title">
            Property Solutions <span className="accent">in Varanasi</span>
          </h1>
          <p>Buy, sell, or rent homes, commercial spaces, and land with Shree Property Kashi.</p>
          <div className="hero-actions">
            <div className="hero-contact-actions">
              <a className="button button--green" href="tel:+919889028504">
                <Icon name="phone" />
                Call 98890 28504
              </a>
              <a className="button button--outline" href="https://wa.me/919889028504">
                <Icon name="whatsapp" />
                WhatsApp 98890 28504
              </a>
            </div>
            <div className="hero-contact-actions">
              <a className="button button--green" href="tel:+917903512516">
                <Icon name="phone" />
                Call 79035 12516
              </a>
              <a className="button button--outline" href="https://wa.me/917903512516">
                <Icon name="whatsapp" />
                WhatsApp 79035 12516
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
