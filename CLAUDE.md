# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Review Admin System** with two Vite + React + TypeScript applications:

1. **Root project (port 5173)**: Content review management system
2. **Dashboard project (port 5174)**: Data visualization dashboard

Both applications share similar architecture and communicate via SSO (token passed via URL query parameter).

## Commands

### Root Project (5173)
```bash
npm run dev      # Start dev server on port 5173
npm run build    # Build production bundle
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Dashboard Project (5174)
```bash
cd dashboard
npm run dev      # Start dev server on port 5174
npm run build    # Build production bundle
npm run lint     # Run ESLint
```

## Architecture

### State Management (Zustand)
- `src/store/auth.ts` - Authentication state (token, user info, login/logout)
- `src/store/settings.ts` - UI state (sidebar collapsed state)
- Dashboard has identical structure in `dashboard/src/store/auth.ts`

### API Layer
- `src/api/client.ts` - Axios instance with interceptors for JWT token injection
- `src/api/auth.ts` - Auth endpoints (`/auth/login`, `/auth/me`, `/auth/test`)
- `src/api/review.ts` - Review CRUD operations (currently mock data)

### Routing
- `src/router/index.tsx` - React Router with protected routes
- `RequireAuth` component guards routes requiring authentication
- Role-based access control (`reviewer` / `admin`)

### Key Pages
- `/login` - Login page
- `/` - Dashboard home
- `/review/queue` - Review queue list
- `/review/detail/:id` - Review detail view
- `/review/ai-review` - AI conversation review
- `/review/history` - Review history

## Technical Stack

- **Frontend**: React 19, TypeScript 5.8, Vite 7
- **UI**: Ant Design 5
- **Routing**: React Router DOM 7
- **State**: Zustand 5
- **HTTP**: Axios
- **Linting**: ESLint 9 with typescript-eslint

## Backend API Proxy

- Root project proxies `/api` to `http://localhost:8080`
- Dashboard proxies `/api` to `http://localhost:8081`

Configure in `vite.config.ts` server.proxy.

## Single Sign-On (SSO)

Both apps support SSO via URL token parameter (`?token=...`). The `initializeAuth()` function extracts and stores the token from URL on app startup.

Dashboard has a link to navigate to root app with token: `http://localhost:5173/?token={token}`
