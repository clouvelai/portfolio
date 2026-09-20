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

### Key UI Libraries

- **Framer Motion** for animations throughout all components
- **Lucide React** for icons
- Tailwind handles all styling; no CSS modules or styled-components
