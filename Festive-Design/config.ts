type FestivalTheme = {
  colors: {
    primary: string;
    secondary: string;
    light: string;
  };
  effects: {
    banner: boolean;
    footerLights: boolean;
    propertyCardLights: boolean;
  };
  bannerMessage: string;
};

// Keep each festival's palette and visual effects together for simple seasonal swaps.
const festivalThemes = {
  diwali: {
    colors: {
      primary: "#d6400c",
      secondary: "#075337",
      light: "#ffd27a",
    },
    effects: {
      banner: true,
      footerLights: true,
      propertyCardLights: true,
    },
    bannerMessage: "आप सभी को दीपावली की हार्दिक शुभकामनाएं",
  },
} satisfies Record<string, FestivalTheme>;

export type FestiveThemeName = keyof typeof festivalThemes;
export type FestiveThemeConfig = FestivalTheme & {
  name: FestiveThemeName;
  enabled: boolean;
};

// Change this one value to activate a different entry from the festival registry.
const activeFestival: FestiveThemeName = "diwali";

// Configure the active seasonal effects used by the shared wrapper and decorations.
export const festiveConfig: FestiveThemeConfig = {
  ...festivalThemes[activeFestival],
  name: activeFestival,
  enabled: true,
};

// Return the active seasonal config, or null when the seasonal layer is disabled.
export function getActiveFestiveTheme(): FestiveThemeConfig | null {
  return festiveConfig.enabled ? festiveConfig : null;
}
