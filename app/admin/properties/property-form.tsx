"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { Icon } from "../../components/icons";
import type { ListingKind, PropertyCategory } from "../../data/properties";
import {
  createPropertyApi,
  updatePropertyApi,
  uploadImagesApi,
  type AdminStatus,
} from "../data";

type FormValues = {
  title: string;
  kind: ListingKind;
  category: PropertyCategory;
  bedrooms: string;
  bathrooms: string;
  area: string;
  price: string;
  location: string;
  description: string;
  status: AdminStatus;
  floor: string;
  totalFloors: string;
  furnishing: string;
  parking: string;
  lift: string;
  powerBackup: string;
  commercialType: string;
  landUse: string;
  plotDimensions: string;
  roadWidth: string;
  plotFacing: string;
  boundaryWall: string;
  youtubeUrl: string;
  googleMapsUrl: string;
  highlights: string[];
  published: boolean;
};

const emptyForm: FormValues = {
  title: "",
  kind: "Buy",
  category: "Residential",
  bedrooms: "",
  bathrooms: "",
  area: "",
  price: "",
  location: "",
  description: "",
  status: "Available",
  floor: "",
  totalFloors: "",
  furnishing: "Semi Furnished",
  parking: "1 Car",
  lift: "Yes",
  powerBackup: "Yes",
  commercialType: "Office",
  landUse: "Residential Plot",
  plotDimensions: "",
  roadWidth: "",
  plotFacing: "",
  boundaryWall: "",
  youtubeUrl: "",
  googleMapsUrl: "",
  highlights: [],
  published: true,
};

const listingOptions: Array<{ value: ListingKind; label: string; icon: "tag" | "key" | "file" }> = [
  { value: "Buy", label: "For Sale", icon: "tag" },
  { value: "Rent", label: "For Rent", icon: "key" },
  { value: "Commercial", label: "For Lease", icon: "file" },
];

const statusOptions: Array<{ value: AdminStatus; icon: "check" | "tag" | "key" }> = [
  { value: "Available", icon: "check" },
  { value: "Sold", icon: "tag" },
  { value: "Rented", icon: "key" },
  { value: "Leased", icon: "key" },
];

const fallbackImage = "/property-images/lanka-apartments.webp";

