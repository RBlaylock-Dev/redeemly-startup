# Redeemly – Agency Build Packet (Handoff)

## 1) Summary
Redeemly is a Christ-centered online community platform where users can:
- Create accounts and profiles
- Participate in a community feed (posts/comments/reactions)
- Join groups and discuss together
- Browse/save Bible studies and resources
- Look up Bible verses and save/share them
- Use strong safety features (reporting, blocking, moderation queue)

This build must prioritize privacy, safety, and respectful community standards.

---

## 2) Deliverables Required (MVP)
### A. Production-ready Web App (Next.js + TS + Tailwind)
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Component system (preferred: shadcn/ui)

### B. Core Features
1. **Auth**
   - Sign up / sign in
   - Email verification (or equivalent security)
   - Password reset

2. **Profiles**
   - Create/edit profile (display name, avatar, bio, optional testimony)
   - Privacy controls
   - Public-in-community profile page

3. **Community Feed**
   - Create post
   - View posts
   - Comment
   - Reactions (Amen / Prayed / Encouraged)
   - Edit/delete own posts/comments (optional for MVP, preferred)

4. **Groups**
   - Group directory
   - Join/leave group
   - Group-specific feed

5. **Resources**
   - Resource library (browse/filter/search basic)
   - Bookmark resources
   - Admin upload/approve flow (or admin-only uploads for MVP)

6. **Scripture**
   - Verse lookup by reference
   - Save verse to profile
   - Share verse into a post

7. **Safety & Moderation**
   - Report content (post/comment/profile)
   - Block user
   - Admin moderation dashboard:
     - Reports list
     - View report details
     - Actions: remove content, warn, suspend/ban user
     - Log moderation actions

---

## 3) Non-Functional Requirements
- Security-first: server-side writes, input validation, content sanitization
- Strong authorization: RLS or equivalent access controls
- Rate limiting on posts/comments/reports
- Safe file uploads (restricted MIME types, size limits)
- Observability: error monitoring (Sentry or equivalent) + basic logs

---

## 4) Data Model Guidance
Use the data model in:
- `/docs/04-data-model.md`

Minimum tables for MVP:
- users, profiles, user_roles
- posts, comments, reactions
- groups, group_members
- resources, resource_bookmarks
- saved_verses
- reports, blocks, moderation_actions

---

## 5) Policies to Implement
The following docs must be reflected in-app:
- Privacy Policy: `/docs/09-privacy-policy.md`
- Terms of Service: `/docs/10-terms-of-service.md`
- Community Guidelines: `/docs/05-community-guidelines.md`

The platform must provide:
- Links to Privacy/Terms in footer
- Report/block controls
- Enforcement workflows in admin

---

## 6) Wireframes / UX
Wireframes are located in:
- `/docs/07-wireframes.md`

Agency is responsible for translating these into a clean, modern UI.
Priority: clarity, warmth, calm design, and simple navigation.

---

## 7) Suggested Project Phases & Timeline
**Phase 0 (1–2 weeks):** Setup, auth, core pages, design system  
**Phase 1 (4–6 weeks):** MVP features build  
**Phase 2 (1–2 weeks):** QA, security review, launch prep  

---

## 8) Acceptance Criteria (MVP Definition of Done)
MVP is complete when:
- Users can sign up, create profiles, and participate in feed/groups
- Resources and scripture features work end-to-end
- Report/block + admin moderation works end-to-end
- Policies pages are accessible and included in footer
- App is deployed to a production environment and documented
- Codebase is documented with README and setup instructions

---

## 9) What the Agency Must Provide Back
- Git repo with full source code
- Deployment instructions
- Admin credentials setup guide
- Database schema/migrations
- Basic QA checklist + test accounts
- Short training walkthrough for admin/mod tools

---

## 10) Open Decisions (Agency to Recommend)
- Auth provider (Clerk vs Supabase Auth vs Auth.js)
- Scripture API & translation licensing
- Hosting (Vercel vs other)
- Moderation workflow depth for MVP (minimal vs robust)
