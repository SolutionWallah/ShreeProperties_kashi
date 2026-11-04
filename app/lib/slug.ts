import { prisma } from "./prisma";

export function slugify(text: string): string {
  const normalized = text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const safe = normalized.length > 0 ? normalized : "property";
  return safe.slice(0, 180);
}

export async function generateUniqueSlug(title: string, excludePropertyId?: string): Promise<string> {
  const baseSlug = slugify(title);

  const existing = await prisma.property.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });

  const matchingSlugs = new Set(
    existing
      .filter((item) => !excludePropertyId || item.id !== excludePropertyId)
      .map((item) => item.slug),
  );

  if (!matchingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  while (matchingSlugs.has(`${baseSlug}-${counter}`)) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}
