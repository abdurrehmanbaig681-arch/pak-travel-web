"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Send, MapPin, Users, Calendar, Sparkles } from "lucide-react";
import { initialSiteSettings } from "@/lib/data/initialData";
import { createCustomTourRequest } from "@/lib/services/tourService";

export default function CustomToursPage() {
  const [tourType, setTourType] = useState<"Pakistan Tour" | "International Tour" | "Honeymoon Package">("Pakistan Tour");
  const [location, setLocation] = useState<string>("Hunza");
  const [travelers, setTravelers] = useState<number>(2);
  const [days, setDays] = useState<number>(5);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [country, setCountry] = useState("Pakistan");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const domesticLocations = [
    "Hunza",
    "Skardu",
    "Chitral",
    "Gwadar",
    "Swat & Kalam",
    "Neelum Valley Kashmir",
    "Fairy Meadows",
    "Kumrat Valley",
  ];

  const internationalLocations = [
    "Turkey",
    "Thailand",
    "Malaysia",
    "Singapore",
    "Maldives",
    "Dubai / UAE",
    "Indonesia - Bali",
    "Egypt",
    "Azerbaijan - Baku",
    "Spain",
    "France",
    "UK",
    "Morocco",
    "Jordan",
    "Kazakhstan",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setSubmitting(true);
    try {
      const res = await createCustomTourRequest({
        tourType,
        location,
        numberOfTravelers: travelers,
        numberOfDays: days,
        fullName,
        email,
        phone,
        address,
        city,
        country,
        description,
      });
      setSubmittedId(res.id);
    } catch (err) {
      console.error("Custom tour submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Pak Travel & Tours! I would like to arrange a custom ${tourType} to ${location} for ${travelers} travelers (${days} Days). My name is ${fullName || "traveler"}.`
  );

  return (
    <div style={{ backgroundColor: "#F4F8F5", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "4rem 0 3rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>
            Tailor-Made Expeditions
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Pak Travel Custom Tours</h1>
          <p style={{ color: "#94A099", fontSize: "1.05rem", margin: 0 }}>
            Design your ideal holiday with dedicated private transport, tailored hotel standards, and flexible dates.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "3rem", maxWidth: "800px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {submittedId ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  backgroundColor: "#F0F8EC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto",
                }}
              >
                <CheckCircle2 size={40} color="#63AB45" />
              </div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Custom Tour Request Submitted!</h2>
              <p style={{ color: "#68726A", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Thank you, <strong>{fullName}</strong>. Your reference ID is <strong>{submittedId}</strong>.
                Our custom travel planner is preparing your personalized itinerary and quote.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=${whatsappMessage}&ref=${submittedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={18} /> Chat with Specialist on WhatsApp
                </a>
                <button onClick={() => setSubmittedId(null)} className="btn btn-outline">
                  Submit Another Plan
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Tour Type */}
              <div style={{ marginBottom: "2rem" }}>
                <label className="form-label" style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
                  1. Select Tour Type *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }} className="type-grid">
                  {(["Pakistan Tour", "International Tour", "Honeymoon Package"] as const).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => {
                        setTourType(type);
                        setLocation(type === "Pakistan Tour" ? domesticLocations[0] : internationalLocations[0]);
                      }}
                      style={{
                        padding: "0.85rem",
                        borderRadius: "var(--radius-md)",
                        border: "2px solid",
                        borderColor: tourType === type ? "#63AB45" : "#E2EAE4",
                        backgroundColor: tourType === type ? "#F0F8EC" : "#FFFFFF",
                        color: tourType === type ? "#386626" : "#1C231F",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.92rem",
                        transition: "var(--transition)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Trip Parameters */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="param-grid">
                <div>
                  <label className="form-label">Destination / Location *</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-select"
                    required
                  >
                    {(tourType === "Pakistan Tour" ? domesticLocations : internationalLocations).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Number of Travelers *</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="form-select"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Person" : "Persons"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Number of Days *</label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="form-select"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15].map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 1 ? "Day" : "Days"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Traveler Contact Information */}
              <div style={{ borderTop: "1px solid #E2EAE4", paddingTop: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Your Contact Details</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="contact-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mian Mohsin Ali"
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
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1rem" }} className="contact-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore / Islamabad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    placeholder="Street / Area (e.g. DHA Phase 2)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Trip Preferences & Special Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about preferred hotel standard (Deluxe/Luxury), vehicle preference (Prado, Coaster, Sedan), tentative departure dates, or special dietary requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", height: "50px", fontSize: "1.05rem" }}
              >
                {submitting ? "Submitting Custom Request..." : "Submit Custom Tour Request"}
              </button>

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "0.85rem", color: "#68726A" }}>
                  Or call our tour desk directly at{" "}
                  <a href={`tel:${initialSiteSettings.primaryPhone}`} style={{ color: "#63AB45", fontWeight: 700 }}>
                    {initialSiteSettings.primaryPhone}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
