"use client";

import React from "react";
import Link from "next/link";
import { Video, MapPin, Calendar, Camera, ArrowRight } from "lucide-react";
import { initialPastTours } from "@/lib/data/initialData";

export default function PastToursPage() {
  const skarduVideos = [
    { title: "Arrival Skardu & Mountain Flight", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-2.mp4" },
    { title: "Shangrila Resort & Lower Kachura Lake", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-3.mp4" },
    { title: "Deosai National Park & Kala Pani", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-4.mp4" },
    { title: "Sarfranga Cold Desert Dunes", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-5.mp4" },
    { title: "Shigar Valley & Historic Serena Fort", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-8.mp4" },
    { title: "Kharphocho Fort & City Exploration", url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-6.mp4" },
  ];

  return (
    <div style={{ backgroundColor: "#F4F8F5", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "4rem 0 3rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>
            Portfolio & Past Expeditions
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Past Tours & Video Gallery</h1>
          <p style={{ color: "#94A099", fontSize: "1.05rem", margin: 0 }}>
            People don’t take trips, trips take people. Relive our real on-location tour moments and group expeditions.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "3rem" }}>
        {/* Featured Video Series: Skardu with Orya Maqbool Jan */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            marginBottom: "3rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
                Celebrity Expedition
              </span>
              <h2 style={{ fontSize: "1.8rem" }}>Skardu with "Orya Maqbool Jan"</h2>
              <p style={{ color: "#68726A", margin: 0 }}>
                Exclusive expedition through Skardu, Sok Valley, Deosai Plains, and Shigar Valley.
              </p>
            </div>
            <Link href="/tours/tour-to-skardu-by-air-5-days" className="btn btn-primary btn-sm">
              Book Skardu 5-Day Tour <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {skarduVideos.map((vid, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid #E2EAE4",
                }}
              >
                <div style={{ backgroundColor: "#000000" }}>
                  <video
                    src={vid.url}
                    controls
                    preload="metadata"
                    style={{ width: "100%", height: "220px", display: "block", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1rem" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#1C231F", lineHeight: 1.4 }}>{vid.title}</h4>
                  <span style={{ fontSize: "0.78rem", color: "#63AB45", fontWeight: 700 }}>
                    Skardu, Gilgit-Baltistan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ayubia Gali & Nature Escapes */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ marginBottom: "1.75rem" }}>
            <span className="badge badge-secondary" style={{ marginBottom: "0.5rem" }}>
              Galyat Escapes
            </span>
            <h2 style={{ fontSize: "1.8rem" }}>Ayubia Gali & Northern Highlights</h2>
            <p style={{ color: "#68726A", margin: 0 }}>
              Cool mountain pine forests, scenic chairlifts, and refreshing nature walks.
            </p>
          </div>

          <div className="grid-2">
            {[
              {
                title: "Ayubia Gali Pine Forests & Trails",
                url: "https://paktravel.com.pk/wp-content/uploads/2024/03/VID-20240316-WA0023.mp4",
              },
              {
                title: "Family Escapes & Mountain Chairlift",
                url: "https://paktravel.com.pk/wp-content/uploads/2024/03/VID-20240316-WA0022.mp4",
              },
            ].map((vid, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid #E2EAE4",
                }}
              >
                <video
                  src={vid.url}
                  controls
                  preload="metadata"
                  style={{ width: "100%", height: "260px", display: "block", backgroundColor: "#000" }}
                />
                <div style={{ padding: "1rem" }}>
                  <h4 style={{ fontSize: "1rem", color: "#1C231F" }}>{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
