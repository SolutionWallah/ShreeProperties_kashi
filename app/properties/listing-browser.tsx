"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "../components/icons";
import { PropertyCard } from "../components/property-card";
import type { ListingKind, Property, PropertyCategory } from "../data/properties";

const kinds: ListingKind[] = ["Buy", "Rent", "Commercial", "Plots"];
const categories: PropertyCategory[] = ["Residential", "Commercial", "Plot / Land"];

type Filters = {
  kinds: ListingKind[];
  categories: PropertyCategory[];
  location: string;
  min: string;
  max: string;
  query: string;
};

const emptyFilters: Filters = {
  kinds: [],
  categories: [],
  location: "All Locations",
  min: "0",
  max: "500",
  query: "",
};

export function ListingBrowser({
  initialProperties,
}: {
  initialProperties?: Property[];
}) {
  const [draft, setDraft] = useState<Filters>({ ...emptyFilters });
  const [active, setActive] = useState<Filters>({ ...emptyFilters });
  const [sort, setSort] = useState("newest");

  const sourceProperties = useMemo(() => {
    return initialProperties || [];
  }, [initialProperties]);

  const availableLocations = useMemo(() => {
    const set = new Set(["All Locations"]);
    for (const item of sourceProperties) {
      if (item.location) {
        const primaryLoc = item.location.split(",")[0].trim();
        if (primaryLoc) set.add(primaryLoc);
      }
    }
    return Array.from(set);
  }, [sourceProperties]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kind = params.get("kind") as ListingKind | null;
    const query = params.get("query") ?? "";
    if ((kind && kinds.includes(kind)) || query) {
      const initial = { ...emptyFilters, kinds: kind && kinds.includes(kind) ? [kind] : [], query };
      setDraft(initial);
      setActive(initial);
    }
  }, []);

  const filtered = useMemo(() => {
    const query = active.query.trim().toLowerCase();
    return sourceProperties
      .filter((property) => {
        const matchesKind = active.kinds.length === 0 || active.kinds.includes(property.kind);
        const matchesCategory =
          active.categories.length === 0 || active.categories.includes(property.category);
        const matchesLocation =
          active.location === "All Locations" ||
          property.location.toLowerCase().includes(active.location.toLowerCase());
        const matchesQuery =
          !query || `${property.title} ${property.location}`.toLowerCase().includes(query);
        const matchesPrice =
          property.priceValueLakh >= Number(active.min || 0) &&
          property.priceValueLakh <= Number(active.max || 100000);
        return matchesKind && matchesCategory && matchesLocation && matchesQuery && matchesPrice;
      })
      .sort((a, b) =>
        sort === "price-low"
          ? a.priceValueLakh - b.priceValueLakh
          : sort === "price-high"
            ? b.priceValueLakh - a.priceValueLakh
            : sourceProperties.indexOf(a) - sourceProperties.indexOf(b),
      );
  }, [sourceProperties, active, sort]);

  function toggleValue<T extends string>(key: "kinds" | "categories", value: T, checked: boolean) {
    setDraft((current) => ({
      ...current,
      [key]: checked ? [...current[key], value] : current[key].filter((item) => item !== value),
    }));
  }

  function applyFilters() {
    setActive({ ...draft });
  }

  function resetFilters() {
    setDraft({ ...emptyFilters });
    setActive({ ...emptyFilters });
  }

  return (
    <div className="shell listing-layout">
      <aside className="filter-sidebar" aria-label="Property filters">
        <h2>Filter Properties</h2>
        <div className="filter-group">
          <h3>Transaction Type</h3>
          <div className="check-list">
            {kinds.map((kind) => (
              <label className="check-option" key={kind}>
                <input
                  type="checkbox"
                  checked={draft.kinds.includes(kind)}
                  onChange={(event) => toggleValue("kinds", kind, event.target.checked)}
                />
                {kind === "Buy"
                  ? "Buy"
                  : kind === "Rent"
                    ? "Rent"
                    : kind === "Plots"
                      ? "Plots & Land"
                      : "Commercial"}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <h3>Property Type</h3>
          <div className="check-list">
            {categories.map((category) => (
              <label className="check-option" key={category}>
                <input
                  type="checkbox"
                  checked={draft.categories.includes(category)}
                  onChange={(event) => toggleValue("categories", category, event.target.checked)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label htmlFor="location-filter">
            <h3>Location</h3>
          </label>
          <select
            className="filter-select"
            id="location-filter"
            value={draft.location}
            onChange={(event) => setDraft({ ...draft, location: event.target.value })}
          >
            {availableLocations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <h3>Price Range (₹ Lakhs)</h3>
          <div className="filter-range">
            <label>
              <span className="visually-hidden">Minimum price in lakhs</span>
              <input
                aria-label="Minimum price in lakhs"
                inputMode="decimal"
                value={draft.min}
                onChange={(event) => setDraft({ ...draft, min: event.target.value })}
              />
            </label>
            <label>
              <span className="visually-hidden">Maximum price in lakhs</span>
              <input
                aria-label="Maximum price in lakhs"
                inputMode="decimal"
                value={draft.max}
                onChange={(event) => setDraft({ ...draft, max: event.target.value })}
              />
            </label>
          </div>
        </div>
        <div className="filter-actions">
          <button className="button button--green" type="button" onClick={applyFilters}>
            Apply Filters
          </button>
          <button className="button button--light" type="button" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </aside>
      <section className="listing-results" aria-label="Property listings">
        <div className="listing-toolbar">
          <div>
            <div className="listing-count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "Property" : "Properties"} Found
            </div>
            <span className="sample-note">Showing verified listings in Varanasi.</span>
          </div>
          <div className="toolbar-actions">
            <label className="search-field">
              <Icon name="search" />
              <span className="visually-hidden">Search by title or location</span>
              <input
                aria-label="Search by title or location"
                placeholder="Search title or location…"
                value={draft.query}
                onChange={(event) => {
                  const query = event.target.value;
                  setDraft({ ...draft, query });
                  setActive((current) => ({ ...current, query }));
                }}
              />
            </label>
            <label>
              <span className="visually-hidden">Sort listings</span>
              <select
                className="sort-select"
                aria-label="Sort listings"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
        {filtered.length ? (
          <div className="results-grid">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No properties match these filters</h2>
            <p>Try a broader search or reset the filters to view all available listings.</p>
            <button className="button button--outline" type="button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}