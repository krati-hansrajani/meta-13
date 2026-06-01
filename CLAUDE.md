# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Serve the production build locally
npm run lint      # ESLint across all source files
```

No test runner is configured yet.

## Architecture

This is a React 19 + Vite single-page application bootstrapped from the Vite template.

**Entry flow:** `index.html` → `src/main.jsx` (createRoot) → `src/App.jsx`

**Styling:** No component library. Styles use CSS custom properties defined in `src/index.css` (global tokens, light/dark mode via `prefers-color-scheme`). Component-scoped styles live alongside components (e.g., `src/App.css`). There is a 1024px responsive breakpoint.

**Static assets:** `public/icons.svg` is an SVG sprite — reference icons with `<use href="/icons.svg#icon-name">`. Images go in `src/assets/` and are imported directly in JSX.

**ESLint** uses the flat config format (`eslint.config.js`) with `react-hooks` and `react-refresh` plugins.
