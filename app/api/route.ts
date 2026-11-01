import { properties } from "../data/properties";

/** Returns the current illustrative property listings for future public clients. */
export function GET() {
  return Response.json({
    source: "illustrative-reference-data",
    total: properties.length,
    properties,
  });
}
