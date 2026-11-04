import { requireAdminSession } from "../../../lib/auth/server";
import { listAdminProperties } from "../../../services/property-service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authCheck = await requireAdminSession();
  if (authCheck.error) {
    return authCheck.error;
  }

  const parameters = new URL(request.url).searchParams;
  const page = Number(parameters.get("page") ?? "1");
  const limit = Number(parameters.get("limit") ?? "20");
  const status = parameters.get("status") ?? undefined;
  const category = parameters.get("category") ?? undefined;
  const query = parameters.get("query") ?? undefined;

  try {
    const result = await listAdminProperties({
      page: Number.isSafeInteger(page) ? page : 1,
      limit: Number.isSafeInteger(limit) ? limit : 20,
      status,
      category,
      query,
    });
    return Response.json(result);
  } catch (err: any) {
    return Response.json(
      { error: err.message || "Failed to list admin properties" },
      { status: 500 },
    );
  }
}
