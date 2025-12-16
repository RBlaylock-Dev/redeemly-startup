## Legal & Nonprofit Requirements (Tennessee)

- Governing law: State of Tennessee
- Legal pages must be accessible from footer on all pages
- Donation Policy page must be included if donations are enabled
- No storage of payment card data on application servers
- Maintain moderation logs for safety and nonprofit accountability


# Agent Instructions

## Repo Standards
- Use conventional commits
- Include README setup steps
- Include environment variable template: `.env.example`
- Use linting + formatting (ESLint + Prettier)
- Include basic seed data scripts for local testing

## Code Standards
- TypeScript strict
- Server actions/API routes for writes
- No secrets committed
- Content sanitization on all UGC fields

## Security
- Role-based admin routes
- Report abuse prevention
- Rate limits
- Storage upload restrictions
