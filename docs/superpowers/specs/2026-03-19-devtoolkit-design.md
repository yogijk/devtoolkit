# DevToolkit — Design Spec

**Date:** 2026-03-19
**Author:** Jithin + Claude
**Status:** Draft

---

## 1. Overview

DevToolkit is a personal knowledge base website that helps Jithin understand, track, and discover developer tools. It serves as both a learning companion and a reference guide — explaining every tool in plain English with real-world analogies, recommending tools for different project types, providing a structured learning path, and surfacing trending new tools automatically.

### Problem

Jithin's current toolchain (Next.js, Node.js, GitHub, Railway, Obsidian, Vercel) was set up with a friend's help. Without understanding *why* each tool exists and *when* to swap it, he's dependent on external guidance for future projects.

### Solution

A Next.js website with 4 sections:

1. **My Toolkit** — Cards explaining every tool he uses
2. **Project Starter** — Tool recommendations by project type
3. **Learning Path** — Leveled roadmap from current skills to independence
4. **What's New** — Automated feed of trending developer tools

---

## 2. Architecture

| Layer | Purpose | Analogy |
|-------|---------|---------|
| Pages (Next.js App Router) | UI — toolkit cards, learning path, feed | The shop floor |
| Content files (JSON) | Tool descriptions, templates, learning steps | Product catalog |
| API routes (Next.js) | Fetch trending tools from GitHub | Delivery person bringing new stock |
| Vercel | Hosting | Shop address |

### Key Decisions

- **No database** — Content lives as JSON files in the repo. No cost, easy to edit.
- **No auth** — Personal site, no user accounts needed.
- **Mobile-first** — Responsive Tailwind CSS, works on iPhone.
- **Same stack as SafetyIQ** — Next.js 14, TypeScript, Tailwind CSS, Vercel. Reinforces existing knowledge.

---

## 3. Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — overview of all 4 sections |
| `/toolkit` | Grid of tool cards with search/filter by category |
| `/toolkit/[slug]` | Individual tool detail page |
| `/starter` | Pick a project type → see recommended tools |
| `/learn` | Learning roadmap with progress checkboxes |
| `/feed` | Trending tools feed from GitHub |

---

## 4. Data Model

### Tool Card (JSON)

```json
{
  "slug": "railway",
  "name": "Railway",
  "category": "Deployment",
  "icon": "railway.svg",
  "analogy": "Like renting a computer in the cloud that runs your database 24/7",
  "whatItDoes": "Hosts your databases and backend services. You give it your code or database config, and it keeps it running on the internet.",
  "whyYouUseIt": "Easy setup, generous free tier, connects directly to GitHub for auto-deploys. You use it for your PostgreSQL database in SafetyIQ.",
  "alternatives": ["Supabase", "AWS RDS", "PlanetScale"],
  "whenToSwap": "If you need more free database usage, try Supabase. If a client requires AWS, use AWS RDS.",
  "learnMore": "https://docs.railway.com",
  "level": 2
}
```

### Categories

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, NextAuth.js
- **Database:** PostgreSQL, Prisma
- **Deployment:** Vercel, Railway
- **Dev Tools:** VS Code, GitHub, npm, Claude Code
- **Productivity:** Obsidian

### Project Starter Template (JSON)

```json
{
  "slug": "client-web-app",
  "type": "Client Web App",
  "description": "A website with login, database, and hosting — like SafetyIQ",
  "tools": ["nextjs", "postgresql", "tailwindcss", "vercel", "railway", "github"],
  "why": "Proven stack you already know. Good for Upwork clients who need a professional web app."
}
```

### Project Types

- Client Web App (full stack with auth & database)
- Static Website (portfolio, landing page — no database)
- Internal Tool (company dashboard, data viewer)

---

## 5. What's New Feed

### Data Source

- **GitHub Search API** — `GET /search/repositories?q=created:>{7_days_ago}&sort=stars&order=desc&language=javascript,typescript` — returns recently created, high-star repos as a proxy for "trending"
- Fetched via Next.js API route at `/api/trending`
- **Cached for 24 hours** using Next.js revalidation to avoid rate limits (GitHub Search API allows 10 req/min unauthenticated, plenty with caching)
- No official GitHub Trending REST API exists — the Search API is the reliable alternative

### Future Additions

- Product Hunt API (requires API key approval)
- AI-powered weekly summary via Claude API (aligns with SafetyIQ Phase 3)

---

## 6. Learning Path

Organized in 5 levels. User is currently at Level 2-3.

### Level 1 — Foundations (completed)
- HTML, CSS, JavaScript basics
- How the internet works (browser → server → database)

### Level 2 — Your Current Stack (current)
- Next.js pages & routing
- Tailwind CSS for styling
- GitHub for code storage
- Vercel for deployment

### Level 3 — Going Deeper
- APIs — connecting to external services
- Database design — tables, relationships
- Authentication — login systems
- Environment variables & secrets

### Level 4 — Independence
- Reading documentation on your own
- Evaluating new tools (what to look for, red flags)
- Setting up projects from scratch
- Debugging strategies

### Level 5 — Professional
- Testing your code
- Performance optimization
- Security basics
- CI/CD pipelines

Each level includes:
- Short explanation of why it matters
- 2-3 free resources (YouTube, docs, tutorials)
- A small challenge to prove understanding
- Progress checkbox (stored in localStorage — note: progress is per-device and resets if browser data is cleared. A future enhancement could export/import progress as JSON)

---

## 7. MVP Scope

### Included

- All 4 sections fully functional
- ~15 pre-written tool cards
- 3 project starter templates
- 5-level learning path with resource links
- GitHub Trending feed
- Mobile-responsive design
- Deployed on Vercel

### Excluded (future)

- AI-powered recommendations (Claude API)
- Product Hunt feed
- Obsidian sync script
- Dark mode
- User accounts / sharing

---

## 8. Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vercel | Hosting |
| GitHub | Source control |

No database. No external services except GitHub Trending API.

---

## 9. Project Location

- **Code:** `~/Desktop/claude code/DevToolkit/`
- **Obsidian notes:** `~/Obsidian/WorkHub/100 Projects/DevToolkit/`
- **Deployment:** Vercel (free tier)
- **GitHub repo:** To be created
