import { advisors } from "../data/advisors";
import { AdvisorContactCard } from "./advisor-contact-card";

export function AboutPreview() {
  return (
    <section className="shell about-section" id="about" aria-labelledby="about-title">
      <div className="about-portrait about-portrait--pair">
        {advisors.map((advisor) => (
          <img key={advisor.id} src={advisor.photo} alt={advisor.name} />
        ))}
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
        <section className="advisor-list" id="contact" aria-labelledby="advisor-list-title">
          <h3 className="visually-hidden" id="advisor-list-title">
            Contact our advisors
          </h3>
          {advisors.map((advisor) => (
            <AdvisorContactCard advisor={advisor} key={advisor.id} />
          ))}
        </section>
      </div>
    </section>
  );
}
