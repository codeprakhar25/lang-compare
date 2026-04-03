# LangMatrix Design System

## Aesthetic Intent

Dark hacker terminal meets editorial data journalism. Think: the Bloomberg terminal got a taste transplant. Dense information, zero decorative noise, lime-green accents that feel like a cursor blinking in a dark room. Every pixel earns its place.

## Color System

All colors are defined as CSS custom properties in `src/styles/globals.css`.

### Surfaces (dark to darker — use in layers)
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#080809` | Page background, outermost layer |
| `--s1` | `#0f0f11` | Card backgrounds, primary surface |
| `--s2` | `#141416` | Grid backgrounds, secondary surface |
| `--s3` | `#1c1c1f` | Inset panels, tertiary surface |
| `--s4` | `#232328` | Bar track backgrounds, deepest fill |

### Borders
| Token | Hex | Role |
|---|---|---|
| `--b1` | `#2a2a30` | Default card/element borders |
| `--b2` | `#4a4a54` | Hover/active borders, visible dividers |
| `--b3` | `#5a5a66` | High-contrast borders (focus rings, glow edges) |

### Text
| Token | Hex | WCAG on `--bg` | Role |
|---|---|---|---|
| `--tx` | `#e8e8ee` | ~15:1 | Primary text, headings |
| `--tx2` | `#bcbcc9` | ~9:1 | Secondary text, values |
| `--tx3` | `#858598` | ~5:1 | Tertiary text, labels, metadata |

`--tx3` passes WCAG AA (4.5:1) for normal text. Acceptable for labels and captions.

### Accent
| Token | Hex | Role |
|---|---|---|
| `--lime` | `#a3e635` | Primary CTA, active states, highlights |
| `--lime-dim` | `#5a7a1a` | Deprecated — do not use for text. Was ~2:1 contrast on dark bg. |

For lime text at reduced opacity, use `rgba(163, 230, 53, 0.75)` directly (e.g., use-case tags).

### Score System (unified — use these everywhere)
| Token | Hex | Role |
|---|---|---|
| `--score-high` | `#4ade80` | Scores ≥ 8, high metric bars, strengths |
| `--score-mid` | `#fbbf24` | Scores 5–7, mid metric bars |
| `--score-low` | `#f87171` | Scores < 5, low metric bars, weaknesses |

**Rule:** Use `--score-*` vars for ALL score-related color (bar fills, score labels, table pills, pro/con dots). Never hardcode `#22c55e`, `#4ade80`, `#f59e0b`, `#ef4444` etc — go through the vars so changes propagate.

### Category Colors
| CSS class | Color | Category |
|---|---|---|
| `.cat-systems` | `#f97316` (orange) | Systems languages |
| `.cat-web` | `#eab308` (yellow) | Web languages |
| `.cat-enterprise` | `#a78bfa` (purple) | Enterprise languages |
| `.cat-scripting` | `#4ade80` (green) | Scripting / AI languages |
| `.cat-general` | `#22d3ee` (cyan) | General purpose languages |

### Job Market Colors
| CSS class | Color | Level |
|---|---|---|
| `.job-very-high` | `#4ade80` | Very high demand |
| `.job-high` | `#60a5fa` | High demand |
| `.job-medium` | `#fbbf24` | Medium demand |
| `.job-low` | `#f87171` | Low demand |

## Typography

Two typefaces only. No exceptions.

| Role | Font | Usage |
|---|---|---|
| Serif | Instrument Serif | H1, H2, H3, H4, blockquotes, big numbers |
| Mono | JetBrains Mono | Everything else — body, labels, code, UI |

**Size scale used in practice:**
- 11px / tracking-[1.5–4px] — labels, metadata, badges
- 12px — secondary body, card data values
- 13px — nav
- 14px — default body
- 2xl (24px) — card headings (serif)
- 5xl (48px) — section headings (serif)
- clamp(52px, 8vw, 96px) — hero heading (serif)

## Spacing

Cards use `p-6` (24px) padding internally. Grid gap is `gap-4` (16px). Section padding is `px-8 py-20` for major sections.

## Component Rules

### Language Cards
- Background: use `lang.bgColor` (each language has a brand-specific very-dark tint)
- Border: `--b1` default, `--b2` on hover + `hover:brightness-125`
- Top edge glow: `lang.color` on hover (the thin 1px top line)
- Score bars: `--score-high/mid/low` via `barColor()` in LanguageCard.astro
- Score labels: `.score-high/.score-mid/.score-low` classes
- Use-case tags: `rgba(163,230,53,0.75)` text, `rgba(163,230,53,0.06)` bg, `rgba(163,230,53,0.18)` border

### Filter Bar (sticky)
- Two-row layout: Filter row + Sort row, each with a left label
- Active category pill: lime fill + black text
- Inactive pills: transparent + `--tx3` text, `--b1` border

### Compare Bar (floating)
- Fixed bottom-center, `--s3` background, `--b2` border
- Shows when exactly 2 languages are selected
- Dismissed via ✕ button (clears selection)

### Tooltips
- Triggered by `[data-tip]` attribute + `[data-tip-text]` value
- `--s4` background, `--b2` border, `--tx2` text
- Appears above the element, centered

## Contrast Reference

| Use | Foreground | Background | Ratio | WCAG |
|---|---|---|---|---|
| Primary text | `--tx` #e8e8ee | `--bg` #080809 | ~15:1 | AAA |
| Secondary text | `--tx2` #bcbcc9 | `--bg` #080809 | ~9:1 | AA |
| Labels | `--tx3` #858598 | `--bg` #080809 | ~5:1 | AA |
| Lime CTA | `#a3e635` | `--bg` #080809 | ~8:1 | AA |
| Use-case tags | `rgba(163,230,53,0.75)` | card bg ~#0f0f11 | ~5.5:1 | AA |
| Score high | `--score-high` #4ade80 | `--bg` #080809 | ~7:1 | AA |
| Score mid | `--score-mid` #fbbf24 | `--bg` #080809 | ~8:1 | AA |
| Score low | `--score-low` #f87171 | `--bg` #080809 | ~5:1 | AA |

## What Not to Do

- Don't use `--lime-dim` for text — it's ~2:1 contrast on dark backgrounds
- Don't add new hardcoded hex colors — extend the CSS variable system
- Don't introduce new typefaces — mono + serif covers everything
- Don't add border-radius beyond `rounded-lg` on cards or `rounded` on small elements
- Don't use `text-center` globally — this isn't a landing page, information is left-aligned
- Don't add decorative gradients or blobs — the dot grid pattern on `body` is enough ambient texture
