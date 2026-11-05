import Link from "next/link";
import { advisors, getAdvisorWhatsAppUrl } from "../data/advisors";
import { BrandMark } from "./brand-mark";
import { Icon } from "./icons";
import { SocialLinks } from "./social-links";
import { FestiveFooterLights } from "../../Festive-Design";

export function SiteFooter() {
  return (
    <footer className="footer" id="footer-contact">
      <FestiveFooterLights />
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <BrandMark />
            <span className="brand-copy">
              <span className="brand-name">Shree Property Kashi</span>
              <span className="brand-tagline" lang="hi">
                आपका विश्वास ही, हमारी पहचान हैं
              </span>
            </span>
          </Link>
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
          <SocialLinks />
          <ul className="footer-links">
            {advisors.map((advisor) => (
              <li className="footer-contact-group" key={advisor.id}>
                <strong className="footer-contact-name">{advisor.name}</strong>
                <a className="footer-contact" href={`tel:${advisor.phone}`}>
                  <Icon name="phone" />
                  {advisor.phoneDisplay}
                </a>
                <a className="footer-contact" href={getAdvisorWhatsAppUrl(advisor)}>
                  <Icon name="whatsapp" />
                  Chat on WhatsApp
                </a>
              </li>
            ))}
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
