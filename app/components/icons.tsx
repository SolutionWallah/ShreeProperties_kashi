import type { ReactNode, SVGProps } from "react";

type IconName = "temple" | "home" | "pin" | "shield" | "handshake" | "sprout" | "building" | "bed" | "bath" | "area" | "layers" | "heart" | "arrow" | "phone" | "whatsapp" | "menu" | "close" | "chevron" | "plus" | "search" | "check" | "briefcase" | "user" | "instagram" | "youtube" | "key" | "share" | "map" | "car" | "bolt" | "lift" | "sofa" | "logout" | "edit" | "trash" | "file" | "image" | "upload" | "back" | "tag";

const iconPaths: Record<IconName, ReactNode> = {
  temple: <><path d="M3 20h18M5 20v-8l3-2V7l4-4 4 4v3l3 2v8" /><path d="M8 10h8M9 20v-5a3 3 0 0 1 6 0v5M12 3V1M4 12h16" /></>,
  home: <><path d="m3 10 9-7 9 7v10H3z" /><path d="M9 20v-6h6v6" /></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  handshake: <><path d="m3 11 4-4 5 1 3-1 6 4-3 7-5-3-4 2-4-3z" /><path d="m7 7 3-3 5 1 2 2M9 15l3 2M12 12l4 4M14 10l4 3" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12c-6 0-9-3-9-8 5 0 9 2 9 8ZM12 15c0-5 3-8 9-8 0 5-3 8-9 8Z" /><path d="M5 21h14" /></>,
  building: <><path d="M4 21V5l8-3 8 3v16M2 21h20M8 8h1m6 0h1M8 12h1m6 0h1M8 16h1m6 0h1M11 21v-3h2v3" /></>,
  bed: <><path d="M3 18v-6h18v6M3 18v3m18-3v3M5 12V7h6a3 3 0 0 1 3 3v2M14 12V9h4a3 3 0 0 1 3 3" /></>,
  bath: <><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4ZM6 12V6a2 2 0 0 1 4 0v1" /><path d="M8 20v2m8-2v2" /></>,
  area: <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /><path d="m8 16 8-8" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10a16 16 0 0 0 6 6l1.6-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.5 1.8Z" />,
  whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.496.1-.198.05-.372-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.03 2C6.51 2 2.02 6.487 2.018 12.006c0 1.937.506 3.827 1.468 5.496L2 22l4.618-1.455a10.003 10.003 0 0 0 5.407 1.575h.004c5.519 0 10.011-4.487 10.014-10.006A9.978 9.978 0 0 0 19.11 4.99 9.944 9.944 0 0 0 12.03 2zm-.001 18.45h-.003a8.328 8.328 0 0 1-4.245-1.16l-.304-.18-3.195 1.006 1.012-3.117-.198-.32a8.31 8.31 0 0 1-1.278-4.433c.002-4.607 3.75-8.35 8.363-8.35a8.3 8.3 0 0 1 5.905 2.445 8.296 8.296 0 0 1 2.443 5.907c-.002 4.606-3.752 8.35-8.36 8.35z" />,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  youtube: <><path d="M22 12s0-4-1-5-9-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 9 1 9 1 8 0 9-1 1-5 1-5Z" /><path d="m10 9 5 3-5 3z" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8 3 3-2 2 1 1-2 2-1-1-4 4" /></>,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4m-6.6 7.4 6.6 4.4" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15m6-12v15" /></>,
  car: <><path d="m5 11 1.5-5h11L19 11M3 11h18v7H3zM5 18v2m14-2v2M6 14h.01M18 14h.01" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
  lift: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="m9 9 3-3 3 3m-6 6 3 3 3-3M12 6v12" /></>,
  sofa: <><path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 12a2 2 0 0 1 2 2v4h14v-4a2 2 0 0 1 2-2v8H3zM6 18v2m12-2v2" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  edit: <><path d="m14 5 5 5M4 20l4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z" /></>,
  trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" /></>,
  file: <><path d="M6 3h8l5 5v13H6zM14 3v6h5M9 13h7m-7 4h7" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  upload: <><path d="M12 16V4m-5 5 5-5 5 5" /><path d="M4 16v4h16v-4" /></>,
  back: <><path d="M19 12H5m7 7-7-7 7-7" /></>,
  tag: <><path d="M20 13 13 20 3 10V3h7l10 10Z" /><circle cx="7.5" cy="7.5" r="1" /></>,
};

/** Renders a consistent line icon from the shared project icon set. */
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const isBrandWhatsapp = name === "whatsapp";
  return <svg aria-hidden="true" className={`icon ${isBrandWhatsapp ? "icon--whatsapp-brand" : ""} ${props.className ?? ""}`} fill={isBrandWhatsapp ? "currentColor" : "none"} stroke={isBrandWhatsapp ? "none" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>{iconPaths[name]}</svg>;
}
