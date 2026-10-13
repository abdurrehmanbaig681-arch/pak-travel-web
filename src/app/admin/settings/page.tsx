"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Share2,
  TrendingUp,
  User,
  Database,
} from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { initialSiteSettings } from "@/lib/data/initialData";
import { getSiteSettings, updateSiteSettings, seedFirestoreWithPakTravelData } from "@/lib/services/tourService";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const s = await getSiteSettings();
        setSettings(s);
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role !== "admin") {
      setFeedback({
        type: "error",
        message: "Only full Admins have permission to modify site-wide CMS settings.",
      });
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      await updateSiteSettings(settings);
      setFeedback({
        type: "success",
        message: "Site settings updated successfully in Firestore and cache!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to save settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSeed = async () => {
    if (
      !confirm(
        "Are you sure you want to seed/sync the Pak Travel initial tours, settings, and itineraries to Firestore?"
      )
    ) {
      return;
    }
    setSeeding(true);
    setFeedback(null);
    try {
      const res = await seedFirestoreWithPakTravelData();
      if (res.success) {
        setFeedback({
          type: "success",
          message: res.message,
        });
      } else {
        setFeedback({
          type: "error",
          message: res.message,
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Error seeding Firestore.",
      });
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "#64748B" }}>
        Loading site settings...
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>
            Site CMS & Business Settings
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
            Manage authentic business information, contact channels, Lahore office address, and social links.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding || user?.role !== "admin"}
            className="btn btn-outline"
            style={{
              padding: "0.6rem 1.25rem",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderColor: "#CBD5E1",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Database size={16} />
            {seeding ? "Syncing..." : "Sync / Seed Firestore"}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            backgroundColor: feedback.type === "success" ? "#ECFDF5" : "#FEF2F2",
            border: `1px solid ${feedback.type === "success" ? "#A7F3D0" : "#FECACA"}`,
            color: feedback.type === "success" ? "#065F46" : "#991B1B",
          }}
        >
          {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{feedback.message}</span>
        </div>
      )}

      {user?.role !== "admin" && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#FEF3C7",
            border: "1px solid #FDE68A",
            color: "#92400E",
            marginBottom: "1.5rem",
            fontSize: "0.88rem",
            fontWeight: 600,
          }}
        >
          Viewing in Staff (Read-Only) mode. To edit settings or trigger database syncs, switch your role to Admin in the top bar.
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Section 1: Business Identity */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Building2 size={18} color="#63AB45" /> Business Identity
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Full Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Short Brand Name
              </label>
              <input
                type="text"
                value={settings.shortName}
                onChange={(e) => setSettings({ ...settings, shortName: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Official Tagline / Slogan
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Channels & Location */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Phone size={18} color="#63AB45" /> Contact Channels & Lahore Office
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Primary Helpline Phone
              </label>
              <input
                type="text"
                value={settings.primaryPhone}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Direct / Mobile Phone
              </label>
              <input
                type="text"
                value={settings.directPhone}
                onChange={(e) => setSettings({ ...settings, directPhone: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                WhatsApp Number (e.g. 923221114666)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                WhatsApp Direct Link
              </label>
              <input
                type="url"
                value={settings.whatsappLink}
                onChange={(e) => setSettings({ ...settings, whatsappLink: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Support Email Address
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                General Information Email
              </label>
              <input
                type="email"
                value={settings.infoEmail}
                onChange={(e) => setSettings({ ...settings, infoEmail: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Official Office Physical Address
              </label>
              <input
                type="text"
                value={settings.officeAddress}
                onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social & Trust Stats */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <TrendingUp size={18} color="#63AB45" /> Verified Track Record & Socials
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Experience (e.g. 12+ Years)
              </label>
              <input
                type="text"
                value={settings.stats.experienceYears}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, experienceYears: e.target.value },
                  })
                }
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Happy Travelers (e.g. 3500+)
              </label>
              <input
                type="text"
                value={settings.stats.happyTravelers}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, happyTravelers: e.target.value },
                  })
                }
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Successful Tours (e.g. 1650+)
              </label>
              <input
                type="text"
                value={settings.stats.toursSuccess}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, toursSuccess: e.target.value },
                  })
                }
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Positive Rating (e.g. 99%)
              </label>
              <input
                type="text"
                value={settings.stats.positiveReviewsPercent}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, positiveReviewsPercent: e.target.value },
                  })
                }
                className="input-field"
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Leadership Profile */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <User size={18} color="#63AB45" /> Leadership & CEO Statement
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Executive Name
              </label>
              <input
                type="text"
                value={settings.ceoName}
                onChange={(e) => setSettings({ ...settings, ceoName: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Executive Title
              </label>
              <input
                type="text"
                value={settings.ceoTitle}
                onChange={(e) => setSettings({ ...settings, ceoTitle: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Photo URL
              </label>
              <input
                type="url"
                value={settings.ceoImage}
                onChange={(e) => setSettings({ ...settings, ceoImage: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Message from CEO
            </label>
            <textarea
              rows={4}
              value={settings.ceoMessage}
              onChange={(e) => setSettings({ ...settings, ceoMessage: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            position: "sticky",
            bottom: "1rem",
            backgroundColor: "#FFFFFF",
            padding: "1rem 1.5rem",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid #E2E8F0",
          }}
        >
          <button
            type="submit"
            disabled={saving || user?.role !== "admin"}
            className="btn btn-primary"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Save size={18} />
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
