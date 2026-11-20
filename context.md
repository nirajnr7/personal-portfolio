# Portfolio Context Guide

> Reference for any AI assistant or developer making changes to this project.
> Follow the existing patterns exactly. Do NOT restructure, rename, or remove
> existing sections — only ADD new items in the established format.

---

## Project Overview

An Excalidraw-themed portfolio site for a Senior Backend Engineer. The entire
site is an interactive system design diagram — each section (About, Projects,
Experience, Contact) is a "service box" on a canvas. Clicking a box opens a
detail panel below. Built with Next.js 16, React 19, rough.js, and Tailwind 4.

**Stack:** Next.js 16.4 (Turbopack) | React 19 | TypeScript | rough.js 4.6 | Tailwind CSS 4.3

---

## File Map

```
src/
  lib/data.ts              ← ALL content lives here (single source of truth)
  components/
    ExcalidrawPortfolio.tsx ← Main component: canvas, panels, controls, icons
  app/
    page.tsx               ← Just renders <ExcalidrawPortfolio />
    layout.tsx             ← Fonts (Virgil, JetBrains Mono), meta tags
    globals.css            ← Theme vars, dot grid, animations
    not-found.tsx          ← 404 page (request → LB → ???)
public/
  logos/                   ← Local brand icons (99acres.png, enphase.svg, java.svg, aws.svg)
  Niraj_Singh_Resume.pdf   ← Resume download
next.config.ts             ← Turbopack config, allowed origins
```

---

## Data Model (`src/lib/data.ts`)

All portfolio content is in a single `DATA` export. Here are the schemas:

### Top-level fields

```ts
DATA.name: string          // "Niraj Singh"
DATA.title: string         // "Senior Software Engineer"
DATA.tagline: string[]     // 3 lines, typed out with animation
DATA.email: string
DATA.phone: string
DATA.education: { institution, degree, period, cgpa }
```

### Stats (About panel — hero cards)

```ts
DATA.stats: Array<{ value: string; label: string; icon: string }>
// Example: { value: "5+", label: "Years Experience", icon: "💼" }
// Keep to 2–3 items max
```

### Languages (About panel — skill bars)

```ts
DATA.languages: Array<{ name: string; level: number }>
// level is 0–100, drawn as a rough.js bar
// Backend languages should be 80+; frontend/scripting 55–65
```

### Skills (About panel — icon badge grid)

```ts
DATA.skills: Record<string, string[]>
// Category name → array of tech names
// Categories: "Languages", "Frameworks & Libraries", "Tools & Infra", "Databases", "ML & Data", "Cloud"
// Each tech name MUST have an entry in TECH_META (component) for icon rendering
```

### Links (Contact panel — Service Registry)

```ts
DATA.links: Record<string, { url: string }>
// Keys: "linkedin", "github", "leetcode", "codechef", "codeforces"
// Each key maps to a PLATFORM_COLORS entry and SVG icon in the component
```

### Interests (About panel — "Also Running" microservices)

```ts
DATA.interests: Array<{ name: string; icon: string; uptime: string }>
// Example: { name: "Chess", icon: "♟️", uptime: "evenings" }
```

### Experience

```ts
DATA.experience: Array<{
  company: string;        // "Enphase Energy" or "99acres · InfoEdge"
  role: string;           // "Senior Software Engineer"
  period: string;         // "Apr 2025 – Present"
  location: string;       // "Bengaluru, IND"
  latency: string;        // "~7 mo" — shown in the pipeline
  icon: string;           // "enphase" or "99acres" — maps to CompanyLogo component
  stack: string[];        // tech names — rendered as TechBadge icons
  metrics: Array<{        // impact cards above highlights
    label: string;        // small gray text
    value: string;        // large accent-colored text
  }>;
  highlights: Array<{
    text: string;         // one-liner describing the work
    flow: FlowStep[];     // architecture diagram (see Flow System below)
  }>;
}>
```

**Adding a new company:**
1. Add the entry to `DATA.experience` array (newest first)
2. Add a logo file to `public/logos/<name>.svg` or `.png`
3. Add a case in the `CompanyLogo` component (search "CompanyLogo")
4. The career pipeline auto-generates from `DATA.experience`

### Projects

