# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mastering Backend is a learning platform for backend development. It's a Next.js 15 application with React 19 using the App Router, featuring courses, bootcamps, projects, roadmaps, mock interviews, and gamification (XP, badges, leaderboards).

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

Bundle analysis: Set `ANALYZE=true` before build.

## Architecture

### State Management

Two Zustand stores handle state:

- **`store/auth.ts`**: Authentication state (`useAuth`) - login, register, logout, token management via `mb_token` cookie
- **`lib/store.ts`**: Application data (`useAppStore`) - courses, projects, bootcamps, user data, API calls

The `lib/data.ts` file defines TypeScript interfaces (User, Course, Bootcamp, etc.) and a `dataStore` object for local caching. `lib/localDB.ts` provides localStorage persistence.

### API Layer

- **`lib/api.ts`**: Axios instance with base URL from `NEXT_PUBLIC_API_URL`, auto-redirects to login on 401/403
- **`lib/auth.ts`**: Auth-specific API calls (login, register, verify email, password reset)
- **`lib/courses.ts`**: Course-related API calls

### Authentication Flow

- Middleware (`middleware.ts`) protects all routes except `/auth/*` and `/xpayment`
- Token stored in both `mb_token` cookie and localStorage
- Unauthenticated users redirect to `/auth/login` with return URL

### Component Organization

- **`components/ui/`**: shadcn/ui primitives (Button, Dialog, Card, etc.) - uses Radix UI
- **`components/pages/`**: Full page components (course-detail, bootcamp-dashboard, etc.)
- **`components/`**: Shared components (dashboard-layout, navigation-bar, etc.)

### Routing Structure

App Router pages in `app/`:
- `/auth/*` - Login, register, verify, password reset
- `/courses/*` - Course listing and detail
- `/bootcamps/*` - Bootcamp programs
- `/projects/*` - Hands-on projects
- `/roadmaps/*` - Learning roadmaps
- `/mock-interviews/*` - AI mock interviews (uses LiveKit for real-time video)
- `/profile`, `/settings`, `/leaderboard` - User features

### Key Technologies

- **UI**: Tailwind CSS with CSS variables for theming (dark mode via next-themes)
- **Components**: shadcn/ui (configured in `components.json`)
- **Forms**: react-hook-form + zod validation
- **Video**: Vimeo player, LiveKit for real-time
- **Code Editor**: Monaco Editor
- **Notifications**: Sonner for toasts

### Path Aliases

Configured in `tsconfig.json`:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`
- `@/store` → `store/`

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://localhost:8081/api/v3`)
- `NEXT_PUBLIC_WEBHOOK_URL` - WebSocket/code execution server
