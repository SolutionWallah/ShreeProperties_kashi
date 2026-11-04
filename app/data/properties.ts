export type PropertyCategory = "Residential" | "Commercial" | "Plot / Land";
export type ListingKind = "Buy" | "Rent" | "Commercial" | "Plots";

export type Property = {
  id: string;
  slug?: string;
  title: string;
  image: string;
  location: string;
  category: PropertyCategory;
  kind: ListingKind;
  status: "For Sale" | "For Rent" | "For Lease";
  price: string;
  priceValueLakh: number;
  bedrooms?: string;
  bathrooms?: number;
  area: string;
  floor?: string;
};

export type PropertyDetailContent = {
  description: string;
  gallery: string[];
  highlights: string[];
  propertyType?: string;
  floor?: string;
  furnishing?: string;
  parking?: string;
  lift?: string;
  powerBackup?: string;
  youtubeUrl?: string;
  googleMapsUrl?: string;
};

export function formatPriceDisplay(rupees: number | string, kind?: string): string {
  const num = Number(rupees);
  if (!Number.isFinite(num) || num <= 0) return "₹ 0";
  const isRental = kind === "Rent" || kind === "RENT" || kind === "Commercial" || kind === "COMMERCIAL";
  const suffix = isRental ? " / Month" : "";
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, "");
    return `₹ ${cr} Crore${suffix}`;
  }
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2).replace(/\.00$/, "");
    return `₹ ${lakh} Lakh${suffix}`;
  }
  return `₹ ${num.toLocaleString("en-IN")}${suffix}`;
}

export function formatAreaDisplay(sqFt: number | string): string {
  const num = Number(sqFt);
  if (!Number.isFinite(num) || num <= 0) return "0 Sq. Ft.";
  return `${num.toLocaleString("en-IN")} Sq. Ft.`;
}

export function mapDbPropertyToPublic(item: any): Property {
  const priceNum = Number(item.priceRupees ?? 0);
  const areaNum = Number(item.areaSqFt ?? 0);

  const kindMap: Record<string, ListingKind> = {
    BUY: "Buy",
    RENT: "Rent",
    COMMERCIAL: "Commercial",
    PLOTS: "Plots",
    Buy: "Buy",
    Rent: "Rent",
    Commercial: "Commercial",
    Plots: "Plots",
  };

  const categoryMap: Record<string, PropertyCategory> = {
    RESIDENTIAL: "Residential",
    COMMERCIAL: "Commercial",
    PLOT_LAND: "Plot / Land",
    Residential: "Residential",
    Commercial: "Commercial",
    "Plot / Land": "Plot / Land",
  };

  const kind = kindMap[item.kind] ?? "Buy";
  const category = categoryMap[item.category] ?? "Residential";

  const photos = Array.isArray(item.images)
    ? item.images.map((img: any) => (typeof img === "string" ? img : img.objectKey)).filter(Boolean)
    : [];

  const mainImage = photos.length > 0 ? photos[0] : (item.image || "/property-images/lanka-apartments.webp");

  let status: "For Sale" | "For Rent" | "For Lease" = "For Sale";
  if (kind === "Rent") status = "For Rent";
  else if (kind === "Commercial") status = "For Lease";

  return {
    id: item.id,
    slug: item.slug || item.id,
    title: item.title,
    image: mainImage,
    location: item.location,
    category,
    kind,
    status,
    price: item.price || formatPriceDisplay(priceNum, kind),
    priceValueLakh: item.priceValueLakh ?? (priceNum / 100000),
    bedrooms: item.bedrooms ?? undefined,
    bathrooms: item.bathrooms !== null && item.bathrooms !== undefined ? Number(item.bathrooms) : undefined,
    area: item.area || formatAreaDisplay(areaNum),
    floor: item.floor ?? undefined,
  };
}

export function mapDbPropertyToDetail(item: any): PropertyDetailContent {
  const photos = Array.isArray(item.images)
    ? item.images.map((img: any) => (typeof img === "string" ? img : img.objectKey)).filter(Boolean)
    : [];

  const gallery = photos.length > 0 ? photos : [item.image || "/property-images/lanka-apartments.webp"];

  return {
    description:
      item.description ||
      `${item.title} in ${item.location}. Contact Shree Property Kashi for current pricing, site visits, and paperwork assistance.`,
    gallery,
    highlights:
      Array.isArray(item.highlights) && item.highlights.length > 0
        ? item.highlights
        : [
            `Prime location in ${item.location}`,
            "Clear title & verified ownership documents",
            "Direct road access & connectivity",
            "Immediate registration & possession assistance",
          ],
    propertyType:
      item.category === "COMMERCIAL" || item.category === "Commercial"
        ? (item.commercialType || "Commercial Space")
        : item.category === "PLOT_LAND" || item.category === "Plot / Land"
          ? "Plot / Land"
          : (item.bedrooms ? `${item.bedrooms} Flat / Apartment` : "Residential Property"),
    floor: item.floor ?? undefined,
    furnishing: item.furnishing ?? undefined,
    parking: item.parking ?? undefined,
    lift: item.lift ?? undefined,
    powerBackup: item.powerBackup ?? undefined,
    youtubeUrl: item.youtubeUrl ?? undefined,
    googleMapsUrl: item.googleMapsUrl ?? undefined,
  };
}

export const properties: Property[] = [];

export const propertyDetails: Record<string, PropertyDetailContent> = {};

export function getPropertyDetails(propertyId: string) {
  return propertyDetails[propertyId] ?? null;
}

export function getListingFilters() {
  return ["All", "Buy", "Rent", "Commercial", "Plots"] as const;
}