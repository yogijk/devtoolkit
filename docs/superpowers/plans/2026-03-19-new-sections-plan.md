# New Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Skills Hub, Agents Guide, and Project Setup sections to the existing DevToolkit app.

**Architecture:** Three new page routes with static JSON content, following identical patterns to existing toolkit/starter pages. New types, loaders, and components. Navbar updated to 7 links with scrollable pill group.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS (existing stack — no new dependencies)

**Spec:** `docs/superpowers/specs/2026-03-19-new-sections-design.md`

---

## File Structure (New Files Only)

```
content/
├── skills/                     # 17 skill JSON files
│   ├── taste.json
│   ├── redesign.json
│   ├── soft-ui.json
│   ├── minimalist.json
│   ├── full-output.json
│   ├── test-driven-development.json
│   ├── verification.json
│   ├── brainstorming.json
│   ├── writing-plans.json
│   ├── executing-plans.json
│   ├── finishing-branch.json
│   ├── systematic-debugging.json
│   ├── requesting-code-review.json
│   ├── receiving-code-review.json
│   ├── subagent-driven-development.json
│   ├── dispatching-parallel-agents.json
│   └── using-git-worktrees.json
├── setup/                      # 8 project setup JSON files
│   ├── client-web-app.json
│   ├── static-website.json
│   ├── internal-tool.json
│   ├── ai-powered-app.json
│   ├── api-backend.json
│   ├── mobile-app.json
│   ├── automation-scripts.json
│   └── ecommerce-site.json
└── agents-guide.json           # Single content file

lib/
├── skills.ts                   # getAllSkills, getSkillBySlug, getSkillCategories
├── setup.ts                    # getAllSetups
└── agents.ts                   # getAgentsGuide

app/
├── skills/
│   ├── page.tsx                # Skills Hub grid page
│   └── [slug]/
│       └── page.tsx            # Skill detail page
├── agents/
│   └── page.tsx                # Agents Guide page
└── setup/
    └── page.tsx                # Project Setup page

components/
├── SkillCard.tsx               # Individual skill card
├── SkillsGrid.tsx              # Client wrapper with search/filter
├── SetupCard.tsx               # Expandable project type card
├── AgentPatternCard.tsx        # Agent pattern display card
└── ModelStrategyTable.tsx      # Model strategy table component
```

---

## Task 1: Types & Data Loaders

**Files:**
- Modify: `lib/types.ts`
- Create: `lib/skills.ts`, `lib/setup.ts`, `lib/agents.ts`

- [ ] **Step 1: Add new types to `lib/types.ts`**

Append the following types after the existing `TrendingRepo` interface:

```ts
export interface Skill {
  slug: string;
  name: string;
  icon: string;
  category: SkillCategory;
  command: string;
  source: string;
  whatItDoes: string;
  whenToUse: string;
  exampleUse: string;
  pairsWellWith: string[];
}

export type SkillCategory =
  | "Frontend Design"
  | "Code Quality"
  | "Workflow"
  | "Debugging"
  | "Review"
  | "Deployment";

export type ModelTier = "haiku" | "sonnet" | "opus";
export type AgentPatternName = "solo" | "parallel" | "sequential-review" | "escalation";
export type Complexity = "Low" | "Medium" | "High";

export interface SetupTemplate {
  slug: string;
  type: string;
  description: string;
  tools: string[];
  skills: string[];
  agentStrategy: {
    primary: ModelTier;
    useOpusFor: string;
    useHaikuFor: string;
    pattern: AgentPatternName;
    tip: string;
  };
  complexity: Complexity;
  estimatedTasks: string;
}

export interface AgentsGuide {
  modelStrategy: ModelRow[];
  agentPatterns: AgentPattern[];
  tokenEfficiency: string[];
  realExample: BuildTimeline;
}

export interface ModelRow {
  taskType: string;
  model: string;
  why: string;
  cost: "Lowest" | "Medium" | "Highest";
}

export interface AgentPattern {
  name: string;
  description: string;
  whenToUse: string;
  diagram: string;
  example: string;
}

export interface BuildTimeline {
  title: string;
  description: string;
  batches: { name: string; tasks: string; model: string; parallel: boolean }[];
}
```

- [ ] **Step 2: Create `lib/skills.ts`**

