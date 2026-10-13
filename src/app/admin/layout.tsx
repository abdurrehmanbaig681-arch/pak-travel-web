"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  FileText,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  UserCheck,
  Layers,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/context/AdminAuthContext";
import { initialSiteSettings } from "@/lib/data/initialData";

function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, switchRole } = useAdminAuth();

  // If on /admin/login, render without sidebar shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Tours Manager", href: "/admin/tours", icon: <Compass size={18} /> },
    { label: "Bookings & Leads", href: "/admin/bookings", icon: <CalendarCheck size={18} /> },
    { label: "Custom Requests", href: "/admin/custom-requests", icon: <FileText size={18} /> },
    { label: "Page Content CMS", href: "/admin/pages", icon: <Layers size={18} /> },
    { label: "Site CMS & Settings", href: "/admin/settings", icon: <Settings size={18} /> },
    { label: "Staff & Permissions", href: "/admin/staff", icon: <Users size={18} />, adminOnly: true },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Brand Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #1E293B" }}>
          <div style={{ position: "relative", width: "140px", height: "45px", marginBottom: "0.5rem" }}>
            <Image
              src={initialSiteSettings.logos.footer}
              alt="Pak Travel"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>
              Admin Portal
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-full)",
                backgroundColor: user?.role === "admin" ? "#63AB45" : "#3B82F6",
                color: "#FFFFFF",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {user?.role || "Admin"}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
          {navItems.map((item) => {
            if (item.adminOnly && user?.role !== "admin") return null;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.7rem 1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  backgroundColor: isActive ? "#1E293B" : "transparent",
                  borderLeft: isActive ? "3px solid #63AB45" : "3px solid transparent",
                  transition: "var(--transition)",
                }}
              >
                <span style={{ color: isActive ? "#63AB45" : "#94A3B8" }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher (for testing Admin vs Staff) */}
        <div style={{ padding: "1rem", backgroundColor: "#090D16", borderTop: "1px solid #1E293B" }}>
          <div style={{ fontSize: "0.75rem", color: "#64748B", marginBottom: "0.4rem", fontWeight: 600 }}>
            TEST ROLE-BASED ACCESS (RBAC)
          </div>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button
              onClick={() => switchRole("admin")}
              style={{
                flex: 1,
                padding: "0.35rem 0.5rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: user?.role === "admin" ? "1px solid #63AB45" : "1px solid #1E293B",
                backgroundColor: user?.role === "admin" ? "#63AB45" : "#1E293B",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Admin
            </button>
            <button
              onClick={() => switchRole("staff")}
              style={{
                flex: 1,
                padding: "0.35rem 0.5rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "var(--radius-sm)",
                border: user?.role === "staff" ? "1px solid #3B82F6" : "1px solid #1E293B",
                backgroundColor: user?.role === "staff" ? "#3B82F6" : "#1E293B",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Staff
            </button>
          </div>
        </div>

        {/* User Profile & Actions Footer */}
        <div style={{ padding: "1.25rem 1rem", borderTop: "1px solid #1E293B", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#94A3B8",
              fontSize: "0.82rem",
              padding: "0.4rem 0.5rem",
            }}
          >
            <ExternalLink size={15} /> View Public Website
          </Link>
          <button
            onClick={async () => {
              await logout();
              router.push("/admin/login");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#EF4444",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              padding: "0.4rem 0.5rem",
              textAlign: "left",
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Administrative Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748B" }}>Pak Travel Operations</span>
            <ChevronRight size={14} color="#94A3B8" />
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C231F" }}>
              {pathname === "/admin"
                ? "Overview Dashboard"
                : pathname?.split("/").filter(Boolean).slice(-1)[0]?.toUpperCase()}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1C231F" }}>
                {user?.displayName || "Mian Mohsin Ali"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                {user?.email || "admin@paktravel.com.pk"}
              </div>
            </div>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#63AB45",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {user?.displayName?.[0] || "M"}
            </div>
          </div>
        </header>

        {/* Content Page Body */}
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AdminAuthProvider>
  );
}
