export type FestiveThemeName = "diwali";

export type FestiveThemeConfig = {
  name: FestiveThemeName;
  enabled: boolean;
  label: string;
};

export const festiveConfig: FestiveThemeConfig = {
  name: "diwali",
  enabled: true,
  label: "Diwali",
};

export function getActiveFestiveTheme(): FestiveThemeConfig | null {
  return festiveConfig.enabled ? festiveConfig : null;
}
