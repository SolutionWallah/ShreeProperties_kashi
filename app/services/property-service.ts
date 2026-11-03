import "server-only";

import { prisma } from "../lib/prisma";

const publicPropertyFields = {
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
} as const;

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
  return prisma.property.findFirst({
    where: { slug, published: true },
    select: publicPropertyFields,
  });
}
