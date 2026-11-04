import "server-only";

import { ListingKind, PropertyCategory, PropertyStatus } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { generateUniqueSlug } from "../lib/slug";

export const publicPropertyFields = {
  id: true,
  slug: true,
  title: true,
  kind: true,
  category: true,
  status: true,
  location: true,
  priceRupees: true,
  areaSqFt: true,
  description: true,
  bedrooms: true,
  bathrooms: true,
  floor: true,
  totalFloors: true,
  furnishing: true,
  parking: true,
  lift: true,
  powerBackup: true,
  commercialType: true,
  landUse: true,
  plotDimensions: true,
  roadWidth: true,
  plotFacing: true,
  boundaryWall: true,
  youtubeUrl: true,
  googleMapsUrl: true,
  highlights: true,
  createdAt: true,
  updatedAt: true,
  images: {
    select: {
      id: true,
      objectKey: true,
      position: true,
    },
    orderBy: {
      position: "asc" as const,
    },
  },
} as const;

export const adminPropertyFields = {
  ...publicPropertyFields,
  published: true,
} as const;

export function parseListingKind(value: unknown): ListingKind {
  if (typeof value !== "string") {
    throw new Error("kind must be a string");
  }
  const normalized = value.trim().toUpperCase();
  if (normalized === "BUY" || normalized === "FOR SALE") return ListingKind.BUY;
  if (normalized === "RENT" || normalized === "FOR RENT") return ListingKind.RENT;
  if (normalized === "COMMERCIAL" || normalized === "FOR LEASE") return ListingKind.COMMERCIAL;
  if (normalized === "PLOTS" || normalized === "PLOT") return ListingKind.PLOTS;
  throw new Error(`Invalid listing kind: ${value}`);
}

export function parsePropertyCategory(value: unknown): PropertyCategory {
  if (typeof value !== "string") {
    throw new Error("category must be a string");
  }
  const normalized = value.trim().toUpperCase().replace(/[\s/_-]+/g, "");
  if (normalized === "RESIDENTIAL") return PropertyCategory.RESIDENTIAL;
  if (normalized === "COMMERCIAL") return PropertyCategory.COMMERCIAL;
  if (normalized === "PLOTLAND" || normalized === "PLOT" || normalized === "LAND") return PropertyCategory.PLOT_LAND;
  throw new Error(`Invalid property category: ${value}`);
}

export function parsePropertyStatus(value: unknown): PropertyStatus {
  if (typeof value !== "string") {
    throw new Error("status must be a string");
  }
  const normalized = value.trim().toUpperCase();
  if (normalized === "AVAILABLE") return PropertyStatus.AVAILABLE;
  if (normalized === "SOLD") return PropertyStatus.SOLD;
  if (normalized === "RENTED") return PropertyStatus.RENTED;
  if (normalized === "LEASED") return PropertyStatus.LEASED;
  throw new Error(`Invalid property status: ${value}`);
}

export type CreatePropertyInput = {
  title: string;
  kind: ListingKind | string;
  category: PropertyCategory | string;
  status?: PropertyStatus | string;
  published?: boolean;
  location: string;
  priceRupees: number | string;
  areaSqFt: number | string;
  description: string;
  bedrooms?: string | null;
  bathrooms?: number | string | null;
  floor?: string | null;
  totalFloors?: string | null;
  furnishing?: string | null;
  parking?: string | null;
  lift?: string | null;
  powerBackup?: string | null;
  commercialType?: string | null;
  landUse?: string | null;
  plotDimensions?: string | null;
  roadWidth?: string | null;
  plotFacing?: string | null;
  boundaryWall?: string | null;
  youtubeUrl?: string | null;
  googleMapsUrl?: string | null;
  highlights?: string[];
  photos?: string[];
};

export type UpdatePropertyInput = Partial<CreatePropertyInput>;

function validateCommonFields(data: Partial<CreatePropertyInput>) {
  if (data.title !== undefined) {
    const trimmed = data.title.trim();
    if (!trimmed || trimmed.length > 200) {
      throw new Error("title is required and must be between 1 and 200 characters");
    }
  }

  if (data.location !== undefined) {
    const trimmed = data.location.trim();
    if (!trimmed || trimmed.length > 200) {
      throw new Error("location is required and must be between 1 and 200 characters");
    }
  }

  if (data.description !== undefined) {
    const trimmed = data.description.trim();
    if (!trimmed || trimmed.length > 500) {
      throw new Error("description is required and must be between 1 and 500 characters");
    }
  }

  if (data.priceRupees !== undefined) {
    const priceNum = Number(data.priceRupees);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      throw new Error("priceRupees must be a non-negative number");
    }
  }

  if (data.areaSqFt !== undefined) {
    const areaNum = Number(data.areaSqFt);
    if (!Number.isFinite(areaNum) || areaNum <= 0) {
      throw new Error("areaSqFt must be a positive number greater than 0");
    }
  }

  if (data.highlights !== undefined) {
    if (!Array.isArray(data.highlights) || data.highlights.length > 5) {
      throw new Error("highlights must be an array of at most 5 items");
    }
  }
}

