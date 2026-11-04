"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";
import { properties } from "../data/properties";
import type { Property, PropertyDetailContent } from "../data/properties";
import { PropertyCard } from "./property-card";

export function PropertyDetailView({
  property,
  details,
  similarProperties,
}: {
  property: Property;
  details: PropertyDetailContent | null;
  similarProperties?: Property[];
}) {
  const photos = details?.gallery && details.gallery.length > 0 ? details.gallery : [property.image];
  const [activePhoto, setActivePhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const similarList =
    similarProperties && similarProperties.length > 0
      ? similarProperties
      : properties.filter((item) => item.id !== property.id && item.slug !== property.slug).slice(0, 3);

  const facts = [
    { icon: "bed" as const, value: property.bedrooms ?? property.category },
    {
      icon: "bath" as const,
      value: property.bathrooms ? `${property.bathrooms} Bathrooms` : "Details on request",
    },
    { icon: "area" as const, value: property.area },
    { icon: "building" as const, value: details?.propertyType ?? property.category },
    ...(details?.floor || property.floor
      ? [{ icon: "layers" as const, value: details?.floor ?? property.floor ?? "" }]
      : []),
    ...(details?.lift ? [{ icon: "lift" as const, value: `Lift: ${details.lift}` }] : []),
    ...(details?.parking ? [{ icon: "car" as const, value: `Parking: ${details.parking}` }] : []),
    ...(details?.powerBackup ? [{ icon: "bolt" as const, value: details.powerBackup }] : []),
  ];

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: property.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied");
      }
    } catch {
      setShareMessage("Could not share this link");
    }
  }

  const isVerifiedListing = property.slug && !["lanka-flat", "godowlia-commercial", "sigra-house", "bhelupur-flat", "cantt-office", "paharia-plot"].includes(property.slug);

  return (
    <main className="property-detail-page">
      <div className="shell">
        <div className="detail-heading">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/properties">Properties</Link>
              <span aria-hidden="true">›</span>
              <span>{property.title}</span>
            </nav>
            <h1>{property.title}</h1>
            <p className="detail-location">
              <Icon name="pin" />
              {property.location}
            </p>
          </div>
          <div className="detail-actions">
            <button className="button button--light" type="button" onClick={handleShare}>
              <Icon name="share" />
              Share
            </button>
            <button
              className={`button button--light ${saved ? "is-saved" : ""}`}
              type="button"
              aria-pressed={saved}
              onClick={() => setSaved(!saved)}
            >
              <Icon name="heart" />
              {saved ? "Saved" : "Save"}
            </button>
            <span className="visually-hidden" role="status">
              {shareMessage}
            </span>
          </div>
        </div>

        <div className="detail-top-grid">
          <div className="detail-gallery-column">
            <div
              className={`property-gallery ${photos.length === 1 ? "property-gallery--single" : ""}`}
              aria-label="Property photo gallery"
            >
              <button
                className="gallery-main"
                type="button"
                onClick={() => setActivePhoto((activePhoto + 1) % photos.length)}
                aria-label="Show next property photo"
              >
                <img
                  src={photos[activePhoto]}
                  alt={`${property.title}, photo ${activePhoto + 1} of ${photos.length}`}
                />
                <span className="gallery-count">
                  {activePhoto + 1} / {photos.length}
                </span>
              </button>
              {photos.length > 1 && (
                <div className="gallery-thumbnails">
                  {photos.slice(1, 5).map((photo, index) => {
                    const photoIndex = index + 1;
                    return (
                      <button
                        className={`gallery-thumbnail ${activePhoto === photoIndex ? "is-active" : ""}`}
                        key={photo}
                        type="button"
                        onClick={() => setActivePhoto(photoIndex)}
                        aria-label={`Show property photo ${photoIndex + 1}`}
                        aria-pressed={activePhoto === photoIndex}
                      >
                        <img src={photo} alt="" />
                        {photoIndex === 4 && <span>View photo</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <aside className="detail-sidebar" aria-label="Contact about this property">
            <section className="contact-property-panel">
              <span
                className={`listing-badge ${property.status === "For Lease" ? "listing-badge--green" : ""}`}
              >
                {property.status}
              </span>
              <p className="detail-price">{property.price}</p>
              <div className="sidebar-facts">
                {facts.slice(0, 4).map((fact) => (
                  <span key={`${fact.icon}-${fact.value}`}>
                    <Icon name={fact.icon} />
                    {fact.value}
                  </span>
                ))}
              </div>
              <a className="button button--green contact-call" href="tel:+919889028504">
                <Icon name="phone" />
                Call Now
              </a>
              <a
                className="button button--outline contact-whatsapp"
                href={`https://wa.me/919889028504?text=${encodeURIComponent(`Hello, I am interested in ${property.title} in ${property.location}.`)}`}
              >
                <Icon name="whatsapp" />
                Chat on WhatsApp
              </a>
            </section>
            <section className="consultant-panel">
              <span className="consultant-avatar">
                <Icon name="user" />
              </span>
              <div>
                <strong>Ashutosh Singh (Himanshu)</strong>
                <span>Property Dealer &amp; Real Estate Consultant</span>
              </div>
            </section>
          </aside>
        </div>
        <div className="detail-primary">
          <nav className="detail-tabs" aria-label="Property details sections">
            <a href="#overview" className="is-current">
              Overview
            </a>
            <a href="#specifications">Specifications</a>
            <a href="#location">Location</a>
            <a href="#similar-properties">Similar Properties</a>
          </nav>
          <section className="detail-overview" id="overview">
            <h2>Property Overview</h2>
            <p>
              {details?.description ??
                `${property.title} in ${property.location}. Contact us for current availability and more details.`}
            </p>
            <span className="sample-note">
              {isVerifiedListing ? "Verified listing details for Shree Property Kashi." : "Illustrative listing details based on the supplied design references."}
            </span>
          </section>
          <div className="detail-information-grid">
            <section className="detail-specifications" id="specifications">
              <h2>Key Specifications</h2>
              <div className="specification-grid">
                {facts.map((fact) => (
                  <div className="specification-item" key={`${fact.icon}-${fact.value}`}>
                    <Icon name={fact.icon} />
                    <span>{fact.value}</span>
                  </div>
                ))}
              </div>
              {details?.furnishing && (
                <p className="furnishing-note">
                  <Icon name="sofa" />
                  {details.furnishing}
                </p>
              )}
            </section>
            {details?.highlights && details.highlights.length > 0 && (
              <section className="detail-highlights">
                <h2>Property Highlights</h2>
                <ul>
                  {details.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Icon name="check" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="detail-location-panel" id="location">
              <h2>Location</h2>
              <div className="location-card">
                <Icon name="pin" />
                <div>
                  <strong>{property.location}</strong>
                  <span>Varanasi, Uttar Pradesh</span>
                </div>
              </div>
              <a
                className="button button--outline map-link"
                href={details?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.location}, India`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="map" />
                View in Google Maps
              </a>
              {details?.youtubeUrl && (
                <a
                  className="button button--light video-link"
                  href={details.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}
                >
                  <Icon name="arrow" />
                  Watch Video Tour
                </a>
              )}
            </section>
          </div>
        </div>

        <section className="similar-properties" id="similar-properties">
          <div className="similar-heading">
            <h2>Similar Properties</h2>
            <Link href="/properties">
              View All Properties <Icon name="arrow" />
            </Link>
          </div>
          <div className="property-grid">
            {similarList.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}