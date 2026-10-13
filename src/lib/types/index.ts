export interface SiteSettings {
  companyName: string;
  shortName: string;
  tagline: string;
  ceoName: string;
  ceoTitle: string;
  ceoMessage: string;
  ceoImage: string;
  primaryPhone: string;
  directPhone: string;
  whatsappNumber: string;
  whatsappLink: string;
  supportEmail: string;
  infoEmail: string;
  officeAddress: string;
  socialLinks: {
    facebook: string;
    instagram: string;
  };
  stats: {
    experienceYears: string;
    happyTravelers: string;
    toursSuccess: string;
    positiveReviewsPercent: string;
    awardsWinning: string;
  };
  logos: {
    header: string;
    footer: string;
    favicon: string;
  };
}

export interface HomePageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  guarantees: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface AboutPageContent {
  bannerBadge: string;
  bannerTitle: string;
  bannerSubtitle: string;
  storyTitle: string;
  storyContent: string;
}

export interface WhyUsPageContent {
  bannerBadge: string;
  bannerTitle: string;
  bannerSubtitle: string;
  fleetIntro: string;
}

export interface SitePagesContent {
  home: HomePageContent;
  about: AboutPageContent;
  whyUs: WhyUsPageContent;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  stay?: string;
}

export interface TourDeparture {
  id: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  status: "Available" | "Filling Fast" | "Sold Out";
}

export interface TourItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: "Pakistan Tour" | "International Tour" | "Honeymoon Package";
  isDomestic: boolean;
  destination: string;
  durationDays: number;
  durationNights: number;
  featured: boolean;
  status: "published" | "draft" | "archived";
  maxGuests: number;
  minAge: string;
  pricing: {
    currency: "PKR";
    basePrice: number;
    discountPrice?: number;
    priceNote?: string;
  };
  itineraryPdfUrl?: string;
  images: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  departures: TourDeparture[];
  faqs?: Array<{ question: string; answer: string }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingRequest {
  id: string;
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  departureDate: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  numberOfTravelers: number;
  estimatedTotalPKR: number;
  specialRequests?: string;
  status: "pending" | "contacted" | "confirmed" | "cancelled";
  internalNotes?: Array<{
    text: string;
    author: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export interface CustomTourRequest {
  id: string;
  tourType: "Pakistan Tour" | "International Tour" | "Honeymoon Package";
  location: string;
  numberOfTravelers: number;
  numberOfDays: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  description: string;
  status: "new" | "quoted" | "confirmed" | "closed";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface PastTourItem {
  id: string;
  title: string;
  destination: string;
  summary: string;
  videoUrls?: string[];
  images?: string[];
  date: string;
}
