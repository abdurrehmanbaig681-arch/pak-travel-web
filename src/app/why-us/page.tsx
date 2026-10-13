"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Compass, HeartHandshake, Car, Phone, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { initialSiteSettings, initialSitePagesContent } from "@/lib/data/initialData";
import { getCachedPageContent, getPageContent } from "@/lib/services/tourService";

export default function WhyUsPage() {
  const [pageContent, setPageContent] = useState(initialSitePagesContent);

  useEffect(() => {
    const cached = getCachedPageContent();
    if (cached) setPageContent(cached);
    getPageContent().then((res) => setPageContent(res)).catch(() => {});
  }, []);

  const pillars = [
    {
      icon: <Compass size={32} color="#63AB45" />,
      title: "Northern Pakistan Experts",
      desc: "Specialized routes through Skardu, Hunza Valley, Deosai Plains, Neelum Valley, and Chitral with licensed local field guides who know every mountain pass.",
    },
    {
      icon: <Car size={32} color="#63AB45" />,
      title: "Executive Transport Fleet",
      desc: "Well-maintained 4x4 Toyota Prado, Toyota Grand Cabins, and executive Coasters driven by seasoned hill terrain drivers ensuring unmatched comfort.",
    },
    {
      icon: <ShieldCheck size={32} color="#63AB45" />,
      title: "Safety First Always",
      desc: "Your safety is our top priority. We constantly monitor weather and route advisories to guarantee peace of mind on every journey.",
    },
    {
      icon: <HeartHandshake size={32} color="#63AB45" />,
      title: "Transparent & Friendly Pricing",
      desc: "No hidden charges. Clear PKR pricing with quality hotels, verified meals, and dedicated customer support before, during, and after your trip.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#F4F8F5", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "4rem 0 3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "720px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>
            {pageContent.whyUs.bannerBadge || "The Pak Travel Guarantee"}
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>
            {pageContent.whyUs.bannerTitle || "Why Choose Pak Travel & Tours?"}
          </h1>
          <p style={{ color: "#94A099", fontSize: "1.1rem", margin: 0 }}>
            {pageContent.whyUs.bannerSubtitle || "People don't take trips, trips take people. Discover what makes over 3,500 travelers choose us for their lifelong memories."}
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "3.5rem" }}>
        {/* Core Value Pillars Grid */}
        <div className="grid-2" style={{ marginBottom: "3.5rem" }}>
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: "2rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F0F8EC",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "#68726A", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transport Fleet & Cab Service Spotlight */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "3rem",
            marginBottom: "3.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="fleet-grid"
          >
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
                Fleet & Logistics
              </span>
              <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Reliable Transport & Northern Cab Services
              </h2>
              <p style={{ color: "#4B5563", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {pageContent.whyUs.fleetIntro ||
                  "Experience the best of both worlds with our international and local tours, complemented by our dependable private vehicle rental services. Whether navigating the rugged terrain of Deosai or cruising down the Hazara Motorway, our vehicles are primed for security and luxury."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                {[
                  "4x4 Toyota Prado & Land Cruisers for Skardu / Deosai",
                  "Toyota HiAce Grand Cabins (Dual AC, luxury push-back seats)",
                  "Executive 22 & 29-seater Coasters for group & corporate retreats",
                  "Corolla / Yaris Sedans for airport transfers & private couples",
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#1C231F", fontWeight: 600, fontSize: "0.92rem" }}>
                    <CheckCircle2 size={16} color="#63AB45" /> {feat}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href={`tel:${initialSiteSettings.primaryPhone}`}
                  className="btn btn-primary"
                >
                  <Phone size={18} /> Call Fleet Coordinator: {initialSiteSettings.primaryPhone}
                </a>
              </div>
            </div>

            <div style={{ position: "relative", height: "360px", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <Image
                src="https://paktravel.com.pk/wp-content/uploads/2024/03/Local-and-international-Travels-Web.jpg"
                alt="Pak Travel Vehicles"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div
          style={{
            backgroundColor: "#1C231F",
            color: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#FFFFFF", fontSize: "2rem", marginBottom: "0.75rem" }}>
            Ready to Experience the Adventure?
          </h2>
          <p style={{ color: "#94A099", maxWidth: "600px", margin: "0 auto 2rem auto", fontSize: "1.05rem" }}>
            Talk to our Lahore travel advisors right now or submit a custom booking inquiry online.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/tours" className="btn btn-primary btn-lg">
              View Upcoming Tours <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${initialSiteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
