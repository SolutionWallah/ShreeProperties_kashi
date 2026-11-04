import { Icon } from "./icons";

export function AboutPreview() {
  return (
    <section className="shell about-section" id="about" aria-labelledby="about-title">
      <div
        className="about-portrait"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}
      >
        <img
          src="/images/Ashu.jpeg"
          alt="Ashutosh Singh (Himanshu)"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <img
          src="/images/SunilM.jpeg"
          alt="Sunil Maurya"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
            <img
              src="/images/Ashu.jpeg"
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
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
        <div className="about-contact">
          <div className="contact-avatar" aria-hidden="true">
            <img
              src="/images/SunilM.jpeg"
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <span className="contact-name">Sunil Maurya</span>
          <span className="contact-role">Property Dealer &amp; Real Estate Consultant</span>
          <div className="contact-cta">
            <a className="button button--green" href="tel:+917903512516">
              <Icon name="phone" />
              +91 79035 12516
            </a>
            <a className="button button--outline" href="https://wa.me/917903512516">
              <Icon name="whatsapp" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
