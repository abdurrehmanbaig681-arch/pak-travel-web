import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/client";
import { TourItem, BookingRequest, CustomTourRequest, ContactMessage, PastTourItem, SiteSettings, SitePagesContent } from "../types";
import { initialTours, initialSiteSettings, initialPastTours, initialSitePagesContent } from "../data/initialData";

const TOURS_COLLECTION = "tours";
const BOOKINGS_COLLECTION = "bookings";
const CUSTOM_REQUESTS_COLLECTION = "custom_tour_requests";
const ENQUIRIES_COLLECTION = "enquiries";
const SETTINGS_COLLECTION = "site_settings";
const PAST_TOURS_COLLECTION = "past_tours";
const PAGES_CONTENT_COLLECTION = "page_contents";

// Helper to check in-memory cache / fallback if Firestore is fresh
let localToursCache: TourItem[] = [...initialTours];
let localSettingsCache: SiteSettings = { ...initialSiteSettings };
let localPagesContentCache: SitePagesContent = { ...initialSitePagesContent };
let localBookingsCache: BookingRequest[] = [];
let localCustomRequestsCache: CustomTourRequest[] = [];
let localEnquiriesCache: ContactMessage[] = [];

// ==========================================
// SYNCHRONOUS INSTANT GETTERS (0ms render)
// ==========================================
export function getCachedTours(): TourItem[] {
  if (typeof window !== "undefined") {
    try {
      const s = sessionStorage.getItem("pt_cache_tours");
      if (s) return JSON.parse(s);
    } catch {}
  }
  return localToursCache;
}

export function getCachedBookings(): BookingRequest[] {
  if (typeof window !== "undefined") {
    try {
      const s = sessionStorage.getItem("pt_cache_bookings");
      if (s) return JSON.parse(s);
    } catch {}
  }
  return localBookingsCache;
}

export function getCachedCustomRequests(): CustomTourRequest[] {
  if (typeof window !== "undefined") {
    try {
      const s = sessionStorage.getItem("pt_cache_custom_requests");
      if (s) return JSON.parse(s);
    } catch {}
  }
  return localCustomRequestsCache;
}

export function getCachedContactMessages(): ContactMessage[] {
  if (typeof window !== "undefined") {
    try {
      const s = sessionStorage.getItem("pt_cache_enquiries");
      if (s) return JSON.parse(s);
    } catch {}
  }
  return localEnquiriesCache;
}

export function getCachedPageContent(): SitePagesContent {
  if (typeof window !== "undefined") {
    try {
      const s = sessionStorage.getItem("pt_cache_pages");
      if (s) return JSON.parse(s);
    } catch {}
  }
  return localPagesContentCache;
}

export async function getPageContent(): Promise<SitePagesContent> {
  try {
    const ref = doc(db, PAGES_CONTENT_COLLECTION, "all_pages");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      localPagesContentCache = snap.data() as SitePagesContent;
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("pt_cache_pages", JSON.stringify(localPagesContentCache));
        } catch {}
      }
      return localPagesContentCache;
    }
  } catch (err) {
    console.warn("Firestore page contents read error:", err);
  }
  return localPagesContentCache;
}

export async function updatePageContent(content: SitePagesContent): Promise<SitePagesContent> {
  localPagesContentCache = content;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("pt_cache_pages", JSON.stringify(content));
    } catch {}
  }
  try {
    const ref = doc(db, PAGES_CONTENT_COLLECTION, "all_pages");
    await setDoc(ref, content, { merge: true });
  } catch (err) {
    console.warn("Firestore page contents write error:", err);
  }
  return content;
}

// ==========================================
// TOURS SERVICE
// ==========================================

export async function getAllTours(): Promise<TourItem[]> {
  try {
    const toursRef = collection(db, TOURS_COLLECTION);
    const snap = await getDocs(toursRef);

    if (snap.empty) {
      return localToursCache;
    }

    const tours: TourItem[] = [];
    snap.forEach((docSnap) => {
      tours.push({ id: docSnap.id, ...docSnap.data() } as TourItem);
    });

    localToursCache = tours;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("pt_cache_tours", JSON.stringify(tours));
      } catch {}
    }
    return tours;
  } catch (err) {
    console.warn("Firestore read failed, using cached/initial tours:", err);
    return localToursCache;
  }
}

export async function getTourBySlug(slug: string): Promise<TourItem | null> {
  const allTours = await getAllTours();
  const found = allTours.find((t) => t.slug === slug || t.id === slug);
  return found || null;
}

