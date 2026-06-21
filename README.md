# HojiiLink Ethiopia - Freelance Marketplace Platform

A high-performance, bilingual (English & Afaan Oromo) Freelance Marketplace Platform similar to Upwork and Fiverr, fully optimized for Ethiopian and international talent.

---

## STEP 1: Complete System & Directory Architecture

Below is the complete monorepo layout mapping the frontend client, backend APIs, services, and shared entities.

```
hojiilink-ethiopia/
├── backend/                  # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── controllers/      # API Handlers for Jobs, Proposals, Payments
│   │   │   ├── jobController.ts
│   │   │   ├── proposalController.ts
│   │   │   ├── walletController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/       # Auth verification, Rate limiter, Error catcher
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/           # DB schema types & request payload validation
│   │   │   ├── types.ts
│   │   │   └── validators.ts
│   │   ├── routes/           # Express API Router allocations
│   │   │   ├── jobs.ts
│   │   │   ├── proposals.ts
│   │   │   ├── payments.ts
│   │   │   └── users.ts
│   │   ├── services/         # Integration helpers
│   │   │   ├── chapaService.ts      # Chapa Payment Integration API (Telebirr/CBE)
│   │   │   └── geminiService.ts     # Google Gemini API AI translation & matching
│   │   └── server.ts         # Backend Express Entry Point
│   ├── tsconfig.json
│   └── package.json
├── frontend/                 # React + Vite + TypeScript Client
│   ├── src/
│   │   ├── components/       # Premium Glassmorphism UI & Visual layout wrappers
│   │   │   ├── GlassCard.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── JobCard.tsx
│   │   │   └── proposalModal.tsx
│   │   ├── context/          # Translation & Global user session state
│   │   │   ├── LanguageContext.tsx
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/            # React Query triggers for seamless server sync
│   │   │   ├── useJobs.ts
│   │   │   ├── useProposals.ts
│   │   │   └── usePayments.ts
│   │   ├── pages/            # View allocations
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   └── Profile.tsx
│   │   ├── styles/           # Styling config and global rules
│   │   │   └── index.css
│   │   ├── App.tsx           # Client Main App wrapper
│   │   └── main.tsx          # Client Entry Point
│   ├── tsconfig.json
│   └── package.json
├── database/                 # Database schema structures
│   └── schema.sql            # Complete Supabase PostgreSQL table & policy script
└── README.md
```

### Architectural Separations & Data Flow
1. **Presentation Layer (React SPA)**: Submits state management workloads through React Query hooks, accessing caching mechanisms, language contexts, and localized texts instantly.
2. **Communication Gateways**: The frontend initiates calls using localized request headers towards the REST API inside the Node.js context.
3. **API Logic Controller (backend)**: Intercepts incoming connections, applies JSON Web Token authentication parsing, validates parameters using high-standard sanitizations, and distributes workloads into the specialized services.
4. **Third-Party Service Adaptors**:
   - **Chapa Gateway Service**: Integrates Telebirr, Commercial Bank of Ethiopia (CBE), and local wallets through secure, background webhook handling.
   - **Gemini AI service**: Processes description translations, performs freelancer skill matching, and recommends optimized search strings.
5. **Durable Database Layer (PostgreSQL & Supabase)**: Retains states under high safety indices via strict Row Level Security (RLS) policies.

---

## STEP 2: Database Design

The schema design utilizes robust tables, foreign keys, triggers, indexes, and full bilingual (English / Afaan Oromo) column entries to support native searching and localization.

### Features
1. **Bilingual Structures**: Dual-language support on all content fields (`title_en` / `title_om`, `bio_en` / `bio_om`, `description_en` / `description_om`) ensures instant and seamless user interfaces without resorting to runtime client-side translation latencies.
2. **Supabase Auth Hook Trigger (`handle_new_user`)**: Listens to registrations within `auth.users` on the identity engine and copies matching details automatically to the public profile representation with strict metadata validations.
3. **Escrow Contracts and Milestones**: Enables full milestone tracking with a secure step release workflow on funds, preventing client-freelancer dispute loopholes.
4. **Row Level Security (RLS)**: Protects all financial and personal documents. Freelancers can access their own bidding histories, and only associated clients can examine specific work structures.

### File Reference
The complete production-ready SQL script database file can be located and audited within:
`/database/schema.sql`
