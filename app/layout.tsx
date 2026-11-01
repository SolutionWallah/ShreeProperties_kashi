import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "./components/site-footer";
import "./theme.css";

export const metadata: Metadata = {
  title: "Shree Property Kashi | Varanasi Real Estate",
  description: "Explore homes, commercial spaces, and land in Varanasi with Shree Property Kashi.",
};

/** Provides shared document metadata, global styling, and the footer. */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}<SiteFooter /></body></html>;
}
