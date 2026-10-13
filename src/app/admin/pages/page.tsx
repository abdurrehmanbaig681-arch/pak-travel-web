"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  FileText,
  Info,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { SitePagesContent } from "@/lib/types";
import { initialSitePagesContent } from "@/lib/data/initialData";
import { getCachedPageContent, getPageContent, updatePageContent } from "@/lib/services/tourService";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";

export default function AdminPageEditor() {
  const { user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"home" | "about" | "whyUs">("home");
  const [content, setContent] = useState<SitePagesContent>(() => getCachedPageContent());
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPageContent();
        setContent(data);
      } catch (e) {
        console.error("Failed to load page contents:", e);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role !== "admin") {
      setFeedback({
        type: "error",
        message: "Only full Admins have permission to modify live page content.",
      });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      await updatePageContent(content);
      setFeedback({
        type: "success",
        message: `Successfully saved and published changes for ${activeTab.toUpperCase()}!`,
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to save page content.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset current tab content back to initial defaults?")) {
      setContent((prev) => ({
        ...prev,
        [activeTab]: initialSitePagesContent[activeTab],
      }));
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.75rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <Layers size={22} color="#63AB45" />
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Visual Page Content Editor
            </h1>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.95rem", margin: 0 }}>
            Elementor-style CMS to customize live page headlines, descriptions, guarantee badges, and CTA banners.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            href={activeTab === "home" ? "/" : activeTab === "about" ? "/about-us" : "/why-us"}
            target="_blank"
            className="btn btn-outline"
            style={{
              fontSize: "0.88rem",
              padding: "0.6rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#FFFFFF",
              borderColor: "#CBD5E1",
            }}
          >
            <ExternalLink size={16} /> Preview Live Page
          </Link>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="btn btn-outline"
            style={{
              fontSize: "0.88rem",
              padding: "0.6rem 1rem",
              borderColor: "#E2E8F0",
              color: "#64748B",
            }}
            title="Reset this tab to initial default text"
          >
            <RotateCcw size={16} /> Reset
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

      {/* Page Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          borderBottom: "2px solid #E2E8F0",
          marginBottom: "2rem",
          overflowX: "auto",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: activeTab === "home" ? "#63AB45" : "#64748B",
            borderBottom: activeTab === "home" ? "3px solid #63AB45" : "3px solid transparent",
            marginBottom: "-2px",
            transition: "all 0.2s ease",
          }}
        >
          🏠 Homepage (/)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: activeTab === "about" ? "#63AB45" : "#64748B",
            borderBottom: activeTab === "about" ? "3px solid #63AB45" : "3px solid transparent",
            marginBottom: "-2px",
            transition: "all 0.2s ease",
          }}
        >
          ℹ️ About Us (/about-us)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("whyUs")}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: activeTab === "whyUs" ? "#63AB45" : "#64748B",
            borderBottom: activeTab === "whyUs" ? "3px solid #63AB45" : "3px solid transparent",
            marginBottom: "-2px",
            transition: "all 0.2s ease",
          }}
        >
          🌟 Why Us (/why-us)
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* =========================================================
            TAB 1: HOMEPAGE BUILDER
            ========================================================= */}
        {activeTab === "home" && (
          <div>
            {/* Section 1: Hero Banner */}
            <div className="card" style={{ padding: "2rem", marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Sparkles size={20} color="#63AB45" />
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  1. Homepage Hero Section
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    Hero Top Pill Badge
                  </label>
                  <input
                    type="text"
                    value={content.home.heroBadge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, heroBadge: e.target.value },
                      })
                    }
                    className="form-input"
                    required
                  />
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>
                    Shown in the green badge at the top of the hero section.
                  </span>
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    Main Hero Headline (H1)
                  </label>
                  <input
                    type="text"
                    value={content.home.heroTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, heroTitle: e.target.value },
                      })
                    }
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    Hero Subtitle Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.home.heroSubtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, heroSubtitle: e.target.value },
                      })
                    }
                    className="form-textarea"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Guarantees Strip */}
            <div className="card" style={{ padding: "2rem", marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <ShieldCheck size={20} color="#63AB45" />
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  2. Hero Guarantees Badges
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {content.home.guarantees.map((item, idx) => (
                  <div key={idx}>
                    <label className="form-label" style={{ fontWeight: 700 }}>
                      Guarantee #{idx + 1}
                    </label>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const copy = [...content.home.guarantees];
                        copy[idx] = e.target.value;
                        setContent({
                          ...content,
                          home: { ...content.home, guarantees: copy },
                        });
                      }}
                      className="form-input"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Bottom Call to Action Banner */}
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <FileText size={20} color="#63AB45" />
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  3. Bottom CTA Banner
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={content.home.ctaTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, ctaTitle: e.target.value },
                      })
                    }
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    CTA Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={content.home.ctaSubtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, ctaSubtitle: e.target.value },
                      })
                    }
                    className="form-textarea"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={content.home.ctaButtonText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: { ...content.home, ctaButtonText: e.target.value },
                      })
                    }
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: ABOUT US PAGE BUILDER
            ========================================================= */}
        {activeTab === "about" && (
          <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.25rem" }}>
              About Us Page Content
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Top Tagline Badge
                </label>
                <input
                  type="text"
                  value={content.about.bannerBadge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, bannerBadge: e.target.value },
                    })
                  }
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Page Header Title (H1)
                </label>
                <input
                  type="text"
                  value={content.about.bannerTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, bannerTitle: e.target.value },
                    })
                  }
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Header Subtitle
                </label>
                <textarea
                  rows={2}
                  value={content.about.bannerSubtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, bannerSubtitle: e.target.value },
                    })
                  }
                  className="form-textarea"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Story Headline
                </label>
                <input
                  type="text"
                  value={content.about.storyTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, storyTitle: e.target.value },
                    })
                  }
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Detailed Company Story (Paragraphs)
                </label>
                <textarea
                  rows={6}
                  value={content.about.storyContent}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, storyContent: e.target.value },
                    })
                  }
                  className="form-textarea"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: WHY US PAGE BUILDER
            ========================================================= */}
        {activeTab === "whyUs" && (
          <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.25rem" }}>
              Why Us Page Content
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Top Tagline Badge
                </label>
                <input
                  type="text"
                  value={content.whyUs.bannerBadge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyUs: { ...content.whyUs, bannerBadge: e.target.value },
                    })
                  }
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Page Header Title (H1)
                </label>
                <input
                  type="text"
                  value={content.whyUs.bannerTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyUs: { ...content.whyUs, bannerTitle: e.target.value },
                    })
                  }
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Header Subtitle
                </label>
                <textarea
                  rows={2}
                  value={content.whyUs.bannerSubtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyUs: { ...content.whyUs, bannerSubtitle: e.target.value },
                    })
                  }
                  className="form-textarea"
                  required
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>
                  Fleet Introduction Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.whyUs.fleetIntro}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyUs: { ...content.whyUs, fleetIntro: e.target.value },
                    })
                  }
                  className="form-textarea"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Sticky Action Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            position: "sticky",
            bottom: "1.5rem",
            backgroundColor: "#FFFFFF",
            padding: "1rem 1.5rem",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid #E2E8F0",
          }}
        >
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{
              padding: "0.75rem 2.25rem",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Save size={18} />
            {saving ? "Publishing Changes..." : "Save & Publish Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
