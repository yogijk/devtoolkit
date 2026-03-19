# DevToolkit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal developer toolkit knowledge base with tool explanations, project starter templates, learning roadmap, and trending tools feed.

**Architecture:** Next.js 14 App Router with static JSON content files. No database — all tool/template/learning content stored as JSON in `/content/`. GitHub Search API for trending feed via API route with 24h cache. Deployed on Vercel.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Vercel

**Spec:** `docs/superpowers/specs/2026-03-19-devtoolkit-design.md`

---

## File Structure

```
app/
├── layout.tsx                    # Root layout with nav bar
├── page.tsx                      # Home page — 4 section overview
├── globals.css                   # Tailwind imports + base styles
├── toolkit/
│   ├── page.tsx                  # Tool grid with search/filter
│   └── [slug]/
│       └── page.tsx              # Individual tool detail
├── starter/
│   └── page.tsx                  # Project type picker → tool recommendations
├── learn/
│   └── page.tsx                  # Learning roadmap with checkboxes
├── feed/
│   └── page.tsx                  # Trending tools feed
├── api/
│   └── trending/
│       └── route.ts              # GitHub Search API proxy with cache
└── not-found.tsx                 # 404 page

components/
├── Navbar.tsx                    # Top navigation bar
├── ToolCard.tsx                  # Tool card component (used in grid)
├── ToolkitGrid.tsx               # Client wrapper for search/filter state
├── CategoryFilter.tsx            # Category filter pills
├── SearchBar.tsx                 # Search input
├── LevelCard.tsx                 # Learning level accordion
├── ProjectTypeCard.tsx           # Project starter card
└── TrendingRepoCard.tsx          # Trending repo card

content/
├── tools/
│   ├── nextjs.json
│   ├── react.json
│   ├── tailwindcss.json
│   ├── nodejs.json
│   ├── nextauth.json
│   ├── postgresql.json
│   ├── prisma.json
│   ├── vercel.json
│   ├── railway.json
│   ├── vscode.json
│   ├── github.json
│   ├── npm.json
│   ├── claude-code.json
│   ├── obsidian.json
│   └── typescript.json
├── starters/
│   ├── client-web-app.json
│   ├── static-website.json
│   └── internal-tool.json
└── learning-path.json

lib/
├── tools.ts                      # Load & filter tool JSON files
├── starters.ts                   # Load starter template JSON files
├── learning.ts                   # Load learning path JSON
└── types.ts                      # TypeScript type definitions
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/not-found.tsx`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

If the directory is not empty, say yes to proceed.

- [ ] **Step 2: Verify the app runs**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run dev
```

Open `http://localhost:3000` — should see the Next.js default page.
Kill the dev server after confirming.

- [ ] **Step 3: Clean up default content**

Replace `app/page.tsx` with a minimal home page placeholder:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">DevToolkit</h1>
      <p className="mt-2 text-gray-600">Your personal developer knowledge base</p>
    </main>
  );
}
```

- [ ] **Step 4: Add not-found page**

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Go home
      </Link>
    </main>
  );
}
```

- [ ] **Step 5: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind CSS"
```

---

## Task 2: Type Definitions & Data Loaders

**Files:**
- Create: `lib/types.ts`, `lib/tools.ts`, `lib/starters.ts`, `lib/learning.ts`

- [ ] **Step 1: Create type definitions**

Create `lib/types.ts`:

```ts
export interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  icon: string; // emoji character
  analogy: string;
  whatItDoes: string;
  whyYouUseIt: string;
  alternatives: string[];
  whenToSwap: string;
  learnMore: string;
  level: number;
}

export type ToolCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Deployment"
  | "Dev Tools"
  | "Productivity";

export interface StarterTemplate {
  slug: string;
  type: string;
  description: string;
  tools: string[]; // tool slugs
  why: string;
}

export interface LearningLevel {
  level: number;
  title: string;
  status: "completed" | "current" | "upcoming";
  description: string;
  topics: LearningTopic[];
}