export async function saveTour(tour: TourItem): Promise<TourItem> {
  try {
    const tourDocRef = doc(db, TOURS_COLLECTION, tour.id);
    await setDoc(tourDocRef, {
      ...tour,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn("Firestore write failed, updating local state:", err);
  }

  // Update local cache
  const idx = localToursCache.findIndex((t) => t.id === tour.id);
  if (idx >= 0) {
    localToursCache[idx] = tour;
  } else {
    localToursCache.unshift(tour);
  }

  return tour;
}

export async function deleteTour(id: string): Promise<void> {
  try {
    const tourDocRef = doc(db, TOURS_COLLECTION, id);
    await deleteDoc(tourDocRef);
  } catch (err) {
    console.warn("Firestore delete failed:", err);
  }
  localToursCache = localToursCache.filter((t) => t.id !== id);
}

// ==========================================
// SITE SETTINGS SERVICE
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settingsDocRef = doc(db, SETTINGS_COLLECTION, "general");
    const snap = await getDoc(settingsDocRef);
    if (snap.exists()) {
      localSettingsCache = snap.data() as SiteSettings;
      return localSettingsCache;
    }
  } catch (err) {
    console.warn("Firestore settings read failed, using default:", err);
  }
  return localSettingsCache;
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  try {
    const settingsDocRef = doc(db, SETTINGS_COLLECTION, "general");
    await setDoc(settingsDocRef, settings, { merge: true });
  } catch (err) {
    console.warn("Firestore settings write failed:", err);
  }
  localSettingsCache = settings;
  return settings;
}

// ==========================================
// PAST TOURS SERVICE
// ==========================================

export async function getPastTours(): Promise<PastTourItem[]> {
  try {
    const pastRef = collection(db, PAST_TOURS_COLLECTION);
    const snap = await getDocs(pastRef);
    if (!snap.empty) {
      const pastList: PastTourItem[] = [];
      snap.forEach((docSnap) => {
        pastList.push({ id: docSnap.id, ...docSnap.data() } as PastTourItem);
      });
      return pastList;
    }
  } catch (err) {
    console.warn("Firestore past tours read failed:", err);
  }
  return initialPastTours;
}

// ==========================================
// BOOKINGS & LEADS SERVICE
// ==========================================

