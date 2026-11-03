CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "ListingKind" AS ENUM ('Buy', 'Rent', 'Commercial', 'Plots');

CREATE TYPE "PropertyCategory" AS ENUM ('Residential', 'Commercial', 'Plot / Land');

CREATE TYPE "PropertyStatus" AS ENUM ('Available', 'Sold', 'Rented', 'Leased');

CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" VARCHAR(220) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "kind" "ListingKind" NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'Available',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "location" VARCHAR(200) NOT NULL,
    "price_rupees" DECIMAL(15,2) NOT NULL,
    "area_sq_ft" DECIMAL(12,2) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "bedrooms" VARCHAR(20),
    "bathrooms" INTEGER,
    "floor" VARCHAR(50),
    "total_floors" VARCHAR(50),
    "furnishing" VARCHAR(50),
    "parking" VARCHAR(50),
    "lift" VARCHAR(20),
    "power_backup" VARCHAR(50),
    "commercial_type" VARCHAR(50),
    "land_use" VARCHAR(50),
    "plot_dimensions" VARCHAR(100),
    "road_width" VARCHAR(50),
    "plot_facing" VARCHAR(50),
    "boundary_wall" VARCHAR(20),
    "youtube_url" VARCHAR(2048),
    "google_maps_url" VARCHAR(2048),
    "highlights" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "properties_slug_not_blank" CHECK (length(btrim("slug")) > 0),
    CONSTRAINT "properties_title_not_blank" CHECK (length(btrim("title")) > 0),
    CONSTRAINT "properties_location_not_blank" CHECK (length(btrim("location")) > 0),
    CONSTRAINT "properties_description_not_blank" CHECK (length(btrim("description")) > 0),
    CONSTRAINT "properties_price_nonnegative" CHECK ("price_rupees" >= 0),
    CONSTRAINT "properties_area_positive" CHECK ("area_sq_ft" > 0),
    CONSTRAINT "properties_bathrooms_nonnegative" CHECK ("bathrooms" IS NULL OR "bathrooms" >= 0),
    CONSTRAINT "properties_highlights_limit" CHECK (cardinality("highlights") <= 5)
);

CREATE TABLE "property_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "property_id" UUID NOT NULL,
    "object_key" VARCHAR(1024) NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "property_images_position_range" CHECK ("position" >= 0 AND "position" < 10),
    CONSTRAINT "property_images_key_not_blank" CHECK (length(btrim("object_key")) > 0)
);

CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

CREATE INDEX "properties_published_created_at_idx" ON "properties"("published", "created_at" DESC);

CREATE INDEX "properties_category_status_idx" ON "properties"("category", "status");

CREATE UNIQUE INDEX "property_images_object_key_key" ON "property_images"("object_key");

CREATE UNIQUE INDEX "property_images_property_id_position_key" ON "property_images"("property_id", "position");

ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