```ts
DATA.projects: Array<{
  name: string;           // "AI-Powered Quote Generation"
  icon: string;           // emoji like "🤖"
  tech: string[];         // tech names — rendered as TechBadge icons
  description: string;    // 1–2 sentence overview
  link: string;           // live demo URL
  metrics: Array<{        // same shape as experience metrics
    label: string;
    value: string;
  }>;
  highlights: string[];   // bullet points (plain strings, NOT objects)
  flow: FlowStep[];       // architecture diagram
}>
```

**Adding a new project:**
1. Add the entry to `DATA.projects` array
2. Ensure all `tech` names exist in `TECH_META` (or add them)
3. Define the `flow` using the Flow System below

---

## Flow System (MiniArch diagrams)

Each architecture diagram is an array of `FlowStep`:

```ts
type FlowNode = { label: string; type: string; note?: string }
type FlowStep = FlowNode | FlowNode[]  // array = parallel branch
```

**Linear flow:**
```ts
[
  { label: "Client", type: "api" },
  { label: "Spring API", type: "gateway" },
  { label: "SHA-256", type: "script" },
  { label: "Short URL", type: "output" },
]
// Renders: Client → Spring API → SHA-256 → Short URL
```

**Parallel branch (array within array):**
```ts
[
  { label: "MySQL (16)", type: "database" },
  { label: "Migration Script", type: "script" },
  [                                          // ← parallel!
    { label: "MongoDB", type: "database" },
    { label: "Redis Cache", type: "cache" },
  ],
  { label: "GET API", type: "api", note: "70ms→54ms" },
]
// Renders: MySQL → Script → [MongoDB ¦ Redis] → GET API
//                             (dashed box)        (note below)
```

### Available node types

| type       | icon shape     | color (light)  | use for                        |
|------------|---------------|----------------|--------------------------------|
| `database` | cylinder      | #4479A1 (blue) | MySQL, MongoDB, H2, PostgreSQL |
| `cache`    | clock         | #DC382D (red)  | Redis, Memcached               |
| `script`   | document      | #6c757d (gray) | migration scripts, Python      |
| `queue`    | list bars     | #FF6600 (org)  | RabbitMQ, Kafka, SQS           |
| `search`   | magnifier     | #D9411E (red)  | Solr, Elasticsearch            |
| `api`      | endpoint      | #228be6 (blue) | REST API, GraphQL, Client      |
| `cloud`    | cloud         | #7c3aed (purp) | OpenAI, YouTube, AWS services  |
| `image`    | picture       | #2b8a3e (grn)  | image processing               |
| `video`    | camera        | #e64980 (pink) | video processing               |
| `gateway`  | lightning     | #f59f00 (yel)  | Spring API, load balancers     |
| `output`   | checkmark     | #2b8a3e (grn)  | final result, consumers        |
| `service`  | gear          | #495057 (gray) | cron, schedulers, engines      |
| `upload`   | arrow up      | #1098ad (teal) | uploads (YouTube, ImgHippo)    |

---

## Tech Icon System

### TechBadge (for tech stack pills)

Renders a pill with a brand icon + colored text. Needs an entry in `TECH_META`:

```ts
const TECH_META: Record<string, { slug: string; color: string }> = {
  Java:         { slug: "_local_", color: "#007396" },  // uses /logos/java.svg
  AWS:          { slug: "_local_", color: "#FF9900" },  // uses /logos/aws.svg
  Python:       { slug: "python",  color: "#3776AB" },  // CDN: simpleicons.org
  "Spring Boot":{ slug: "springboot", color: "#6DB33F" },
  // ... etc
};
```

**Adding a new tech:**
1. Find the Simple Icons slug at https://simpleicons.org — search, copy the slug
2. Add to `TECH_META`: `"TechName": { slug: "slug-from-simpleicons", color: "#HEX" }`
3. If Simple Icons doesn't have it:
   - Download SVG/PNG to `public/logos/<name>.svg`
   - Set slug to `"_local_"` and add entry to `LOCAL_ICONS` map:
     ```ts
     const LOCAL_ICONS: Record<string, string> = {
       Java: "/logos/java.svg",
       AWS: "/logos/aws.svg",
       NewTech: "/logos/newtech.svg",  // ← add here
     };
     ```

### CompanyLogo (for experience cards + pipeline)

Renders a company logo in a rounded box. Cases:

```ts
// In the CompanyLogo function:
if (name === "99acres") → <img src="/logos/99acres.png" ... />
if (name === "enphase") → <img src="/logos/enphase.svg" ... />
// Add new companies as elif cases with their logo file
```

---

## Panel Anatomy (consistent across all panels)

Each panel follows this visual hierarchy:

