# 🔷 LangMatrix — Programming Language Comparison

A beautiful, honest comparison of 15+ programming languages built with Astro.

## Features

- **Overview Page** — Card grid for all languages with:
  - 6 metric bars (performance, memory, learnability, dev speed, ecosystem, concurrency)
  - Hover tooltips with detailed explanations for every metric
  - Filter by category (Systems / Web / Enterprise / Scripting / General)
  - Sort by any metric
  - Live search
  - Full matrix table at the bottom

- **Comparison Playground** — Side-by-side comparison with:
  - Drag-and-drop from sidebar (or click) to select any two languages
  - Interactive radar chart rendered on canvas
  - Metric bar breakdown with winner badges
  - Technical specs table
  - "When to choose" analysis
  - Code examples for both languages

## File Structure

```
src/
├── data/
│   ├── languages.ts    ← All language data (ratings, pros, cons, tooltips)
│   └── examples.ts     ← Code examples per language
├── components/
│   └── LanguageCard.astro
├── layouts/
│   └── Layout.astro    ← Shared nav + base styles
└── pages/
    ├── index.astro     ← Overview page
    └── playground.astro← Comparison playground
```

## Setup

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Adding a Language

Edit `src/data/languages.ts` and add a new `Language` object to the `languages` array. All fields are typed — TypeScript will tell you what's missing.

Then add code examples in `src/data/examples.ts` under the same `id`.

## Design

- **Fonts**: Bebas Neue (display) + Fraunces (body) + DM Mono (code/labels)
- **Theme**: Dark editorial — deep charcoal, warm gold accents, grain texture
- **Aesthetic**: High-end tech publication / scientific instrument
