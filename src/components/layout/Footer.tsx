"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import { initialSiteSettings } from "@/lib/data/initialData";

export default function Footer() {
  const pathname = usePathname();

  // Suppress public footer inside admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer style={{ backgroundColor: "#1C231F", color: "#FFFFFF", paddingTop: "4.5rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: "3.5rem" }}>
          {/* Column 1: Brand & Tagline */}
          <div>
            <div style={{ position: "relative", width: "160px", height: "60px", marginBottom: "1.25rem" }}>
              <Image
                src={initialSiteSettings.logos.footer}
                alt="Pak Travel & Tours"
                fill
                sizes="160px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p style={{ color: "#94A099", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Providing the best travelling experiences to our valued customers across Pakistan and world-renowned international destinations.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href={initialSiteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                Facebook
              </a>
              <a
                href={initialSiteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: "#FFFFFF", marginBottom: "1.25rem", fontSize: "1.1rem" }}>Explore Tours</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li>
                <Link href="/tours" style={{ color: "#94A099", fontSize: "0.92rem", transition: "var(--transition)" }}>
                  Upcoming Tours
                </Link>
              </li>
              <li>
                <Link href="/custom-tours" style={{ color: "#94A099", fontSize: "0.92rem" }}>
                  Custom Tailor-Made Tours
                </Link>
              </li>
              <li>
                <Link href="/past-tours" style={{ color: "#94A099", fontSize: "0.92rem" }}>
                  Past Tours & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/why-us" style={{ color: "#94A099", fontSize: "0.92rem" }}>
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/about-us" style={{ color: "#94A099", fontSize: "0.92rem" }}>
                  About Company & CEO
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: "#94A099", fontSize: "0.92rem" }}>
                  Contact & Office Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 style={{ color: "#FFFFFF", marginBottom: "1.25rem", fontSize: "1.1rem" }}>Contact Office</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <MapPin size={20} color="#63AB45" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                <p style={{ color: "#94A099", fontSize: "0.9rem", margin: 0 }}>
                  {initialSiteSettings.officeAddress}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Phone size={18} color="#63AB45" style={{ flexShrink: 0 }} />
                <div>
                  <a href={`tel:${initialSiteSettings.primaryPhone}`} style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.92rem", display: "block" }}>
                    {initialSiteSettings.primaryPhone}
                  </a>
                  <a href={`tel:${initialSiteSettings.directPhone}`} style={{ color: "#94A099", fontSize: "0.82rem" }}>
                    Direct: {initialSiteSettings.directPhone}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Mail size={18} color="#63AB45" style={{ flexShrink: 0 }} />
                <a href={`mailto:${initialSiteSettings.supportEmail}`} style={{ color: "#94A099", fontSize: "0.9rem" }}>
                  {initialSiteSettings.supportEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Trust & Guarantees */}
          <div>
            <h4 style={{ color: "#FFFFFF", marginBottom: "1.25rem", fontSize: "1.1rem" }}>Travel With Confidence</h4>
            <div style={{ backgroundColor: "#242D28", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid #3A4740" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
                <ShieldCheck size={22} color="#63AB45" />
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>12+ Years Experience</span>
              </div>
              <p style={{ color: "#94A099", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                Over 3,500 happy travelers and 1,650 successful domestic and international tour groups. Your safety and comfort are always guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid #2C3731", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "#68726A" }}>
          <div>
            © {new Date().getFullYear()} Pak Travel & Tours. All Rights Reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/about-us" style={{ color: "#94A099" }}>About</Link>
            <Link href="/tours" style={{ color: "#94A099" }}>Tours</Link>
            <Link href="/custom-tours" style={{ color: "#94A099" }}>Custom Packages</Link>
            <Link href="/contact" style={{ color: "#94A099" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
