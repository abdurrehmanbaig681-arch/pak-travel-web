"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  CalendarCheck,
  FileText,
  MessageSquare,
  PlusCircle,
  Database,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  getAllTours,
  getBookings,
  getCustomTourRequests,
  getContactMessages,
  getCachedTours,
  getCachedBookings,
  getCachedCustomRequests,
  getCachedContactMessages,
  updateBookingStatus,
  seedFirestoreWithPakTravelData,
} from "@/lib/services/tourService";
import { TourItem, BookingRequest, CustomTourRequest, ContactMessage } from "@/lib/types";

export default function AdminDashboardPage() {
  // ⚡ Instant 0ms render from memory/session cache
  const [tours, setTours] = useState<TourItem[]>(() => getCachedTours());
  const [bookings, setBookings] = useState<BookingRequest[]>(() => getCachedBookings());
  const [customRequests, setCustomRequests] = useState<CustomTourRequest[]>(() => getCachedCustomRequests());
  const [enquiries, setEnquiries] = useState<ContactMessage[]>(() => getCachedContactMessages());
  const [isSyncing, setIsSyncing] = useState(false);

  const [seedStatus, setSeedStatus] = useState<string | null>(null);

  useEffect(() => {
    // 🔄 Background live revalidation from Cloud Firestore (never blocks UI)
    let mounted = true;
    async function revalidateData() {
      setIsSyncing(true);
      try {
        const [t, b, cr, enq] = await Promise.all([
          getAllTours(),
          getBookings(),
          getCustomTourRequests(),
          getContactMessages(),
        ]);
        if (mounted) {
          setTours(t);
          setBookings(b);
          setCustomRequests(cr);
          setEnquiries(enq);
        }
      } catch (err) {
        console.error("Dashboard background sync:", err);
      } finally {
        if (mounted) setIsSyncing(false);
      }
    }
    revalidateData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleStatusChange = async (bookingId: string, status: BookingRequest["status"]) => {
    await updateBookingStatus(bookingId, status);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleSeedDatabase = async () => {
    setSeedStatus("Seeding Firestore...");
    const res = await seedFirestoreWithPakTravelData();
    if (res.success) {
      setSeedStatus("Successfully synced authentic Pak Travel packages & settings to Firestore!");
      const updatedTours = await getAllTours();
      setTours(updatedTours);
    } else {
      setSeedStatus(`Seed notice: ${res.message}`);
    }
    setTimeout(() => setSeedStatus(null), 5000);
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      {/* Welcome Banner */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
            <h1 style={{ fontSize: "1.8rem", color: "#1C231F", margin: 0 }}>
              Operational Overview
            </h1>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "var(--radius-full)",
                fontWeight: 700,
                backgroundColor: isSyncing ? "#FEF3C7" : "#ECFDF5",
                color: isSyncing ? "#92400E" : "#065F46",
                border: `1px solid ${isSyncing ? "#FDE68A" : "#A7F3D0"}`,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isSyncing ? "#F59E0B" : "#10B981",
                }}
              />
              {isSyncing ? "Syncing Cloud..." : "Live Firestore Connected"}
            </span>
          </div>
          <p style={{ color: "#64748B", margin: 0, fontSize: "0.92rem" }}>
            Real-time status of Pak Travel tours, traveler booking requests, and custom inquiries.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={handleSeedDatabase}
            className="btn btn-outline"
            style={{ fontSize: "0.85rem", gap: "0.4rem" }}
            title="Sync authentic packages into Firestore"
          >
            <Database size={16} color="#63AB45" /> Sync Firestore Data
          </button>
          <Link href="/admin/tours/new" className="btn btn-primary" style={{ fontSize: "0.85rem", gap: "0.4rem" }}>
            <PlusCircle size={16} /> Add New Tour
          </Link>
        </div>
      </div>

      {seedStatus && (
        <div
          style={{
            backgroundColor: "#F0FDF4",
            border: "1px solid #86EFAC",
            borderRadius: "var(--radius-md)",
            padding: "0.85rem 1.25rem",
            color: "#166534",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <CheckCircle2 size={18} color="#166534" />
          <span>{seedStatus}</span>
        </div>
      )}

      {/* Metric KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Card 1: Published Tours */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              Active Tours
            </span>
            <div style={{ backgroundColor: "#F0F8EC", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
              <Compass size={20} color="#63AB45" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1C231F" }}>{tours.length}</div>
          <div style={{ fontSize: "0.8rem", color: "#63AB45", fontWeight: 600, marginTop: "0.25rem" }}>
            {tours.filter((t) => t.isDomestic).length} Domestic • {tours.filter((t) => !t.isDomestic).length} International
          </div>
        </div>

        {/* Card 2: Bookings */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              Booking Requests
            </span>
            <div style={{ backgroundColor: "#FEF3C7", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
              <CalendarCheck size={20} color="#F59E0B" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1C231F" }}>{bookings.length}</div>
          <div style={{ fontSize: "0.8rem", color: pendingBookings > 0 ? "#EF4444" : "#64748B", fontWeight: 600, marginTop: "0.25rem" }}>
            {pendingBookings} awaiting staff review
          </div>
        </div>

        {/* Card 3: Custom Tours */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              Tailor-Made Leads
            </span>
            <div style={{ backgroundColor: "#EFF6FF", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
              <FileText size={20} color="#3B82F6" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1C231F" }}>{customRequests.length}</div>
          <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.25rem" }}>
            Custom inquiries from /custom-tours
          </div>
        </div>

        {/* Card 4: General Enquiries */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
              Messages / Enquiries
            </span>
            <div style={{ backgroundColor: "#F3E8FF", padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
              <MessageSquare size={20} color="#8B5CF6" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1C231F" }}>{enquiries.length}</div>
          <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.25rem" }}>
            Online questions & inquiries
          </div>
        </div>
      </div>

      {/* Recent Booking Requests Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#1C231F", margin: 0 }}>Recent Booking Inquiries</h3>
            <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Latest customer requests submitted from tour detail pages
            </span>
          </div>
          <Link href="/admin/bookings" className="btn btn-outline btn-sm">
            View All ({bookings.length}) <ArrowRight size={14} />
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Tour Package</th>
                  <th>Departure Date</th>
                  <th>Travelers</th>
                  <th>Est. PKR</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 6).map((b) => (
                  <tr key={b.id}>
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
                    <td style={{ fontWeight: 700 }}>
                      PKR {b.estimatedTotalPKR?.toLocaleString() || "0"}
                    </td>
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
                    <td>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid #CBD5E1",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748B" }}>
            <CalendarCheck size={36} color="#CBD5E1" style={{ margin: "0 auto 0.75rem auto" }} />
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              No booking requests in memory yet. Use the public tour pages to submit a live booking test!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
