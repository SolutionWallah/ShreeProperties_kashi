"use client";

import { useState } from "react";
import { Icon } from "./icons";
import Link from "next/link";
import type { Property } from "../data/properties";

/** Shows a property photo, essential facts, price, and a local save control. */
export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const isLease = property.status === "For Lease";

  return (
    <article className="property-card">
      <div className="property-photo-wrap">
        <img className="property-photo" src={property.image} alt={`${property.title} exterior`} />
        <span className={`listing-badge ${isLease ? "listing-badge--green" : ""}`}>{property.status}</span>
        <button className="favorite-button" type="button" aria-label={saved ? `Remove ${property.title} from saved properties` : `Save ${property.title}`} aria-pressed={saved} onClick={() => setSaved(!saved)}>
          <Icon name="heart" />
        </button>
      </div>
      <div className="property-content">
        <h3>{property.title}</h3>
        <div className="property-location"><Icon name="pin" />{property.location}</div>
        <div className="property-facts">
          {property.bedrooms && <span className="property-fact"><Icon name="bed" />{property.bedrooms}</span>}
          {property.bathrooms && <span className="property-fact"><Icon name="bath" />{property.bathrooms} Bath</span>}
          <span className="property-fact"><Icon name="area" />{property.area}</span>
          {property.floor && <span className="property-fact"><Icon name="layers" />{property.floor}</span>}
        </div>
        <div className="property-card-bottom">
          <strong className="property-price">{property.price}</strong>
          <Link className="circle-link" href={`/properties/${property.id}`} aria-label={`View ${property.title} details`}><Icon name="arrow" /></Link>
        </div>
      </div>
    </article>
  );
}
