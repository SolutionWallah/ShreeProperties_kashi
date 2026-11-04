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

export const properties: Property[] = [
  {
    id: "lanka-flat",
    slug: "lanka-flat",
    title: "3 BHK Flat in Lanka",
    image: "/property-images/lanka-apartments.webp",
    location: "Lanka, Varanasi",
    category: "Residential",
    kind: "Buy",
    status: "For Sale",
    price: "₹ 1.20 Crore",
    priceValueLakh: 120,
    bedrooms: "3 BHK",
    bathrooms: 3,
    area: "1,450 Sq. Ft.",
  },
  {
    id: "godowlia-commercial",
    slug: "godowlia-commercial",
    title: "Commercial Space in Godowlia",
    image: "/property-images/godowlia-commercial.webp",
    location: "Godowlia, Varanasi",
    category: "Commercial",
    kind: "Commercial",
    status: "For Lease",
    price: "₹ 1.50 Lakh / Month",
    priceValueLakh: 1.5,
    area: "2,000 Sq. Ft.",
    floor: "Ground + 1 Floor",
  },
  {
    id: "sigra-house",
    slug: "sigra-house",
    title: "Independent House in Sigra",
    image: "/property-images/sigra-independent-house.webp",
    location: "Sigra, Varanasi",
    category: "Residential",
    kind: "Buy",
    status: "For Sale",
    price: "₹ 2.10 Crore",
    priceValueLakh: 210,
    bedrooms: "4 BHK",
    bathrooms: 4,
    area: "2,400 Sq. Ft.",
  },
  {
    id: "bhelupur-flat",
    slug: "bhelupur-flat",
    title: "2 BHK Flat in Bhelupur",
    image: "/property-images/bhelupur-flat.webp",
    location: "Bhelupur, Varanasi",
    category: "Residential",
    kind: "Rent",
    status: "For Rent",
    price: "₹ 27,000 / Month",
    priceValueLakh: 0.27,
    bedrooms: "2 BHK",
    bathrooms: 2,
    area: "1,050 Sq. Ft.",
  },
  {
    id: "cantt-office",
    slug: "cantt-office",
    title: "Office Space in Cantt",
    image: "/property-images/cantt-office.webp",
    location: "Cantt, Varanasi",
    category: "Commercial",
    kind: "Commercial",
    status: "For Rent",
    price: "₹ 90,000 / Month",
    priceValueLakh: 0.9,
    area: "1,800 Sq. Ft.",
    floor: "2nd Floor",
  },
  {
    id: "paharia-plot",
    slug: "paharia-plot",
    title: "Residential Plot in Paharia",
    image: "/property-images/paharia-plot.webp",
    location: "Paharia, Varanasi",
    category: "Plot / Land",
    kind: "Plots",
    status: "For Sale",
    price: "₹ 36 Lakh",
    priceValueLakh: 36,
    area: "1,200 Sq. Ft.",
  },
];

export const propertyDetails: Record<string, PropertyDetailContent> = {
  "lanka-flat": {
    description:
      "A spacious and well-ventilated 3 BHK flat in Lanka, Varanasi, with room for family living and easy access to the neighbourhood. This illustrative listing follows the property details supplied in the design reference.",
    gallery: [
      "/property-images/lanka-apartments.webp",
      "/property-images/lanka-living-room.webp",
      "/property-images/lanka-bedroom.webp",
      "/property-images/lanka-kitchen.webp",
      "/property-images/lanka-balcony.webp",
    ],
    propertyType: "Apartment / Flat",
    highlights: [
      "Prime location in Lanka",
      "Spacious and well-ventilated rooms",
      "Modern fittings and quality construction",
      "Close to BHU, markets, and hospitals",
      "Suitable for family living or investment",
    ],
    floor: "4th Floor",
    furnishing: "Semi Furnished",
    parking: "1 Car",
    lift: "Yes",
    powerBackup: "24×7 Water & Power",
  },
};

export function getPropertyDetails(propertyId: string) {
  return propertyDetails[propertyId] ?? null;
}

export function getListingFilters() {
  return ["All", "Buy", "Rent", "Commercial", "Plots"] as const;
}