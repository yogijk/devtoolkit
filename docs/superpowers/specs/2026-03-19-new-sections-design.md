# DevToolkit New Sections — Design Spec

**Date:** 2026-03-19
**Author:** Jithin + Claude
**Status:** Draft

---

## 1. Overview

Add three new sections to DevToolkit: Skills Hub, Agents Guide, and Project Setup. These help Jithin understand and efficiently use Claude Code skills, agent patterns, and project-specific recommendations.

### Problem

Jithin has installed slash commands and used subagents but doesn't have a reference for: what skills exist, when to use which agent model, or how to set up a new project with the right AI tools.

### Solution

Three new pages added to the existing DevToolkit app:

1. **Skills Hub** (`/skills`) — Browse all installed Claude Code skills as cards
2. **Agents Guide** (`/agents`) — Practical playbook for agent/model usage
3. **Project Setup** (`/setup`) — Pick a project type → see recommended tools, skills, and agent strategy

---

## 2. Navigation Update

**Current:** My Toolkit | Project Starter | Learning Path | What's New

**New:** My Toolkit | Project Starter | Learning Path | What's New | Skills Hub | Agents Guide | Project Setup

The navbar pill group becomes horizontally scrollable with `overflow-x-auto` and hidden scrollbar CSS (`scrollbar-width: none; -webkit-overflow-scrolling: touch`) to handle 7 links on smaller viewports. On mobile, the hamburger menu shows all 7 links stacked.

**Note:** Project Starter (`/starter`) remains as-is — it covers tools only. Project Setup (`/setup`) is a separate, more comprehensive section covering tools + skills + agents. They serve different purposes: Starter is "what tools do I need?" while Setup is "how do I set up my entire AI workflow?"

---

## 3. Skills Hub (`/skills`)

### Data Model — Skill Card (JSON)

```json
{
  "slug": "taste",
  "name": "Taste Skill",
  "icon": "🎨",
  "category": "Frontend Design",
  "command": "/taste",
  "source": "taste-skill (GitHub)",
  "whatItDoes": "Applies premium design rules...",
  "whenToUse": "When building any new UI...",
  "exampleUse": "Used on DevToolkit to swap Inter for Geist...",
  "pairsWellWith": ["redesign", "full-output"]
}
```

### Categories

- **Frontend Design:** taste, redesign, soft-ui, minimalist
- **Code Quality:** full-output, test-driven-development, verification-before-completion
- **Workflow:** brainstorming, writing-plans, executing-plans, finishing-branch
- **Debugging:** systematic-debugging
- **Review:** requesting-code-review, receiving-code-review
- **Deployment:** subagent-driven-development, dispatching-parallel-agents, using-git-worktrees

### Skills to Document (~15)

1. `taste` — Frontend Design — Premium design rules (typography, colors, layout, motion)
2. `redesign` — Frontend Design — Audit existing UI and upgrade to premium quality
3. `soft-ui` — Frontend Design — Luxury agency aesthetic
4. `minimalist` — Frontend Design — Clean editorial minimalist style
5. `full-output` — Code Quality — Enforce complete code generation, no placeholders
6. `test-driven-development` — Code Quality — TDD workflow for features and bugfixes
7. `verification-before-completion` — Code Quality — Verify before claiming work is done
8. `brainstorming` — Workflow — Explore ideas before implementation
9. `writing-plans` — Workflow — Create detailed implementation plans
10. `executing-plans` — Workflow — Execute plans with review checkpoints
11. `finishing-branch` — Workflow — Complete dev work (merge, PR, cleanup)
12. `systematic-debugging` — Debugging — Structured approach to finding and fixing bugs
13. `requesting-code-review` — Review — Request review of completed work
14. `receiving-code-review` — Review — Handle review feedback properly
15. `subagent-driven-development` — Deployment — Dispatch fresh agent per task with two-stage review

### Page Layout

- Header with eyebrow tag, title, subtitle (same style as /toolkit)
- Search bar (filter by name)
- Category filter pills (same component pattern as /toolkit)
- Grid of skill cards (2-column on desktop, 1-column mobile)
- Each card shows: name, category dot, command (`/taste`), description, "pairs with" links
- Click card → detail page at `/skills/[slug]` (uses `generateStaticParams` like `/toolkit/[slug]`)
- Search covers `name`, `whatItDoes`, and `command` fields