export interface LearningTopic {
  name: string;
  explanation: string;
  resources: Resource[];
  challenge: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "video" | "docs" | "tutorial";
}

export interface TrendingRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
}
```

- [ ] **Step 2: Create tools data loader**

Create `lib/tools.ts`:

```ts
import fs from "fs";
import path from "path";
import { Tool, ToolCategory } from "./types";

const toolsDir = path.join(process.cwd(), "content", "tools");

export function getAllTools(): Tool[] {
  if (!fs.existsSync(toolsDir)) return [];
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(toolsDir, file), "utf-8");
    return JSON.parse(raw) as Tool;
  });
}

export function getToolBySlug(slug: string): Tool | undefined {
  const filePath = path.join(toolsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Tool;
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return getAllTools().filter((t) => t.category === category);
}

export function getCategories(): ToolCategory[] {
  const tools = getAllTools();
  return [...new Set(tools.map((t) => t.category))];
}
```

- [ ] **Step 3: Create starters data loader**

Create `lib/starters.ts`:

```ts
import fs from "fs";
import path from "path";
import { StarterTemplate } from "./types";

const startersDir = path.join(process.cwd(), "content", "starters");

export function getAllStarters(): StarterTemplate[] {
  if (!fs.existsSync(startersDir)) return [];
  const files = fs.readdirSync(startersDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(startersDir, file), "utf-8");
    return JSON.parse(raw) as StarterTemplate;
  });
}
```

- [ ] **Step 4: Create learning path data loader**

Create `lib/learning.ts`:

```ts
import fs from "fs";
import path from "path";
import { LearningLevel } from "./types";

const learningPath = path.join(
  process.cwd(),
  "content",
  "learning-path.json"
);

