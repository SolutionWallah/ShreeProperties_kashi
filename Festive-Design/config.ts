export type FestiveThemeConfig = {
  name: string;
  enabled: boolean;
  label: string;
  announcement: string;
  language: string;
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    text: string;
  };
};

// Change this single object to switch the site's seasonal wrapper and message.
export const festiveConfig: FestiveThemeConfig = {
  name: "diwali",
  enabled: true,
  label: "Diwali",
  announcement: "आप सभी को दीपावली की हार्दिक शुभकामनाएं",
  language: "hi",
  colors: {
    primary: "#d6400c",
    secondary: "#075337",
    surface: "#fff4df",
    text: "#173328",
  },
};

// Return the active seasonal config, or null when the seasonal layer is disabled.
export function getActiveFestiveTheme(): FestiveThemeConfig | null {
  return festiveConfig.enabled ? festiveConfig : null;
}
