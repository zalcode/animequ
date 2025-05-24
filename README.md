# Animequ

Animequ is a modern web application for browsing, searching, and discovering anime, powered by the AniList GraphQL API. Built with Next.js, React, TypeScript, and Tailwind CSS, it provides a fast, responsive, and visually appealing interface for anime fans.

## Features
- Browse trending, popular, and seasonal anime
- View detailed information for each anime, including description, genres, tags, staff, and characters
- Watch trailers (if available)
- Filter anime by genre
- Bookmark your favorite anime (stored locally)
- Responsive and mobile-friendly UI

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 3. Code Generation (optional)
If you update the GraphQL schema or queries, run:

```bash
npm run codegen
```

## Project Structure
- `src/app/` — Next.js app directory (routing, pages)
- `src/components/` — UI components (atoms, molecules, organisms)
- `src/gql/` — GraphQL queries, fragments, and generated types
- `src/services/` — API service functions (AniList integration)
- `public/` — Static assets

## Linting & Formatting
- Run `npm run lint` to check for code style issues.
- Prettier and ESLint are configured for consistent code style.

## Deployment
Deploy easily to [Vercel](https://vercel.com/) or any platform supporting Next.js.

## License
This project is for educational and personal use. Not affiliated with AniList.
