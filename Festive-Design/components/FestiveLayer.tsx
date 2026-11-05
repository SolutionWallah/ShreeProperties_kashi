import type { CSSProperties, ReactNode } from "react";

import { festiveConfig } from "../config";

type FestiveStyle = CSSProperties & {
  "--festive-primary": string;
  "--festive-secondary": string;
  "--festive-light": string;
};

type FestiveLayerProps = {
  children?: ReactNode;
};

// Apply the currently configured seasonal wrapper to every site route.
export function FestiveLayer({ children }: FestiveLayerProps) {
  if (!festiveConfig.enabled) {
    return <>{children}</>;
  }

  return (
    <div
      className="festive-layer"
      data-festive-theme={festiveConfig.name}
      style={
        {
          "--festive-primary": festiveConfig.colors.primary,
          "--festive-secondary": festiveConfig.colors.secondary,
          "--festive-light": festiveConfig.colors.light,
        } as FestiveStyle
      }
    >
      {children}
    </div>
  );
}

// Render a configurable, continuously scrolling festival message below the site navigation.
export function FestiveBanner() {
  if (!festiveConfig.enabled || !festiveConfig.effects.banner) {
    return null;
  }

  return (
    <aside className="festive-banner" aria-label="Festival greetings">
      <p className="festive-banner__accessible" lang="hi">
        {festiveConfig.bannerMessage}
      </p>
      <div className="festive-banner__light-string" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span className="festive-banner__bulb" key={index} />
        ))}
      </div>
      <div className="festive-banner__ticker" aria-hidden="true">
        <div className="festive-banner__track">
          {[0, 1].map((group) => (
            <div className="festive-banner__group" key={group}>
              {[0, 1, 2].map((message) => (
                <span className="festive-banner__message" lang="hi" key={message}>
                  <FestivalDiya />
                  {festiveConfig.bannerMessage}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// Render the small diya mark used to separate repeated festival messages.
function FestivalDiya() {
  return (
    <svg className="festive-banner__diya" viewBox="0 0 24 18" aria-hidden="true">
      <path d="M12 1.2C8.8 5 9.2 8.1 12 9c2.8-.9 3.2-4 0-7.8Z" />
      <path d="M3.2 10h17.6c-.7 4.1-3.8 6.2-8.8 6.2S3.9 14.1 3.2 10Z" />
      <path d="M6.3 17h11.4" />
    </svg>
  );
}

// Place the configured Diwali lights around the full rounded perimeter of a property card.
export function FestivePropertyCardLights() {
  if (!festiveConfig.enabled || !festiveConfig.effects.propertyCardLights) {
    return null;
  }

  return (
    <div className="festive-card-lights" aria-hidden="true">
      <span className="festive-card-lights__wire" />
      {["top", "right", "bottom", "left"].map((side) => (
        <span className={`festive-card-lights__side festive-card-lights__side--${side}`} key={side}>
          {Array.from({ length: 5 }, (_, index) => (
            <span className="festive-card-lights__bulb" key={index} />
          ))}
        </span>
      ))}
    </div>
  );
}
