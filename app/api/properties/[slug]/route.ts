import { requireAdminSession } from "../../../lib/auth/server";
import {
  deleteProperty,
  findPublishedPropertyBySlug,
  updateProperty,
} from "../../../services/property-service";

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

export async function PATCH(request: Request, { params }: Context) {
  const authCheck = await requireAdminSession();
  if (authCheck.error) {
    return authCheck.error;
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json({ error: "Invalid property identifier" }, { status: 400 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  try {
    const property = await updateProperty(slug, body);
    return Response.json({ property });
  } catch (err: any) {
    const message = err.message || "Failed to update property";
    const status = message === "Property not found" ? 404 : 400;
    return Response.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const authCheck = await requireAdminSession();
  if (authCheck.error) {
    return authCheck.error;
  }

  const { slug } = await params;
  if (!slug) {
    return Response.json({ error: "Invalid property identifier" }, { status: 400 });
  }

  try {
    const result = await deleteProperty(slug);
    return Response.json(result);
  } catch (err: any) {
    const message = err.message || "Failed to delete property";
    const status = message === "Property not found" ? 404 : 400;
    return Response.json({ error: message }, { status });
  }
}
