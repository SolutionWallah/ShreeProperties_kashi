import type { Advisor } from "../data/advisors";
import { AdvisorContactActions } from "./advisor-contact-actions";

type AdvisorContactCardProps = {
  advisor: Advisor;
  variant?: "about" | "detail";
  message?: string;
};

// Show one advisor's portrait, contact details, and direct contact actions.
export function AdvisorContactCard({
  advisor,
  variant = "about",
  message,
}: AdvisorContactCardProps) {
  return (
    <article className={`about-contact advisor-contact-card advisor-contact-card--${variant}`}>
      <div className="contact-avatar" aria-hidden="true">
        <img className="contact-avatar__image" src={advisor.photo} alt="" />
      </div>
      <span className="contact-name">{advisor.name}</span>
      <span className="contact-role">{advisor.role}</span>
      {variant === "detail" && (
        <a className="contact-phone" href={`tel:${advisor.phone}`}>
          {advisor.phoneDisplay}
        </a>
      )}
      <AdvisorContactActions advisor={advisor} message={message} compact={variant === "detail"} />
    </article>
  );
}
