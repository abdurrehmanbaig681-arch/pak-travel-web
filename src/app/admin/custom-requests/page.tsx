"use client";

import React, { useEffect, useState } from "react";
import { Search, FileText, Phone, Mail, MessageCircle, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { getCustomTourRequests, updateCustomRequestStatus } from "@/lib/services/tourService";
import { CustomTourRequest } from "@/lib/types";

export default function AdminCustomRequestsPage() {
  const [requests, setRequests] = useState<CustomTourRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const list = await getCustomTourRequests();
    setRequests(list);
  }

  const handleStatusChange = async (id: string, status: CustomTourRequest["status"]) => {
    await updateCustomRequestStatus(id, status);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#1C231F", marginBottom: "0.25rem" }}>
          Tailor-Made Tour Requests
        </h1>
        <p style={{ color: "#64748B", margin: 0, fontSize: "0.92rem" }}>
          Inquiries submitted via the /custom-tours interactive itinerary planner.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          border: "1px solid #E2E8F0",
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #CBD5E1", borderRadius: "var(--radius-md)", padding: "0.5rem 0.85rem", width: "320px" }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            placeholder="Search custom leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["all", "new", "quoted", "confirmed", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid",
                borderColor: statusFilter === st ? "#63AB45" : "#E2E8F0",
                backgroundColor: statusFilter === st ? "#63AB45" : "#FFFFFF",
                color: statusFilter === st ? "#FFFFFF" : "#64748B",
                fontSize: "0.82rem",
                fontWeight: 600,
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid-2">
        {filtered.map((req) => (
          <div key={req.id} className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div>
                <span className="badge badge-primary">{req.tourType}</span>
                <h3 style={{ fontSize: "1.2rem", marginTop: "0.4rem" }}>
                  {req.location} ({req.numberOfDays} Days)
                </h3>
              </div>
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                style={{
                  fontSize: "0.8rem",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid #CBD5E1",
                }}
              >
                <option value="new">New</option>
                <option value="quoted">Quoted</option>
                <option value="confirmed">Confirmed</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", padding: "0.85rem", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.88rem" }}>
              <div style={{ fontWeight: 700, color: "#1C231F" }}>{req.fullName}</div>
              <div style={{ color: "#64748B" }}>
                Phone: {req.phone} • Email: {req.email}
              </div>
              <div style={{ color: "#64748B" }}>
                City: {req.city}, {req.country}
              </div>
              <div style={{ color: "#386626", fontWeight: 600, marginTop: "0.25rem" }}>
                Group Size: {req.numberOfTravelers} Travelers
              </div>
            </div>

            {req.description && (
              <p style={{ color: "#4B5563", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "1rem" }}>
                "{req.description}"
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                Ref: {req.id}
              </span>
              <a
                href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Salam ${req.fullName}, Pak Travel & Tours here regarding your custom itinerary to ${req.location}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={15} /> WhatsApp Client
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
