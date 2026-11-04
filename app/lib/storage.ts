import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";

const region = process.env.AWS_REGION || "ap-southeast-1";
const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const isS3Configured = Boolean(endpoint && bucketName && accessKeyId && secretAccessKey);

const s3Client = isS3Configured
  ? new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
      forcePathStyle: true,
      requestChecksumCalculation: "WHEN_REQUIRED",
    })
  : null;

function resolveExtension(filename: string, mimeType: string): string {
  const mimeMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };

  if (mimeMap[mimeType]) return mimeMap[mimeType];

  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex !== -1 && dotIndex < filename.length - 1) {
    const ext = filename.slice(dotIndex + 1).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (ext && ext.length <= 5) return ext;
  }

  return "webp";
}

export async function uploadImage(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string,
): Promise<{ key: string; url: string }> {
  const ext = resolveExtension(originalFilename, mimeType);
  const randomSuffix = randomBytes(8).toString("hex");
  const key = `prop_${Date.now()}_${randomSuffix}.${ext}`;

  if (s3Client && bucketName && endpoint) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType || "image/webp",
    });

    await s3Client.send(command);

    const cleanEndpoint = endpoint.replace(/\/+$/, "");
    const url = `${cleanEndpoint}/${bucketName}/${key}`;

    return { key, url };
  }

  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const filePath = join(uploadDir, key);
  await writeFile(filePath, buffer);

  return { key, url: `/uploads/${key}` };
}

export async function deleteImage(keyOrUrl: string): Promise<boolean> {
  if (!keyOrUrl) return false;

  let key = keyOrUrl;
  if (key.startsWith("http://") || key.startsWith("https://")) {
    const parts = key.split("/");
    key = parts[parts.length - 1];
  } else if (key.startsWith("/uploads/")) {
    key = key.replace(/^\/uploads\//, "");
  }

  if (s3Client && bucketName) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      await s3Client.send(command);
      return true;
    } catch {
      return false;
    }
  }

  try {
    const filePath = join(process.cwd(), "public", "uploads", key);
    await unlink(filePath);
    return true;
  } catch {
    return false;
  }
}
