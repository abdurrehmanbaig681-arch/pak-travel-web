import { SiteSettings, TourItem, PastTourItem, SitePagesContent } from "../types";

export const initialSiteSettings: SiteSettings = {
  companyName: "Pak Travel and Tours",
  shortName: "Pak Travel",
  tagline: "Great opportunity for adventure & travels",
  ceoName: "Mian Mohsin Ali",
  ceoTitle: "CEO of Pak Travel & Tours",
  ceoMessage:
    "As CEO of Pak Travel & Tours, our goal is simple: to give you the best travel experiences possible. We're here to show you the amazing sights of Pakistan and beyond. Whether you want to explore historical sites, go on exciting adventures, or just relax on beautiful beaches, we've got you covered. With us, you can expect top-notch service and unforgettable memories. Let's make your travel dreams come true together!",
  ceoImage: "https://paktravel.com.pk/wp-content/uploads/2024/03/CEO-PAK-TRAVEL-TOURS.png",
  primaryPhone: "0322-1114666",
  directPhone: "0300 8330577",
  whatsappNumber: "923221114666",
  whatsappLink: "http://wa.link/k8gm6x",
  supportEmail: "contact@paktravel.com.pk",
  infoEmail: "info@paktravel.com.pk",
  officeAddress: "61 T Block Lalik Jan Chowk DHA Phase 2, Lahore , Pakistan",
  socialLinks: {
    facebook: "https://www.facebook.com/paktravel.pk?mibextid=ZbWKwL",
    instagram: "https://www.instagram.com/paktravels.pk?igsh=djU0bTdleWd4anV3",
  },
  stats: {
    experienceYears: "12+",
    happyTravelers: "3500+",
    toursSuccess: "1650+",
    positiveReviewsPercent: "99.5%",
    awardsWinning: "62k+",
  },
  logos: {
    header: "https://paktravel.com.pk/wp-content/uploads/2022/12/WhatsApp_Image_2024-03-07_at_9.12.56_AM-removebg-preview.png",
    footer: "https://paktravel.com.pk/wp-content/uploads/2023/01/Untitled-design-1.png",
    favicon: "https://paktravel.com.pk/wp-content/uploads/2022/12/WhatsApp_Image_2024-03-07_at_9.12.56_AM-removebg-preview-175x175.png",
  },
};

export const initialSitePagesContent: SitePagesContent = {
  home: {
    heroBadge: "Discover Northern Pakistan & Beyond",
    heroTitle: "Discover The Real Adventure",
    heroSubtitle:
      "Experience extraordinary mountain expeditions, curated family escapes, and bespoke international holidays with Pakistan's most trusted travel partner.",
    guarantees: [
      "Safety First Always",
      "Low Price & Friendly",
      "Trusted Local Guides",
    ],
    ctaTitle: "Ready To Explore Pakistan's Crown Jewels?",
    ctaSubtitle:
      "From the high peaks of Skardu & Hunza to luxury escapes in Southeast Asia, our travel consultants will curate your dream journey.",
    ctaButtonText: "Plan My Custom Tour",
  },
  about: {
    bannerBadge: "12+ Years Of Trusted Travel",
    bannerTitle: "About Pak Travel & Tours",
    bannerSubtitle:
      "Pioneering premium guided journeys, mountain safaris, and family tours across Pakistan and international horizons.",
    storyTitle: "Pakistan's Premier Travel Experience",
    storyContent:
      "Pak Travel and Tours was founded on a simple yet profound vision: to open up the breathtaking wilderness and cultural heritage of Pakistan to the world while delivering unparalleled safety, luxury, and authentic hospitality.\n\nOver the past 12+ years, we have guided more than 3,500 travelers across the rugged Karakoram, Himalayan, and Hindu Kush mountain ranges. Headquartered in DHA Phase 2 Lahore, our fleet of luxury vehicles and veteran mountain drivers ensure peace of mind on every mile.",
  },
  whyUs: {
    bannerBadge: "Why Choose Us",
    bannerTitle: "Engineered For Safety, Built For Comfort",
    bannerSubtitle: "Discover what sets Pak Travel and Tours apart as Lahore's leading travel agency.",
    fleetIntro:
      "We operate our own dedicated fleet of modern, meticulously maintained vehicles driven by licensed mountain chauffeurs.",
  },
};

