import type { ListingKind, PropertyCategory } from "../data/properties";

export type AdminStatus = "Available" | "Sold" | "Rented" | "Leased";

export type AdminProperty = {
  id: string;
  slug: string;
  title: string;
  image: string;
  location: string;
  category: PropertyCategory;
  kind: ListingKind;
  status: string;
  adminStatus: AdminStatus;
  published: boolean;
  price: string;
  priceRupees: number;
  priceValueLakh?: number;
  area: string;
  areaSqFt: number;
  description: string;
  bedrooms?: string;
  bathrooms?: number;
  floor?: string;
  totalFloors?: string;
  furnishing?: string;
  parking?: string;
  lift?: string;
  powerBackup?: string;
  photos?: string[];
  youtubeUrl?: string;
  googleMapsUrl?: string;
  highlights?: string[];
  commercialType?: string;
  landUse?: string;
  plotDimensions?: string;
  roadWidth?: string;
  plotFacing?: string;
  boundaryWall?: string;
  createdAt?: string;
  updatedAt?: string;
};

const fallbackImage = "/property-images/lanka-apartments.webp";

export function formatPriceDisplay(rupees: number | string): string {
  const num = Number(rupees);
  if (!Number.isFinite(num) || num <= 0) return "₹0";
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.?0+$/, "");
    return `₹${cr} Cr`;
  }
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2).replace(/\.?0+$/, "");
    return `₹${lakh} Lakh`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export function formatAreaDisplay(sqFt: number | string): string {
  const num = Number(sqFt);
  if (!Number.isFinite(num) || num <= 0) return "0 sq ft";
  return `${num.toLocaleString("en-IN")} sq ft`;
}

export function mapDbPropertyToAdminProperty(item: any): AdminProperty {
  const priceNum = Number(item.priceRupees ?? 0);
  const areaNum = Number(item.areaSqFt ?? 0);

  const statusMap: Record<string, AdminStatus> = {
    AVAILABLE: "Available",
    SOLD: "Sold",
    RENTED: "Rented",
    LEASED: "Leased",
  };

  const kindMap: Record<string, ListingKind> = {
    BUY: "Buy",
    RENT: "Rent",
    COMMERCIAL: "Commercial",
    PLOTS: "Plots",
  };

  const categoryMap: Record<string, PropertyCategory> = {
    RESIDENTIAL: "Residential",
    COMMERCIAL: "Commercial",
    PLOT_LAND: "Plot / Land",
  };

  const adminStatus = statusMap[item.status] ?? "Available";
  const kind = kindMap[item.kind] ?? "Buy";
  const category = categoryMap[item.category] ?? "Residential";

  const photos = Array.isArray(item.images)
    ? item.images.map((img: any) => img.objectKey).filter(Boolean)
    : [];

  const mainImage = photos.length > 0 ? photos[0] : fallbackImage;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    image: mainImage,
    location: item.location,
    category,
    kind,
    status: item.kind === "Rent" ? "For Rent" : item.kind === "Commercial" ? "For Lease" : "For Sale",
    adminStatus,
    published: Boolean(item.published),
    price: formatPriceDisplay(priceNum),
    priceRupees: priceNum,
    priceValueLakh: priceNum / 100000,
    area: formatAreaDisplay(areaNum),
    areaSqFt: areaNum,
    description: item.description ?? "",
    bedrooms: item.bedrooms ?? undefined,
    bathrooms: item.bathrooms !== null && item.bathrooms !== undefined ? Number(item.bathrooms) : undefined,
    floor: item.floor ?? undefined,
    totalFloors: item.totalFloors ?? undefined,
    furnishing: item.furnishing ?? undefined,
    parking: item.parking ?? undefined,
    lift: item.lift ?? undefined,
    powerBackup: item.powerBackup ?? undefined,
    photos,
    youtubeUrl: item.youtubeUrl ?? undefined,
    googleMapsUrl: item.googleMapsUrl ?? undefined,
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    commercialType: item.commercialType ?? undefined,
    landUse: item.landUse ?? undefined,
    plotDimensions: item.plotDimensions ?? undefined,
    roadWidth: item.roadWidth ?? undefined,
    plotFacing: item.plotFacing ?? undefined,
    boundaryWall: item.boundaryWall ?? undefined,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export async function fetchAdminPropertiesList(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  query?: string;
}): Promise<{ properties: AdminProperty[]; total: number; totalPages: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set("page", String(params.page));
  if (params?.limit) queryParams.set("limit", String(params.limit));
  if (params?.status && params.status !== "All") queryParams.set("status", params.status);
  if (params?.category && params.category !== "All") queryParams.set("category", params.category);
  if (params?.query) queryParams.set("query", params.query);

  const res = await fetch(`/api/admin/properties?${queryParams.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to load admin properties: ${res.statusText}`);
  }

  const data = await res.json();
  const rawList = Array.isArray(data.properties) ? data.properties : [];
  return {
    properties: rawList.map(mapDbPropertyToAdminProperty),
    total: data.total ?? rawList.length,
    totalPages: data.totalPages ?? 1,
  };
}

export async function createPropertyApi(payload: any): Promise<AdminProperty> {
  const res = await fetch("/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create property");
  }

  return mapDbPropertyToAdminProperty(data.property);
}

export async function updatePropertyApi(slugOrId: string, payload: any): Promise<AdminProperty> {
  const res = await fetch(`/api/properties/${encodeURIComponent(slugOrId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to update property");
  }

  return mapDbPropertyToAdminProperty(data.property);
}

export async function deletePropertyApi(slugOrId: string): Promise<void> {
  const res = await fetch(`/api/properties/${encodeURIComponent(slugOrId)}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to delete property");
  }
}

export async function uploadImagesApi(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const res = await fetch("/api/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to upload images");
  }

  return Array.isArray(data.urls) ? data.urls : data.url ? [data.url] : [];
}

