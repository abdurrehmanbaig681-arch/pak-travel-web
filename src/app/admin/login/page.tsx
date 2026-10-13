"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";
import { initialSiteSettings } from "@/lib/data/initialData";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("admin@paktravel.com.pk");
  const [password, setPassword] = useState("Admin@12345");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const res = await login(email, password);
    if (res.success) {
      router.push("/admin");
    } else {
      setErrorMessage(res.error || "Login failed. Please check credentials.");
      setLoading(false);
    }
  };

  const handleQuickFill = (role: "admin" | "staff") => {
    if (role === "admin") {
      setEmail("admin@paktravel.com.pk");
      setPassword("Admin@12345");
    } else {
      setEmail("staff@paktravel.com.pk");
      setPassword("Staff@12345");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Logo & Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ position: "relative", width: "170px", height: "60px", margin: "0 auto 1rem auto" }}>
            <Image
              src={initialSiteSettings.logos.header}
              alt="Pak Travel & Tours"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h2 style={{ fontSize: "1.5rem", color: "#1C231F", marginBottom: "0.25rem" }}>
            Admin Portal Login
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.85rem", margin: 0 }}>
            Sign in to manage tours, booking requests, and website content
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #F87171",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              color: "#991B1B",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ShieldAlert size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Staff / Admin Email</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <Mail
                size={16}
                color="#94A3B8"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <Lock
                size={16}
                color="#94A3B8"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", height: "46px", marginTop: "0.5rem", fontSize: "0.95rem" }}
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        {/* Quick Demo Fill Buttons */}
        <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid #E2E8F0" }}>
          <span style={{ display: "block", fontSize: "0.75rem", color: "#64748B", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.6rem" }}>
            Quick Demo Accounts
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => handleQuickFill("admin")}
              className="btn btn-outline"
              style={{ flex: 1, padding: "0.45rem", fontSize: "0.8rem", color: "#63AB45", borderColor: "#63AB45" }}
            >
              Fill Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("staff")}
              className="btn btn-outline"
              style={{ flex: 1, padding: "0.45rem", fontSize: "0.8rem", color: "#3B82F6", borderColor: "#3B82F6" }}
            >
              Fill Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
