import { AboutPreview } from "./components/about-preview";
import { HomeFeatured } from "./components/home-featured";
import { HomeHero } from "./components/home-hero";
import { SiteHeader } from "./components/site-header";
import { TrustBand } from "./components/trust-band";
import { TrustRow } from "./components/trust-row";
import { listPublishedProperties } from "./services/property-service";
import { mapDbPropertyToPublic } from "./data/properties";
import type { Property } from "./data/properties";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initialProperties: Property[] = [];

  try {
    const result = await listPublishedProperties(1, 10);
    if (result.properties && result.properties.length > 0) {
      initialProperties = result.properties.map(mapDbPropertyToPublic);
    }
  } catch {}

  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <TrustRow />
        <HomeFeatured initialProperties={initialProperties} />
        <TrustBand />
        <AboutPreview />
      </main>
    </>
  );
}