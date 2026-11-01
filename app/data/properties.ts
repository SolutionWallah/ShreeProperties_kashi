export type PropertyCategory = "Residential" | "Commercial" | "Plot / Land";
export type ListingKind = "Buy" | "Rent" | "Commercial" | "Plots";

export type Property = {
  id: string;
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
};

// Holds the illustrative property details transcribed from the supplied screens.
export const properties: Property[] = [
  { id: "lanka-flat", title: "3 BHK Flat in Lanka", image: "/property-images/lanka-apartments.webp", location: "Lanka, Varanasi", category: "Residential", kind: "Buy", status: "For Sale", price: "₹ 1.20 Crore", priceValueLakh: 120, bedrooms: "3 BHK", bathrooms: 3, area: "1,450 Sq. Ft." },
  { id: "godowlia-commercial", title: "Commercial Space in Godowlia", image: "/property-images/godowlia-commercial.webp", location: "Godowlia, Varanasi", category: "Commercial", kind: "Commercial", status: "For Lease", price: "₹ 1.50 Lakh / Month", priceValueLakh: 1.5, area: "2,000 Sq. Ft.", floor: "Ground + 1 Floor" },
  { id: "sigra-house", title: "Independent House in Sigra", image: "/property-images/sigra-independent-house.webp", location: "Sigra, Varanasi", category: "Residential", kind: "Buy", status: "For Sale", price: "₹ 2.10 Crore", priceValueLakh: 210, bedrooms: "4 BHK", bathrooms: 4, area: "2,400 Sq. Ft." },
  { id: "bhelupur-flat", title: "2 BHK Flat in Bhelupur", image: "/property-images/bhelupur-flat.webp", location: "Bhelupur, Varanasi", category: "Residential", kind: "Rent", status: "For Rent", price: "₹ 27,000 / Month", priceValueLakh: 0.27, bedrooms: "2 BHK", bathrooms: 2, area: "1,050 Sq. Ft." },
  { id: "cantt-office", title: "Office Space in Cantt", image: "/property-images/cantt-office.webp", location: "Cantt, Varanasi", category: "Commercial", kind: "Commercial", status: "For Rent", price: "₹ 90,000 / Month", priceValueLakh: 0.9, area: "1,800 Sq. Ft.", floor: "2nd Floor" },
  { id: "paharia-plot", title: "Residential Plot in Paharia", image: "/property-images/paharia-plot.webp", location: "Paharia, Varanasi", category: "Plot / Land", kind: "Plots", status: "For Sale", price: "₹ 36 Lakh", priceValueLakh: 36, area: "1,200 Sq. Ft." },
];

// Adds listing-specific gallery and highlights to the supplied Lanka reference listing.
export const propertyDetails: Record<string, PropertyDetailContent> = {
  "lanka-flat": {
    description: "A spacious and well-ventilated 3 BHK flat in Lanka, Varanasi, with room for family living and easy access to the neighbourhood. This illustrative listing follows the property details supplied in the design reference.",
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

// Returns extended display content when a sample listing has a dedicated detail record.
export function getPropertyDetails(propertyId: string) {
  return propertyDetails[propertyId] ?? null;
}

// Returns the readable action label used to filter a listing group.
export function getListingFilters() {
  return ["All", "Buy", "Rent", "Commercial", "Plots"] as const;
}
