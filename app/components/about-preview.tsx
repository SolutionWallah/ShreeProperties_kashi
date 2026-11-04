import { Icon } from "./icons";

export function AboutPreview() {
  return (
    <section className="shell about-section" id="about" aria-labelledby="about-title">
      <div className="about-portrait">
        <img src="/images/varanasi-riverfront.jpg" alt="The ghats of Varanasi along the Ganges" />
      </div>
      <div className="about-copy">
        <span className="eyebrow">About us</span>
        <h2 id="about-title">
          Shree Property <span className="accent">Kashi</span>
        </h2>
        <p>
          A Varanasi-based real estate consultancy helping people explore property for their home,
          business, or investment.
        </p>
        <div className="about-contact">
          <div className="contact-avatar" aria-hidden="true">
            <Icon name="user" />
          </div>
          <span className="contact-name">Ashutosh Singh (Himanshu)</span>
          <span className="contact-role">Property Dealer &amp; Real Estate Consultant</span>
          <div className="contact-cta">
            <a className="button button--green" href="tel:+919889028504">
              <Icon name="phone" />
              +91 98890 28504
            </a>
            <a className="button button--outline" href="https://wa.me/919889028504">
              <Icon name="whatsapp" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
