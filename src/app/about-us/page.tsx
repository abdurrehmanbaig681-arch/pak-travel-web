"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, CheckCircle2, Send, MessageCircle } from "lucide-react";
import { initialSiteSettings, initialSitePagesContent } from "@/lib/data/initialData";
import { createContactMessage, getCachedPageContent, getPageContent } from "@/lib/services/tourService";

export default function AboutUsPage() {
  const [pageContent, setPageContent] = useState(initialSitePagesContent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    const cached = getCachedPageContent();
    if (cached) setPageContent(cached);
    getPageContent().then((res) => setPageContent(res)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    try {
      await createContactMessage({
        fullName: name,
        email,
        phone,
        subject: "About Page Message",
        message,
      });
      setSentSuccess(true);
    } catch (err) {
      console.error("Message send failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F4F8F5", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "4rem 0 3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>
            {pageContent.about.bannerBadge || "Our Heritage & Vision"}
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>
            {pageContent.about.bannerTitle || "About Pak Travel & Tours"}
          </h1>
          <p style={{ color: "#94A099", fontSize: "1.1rem", margin: 0 }}>
            {pageContent.about.bannerSubtitle || "Providing the best travelling experiences to our travelers across Pakistan and beyond."}
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "3.5rem" }}>
        {/* Story Section from CMS */}
        {pageContent.about.storyContent && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2EAE4",
              borderRadius: "var(--radius-lg)",
              padding: "3rem",
              marginBottom: "3rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span className="section-tag">About Our Journey</span>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              {pageContent.about.storyTitle || "Connecting Travelers with Pakistan's Natural Wonders"}
            </h2>
            <div style={{ color: "#374151", fontSize: "1.05rem", lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {pageContent.about.storyContent}
            </div>
          </div>
        )}
        {/* CEO Profile Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "3.5rem",
            marginBottom: "3.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "340px 1fr",
              gap: "3.5rem",
              alignItems: "center",
            }}
            className="about-ceo-grid"
          >
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
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div>
              <span className="section-tag">Executive Leadership</span>
              <h2 style={{ fontSize: "2.2rem", marginBottom: "0.35rem" }}>{initialSiteSettings.ceoName}</h2>
              <h4 style={{ color: "#63AB45", fontWeight: 600, marginBottom: "1.25rem", fontSize: "1.15rem" }}>
                {initialSiteSettings.ceoTitle}
              </h4>

              <p style={{ color: "#374151", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>
                "{initialSiteSettings.ceoMessage}"
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #E2EAE4",
                }}
                className="ceo-details-grid"
              >
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <Mail size={18} color="#63AB45" />
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#68726A", textTransform: "uppercase" }}>Email</span>
                    <a href={`mailto:${initialSiteSettings.supportEmail}`} style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem" }}>
                      {initialSiteSettings.supportEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <Phone size={18} color="#63AB45" />
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#68726A", textTransform: "uppercase" }}>Phone</span>
                    <a href={`tel:${initialSiteSettings.directPhone}`} style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem" }}>
                      {initialSiteSettings.directPhone}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <MapPin size={18} color="#63AB45" />
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#68726A", textTransform: "uppercase" }}>Office Address</span>
                    <span style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem" }}>
                      {initialSiteSettings.officeAddress}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <Globe size={18} color="#63AB45" />
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "#68726A", textTransform: "uppercase" }}>Official Domain</span>
                    <span style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem" }}>
                      www.paktravel.com.pk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Us Form */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "3rem",
            maxWidth: "750px",
            margin: "0 auto",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
              Get In Touch
            </span>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Message Us Directly</h2>
            <p style={{ color: "#68726A", margin: 0 }}>
              Have questions about an upcoming tour or private charter? Leave a message and we will respond promptly.
            </p>
          </div>

          {sentSuccess ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <CheckCircle2 size={48} color="#63AB45" style={{ margin: "0 auto 1rem auto" }} />
              <h3 style={{ marginBottom: "0.5rem" }}>Message Delivered!</h3>
              <p style={{ color: "#68726A", marginBottom: "1.5rem" }}>
                Thank you for contacting Pak Travel & Tours. Our team will review your inquiry shortly.
              </p>
              <button onClick={() => setSentSuccess(false)} className="btn btn-outline">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="ceo-details-grid">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="0322-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

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
                <label className="form-label">Message Details *</label>
                <textarea
                  rows={4}
                  placeholder="How can we assist you with your travel plans?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", height: "48px" }}
              >
                {submitting ? "Sending..." : "Submit Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
