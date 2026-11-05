import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { Icon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <BrandMark />
            <span className="brand-name">
              Shree
              <br />
              Property Kashi
            </span>
          </Link>
          <p className="footer-tagline" lang="hi">
            आप का विश्वास ही, मेरी पहचान हैं
          </p>
          <p className="footer-copy">
            Local property guidance for homes, commercial spaces, and land in Varanasi.
          </p>
        </div>
        <div className="footer-column">
          <h2>Quick Links</h2>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Our Services</h2>
          <ul className="footer-links">
            <li>
              <Link href="/properties?kind=Buy">
                <Icon name="home" />
                Buy Property
              </Link>
            </li>
            <li>
              <Link href="/properties?kind=Rent">
                <Icon name="key" />
                Rent Property
              </Link>
            </li>
            <li>
              <Link href="/properties?kind=Commercial">
                <Icon name="building" />
                Commercial Spaces
              </Link>
            </li>
            <li>
              <Link href="/properties?kind=Plots">
                <Icon name="layers" />
                Plots &amp; Land
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Get in Touch</h2>
          <ul className="footer-links">
            <li className="footer-contact-group">
              <a className="footer-contact" href="tel:+919889028504">
                <Icon name="phone" />
                +91 98890 28504
              </a>
              <a className="footer-contact" href="https://wa.me/919889028504">
                <Icon name="whatsapp" />
                WhatsApp 98890 28504
              </a>
            </li>
            <li className="footer-contact-group">
              <a className="footer-contact" href="tel:+917903512516">
                <Icon name="phone" />
                +91 79035 12516
              </a>
              <a className="footer-contact" href="https://wa.me/917903512516">
                <Icon name="whatsapp" />
                WhatsApp 79035 12516
              </a>
            </li>
            <li>
              <span className="footer-contact">
                <Icon name="pin" />
                Varanasi, Uttar Pradesh
              </span>
            </li>
          </ul>
        </div>
      </div>
      <img
        className="footer-art"
        src="/images/varanasi-riverfront-footer.webp"
        alt="Orange line illustration of the Varanasi riverfront and boats"
      />
      <div className="footer-bottom">
        <div className="shell footer-bottom-inner">
          <span>© 2026 Shree Property Kashi. All rights reserved.</span>
          <span>
            Designed, Developed and Hosted by SolutionWallah{" "}
            <a href="mailto:contact.solutionwallah@gmail.com">contact.solutionwallah@gmail.com</a>
          </span>
          <div className="legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
