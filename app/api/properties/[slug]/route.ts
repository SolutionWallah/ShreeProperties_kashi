import { findPublishedPropertyBySlug } from "../../../services/property-service";

export const runtime = "nodejs";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;

  if (!slug || slug.length > 220) {
    return Response.json({ error: "Invalid property slug" }, { status: 400 });
  }

  try {
    const property = await findPublishedPropertyBySlug(slug);

    if (!property) {
      return Response.json({ error: "Property not found" }, { status: 404 });
    }

    return Response.json({ property });
  } catch {
    return Response.json({ error: "Property is temporarily unavailable" }, { status: 503 });
  }
}
