# Design Styles Explorer

Interactive web app for exploring and previewing 43+ distinct web design aesthetics.

## Purpose

Help designers, developers, and AI assistants understand and apply different design styles. Features dual preview modes (iOS mobile app and website layout), live CSS variable exports, and Claude Code integration.

## Tech Stack

- **Framework:** React 19 + React Router 7
- **Build:** Vite 7
- **Styling:** CSS Custom Properties for dynamic theming
- **Package Manager:** npm

## Key Features

- 43+ design styles in 13 categories (Minimalist, Retro, Tech, Luxury, Organic, etc.)
- Dual preview: iOS mobile app + full website layout
- Live CSS variables for colors, typography, spacing, shadows
- Claude Code integration (copy prompts, download markdown)
- URL-based state sharing (`?style=<id>&view=app|website`)
- WCAG contrast ratio validation for iOS HIG compliance

## File Structure

```
src/
├── App.jsx                    # Main app with routing
├── App.css                    # Global styles & CSS variables
├── components/
│   ├── StyleSelector.jsx      # Left sidebar style picker
│   ├── StyleInfo.jsx          # Right sidebar with style details
│   ├── SkillsDownload.jsx     # Markdown/prompt export
│   ├── AppPreview.jsx         # iOS mobile preview
│   └── WebsitePreview.jsx     # Full website preview
└── data/
    └── styles.js              # All 43 style definitions
```

## Style Data Structure

Each style includes:
- `name`, `description`, `tags`, `examples`
- `colors` - 11 properties (bgPrimary, textPrimary, accent, border, etc.)
- `fonts` - Display, body, Japanese font stacks
- `radius`, `shadow`, optional `gradient`
- `iOSColorOverrides` - HIG compliance adjustments

## Development

```bash
npm run dev      # localhost:5173
npm run build    # Production build
npm run lint     # ESLint
```

## Adding New Styles

1. Add definition to `src/data/styles.js`
2. Add to appropriate category in `styleCategories` array
3. Optionally add style-specific CSS decorations

## Recent Changes

### iOS App Preview Redesign
- Redesigned AppPreview.jsx with authentic iOS dashboard layout inspired by Bunpo, iTalki, LinkedIn, Uber
- Components: Action banners (Learn/Review), Profile card, Stats row (3-col), Streak calendar, Progress section
- Tab bar extends to bottom with home indicator inside, active state has pill background
- Meaningful tab icons: Dashboard (house), Grammar (blocks), Decks (stacked cards), Content (book), Search (magnifier)

### Action Banner Text Contrast Fixes
Styles with light accent colors now have proper text contrast on Learn/Review banners:
| Style | Issue | Fix |
|-------|-------|-----|
| Minimalist | Black accent | White text |
| Glassmorphism | White accent | Dark text (#1a1a2e) |
| Kinetic | White accent | Black text |
| Atmospheric | White accent | Dark text (#1a1a2e) |
| Monochromatic | Light lavender | Dark text (#1A1A2E) |
| Luxury | White secondary | Dark text on Review (#0A0A0A) |
| Soft-pastel, Scandinavian, Neumorphism, etc. | Light accents | Use var(--text-primary) |

CSS overrides in `App.css` (lines ~1850-1920) target `.style-X .ios-action-banner`.

### Website Hero Full-Width Fix
22 styles had hero backgrounds constrained to 1200px max-width. Fixed by moving background to `::before` pseudo-element:
```css
.style-X .web-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background: /* original value */;
  z-index: -1;
}
```

Styles fixed: Skeuomorphic, Claymorphism, Maximalist, Collage, Flat Design, Neomorphism, Handcrafted, Soft Pastel, Playful, Corporate, Corporate Memphis, Monochromatic, Grid Modular, Academic, Outlined, Kinetic, Atmospheric, Data Viz, Isometric, Bauhaus (uses box-shadow spread), Focus Mode, Metro.

### StyleInfo.jsx Updates
- Added `iOSColorOverrides` object with banner text color recommendations
- iOS App Layout Pattern section with SwiftUI code examples
- Action Banner component with `useDarkText` parameter
- Tab bar SF Symbols configuration
- Contrast table in markdown export

## Current Focus

Completed iOS HIG compliance and website hero layout fixes.

## Status

Active development, main branch clean
