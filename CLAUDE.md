# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to /dist
npm run lint      # ESLint (flat config)
npm run preview   # Preview production build locally
```

## Architecture

Personal portfolio site built with **React 19 + Vite 7 + Tailwind CSS v4**. Single-page app with client-side routing via React Router DOM. All components use JSX (no TypeScript).

### Routing

`src/App.jsx` defines all routes. The main portfolio renders at `/`. Several honeypot routes (`/sitemap-hidden.xml`, `/admin-login`, `/wp-admin`, `/api/internal/config`) exist to trap bots — these are intentional and should not be removed.

### Analytics & Bot Detection

The analytics system tracks visits via Supabase and detects bots through multiple layers:

1. **`src/hooks/useAnalytics.js`** — Main hook used in the Portfolio component. Creates an invisible honeypot input, detects bots (user agent patterns, WebDriver flag, PhantomJS/Nightmare markers), and inserts visit records into Supabase.
2. **`src/utils/userAgentParser.js`** — Parses user agents for bot identification and extracts browser/OS/device info.
3. **`src/components/Honeypot.jsx`** — Route handler for bot trap URLs. Logs trap visits to Supabase.
4. **`src/components/HiddenFormHoneypot.jsx`** — Hidden form field honeypot component.
5. **`src/components/AnalyticsDashboard.jsx`** — Real-time dashboard using Supabase postgres_changes subscription.

### Supabase Integration

- Client initialized in `src/lib/supabase.js` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars.
- Primary table: `visits` — stores page visits with bot detection metadata (browser, os, device, bot_name, trap_type).
- Schema and migration in `supabase-migration.sql` with setup guide in `MIGRATION_INSTRUCTIONS.md`.

### Key UI Libraries

- **Framer Motion** for animations throughout all components
- **Lucide React** for icons
- Tailwind handles all styling; no CSS modules or styled-components

## Environment Variables

Requires `.env` with Vite-prefixed variables (accessed via `import.meta.env`):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
