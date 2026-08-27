# 🌾 KrishiSetu (कृषिसेतु)

> **Direct Mandi & Fair Buyer Gateway**  
> *Empowering Indian farmers with assured APMC Mandi procurement, digital token queue passes, protected advance escrow, objective dispute arbitration, and real-time bilingual accessibility.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=for-the-badge&logo=vercel)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📌 Executive Overview

**KrishiSetu** is an end-to-end agritech platform engineered to bridge the trust and efficiency deficit between smallholder farmers, institutional bulk buyers, and state APMC (Agricultural Produce Market Committee) Mandis.

Built as a **modular monolith** optimized for low-latency rural connectivity, KrishiSetu replaces chaotic physical mandi yard lineups with **scheduled digital tokens**, eliminates payment default risk via **30% protected advance escrow**, safeguards farmers with a **fairness-guaranteed Trust & Reputation Engine**, and provides full **English ↔ हिंदी (Hindi)** accessibility.

---

## 🚀 Key Problem Statements & Solutions

| Rural Agricultural Challenge | KrishiSetu Solution |
|---|---|
| **Mandi Gate Congestion & Wastage:** Farmers wait 12–36 hours in tractor lines, causing perishable crop spoilage. | **Digital Slot Booking & Live Queue Telemetry:** Farmers book 2-hour intake windows, receive QR entry passes, and track live weighbridge queue positions from home. |
| **Payment Default & Counterparty Risk:** Commission agents delay payments for weeks; buyers renegotiate after delivery. | **Protected Advance Escrow Engine:** Buyers lock a mandatory 30% advance in escrow before dispatch. The remaining 70% is settled via instant DBT upon weighbridge verification. |
| **Unjustified Quality Deductions:** Bulk buyers arbitrarily claim produce damage or weight shortage at their depots. | **Objective Dispute Arbitration & Weighment Comparator:** Mandi arbitration bench compares certified gate tare slips with depot weighments side-by-side. |
| **Lack of Transparent Credit/Trust Profiles:** Farmers have no portable trading reputation to secure better bids. | **Dynamic Trust & Reputation System:** Algorithmic trust scoring based on verified fulfillments, fair review states, and anti-abuse safeguards. |
| **Language & Digital Literacy Barriers:** Complex enterprise UIs alienate Hindi-speaking rural producers. | **Instant Bilingual Localization:** Real-time English ↔ Hindi switching with persistent localStorage preference and high-contrast, touch-first UI. |

---

## 🌟 Core Feature Modules

### 1. 🎟️ APMC Mandi Procurement & Queue Engine
- **Intake Slot Booking**: Choose commodity, variety, quantity (Quintals), date, and 2-hour intake window across 22+ Haryana districts.
- **Digital Token Passes**: Instant generation of printable, scannable QR passes containing vehicle number, gate assignment, and crop specs.
- **Live Weighbridge Queue Telemetry**: Real-time broadcast showing tokens currently on scale (Gross / Tare / Net kg) and estimated wait times.

### 2. 🏪 Direct Farmer-to-Buyer Marketplace
- **Crop Listings Wizard**: Upload produce pictures, grade certifications, harvest dates, minimum expected price, and bulk stock quantities.
- **Buyer Bid Discovery**: Receive structured counter-bids from verified institutional buyers (e.g., ITC Choupal, AgroStar, FPOs).
- **Price Comparison Matrix**: Compare competing offers against daily Government MSP (Minimum Support Price) benchmarks.

### 3. 💳 Protected Advance Escrow Engine
- **30% Advance Vault**: Locks buyer funds into secure bank escrow prior to farmer harvest transport.
- **Multi-Stage Milestone Tracking**: Immutable audit trail logging `Offer Accepted` → `Escrow Funded` → `Vehicle Dispatched` → `Depot QC Inspection` → `70% DBT Settlement`.
- **Instant DBT Release**: Direct Bank Transfer triggered automatically upon electronic scale sign-off.

### 4. 🛡️ Dynamic Trust & Reputation System
- **Dual Farmer & Buyer Scoring**: Dynamic 0–100 reputation score reflecting verified fulfillment history and dispute conduct.
- **Fairness Protection Rule**: Filing a legitimate dispute **never** triggers algorithmic penalties. Only bad-faith abuse is penalized.
- **Review Over Automatic Bans**: Accounts with dropping scores enter warning/review tiers (`LOW_TRUST_WARNING`, `UNDER_REVIEW`). Only authorized admins can suspend users.
- **Server-Side Event Processing**: Tamper-proof event logs preventing client-side score manipulation.

