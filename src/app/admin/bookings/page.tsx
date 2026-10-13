"use client";

import React, { useEffect, useState } from "react";
import { Search, Download, Calendar, Phone, Mail, MessageCircle, Plus, FileText, CheckCircle2 } from "lucide-react";
import { getBookings, updateBookingStatus, getCachedBookings } from "@/lib/services/tourService";
import { BookingRequest } from "@/lib/types";
import { initialSiteSettings } from "@/lib/data/initialData";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>(() => getCachedBookings());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [newNote, setNewNote] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setIsSyncing(true);
    try {
      const list = await getBookings();
      setBookings(list);
    } finally {
      setIsSyncing(false);
    }
  }

  const handleStatusChange = async (id: string, status: BookingRequest["status"]) => {
    await updateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleAddNote = async (id: string) => {
    if (!newNote.trim()) return;
    await updateBookingStatus(id, selectedBooking!.status, newNote.trim());
    setNewNote("");
    await loadBookings();
    const updated = bookings.find((b) => b.id === id);
    if (updated) setSelectedBooking(updated);
  };

  // CSV Export Function
  const exportToCSV = () => {
    if (bookings.length === 0) {
      alert("No bookings available to export.");
      return;
    }

    const headers = [
      "Booking ID",
      "Customer Name",
      "Phone",
      "Email",
      "City",
      "Tour Package",
      "Departure Date",
      "Travelers Count",
      "Estimated Amount (PKR)",
      "Status",
      "Created At",
    ];

    const rows = filtered.map((b) => [
      `"${b.id}"`,
      `"${b.fullName}"`,
      `"${b.phone}"`,
      `"${b.email || ""}"`,
      `"${b.city || ""}"`,
      `"${b.tourTitle}"`,
      `"${b.departureDate}"`,
      b.numberOfTravelers,
      b.estimatedTotalPKR || 0,
      `"${b.status}"`,
      `"${b.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `paktravel_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      !search ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.tourTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.8rem", color: "#1C231F", marginBottom: "0.25rem" }}>
            Bookings & Traveler Leads
          </h1>
          <p style={{ color: "#64748B", margin: 0, fontSize: "0.92rem" }}>
            Track client requests, contact status, internal staff notes, and export reports.
          </p>
        </div>

        <button onClick={exportToCSV} className="btn btn-outline" style={{ gap: "0.5rem" }}>
          <Download size={16} /> Export to CSV
        </button>
      </div>

      {/* Filter Strip */}
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
            placeholder="Search by ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["all", "pending", "contacted", "confirmed", "cancelled"].map((st) => (
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

      {/* Layout: Table on Left, Details Drawer on Right if Selected */}
      <div style={{ display: "grid", gridTemplateColumns: selectedBooking ? "1fr 380px" : "1fr", gap: "1.5rem" }}>
        {/* Bookings Table */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Date</th>
                  <th>Travelers</th>
                  <th>PKR Total</th>
                  <th>Status</th>
                  <th>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedBooking?.id === b.id ? "#F0FDF4" : undefined,
                    }}
                  >
                    <td style={{ fontWeight: 700, color: "#63AB45", fontFamily: "var(--font-mono)" }}>
                      {b.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.fullName}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{b.phone}</div>
                    </td>
                    <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {b.tourTitle}
                    </td>
                    <td>{b.departureDate}</td>
                    <td>{b.numberOfTravelers} Guests</td>
                    <td style={{ fontWeight: 700 }}>PKR {b.estimatedTotalPKR?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "confirmed"
                            ? "badge-success"
                            : b.status === "contacted"
                            ? "badge-warning"
                            : b.status === "cancelled"
                            ? "badge-danger"
                            : "badge-primary"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Salam ${b.fullName}, this is from Pak Travel & Tours regarding your booking request ${b.id} for "${b.tourTitle}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: "0.3rem 0.5rem", borderColor: "#25D366", color: "#25D366" }}
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={15} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Booking Details Drawer */}
        {selectedBooking && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #E2E8F0",
              padding: "1.5rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0, color: "#1C231F" }}>
                Lead Details: {selectedBooking.id}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "1.25rem", padding: "1rem", backgroundColor: "#F8FAFC", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{selectedBooking.fullName}</div>
              <div style={{ color: "#64748B", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                Phone: {selectedBooking.phone}
              </div>
              {selectedBooking.email && (
                <div style={{ color: "#64748B", fontSize: "0.85rem" }}>
                  Email: {selectedBooking.email}
                </div>
              )}
              {selectedBooking.city && (
                <div style={{ color: "#64748B", fontSize: "0.85rem" }}>
                  City: {selectedBooking.city}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label className="form-label">Update Status</label>
              <select
                value={selectedBooking.status}
                onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value as any)}
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {selectedBooking.specialRequests && (
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
                  Special Requests:
                </span>
                <p style={{ color: "#374151", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                  {selectedBooking.specialRequests}
                </p>
              </div>
            )}

            {/* Internal Staff Notes */}
            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.25rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1C231F", textTransform: "uppercase" }}>
                Internal Notes & Follow-ups
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem", maxHeight: "150px", overflowY: "auto" }}>
                {selectedBooking.internalNotes?.map((n, i) => (
                  <div key={i} style={{ backgroundColor: "#F8FAFC", padding: "0.6rem", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
                    <div style={{ color: "#1C231F" }}>{n.text}</div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.2rem" }}>
                      By {n.author} • {new Date(n.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <input
                  type="text"
                  placeholder="Add a call note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.85rem", padding: "0.5rem" }}
                />
                <button
                  onClick={() => handleAddNote(selectedBooking.id)}
                  className="btn btn-outline"
                  style={{ padding: "0.5rem 0.75rem" }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
