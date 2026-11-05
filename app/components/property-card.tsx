"use client";

import { Icon } from "./icons";
import Link from "next/link";
import type { Property } from "../data/properties";
import { FestivePropertyCardLights } from "../../Festive-Design";

export function PropertyCard({ property }: { property: Property }) {
  const isLease = property.status === "For Lease";
  const propertySlug = property.slug || property.id;

  return (
    <article className="property-card">
      <div className="property-photo-wrap">
        {property.image ? (
          <Link href={`/properties/${propertySlug}`} aria-label={`View ${property.title} details`}>
            <img
              className="property-photo"
              src={property.image}
              alt={`${property.title} exterior`}
            />
          </Link>
        ) : (
          <div className="property-photo-placeholder" aria-label="No property photo uploaded">
            <Icon name="image" />
            <span>No photo uploaded</span>
          </div>
        )}
        <span className={`listing-badge ${isLease ? "listing-badge--green" : ""}`}>
          {property.status}
        </span>
      </div>
      <div className="property-content">
        <h3>
          <Link
            href={`/properties/${propertySlug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {property.title}
          </Link>
        </h3>
        <div className="property-location">
          <Icon name="pin" />
          {property.location}
        </div>
        <div className="property-facts">
          {property.bedrooms && (
            <span className="property-fact">
              <Icon name="bed" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms && (
            <span className="property-fact">
              <Icon name="bath" />
              {property.bathrooms} Bath
            </span>
          )}
          <span className="property-fact">
            <Icon name="area" />
            {property.area}
          </span>
          {property.floor && (
            <span className="property-fact">
              <Icon name="layers" />
              {property.floor}
            </span>
          )}
        </div>
        <div className="property-card-bottom">
          <strong className="property-price">{property.price}</strong>
          <Link
            className="circle-link"
            href={`/properties/${propertySlug}`}
            aria-label={`View ${property.title} details`}
          >
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
      <FestivePropertyCardLights />
    </article>
  );
}
