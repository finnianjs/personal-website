# Personal Website — CLAUDE.md

## Project Overview

A personal website with a minimalistic retro cyberpunk aesthetic — clean, precise, and "hacker" in vibe. Think monospace fonts, terminal-like UI elements, a dark color palette with neon accent colors, and sharp geometric layouts. No clutter, no noise.

## Tech Stack

- **Framework**: [Astro](https://astro.build) — static site generator with component islands
- **Styling**: [Tailwind CSS](https://tailwindcss.com) — utility-first CSS via the `@astrojs/tailwind` integration
- **Deployment**: GitHub Pages with a custom domain (CNAME file in `public/`)
- **Package Manager**: Use `npm` unless instructed otherwise

## Design Philosophy

### Aesthetic
- **Retro cyberpunk**: dark backgrounds (near-black), neon accent colors (green `#00ff41`, cyan `#00d4ff`, or magenta `#ff00ff`), subtle scanline or grid effects
- **Minimalist**: only what's necessary on screen — no decorative bloat, no gradients for their own sake, no stock imagery
- **Hacker vibe**: monospace typography throughout, terminal-style elements, subtle glitch/flicker animations used sparingly
- **Clean**: consistent spacing, strict alignment, intentional whitespace

### Typography
- Body and UI: monospace font (e.g., `JetBrains Mono`, `Fira Code`, or system monospace)
- No serif or decorative fonts
- Keep font sizes and weights restrained — let spacing do the work

### Color Palette (reference)
- Background: `#0a0a0a` or `#0d0d0d`
- Surface: `#111111` or `#151515`
- Border/subtle: `#1a1a1a` or `#222222`
- Primary accent: `#00ff41` (matrix green) or `#00d4ff` (cyan)
- Muted text: `#555555` or `#666666`
- Body text: `#cccccc` or `#e0e0e0`

### Interaction
- Hover states: neon glow (`box-shadow` or `text-shadow` with accent color)
- Transitions: fast (150–200ms), subtle
- No animations for their own sake — every animation should serve a purpose
- Cursor: default unless a custom cursor meaningfully adds to the aesthetic

## Astro Conventions

### Project Structure
```
src/
  components/    # Reusable .astro components
  layouts/       # Page layout wrappers
  pages/         # File-based routing — each .astro file = a route
  styles/        # Global CSS (imported in layouts)
  content/       # Content collections if using markdown
public/
  CNAME          # Custom domain for GitHub Pages
  favicon.*      # Favicon assets
astro.config.mjs
tailwind.config.mjs
```

### Component Guidelines
- Prefer `.astro` components for static/layout work
- Use framework components (React/Svelte/etc.) only when interactivity requires client-side state — and only with the appropriate `client:*` directive
- Keep components small and single-purpose
- Co-locate component styles using `<style>` blocks when Tailwind isn't sufficient

### Astro Config
- Set `output: 'static'` (default) for GitHub Pages
- Set `site` and `base` in `astro.config.mjs` for correct GitHub Pages URL resolution:
  ```js
  export default defineConfig({
    site: 'https://yourdomain.com',
    integrations: [tailwind()],
  });
  ```
- Use `import.meta.env` for environment variables — never hardcode secrets

### Performance
- Astro ships zero JS by default — keep it that way unless interaction demands it
- Prefer CSS animations over JS animations
- Optimize images with Astro's built-in `<Image />` component
- Keep page weight lean — no heavy third-party libraries unless essential

## Tailwind Conventions

> **Note:** This project uses **Tailwind CSS v4**, which uses a CSS-based configuration instead of `tailwind.config.mjs`.

### Configuration (v4)
- Design tokens (colors, fonts, spacing) are defined in `src/styles/global.css` using `@theme { ... }` — not in a JS config file
- Example:
  ```css
  @theme {
    --color-accent: #00ff41;
    --font-mono: "JetBrains Mono", monospace;
  }
  ```
- Reference tokens in Tailwind classes as `text-[var(--color-accent)]` or define them as theme keys for shorthand utilities
- Use `@layer base` in global CSS for base resets and element defaults
- The Vite plugin `@tailwindcss/vite` is used instead of a PostCSS plugin

### Usage
- Prefer Tailwind utilities over custom CSS — only write custom CSS when Tailwind can't express the style
- For complex reusable patterns, use `@apply` sparingly in component `<style>` blocks
- Avoid `!important` — fix specificity at the root instead

## GitHub Pages Deployment

### Setup
- The repo must be named `<username>.github.io` for a user site, or configure the Pages source to the `gh-pages` branch / `docs/` folder for a project site
- Add a `CNAME` file to `public/` containing only the custom domain:
  ```
  yourdomain.com
  ```
- Set the custom domain in the GitHub repo settings under Pages

### GitHub Actions Workflow
Use the official Astro deploy action. Example `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - id: deployment
        uses: actions/deploy-pages@v4
```

### DNS
- For apex domains: add `A` records pointing to GitHub's IPs (`185.199.108.153` etc.) and a `CNAME` for `www`
- For subdomains: add a `CNAME` record pointing to `<username>.github.io`
- Enable "Enforce HTTPS" in GitHub Pages settings once DNS propagates

## Code Style

- No trailing whitespace, consistent 2-space indentation
- Keep markup semantic — use `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` appropriately
- Prefer explicit, readable class names in components over deeply nested selectors
- No dead code, no commented-out blocks left in production files
- Keep `astro.config.mjs` and `tailwind.config.mjs` clean and minimal

## Content Guidelines

- Writing should be terse, direct, and clear — no marketing fluff
- Dates and metadata should be machine-readable (ISO 8601) and human-readable
- All external links open in a new tab with `rel="noopener noreferrer"`

## What to Avoid

- Heavy JavaScript frameworks where plain Astro will do
- CSS resets that fight Tailwind's preflight
- Inline styles (prefer Tailwind classes or `<style>` blocks)
- Generic, template-looking layouts — every page should feel intentional
- Light mode (dark-only is fine for a cyberpunk aesthetic; if light mode is added, use `prefers-color-scheme`)
- Animations that run on every scroll or cause layout shift
