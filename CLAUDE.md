# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (first time or after pulling)
npm run dev        # dev server → http://localhost:5173/portfolio/
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Pushing to `main` auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`. No manual deploy step needed.

## Architecture

The entire application lives in **`src/App.jsx`** (~450 lines). There are no separate component files, no CSS files, no routing library, and no data files — everything is co-located.

### Data layer

Two plain JS arrays at the top of `App.jsx` drive all content:

- **`TOOLS`** (line ~29) — "Tools I've built" section, rendered first
- **`DATA_PROJECTS`** (line ~100) — "Data Portfolio" section, rendered below

Each entry in both arrays uses the same shape:
```js
{
  id, emoji, tag, title, desc,
  stats: [{ n, l }, ...],   // numeric stat + label, shown as large figures
  url,                       // primary CTA link
  cta,                       // CTA button text
  colorKey: "red"|"green"|"gold",
  dimD, dimL,                // dark/light background tint (rgba)
  borD, borL,                // dark/light border (rgba)
  githubUrl,                 // optional secondary GitHub link
}
```

**To add or reorder a project:** edit the array order directly — there is no dynamic sorting.

### Theming

Two theme objects at the top of `App.jsx`:

```js
const DARK  = { bg, surface, card, border, borderHi, gold, goldDim, goldBorder, red, green, text, muted, faint, ctaBg, ctaText, serif, sans, mono, isDark:true  }
const LIGHT = { ... isDark:false }
```

All styling uses these tokens via the `T` variable passed through props. There are no CSS classes — every element uses inline `style={{}}` objects referencing `T.*`.

Color values for the three `colorKey` options (copy-paste when adding a project):
- **red** — `dimD:"rgba(229,72,77,0.1)"`, `dimL:"rgba(200,40,43,0.07)"`, `borD:"rgba(229,72,77,0.25)"`, `borL:"rgba(200,40,43,0.18)"`
- **green** — `dimD:"rgba(46,171,104,0.1)"`, `dimL:"rgba(22,96,56,0.07)"`, `borD:"rgba(46,171,104,0.25)"`, `borL:"rgba(22,96,56,0.18)"`
- **gold** — `dimD:"rgba(201,168,76,0.1)"`, `dimL:"rgba(154,110,26,0.07)"`, `borD:"rgba(201,168,76,0.25)"`, `borL:"rgba(154,110,26,0.18)"`

### Photo

The profile photo is a base64-encoded JPEG stored as `const PHOTO` in `App.jsx`. This makes the file very large (~160k tokens). Always use `offset`/`limit` when reading the file — the data arrays are in the first ~120 lines, and the render/component code starts around line ~112.

### Live URL

`https://nikhil-thomas-a.github.io/portfolio/`

Note: Vite is configured with `base: '/portfolio/'` — all asset paths are relative to that subpath.
