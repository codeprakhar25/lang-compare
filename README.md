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

## Deployment & DNS (SST on AWS)

- **Production**: `langscompare.site` — deploys on push to `master` (GitHub Actions, stage `production`).
- **Dev**: `dev.langscompare.site` — deploy manually with `npx sst deploy --stage dev`.

### Deploy order (important)

Deploy **production first**, then dev. SST creates the Route 53 hosted zone for `langscompare.site` when you deploy production. The dev stage reuses that same zone for `dev.langscompare.site`. If you deploy dev first, you’ll get “could not find hosted zone for domain … dev.langscompare.site” because the zone doesn’t exist yet.

```bash
# 1) Create the zone and prod site
SST_STAGE=production npx sst deploy --stage production

# 2) Then add dev subdomain (uses same zone)
SST_STAGE=dev npx sst deploy --stage dev
```

### Connecting your domain (Spaceship → AWS)

The site runs on AWS (CloudFront + Lambda). SST creates a **Route 53 hosted zone** for `langscompare.site` when you first deploy **production** with the domain set. To point your Spaceship domain at AWS:

1. **Deploy production once** (so SST creates the zone): push to `master` or run `npx sst deploy --stage production`.
2. **In AWS Console** → Route 53 → Hosted zones → open `langscompare.site` and copy the **4 NS (nameserver) records** (e.g. `ns-xxx.awsdns-xx.com`).
3. **In Spaceship** → Your domain → DNS / Nameservers → **Use custom nameservers** and paste those 4 NS values. Save.
4. Wait for DNS to propagate (up to 48h, often minutes). Then deploy dev if you want: `SST_STAGE=dev npx sst deploy --stage dev`.

No need to add A/CNAME records manually — SST manages records for both the root and `dev` subdomain in that zone.

### Troubleshooting

- **“could not find hosted zone for domain … dev.langscompare.site”** — Deploy production first so the `langscompare.site` hosted zone exists; then run dev deploy again.
- **“grpc: the client connection is closing”** — Transient AWS/Pulumi error. Retry the deploy once or twice; if it keeps failing, check network/VPN and AWS credentials.
- **“astro:env getSecret” adapter warning** — The astro-sst adapter doesn’t support `getSecret`; avoid using it or use another way to pass secrets (e.g. env vars from SST).

## Design

- **Fonts**: Bebas Neue (display) + Fraunces (body) + DM Mono (code/labels)
- **Theme**: Dark editorial — deep charcoal, warm gold accents, grain texture
- **Aesthetic**: High-end tech publication / scientific instrument
