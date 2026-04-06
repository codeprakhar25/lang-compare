# LangMatrix — Programming Language Comparison

> A beautiful, honest comparison of 15+ programming languages — scored on real-world metrics, not hype.

**Live site:** [langscompare.site](https://langscompare.site)

Built with Astro, deployed on AWS via SST, styled with a dark editorial aesthetic.

---

## What it is

LangMatrix lets you explore and compare programming languages across six metrics:

| Metric | What it measures |
|---|---|
| Performance | Raw execution speed and throughput |
| Memory | Memory efficiency and footprint |
| Learnability | How quickly a newcomer becomes productive |
| Dev Speed | How fast you can ship features |
| Ecosystem | Library quality, tooling, community |
| Concurrency | Async/parallel programming support |

Every score has a tooltip explaining why the language got that rating — no black boxes.

---

## Pages

### Overview (`/`)
- Card grid for all languages with animated metric bars
- Filter by category: Systems / Web / Enterprise / Scripting / General
- Sort by any metric
- Live search
- Click any metric bar to see the reasoning behind the score
- Full comparison matrix table at the bottom

### Playground (`/playground`)
- Drag-and-drop (or click) to pick any two languages side-by-side
- Interactive radar chart rendered on canvas
- Metric bar breakdown with winner badges
- Technical specs table (typing, paradigm, runtime, etc.)
- "When to choose" analysis
- Code examples for both languages

---

## Tech stack

- **[Astro](https://astro.build)** — static site framework
- **TypeScript** — all data is fully typed
- **AWS** (CloudFront + S3) — hosting via SST
- **[SST](https://sst.dev)** — infrastructure as code

---

## Local development

```bash
npm install
npm run dev       # starts at http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## Project structure

```
src/
├── data/
│   ├── languages.ts    ← All language data (ratings, pros/cons, tooltips, specs)
│   └── examples.ts     ← Code examples per language
├── components/
│   └── LanguageCard.astro
├── layouts/
│   └── Layout.astro    ← Shared nav + base styles
└── pages/
    ├── index.astro         ← Overview page
    └── playground.astro    ← Comparison playground
```

---

## Adding a language

1. Open `src/data/languages.ts` and add a new entry to the `languages` array. TypeScript will show you exactly which fields are required.
2. Add code examples in `src/data/examples.ts` under the same `id`.

That's it — no config changes needed.

---

## Contributing

PRs are welcome for:
- Adding new languages
- Fixing incorrect metric scores (include sources)
- UI improvements

**Note:** All PRs require review and are merged as squash commits. Please open an issue first for significant changes.

---

## Design

- **Fonts:** Bebas Neue (display) · Fraunces (body) · DM Mono (code/labels)
- **Theme:** Dark editorial — deep charcoal, warm gold accents, grain texture
- **Aesthetic:** High-end tech publication meets scientific instrument

---

## License

[MIT](LICENSE) — Prakhar Khatri, 2026