```ts
import fs from "fs";
import path from "path";
import { Skill, SkillCategory } from "./types";

const skillsDir = path.join(process.cwd(), "content", "skills");

export function getAllSkills(): Skill[] {
  if (!fs.existsSync(skillsDir)) return [];
  const files = fs.readdirSync(skillsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(skillsDir, file), "utf-8");
    return JSON.parse(raw) as Skill;
  });
}

export function getSkillBySlug(slug: string): Skill | undefined {
  const filePath = path.join(skillsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Skill;
}

export function getSkillCategories(): SkillCategory[] {
  const skills = getAllSkills();
  return Array.from(new Set(skills.map((s) => s.category)));
}
```

- [ ] **Step 3: Create `lib/setup.ts`**

```ts
import fs from "fs";
import path from "path";
import { SetupTemplate } from "./types";

const setupDir = path.join(process.cwd(), "content", "setup");

export function getAllSetups(): SetupTemplate[] {
  if (!fs.existsSync(setupDir)) return [];
  const files = fs.readdirSync(setupDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(setupDir, file), "utf-8");
    return JSON.parse(raw) as SetupTemplate;
  });
}
```

- [ ] **Step 4: Create `lib/agents.ts`**

```ts
import fs from "fs";
import path from "path";
import { AgentsGuide } from "./types";

const agentsPath = path.join(process.cwd(), "content", "agents-guide.json");

export function getAgentsGuide(): AgentsGuide | null {
  if (!fs.existsSync(agentsPath)) return null;
  const raw = fs.readFileSync(agentsPath, "utf-8");
  return JSON.parse(raw) as AgentsGuide;
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd "/Users/jithinkrishna/Desktop/claude code/DevToolkit"
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add lib/
git commit -m "feat: add types and data loaders for skills, setup, and agents guide"
```

---

## Task 2: Skill Content Files (15 files)

**Files:**
- Create: All 15 files in `content/skills/`

- [ ] **Step 1: Create directory**

```bash
mkdir -p content/skills
```

- [ ] **Step 2: Create all 17 skill JSON files**

Each file follows this structure:
```json
{
  "slug": "<slug>",
  "name": "<Name>",
  "icon": "<emoji>",
  "category": "<SkillCategory>",
  "command": "/<command>",
  "source": "<source>",
  "whatItDoes": "<2-3 sentences>",
  "whenToUse": "<when to invoke this skill>",
  "exampleUse": "<real example from DevToolkit or SafetyIQ build>",
  "pairsWellWith": ["<slug1>", "<slug2>"]
}
```

**Files to create (all in `content/skills/`):**

1. `taste.json` — Frontend Design, `/taste`, source: "taste-skill (GitHub)", icon: "🎨"
2. `redesign.json` — Frontend Design, `/redesign`, source: "taste-skill (GitHub)", icon: "🔄"
3. `soft-ui.json` — Frontend Design, `/soft-ui`, source: "taste-skill (GitHub)", icon: "✨"
4. `minimalist.json` — Frontend Design, `/minimalist`, source: "taste-skill (GitHub)", icon: "📐"
5. `full-output.json` — Code Quality, `/full-output`, source: "taste-skill (GitHub)", icon: "📋"
6. `test-driven-development.json` — Code Quality, command: "(superpowers auto)", source: "superpowers", icon: "🧪"
7. `verification-before-completion.json` — Code Quality, command: "(superpowers auto)", source: "superpowers", icon: "✅"
8. `brainstorming.json` — Workflow, command: "(superpowers auto)", source: "superpowers", icon: "💡"
9. `writing-plans.json` — Workflow, command: "(superpowers auto)", source: "superpowers", icon: "📝"
10. `executing-plans.json` — Workflow, command: "(superpowers auto)", source: "superpowers", icon: "⚡"
11. `finishing-branch.json` — Workflow, command: "(superpowers auto)", source: "superpowers", icon: "🏁"
12. `systematic-debugging.json` — Debugging, command: "(superpowers auto)", source: "superpowers", icon: "🔍"
13. `requesting-code-review.json` — Review, command: "(superpowers auto)", source: "superpowers", icon: "📤"
14. `receiving-code-review.json` — Review, command: "(superpowers auto)", source: "superpowers", icon: "📥"
15. `subagent-driven-development.json` — Deployment, command: "(superpowers auto)", source: "superpowers", icon: "🤖"
16. `dispatching-parallel-agents.json` — Deployment, command: "(superpowers auto)", source: "superpowers", icon: "⚡"
17. `using-git-worktrees.json` — Deployment, command: "(superpowers auto)", source: "superpowers", icon: "🌲"

