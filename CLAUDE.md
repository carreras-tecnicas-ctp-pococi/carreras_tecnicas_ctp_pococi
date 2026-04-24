# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website showcasing technical careers ("carreras técnicas") offered at CTP Pococí, Limón, Costa Rica. Zero dependencies — no build step, no npm, no frameworks.

## Development

Open `index.html` directly in a browser. No server required for local development, though a simple static server helps avoid path issues:

```bash
python3 -m http.server 8000
# or
npx serve .
```

No build, lint, or test commands exist.

## Architecture

### File Structure
- `index.html` — Homepage with list of all 12 careers
- `carreras/[slug].html` — Individual career detail pages (one per career)
- `css/styles.css` — All styles (single file, CSS custom properties)
- `js/main.js` — Single `compartir()` function (Web Share API with clipboard fallback)
- `documentacion/carreras/[slug]/descripcion.md` — Source content for each career (not auto-generated; HTML is manually maintained)
- `logo.jpeg` — Institutional logo

### Adding a New Career

1. Create `documentacion/carreras/[slug]/descripcion.md` with sections: `## Descripción General`, `## Habilidades Requeridas`, `## Perfil de Salida`, `## Plan de Estudio`, `## Retos a Enfrentar`
2. Create `carreras/[slug].html` by copying an existing career page and updating content
3. Add a career card to `index.html` linking to the new page

### Design Tokens (CSS Variables)

```css
--blue: #1a237e   /* institutional dark blue — headers, hero backgrounds */
--yellow: #d4a017  /* mustard yellow — borders, CTA buttons, accents */
--red: #c0392b    /* career hero gradient accent */
--bg: #f5f5f5     /* page background */
```

### Conventions
- All naming in Spanish (HTML, CSS classes, JS functions, file paths)
- kebab-case for file names and CSS classes
- Emoji icons instead of image assets for career representations
- Semantic HTML5 with ARIA labels on interactive elements (`aria-label="Ver carrera: [name]"`)
- Mobile-first single-column layout; 2-column grid kicks in at `360px`
