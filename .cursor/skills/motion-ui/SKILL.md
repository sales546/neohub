---
name: motion-ui
description: >-
  Install and use Lenis smooth scroll, Animate UI (React/Motion/shadcn registry),
  and Inspira UI (Vue/Nuxt only). Use when the user mentions Lenis, Animate UI,
  Inspira UI, smooth scrolling, motion components, or animated UI libraries.
---

# Motion UI stack (Lenis · Animate UI · Inspira UI)

## Repos

| Library | GitHub | Stack | Install model |
|---|---|---|---|
| **Lenis** | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | Any (React via `lenis/react`) | `npm i lenis` |
| **Animate UI** | [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | React + Tailwind + Motion | shadcn registry (copy into repo) |
| **Inspira UI** | [unovue/inspira-ui](https://github.com/unovue/inspira-ui) | **Vue 3 / Nuxt only** | Copy-paste + Vue deps |

Docs: [lenis](https://github.com/darkroomengineering/lenis) · [animate-ui.com](https://animate-ui.com/docs) · [inspira-ui.com](https://inspira-ui.com)

## NeoHub (this repo)

Already installed:

```bash
npm i lenis motion clsx tailwind-merge
```

- `lib/utils.js` → `cn()`
- `components/providers/LenisProvider.jsx`
- `components.json` → `@animate-ui` registry

**Lenis is enabled** on public pages via `SiteChrome` → `LenisProvider`. Admin is excluded. Owl carousels use `prevent()`. Skip when `prefers-reduced-motion`.

**Animate UI on homepage:** `Fade` / `Slide` / `HighlightText` / `CountingNumber` via `Reveal.jsx`, `AnimatedSectionHeading`, `AnimatedCounterStats`, hero + testimonials.

**Inspira UI cannot be used in NeoHub** (React/Next). For animated React components use **Animate UI**. Use Inspira only in Vue/Nuxt projects.

---

## Lenis (smooth scroll)

### Install

```bash
npm i lenis
```

### Next.js App Router

```jsx
// components/providers/LenisProvider.jsx
"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis root options={{ autoRaf: true, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

Enable on a layout/page:

```jsx
import LenisProvider from "@/components/providers/LenisProvider";

export default function Page() {
  return <LenisProvider>{/* content */}</LenisProvider>;
}
```

If `html { scroll-behavior: smooth }` exists in CSS, remove or disable it when Lenis is active (double-smoothing).

Respect `prefers-reduced-motion`: skip wrapping or set Lenis options that disable smoothing for those users.

---

## Animate UI (React)

Not an npm monolith — add components via shadcn CLI.

### One-time project setup

1. Tailwind + React/Next project
2. `npm i motion clsx tailwind-merge`
3. `cn()` helper in `@/lib/utils`
4. `components.json` with:

```json
"registries": {
  "@animate-ui": "https://animate-ui.com/r/{name}.json"
}
```

### Add a component

```bash
# By registry name
npx shadcn@latest add @animate-ui/primitives-texts-sliding-number

# Or by URL
npx shadcn@latest add "https://animate-ui.com/r/primitives-texts-sliding-number.json"
```

Browse components: [animate-ui.com](https://animate-ui.com)  
Registry index: `https://animate-ui.com/r/registry.json`

### Import pattern

```jsx
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
```

Files land under `components/animate-ui/...` — edit freely (owned code).

---

## Inspira UI (Vue / Nuxt only)

**Skip for React/Next projects.** React equivalent for this stack: Animate UI.

### Vue / Nuxt install (when applicable)

```bash
npm i -D @inspira-ui/plugins clsx tailwind-merge class-variance-authority tailwindcss-animate
npm i @vueuse/core motion-v
```

Then copy components from [inspira-ui.com](https://inspira-ui.com) / [GitHub](https://github.com/unovue/inspira-ui). Requires Tailwind (v3 historically; check current docs).

---

## Agent workflow

When user asks for motion/animated UI in NeoHub:

1. Prefer **Animate UI** components via `npx shadcn@latest add @animate-ui/...`
2. Use **Lenis** only when smooth page scroll is requested; test carousels/modals after enabling
3. Never install Inspira Vue packages into NeoHub
4. Keep animations subtle; honor `prefers-reduced-motion`
5. Match NeoHub brand tokens (`--brand-orange`, existing fonts) — don’t dump purple/glow demo styles

## Quick commands

```bash
# Lenis
npm i lenis

# Animate UI example
npx shadcn@latest add @animate-ui/primitives-texts-sliding-number

# List registry names
curl -sL https://animate-ui.com/r/registry.json | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>JSON.parse(d).items.slice(0,30).forEach(i=>console.log(i.name)))"
```