Each file must have complete, practical content in `whatItDoes`, `whenToUse`, and `exampleUse`. Write from Jithin's perspective — reference DevToolkit and SafetyIQ builds as real examples. The `pairsWellWith` field should reference other skill slugs that complement this skill.

- [ ] **Step 3: Verify all files parse**

```bash
for f in content/skills/*.json; do node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" && echo "$f OK"; done
```

- [ ] **Step 4: Commit**

```bash
git add content/skills/
git commit -m "feat: add 15 skill content files"
```

---

## Task 3: Setup & Agents Guide Content

**Files:**
- Create: 8 files in `content/setup/`, `content/agents-guide.json`

- [ ] **Step 1: Create directory and 8 setup template files**

```bash
mkdir -p content/setup
```

Create all 8 project setup JSON files in `content/setup/`. Each follows the `SetupTemplate` type. Include these project types:

1. `client-web-app.json` — complexity: "High", estimatedTasks: "15-25", pattern: "parallel", primary: "sonnet"
2. `static-website.json` — complexity: "Low", estimatedTasks: "5-10", pattern: "parallel", primary: "sonnet"
3. `internal-tool.json` — complexity: "Medium", estimatedTasks: "10-15", pattern: "parallel", primary: "sonnet"
4. `ai-powered-app.json` — complexity: "High", estimatedTasks: "15-25", pattern: "sequential-review", primary: "opus"
5. `api-backend.json` — complexity: "Medium", estimatedTasks: "10-20", pattern: "sequential-review", primary: "sonnet"
6. `mobile-app.json` — complexity: "High", estimatedTasks: "20-30", pattern: "sequential-review", primary: "sonnet"
7. `automation-scripts.json` — complexity: "Low", estimatedTasks: "3-8", pattern: "solo", primary: "sonnet"
8. `ecommerce-site.json` — complexity: "High", estimatedTasks: "20-30", pattern: "parallel", primary: "sonnet"

The `tools` array should reference existing tool slugs from `content/tools/`. The `skills` array should reference skill slugs from `content/skills/`. Write practical `useOpusFor`, `useHaikuFor`, and `tip` content.

- [ ] **Step 2: Create `content/agents-guide.json`**

Single JSON file with 4 top-level keys matching the `AgentsGuide` interface:

- `modelStrategy`: 6 rows covering Haiku/Sonnet/Opus use cases (per spec table)
- `agentPatterns`: 4 patterns (Solo, Parallel, Sequential with Review, Escalation) each with name, description, whenToUse, diagram (text-based flow like "Task → Agent → Review → Done"), example from DevToolkit build
- `tokenEfficiency`: 5 rules as strings
- `realExample`: The DevToolkit build timeline with 7 batches

- [ ] **Step 3: Verify all files parse**

```bash
for f in content/setup/*.json content/agents-guide.json; do node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" && echo "$f OK"; done
```

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat: add 8 setup templates and agents guide content"
```

---

## Task 4: Update Navbar

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add scrollbar-hide CSS to globals.css**

Add to `app/globals.css`:
```css
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 2: Update Navbar with 7 links and scrollable pill group**

