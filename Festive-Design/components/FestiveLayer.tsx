import type { CSSProperties, ReactNode } from "react";

import { festiveConfig } from "../config";

type FestiveStyle = CSSProperties & {
  "--festive-primary": string;
  "--festive-secondary": string;
  "--festive-surface": string;
  "--festive-text": string;
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
          "--festive-surface": festiveConfig.colors.surface,
          "--festive-text": festiveConfig.colors.text,
        } as FestiveStyle
      }
    >
      {children}
    </div>
  );
}
