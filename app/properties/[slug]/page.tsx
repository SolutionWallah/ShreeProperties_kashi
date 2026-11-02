import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { PropertyDetailView } from "../../components/property-detail-view";
import { getPropertyDetails, properties } from "../../data/properties";

/** Resolves the requested listing and presents its reusable detail view. */
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((item) => item.id === slug);
  if (!property) notFound();

  return (
    <>
      <SiteHeader current="properties" />
      <PropertyDetailView property={property} details={getPropertyDetails(property.id)} />
    </>
  );
}
