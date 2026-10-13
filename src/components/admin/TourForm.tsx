"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  CheckCircle2,
  FileDown,
  UploadCloud,
  FileText,
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";
import { TourItem, TourItineraryDay, TourDeparture } from "@/lib/types";
import { saveTour } from "@/lib/services/tourService";

interface TourFormProps {
  initialData?: TourItem;
  isNew?: boolean;
}

export default function TourForm({ initialData, isNew = false }: TourFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<TourItem>(
    initialData || {
      id: `tour-${Date.now()}`,
      slug: "",
      title: "",
      summary: "",
      description: "",
      category: "Pakistan Tour",
      isDomestic: true,
      destination: "Skardu",
      durationDays: 5,
      durationNights: 4,
      featured: false,
      status: "published",
      maxGuests: 15,
      minAge: "10+",
      pricing: {
        currency: "PKR",
        basePrice: 75000,
        discountPrice: 68000,
        priceNote: "Per person on twin sharing",
      },
      images: [
        {
          url: "https://paktravel.com.pk/wp-content/uploads/2023/01/Skardu-Tour-Booking-image-600x540.png",
          caption: "Cover Photo",
          order: 1,
        },
      ],
      itinerary: [
        {
          day: 1,
          title: "Departure & Arrival",
          description: "Meet with our representative and travel to destination. Check-in to hotel.",
          meals: ["Dinner"],
          stay: "Deluxe Hotel",
        },
      ],
      inclusions: [
        "Executive luxury transport with fuel and toll taxes",
        "Hotel accommodation on twin/triple sharing",
        "Daily breakfast & dinner",
        "Services of professional tour guide",
      ],
      exclusions: ["Personal expenses & tips", "Lunch & extra beverages"],
      departures: [
        {
          id: "dep-1",
          date: "Upcoming Weekend",
          totalSeats: 15,
          availableSeats: 8,
          status: "Available",
        },
      ],
    }
  );

  const [saving, setSaving] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfUploadError, setPdfUploadError] = useState<string | null>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setPdfUploadError("Please select a valid PDF document (.pdf)");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setPdfUploadError("PDF file size must be under 25MB.");
      return;
    }

    setUploadingPdf(true);
    setPdfUploadError(null);

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storagePath = `tours/itineraries/${formData.slug || "tour"}-${Date.now()}-${sanitizedName}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setFormData((prev) => ({
        ...prev,
        itineraryPdfUrl: downloadUrl,
      }));
    } catch (err: any) {
      console.warn("Firebase Storage upload notice:", err);
      // Fallback: If Storage bucket has rules or is unconfigured, create an object URL or prompt for direct URL
      setPdfUploadError(
        err?.message || "Storage upload failed. You can also paste a direct PDF URL below."
      );
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleChange = (field: keyof TourItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isNew ? autoSlug : prev.slug,
    }));
  };

  // Itinerary Handlers
  const addItineraryDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    const newDay: TourItineraryDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum} Excursion`,
      description: "Explore regional sights and scenic viewpoints.",
      meals: ["Breakfast", "Dinner"],
    };
    setFormData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, newDay],
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const updateItineraryDay = (index: number, field: keyof TourItineraryDay, val: any) => {
    setFormData((prev) => {
      const copy = [...prev.itinerary];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, itinerary: copy };
    });
  };

  // Image Gallery Handlers
  const addImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        { url: newImageUrl.trim(), caption: "Tour photo", order: prev.images.length + 1 },
      ],
    }));
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Departures Handler
  const addDeparture = () => {
    const newDep: TourDeparture = {
      id: `dep-${Date.now()}`,
      date: "New Departure Date",
      totalSeats: 15,
      availableSeats: 15,
      status: "Available",
    };
    setFormData((prev) => ({
      ...prev,
      departures: [...(prev.departures || []), newDep],
    }));
  };

  const removeDeparture = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      departures: prev.departures.filter((d) => d.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveTour(formData);
      router.push("/admin/tours");
    } catch (err) {
      console.error("Save tour failed:", err);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "900px" }}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/admin/tours" className="btn btn-outline" style={{ padding: "0.5rem" }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontSize: "1.6rem", margin: 0 }}>
              {isNew ? "Create New Tour Package" : `Edit Tour: ${formData.title}`}
            </h1>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>
              Configure itinerary, PKR pricing, departures, and media
            </span>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary" style={{ gap: "0.5rem" }}>
          <Save size={16} /> {saving ? "Saving Tour..." : "Save Tour Package"}
        </button>
      </div>

      {/* Card 1: General Info */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#1C231F" }}>
          1. General Information
        </h3>

        <div className="form-group">
          <label className="form-label">Tour Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="form-input"
            required
            placeholder="e.g. Tour to Skardu by Air – 5 Days"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">URL Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Destination *</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
              className="form-input"
              required
              placeholder="e.g. Skardu / Hunza"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="form-select"
            >
              <option value="Pakistan Tour">Pakistan Tour</option>
              <option value="International Tour">International Tour</option>
              <option value="Honeymoon Package">Honeymoon Package</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Duration (Days)</label>
            <input
              type="number"
              min={1}
              value={formData.durationDays}
              onChange={(e) => handleChange("durationDays", Number(e.target.value))}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Duration (Nights)</label>
            <input
              type="number"
              min={0}
              value={formData.durationNights}
              onChange={(e) => handleChange("durationNights", Number(e.target.value))}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Short Summary (Shown on Cards)</label>
          <textarea
            rows={2}
            value={formData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="form-textarea"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Full Description</label>
          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="form-textarea"
            required
          />
        </div>

        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.isDomestic}
              onChange={(e) => handleChange("isDomestic", e.target.checked)}
            />
            <span>Domestic Tour (Pakistan)</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
            />
            <span>Featured on Homepage</span>
          </label>
        </div>
      </div>

      {/* Card 2: Pricing */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#1C231F" }}>
          2. Pricing in Pakistani Rupees (PKR)
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Base Price (PKR) *</label>
            <input
              type="number"
              min={0}
              step={1000}
              value={formData.pricing.basePrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pricing: { ...prev.pricing, basePrice: Number(e.target.value) },
                }))
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Discount / Special Price (PKR)</label>
            <input
              type="number"
              min={0}
              step={1000}
              value={formData.pricing.discountPrice || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pricing: {
                    ...prev.pricing,
                    discountPrice: e.target.value ? Number(e.target.value) : undefined,
                  },
                }))
              }
              className="form-input"
              placeholder="Leave empty if no discount"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Price Note</label>
          <input
            type="text"
            value={formData.pricing.priceNote || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pricing: { ...prev.pricing, priceNote: e.target.value },
              }))
            }
            className="form-input"
            placeholder="e.g. Per person on twin sharing (inclusive of return air tickets)"
          />
        </div>
      </div>

      {/* Card 3: Day-by-Day Itinerary */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.2rem", margin: 0, color: "#1C231F" }}>
            3. Day-by-Day Itinerary ({formData.itinerary.length} Days)
          </h3>
          <button type="button" onClick={addItineraryDay} className="btn btn-outline btn-sm" style={{ gap: "0.3rem" }}>
            <Plus size={14} /> Add Day
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {formData.itinerary.map((day, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontWeight: 700, color: "#63AB45", fontSize: "0.95rem" }}>
                  Day {day.day}
                </span>
                {formData.itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(idx)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}
                    title="Remove Day"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Day Title (e.g. Sok Valley & Shangrila Resort)"
                  value={day.title}
                  onChange={(e) => updateItineraryDay(idx, "title", e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  rows={3}
                  placeholder="Day Details (activities, stops, travel time)..."
                  value={day.description}
                  onChange={(e) => updateItineraryDay(idx, "description", e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="Overnight Stay (e.g. Baltistan Resort)"
                  value={day.stay || ""}
                  onChange={(e) => updateItineraryDay(idx, "stay", e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Included Meals (e.g. Breakfast, Dinner)"
                  value={day.meals?.join(", ") || ""}
                  onChange={(e) =>
                    updateItineraryDay(
                      idx,
                      "meals",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="form-input"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4: Inclusions & Exclusions */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#1C231F" }}>
          4. Inclusions & Exclusions
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <label className="form-label">Inclusions (one per line)</label>
            <textarea
              rows={5}
              value={formData.inclusions.join("\n")}
              onChange={(e) => handleChange("inclusions", e.target.value.split("\n").filter(Boolean))}
              className="form-textarea"
            />
          </div>

          <div>
            <label className="form-label">Exclusions (one per line)</label>
            <textarea
              rows={5}
              value={formData.exclusions.join("\n")}
              onChange={(e) => handleChange("exclusions", e.target.value.split("\n").filter(Boolean))}
              className="form-textarea"
            />
          </div>
        </div>
      </div>

      {/* Card 5: Gallery Images */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#1C231F" }}>
          5. Photo Gallery ({formData.images.length} Photos)
        </h3>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <input
            type="url"
            placeholder="Paste image URL (HTTPS)..."
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="form-input"
          />
          <button type="button" onClick={addImage} className="btn btn-outline" style={{ flexShrink: 0 }}>
            <Plus size={16} /> Add Image
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {formData.images.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: "120px",
                height: "90px",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid #CBD5E1",
              }}
            >
              <img src={img.url} alt={`Preview ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                type="button"
                onClick={() => removeImage(i)}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "rgba(239, 68, 68, 0.9)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Card 6: Itinerary PDF Document (Upload or Link) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <h3 style={{ fontSize: "1.2rem", margin: 0, color: "#1C231F", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileDown size={20} color="#63AB45" /> 6. Itinerary PDF Document (Brochure)
          </h3>
          {formData.itineraryPdfUrl && (
            <span
              style={{
                fontSize: "0.78rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: "#ECFDF5",
                color: "#065F46",
                fontWeight: 700,
                border: "1px solid #A7F3D0",
              }}
            >
              PDF Attached
            </span>
          )}
        </div>
        <p style={{ color: "#64748B", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
          Upload an official tour itinerary PDF brochure or provide a direct download link. Travelers can download this brochure from the tour page and catalog.
        </p>

        {/* Current PDF Status Box */}
        {formData.itineraryPdfUrl ? (
          <div
            style={{
              padding: "1rem 1.25rem",
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "var(--radius-md)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ backgroundColor: "#DCFCE7", padding: "0.5rem", borderRadius: "var(--radius-sm)" }}>
                <FileText size={22} color="#16A34A" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#166534", fontSize: "0.92rem" }}>
                  Active Itinerary PDF Attached
                </div>
                <div style={{ fontSize: "0.8rem", color: "#15803D", wordBreak: "break-all", maxWidth: "450px" }}>
                  {formData.itineraryPdfUrl}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={formData.itineraryPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  fontSize: "0.8rem",
                  padding: "0.35rem 0.75rem",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#86EFAC",
                  color: "#166534",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <ExternalLink size={14} /> Test Download Link
              </a>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, itineraryPdfUrl: "" }))}
                className="btn btn-outline"
                style={{
                  fontSize: "0.8rem",
                  padding: "0.35rem 0.6rem",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FCA5A5",
                  color: "#DC2626",
                }}
                title="Remove attached PDF"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ) : null}

        {/* Upload or URL Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* File Picker */}
          <div
            style={{
              border: "2px dashed #CBD5E1",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              textAlign: "center",
              backgroundColor: "#F8FAFC",
            }}
          >
            <UploadCloud size={32} color="#64748B" style={{ margin: "0 auto 0.5rem auto" }} />
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1E293B", marginBottom: "0.25rem" }}>
              Upload PDF from Computer
            </div>
            <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "1rem" }}>
              Supports .pdf documents up to 25MB
            </p>
            <label
              className="btn btn-outline"
              style={{
                cursor: uploadingPdf ? "wait" : "pointer",
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                display: "inline-block",
                backgroundColor: "#FFFFFF",
              }}
            >
              {uploadingPdf ? "Uploading to Cloud..." : "Choose PDF File"}
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                disabled={uploadingPdf}
                style={{ display: "none" }}
              />
            </label>
            {pdfUploadError && (
              <div style={{ color: "#DC2626", fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 600 }}>
                {pdfUploadError}
              </div>
            )}
          </div>

          {/* Or Manual URL Input */}
          <div>
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
              Or Enter Direct PDF URL
            </label>
            <input
              type="url"
              placeholder="https://paktravel.com.pk/.../itinerary.pdf"
              value={formData.itineraryPdfUrl || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, itineraryPdfUrl: e.target.value }))}
              className="form-input"
              style={{ fontSize: "0.88rem" }}
            />
            <p style={{ color: "#64748B", fontSize: "0.78rem", marginTop: "0.4rem" }}>
              Paste a link from Google Drive, Dropbox, or any existing PDF server.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <Link href="/admin/tours" className="btn btn-outline">
          Cancel
        </Link>
        <button type="submit" disabled={saving || uploadingPdf} className="btn btn-primary btn-lg">
          {saving ? "Saving Tour..." : "Save & Update Tour"}
        </button>
      </div>
    </form>
  );
}