export async function createBookingRequest(
  data: Omit<BookingRequest, "id" | "status" | "createdAt">
): Promise<BookingRequest> {
  const id = `PT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: BookingRequest = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
    internalNotes: [],
  };

  try {
    const bookingDocRef = doc(db, BOOKINGS_COLLECTION, id);
    await setDoc(bookingDocRef, newBooking);
  } catch (err) {
    console.warn("Firestore booking write failed, keeping in local memory:", err);
  }

  localBookingsCache.unshift(newBooking);
  return newBooking;
}

export async function getBookings(): Promise<BookingRequest[]> {
  try {
    const bookingsRef = collection(db, BOOKINGS_COLLECTION);
    const snap = await getDocs(bookingsRef);
    if (!snap.empty) {
      const list: BookingRequest[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as BookingRequest));
      localBookingsCache = list;
      if (typeof window !== "undefined") {
        try { sessionStorage.setItem("pt_cache_bookings", JSON.stringify(list)); } catch {}
      }
      return list;
    }
  } catch (err) {
    console.warn("Firestore bookings read failed:", err);
  }
  return localBookingsCache;
}

export async function updateBookingStatus(
  id: string,
  status: BookingRequest["status"],
  note?: string
): Promise<void> {
  const idx = localBookingsCache.findIndex((b) => b.id === id);
  if (idx >= 0) {
    localBookingsCache[idx].status = status;
    if (note) {
      localBookingsCache[idx].internalNotes = localBookingsCache[idx].internalNotes || [];
      localBookingsCache[idx].internalNotes!.push({
        text: note,
        author: "Staff",
        createdAt: new Date().toISOString(),
      });
    }
    if (typeof window !== "undefined") {
      try { sessionStorage.setItem("pt_cache_bookings", JSON.stringify(localBookingsCache)); } catch {}
    }
  }

  try {
    const ref = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(ref, {
      status,
      ...(note
        ? {
            internalNotes: localBookingsCache[idx]?.internalNotes || [],
          }
        : {}),
    });
  } catch (err) {
    console.warn("Firestore booking status update failed:", err);
  }
}

// ==========================================
// CUSTOM TOUR REQUESTS SERVICE
// ==========================================

export async function createCustomTourRequest(
  data: Omit<CustomTourRequest, "id" | "status" | "createdAt">
): Promise<CustomTourRequest> {
  const id = `CR-${Date.now().toString().slice(-6)}`;
  const newRequest: CustomTourRequest = {
    ...data,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const ref = doc(db, CUSTOM_REQUESTS_COLLECTION, id);
    await setDoc(ref, newRequest);
  } catch (err) {
    console.warn("Firestore custom request write failed:", err);
  }

  localCustomRequestsCache.unshift(newRequest);
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem("pt_cache_custom_requests", JSON.stringify(localCustomRequestsCache)); } catch {}
  }
  return newRequest;
}

export async function getCustomTourRequests(): Promise<CustomTourRequest[]> {
  try {
    const ref = collection(db, CUSTOM_REQUESTS_COLLECTION);
    const snap = await getDocs(ref);
    if (!snap.empty) {
      const list: CustomTourRequest[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as CustomTourRequest));
      localCustomRequestsCache = list;
      if (typeof window !== "undefined") {
        try { sessionStorage.setItem("pt_cache_custom_requests", JSON.stringify(list)); } catch {}
      }
      return list;
    }
  } catch (err) {
    console.warn("Firestore custom requests read failed:", err);
  }
  return localCustomRequestsCache;
}

export async function updateCustomRequestStatus(
  id: string,
  status: CustomTourRequest["status"]
): Promise<void> {
  const idx = localCustomRequestsCache.findIndex((c) => c.id === id);
  if (idx >= 0) {
    localCustomRequestsCache[idx].status = status;
    if (typeof window !== "undefined") {
      try { sessionStorage.setItem("pt_cache_custom_requests", JSON.stringify(localCustomRequestsCache)); } catch {}
    }
  }
  try {
    const ref = doc(db, CUSTOM_REQUESTS_COLLECTION, id);
    await updateDoc(ref, { status });
  } catch (err) {
    console.warn("Firestore custom request status update failed:", err);
  }
}

// ==========================================
// CONTACT / ENQUIRIES SERVICE
// ==========================================

export async function createContactMessage(
  data: Omit<ContactMessage, "id" | "status" | "createdAt">
): Promise<ContactMessage> {
  const id = `MSG-${Date.now().toString().slice(-6)}`;
  const newMsg: ContactMessage = {
    ...data,
    id,
    status: "unread",
    createdAt: new Date().toISOString(),
  };

  try {
    const ref = doc(db, ENQUIRIES_COLLECTION, id);
    await setDoc(ref, newMsg);
  } catch (err) {
    console.warn("Firestore enquiry write failed:", err);
  }

  localEnquiriesCache.unshift(newMsg);
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem("pt_cache_enquiries", JSON.stringify(localEnquiriesCache)); } catch {}
  }
  return newMsg;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const ref = collection(db, ENQUIRIES_COLLECTION);
    const snap = await getDocs(ref);
    if (!snap.empty) {
      const list: ContactMessage[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ContactMessage));
      localEnquiriesCache = list;
      if (typeof window !== "undefined") {
        try { sessionStorage.setItem("pt_cache_enquiries", JSON.stringify(list)); } catch {}
      }
      return list;
    }
  } catch (err) {
    console.warn("Firestore contact messages read failed:", err);
  }
  return localEnquiriesCache;
}

// ==========================================
// ONE-CLICK DATABASE SEED FUNCTION
// ==========================================

export async function seedFirestoreWithPakTravelData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Site Settings
    const settingsRef = doc(db, SETTINGS_COLLECTION, "general");
    await setDoc(settingsRef, initialSiteSettings, { merge: true });

    // 2. Tours
    for (const tour of initialTours) {
      const tourRef = doc(db, TOURS_COLLECTION, tour.id);
      await setDoc(tourRef, tour, { merge: true });
    }

    // 3. Past Tours
    for (const past of initialPastTours) {
      const pastRef = doc(db, PAST_TOURS_COLLECTION, past.id);
      await setDoc(pastRef, past, { merge: true });
    }

    return {
      success: true,
      message: "Successfully seeded Firestore with Pak Travel & Tours initial tours, settings, and media!",
    };
  } catch (error: any) {
    console.error("Firestore seeding error:", error);
    return {
      success: false,
      message: error?.message || "Failed to seed Firestore.",
    };
  }
}
