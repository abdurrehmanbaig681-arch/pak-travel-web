"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, MapPin, Calendar, Clock, RotateCcw } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import { initialTours } from "@/lib/data/initialData";

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all"); // 'all' | 'domestic' | 'international' | 'honeymoon'
  const [maxPrice, setMaxPrice] = useState<number>(400000);
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredTours = useMemo(() => {
    return initialTours
      .filter((tour) => {
        // Query search
        const matchesQuery =
          !searchQuery ||
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.summary.toLowerCase().includes(searchQuery.toLowerCase());

        // Type filter
        const matchesType =
          filterType === "all" ||
          (filterType === "domestic" && tour.isDomestic) ||
          (filterType === "international" && !tour.isDomestic) ||
          (filterType === "honeymoon" && tour.category === "Honeymoon Package");

        // Price filter
        const price = tour.pricing.discountPrice || tour.pricing.basePrice;
        const matchesPrice = price <= maxPrice;

        // Duration filter
        const matchesDuration =
          selectedDuration === "all" ||
          (selectedDuration === "short" && tour.durationDays <= 3) ||
          (selectedDuration === "medium" && tour.durationDays >= 4 && tour.durationDays <= 7) ||
          (selectedDuration === "long" && tour.durationDays > 7);

        return matchesQuery && matchesType && matchesPrice && matchesDuration;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") {
          const pA = a.pricing.discountPrice || a.pricing.basePrice;
          const pB = b.pricing.discountPrice || b.pricing.basePrice;
          return pA - pB;
        }
        if (sortBy === "price_desc") {
          const pA = a.pricing.discountPrice || a.pricing.basePrice;
          const pB = b.pricing.discountPrice || b.pricing.basePrice;
          return pB - pA;
        }
        if (sortBy === "duration_asc") {
          return a.durationDays - b.durationDays;
        }
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchQuery, filterType, maxPrice, selectedDuration, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setMaxPrice(400000);
    setSelectedDuration("all");
    setSortBy("featured");
  };

  return (
    <div style={{ backgroundColor: "#F4F8F5", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1C231F", color: "#FFFFFF", padding: "4rem 0 3rem 0" }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>
            Pak Travel Catalog
          </span>
          <h1 style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>Upcoming Tour Packages</h1>
          <p style={{ color: "#94A099", maxWidth: "600px", margin: 0, fontSize: "1.05rem" }}>
            Browse our scheduled Northern Pakistan expeditions and international holiday packages with guaranteed departures and PKR pricing.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "2.5rem" }}>
        {/* Filter Controls Strip */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE4",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr auto",
              gap: "1.25rem",
              alignItems: "center",
            }}
            className="filter-grid"
          >
            {/* Search Input */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Search Tour or Location
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #E2EAE4", borderRadius: "var(--radius-md)", padding: "0.6rem 0.85rem" }}>
                <Search size={16} color="#63AB45" />
                <input
                  type="text"
                  placeholder="e.g. Skardu, Thailand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Region
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
                style={{ padding: "0.65rem" }}
              >
                <option value="all">All Regions</option>
                <option value="domestic">Pakistan (Domestic)</option>
                <option value="international">International</option>
                <option value="honeymoon">Honeymoon Specials</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Trip Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="form-select"
                style={{ padding: "0.65rem" }}
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 3 Days</option>
                <option value="medium">4 - 7 Days</option>
                <option value="long">8+ Days</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#68726A", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: "0.65rem" }}
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="duration_asc">Duration: Short to Long</option>
              </select>
            </div>

            {/* Reset Button */}
            <div style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>
              <button
                onClick={resetFilters}
                className="btn btn-outline"
                style={{ height: "42px", padding: "0 1rem" }}
                title="Reset Filters"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Price Range Slider */}
          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1C231F" }}>
              Budget Cap: <strong style={{ color: "#63AB45" }}>PKR {maxPrice.toLocaleString()}</strong>
            </span>
            <input
              type="range"
              min={30000}
              max={400000}
              step={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#63AB45", maxWidth: "380px" }}
            />
            <span style={{ fontSize: "0.82rem", color: "#68726A" }}>
              Showing {filteredTours.length} of {initialTours.length} tours
            </span>
          </div>
        </div>

        {/* Tour Cards Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid-3">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2EAE4",
              borderRadius: "var(--radius-lg)",
              padding: "4rem 2rem",
              textAlign: "center",
            }}
          >
            <MapPin size={48} color="#94A099" style={{ margin: "0 auto 1rem auto" }} />
            <h3 style={{ marginBottom: "0.5rem" }}>No tours match your current filters</h3>
            <p style={{ color: "#68726A", marginBottom: "1.5rem" }}>
              Try adjusting your price range, duration, or search keyword, or design a custom tour tailored to your requirements.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button onClick={resetFilters} className="btn btn-outline">
                Clear Filters
              </button>
              <Link href="/custom-tours" className="btn btn-primary">
                Request Custom Tour
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
