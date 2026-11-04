import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DiwaliLayer, festiveConfig } from "../Festive-Design";
import { SiteFooter } from "./components/site-footer";
import "../Festive-Design/styles/diwali.css";
import "./theme.css";

export const metadata: Metadata = {
  title: "Shree Property Kashi | Varanasi Real Estate",
  description: "Explore homes, commercial spaces, and land in Varanasi with Shree Property Kashi.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <DiwaliLayer theme={festiveConfig}>
          {children}
          <SiteFooter />
        </DiwaliLayer>
      </body>
    </html>
  );
}
