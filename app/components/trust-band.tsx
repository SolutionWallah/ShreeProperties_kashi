import { Icon } from "./icons";
import Image from "next/image";

const points = ["Local Varanasi property knowledge", "Clear and transparent process", "Support from property visit to closure", "Guidance for homes, business, and land"];

/** Gives the local-service promise a distinct, quiet deep-green section. */
export function TrustBand() {
  return (
    <section className="trust-band">
      <svg className="trust-band-wave trust-band-wave--top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v30c-210 32-430 42-720 20C400 18 190 10 0 42z" /></svg>
      <div className="shell trust-band-inner">
        <div className="trust-band-illustration" aria-hidden="true">
          <Image src="/images/varanasi-riverfront-footer.webp" alt="" width={2172} height={724} sizes="(max-width: 820px) 40vw, 25vw" />
        </div>
        <div className="trust-band-copy">
          <span className="eyebrow">Why choose us</span>
          <h2>A Local Partner<br />You Can Trust</h2>
        </div>
        <ul className="trust-points">{points.map((point) => <li key={point}><Icon name="check" />{point}</li>)}</ul>
      </div>
      <svg className="trust-band-wave trust-band-wave--bottom" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v30c-210 32-430 42-720 20C400 18 190 10 0 42z" /></svg>
    </section>
  );
}
