"use client";

import React, { useState } from "react";
import {
  Users,
  Shield,
  UserCheck,
  UserPlus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Key,
  ShieldCheck,
  Info,
} from "lucide-react";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";

interface StaffMember {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff";
  lastLogin: string;
  status: "active" | "invited";
}

const initialStaffList: StaffMember[] = [
  {
    id: "user-1",
    email: "admin@paktravel.com.pk",
    name: "Mian Mohsin Ali (CEO)",
    role: "admin",
    lastLogin: "Today at 07:15 AM",
    status: "active",
  },
  {
    id: "user-2",
    email: "contact@paktravel.com.pk",
    name: "Operations Head",
    role: "admin",
    lastLogin: "Yesterday at 04:30 PM",
    status: "active",
  },
  {
    id: "user-3",
    email: "staff@paktravel.com.pk",
    name: "Reservations Specialist",
    role: "staff",
    lastLogin: "Oct 11, 2026",
    status: "active",
  },
];

export default function AdminStaffPage() {
  const { user } = useAdminAuth();
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffList);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "staff">("staff");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newMember: StaffMember = {
      id: `user-${Date.now()}`,
      email: inviteEmail,
      name: inviteName,
      role: inviteRole,
      lastLogin: "Never",
      status: "invited",
    };

    setStaffList([...staffList, newMember]);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteName("");
    setFeedback({
      type: "success",
      message: `Invitation generated for ${inviteEmail} with ${inviteRole.toUpperCase()} permissions.`,
    });
  };

  const handleRoleToggle = (id: string) => {
    setStaffList(
      staffList.map((m) => {
        if (m.id === id) {
          const nextRole = m.role === "admin" ? "staff" : "admin";
          return { ...m, role: nextRole };
        }
        return m;
      })
    );
    setFeedback({
      type: "success",
      message: "Role updated successfully.",
    });
  };

  const handleRemove = (id: string, name: string) => {
    if (staffList.length <= 1) {
      alert("At least one admin account must remain active.");
      return;
    }
    if (confirm(`Remove access for ${name}?`)) {
      setStaffList(staffList.filter((m) => m.id !== id));
      setFeedback({
        type: "success",
        message: `Revoked access for ${name}.`,
      });
    }
  };

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
            Staff & Role Permissions
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
            Role-Based Access Control (RBAC) powered by Firebase Authentication and Firestore claims.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="btn btn-primary"
          style={{
            padding: "0.6rem 1.25rem",
            fontSize: "0.88rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <UserPlus size={16} />
          Invite Team Member
        </button>
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

      {/* Permissions Matrix Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #63AB45" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
            <ShieldCheck size={20} color="#63AB45" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Admin Privileges</h3>
          </div>
          <ul style={{ paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6 }}>
            <li>Full create, update, delete across all Tours</li>
            <li>Manage Bookings, Custom Inquiries & internal notes</li>
            <li>Modify Site Settings, WhatsApp number, and Lahore office data</li>
            <li>Grant and revoke Staff credentials & trigger DB syncs</li>
          </ul>
        </div>

        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #3B82F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
            <UserCheck size={20} color="#3B82F6" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Staff Privileges</h3>
          </div>
          <ul style={{ paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.6 }}>
            <li>View all Tours and Departure status</li>
            <li>Update Booking status (Pending → Contacted → Confirmed)</li>
            <li>Add internal traveler communication notes</li>
            <li>Read-only access to Site CMS and Staff configuration</li>
          </ul>
        </div>
      </div>

      {/* Staff Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>
            Active Team Members ({staffList.length})
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member Name & Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{m.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748B" }}>{m.email}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-full)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        backgroundColor: m.role === "admin" ? "#ECFDF5" : "#EFF6FF",
                        color: m.role === "admin" ? "#065F46" : "#1D4ED8",
                        border: `1px solid ${m.role === "admin" ? "#A7F3D0" : "#BFDBFE"}`,
                      }}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        fontWeight: 600,
                        backgroundColor: m.status === "active" ? "#F1F5F9" : "#FEF3C7",
                        color: m.status === "active" ? "#334155" : "#92400E",
                      }}
                    >
                      {m.status === "active" ? "Active" : "Invitation Pending"}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "#64748B" }}>{m.lastLogin}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => handleRoleToggle(m.id)}
                        className="btn btn-outline"
                        style={{
                          padding: "0.35rem 0.75rem",
                          fontSize: "0.8rem",
                          borderColor: "#CBD5E1",
                        }}
                        title="Toggle role between Admin and Staff"
                      >
                        Change to {m.role === "admin" ? "Staff" : "Admin"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(m.id, m.name)}
                        className="btn btn-outline"
                        style={{
                          padding: "0.35rem 0.6rem",
                          fontSize: "0.8rem",
                          color: "#DC2626",
                          borderColor: "#FECACA",
                        }}
                        title="Revoke access"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "480px",
              width: "100%",
              padding: "2rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem", color: "#0F172A" }}>
              Invite Team Member
            </h3>
            <p style={{ color: "#64748B", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
              Send an invitation to join Pak Travel Admin. They will receive access via Firebase Authentication.
            </p>

            <form onSubmit={handleInvite}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Asad Ullah"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Official Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. reservations@paktravel.com.pk"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Assigned Permission Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as "admin" | "staff")}
                  className="input-field"
                >
                  <option value="staff">Staff (Booking updates, inquiries, notes)</option>
                  <option value="admin">Admin (Full system control & settings)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="btn btn-outline"
                  style={{ borderColor: "#CBD5E1" }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
