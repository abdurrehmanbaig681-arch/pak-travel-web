"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TourForm from "@/components/admin/TourForm";
import { getAllTours } from "@/lib/services/tourService";
import { TourItem } from "@/lib/types";

export default function EditTourPage() {
  const params = useParams();
  const id = params?.id as string;
  const [tour, setTour] = useState<TourItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await getAllTours();
      const found = all.find((t) => t.id === id || t.slug === id);
      if (found) setTour(found);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div style={{ padding: "2rem", color: "#64748B" }}>Loading tour details...</div>;
  }

  if (!tour) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Tour Not Found</h2>
        <p>The requested tour ID does not exist.</p>
      </div>
    );
  }

  return <TourForm initialData={tour} isNew={false} />;
}