```
┌─────────────────────────────────────────┐
│  [Logo/Icon]  Title (2xl bold)          │  ← Header
│               Subtitle (sm, muted)      │
│               Meta (xs, mono, muted)    │
├─────────────────────────────────────────┤
│  [Metric] [Metric] [Metric]            │  ← Impact metrics row
├─────────────────────────────────────────┤
│  [TechBadge] [TechBadge] [TechBadge]   │  ← Tech stack + border-bottom
│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│  SECTION HEADER (xs, uppercase, tracked)│  ← e.g. "Key Contributions"
│  › Bullet point with text               │
│    [MiniArch flow diagram]              │  ← rough.js SVG
│  › Another bullet point                 │
├─────────────────────────────────────────┤
│  [Action button]                        │  ← e.g. "Live Demo"
└─────────────────────────────────────────┘
│  Trade-off: italic note in accent color │  ← TradeOff component
```

**Spacing rules:**
- Card padding: `p-6`
- Section gap: `mb-5`
- After tech stack: `mb-5 pb-4 border-b`
- Highlights gap: `space-y-5` (experience), `space-y-2` (projects)
- Between cards: `space-y-6` (parent container)

---

## Theme System

Two modes: **Whiteboard** (light) and **Blackboard** (dark).

- Toggle is a sun/moon icon in the header (next to Resume button)
- Service boxes use GTA 6 neon colors: cyan, pink, violet, indigo
- Everything else uses classic Excalidraw palette (neutral bg, blue accent)
- All hex colors must be 6-digit (`#228be6`), never 3-digit (`#888`) — alpha
  is appended as 2 extra chars in some places

```ts
// Box neon colors (light / dark):
About:      #0891b2 / #22d3ee   (cyan)
Projects:   #cc46a0 / #f472b6   (pink)
Experience: #813dbb / #a78bfa   (violet)
Contact:    #4c5fca / #818cf8   (indigo)

// Theme accent:  #228be6 (light)  #4dabf7 (dark)
```

---

## Interactive Features

| Feature             | Where                | What it does                                      |
|---------------------|----------------------|---------------------------------------------------|
| Pan & zoom          | Canvas area          | Scroll to zoom, drag to pan, +/- Fit buttons      |
| Cmd+K palette       | Left sidebar button  | Keyboard nav to any panel                         |
| Chaos Monkey        | Left sidebar button  | Randomly crashes a service box (503, red hatching) |
| Typing animation    | About tagline        | Types out tagline char by char                     |
| Uptime counter      | Status bar           | Counts seconds since page load                     |
| Request counter     | Status bar           | Tracks interactions (clicks, toggles)              |
| Auto-fit on close   | Panel close (X)      | Resets zoom to fit when closing a panel            |
| Data packets        | Arrows               | Animated dots flowing along arrow paths            |

---

## Common Operations

### Add a new experience company

1. `data.ts`: Add entry to `DATA.experience` (newest first)
2. Download logo to `public/logos/<name>.svg`
3. `ExcalidrawPortfolio.tsx`: Add case in `CompanyLogo` function
4. Ensure all `stack` items exist in `TECH_META`

### Add a new project

1. `data.ts`: Add entry to `DATA.projects` following the exact schema
2. Ensure all `tech` items exist in `TECH_META`
3. Define `flow` using FlowStep types
4. Add 3–4 `highlights` strings
5. Add 2–3 `metrics`

### Add a new skill/tech

1. `data.ts`: Add to the relevant `DATA.skills` category
2. `ExcalidrawPortfolio.tsx`: Add to `TECH_META` with CDN slug + color
3. If no CDN icon: download to `public/logos/`, add to `LOCAL_ICONS`

### Add a new flow node type

1. Add SVG path to `SD_ICONS` (24x24 viewBox)
2. Add light/dark colors to `SD_TYPE_COLORS`
3. Use the new type string in flow definitions

### Add a new social link

1. `data.ts`: Add to `DATA.links`
2. `ExcalidrawPortfolio.tsx`: Add SVG path to the platform icons section
3. Add color entry to `PLATFORM_COLORS`

---

## Build & Deploy

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build — must pass with 0 errors
npm run start        # Serve production build locally
```

**Verification checklist before committing:**
1. `npm run build` passes with zero errors
2. All 4 panels open and display correctly
3. Dark mode toggle works (all text/icons visible)
4. No broken images (check browser console)
5. Auto-fit on panel close works