Update `components/Navbar.tsx`:
- Add 3 new links: `{ href: "/skills", label: "Skills Hub" }`, `{ href: "/agents", label: "Agents Guide" }`, `{ href: "/setup", label: "Project Setup" }`
- Wrap the desktop pill group `div` with `overflow-x-auto scrollbar-hide` classes so it scrolls horizontally on smaller viewports
- Add all 7 links to the mobile hamburger dropdown

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/globals.css
git commit -m "feat: update navbar with Skills Hub, Agents Guide, Project Setup links"
```

---

## Task 5: Skills Hub Page & Components

**Files:**
- Create: `components/SkillCard.tsx`, `components/SkillsGrid.tsx`, `app/skills/page.tsx`

- [ ] **Step 1: Create SkillCard component**

Create `components/SkillCard.tsx` — follows ToolCard pattern:
- Props: `skill: Skill`
- Dark card with `card-glow` class, `bg-[#1c1f26]/80`, `border-white/[0.04]`, `rounded-2xl`
- Header: icon in colored category container (40x40 rounded-xl), skill name, category dot + label
- Command shown as inline code: monospace, `bg-white/[0.04]`, `rounded-md`, `px-2 py-0.5`
- Description text (`whatItDoes`), 2-line clamp
- Footer: "View details →" on hover
- Links to `/skills/[slug]`

Category colors:
```ts
const skillCategoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Frontend Design": { bg: "bg-violet-500/8", text: "text-violet-400", dot: "bg-violet-400" },
  "Code Quality": { bg: "bg-emerald-500/8", text: "text-emerald-400", dot: "bg-emerald-400" },
  "Workflow": { bg: "bg-blue-500/8", text: "text-blue-400", dot: "bg-blue-400" },
  "Debugging": { bg: "bg-red-500/8", text: "text-red-400", dot: "bg-red-400" },
  "Review": { bg: "bg-amber-500/8", text: "text-amber-400", dot: "bg-amber-400" },
  "Deployment": { bg: "bg-cyan-500/8", text: "text-cyan-400", dot: "bg-cyan-400" },
};
```

- [ ] **Step 2: Create SkillsGrid component**

Create `components/SkillsGrid.tsx` — follows ToolkitGrid pattern:
- `"use client"` component
- Props: `skills: Skill[]`, `categories: SkillCategory[]`
- State: `searchQuery`, `activeCategory`
- Filters skills by category and search (searches `name`, `whatItDoes`, `command`)
- Renders: SearchBar, CategoryFilter (reuse existing components), count text, grid of SkillCards
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` (matches ToolkitGrid pattern)
- Empty state with clear filters button
- Staggered fade-in animation

Note: The existing `CategoryFilter` component has hardcoded `categoryIcons` for tool categories only. The skill categories ("Frontend Design", "Code Quality", etc.) won't have icons. Either:
- (a) Add new entries to the `categoryIcons` map in `CategoryFilter.tsx` for all skill categories: `"Frontend Design": "layout"`, `"Code Quality": "terminal"`, `"Workflow": "edit"`, `"Debugging": "search"`, `"Review": "server"`, `"Deployment": "cloud"`, OR
- (b) Make the icon lookup gracefully fall back to no icon when category is not found (currently falls back to `terminal` icon, which is acceptable).

Choose option (a) — add the 6 new entries to the existing `categoryIcons` map in `CategoryFilter.tsx`. This is a one-line-each addition.

- [ ] **Step 3: Create Skills Hub page**

Create `app/skills/page.tsx`:
- Server component
- Loads skills via `getAllSkills()` and categories via `getSkillCategories()`
- Header: eyebrow "AI CAPABILITIES", title "Skills Hub", subtitle about browsing installed skills
- Renders `<SkillsGrid skills={skills} categories={categories} />`

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/SkillCard.tsx components/SkillsGrid.tsx app/skills/page.tsx
git commit -m "feat: add Skills Hub page with skill cards, search, and category filter"
```

---

## Task 6: Skill Detail Page

**Files:**
- Create: `app/skills/[slug]/page.tsx`

- [ ] **Step 1: Create skill detail page**

Create `app/skills/[slug]/page.tsx`:
- Server component
- Import `getSkillBySlug`, `getAllSkills` from `@/lib/skills`
- If skill not found, call `notFound()`
- Layout: `max-w-3xl mx-auto`, same pattern as `/toolkit/[slug]`
- Sections:
  - Name + icon + category badge at top
  - "Command" — styled as inline code block with emerald accent
  - "What it does" section
  - "When to use it" section
  - "Example" — real usage, styled as callout with subtle bg
  - "Pairs well with" — linked badges to `/skills/[slug]` (need slug-to-name lookup from `getAllSkills()`)
  - "Source" — external link if applicable
  - Back link "← Back to Skills Hub"
- `generateStaticParams()` from `getAllSkills()`
- `generateMetadata()` with skill name and description

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: All 15 skill detail pages generated statically.

- [ ] **Step 3: Commit**

```bash
git add "app/skills/[slug]/page.tsx"
git commit -m "feat: add skill detail page with full descriptions"
```

---

## Task 7: Agents Guide Page & Components

**Files:**
- Create: `components/ModelStrategyTable.tsx`, `components/AgentPatternCard.tsx`, `app/agents/page.tsx`

- [ ] **Step 1: Create ModelStrategyTable component**

Create `components/ModelStrategyTable.tsx`:
- Props: `rows: ModelRow[]`
- Dark styled table with `border-white/[0.04]` borders
- Columns: Task Type, Model (with color-coded badge: Haiku=cyan, Sonnet=blue, Opus=violet), Why, Cost
- Cost column: colored dot indicator (green=Lowest, yellow=Medium, red=Highest)
- Responsive: on mobile, stack as cards instead of table (`hidden sm:table` for table, `sm:hidden` for card view)

- [ ] **Step 2: Create AgentPatternCard component**

Create `components/AgentPatternCard.tsx`:
- Props: `pattern: AgentPattern`
- Dark card with pattern name, description
- "When to use" section
- "Diagram" section — rendered as monospace text in a dark code-block style container
- "Example" section — italic, referencing DevToolkit build
- Subtle left border colored by pattern type

- [ ] **Step 3: Create Agents Guide page**

Create `app/agents/page.tsx`:
- Server component that loads data via `getAgentsGuide()`, passes to a client wrapper
- Client wrapper component (inline or separate file) manages expandable sections
- Each section is a collapsible card with a click-to-toggle heading (all expanded by default)
- Use `useState` with an array of expanded section IDs, initialized with all 4 expanded
- Header: eyebrow "PRACTICAL PLAYBOOK", title "Agents Guide", subtitle
- 4 sections, each as a collapsible card:
  1. "Model strategy" — renders `<ModelStrategyTable />`
  2. "Agent patterns" — renders `<AgentPatternCard />` for each pattern
  3. "Token efficiency" — numbered list of rules, each in a subtle card
  4. "Real example" — timeline of DevToolkit build batches, each batch as a row showing: batch name, tasks, model used, parallel/sequential indicator

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/ModelStrategyTable.tsx components/AgentPatternCard.tsx app/agents/page.tsx
git commit -m "feat: add Agents Guide page with model strategy and patterns"
```

---

## Task 8: Project Setup Page & Components

**Files:**
- Create: `components/SetupCard.tsx`, `app/setup/page.tsx`

- [ ] **Step 1: Create SetupCard component**

Create `components/SetupCard.tsx`:
- `"use client"` component
- Props: `setup: SetupTemplate`, `toolsMap: Record<string, string>`, `skillsMap: Record<string, string>`, `isExpanded: boolean`, `onToggle: () => void`
- Collapsed: shows project type name, description, complexity badge, click to expand
- Expanded: shows all collapsed content plus:
  - "Recommended tools" — linked badges to `/toolkit/[slug]` (use toolsMap for display names)
  - "Recommended skills" — linked badges to `/skills/[slug]` (use skillsMap for display names)
  - "Agent strategy" box — shows primary model, what to use Opus/Haiku for, pattern name, tip
  - Complexity + estimated tasks
- Accordion behavior: `onToggle` collapses others
- Smooth expand/collapse with CSS transition (`max-height` or `grid-rows` animation)

- [ ] **Step 2: Create Project Setup page**

Create `app/setup/page.tsx`:
- Mix of server + client: server loads data, client wrapper manages expanded state
- Import `getAllSetups` from `@/lib/setup`, `getAllTools` from `@/lib/tools` (existing), `getAllSkills` from `@/lib/skills`
- Build `toolsMap` (slug → name) and `skillsMap` (slug → name)
- Header: eyebrow "GET STARTED", title "Project Setup", subtitle "Pick a project type to see the recommended tools, skills, and agent strategy"
- Client wrapper manages `expandedSlug` state (string | null)
- Renders grid of SetupCards: `grid grid-cols-1 sm:grid-cols-2 gap-4`
- Staggered fade-in

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/SetupCard.tsx app/setup/page.tsx
git commit -m "feat: add Project Setup page with interactive recommender"
```

---

## Task 9: Deploy & Update Obsidian

**Files:** No code changes — deployment and docs only.

- [ ] **Step 1: Final build verification**

```bash
npm run build
```

Expected: All pages build successfully including new skills (15), setup, and agents routes.

- [ ] **Step 2: Push and deploy**

```bash
git push
npx vercel --prod --yes
```

- [ ] **Step 3: Update Obsidian notes**

Update `~/Obsidian/WorkHub/100 Projects/DevToolkit/DevToolkit Overview.md`:
- Add Skills Hub, Agents Guide, Project Setup to sections list
- Update tool/skill counts

Update `~/Obsidian/WorkHub/000 Dashboard/Home.md` if needed.
