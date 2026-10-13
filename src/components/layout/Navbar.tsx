"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { initialSiteSettings } from "@/lib/data/initialData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If in admin dashboard, suppress public navbar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "/why-us" },
    { label: "About Us", href: "/about-us" },
    { label: "Upcoming Tours", href: "/tours" },
    { label: "Custom Tours", href: "/custom-tours" },
    { label: "Past Tours", href: "/past-tours" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 100, backgroundColor: "#FFFFFF", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
      {/* Top Notification Strip */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", fontSize: "0.82rem", padding: "0.45rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <MapPin size={14} color="#63AB45" /> {initialSiteSettings.officeAddress.split(",")[1]?.trim() || "DHA Phase 2 Lahore"}
            </span>
            <a href={`mailto:${initialSiteSettings.supportEmail}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#E2EAE4" }}>
              <Mail size={14} color="#63AB45" /> {initialSiteSettings.supportEmail}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a
              href={`https://wa.me/${initialSiteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#63AB45", fontWeight: 700 }}
            >
              <Phone size={14} /> {initialSiteSettings.primaryPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px" }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ position: "relative", width: "160px", height: "55px" }}>
            <Image
              src={initialSiteSettings.logos.header}
              alt="Pak Travel & Tours"
              fill
              sizes="160px"
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: isActive ? "#63AB45" : "#1C231F",
                  position: "relative",
                  padding: "0.5rem 0",
                  transition: "var(--transition)",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      backgroundColor: "#63AB45",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/custom-tours" className="btn btn-primary btn-sm desktop-btn">
            Tailor-Made Tour <ArrowRight size={16} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#1C231F",
              display: "none",
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E2EAE4",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                color: pathname === link.href ? "#63AB45" : "#1C231F",
                padding: "0.5rem 0",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid #E2EAE4", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link
              href="/custom-tours"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Book Custom Tour
            </Link>
            <a
              href={`https://wa.me/${initialSiteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: "100%" }}
            >
              <MessageCircle size={18} /> WhatsApp Enquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
