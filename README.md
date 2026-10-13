# Pak Travel and Tours (Official Rebuild & Redesign)

A modern, production-ready, custom-built travel and tours platform with a full-featured admin management dashboard for **Pak Travel and Tours** (Lahore, Pakistan).

Designed and engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Vanilla CSS**, and **Firebase** (Cloud Firestore, Authentication, and Storage), deployable as a single unified Vercel project.

---

## 🏔️ Brand & Business Continuity

This project strictly preserves all authentic business credentials and identity from [paktravel.com.pk](https://paktravel.com.pk/):

- **Company Name**: Pak Travel and Tours (Pak Travel)
- **Executive Leadership**: Mian Mohsin Ali (CEO)
- **Helpline Phones**: `0322-1114666`, `0300 8330577`
- **WhatsApp Direct**: `+92 322 1114666` (with contextual pre-filled tour inquiry messages)
- **Official Emails**: `contact@paktravel.com.pk`, `info@paktravel.com.pk`
- **Headquarters Address**: `61 T Block Lalik Jan Chowk DHA Phase 2, Lahore, Pakistan`
- **Track Record**: 12+ Years Experience, 3,500+ Happy Travelers, 1,650+ Successful Tours, 99.5% Positive Reviews
- **Color Palette**: 
  - Primary Green: `#63AB45` (Pak Travel Green)
  - Secondary Amber: `#F7921E` (Warm Adventure Accent)
  - Dark Charcoal: `#1C231F` / `#0F172A`
  - Mint Surface: `#F4F8F5`

---

## 🚀 Key Features

### 1. Public Travel Platform
- **Modern Hero Experience**: Destination search, duration selector, and tour category tabs (Pakistan Tours, International Packages, Honeymoon Specials).
- **Tour Catalog (`/tours`)**: Multi-facet filter engine (Domestic vs International, duration, real-time PKR budget slider, and search).
- **Tour Detail Pages (`/tours/[slug]`)**:
  - Interactive photo gallery with thumbnail selector.
  - Interactive day-by-day accordion itinerary.
  - Inclusions & Exclusions comparison breakdown.
  - PDF itinerary download button.
  - Instant seat reservation form with dynamic PKR pricing calculator.
  - One-click WhatsApp direct enquiry link with tour title pre-filled.
- **Custom Tour Request Builder (`/custom-tours`)**: Interactive multi-step form matching the official Pak Travel Gravity Forms specifications.
- **Past Tours & Expeditions (`/past-tours`)**: Verified past celebrity expedition portfolio (e.g. *Skardu Tour with Orya Maqbool Jan*) and YouTube video tours.
- **Why Us & Fleet Overview (`/why-us`)**: Coaster Saloon, Toyota Prado, Grand Cabin fleet gallery and 24/7 road safety protocols.
- **Leadership Profile (`/about-us`)**: Verified CEO statement and company history.
- **Lahore Headquarters Contact (`/contact`)**: DHA Phase 2 Lahore office map, working hours, phones, and direct message inbox.
- **Floating WhatsApp Button**: Global floating button with instant WhatsApp chat trigger.

### 2. Admin Management Dashboard (`/admin`)
- **KPI Metrics Overview**: Total tours, pending bookings, custom leads, unread inquiries, and active staff.
- **Tours Manager (`/admin/tours`)**: Add, edit, preview, and toggle draft/publish status of tours.
- **Tour Creator / Editor (`/admin/tours/new` & `/admin/tours/[id]`)**: Full multi-day itinerary builder, departure schedules, pricing in PKR, and image gallery.
- **Bookings & Leads Management (`/admin/bookings`)**: Real-time status updating (`Pending` → `Contacted` → `Confirmed` → `Cancelled`), internal staff communication notes, and CSV export.
- **Custom Tour Pipeline (`/admin/custom-requests`)**: Dedicated funnel for bespoke vacation itineraries.
- **Site CMS Settings (`/admin/settings`)**: Live editor for company phones, WhatsApp number, Lahore address, CEO message, and trust badges.
- **Staff & RBAC Permissions (`/admin/staff`)**: Role-Based Access Control (`Admin` vs `Staff`).
- **One-Click Firestore Sync**: Single button to seed/sync initial tour packages and settings into Firebase Firestore.

---

## 🛠️ Technology Architecture

```
                      +-----------------------------+
                      |       Next.js 16 App        |
                      |   (Vercel Edge / Node.js)   |
                      +--------------+--------------+
                                     |
               +---------------------+---------------------+
               |                                           |
               v                                           v
    +----------------------+                    +----------------------+
    |    Public Frontend   |                    |   Admin Dashboard    |
    |  - SSR / Static ISR  |                    |  - Client Components |
    |  - Vanilla CSS       |                    |  - RBAC Auth State   |
    |  - SEO & Meta Tags   |                    |  - CMS & Lead Inbox  |
    +----------+-----------+                    +----------+-----------+
               |                                           |
               +---------------------+---------------------+
                                     |
                                     v
                 +---------------------------------------+
                 |       Firebase Managed Backend        |
                 |  - Cloud Firestore (DB)               |
                 |  - Firebase Auth (Admin Security)     |
                 |  - Firebase Storage (Media & PDFs)    |
                 +---------------------------------------+
```

### Server Route Handlers
- `POST /api/bookings`: Validates and writes booking inquiries.
- `POST /api/custom-tours`: Validates and records custom tour requests.
- `POST /api/contact`: Validates and logs Lahore office inquiries.

### SEO & 301 Redirects
All legacy URLs from the existing WordPress/Elementor site are permanently redirected in `next.config.ts`:
- `/tours-sidebar-filter` → `/tours` (301 Permanent)
- `/tours-page` → `/tours` (301 Permanent)
- `/my-account` → `/admin/login` (301 Permanent)
- `/login` → `/admin/login` (301 Permanent)

---

## 📦 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the project root:

```env
# Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDjyeX0ZSgN0vFCL0rinwZQxamSMGBzHXI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paktravel123-615b0.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paktravel123-615b0
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paktravel123-615b0.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=551470508809
NEXT_PUBLIC_FIREBASE_APP_ID=1:551470508809:web:23f1da08d4e16e0272c1d8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TF7HL2XSDL

# Firebase Admin SDK (Optional Server Credentials for privileged Route Handlers)
# FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@paktravel123-615b0.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Admin Portal Access
Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
Quick demo buttons are provided on the login page for **Admin** (`admin@paktravel.com.pk`) and **Staff** (`staff@paktravel.com.pk`).

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), import the repository.
3. Add the environment variables from `.env.local` under **Settings > Environment Variables**.
4. Click **Deploy**. Vercel will automatically build the Next.js App Router project and provision edge caching.

---

## 🔒 Security & Firestore Rules
Firebase security rules (`firestore.rules` and `storage.rules`) are provided in the repository root:
- Public visitors can read published tours and submit booking inquiries.
- Only authenticated users with `admin` or `staff` credentials can read or mutate internal booking leads and site settings.
