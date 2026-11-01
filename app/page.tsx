import { AboutPreview } from "./components/about-preview";
import { HomeFeatured } from "./components/home-featured";
import { HomeHero } from "./components/home-hero";
import { SiteHeader } from "./components/site-header";
import { TrustBand } from "./components/trust-band";
import { TrustRow } from "./components/trust-row";

/** Assembles the public home page from shared, focused sections. */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <TrustRow />
        <HomeFeatured />
        <TrustBand />
        <AboutPreview />
      </main>
    </>
  );
}