**Skill Category Colors:**
- Frontend Design: `bg-violet-500/8 text-violet-400`
- Code Quality: `bg-emerald-500/8 text-emerald-400`
- Workflow: `bg-blue-500/8 text-blue-400`
- Debugging: `bg-red-500/8 text-red-400`
- Review: `bg-amber-500/8 text-amber-400`
- Deployment: `bg-cyan-500/8 text-cyan-400`

### Skill Detail Page (`/skills/[slug]`)

- Skill name + category badge
- "Command" section — the slash command to run
- "What it does" section
- "When to use it" section
- "Example" section — real usage from Jithin's projects
- "Pairs well with" — linked to other skill cards
- "Source" — link to GitHub repo if applicable
- Back link to /skills

---

## 4. Agents Guide (`/agents`)

### Content Structure

Single page, not cards. Sections of content loaded from a JSON file.

```json
{
  "modelStrategy": [...],
  "agentPatterns": [...],
  "tokenEfficiency": [...],
  "realExample": {...}
}
```

### Sections

**Section 1: Model Strategy**

Table format:

| Task Type | Model | Why | Cost |
|-----------|-------|-----|------|
| Scaffolding, file creation, JSON content | Haiku | Mechanical work, cheap | Lowest |
| Component building, page implementation | Sonnet | Good speed/quality balance | Medium |
| Architecture, debugging, complex reviews | Opus | Needs judgment and reasoning | Highest |
| Simple search, file reading | Haiku | Fast, saves tokens | Lowest |
| Multi-file coordination, integration | Sonnet | Handles complexity without Opus cost | Medium |
| Design decisions, spec writing | Opus | Nuanced judgment required | Highest |

**Section 2: Agent Patterns**

4 patterns, each with: name, description, when to use, visual diagram (text-based), real example.

1. **Solo Agent** — One task, one agent. For simple isolated work.
2. **Parallel Dispatch** — Multiple independent tasks simultaneously. For independent pages/components.
3. **Sequential with Review** — Implement → spec review → quality review. For quality-critical work.
4. **Escalation** — Start cheap, upgrade if blocked. For uncertain complexity.

**Section 3: Token Efficiency**

Rules list:
- Match model to task complexity — don't use Opus for JSON files
- Never send full conversation history to subagents — craft precise prompts
- Parallelize independent tasks to save wall-clock time
- Fresh agent per task prevents context pollution
- Use the cheapest model that handles the task well (not just "handles" — handles well)

**Section 4: Real Example — How DevToolkit Was Built**

Timeline of the actual build:
- 14 tasks total
- Batch 1 (sequential): Task 1 scaffolding
- Batch 2 (parallel): Tasks 2, 3, 4 — types, tools JSON, learning path
- Batch 3 (parallel): Tasks 5, 6 — navbar, home page
- Batch 4 (parallel): Tasks 7, 8, 9 — toolkit, detail, starter pages
- Batch 5 (parallel): Tasks 10, 11 — learning path, feed
- Batch 6 (sequential): Task 12 mobile polish
- Batch 7 (sequential): Task 13 deploy, Task 14 Obsidian
- Models used: Sonnet for implementation, Opus for reviews
- Result: Full app built and deployed in one session

### Page Layout

- Header with eyebrow tag, title, subtitle
- 4 sections rendered as expandable cards (all expanded by default)
- Model strategy as a styled table
- Agent patterns as cards with subtle borders
- Token efficiency as a numbered list
- Real example as a timeline/flow

---

## 5. Project Setup (`/setup`)

### Data Model — Setup Template (JSON)

