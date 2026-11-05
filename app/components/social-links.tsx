import { Icon } from "./icons";

const socialPlatforms = [
  {
    name: "YouTube",
    href: "https://youtube.com/@shreepropertykashi?si=28OW_sr3pvvzX4U0",
    icon: "youtube",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shree_property_kashi?dlrf=emJuNHNyMXpyMmow",
    icon: "instagram",
  },
  {
    name: "OLX",
    href: "https://www.olx.in/profile/641177696",
    icon: null,
  },
] as const;

// Renders the business social profiles with recognizable platform marks.
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={`footer-social ${className}`.trim()} aria-label="Social media">
      {socialPlatforms.map((platform) => (
        <a
          className={`social-link social-link--${platform.name.toLowerCase()}`}
          href={platform.href}
          key={platform.name}
          target="_blank"
          rel="noreferrer"
          aria-label={`Shree Property Kashi on ${platform.name}`}
          title={platform.name}
        >
          {platform.icon ? (
            <Icon name={platform.icon} />
          ) : (
            <span aria-hidden="true" className="olx-wordmark">
              <span>O</span>
              <span>L</span>
              <span>X</span>
            </span>
          )}
        </a>
      ))}
    </nav>
  );
}
