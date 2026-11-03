import { listPublishedProperties } from "../../services/property-service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const parameters = new URL(request.url).searchParams;
  const pageValue = parameters.get("page") ?? "1";
  const limitValue = parameters.get("limit") ?? "20";

  if (!/^[1-9]\d*$/.test(pageValue) || !/^[1-9]\d*$/.test(limitValue)) {
    return Response.json({ error: "page and limit must be positive integers" }, { status: 400 });
  }

  const page = Number(pageValue);
  const limit = Number(limitValue);

  if (!Number.isSafeInteger(page) || page > 1000 || !Number.isSafeInteger(limit) || limit > 50) {
    return Response.json({ error: "page must be at most 1000 and limit at most 50" }, { status: 400 });
  }

  try {
    return Response.json(await listPublishedProperties(page, limit));
  } catch {
    return Response.json({ error: "Properties are temporarily unavailable" }, { status: 503 });
  }
}
