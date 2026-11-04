import { SiteHeader } from "../components/site-header";
import { ListingBrowser } from "./listing-browser";
import { listPublishedProperties } from "../services/property-service";
import { mapDbPropertyToPublic, properties } from "../data/properties";
import type { Property } from "../data/properties";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  let initialProperties: Property[] = [];

  try {
    const result = await listPublishedProperties(1, 100);
    if (result.properties && result.properties.length > 0) {
      initialProperties = result.properties.map(mapDbPropertyToPublic);
    }
  } catch {}

  if (initialProperties.length === 0) {
    initialProperties = properties;
  }

  return (
    <>
      <SiteHeader current="properties" />
      <section className="listing-hero">
        <div className="shell">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <span>Properties</span>
          </div>
          <h1>
            Properties in <em className="accent">Varanasi</em>
          </h1>
          <p>Explore properties for buying, renting, and business in Varanasi.</p>
        </div>
      </section>
      <main className="listing-page">
        <ListingBrowser initialProperties={initialProperties} />
      </main>
    </>
  );
}