### 5. 🏛️ Phase 8: Admin Operations Portal (Screens A1 — A7)
- **A1: Macro Operations Dashboard (`/admin`)**: Statewide 5-metric KPI cards, Haryana 22-district switcher, live Mandi status table, and supervisor queues.
- **A2: Mandi Quota & Heatmap (`/admin/procurement`)**: 60-minute window limits, commodity saturation meters, 5-day heatmaps, and emergency quota overrides (+200 Qtl).
- **A3: Weighbridge Command Console (`/admin/queue`)**: Live electronic pit-scale digital indicator readout, Next Farmer loudspeaker buzzer, and high-density queue table.
- **A4: User Registry & KYC (`/admin/users`)**: Segmented tabs (Farmers, Buyers, Pending KYC) with land record verification dossiers (Aadhaar & Jamabandi).
- **A5: Orders & Escrow Ledger (`/admin/orders`)**: Financial ledger, escrow status tracking, and administrative payout overrides.
- **A6: Dispute Mediation & Evidence Comparator (`/admin/disputes`)**: Side-by-side photographic evidence comparator (Mandi Tare slip vs Depot weighment) with wired Trust rulings.
- **A7: SMS Gateway Telemetry (`/admin/sms`)**: 99.82% health telemetry monitor with instant retry buttons for carrier queue dropouts.
- **Trust Scoring Desk (`/admin/trust`)**: Algorithmic scoring audit logs and manual compliance adjustment panel.

### 6. 🌐 Bilingual English & Hindi Localization
- Integrated [`LanguageContext.tsx`](src/context/LanguageContext.tsx) with persistent storage.
- Comprehensive dictionaries in [`translations.ts`](src/lib/translations.ts) covering navigation, badges, crop names, metrics, and workflows.

---

## 🏗️ Technical Architecture

```
KrishiSetu Architecture (Modular Monolith)
│
├── Frontend (Next.js 16 App Router + React 19 + TypeScript)
│   ├── /src/app               → 26 static & dynamic pages (Farmer, Admin, Marketplace, Orders)
│   ├── /src/components/layout → Responsive Navbar, FarmerSidebar, AdminSidebar, MobileNav
│   ├── /src/components/farmer → Dashboard Cards (Procurement, Offers, Status, Listings, Rates)
│   ├── /src/components/ui     → Reusable Design System (Button, Card, Badge, StatCard, Input)
│   └── /src/context           → LanguageContext (EN/HI persistence)
│
├── Core Services & Business Logic (TypeScript)
│   ├── /src/lib/trustService.ts  → Reputation scoring engine, dispute penalties, tier evaluations
│   ├── /src/lib/translations.ts  → Bidirectional English/Hindi localization dictionary
│   └── /src/data/mockData.ts     → Realistic rural agricultural datasets & historical records
│
├── API Layer (Next.js Edge/Node Route Handlers)
│   ├── /api/trust/[userId]       → Real-time trust profile query
│   ├── /api/trust/event          → Server-validated trust calculation & event logging
│   └── /api/admin/trust          → Administrative compliance and audit endpoints
│
└── Database Layer (Prisma ORM + PostgreSQL)
    └── /prisma/schema.prisma     → 8 Core Relational Models (User, APMCCenter, ProcurementSlot,
                                    ProduceListing, BuyerOffer, Order, Dispute, SMSLog)
```

---

## 🗺️ Complete Route Directory (26 Routes)

### Farmer Portal & Trading Engine
* `/` — Farmer Command Dashboard (Active Tokens, Produce Stock, Bids, Mandi Rates)
* `/procurement` — Mandi Directory & Distance Radar
* `/procurement/book` — 2-Hour Window Intake Slot Booking Form
* `/procurement/token/[id]` — Digital QR Token Gate Pass
* `/procurement/queue` — Live Weighbridge Queue Telemetry Tracker
* `/produce` — My Listed Produce Inventory
* `/produce/new` — Multi-Photo Crop Listing Creation Wizard
* `/marketplace` — Direct B2B Wholesale Produce Marketplace
* `/offers` — Buyer Offer Comparison & Counter-Bidding Station
* `/buyer/[id]` — Buyer Verification Profile & Escrow Reliability History
* `/profile` — Farmer Profile & Kisan Credit Credentials
* `/landing` — Public Product Overview & Feature Showcase
* `/login` & `/register` — Authentication & Role Switcher

