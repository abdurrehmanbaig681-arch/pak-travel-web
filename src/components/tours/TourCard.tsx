"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Users, Calendar, ArrowRight, MessageCircle, FileDown } from "lucide-react";
import { TourItem } from "@/lib/types";
import { initialSiteSettings } from "@/lib/data/initialData";

interface TourCardProps {
  tour: TourItem;
}

export default function TourCard({ tour }: TourCardProps) {
  const coverImage =
    tour.images?.[0]?.url ||
    "https://paktravel.com.pk/wp-content/uploads/2023/01/Skardu-Tour-Booking-image-600x540.png";

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(tour.pricing.discountPrice || tour.pricing.basePrice);

  const whatsappMessage = encodeURIComponent(
    `Hi Pak Travel, I am interested in booking: "${tour.title}". Can you please share departure dates and seat availability?`
  );

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Image Thumbnail with Overlay Badges */}
      <div style={{ position: "relative", width: "100%", height: "230px", overflow: "hidden" }}>
        <Image
          src={coverImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
        />
        <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", gap: "0.5rem", zIndex: 2 }}>
          {tour.isDomestic ? (
            <span className="badge badge-primary">Domestic</span>
          ) : (
            <span className="badge badge-secondary">International</span>
          )}
          {tour.featured && <span className="badge badge-dark">Featured</span>}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            right: "0.75rem",
            backgroundColor: "rgba(28, 35, 31, 0.85)",
            backdropFilter: "blur(4px)",
            color: "#FFFFFF",
            padding: "0.3rem 0.65rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.8rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <Clock size={13} color="#63AB45" /> {tour.durationDays} Days / {tour.durationNights} Nights
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#68726A", fontSize: "0.82rem", marginBottom: "0.4rem" }}>
          <MapPin size={14} color="#63AB45" />
          <span>{tour.destination}</span>
        </div>

        <h3 style={{ fontSize: "1.15rem", marginBottom: "0.65rem", lineHeight: 1.35 }}>
          <Link href={`/tours/${tour.slug}`} style={{ color: "#1C231F" }}>
            {tour.title}
          </Link>
        </h3>

        <p style={{ color: "#68726A", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "1.25rem", flex: 1 }}>
          {tour.summary}
        </p>

        {/* Departure pill if available */}
        {tour.departures?.[0] && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#F4F8F5",
              padding: "0.45rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              color: "#386626",
              marginBottom: "1.25rem",
              fontWeight: 600,
            }}
          >
            <Calendar size={14} color="#63AB45" />
            <span>Departure: {tour.departures[0].date}</span>
          </div>
        )}

        {/* Price & Action Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
            borderTop: "1px solid #E2EAE4",
          }}
        >
          <div>
            <span style={{ display: "block", fontSize: "0.75rem", color: "#68726A", textTransform: "uppercase" }}>
              Starting From
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1C231F" }}>
                {formattedPrice}
              </span>
              {tour.pricing.discountPrice && (
                <span style={{ fontSize: "0.82rem", color: "#94A099", textDecoration: "line-through" }}>
                  PKR {tour.pricing.basePrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
            {tour.itineraryPdfUrl ? (
              <a
                href={tour.itineraryPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: "0.5rem 0.65rem", borderColor: "#CBD5E1", color: "#475569" }}
                title="Download Tour Itinerary PDF"
              >
                <FileDown size={16} color="#DC2626" />
              </a>
            ) : null}
            <a
              href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.65rem", borderColor: "#25D366", color: "#25D366" }}
              title="Quick WhatsApp Inquiry"
            >
              <MessageCircle size={16} />
            </a>
            <Link href={`/tours/${tour.slug}`} className="btn btn-primary btn-sm">
              View <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