```json
{
  "slug": "client-web-app",
  "type": "Client Web App",
  "description": "Full website with login, database, and hosting",
  "tools": ["nextjs", "typescript", "tailwindcss", "nextauth", "postgresql", "prisma", "vercel", "railway", "github"],
  "skills": ["taste", "full-output", "test-driven-development"],
  "agentStrategy": {
    "primary": "sonnet",
    "useOpusFor": "Auth design, database schema, code reviews",
    "useHaikuFor": "JSON content files, simple config",
    "pattern": "parallel",
    "tip": "Parallelize page building — each page is independent. Use Opus only for auth and DB schema design."
  },
  "complexity": "High",
  "estimatedTasks": "15-25"
}
```

### 8 Project Types

1. **Client Web App** — Full stack with auth & database (like SafetyIQ)
2. **Static Website** — Portfolio, landing page, no database
3. **Internal Tool** — Company dashboard, data viewer
4. **AI-powered App** — App with Claude API integration
5. **API Backend** — REST/GraphQL API, no frontend
6. **Mobile App** — React Native / Expo
7. **Automation/Scripts** — Node.js scripts, cron jobs, data processing
8. **E-commerce Site** — Online store with payments

### Page Layout

- Header with eyebrow tag, title, subtitle
- 8 project type cards in a 2x4 grid (2-col desktop, 1-col mobile)
- Click a card → expands inline (no separate page) showing:
  - Recommended tools (linked badges to /toolkit/[slug])
  - Recommended skills (linked badges to /skills/[slug])
  - Agent strategy box (model table + pattern + tip)
  - Complexity indicator
- Only one card expanded at a time (accordion behavior)
- "Start this project" tip at the bottom of expanded view

---

## 6. Technical Architecture

### New Files

```
content/
├── skills/           # 15 skill JSON files
│   ├── taste.json
│   ├── redesign.json
│   ├── ...
├── setup/            # 8 project setup JSON files
│   ├── client-web-app.json
│   ├── static-website.json
│   ├── ...
└── agents-guide.json # Single content file for agents page

lib/
├── skills.ts         # getAllSkills, getSkillBySlug, getSkillCategories
├── setup.ts          # getAllSetups
└── agents.ts         # getAgentsGuide

app/
├── skills/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── agents/
│   └── page.tsx
└── setup/
    └── page.tsx

components/
├── SkillCard.tsx
├── SkillsGrid.tsx     # Client wrapper with search/filter
├── SetupCard.tsx      # Expandable project type card
├── AgentPatternCard.tsx
└── ModelStrategyTable.tsx
```

### Types (add to lib/types.ts)

```ts
export interface Skill {
  slug: string;
  name: string;
  icon: string; // emoji
  category: SkillCategory;
  command: string;
  source: string;
  whatItDoes: string;
  whenToUse: string;
  exampleUse: string;
  pairsWellWith: string[]; // skill slugs — needs slug-to-name lookup for display
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
  tools: string[];       // tool slugs — link to /toolkit/[slug]
  skills: string[];      // skill slugs — link to /skills/[slug]
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
  diagram: string; // text-based visual diagram
  example: string;
}

export interface BuildTimeline {
  title: string;
  description: string;
  batches: { name: string; tasks: string; model: string; parallel: boolean }[];
}
```

### Data Loaders (same pattern as existing)

- `lib/skills.ts` — `getAllSkills()`, `getSkillBySlug()`, `getSkillCategories()`
- `lib/setup.ts` — `getAllSetups()`
- `lib/agents.ts` — `getAgentsGuide()`

All use `fs.readFileSync` with existence checks, same as existing loaders.

---

## 7. Component Reuse

- **SkillsGrid** reuses the same SearchBar and CategoryFilter pattern from ToolkitGrid
- **SkillCard** follows ToolCard styling (card-glow, emerald accents, level/category dots)
- **SetupCard** tool/skill badges reuse the linked badge pattern from ProjectTypeCard
- All pages use the same header pattern (eyebrow tag + title + subtitle)
- Same dark theme, Geist font, emerald accent, animation patterns

---

## 8. Scope

### Included
- All 3 new sections fully functional
- ~15 skill content files
- 8 project setup templates
- 1 agents guide content file
- Navbar updated with 3 new links
- Mobile responsive
- Deployed to Vercel

### Excluded
- Live skills.sh API integration (future)
- Cost calculator for agent usage (future)
- User-customizable recommendations (future)
- Dark mode toggle (future)
