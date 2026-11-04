import type { ReactNode } from "react";

import type { FestiveThemeConfig } from "../config";

type DiwaliLayerProps = {
  children?: ReactNode;
  theme?: FestiveThemeConfig;
};

export function DiwaliLayer({ children, theme }: DiwaliLayerProps) {
  if (!theme?.enabled) {
    return <>{children}</>;
  }

  return (
    <div className="festive-design festive-design--diwali" data-festive-theme={theme.name}>
      <div className="festive-design__banner" role="status">
        <span aria-hidden="true">✦</span>
        Happy Diwali
        <span aria-hidden="true">✦</span>
      </div>
      <div className="festive-design__glow festive-design__glow--left" aria-hidden="true" />
      <div className="festive-design__glow festive-design__glow--right" aria-hidden="true" />
      <div className="festive-design__string-lights" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
}
