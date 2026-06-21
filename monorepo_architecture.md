# HojiiLink Ethiopia - Monorepo Production Architecture

This document blueprints the production-grade, enterprise-ready Monorepo Architecture for **HojiiLink Ethiopia** to support highly secure local escrow operations, bilingual routing, and global client transactions.

## Directory Tree

```text
hojiilink-ethiopia/
├──.env.example                  # Consolidated global secrets manifest
├──.gitignore                    # Clean artifacts and dependency filter
├──README.md                    # System architecture guide
├──monorepo_architecture.md      # This detailed monorepo tree diagram
├──package.json                 # Unified tooling and execution scripts
├──tsconfig.json                # Strict TypeScript options configuration
├──vite.config.ts               # Bundler settings & proxy middlewares
│
├──database/
│   └── schema.sql              # Supabase Postgres tables, RLS & triggers
│
├──src/                         # Unified fullstack workspace
│   ├── main.tsx                # Frontend setup and loading core
│   ├── App.tsx                 # Hash router + master application state
│   ├── index.css               # Tailored global styles using Tailwind v4
│   │
│   ├── components/             # Reusable UX elements
│   │   ├── Navbar.tsx          # Dual-language dynamic navigation & Auth status
│   │   └── JobCard.tsx         # Comprehensive job info display with badge details
│   │
│   ├── context/                # Global State Providers
│   │   ├── AuthContext.tsx     # Session simulation + profile caching
│   │   └── LanguageContext.tsx # Dynamic English ↔ Afaan Oromo live state
│   │
│   ├── pages/                  # Dynamic Full-Screen Views
│   │   ├── Home.tsx            # High-conversion luxury home landing layout
│   │   ├── Marketplace.tsx     # Real-time job board, search, filter and apply
│   │   └── CreateJob.tsx       # Dual-lang job creation form with AI assist preview
│   │
│   ├── services/               # Integrations & API Clients
│   │   ├── chapa.service.ts    # CBE/Telebirr escrow transaction handler
│   │   └── gemini.service.ts   # Node/Express Google Gemini translation proxy
│   │
│   └── server.ts               # Custom Express server mounting Vite in dev
```

---

## Technical Flow Overview

```text
                     +----------------------------------+
                     |         React Client             |
                     |  (Bilingual EN/OM Framework)     |
                     +----------------^-----------------+
                                      |
                       API Request / Secure Actions
                                      |
                     +----------------v------------------+
                     |         Express Server            |
                     |     (Node/TS API Proxy - Port 3000|
                     +-------^--------------------^------+
                             |                    |
                 Chapa API Payments      Google Gemini APIs
                 (CBE, Telebirr)         (Dynamic Translation)
                             |                    |
                     +-------v--------------------v------+
                     |               Supabase            |
                     |         PostgreSQL Database       |
                     |       (RLS and Row Security)      |
                     +-----------------------------------+
```

1. **Client Tier**: Fully responsive, single-page client running on Vite. It manages global state via React Context for active sessions (`AuthContext`) and local translation toggles (`LanguageContext`).
2. **Server (Express) Tier**: Encapsulates secret credentials like `GEMINI_API_KEY` and the `CHAPA_SECRET_KEY` on the container, exposing secure, audited `/api/*` endpoints rather than transmitting private developer keys to the browser.
3. **Database Tier**: Relies on a highly robust Supabase back-end with pre-configured RLS policies ensuring clients only view their candidates/contracts, and freelancers can only manipulate their personal listings.
