import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { PropertyDetailView } from "../../components/property-detail-view";
import {
  mapDbPropertyToDetail,
  mapDbPropertyToPublic,
} from "../../data/properties";
import type { Property, PropertyDetailContent } from "../../data/properties";
import {
  findPublishedPropertyBySlug,
  findSimilarPublishedProperties,
} from "../../services/property-service";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let property: Property | null = null;
  let details: PropertyDetailContent | null = null;
  let similarProperties: Property[] = [];

  try {
    const dbItem = await findPublishedPropertyBySlug(slug);
    if (dbItem) {
      property = mapDbPropertyToPublic(dbItem);
      details = mapDbPropertyToDetail(dbItem);
      const dbSimilar = await findSimilarPublishedProperties(dbItem.id, 3);
      if (dbSimilar.length > 0) {
        similarProperties = dbSimilar.map(mapDbPropertyToPublic);
      }
    }
  } catch {}

  if (!property) {
    notFound();
  }

  return (
    <>
      <SiteHeader current="properties" />
      <PropertyDetailView
        property={property}
        details={details}
        similarProperties={similarProperties}
      />
    </>
  );
}