export async function listPublishedProperties(page: number, limit: number) {
  const properties = await prisma.property.findMany({
    where: { published: true },
    select: publicPropertyFields,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * limit,
    take: limit + 1,
  });

  return {
    properties: properties.slice(0, limit),
    page,
    limit,
    hasNextPage: properties.length > limit,
  };
}

export async function findPublishedPropertyBySlug(slug: string) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  return prisma.property.findFirst({
    where: isUuid ? { id: slug, published: true } : { slug, published: true },
    select: publicPropertyFields,
  });
}

export async function findSimilarPublishedProperties(excludeId: string, limit = 3) {
  return prisma.property.findMany({
    where: { published: true, id: { not: excludeId } },
    select: publicPropertyFields,
    orderBy: [{ createdAt: "desc" }],
    take: limit,
  });
}

export async function findPropertyByIdOrSlug(identifier: string) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  return prisma.property.findFirst({
    where: isUuid ? { id: identifier } : { slug: identifier },
    select: adminPropertyFields,
  });
}

export async function listAdminProperties(options: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  query?: string;
}) {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(100, Math.max(1, options.limit ?? 20));

  const where: any = {};

  if (options.status && options.status !== "All") {
    try {
      where.status = parsePropertyStatus(options.status);
    } catch {
      where.status = options.status;
    }
  }

  if (options.category && options.category !== "All") {
    try {
      where.category = parsePropertyCategory(options.category);
    } catch {
      where.category = options.category;
    }
  }

  if (options.query && options.query.trim()) {
    const q = options.query.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
    ];
  }

  const [total, properties] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.findMany({
      where,
      select: adminPropertyFields,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    properties,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function createProperty(data: CreatePropertyInput) {
  validateCommonFields(data);

  if (!data.title?.trim()) throw new Error("title is required");
  if (!data.location?.trim()) throw new Error("location is required");
  if (!data.description?.trim()) throw new Error("description is required");
  if (data.priceRupees === undefined) throw new Error("priceRupees is required");
  if (data.areaSqFt === undefined) throw new Error("areaSqFt is required");

  const kind = parseListingKind(data.kind);
  const category = parsePropertyCategory(data.category);
  const status = data.status ? parsePropertyStatus(data.status) : PropertyStatus.AVAILABLE;
  const published = data.published !== undefined ? Boolean(data.published) : true;

  const slug = await generateUniqueSlug(data.title.trim());

  const bathroomsNum =
    data.bathrooms !== undefined && data.bathrooms !== null && data.bathrooms !== ""
      ? Math.max(0, parseInt(String(data.bathrooms), 10) || 0)
      : null;

  const property = await prisma.property.create({
    data: {
      slug,
      title: data.title.trim(),
      kind,
      category,
      status,
      published,
      location: data.location.trim(),
      priceRupees: Number(data.priceRupees),
      areaSqFt: Number(data.areaSqFt),
      description: data.description.trim(),
      bedrooms: data.bedrooms?.trim() || null,
      bathrooms: bathroomsNum,
      floor: data.floor?.trim() || null,
      totalFloors: data.totalFloors?.trim() || null,
      furnishing: data.furnishing?.trim() || null,
      parking: data.parking?.trim() || null,
      lift: data.lift?.trim() || null,
      powerBackup: data.powerBackup?.trim() || null,
      commercialType: data.commercialType?.trim() || null,
      landUse: data.landUse?.trim() || null,
      plotDimensions: data.plotDimensions?.trim() || null,
      roadWidth: data.roadWidth?.trim() || null,
      plotFacing: data.plotFacing?.trim() || null,
      boundaryWall: data.boundaryWall?.trim() || null,
      youtubeUrl: data.youtubeUrl?.trim() || null,
      googleMapsUrl: data.googleMapsUrl?.trim() || null,
      highlights: (data.highlights ?? []).map((h) => h.trim()).filter(Boolean).slice(0, 5),
      images:
        data.photos && data.photos.length > 0
          ? {
              create: data.photos.slice(0, 10).map((objectKey, index) => ({
                objectKey: objectKey.trim(),
                position: index,
              })),
            }
          : undefined,
    },
    select: adminPropertyFields,
  });

  return property;
}

export async function updateProperty(identifier: string, data: UpdatePropertyInput) {
  const existing = await findPropertyByIdOrSlug(identifier);
  if (!existing) {
    throw new Error("Property not found");
  }

  validateCommonFields(data);

  const updateData: any = {};

  if (data.title !== undefined) {
    const trimmedTitle = data.title.trim();
    updateData.title = trimmedTitle;
    if (trimmedTitle !== existing.title) {
      updateData.slug = await generateUniqueSlug(trimmedTitle, existing.id);
    }
  }

  if (data.kind !== undefined) updateData.kind = parseListingKind(data.kind);
  if (data.category !== undefined) updateData.category = parsePropertyCategory(data.category);
  if (data.status !== undefined) updateData.status = parsePropertyStatus(data.status);
  if (data.published !== undefined) updateData.published = Boolean(data.published);
  if (data.location !== undefined) updateData.location = data.location.trim();
  if (data.priceRupees !== undefined) updateData.priceRupees = Number(data.priceRupees);
  if (data.areaSqFt !== undefined) updateData.areaSqFt = Number(data.areaSqFt);
  if (data.description !== undefined) updateData.description = data.description.trim();
  if (data.bedrooms !== undefined) updateData.bedrooms = data.bedrooms ? data.bedrooms.trim() : null;
  if (data.bathrooms !== undefined) {
    updateData.bathrooms =
      data.bathrooms !== null && data.bathrooms !== ""
        ? Math.max(0, parseInt(String(data.bathrooms), 10) || 0)
        : null;
  }
  if (data.floor !== undefined) updateData.floor = data.floor ? data.floor.trim() : null;
  if (data.totalFloors !== undefined) updateData.totalFloors = data.totalFloors ? data.totalFloors.trim() : null;
  if (data.furnishing !== undefined) updateData.furnishing = data.furnishing ? data.furnishing.trim() : null;
  if (data.parking !== undefined) updateData.parking = data.parking ? data.parking.trim() : null;
  if (data.lift !== undefined) updateData.lift = data.lift ? data.lift.trim() : null;
  if (data.powerBackup !== undefined) updateData.powerBackup = data.powerBackup ? data.powerBackup.trim() : null;
  if (data.commercialType !== undefined) updateData.commercialType = data.commercialType ? data.commercialType.trim() : null;
  if (data.landUse !== undefined) updateData.landUse = data.landUse ? data.landUse.trim() : null;
  if (data.plotDimensions !== undefined) updateData.plotDimensions = data.plotDimensions ? data.plotDimensions.trim() : null;
  if (data.roadWidth !== undefined) updateData.roadWidth = data.roadWidth ? data.roadWidth.trim() : null;
  if (data.plotFacing !== undefined) updateData.plotFacing = data.plotFacing ? data.plotFacing.trim() : null;
  if (data.boundaryWall !== undefined) updateData.boundaryWall = data.boundaryWall ? data.boundaryWall.trim() : null;
  if (data.youtubeUrl !== undefined) updateData.youtubeUrl = data.youtubeUrl ? data.youtubeUrl.trim() : null;
  if (data.googleMapsUrl !== undefined) updateData.googleMapsUrl = data.googleMapsUrl ? data.googleMapsUrl.trim() : null;
  if (data.highlights !== undefined) {
    updateData.highlights = data.highlights.map((h) => h.trim()).filter(Boolean).slice(0, 5);
  }

  if (data.photos !== undefined) {
    await prisma.propertyImage.deleteMany({
      where: { propertyId: existing.id },
    });

    if (data.photos.length > 0) {
      await prisma.propertyImage.createMany({
        data: data.photos.slice(0, 10).map((objectKey, index) => ({
          propertyId: existing.id,
          objectKey: objectKey.trim(),
          position: index,
        })),
      });
    }
  }

  const updated = await prisma.property.update({
    where: { id: existing.id },
    data: updateData,
    select: adminPropertyFields,
  });

  return updated;
}

export async function deleteProperty(identifier: string) {
  const existing = await findPropertyByIdOrSlug(identifier);
  if (!existing) {
    throw new Error("Property not found");
  }

  await prisma.property.delete({
    where: { id: existing.id },
  });

  return { success: true, deletedId: existing.id, deletedSlug: existing.slug };
}
