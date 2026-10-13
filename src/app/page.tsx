"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Plane,
  Heart,
  Search,
  MessageCircle,
} from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import {
  initialSiteSettings,
  initialTours,
  initialPastTours,
  initialSitePagesContent,
} from "@/lib/data/initialData";
import { getCachedPageContent, getPageContent } from "@/lib/services/tourService";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [pageContent, setPageContent] = useState(initialSitePagesContent);

  useEffect(() => {
    const cached = getCachedPageContent();
    if (cached) setPageContent(cached);
    getPageContent().then((res) => setPageContent(res)).catch(() => {});
  }, []);

  const filteredTours = initialTours.filter((tour) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Domestic" && tour.isDomestic) ||
      (selectedCategory === "International" && !tour.isDomestic) ||
      tour.category === selectedCategory;

    const matchesLocation =
      !searchLocation ||
      tour.destination.toLowerCase().includes(searchLocation.toLowerCase()) ||
      tour.title.toLowerCase().includes(searchLocation.toLowerCase());

    return matchesCategory && matchesLocation;
  });

  return (
    <div>
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section
        style={{
          position: "relative",
          minHeight: "680px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0A1C14",
          color: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Background Ambient Gradient (No Image) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "radial-gradient(circle at 85% 25%, rgba(99, 171, 69, 0.18) 0%, transparent 55%), radial-gradient(circle at 15% 75%, rgba(247, 146, 30, 0.1) 0%, transparent 50%), linear-gradient(180deg, #0A1C14 0%, #11261C 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "3rem", paddingBottom: "4rem" }}>
          <div style={{ maxWidth: "800px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(99, 171, 69, 0.2)",
                border: "1px solid rgba(99, 171, 69, 0.4)",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                color: "#63AB45",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              <Compass size={16} /> {pageContent.home.heroBadge}
            </div>

            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {pageContent.home.heroTitle}
            </h1>

            <p
              style={{
                color: "#E2EAE4",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                marginBottom: "2.25rem",
                maxWidth: "680px",
              }}
            >
              {pageContent.home.heroSubtitle}
            </p>

            {/* Live Interactive Search / Filter Bar */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(10px)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr auto",
                gap: "1rem",
                alignItems: "center",
                maxWidth: "750px",
              }}
              className="hero-search-box"
            >
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Destination / Region
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MapPin size={18} color="#63AB45" />
                  <input
                    type="text"
                    placeholder="Skardu, Hunza, Thailand..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#1C231F",
                      background: "transparent",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Tour Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#1C231F",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Categories</option>
                  <option value="Domestic">Pakistan (Domestic)</option>
                  <option value="International">International</option>
                  <option value="Honeymoon Package">Honeymoon Specials</option>
                </select>
              </div>

              <div>
                <Link
                  href={`/tours?q=${encodeURIComponent(searchLocation)}&cat=${selectedCategory}`}
                  className="btn btn-primary"
                  style={{ width: "100%", height: "48px" }}
                >
                  <Search size={18} /> Search
                </Link>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                marginTop: "2.5rem",
                color: "#E2EAE4",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              {pageContent.home.guarantees.map((item, idx) => (
                <span key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} color="#63AB45" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ACHIEVEMENTS COUNTER SECTION
          ======================================================== */}
      <section
        suppressHydrationWarning
        style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "2.5rem 0", borderBottom: "1px solid #2C3731" }}
      >
        <div className="container" suppressHydrationWarning>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#63AB45", lineHeight: 1 }}>
                {initialSiteSettings.stats.experienceYears}
              </div>
              <div style={{ color: "#94A099", fontSize: "0.9rem", marginTop: "0.4rem", fontWeight: 600 }}>
                Years Experience
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#F7921E", lineHeight: 1 }}>
                {initialSiteSettings.stats.happyTravelers}
              </div>
              <div style={{ color: "#94A099", fontSize: "0.9rem", marginTop: "0.4rem", fontWeight: 600 }}>
                Happy Travelers
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#63AB45", lineHeight: 1 }}>
                {initialSiteSettings.stats.toursSuccess}
              </div>
              <div style={{ color: "#94A099", fontSize: "0.9rem", marginTop: "0.4rem", fontWeight: 600 }}>
                Successful Tours
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#F7921E", lineHeight: 1 }}>
                {initialSiteSettings.stats.positiveReviewsPercent}
              </div>
              <div style={{ color: "#94A099", fontSize: "0.9rem", marginTop: "0.4rem", fontWeight: 600 }}>
                Positive Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          UPCOMING & FEATURED TOURS
          ======================================================== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Featured Packages</span>
            <h2 className="section-title">Explore Our Upcoming Tours</h2>
            <p className="section-desc">
              Carefully curated domestic and international adventures with confirmed departures, luxury hotel stays, and verified itineraries.
            </p>

            {/* Filter Pills */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["All", "Domestic", "International"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid",
                    borderColor: selectedCategory === cat ? "#63AB45" : "#E2EAE4",
                    backgroundColor: selectedCategory === cat ? "#63AB45" : "#FFFFFF",
                    color: selectedCategory === cat ? "#FFFFFF" : "#1C231F",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                >
                  {cat === "All" ? "All Tours" : cat === "Domestic" ? "Pakistan (Domestic)" : "International"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/tours" className="btn btn-outline btn-lg">
              Browse All Tour Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          CUSTOM TOUR CALLOUT BANNER
          ======================================================== */}
      <section
        style={{
          backgroundColor: "#63AB45",
          color: "#FFFFFF",
          padding: "4rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div style={{ maxWidth: "650px" }}>
              <span
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Tailor-Made Trips
              </span>
              <h2 style={{ color: "#FFFFFF", fontSize: "2.3rem", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
                Looking for a Custom Family or Honeymoon Tour?
              </h2>
              <p style={{ color: "#F0F8EC", fontSize: "1.05rem", margin: 0 }}>
                Tell us your destination, dates, and number of travelers. Our travel specialists will design a custom itinerary with dedicated transport and hotels tailored to your budget.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/custom-tours"
                className="btn"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1C231F",
                  fontWeight: 700,
                  padding: "0.85rem 1.85rem",
                  borderRadius: "var(--radius-md)",
                }}
              >
                Plan Custom Tour <ArrowRight size={18} color="#63AB45" />
              </Link>
              <a
                href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=Hi%20Pak%20Travel,%20I%20would%20like%20to%20plan%20a%20custom%20tour`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
                style={{ fontWeight: 700 }}
              >
                Direct WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CEO MESSAGE & LEADERSHIP PROFILE
          ======================================================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "360px 1fr",
              gap: "3.5rem",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2EAE4",
              borderRadius: "var(--radius-lg)",
              padding: "3rem",
              boxShadow: "var(--shadow-sm)",
            }}
            className="ceo-card-grid"
          >
            {/* CEO Image */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "280px",
                  height: "300px",
                  margin: "0 auto",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "4px solid #F4F8F5",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <Image
                  src={initialSiteSettings.ceoImage}
                  alt={initialSiteSettings.ceoName}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#F4F8F5",
                    color: "#63AB45",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  Founder & Executive Leader
                </span>
              </div>
            </div>

            {/* CEO Statement Content */}
            <div>
              <span className="section-tag">Executive Message</span>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{initialSiteSettings.ceoName}</h2>
              <h4 style={{ color: "#63AB45", fontWeight: 600, marginBottom: "1.25rem", fontSize: "1.1rem" }}>
                {initialSiteSettings.ceoTitle}
              </h4>

              <p style={{ color: "#4B5563", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                "{initialSiteSettings.ceoMessage}"
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #E2EAE4",
                }}
              >
                <div>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "#68726A", textTransform: "uppercase" }}>
                    Direct Contact Line
                  </span>
                  <a
                    href={`tel:${initialSiteSettings.directPhone}`}
                    style={{ fontWeight: 700, color: "#1C231F", fontSize: "1.05rem" }}
                  >
                    {initialSiteSettings.directPhone}
                  </a>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "#68726A", textTransform: "uppercase" }}>
                    Registered Headquarters
                  </span>
                  <span style={{ fontWeight: 600, color: "#1C231F", fontSize: "0.95rem" }}>
                    DHA Phase 2, Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAST EXPEDITIONS & VIDEO ALBUMS HIGHLIGHT
          ======================================================== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Expeditions & Portfolio</span>
            <h2 className="section-title">Checkout Our Recently Completed Work</h2>
            <p className="section-desc">
              Real traveler journeys, celebrity group tours, and scenic northern highlights recorded live on location.
            </p>
          </div>

          <div className="grid-2">
            {initialPastTours.map((item) => (
              <div key={item.id} className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <span className="badge badge-primary">{item.destination}</span>
                    <h3 style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>{item.title}</h3>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#68726A", fontWeight: 600 }}>{item.date}</span>
                </div>

                <p style={{ color: "#68726A", fontSize: "0.92rem", marginBottom: "1.25rem" }}>
                  {item.summary}
                </p>

                {item.videoUrls?.[0] && (
                  <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "#000000" }}>
                    <video
                      src={item.videoUrls[0]}
                      controls
                      preload="metadata"
                      style={{ width: "100%", maxHeight: "280px", display: "block" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/past-tours" className="btn btn-primary">
              View All Past Tours & Video Gallery <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          DYNAMIC CTA BANNER (Customizable via Admin Page Editor)
          ======================================================== */}
      <section style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "5rem 0", textAlign: "center", borderTop: "1px solid #2C3731" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#FFFFFF", marginBottom: "1rem" }}>
            {pageContent.home.ctaTitle}
          </h2>
          <p style={{ color: "#E2EAE4", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            {pageContent.home.ctaSubtitle}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/custom-tours" className="btn btn-primary btn-lg">
              {pageContent.home.ctaButtonText} <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${initialSiteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={18} /> Chat with Travel Consultant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
