"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { initialSiteSettings } from "@/lib/data/initialData";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide in admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const defaultMessage = encodeURIComponent(
    "Hi Pak Travel & Tours! I would like to inquire about your upcoming tour packages."
  );

  return (
    <a
      href={`https://wa.me/${initialSiteSettings.whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>WhatsApp</span>
    </a>
  );
}
