"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PropertyCard } from "./property-card";
import { getListingFilters } from "../data/properties";
import type { Property } from "../data/properties";

export function HomeFeatured({ initialProperties }: { initialProperties?: Property[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = getListingFilters();

  const sourceProperties = useMemo(() => {
    return initialProperties && initialProperties.length > 0 ? initialProperties : [];
  }, [initialProperties]);

  const featured = useMemo(
    () =>
      activeFilter === "All"
        ? sourceProperties.slice(0, 3)
        : sourceProperties.filter((property) => property.kind === activeFilter).slice(0, 3),
    [sourceProperties, activeFilter],
  );

  return (
    <section className="shell featured-section" aria-labelledby="featured-title">
      <div className="section-top">
        <div>
          <span className="eyebrow">Featured listings</span>
          <h2 className="section-heading featured-title" id="featured-title">
            Handpicked Properties <span className="accent">in Varanasi</span>
          </h2>
        </div>
        <div className="filter-pills" aria-label="Filter featured listings">
          {filters.map((filter) => (
            <button
              className="filter-pill"
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {featured.length > 0 ? (
        <div className="property-grid">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No featured {activeFilter.toLowerCase()} listings yet</h2>
          <p>New property listings will appear here once they are published.</p>
        </div>
      )}
      <div className="more-row">
        <Link className="button button--outline" href="/properties">
          More Properties <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
