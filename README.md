# DWS Blog (React + Vite)

Mobile-first, pixel-accurate blog using **pure React**, **SCSS**, and **Redux Toolkit (RTK Query)**.
No UI libraries (Tailwind/Material) are used.

## Scripts
- `npm start` — run dev server
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm test` — run unit tests (Vitest + React Testing Library)

## Getting Started
```bash
npm i
npm start
```

App runs at http://localhost:5173

## Tech Decisions
- **Vite** for fast DX.
- **Redux Toolkit + RTK Query** for state, caching, and data fetching.
- **SCSS** (mobile-first) for styling.
- **React Router** for 2 routes: `/` (posts), `/post/:id` (detail).

## API
Base URL: `https://tech-test-backend.dwsbrazil.io/`
- `GET /posts/`
- `GET /posts/{id}`
- `GET /authors/`
- `GET /authors/{id}`
- `GET /categories/`
- `GET /categories/{id}`

## Folder Structure
```text
src/
  app/           # redux store + ui slice
  components/    # layout + cards
  pages/         # PostsPage, PostDetailPage
  services/      # RTK Query endpoints
  styles/        # SCSS
  types/         # TS types
  tests/         # vitest setup + samples
```

## Accessibility
- Landmarks, labels, focusable controls, color contrast friendly.