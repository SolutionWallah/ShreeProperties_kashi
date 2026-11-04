import { requireAdminSession } from "../../lib/auth/server";
import { uploadImage, deleteImage } from "../../lib/storage";

export const runtime = "nodejs";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const maxFileSize = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const authCheck = await requireAdminSession();
  if (authCheck.error) {
    return authCheck.error;
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data payload" }, { status: 400 });
  }

  const fileEntries: File[] = [];
  const singleFile = formData.get("file");
  if (singleFile && singleFile instanceof File) {
    fileEntries.push(singleFile);
  }

  const multiFiles = formData.getAll("files");
  for (const item of multiFiles) {
    if (item instanceof File) {
      fileEntries.push(item);
    }
  }

  if (fileEntries.length === 0) {
    return Response.json({ error: "No image file provided" }, { status: 400 });
  }

  if (fileEntries.length > 10) {
    return Response.json({ error: "Maximum 10 files can be uploaded at once" }, { status: 400 });
  }

  const uploadedResults: Array<{ key: string; url: string; name: string; size: number }> = [];

  for (const file of fileEntries) {
    if (!allowedMimeTypes.has(file.type)) {
      return Response.json(
        { error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WEBP, AVIF` },
        { status: 400 },
      );
    }

    if (file.size > maxFileSize) {
      return Response.json(
        { error: `File ${file.name} exceeds maximum limit of 10 MB` },
        { status: 400 },
      );
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadImage(buffer, file.name, file.type);
      uploadedResults.push({
        ...result,
        name: file.name,
        size: file.size,
      });
    } catch (err: any) {
      return Response.json(
        { error: `Failed to upload ${file.name}: ${err?.message || "Storage error"}` },
        { status: 500 },
      );
    }
  }

  return Response.json(
    {
      success: true,
      url: uploadedResults[0]?.url,
      key: uploadedResults[0]?.key,
      urls: uploadedResults.map((r) => r.url),
      files: uploadedResults,
    },
    { status: 201 },
  );
}

export async function DELETE(request: Request) {
  const authCheck = await requireAdminSession();
  if (authCheck.error) {
    return authCheck.error;
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const target = body?.key || body?.url;
  if (!target || typeof target !== "string") {
    return Response.json({ error: "key or url is required" }, { status: 400 });
  }

  try {
    const success = await deleteImage(target);
    return Response.json({ success });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Failed to delete image" }, { status: 500 });
  }
}
