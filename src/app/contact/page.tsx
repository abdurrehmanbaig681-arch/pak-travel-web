"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { initialSiteSettings } from "@/lib/data/initialData";
import { createContactMessage } from "@/lib/services/tourService";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitting(true);
    try {
      await createContactMessage({
        fullName,
        email,
        phone,
        subject: subject || "General Inquiry",
        message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Contact message error:", err);
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
            Reach Out To Our Team
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Contact Pak Travel & Tours</h1>
          <p style={{ color: "#94A099", fontSize: "1.1rem", margin: 0 }}>
            Visit our office in DHA Phase 2 Lahore, or drop us a line via phone, WhatsApp, or message.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "3.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "3rem",
            alignItems: "flex-start",
          }}
          className="contact-layout"
        >
          {/* Left Column: Direct Info Cards */}
          <div>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2EAE4",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "var(--shadow-sm)",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Head Office Lahore</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ backgroundColor: "#F0F8EC", padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
                    <MapPin size={22} color="#63AB45" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#68726A", textTransform: "uppercase", fontWeight: 700 }}>
                      Physical Address
                    </span>
                    <p style={{ color: "#1C231F", fontWeight: 600, margin: 0, fontSize: "0.95rem" }}>
                      {initialSiteSettings.officeAddress}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ backgroundColor: "#F0F8EC", padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
                    <Phone size={22} color="#63AB45" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#68726A", textTransform: "uppercase", fontWeight: 700 }}>
                      Call Numbers
                    </span>
                    <a href={`tel:${initialSiteSettings.primaryPhone}`} style={{ color: "#1C231F", fontWeight: 700, fontSize: "1.05rem", display: "block" }}>
                      {initialSiteSettings.primaryPhone} (Helpline)
                    </a>
                    <a href={`tel:${initialSiteSettings.directPhone}`} style={{ color: "#68726A", fontSize: "0.9rem" }}>
                      Direct: {initialSiteSettings.directPhone}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ backgroundColor: "#F0F8EC", padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
                    <Mail size={22} color="#63AB45" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#68726A", textTransform: "uppercase", fontWeight: 700 }}>
                      Email Inquiries
                    </span>
                    <a href={`mailto:${initialSiteSettings.supportEmail}`} style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem", display: "block" }}>
                      {initialSiteSettings.supportEmail}
                    </a>
                    <a href={`mailto:${initialSiteSettings.infoEmail}`} style={{ color: "#68726A", fontSize: "0.9rem" }}>
                      {initialSiteSettings.infoEmail}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ backgroundColor: "#F0F8EC", padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
                    <Clock size={22} color="#63AB45" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#68726A", textTransform: "uppercase", fontWeight: 700 }}>
                      Office Hours
                    </span>
                    <span style={{ color: "#1C231F", fontWeight: 600, fontSize: "0.95rem" }}>
                      Monday – Saturday: 9:30 AM – 8:00 PM
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E2EAE4" }}>
                <a
                  href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=Hi%20Pak%20Travel,%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: "100%" }}
                >
                  <MessageCircle size={18} /> Open Direct WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Google Map Embed of DHA Phase 2 Lahore */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2EAE4",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                height: "260px",
              }}
            >
              <iframe
                title="Pak Travel Office Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4479366601053!2d74.37894507662584!3d31.470559749581335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906001a18c6d1%3A0x6a05ad427f735629!2sLalik%20Jan%20Chowk%2C%20Sector%20T%20DHA%20Phase%202%2C%20Lahore!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              />
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2EAE4",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Send an Online Message</h2>
            <p style={{ color: "#68726A", marginBottom: "1.75rem", fontSize: "0.92rem" }}>
              Leave your details below and our client coordinator will reach out right away.
            </p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle2 size={48} color="#63AB45" style={{ margin: "0 auto 1rem auto" }} />
                <h3 style={{ marginBottom: "0.5rem" }}>Thank You!</h3>
                <p style={{ color: "#68726A", marginBottom: "1.5rem" }}>
                  Your message has been delivered to the Pak Travel team.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
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
                    <label className="form-label">Phone Number *</label>
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

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Skardu group booking inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what you are looking for..."
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
                  {submitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
