import { getAdvisorWhatsAppUrl, type Advisor } from "../data/advisors";
import { Icon } from "./icons";

type AdvisorContactActionsProps = {
  advisor: Advisor;
  message?: string;
  compact?: boolean;
};

// Render consistent phone and WhatsApp actions for an advisor.
export function AdvisorContactActions({
  advisor,
  message,
  compact = false,
}: AdvisorContactActionsProps) {
  return (
    <div className="contact-cta">
      <a className="button button--green" href={`tel:${advisor.phone}`}>
        <Icon name="phone" />
        {compact ? "Call" : advisor.phoneDisplay}
      </a>
      <a
        className="button button--outline"
        href={getAdvisorWhatsAppUrl(advisor, message)}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="whatsapp" />
        WhatsApp
      </a>
    </div>
  );
}
