"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Search, Edit3, Trash2, ExternalLink, Compass, Clock, MapPin } from "lucide-react";
import { getAllTours, deleteTour, saveTour, getCachedTours } from "@/lib/services/tourService";
import { TourItem } from "@/lib/types";

export default function AdminToursPage() {
  const [tours, setTours] = useState<TourItem[]>(() => getCachedTours());
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadTours();
  }, []);

  async function loadTours() {
    setIsSyncing(true);
    try {
      const list = await getAllTours();
      setTours(list);
    } finally {
      setIsSyncing(false);
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete tour "${title}"?`)) return;
    await deleteTour(id);
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = async (tour: TourItem) => {
    const newStatus = tour.status === "published" ? "draft" : "published";
    const updated = { ...tour, status: newStatus as any };
    await saveTour(updated);
    setTours((prev) => prev.map((t) => (t.id === tour.id ? updated : t)));
  };

  const filtered = tours.filter((t) => {
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase());
    const matchesRegion =
      filterRegion === "all" ||
      (filterRegion === "domestic" && t.isDomestic) ||
      (filterRegion === "international" && !t.isDomestic);
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      {/* Header Strip */}
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
            Tours Management
          </h1>
          <p style={{ color: "#64748B", margin: 0, fontSize: "0.92rem" }}>
            Create, update itineraries, set PKR pricing, manage departure dates, and publish tours.
          </p>
        </div>

        <Link href="/admin/tours/new" className="btn btn-primary" style={{ gap: "0.4rem" }}>
          <PlusCircle size={18} /> Create New Tour
        </Link>
      </div>

      {/* Filter / Search Bar */}
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
            placeholder="Search tours by title or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="form-select"
            style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            <option value="all">All Regions ({tours.length})</option>
            <option value="domestic">Pakistan Domestic ({tours.filter((t) => t.isDomestic).length})</option>
            <option value="international">International ({tours.filter((t) => !t.isDomestic).length})</option>
          </select>
        </div>
      </div>

      {/* Tours Table */}
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
                <th>Cover</th>
                <th>Tour Title</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Price (PKR)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tour) => {
                const cover = tour.images?.[0]?.url || "";
                const price = tour.pricing.discountPrice || tour.pricing.basePrice;

                return (
                  <tr key={tour.id}>
                    <td style={{ width: "70px" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "45px",
                          borderRadius: "var(--radius-sm)",
                          overflow: "hidden",
                          backgroundColor: "#E2E8F0",
                        }}
                      >
                        {cover && (
                          <Image src={cover} alt={tour.title} fill style={{ objectFit: "cover" }} />
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "#1C231F", fontSize: "0.95rem" }}>
                        {tour.title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B" }}>
                        Slug: /{tour.slug}
                      </div>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.88rem" }}>
                        <MapPin size={13} color="#63AB45" /> {tour.destination}
                      </span>
                    </td>
                    <td>{tour.durationDays}D / {tour.durationNights}N</td>
                    <td style={{ fontWeight: 700, color: "#1C231F" }}>
                      PKR {price.toLocaleString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(tour)}
                        className={`badge ${tour.status === "published" ? "badge-success" : "badge-secondary"}`}
                        style={{ cursor: "pointer", border: "none" }}
                        title="Click to toggle status"
                      >
                        {tour.status}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <Link
                          href={`/tours/${tour.slug}`}
                          target="_blank"
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.5rem" }}
                          title="Preview public page"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <Link
                          href={`/admin/tours/${tour.id}`}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.5rem" }}
                          title="Edit tour"
                        >
                          <Edit3 size={14} color="#3B82F6" />
                        </Link>
                        <button
                          onClick={() => handleDelete(tour.id, tour.title)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.5rem", borderColor: "#FCA5A5" }}
                          title="Delete tour"
                        >
                          <Trash2 size={14} color="#EF4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
