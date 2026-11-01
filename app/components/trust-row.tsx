import { Icon } from "./icons";

const reasons = [
  { icon: "pin" as const, label: "Varanasi Local Expertise" },
  { icon: "shield" as const, label: "Transparent Dealings" },
  { icon: "handshake" as const, label: "Personalized Guidance" },
  { icon: "building" as const, label: "Residential & Commercial" },
  { icon: "sprout" as const, label: "Plots & Land Solutions" },
];

/** Summarizes the service areas with compact icons and readable labels. */
export function TrustRow() {
  return <section className="shell trust-row" id="services" aria-label="How we help">{reasons.map((reason) => <div className="trust-item" key={reason.label}><Icon name={reason.icon} /><span>{reason.label}</span></div>)}</section>;
}