export function getLearningPath(): LearningLevel[] {
  if (!fs.existsSync(learningPath)) return [];
  const raw = fs.readFileSync(learningPath, "utf-8");
  return JSON.parse(raw) as LearningLevel[];
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npx tsc --noEmit
```

Expected: No type errors (may warn about no content files yet — that's fine).

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add lib/
git commit -m "feat: add type definitions and data loaders for tools, starters, learning path"
```

---

## Task 3: Content — Tool JSON Files

**Files:**
- Create: All 15 files in `content/tools/`

- [ ] **Step 1: Create content directories**

```bash
cd ~/Desktop/claude\ code/DevToolkit
mkdir -p content/tools content/starters
```

- [ ] **Step 2: Create all 15 tool JSON files**

Create each file in `content/tools/`. Every file follows this structure:

```json
{
  "slug": "<tool-slug>",
  "name": "<Tool Name>",
  "category": "<Category>",
  "icon": "<emoji>",  // Use emoji per category: Frontend ⚛️, Backend 🖥️, Database 🗄️, Deployment 🚀, Dev Tools 🔧, Productivity 📝
  "analogy": "<Real-world analogy>",
  "whatItDoes": "<Plain English explanation>",
  "whyYouUseIt": "<Why Jithin specifically uses this>",
  "alternatives": ["<alt1>", "<alt2>"],
  "whenToSwap": "<When to use something else>",
  "learnMore": "<Official docs URL>",
  "level": <1-5>
}
```

**Files to create (all in `content/tools/`):**

1. `nextjs.json` — Frontend, "Like a kitchen that comes with an oven, stove, and fridge built in — instead of buying each separately", level 2
2. `react.json` — Frontend, "Like LEGO blocks for websites — you build small pieces and snap them together", level 2
3. `tailwindcss.json` — Frontend, "Like a box of labeled paint colors — instead of mixing your own, you pick from ready-made options", level 2
4. `typescript.json` — Frontend, "Like spell-check for code — it catches mistakes before you run the program", level 2
5. `nodejs.json` — Backend, "Like an engine that lets JavaScript run outside the browser — on servers, your laptop, anywhere", level 2
6. `nextauth.json` — Backend, "Like a security guard for your app — handles login, logout, and who can see what", level 3
7. `postgresql.json` — Database, "Like a giant organized spreadsheet that can handle millions of rows and multiple users at once", level 3
8. `prisma.json` — Database, "Like a translator between your code and the database — you write JavaScript, it writes SQL", level 3
9. `vercel.json` — Deployment, "Like a postal service for websites — you give it your code, it puts it on the internet", level 2
10. `railway.json` — Deployment, "Like renting a computer in the cloud that runs your database 24/7", level 3
11. `vscode.json` — Dev Tools, "Like a carpenter's workbench — where you write, edit, and organize all your code", level 1
12. `github.json` — Dev Tools, "Like Google Drive for code — stores every version, lets you undo mistakes, and share with others", level 1
13. `npm.json` — Dev Tools, "Like an app store for code — other developers share useful tools you can install with one command", level 2
14. `claude-code.json` — Dev Tools, "Like having a senior developer sitting next to you — you describe what you want, it writes the code", level 2
15. `obsidian.json` — Productivity, "Like a personal wiki — your notes link together so you can connect ideas", level 1

Each file must have complete, helpful content in `whatItDoes`, `whyYouUseIt`, `alternatives`, `whenToSwap`, and `learnMore` fields. Write them from Jithin's perspective — why *he* uses this tool for *his* projects.

- [ ] **Step 3: Verify all files parse correctly**

```bash
cd ~/Desktop/claude\ code/DevToolkit
for f in content/tools/*.json; do node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" && echo "$f OK"; done
```

Expected: All 15 files print OK.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add content/tools/
git commit -m "feat: add 15 tool content files with descriptions and analogies"
```

---

## Task 4: Content — Starter Templates & Learning Path

**Files:**
- Create: `content/starters/client-web-app.json`, `content/starters/static-website.json`, `content/starters/internal-tool.json`, `content/learning-path.json`

- [ ] **Step 1: Create 3 starter template files**

`content/starters/client-web-app.json`:
```json
{
  "slug": "client-web-app",
  "type": "Client Web App",
  "description": "A full website with user login, database, and hosting — like SafetyIQ. Best for Upwork clients who need a professional web application.",
  "tools": ["nextjs", "typescript", "tailwindcss", "nextauth", "postgresql", "prisma", "vercel", "railway", "github"],
  "why": "This is your proven stack. You built SafetyIQ with it, you know how the pieces fit together, and it handles real production traffic."
}
```

`content/starters/static-website.json`:
```json
{
  "slug": "static-website",
  "type": "Static Website",
  "description": "A portfolio, landing page, or informational site — no login, no database. Just content that looks great on any device.",
  "tools": ["nextjs", "typescript", "tailwindcss", "vercel", "github"],
  "why": "Same framework but simpler. No backend complexity — just pages and styling. Fastest to build and cheapest to host (free on Vercel)."
}
```

`content/starters/internal-tool.json`:
```json
{
  "slug": "internal-tool",
  "type": "Internal Tool",
  "description": "A company dashboard or data viewer for internal use — like an HSE records viewer for Team Inc. May or may not need login.",
  "tools": ["nextjs", "typescript", "tailwindcss", "postgresql", "prisma", "vercel", "railway", "github"],
  "why": "Similar to Client Web App but scoped for internal users. You can skip polished UI and focus on functionality. Auth is optional if it's behind a company VPN."
}
```

- [ ] **Step 2: Create learning path JSON**

Create `content/learning-path.json` with all 5 levels. Each level has `level`, `title`, `status`, `description`, and `topics` array. Each topic has `name`, `explanation`, `resources` (array of `{title, url, type}`), and `challenge`.

Include real, working URLs for resources:
- Level 1: freeCodeCamp HTML/CSS, MDN Web Docs
- Level 2: Next.js docs, Tailwind docs, GitHub guides
- Level 3: MDN Fetch API, PostgreSQL tutorial, NextAuth docs
- Level 4: "How to read docs" articles, debugging guides
- Level 5: Jest docs, web.dev performance, OWASP basics

- [ ] **Step 3: Verify all files parse correctly**

```bash
cd ~/Desktop/claude\ code/DevToolkit
for f in content/starters/*.json content/learning-path.json; do node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" && echo "$f OK"; done
```

Expected: All 4 files print OK.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add content/
git commit -m "feat: add starter templates and learning path content"
```

---

## Task 5: Navbar & Layout

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Navbar component**

Create `components/Navbar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/toolkit", label: "My Toolkit" },
  { href: "/starter", label: "Project Starter" },
  { href: "/learn", label: "Learning Path" },
  { href: "/feed", label: "What's New" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DevToolkit
          </Link>
          <div className="flex gap-1 sm:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Update root layout**

Update `app/layout.tsx` to include the Navbar:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevToolkit",
  description: "Your personal developer knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add components/Navbar.tsx app/layout.tsx
git commit -m "feat: add navigation bar and update root layout"
```

---

## Task 6: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the home page**

Replace `app/page.tsx`:

```tsx
import Link from "next/link";

const sections = [
  {
    title: "My Toolkit",
    description: "Every tool you use — explained in plain English with real-world analogies.",
    href: "/toolkit",
    icon: "🧰",
  },
  {
    title: "Project Starter",
    description: "Pick a project type and see exactly which tools you need and why.",
    href: "/starter",
    icon: "🚀",
  },
  {
    title: "Learning Path",
    description: "A step-by-step roadmap from where you are now to full independence.",
    href: "/learn",
    icon: "📚",
  },
  {
    title: "What's New",
    description: "Trending developer tools from this week — stay updated automatically.",
    href: "/feed",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">DevToolkit</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal guide to developer tools — understand what you use,
          discover what&apos;s new.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 bg-white border rounded-xl hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{section.icon}</span>
            <h2 className="mt-3 text-xl font-semibold text-gray-900">
              {section.title}
            </h2>
            <p className="mt-2 text-gray-600">{section.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/page.tsx
git commit -m "feat: add home page with section overview cards"
```

---

## Task 7: Toolkit Page — Grid with Search & Filter

**Files:**
- Create: `app/toolkit/page.tsx`, `components/ToolkitGrid.tsx`, `components/ToolCard.tsx`, `components/CategoryFilter.tsx`, `components/SearchBar.tsx`

- [ ] **Step 1: Create ToolCard component**

Create `components/ToolCard.tsx` — displays a tool's name, category badge, analogy, and links to `/toolkit/[slug]`. Use a card layout with white background, border, rounded corners, hover shadow.

- [ ] **Step 2: Create CategoryFilter component**

Create `components/CategoryFilter.tsx` — horizontal row of pill buttons, one per category plus "All". Clicking a pill filters the grid. Uses client-side state.

- [ ] **Step 3: Create SearchBar component**

Create `components/SearchBar.tsx` — text input that filters tools by name or analogy. Client-side filtering.

- [ ] **Step 4: Create ToolkitGrid client wrapper**

Create `components/ToolkitGrid.tsx` — a `"use client"` component that:
- Receives `tools: Tool[]` and `categories: ToolCategory[]` as props
- Manages `searchQuery` and `activeCategory` state
- Filters tools by search (matches name or analogy) and category
- Renders SearchBar, CategoryFilter, and the grid of ToolCards
- Shows a count: "Showing X of Y tools"

- [ ] **Step 5: Create toolkit page**

Create `app/toolkit/page.tsx`:
- Server component that loads all tools via `getAllTools()` and `getCategories()`
- Passes data to `<ToolkitGrid tools={tools} categories={categories} />`

- [ ] **Step 6: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 7: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/toolkit/page.tsx components/ToolkitGrid.tsx components/ToolCard.tsx components/CategoryFilter.tsx components/SearchBar.tsx
git commit -m "feat: add toolkit page with tool cards, search, and category filter"
```

---

## Task 8: Toolkit Detail Page

**Files:**
- Create: `app/toolkit/[slug]/page.tsx`

- [ ] **Step 1: Create tool detail page**

Create `app/toolkit/[slug]/page.tsx`:
- Server component that loads the tool by slug via `getToolBySlug()`
- If tool not found, call `notFound()` from `next/navigation`
- Display all tool fields in a clean layout:
  - Name + category badge at top
  - "Think of it as..." section with the analogy
  - "What it does" section
  - "Why you use it" section
  - "Alternatives" section — list each alternative
  - "When to switch" section
  - "Learn more" — link to official docs
  - Back link to `/toolkit`
- Generate static params via `generateStaticParams()` using `getAllTools()`

- [ ] **Step 2: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

Expected: Build succeeds, all tool pages generated statically.

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/toolkit/\[slug\]/page.tsx
git commit -m "feat: add individual tool detail page with full descriptions"
```

---

## Task 9: Project Starter Page

**Files:**
- Create: `app/starter/page.tsx`, `components/ProjectTypeCard.tsx`

- [ ] **Step 1: Create ProjectTypeCard component**

Create `components/ProjectTypeCard.tsx` — displays a starter template with:
- Project type name
- Description
- List of recommended tools (as linked badges to `/toolkit/[slug]`)
- "Why this stack" explanation

- [ ] **Step 2: Create starter page**

Create `app/starter/page.tsx`:
- Server component that loads all starters via `getAllStarters()` and all tools via `getAllTools()`
- Maps tool slugs in each starter to full tool names for display
- Renders ProjectTypeCard for each starter
- Header: "Project Starter" with subtitle "Pick a project type to see which tools you need"

- [ ] **Step 3: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/starter/page.tsx components/ProjectTypeCard.tsx
git commit -m "feat: add project starter page with tool recommendations"
```

---

## Task 10: Learning Path Page

**Files:**
- Create: `app/learn/page.tsx`, `components/LevelCard.tsx`

- [ ] **Step 1: Create LevelCard component**

Create `components/LevelCard.tsx` — a client component that displays a learning level:
- Level number + title + status badge (completed/current/upcoming)
- Description of why this level matters
- Expandable/collapsible topics list (click to expand)
- Each topic shows: explanation, resources (as links), challenge, checkbox
- Checkbox state stored in localStorage under key `devtoolkit-progress`

- [ ] **Step 2: Create learn page**

Create `app/learn/page.tsx`:
- Server component that loads learning path via `getLearningPath()`
- Passes data to client component that handles localStorage progress
- Renders LevelCard for each level
- Header with progress summary: "Level 2 of 5 — Your Current Stack"

- [ ] **Step 3: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/learn/page.tsx components/LevelCard.tsx
git commit -m "feat: add learning path page with progress tracking"
```

---

## Task 11: Trending Feed — API Route & Page

**Files:**
- Create: `app/api/trending/route.ts`, `app/feed/page.tsx`, `components/TrendingRepoCard.tsx`

- [ ] **Step 1: Create trending API route**

Create `app/api/trending/route.ts`:

```ts
import { NextResponse } from "next/server";
import { TrendingRepo } from "@/lib/types";

export async function GET() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const dateStr = sevenDaysAgo.toISOString().split("T")[0];

  const url = `https://api.github.com/search/repositories?q=created:>${dateStr}+language:javascript+OR+language:typescript&sort=stars&order=desc&per_page=20`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const repos: TrendingRepo[] = data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      full_name: item.full_name,
      description: item.description,
      html_url: item.html_url,
      stargazers_count: item.stargazers_count,
      language: item.language,
      created_at: item.created_at,
    }));

    return NextResponse.json(repos, {
      headers: { "Cache-Control": "public, s-maxage=86400" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending repos" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create TrendingRepoCard component**

Create `components/TrendingRepoCard.tsx` — displays a GitHub repo with:
- Repo name (linked to GitHub)
- Description
- Star count
- Language badge
- "Created X days ago" relative date

- [ ] **Step 3: Create feed page**

Create `app/feed/page.tsx`:
- Client component that fetches from `/api/trending` on mount
- Shows loading state while fetching
- Renders TrendingRepoCard for each repo
- Header: "What's New" with subtitle "Trending developer tools from this week"
- Error state if API fails

- [ ] **Step 4: Test the API route**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run dev &
sleep 3
curl -s http://localhost:3000/api/trending | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const j=JSON.parse(d);console.log(j.length+' repos fetched');console.log(j[0]?.name)"
kill %1
```

Expected: "20 repos fetched" and a repo name.

- [ ] **Step 5: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add app/api/trending/route.ts app/feed/page.tsx components/TrendingRepoCard.tsx
git commit -m "feat: add trending tools feed with GitHub Search API"
```

---

## Task 12: Mobile Responsiveness Polish

**Files:**
- Modify: `components/Navbar.tsx`, all page files as needed

- [ ] **Step 1: Add mobile hamburger menu to Navbar**

Update `components/Navbar.tsx`:
- On small screens (`sm:` breakpoint), collapse nav links into a hamburger menu button
- Clicking the hamburger toggles a dropdown with the nav links stacked vertically
- Use a simple state toggle — no animation library needed

- [ ] **Step 2: Review all pages for mobile layout**

Check each page at 375px width (iPhone SE). Fix any issues:
- Text overflow or horizontal scroll
- Cards stacking properly on mobile
- Touch targets at least 44px
- Proper padding on small screens

- [ ] **Step 3: Verify build passes**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npm run build
```

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add -A
git commit -m "feat: add mobile responsive navigation and layout polish"
```

---

## Task 13: GitHub Repo & Vercel Deployment

**Files:** No code changes — deployment config only.

- [ ] **Step 1: Create GitHub repo**

```bash
cd ~/Desktop/claude\ code/DevToolkit
gh repo create yogijk/devtoolkit --public --source=. --push
```

(Adjust `yogijk` if the GitHub username is different.)

- [ ] **Step 2: Deploy to Vercel**

```bash
cd ~/Desktop/claude\ code/DevToolkit
npx vercel --yes
npx vercel --prod
```

- [ ] **Step 3: Verify live site**

Open the Vercel URL in browser. Check:
- Home page loads
- Toolkit grid shows 15 tools
- Tool detail pages work
- Project starter shows 3 templates
- Learning path renders with checkboxes
- Feed loads trending repos from GitHub

- [ ] **Step 4: Commit Vercel config if generated**

```bash
cd ~/Desktop/claude\ code/DevToolkit
git add -A
git commit -m "chore: add Vercel deployment config"
```

---

## Task 14: Obsidian Notes

**Files:**
- Create: Obsidian vault notes

- [ ] **Step 1: Create DevToolkit overview in Obsidian**

Create `~/Obsidian/WorkHub/100 Projects/DevToolkit/DevToolkit Overview.md`:

```markdown
# DevToolkit

Personal developer knowledge base — understand your tools, pick the right stack, track what's new.

## Links
- **Live:** [Vercel URL]
- **Code:** ~/Desktop/claude code/DevToolkit/
- **GitHub:** https://github.com/yogijk/devtoolkit
- **Spec:** [[Design Spec]]

## Stack
Next.js 14, TypeScript, Tailwind CSS, Vercel

## Sections
1. My Toolkit — 15 tool cards with analogies
2. Project Starter — 3 project type templates
3. Learning Path — 5-level roadmap
4. What's New — GitHub trending feed

## Status
MVP complete
```

- [ ] **Step 2: Update Obsidian dashboard**

Add DevToolkit to the Active Projects table in `~/Obsidian/WorkHub/000 Dashboard/Home.md`.

- [ ] **Step 3: Commit**

No git commit needed — Obsidian files are outside the repo.