export function AdminPropertyForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<Array<File | null>>([]);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("edit");
    if (!id) return;

    async function loadEditProperty() {
      try {
        const res = await fetch(`/api/properties/${encodeURIComponent(id!)}`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        const record = data.property;
        if (!record) return;

        setEditId(record.slug || record.id);
        setValues({
          title: record.title ?? "",
          kind: record.kind === "BUY" ? "Buy" : record.kind === "RENT" ? "Rent" : record.kind === "COMMERCIAL" ? "Commercial" : "Plots",
          category: record.category === "RESIDENTIAL" ? "Residential" : record.category === "COMMERCIAL" ? "Commercial" : "Plot / Land",
          bedrooms: record.bedrooms ?? "",
          bathrooms: record.bathrooms ? String(record.bathrooms) : "",
          area: String(record.areaSqFt ?? ""),
          price: String(record.priceRupees ?? ""),
          location: record.location ?? "",
          description: record.description ?? "",
          status: record.status === "SOLD" ? "Sold" : record.status === "RENTED" ? "Rented" : record.status === "LEASED" ? "Leased" : "Available",
          published: Boolean(record.published ?? true),
          floor: record.floor ?? "",
          totalFloors: record.totalFloors ?? "",
          furnishing: record.furnishing ?? emptyForm.furnishing,
          parking: record.parking ?? emptyForm.parking,
          lift: record.lift ?? emptyForm.lift,
          powerBackup: record.powerBackup ?? emptyForm.powerBackup,
          commercialType: record.commercialType ?? emptyForm.commercialType,
          landUse: record.landUse ?? emptyForm.landUse,
          plotDimensions: record.plotDimensions ?? "",
          roadWidth: record.roadWidth ?? "",
          plotFacing: record.plotFacing ?? "",
          boundaryWall: record.boundaryWall ?? "",
          youtubeUrl: record.youtubeUrl ?? "",
          googleMapsUrl: record.googleMapsUrl ?? "",
          highlights: Array.isArray(record.highlights) ? record.highlights : [],
        });

        const imageKeys = Array.isArray(record.images)
          ? record.images.map((img: any) => img.objectKey).filter(Boolean)
          : [];
        setPreviews(imageKeys.length ? imageKeys : [fallbackImage]);
        setPhotoFiles((imageKeys.length ? imageKeys : [fallbackImage]).map(() => null));
      } catch {
        setMessage("Could not load existing property details.");
      }
    }

    loadEditProperty();
  }, []);

  useEffect(
    () => () =>
      previewUrlsRef.current.forEach(
        (preview) => preview.startsWith("blob:") && URL.revokeObjectURL(preview),
      ),
    [],
  );

  function addPhotos(files: FileList | File[]) {
    const valid = Array.from(files).filter(
      (file) => /^image\/(jpeg|png|webp|avif)$/.test(file.type) && file.size <= 10 * 1024 * 1024,
    );
    const available = Math.max(0, 10 - previews.length);
    const addedFiles = valid.slice(0, available);
    const next = addedFiles.map((file) => URL.createObjectURL(file));
    previewUrlsRef.current = [...previewUrlsRef.current, ...next];
    setPhotoFiles((current) => [...current, ...addedFiles]);
    setPreviews((current) => [...current, ...next]);
    if (valid.length !== files.length || valid.length > available)
      setMessage("Use JPG, PNG, WEBP, or AVIF photos up to 10 MB each, with 10 photos maximum.");
  }

  function setCover(index: number) {
    const nextPreviews = [
      previews[index],
      ...previews.filter((_, itemIndex) => itemIndex !== index),
    ];
    const nextFiles = [
      photoFiles[index],
      ...photoFiles.filter((_, itemIndex) => itemIndex !== index),
    ];
    previewUrlsRef.current = nextPreviews;
    setPreviews(nextPreviews);
    setPhotoFiles(nextFiles);
  }

  function removePhoto(index: number) {
    const removed = previews[index];
    if (removed?.startsWith("blob:")) URL.revokeObjectURL(removed);
    const nextPreviews = previews.filter((_, itemIndex) => itemIndex !== index);
    previewUrlsRef.current = nextPreviews;
    setPreviews(nextPreviews);
    setPhotoFiles(photoFiles.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveForm(isDraft = false) {
    setIsSaving(true);
    setMessage("Saving property to server...");

    const cleanPrice = Number(values.price.replace(/[^\d.]/g, ""));
    const cleanArea = Number(values.area.replace(/[^\d.]/g, ""));

    if (!values.title.trim()) {
      setMessage("Title is required.");
      setIsSaving(false);
      return;
    }
    if (!values.location.trim()) {
      setMessage("Location is required.");
      setIsSaving(false);
      return;
    }
    if (!cleanPrice || cleanPrice < 0) {
      setMessage("Please enter a valid price.");
      setIsSaving(false);
      return;
    }
    if (!cleanArea || cleanArea <= 0) {
      setMessage("Please enter a valid area in sq ft.");
      setIsSaving(false);
      return;
    }

    try {
      setMessage("Uploading photos...");
      const validPhotos: string[] = [];
      for (let i = 0; i < previews.length; i++) {
        const file = photoFiles[i];
        if (file) {
          setMessage(`Uploading photo ${i + 1} of ${previews.length}...`);
          const uploadedUrls = await uploadImagesApi([file]);
          if (uploadedUrls[0]) {
            validPhotos.push(uploadedUrls[0]);
          }
        } else if (previews[i] && !previews[i].startsWith("blob:")) {
          validPhotos.push(previews[i]);
        }
      }

      const finalPhotos = validPhotos.length ? validPhotos : [fallbackImage];

      const payload = {
        title: values.title.trim(),
        kind: values.kind,
        category: values.category,
        location: values.location.trim(),
        priceRupees: cleanPrice,
        areaSqFt: cleanArea,
        description: values.description.trim() || values.title.trim(),
        status: values.status,
        published: isDraft ? false : values.published,
        bedrooms: values.category === "Residential" ? values.bedrooms.trim() || null : null,
        bathrooms: values.category !== "Plot / Land" && values.bathrooms ? Number(values.bathrooms) : null,
        floor: values.category !== "Plot / Land" ? values.floor.trim() || null : null,
        totalFloors: values.category !== "Plot / Land" ? values.totalFloors.trim() || null : null,
        furnishing: values.category === "Residential" ? values.furnishing || null : null,
        parking: values.category !== "Plot / Land" ? values.parking || null : null,
        lift: values.category !== "Plot / Land" ? values.lift || null : null,
        powerBackup: values.category !== "Plot / Land" ? values.powerBackup || null : null,
        commercialType: values.category === "Commercial" ? values.commercialType || null : null,
        landUse: values.category === "Plot / Land" ? values.landUse || null : null,
        plotDimensions: values.category === "Plot / Land" ? values.plotDimensions.trim() || null : null,
        roadWidth: values.category === "Plot / Land" ? values.roadWidth.trim() || null : null,
        plotFacing: values.category === "Plot / Land" ? values.plotFacing || null : null,
        boundaryWall: values.category === "Plot / Land" ? values.boundaryWall || null : null,
        youtubeUrl: values.youtubeUrl.trim() || null,
        googleMapsUrl: values.googleMapsUrl.trim() || null,
        highlights: values.highlights.map((h) => h.trim()).filter(Boolean).slice(0, 5),
        photos: finalPhotos,
      };

      if (editId) {
        await updatePropertyApi(editId, payload);
      } else {
        await createPropertyApi(payload);
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err: any) {
      setMessage(err.message || "Could not save property to server.");
      setIsSaving(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveForm(false);
  }

  async function handleDraft() {
    const form = document.querySelector<HTMLFormElement>(".admin-form");
    if (form?.reportValidity()) await saveForm(true);
  }

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function changeCategory(category: PropertyCategory) {
    setValues((current) => ({
      ...current,
      category,
      bedrooms: category === "Residential" ? current.bedrooms : "",
      bathrooms: category === "Plot / Land" ? "" : current.bathrooms,
      floor: category === "Plot / Land" ? "" : current.floor,
      totalFloors: category === "Plot / Land" ? "" : current.totalFloors,
      furnishing: category === "Residential" ? current.furnishing || emptyForm.furnishing : "",
      parking: category === "Plot / Land" ? "" : current.parking || emptyForm.parking,
      lift: category === "Plot / Land" ? "" : current.lift || emptyForm.lift,
      powerBackup: category === "Plot / Land" ? "" : current.powerBackup || emptyForm.powerBackup,
      commercialType: category === "Commercial" ? current.commercialType : "",
      landUse: category === "Plot / Land" ? current.landUse : "",
      plotDimensions: category === "Plot / Land" ? current.plotDimensions : "",
      roadWidth: category === "Plot / Land" ? current.roadWidth : "",
      plotFacing: category === "Plot / Land" ? current.plotFacing : "",
      boundaryWall: category === "Plot / Land" ? current.boundaryWall : "",
    }));
  }

  function addHighlight() {
    if (values.highlights.length < 5) updateField("highlights", [...values.highlights, ""]);
  }

  function updateHighlight(index: number, value: string) {
    updateField(
      "highlights",
      values.highlights.map((highlight, itemIndex) => (itemIndex === index ? value : highlight)),
    );
  }

  function removeHighlight(index: number) {
    updateField(
      "highlights",
      values.highlights.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    addPhotos(event.dataTransfer.files);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addPhotos(event.target.files);
    event.target.value = "";
  }

  return (
    <form className="admin-form" onSubmit={(event) => handleSubmit(event)}>
      <div className="admin-form-grid">
        <section
          className="admin-panel admin-details-panel"
          aria-labelledby="property-details-heading"
        >
          <h2 className="admin-section-heading" id="property-details-heading">
            <Icon name="building" />
            Property Details
          </h2>
          <div className="admin-form-row admin-form-row--title-type">
            <FormField label="Property Title" required>
              <input
                required
                value={values.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="e.g. 3 BHK Flat in Lanka"
              />
            </FormField>
            <fieldset className="admin-field admin-listing-type">
              <legend>
                Listing Type <span>*</span>
              </legend>
              <div>
                {listingOptions.map((option) => (
                  <button
                    className={values.kind === option.value ? "is-selected" : ""}
                    key={option.value}
                    type="button"
                    aria-pressed={values.kind === option.value}
                    onClick={() => updateField("kind", option.value)}
                  >
                    <Icon name={option.icon} />
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="admin-form-row admin-form-row--four">
            <FormField label="Property Category" required>
              <select
                value={values.category}
                onChange={(event) => changeCategory(event.target.value as PropertyCategory)}
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Plot / Land</option>
              </select>
            </FormField>
            {values.category === "Residential" && (
              <FormField label="Bedrooms (BHK)">
                <select
                  value={values.bedrooms}
                  onChange={(event) => updateField("bedrooms", event.target.value)}
                >
                  <option value="">Select</option>
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </FormField>
            )}
            {values.category === "Commercial" && (
              <FormField label="Commercial Type">
                <select
                  value={values.commercialType}
                  onChange={(event) => updateField("commercialType", event.target.value)}
                >
                  <option>Office</option>
                  <option>Retail Shop</option>
                  <option>Showroom</option>
                  <option>Warehouse</option>
                  <option>Other</option>
                </select>
              </FormField>
            )}
            {values.category === "Plot / Land" && (
              <FormField label="Land Use">
                <select
                  value={values.landUse}
                  onChange={(event) => updateField("landUse", event.target.value)}
                >
                  <option>Residential Plot</option>
                  <option>Commercial Plot</option>
                  <option>Agricultural Land</option>
                  <option>Industrial Land</option>
                  <option>Other</option>
                </select>
              </FormField>
            )}
            {values.category !== "Plot / Land" && (
              <FormField label={values.category === "Commercial" ? "Washrooms" : "Bathrooms"}>
                <select
                  value={values.bathrooms}
                  onChange={(event) => updateField("bathrooms", event.target.value)}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </FormField>
            )}
            <FormField
              label={
                values.category === "Plot / Land"
                  ? "Plot Area (Sq. Ft.)"
                  : values.category === "Commercial"
                    ? "Built-up Area (Sq. Ft.)"
                    : "Area (Sq. Ft.)"
              }
              required
            >
              <input
                required
                inputMode="numeric"
                value={values.area}
                onChange={(event) => updateField("area", event.target.value)}
                placeholder="1,450"
              />
            </FormField>
            {values.category === "Plot / Land" && (
              <FormField label="Plot Dimensions">
                <input
                  value={values.plotDimensions}
                  onChange={(event) => updateField("plotDimensions", event.target.value)}
                  placeholder="e.g. 30 × 50 ft"
                />
              </FormField>
            )}
          </div>
          <div className="admin-form-row admin-form-row--price-location">
            <FormField label="Price" required>
              <div className="admin-price-input">
                <span>₹</span>
                <input
                  required
                  inputMode="decimal"
                  value={values.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="1,20,00,000"
                />
              </div>
            </FormField>
            <FormField label="Location / Locality" required>
              <div className="admin-location-input">
                <Icon name="pin" />
                <input
                  required
                  value={values.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  placeholder="Lanka, Varanasi"
                />
              </div>
            </FormField>
          </div>
          <FormField label="Description" required>
            <textarea
              required
              maxLength={500}
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Describe the property's features and location..."
              rows={4}
            />
            <span className="admin-character-count">{values.description.length} / 500</span>
          </FormField>
          <div className="admin-form-row admin-form-row--links">
            <FormField label="YouTube Video Link">
              <input
                type="url"
                value={values.youtubeUrl}
                onChange={(event) => updateField("youtubeUrl", event.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </FormField>
            <FormField label="Google Maps Link">
              <input
                type="url"
                value={values.googleMapsUrl}
                onChange={(event) => updateField("googleMapsUrl", event.target.value)}
                placeholder="https://maps.google.com/..."
              />
            </FormField>
          </div>
          <div className="admin-highlights-editor">
            <div className="admin-highlights-heading">
              <div>
                <strong>Property Highlights</strong>
                <span>Add up to 5 key points.</span>
              </div>
              <button
                className="admin-add-highlight"
                type="button"
                onClick={addHighlight}
                disabled={values.highlights.length >= 5}
              >
                <Icon name="plus" />
                Add point
              </button>
            </div>
            {values.highlights.length > 0 && (
              <div className="admin-highlight-list">
                {values.highlights.map((highlight, index) => (
                  <div className="admin-highlight-row" key={index}>
                    <label className="admin-field">
                      <span>Highlight {index + 1}</span>
                      <input
                        maxLength={120}
                        value={highlight}
                        onChange={(event) => updateHighlight(index, event.target.value)}
                        placeholder="e.g. Close to BHU, markets and hospitals"
                      />
                    </label>
                    <button
                      className="admin-remove-highlight"
                      type="button"
                      aria-label={`Remove highlight ${index + 1}`}
                      onClick={() => removeHighlight(index)}
                    >
                      <Icon name="close" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <span className="admin-highlights-count">{values.highlights.length} / 5 points</span>
          </div>
        </section>

        <section
          className="admin-panel admin-photos-panel"
          aria-labelledby="property-images-heading"
        >
          <h2 className="admin-section-heading" id="property-images-heading">
            <Icon name="image" />
            Property Images
          </h2>
          <input
            className="visually-hidden"
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={handleFileChange}
          />
          <div
            className={`admin-upload ${isDragging ? "is-dragging" : ""}`}
            role="button"
            tabIndex={0}
            onClick={openFilePicker}
            onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && openFilePicker()}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <Icon name="upload" />
            <strong>Upload Property Photos</strong>
            <span>Drag &amp; drop images here or click to browse</span>
            <small>JPG, PNG, WEBP, AVIF · Up to 10 photos · Max 10 MB each</small>
          </div>
          <div className="admin-photo-grid">
            {previews.map((preview, index) => (
              <div className="admin-photo-thumb" key={`${preview}-${index}`}>
                <Image
                  src={preview}
                  alt={`Property preview ${index + 1}`}
                  fill
                  sizes="(max-width: 800px) 30vw, 12vw"
                  unoptimized
                />
                <button
                  type="button"
                  aria-label={`Remove photo ${index + 1}`}
                  onClick={() => removePhoto(index)}
                >
                  <Icon name="close" />
                </button>
                {index === 0 && (
                  <span className="admin-cover-tag">
                    <Icon name="check" />
                    Cover
                  </span>
                )}
                {index > 0 && (
                  <button className="admin-set-cover" type="button" onClick={() => setCover(index)}>
                    Set cover
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          className="admin-panel admin-specs-panel"
          aria-labelledby="key-specifications-heading"
        >
          <h2 className="admin-section-heading" id="key-specifications-heading">
            <Icon name="layers" />
            {values.category === "Residential"
              ? "Residential Specifications"
              : values.category === "Commercial"
                ? "Commercial Specifications"
                : "Plot & Land Details"}
          </h2>
          <div className="admin-spec-grid">
            {values.category === "Residential" && (
              <>
                <SpecField icon="building" label="Floor">
                  <input
                    value={values.floor}
                    onChange={(event) => updateField("floor", event.target.value)}
                    placeholder="4th"
                  />
                </SpecField>
                <SpecField icon="layers" label="Total Floors">
                  <input
                    value={values.totalFloors}
                    onChange={(event) => updateField("totalFloors", event.target.value)}
                    placeholder="8"
                  />
                </SpecField>
                <SpecField icon="sofa" label="Furnishing">
                  <select
                    value={values.furnishing}
                    onChange={(event) => updateField("furnishing", event.target.value)}
                  >
                    <option>Semi Furnished</option>
                    <option>Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </SpecField>
                <SpecField icon="car" label="Parking">
                  <select
                    value={values.parking}
                    onChange={(event) => updateField("parking", event.target.value)}
                  >
                    <option>1 Car</option>
                    <option>2 Cars</option>
                    <option>None</option>
                  </select>
                </SpecField>
                <SpecField icon="lift" label="Lift">
                  <select
                    value={values.lift}
                    onChange={(event) => updateField("lift", event.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </SpecField>
                <SpecField icon="bolt" label="Power Backup">
                  <select
                    value={values.powerBackup}
                    onChange={(event) => updateField("powerBackup", event.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                    <option>24×7</option>
                  </select>
                </SpecField>
              </>
            )}
            {values.category === "Commercial" && (
              <>
                <SpecField icon="building" label="Floor">
                  <input
                    value={values.floor}
                    onChange={(event) => updateField("floor", event.target.value)}
                    placeholder="Ground / 2nd"
                  />
                </SpecField>
                <SpecField icon="layers" label="Total Floors">
                  <input
                    value={values.totalFloors}
                    onChange={(event) => updateField("totalFloors", event.target.value)}
                    placeholder="5"
                  />
                </SpecField>
                <SpecField icon="car" label="Parking">
                  <select
                    value={values.parking}
                    onChange={(event) => updateField("parking", event.target.value)}
                  >
                    <option>1 Car</option>
                    <option>2 Cars</option>
                    <option>None</option>
                  </select>
                </SpecField>
                <SpecField icon="lift" label="Lift">
                  <select
                    value={values.lift}
                    onChange={(event) => updateField("lift", event.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </SpecField>
                <SpecField icon="bolt" label="Power Backup">
                  <select
                    value={values.powerBackup}
                    onChange={(event) => updateField("powerBackup", event.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                    <option>24×7</option>
                  </select>
                </SpecField>
              </>
            )}
            {values.category === "Plot / Land" && (
              <>
                <SpecField icon="area" label="Road Width">
                  <input
                    value={values.roadWidth}
                    onChange={(event) => updateField("roadWidth", event.target.value)}
                    placeholder="30 ft"
                  />
                </SpecField>
                <SpecField icon="pin" label="Facing">
                  <select
                    value={values.plotFacing}
                    onChange={(event) => updateField("plotFacing", event.target.value)}
                  >
                    <option value="">Select</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                    <option>North-East</option>
                    <option>North-West</option>
                    <option>South-East</option>
                    <option>South-West</option>
                  </select>
                </SpecField>
                <SpecField icon="check" label="Boundary Wall">
                  <select
                    value={values.boundaryWall}
                    onChange={(event) => updateField("boundaryWall", event.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </SpecField>
              </>
            )}
          </div>
        </section>

        <section
          className="admin-panel admin-status-panel"
          aria-labelledby="listing-status-heading"
        >
          <h2 className="admin-section-heading" id="listing-status-heading">
            <Icon name="layers" />
            Listing Status
          </h2>
          <div className="admin-status-options" role="group" aria-label="Listing status">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`admin-status-choice ${values.status === option.value ? "is-selected" : ""}`}
                aria-pressed={values.status === option.value}
                onClick={() => updateField("status", option.value)}
              >
                <Icon name={option.icon} />
                {option.value}
              </button>
            ))}
          </div>
          <label className="admin-publish">
            <input
              type="checkbox"
              checked={values.published}
              onChange={(event) => updateField("published", event.target.checked)}
            />
            <span>
              <strong>Publish on website</strong>
              <small>Show this property on the public website immediately.</small>
            </span>
          </label>
        </section>
      </div>
      <div className="admin-form-footer">
        <button
          className="admin-button admin-button--cancel"
          type="button"
          disabled={isSaving}
          onClick={() => router.push("/admin/properties")}
        >
          Cancel
        </button>
        <span className="admin-form-message" role="status">
          {message}
        </span>
        <div>
          <button
            className="admin-button admin-button--draft"
            type="button"
            disabled={isSaving}
            onClick={handleDraft}
          >
            Save as Draft
          </button>
          <button className="admin-button admin-button--primary" type="submit" disabled={isSaving}>
            <Icon name="check" />
            {isSaving ? "Saving…" : editId ? "Update Property" : "Save Property"}
          </button>
        </div>
      </div>
    </form>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="admin-field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      {children}
    </label>
  );
}

function SpecField({
  icon,
  label,
  children,
}: {
  icon:
    | "bed"
    | "bath"
    | "building"
    | "layers"
    | "sofa"
    | "car"
    | "lift"
    | "bolt"
    | "area"
    | "pin"
    | "check";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="admin-spec-item">
      <Icon name={icon} />
      <span>{label}</span>
      {children}
    </label>
  );
}
