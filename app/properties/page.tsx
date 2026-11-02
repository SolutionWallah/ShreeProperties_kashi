import { SiteHeader } from "../components/site-header";
import { ListingBrowser } from "./listing-browser";

/** Presents the Varanasi listing index with filter and search controls. */
export default function PropertiesPage() {
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
        <ListingBrowser />
      </main>
    </>
  );
}