### Orders & Escrow Milestone Engine
* `/orders` — Active & Historical Orders Overview
* `/orders/[id]` — Order Milestone Overview
* `/orders/[id]/escrow` — 30% Protected Advance Escrow Vault
* `/orders/[id]/dispatch` — Gate Weighment & Vehicle Dispatch Proof Upload
* `/orders/[id]/inspection` — Destination Warehouse Quality & Moisture QC Check
* `/orders/[id]/settlement` — 70% Final Settlement DBT Credit Receipt
* `/orders/[id]/dispute` — Formal Dispute Filing Station

### Admin Operations Portal (Screens A1 — A7)
* `/admin` — A1: Macro Operations Center
* `/admin/procurement` — A2: Mandi Intake Quotas & Capacity Heatmap
* `/admin/queue` — A3: Weighbridge Scale Console & Loudspeaker Caller
* `/admin/users` — A4: User Registry & Land Record KYC Dossiers
* `/admin/orders` — A5: Orders & Escrow Financial Ledger
* `/admin/disputes` — A6: Dispute Mediation & Evidence Comparator
* `/admin/sms` — A7: SMS Gateway Telemetry & Audit Logs
* `/admin/trust` — State Trust & Reputation Desk
* `/trust/[userId]` — Public Verifiable Trust & Reputation Certificate

---

## 💻 Tech Stack Specifications

* **Framework**: [Next.js 16.3.3](https://nextjs.org/) (App Router, Turbopack)
* **Library**: [React 19.0.0](https://react.dev/)
* **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
* **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
* **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) + [Prisma 6.0](https://www.prisma.io/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Design Language**: Custom KrishiSetu Design System (Kisan Green `#1B5E20`, Harvest Amber `#D97706`, Slate neutrals)

---

## ⚡ Quickstart Guide

### 1. Clone the Repository
```bash
git clone https://github.com/dakshsadotra06/KrishiSetu.git
cd KrishiSetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Code Quality

KrishiSetu maintains strict code quality and test coverage:

```bash
# 1. Run ESLint (0 errors, 0 warnings enforced)
npm run lint

# 2. Run Next.js Production Build (Validates all 26 static/dynamic routes)
npm run build

# 3. Run Automated Trust & Reputation Engine Test Suite (8/8 tests passing)
npx tsx scripts/test-trust-system.ts
```

### Test Suite Output Preview:
```text
====================================================
KRISHISETU — DYNAMIC TRUST & REPUTATION TEST SUITE
====================================================
✅ TEST 1 PASSED: Buyer trust score increased by +2 upon successful order.
✅ TEST 2 PASSED: Farmer trust score increased by +2 upon verified delivery.
✅ TEST 3 PASSED: Raising a legitimate dispute caused ZERO trust penalty (Fairness protected).
✅ TEST 4 PASSED: Farmer received -10 penalty for confirmed quality deviation.
✅ TEST 5 PASSED: Abusive dispute filings caused gradual, calibrated deductions (-6, -12).
✅ TEST 6 PASSED: User with a dispute remains Highly Trusted with no adverse tier change.
✅ TEST 7 PASSED: Proper warning/review states assigned without automatic bans.
✅ TEST 8 PASSED: Client cannot pass raw score values; backend enforces server-calculated deltas.
====================================================
TEST RESULTS: 8 / 8 TESTS PASSED (100%)
====================================================
```

---

## 🌾 Design Philosophy & Rural Usability

1. **High Contrast & Sunlight Legibility**: Designed for outdoor mobile screen visibility in direct sunlight.
2. **Generous Touch Targets**: All interactive elements, buttons, and tokens exceed 44px for easy thumb taps on mobile devices.
3. **Bandwidth Resilience**: Critical paths operate with lightweight DOM payloads and graceful degradation over 2G/3G networks.
4. **Bilingual By Default**: Every button, status chip, and alert translates instantly between English and हिंदी without reloading the page.

---

## 👥 Contributors & Credits

Developed with ❤️ for the Indian agricultural ecosystem by second-year engineering students.

* **Daksh Sadotra** — Full-Stack Engineering & System Architecture ([@dakshsadotra06](https://github.com/dakshsadotra06))

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
