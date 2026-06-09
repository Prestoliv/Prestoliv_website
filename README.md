# Prestoliv Marketing Website

Public marketing site for [prestoliv.com](https://www.prestoliv.com) — home construction and interior design in Hyderabad. Built as a React SPA with Supabase for leads, dynamic settings, and Google OAuth.

**Production:** https://www.prestoliv.com  
**Customer dashboard (separate app):** https://dashboard.prestoliv.com  
**Repository:** https://github.com/Prestoliv/Prestoliv_website

---

## What this repo does

| Feature | Description |
|---------|-------------|
| Marketing pages | Home, services, process, about, cost calculator |
| Lead capture | “Book a consultation” form → Supabase `contact_us` |
| Cost calculator | Package tiers and estimates from Supabase (with code fallbacks) |
| Google login | OAuth via Supabase → opens customer dashboard |
| Analytics | GTM, GA4, Meta Pixel, Microsoft Clarity |
| Dynamic settings | Contact/WhatsApp numbers and calculator copy from Supabase |

There is **no custom backend** in this repo. The browser talks to Supabase directly using the anon key (RLS must be configured in Supabase).

---

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **React Router** — client-side routing
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Supabase** — auth, PostgreSQL reads/writes
- **TanStack React Query** — cached settings fetch
- **Framer Motion** — animations
- **Vitest** — unit tests

---

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm
- Supabase project access (for env vars and DB)
- GitHub write access to `Prestoliv/Prestoliv_website` (for push)

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/Prestoliv/Prestoliv_website.git
cd Prestoliv_website

# 2. Install dependencies
npm install

# 3. Environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (required)
# Add analytics IDs for local tracking tests (optional)

# 4. Run dev server
npm run dev
```

Dev server runs at **http://localhost:8080** (or the next free port if 8080 is taken).

---

## Environment variables

Copy `.env.example` → `.env`. All client vars use the `VITE_` prefix.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | **Yes** | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | **Yes** | Supabase anon (public) key |
| `VITE_DASHBOARD_URL` | No | Dashboard origin (default: `https://dashboard.prestoliv.com`) |
| `VITE_GTM_ID` | Prod | Google Tag Manager container |
| `VITE_GA_MEASUREMENT_ID` | No | Leave **empty** when GTM is set |
| `VITE_META_PIXEL_ID` | Prod | Meta Pixel ID |
| `VITE_CLARITY_PROJECT_ID` | Prod | Microsoft Clarity project ID |

**Production checklist (Vercel or similar):**

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_DASHBOARD_URL=https://dashboard.prestoliv.com
VITE_GTM_ID=GTM-W5G7H4GP
VITE_META_PIXEL_ID=4461774897440224
VITE_CLARITY_PROJECT_ID=wz5rob2h5u
VITE_GA_MEASUREMENT_ID=          # leave empty — GA4 via GTM
```

Redeploy after changing env vars.

---

## NPM scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (single run) |
| `npm run test:watch` | Vitest watch mode |
| `npm run gtm:generate` | Regenerate GTM import JSON after analytics changes |

---

## Project structure

```
src/
├── main.tsx                 # Entry: HelmetProvider + App
├── App.tsx                  # Router, providers, global shell
├── pages/                   # One component per route
├── components/
│   ├── site/                # Marketing sections (Hero, Navbar, Faq, …)
│   ├── calculator/          # Cost calculator widget
│   ├── ui/                  # shadcn/ui primitives
│   ├── ConsultationDialog.tsx   # Lead form modal
│   ├── AnalyticsProvider.tsx
│   └── ContactSettingsProvider.tsx
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── auth.ts              # OAuth helpers
│   ├── contactSettings.ts   # WhatsApp / phone settings
│   ├── calculatorConfig.ts  # Calculator packages + settings
│   ├── dashboard.ts         # Dashboard URL builder
│   ├── analytics/           # Event dispatcher, GTM dataLayer
│   └── seo/                   # Per-route titles and meta
├── hooks/                   # Scroll tracking, toast, mobile
supabase/
└── seed-contact-settings.sql  # Example seed for app_settings
docs/                        # Architecture, analytics, marketing guides
gtm/                         # GTM import JSON + tag catalog
scripts/                     # GTM generator
```

**Convention:** UI in `components/` is mostly presentational. Data fetching and business logic live in `src/lib/` and providers.

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/process` | Our process |
| `/services` | Services hub |
| `/services/residential` | Residential |
| `/services/commercial` | Commercial |
| `/services/interiors` | Interior design |
| `/calculator` | Construction cost calculator |
| `/about` | About |
| `/auth/callback` | Google OAuth return |
| `*` | 404 |

Routes are defined in `src/App.tsx`. SEO metadata per route: `src/lib/seo/pageTitles.ts`.

---

## Supabase (data layer)

The site uses three main tables (schema inferred from code; full DDL is in Supabase, not this repo).

### `app_settings` (key / value JSONB)

| Key | Purpose |
|-----|---------|
| `contact_settings` | WhatsApp number, phone, `whatsapp_enabled` |
| `calculator_settings` | Calculator copy, defaults, enable/disable |

Seed example: `supabase/seed-contact-settings.sql`

### `calculator_packages`

Construction tiers: `id`, `label`, `price_per_sqft`, `badge`, `highlight`, `enabled`, `sort_order`, etc.  
Reader: `src/lib/calculatorConfig.ts`

### `contact_us`

Lead form inserts: `name`, `phone`, `email`, `city`, `service`, `other_service`.  
Writer: `src/components/ConsultationDialog.tsx`

### Auth

Google OAuth via `supabase.auth.signInWithOAuth`. On success, opens  
`{VITE_DASHBOARD_URL}/at/profile?uid={userId}`.

**Verify in Supabase:** RLS must allow anon `SELECT` on settings tables and `INSERT` on `contact_us`.

---

## Analytics

- Implementation: `src/lib/analytics/`
- Route wrapper: `src/components/AnalyticsProvider.tsx`
- Event catalog (code): `src/lib/analytics/events.ts` → `ANALYTICS_EVENT_CATALOG`
- Developer reference: [`docs/ANALYTICS.md`](docs/ANALYTICS.md)
- Marketing guide: [`docs/MARKETING_AND_GROWTH_TEAM_GUIDE.md`](docs/MARKETING_AND_GROWTH_TEAM_GUIDE.md)

**Adding a new tracked event:**

1. Add event name in `src/lib/analytics/events.ts`
2. Add `trackXxx()` in `src/lib/analytics/core.ts`
3. Call it from the component
4. Run `npm run gtm:generate`
5. Import `gtm/prestoliv-analytics-import.json` in GTM → Publish  
   Steps: [`gtm/IMPORT.txt`](gtm/IMPORT.txt)

When `VITE_GTM_ID` is set, GA4 loads **only through GTM** (do not set `VITE_GA_MEASUREMENT_ID`).

---

## Deployment

Typical flow (Vercel or similar static host):

1. Connect repo `Prestoliv/Prestoliv_website`
2. Set all `VITE_*` env vars for Production
3. Build command: `npm run build`
4. Output directory: `dist`
5. Publish GTM container after analytics changes

---

## Documentation index

| Document | Audience | Contents |
|----------|----------|----------|
| **This README** | Developers | Setup, structure, env, scripts |
| [`docs/ARCHITECTURE_AND_SCHEMA.md`](docs/ARCHITECTURE_AND_SCHEMA.md) | Dev + stakeholders | Full architecture, schema, flows, diagrams |
| [`docs/ANALYTICS.md`](docs/ANALYTICS.md) | Developers / analytics | Event names, GTM triggers, GA4/Meta mappings |
| [`docs/MARKETING_AND_GROWTH_TEAM_GUIDE.md`](docs/MARKETING_AND_GROWTH_TEAM_GUIDE.md) | Marketing | Plain-language tracking and campaign guide |
| [`gtm/TAG_CATALOG.md`](gtm/TAG_CATALOG.md) | GTM admin | Named GA4 tags list |

---

## Known gaps (for onboarding)

| Item | Notes |
|------|-------|
| `AuthHashHandler` | Exists but **not mounted** in `App.tsx`; root `/#access_token` OAuth may not complete |
| WhatsApp URL | Sticky button uses a hardcoded URL; `buildWhatsAppUrl()` in `contactSettings.ts` is not wired |
| DB migrations | Not in repo; manage schema in Supabase dashboard |
| Meta CAPI | Not implemented; browser pixel only |

Details: [`docs/ARCHITECTURE_AND_SCHEMA.md` §11](docs/ARCHITECTURE_AND_SCHEMA.md#11-known-gaps--unknowns)

---

## Git / access

Push requires **write access** to `Prestoliv/Prestoliv_website`. If you see:

```
Permission denied to <your-github-user>
```

- Log in with an authorized account: `gh auth login`
- Or ask a Prestoliv org admin to grant **Write** on the repo
- Or fork and open a pull request

Check permissions:

```bash
gh auth status
gh api repos/Prestoliv/Prestoliv_website --jq .permissions
```

---

## Support

- **Architecture / schema questions:** `docs/ARCHITECTURE_AND_SCHEMA.md`
- **Analytics / GTM:** `docs/ANALYTICS.md`, `gtm/IMPORT.txt`
- **Supabase data changes:** SQL Editor or admin dashboard for `app_settings` / `calculator_packages`

---

## License

Private — Prestoliv. All rights reserved.
