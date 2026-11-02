import { properties, type ListingKind, type Property, type PropertyCategory } from "../data/properties";

export type AdminStatus = "Available" | "Sold" | "Rented" | "Leased";
export type AdminProperty = Property & {
  adminStatus: AdminStatus; published: boolean; description: string; totalFloors?: string;
  furnishing?: string; parking?: string; lift?: string; powerBackup?: string; photos?: string[];
  youtubeUrl?: string; googleMapsUrl?: string; highlights?: string[];
  commercialType?: string; landUse?: string; plotDimensions?: string; roadWidth?: string; plotFacing?: string; boundaryWall?: string;
};

const storageKey = "shree-property-kashi-admin-listings";
const initialStatuses: Record<string, AdminStatus> = {
  "lanka-flat": "Available",
  "godowlia-commercial": "Leased",
  "sigra-house": "Available",
  "bhelupur-flat": "Rented",
  "cantt-office": "Available",
  "paharia-plot": "Sold",
};

/** Converts the public sample listings into the admin's editable demonstration records. */
export function getInitialAdminProperties(): AdminProperty[] {
  return properties.map((property) => ({ ...property, adminStatus: initialStatuses[property.id] ?? "Available", published: true, description: "", photos: [property.image] }));
}

/** Loads saved admin records from this browser, falling back to the supplied sample listings. */
export function loadAdminProperties(): AdminProperty[] {
  try {
    const saved = window.localStorage.getItem(storageKey);
    const records: unknown = saved ? JSON.parse(saved) : null;
    return Array.isArray(records) ? records as AdminProperty[] : getInitialAdminProperties();
  } catch {
    return getInitialAdminProperties();
  }
}

/** Persists the current admin records in local browser storage for this prototype. */
export function saveAdminProperties(records: AdminProperty[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(records));
}

/** Builds a new local admin record from the add-property form values. */
export function createAdminProperty(input: {
  title: string; kind: ListingKind; category: PropertyCategory; location: string; price: string; priceValueLakh: number;
  bedrooms: string; bathrooms: number; area: string; description: string; adminStatus: AdminStatus; published: boolean;
  floor: string; totalFloors: string; furnishing: string; parking: string; lift: string; powerBackup: string;
  youtubeUrl: string; googleMapsUrl: string; highlights: string[];
  commercialType: string; landUse: string; plotDimensions: string; roadWidth: string; plotFacing: string; boundaryWall: string;
}): AdminProperty {
  const transactionStatus: Property["status"] = input.kind === "Rent" ? "For Rent" : input.kind === "Commercial" ? "For Lease" : "For Sale";
  return {
    id: `listing-${Date.now()}`,
    title: input.title,
    image: "/property-images/lanka-apartments.webp",
    location: input.location,
    category: input.category,
    kind: input.kind,
    status: transactionStatus,
    price: input.price,
    priceValueLakh: input.priceValueLakh,
    bedrooms: input.category === "Residential" ? input.bedrooms || undefined : undefined,
    bathrooms: input.category !== "Plot / Land" ? input.bathrooms || undefined : undefined,
    area: input.area,
    floor: input.category !== "Plot / Land" ? input.floor || undefined : undefined,
    totalFloors: input.category !== "Plot / Land" ? input.totalFloors || undefined : undefined,
    furnishing: input.category === "Residential" ? input.furnishing || undefined : undefined,
    parking: input.category !== "Plot / Land" ? input.parking || undefined : undefined,
    lift: input.category !== "Plot / Land" ? input.lift || undefined : undefined,
    powerBackup: input.category !== "Plot / Land" ? input.powerBackup || undefined : undefined,
    adminStatus: input.adminStatus,
    published: input.published,
    description: input.description,
    youtubeUrl: input.youtubeUrl,
    googleMapsUrl: input.googleMapsUrl,
    highlights: input.highlights.filter(Boolean).slice(0, 5),
    commercialType: input.category === "Commercial" ? input.commercialType || undefined : undefined,
    landUse: input.category === "Plot / Land" ? input.landUse || undefined : undefined,
    plotDimensions: input.category === "Plot / Land" ? input.plotDimensions || undefined : undefined,
    roadWidth: input.category === "Plot / Land" ? input.roadWidth || undefined : undefined,
    plotFacing: input.category === "Plot / Land" ? input.plotFacing || undefined : undefined,
    boundaryWall: input.category === "Plot / Land" ? input.boundaryWall || undefined : undefined,
  };
}