export const initialTours: TourItem[] = [
  {
    id: "skardu-air-5-days",
    slug: "tour-to-skardu-by-air-5-days",
    title: "Tour to Skardu by Air – 5 Days",
    summary:
      "Discover the unparalleled beauty of Skardu with return air tickets, luxury stays at Shangrila & Baltistan Resort, Deosai Plains, Kala Pani, and Serena Shigar Fort.",
    description:
      "Discover the unparalleled beauty of Skardu with our exclusive 5-day tour package, meticulously crafted to offer you an unforgettable experience from start to finish.\n\nUpon your arrival at Skardu Airport, be greeted by our dedicated local representative. Explore Sok Valley, Upper & Lower Kachura Lakes, Shangrila Resort, Deosai National Park, Satpara Lake, Sarfranga Cold Desert, and the historic Serena Shigar Fort. Complete with luxury transport, seasoned guide, and delicious meals.",
    category: "Pakistan Tour",
    isDomestic: true,
    destination: "Skardu",
    durationDays: 5,
    durationNights: 4,
    featured: true,
    status: "published",
    maxGuests: 15,
    minAge: "13+",
    pricing: {
      currency: "PKR",
      basePrice: 125000,
      discountPrice: 115000,
      priceNote: "Per person on twin sharing (inclusive of return flights)",
    },
    itineraryPdfUrl: "https://paktravel.com.pk/wp-content/uploads/2026/05/Skardu-by-Air-4-Nights-5-days.pdf",
    images: [
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/01/Skardu-Tour-Booking-image-600x540.png", caption: "Skardu Valley", order: 1 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/01/Kala-Pani.jpg", caption: "Kala Pani", order: 2 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/01/DeoSai-Top.jpg", caption: "Deosai Top", order: 3 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/01/Shangrila-Resort.jpg", caption: "Shangrila Resort", order: 4 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Neelam-Valley.png", caption: "Upper Kachura", order: 5 },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Skardu & Sok Valley",
        description: "Reception of Guest at Skardu Airport by our local representative. Drive towards Sok Valley (30 mins). Visit Shangrila Resort, Upper Kachura Lake, and Lower Kachura Lake. Check-in Baltistan Resort or similar. Dinner in hotel & Night stay.",
        meals: ["Dinner"],
        stay: "Baltistan Resort / Similar",
      },
      {
        day: 2,
        title: "Deosai Plains & Satpara Lake",
        description: "Breakfast in Hotel. Drive towards Deosai Top (The Land of Giants). Visit Kala Pani, Bara Pani, and pristine Satpara Lake. Dinner in Hotel & Night stay.",
        meals: ["Breakfast", "Dinner"],
        stay: "Baltistan Resort / Similar",
      },
      {
        day: 3,
        title: "Sarfranga Cold Desert & Shigar Fort",
        description: "Visit Sarfranga Cold Desert. Explore historic Shigar Valley and the iconic Serena Shigar Fort. Experience high-altitude dunes and riverside views. Dinner in Hotel & Night stay.",
        meals: ["Breakfast", "Dinner"],
        stay: "Baltistan Resort / Serena Shigar",
      },
      {
        day: 4,
        title: "Budda Rocks & Kharphocho Fort",
        description: "Visit ancient Budda Rocks and hike to Kharphocho Fort overlooking Skardu city and the Indus river. Cultural city tour and local dry fruit market. Dinner in Hotel & Night stay.",
        meals: ["Breakfast", "Dinner"],
        stay: "Baltistan Resort / Similar",
      },
      {
        day: 5,
        title: "Departure from Skardu Airport",
        description: "Breakfast in hotel. Timely drop-off at Skardu International Airport for flight back to Islamabad/Lahore. Tour concludes with fond memories.",
        meals: ["Breakfast"],
      },
    ],
    inclusions: [
      "Return domestic air tickets (Islamabad/Lahore to Skardu)",
      "4 Nights accommodation in deluxe hotels",
      "Daily breakfast and executive dinners",
      "Dedicated 4x4 Prado / Grand Cabin with fuel & driver",
      "Services of professional local expedition guide",
      "All toll taxes, parking fees, and permits",
    ],
    exclusions: [
      "Personal shopping and laundry expenses",
      "Lunch meals & extra beverages",
      "Entry tickets to forts or amusement parks",
      "Emergency evacuation expenses",
    ],
    departures: [
      { id: "dep-sk-1", date: "Every Friday (Weekly)", totalSeats: 15, availableSeats: 6, status: "Filling Fast" },
      { id: "dep-sk-2", date: "15th November 2026", totalSeats: 15, availableSeats: 8, status: "Available" },
      { id: "dep-sk-3", date: "22nd November 2026", totalSeats: 15, availableSeats: 3, status: "Filling Fast" },
    ],
  },
  {
    id: "thai-malay-singapore",
    slug: "thailand-malaysia-singapore",
    title: "Thailand / Malaysia / Singapore – 10 Days",
    summary:
      "Triple-country international holiday covering Bangkok temples, Pattaya beaches, Safari World, Sentosa Island, Universal Studios, and Kuala Lumpur Petronas Towers.",
    description:
      "Embark on an unforgettable Southeast Asian adventure covering three vibrant nations. Experience the electric culture of Bangkok, the coastal energy of Pattaya, the futuristic metropolis of Singapore with Sentosa Island & Universal Studios, and the cultural richness of Kuala Lumpur, Malaysia.",
    category: "International Tour",
    isDomestic: false,
    destination: "Thailand, Malaysia & Singapore",
    durationDays: 10,
    durationNights: 9,
    featured: true,
    status: "published",
    maxGuests: 20,
    minAge: "All Ages",
    pricing: {
      currency: "PKR",
      basePrice: 340000,
      discountPrice: 325000,
      priceNote: "Per person on twin sharing (ex-Pakistan)",
    },
    images: [
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/02/Thai-Malayasia-600x540.jpg", caption: "Thailand Malaysia Singapore", order: 1 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/02/Banghkok.jpg", caption: "Bangkok", order: 2 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/02/Singapore.jpg", caption: "Singapore Marina", order: 3 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/02/Universal-Studio.jpg", caption: "Universal Studios", order: 4 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2023/02/Kola-Lampur.jpg", caption: "Kuala Lumpur", order: 5 },
    ],
    itinerary: [
      { day: 1, title: "Arrival Bangkok & Pattaya Transfer", description: "Meet at Suvarnabhumi Airport. Transfer to luxury Pattaya beach resort. Evening Alcazar Show." },
      { day: 2, title: "Coral Island Speedboat Tour", description: "Speedboat excursion to Coral Island with water sports and beachfront lunch." },
      { day: 3, title: "Bangkok City & Safari World", description: "Transfer to Bangkok. Full day Safari World and Marine Park with animal shows." },
      { day: 4, title: "Bangkok Temples & Shopping", description: "Wat Arun, Grand Palace, and vibrant shopping at CentralWorld / MBK." },
      { day: 5, title: "Flight to Singapore", description: "Arrival in Singapore. Evening Gardens by the Bay light and sound show." },
      { day: 6, title: "Universal Studios & Sentosa", description: "Full day pass to Universal Studios Singapore and Sentosa Cable Car." },
      { day: 7, title: "Singapore City Tour & Bus to KL", description: "Merlion Park, Marina Bay Sands SkyPark, followed by scenic executive coach to Kuala Lumpur." },
      { day: 8, title: "Kuala Lumpur City & Petronas Towers", description: "Petronas Twin Towers visit, Batu Caves, and King's Palace." },
      { day: 9, title: "Genting Highlands Day Trip", description: "Cable car ride to Genting Highlands indoor theme park and premium shopping outlet." },
      { day: 10, title: "Departure to Pakistan", description: "Souvenir shopping at Bukit Bintang and transfer to KLIA for flight home." },
    ],
    inclusions: [
      "All international and regional flights & transfers",
      "9 Nights 4-star hotel stays with daily breakfast",
      "Universal Studios Singapore pass",
      "Visa facilitation and approval support",
      "Airport pick-and-drop throughout all cities",
    ],
    exclusions: ["Visa embassy fees", "Personal shopping & lunch/dinner"],
    departures: [
      { id: "dep-tms-1", date: "10th November 2026", totalSeats: 20, availableSeats: 5, status: "Filling Fast" },
      { id: "dep-tms-2", date: "24th November 2026", totalSeats: 20, availableSeats: 12, status: "Available" },
    ],
  },
  {
    id: "hunza-valley-7-days",
    slug: "hunza-valley-autumn-7-days",
    title: "Hunza Valley & Fairy Meadows – 7 Days",
    summary:
      "Journey along the Karakoram Highway to Karimabad, Attabad Lake, Passu Cones, Hussaini Suspension Bridge, and the reflection pools of Fairy Meadows.",
    description:
      "Experience northern Pakistan's most legendary alpine valley. Witness golden autumn foliage or crystal-clear summer waters, historic Baltit and Altit Forts, and the world-renowned Karakoram peaks.",
    category: "Pakistan Tour",
    isDomestic: true,
    destination: "Hunza Valley",
    durationDays: 7,
    durationNights: 6,
    featured: true,
    status: "published",
    maxGuests: 18,
    minAge: "8+",
    pricing: {
      currency: "PKR",
      basePrice: 68000,
      discountPrice: 62000,
      priceNote: "Per person (ex-Islamabad / Lahore)",
    },
    images: [
      { url: "https://paktravel.com.pk/wp-content/uploads/2024/04/river-surrounded-by-rocks-covered-greenery-snow-cloudy-sky-scaled.jpg", caption: "Hunza Karakoram", order: 1 },
      { url: "https://paktravel.com.pk/wp-content/uploads/2024/04/Neelam-Valley.png", caption: "Northern Valley", order: 2 },
    ],
    itinerary: [
      { day: 1, title: "Lahore/Islamabad to Chilas", description: "Departure early morning via Hazara Motorway and Babusar Pass / KKH. Night stay in Chilas." },
      { day: 2, title: "Chilas to Karimabad, Hunza", description: "Rakaposhi viewpoint, junction point of three mountain ranges. Arrive in Karimabad." },
      { day: 3, title: "Baltit Fort, Altit Fort & Eagles Nest", description: "Heritage fort tour and panoramic sunset from Duikar / Eagles Nest." },
      { day: 4, title: "Attabad Lake, Passu Cones & Khunjerab", description: "Boating on Attabad Lake, crossing Hussaini Bridge, and excursion towards Khunjerab Pass." },
      { day: 5, title: "Hunza to Raikot & Fairy Meadows", description: "Drive to Raikot Bridge, 4x4 jeep trek to Tattu, hike to Fairy Meadows with Nanga Parbat view." },
      { day: 6, title: "Fairy Meadows to Besham / Naran", description: "Morning photography at Fairy Meadows, descent to Raikot, and drive towards Naran / Besham." },
      { day: 7, title: "Return to Islamabad & Lahore", description: "Scenic return drive back to Islamabad and Lahore. Tour ends." },
    ],
    inclusions: ["Coaster / Grand Cabin transport with fuel & tolls", "6 Nights hotel stays", "Breakfast & Dinner", "Professional guide"],
    exclusions: ["Jeep charges to Fairy Meadows", "Lunch & snacks"],
    departures: [
      { id: "dep-hnz-1", date: "Every Friday", totalSeats: 18, availableSeats: 4, status: "Filling Fast" },
    ],
  },
];

export const initialPastTours: PastTourItem[] = [
  {
    id: "skardu-orya-maqbool-jan",
    title: 'Skardu Expedition with "Orya Maqbool Jan"',
    destination: "Skardu, Gilgit-Baltistan",
    summary:
      "Exclusive celebrity group expedition to Skardu, Shangrila Resort, and Deosai Top, capturing scenic mountain vistas, local culture, and memorable fellowship.",
    videoUrls: [
      "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-2.mp4",
      "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-3.mp4",
      "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-4.mp4",
      "https://paktravel.com.pk/wp-content/uploads/2024/04/Skardu-5.mp4",
    ],
    date: "Summer 2024",
  },
  {
    id: "ayubia-gali-escapes",
    title: "Ayubia Gali & Northern Nature Tours",
    destination: "Galyat, Khyber Pakhtunkhwa",
    summary:
      "Lush pine forests, chairlift adventures, and cool mountain trails enjoyed by family and corporate travel groups.",
    videoUrls: [
      "https://paktravel.com.pk/wp-content/uploads/2024/03/VID-20240316-WA0023.mp4",
      "https://paktravel.com.pk/wp-content/uploads/2024/03/VID-20240316-WA0022.mp4",
    ],
    date: "Spring 2024",
  },
];
