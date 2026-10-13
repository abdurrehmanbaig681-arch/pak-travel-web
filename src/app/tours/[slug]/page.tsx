"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  FileDown,
  MessageCircle,
  Send,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { initialTours, initialSiteSettings } from "@/lib/data/initialData";
import { createBookingRequest } from "@/lib/services/tourService";

export default function TourDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const tour = initialTours.find((t) => t.slug === slug || t.id === slug) || initialTours[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [openDay, setOpenDay] = useState<number | null>(1);

  // Booking Form State
  const [selectedDeparture, setSelectedDeparture] = useState<string>(
    tour.departures?.[0]?.date || "Upcoming Weekend"
  );
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ id: string } | null>(null);

  const pricePerPerson = tour.pricing.discountPrice || tour.pricing.basePrice;
  const totalEstimated = pricePerPerson * adults + pricePerPerson * 0.7 * children;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setSubmitting(true);
    try {
      const res = await createBookingRequest({
        tourId: tour.id,
        tourTitle: tour.title,
        tourSlug: tour.slug,
        departureDate: selectedDeparture,
        fullName,
        email,
        phone,
        city,
        numberOfTravelers: adults + children,
        estimatedTotalPKR: totalEstimated,
        specialRequests,
      });
      setBookingResult(res);
    } catch (err) {
      console.error("Booking submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const images = tour.images || [];

  return (
    <div style={{ backgroundColor: "#F4F8F5", paddingBottom: "5rem" }}>
      {/* Tour Header Banner */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "3.5rem 0 2.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span className="badge badge-primary">{tour.isDomestic ? "Domestic Tour" : "International"}</span>
            <span className="badge badge-secondary">{tour.category}</span>
          </div>

          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            {tour.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap", color: "#E2EAE4", fontSize: "0.95rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin size={16} color="#63AB45" /> {tour.destination}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Clock size={16} color="#63AB45" /> {tour.durationDays} Days / {tour.durationNights} Nights
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Users size={16} color="#63AB45" /> Max {tour.maxGuests} Guests
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2.5rem", alignItems: "flex-start" }} className="tour-layout">
          {/* Main Left Column: Media & Itinerary */}
          <div>
            {/* Gallery Viewer */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid #E2EAE4",
                marginBottom: "2rem",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "450px" }}>
                <Image
                  src={images[activeImageIdx]?.url || images[0]?.url || ""}
                  alt={tour.title}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Thumbnails strip */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: "0.75rem", padding: "1rem", overflowX: "auto" }}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "60px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        border: activeImageIdx === idx ? "2px solid #63AB45" : "2px solid transparent",
                        cursor: "pointer",
                        padding: 0,
                        flexShrink: 0,
                      }}
                    >
                      <Image src={img.url} alt={`Photo ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tour Overview Section */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                border: "1px solid #E2EAE4",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Description & Highlights</h2>
              <div style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {tour.description}
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      backgroundColor: "#FEE2E2",
                      color: "#DC2626",
                      padding: "0.6rem",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileDown size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1C231F", fontSize: "0.98rem" }}>
                      Official Tour Itinerary Brochure
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
                      Download complete day-by-day plan, inclusions, hotel stays & packing checklist (PDF)
                    </div>
                  </div>
                </div>

                {tour.itineraryPdfUrl ? (
                  <a
                    href={tour.itineraryPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ gap: "0.5rem", padding: "0.6rem 1.25rem", fontSize: "0.9rem" }}
                  >
                    <FileDown size={16} /> Download PDF Brochure
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn btn-outline"
                    style={{ gap: "0.5rem", padding: "0.6rem 1.25rem", fontSize: "0.9rem" }}
                  >
                    <FileDown size={16} /> Print / Save Itinerary (PDF)
                  </button>
                )}
              </div>
            </div>

            {/* Day-by-Day Itinerary Accordion */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                border: "1px solid #E2EAE4",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Detailed Day-by-Day Itinerary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {tour.itinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  return (
                    <div
                      key={day.day}
                      style={{
                        border: "1px solid #E2EAE4",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                        style={{
                          width: "100%",
                          padding: "1rem 1.25rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: isOpen ? "#F0F8EC" : "#FFFFFF",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: isOpen ? "#386626" : "#1C231F",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span
                            style={{
                              backgroundColor: isOpen ? "#63AB45" : "#E2EAE4",
                              color: isOpen ? "#FFFFFF" : "#1C231F",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "var(--radius-sm)",
                              fontSize: "0.82rem",
                            }}
                          >
                            Day {day.day}
                          </span>
                          <span>{day.title}</span>
                        </div>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: "1.25rem", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2EAE4" }}>
                          <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                            {day.description}
                          </p>
                          {day.meals && (
                            <div style={{ fontSize: "0.85rem", color: "#68726A" }}>
                              <strong>Included Meals:</strong> {day.meals.join(", ")}
                            </div>
                          )}
                          {day.stay && (
                            <div style={{ fontSize: "0.85rem", color: "#68726A", marginTop: "0.25rem" }}>
                              <strong>Overnight Stay:</strong> {day.stay}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                border: "1px solid #E2EAE4",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>What's Included & Excluded</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="inc-exc-grid">
                <div>
                  <h4 style={{ color: "#386626", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 size={18} color="#63AB45" /> Package Inclusions
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.92rem", color: "#374151" }}>
                        <CheckCircle2 size={16} color="#63AB45" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: "#991B1B", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <XCircle size={18} color="#EF4444" /> Package Exclusions
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.92rem", color: "#374151" }}>
                        <XCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking / Enquiry Widget */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                border: "1px solid #E2EAE4",
                padding: "1.75rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {bookingResult ? (
                /* Success Screen */
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#F0F8EC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem auto",
                    }}
                  >
                    <CheckCircle2 size={36} color="#63AB45" />
                  </div>
                  <h3 style={{ marginBottom: "0.5rem" }}>Booking Request Received!</h3>
                  <p style={{ color: "#68726A", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
                    Your booking reference is <strong>{bookingResult.id}</strong>. Our tour coordinator will call you to confirm your seats.
                  </p>

                  <a
                    href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Pak Travel, I just submitted a booking request for "${tour.title}" on ${selectedDeparture}. Booking ID: ${bookingResult.id}. Please confirm my seat availability!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ width: "100%", marginBottom: "0.75rem" }}
                  >
                    <MessageCircle size={18} /> Confirm via WhatsApp Now
                  </a>

                  <button
                    onClick={() => setBookingResult(null)}
                    className="btn btn-outline"
                    style={{ width: "100%", fontSize: "0.85rem" }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#68726A", textTransform: "uppercase" }}>Price Per Person</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1C231F" }}>
                        PKR {pricePerPerson.toLocaleString()}
                      </span>
                    </div>
                    {tour.pricing.priceNote && (
                      <span style={{ fontSize: "0.78rem", color: "#94A099", display: "block" }}>
                        {tour.pricing.priceNote}
                      </span>
                    )}
                  </div>

                  {/* Departure Selector */}
                  <div className="form-group">
                    <label className="form-label">Select Departure Date</label>
                    <select
                      value={selectedDeparture}
                      onChange={(e) => setSelectedDeparture(e.target.value)}
                      className="form-select"
                      required
                    >
                      {tour.departures?.map((dep) => (
                        <option key={dep.id} value={dep.date}>
                          {dep.date} ({dep.status})
                        </option>
                      ))}
                      <option value="Custom Date">Custom Date (Mention in Notes)</option>
                    </select>
                  </div>

                  {/* Travelers Count */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div>
                      <label className="form-label">Adults (12+ yrs)</label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Children</label>
                      <input
                        type="number"
                        min={0}
                        max={15}
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Total Estimated Box */}
                  <div
                    style={{
                      backgroundColor: "#F4F8F5",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1.25rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4B5563" }}>Estimated Total:</span>
                    <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1C231F" }}>
                      PKR {totalEstimated.toLocaleString()}
                    </span>
                  </div>

                  {/* Contact Inputs */}
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mian Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="0322-XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Departure City</label>
                    <input
                      type="text"
                      placeholder="Lahore / Islamabad / Karachi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: "100%", marginBottom: "0.75rem", height: "46px" }}
                  >
                    {submitting ? "Sending Request..." : "Request Tour Booking"}
                  </button>

                  <a
                    href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Pak Travel, I have an inquiry regarding "${tour.title}". Can you give me more details?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ width: "100%", height: "46px" }}
                  >
                    <MessageCircle size={18} /> Inquire via WhatsApp
                  </a>

                  <p style={{ color: "#94A099", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem" }}>
                    No payment is required right now. Our staff will review your request and confirm vehicle seat availability.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
