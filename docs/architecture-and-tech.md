# Technical Architecture

## Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Component system: shadcn/ui

## Suggested Services
- Auth: Clerk or Supabase Auth
- Database: Postgres
- Storage: Supabase Storage or S3
- Scripture API: Bible API (licensed translation)

## Core Modules
- /app (routes)
- /components (UI)
- /lib (helpers, permissions)
- /db (schema & queries)

## Security Principles
- Server-side writes only
- RLS policies
- Rate limiting
- Content sanitization
