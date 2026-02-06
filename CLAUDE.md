# Design Styles Explorer

Interactive web app for exploring and previewing 43 distinct web design aesthetics.

## Purpose

Help designers, developers, and AI assistants understand and apply different design styles. Features dual preview modes (iOS mobile app and website layout), live CSS variable exports, and Claude Code integration.

## Tech Stack

- **Framework:** React 19 + React Router 7
- **Build:** Vite 7
- **Styling:** CSS Custom Properties for dynamic theming
- **Package Manager:** npm

## Key Features

- 43 design styles in 13 categories (Minimalist, Retro, Tech, Luxury, Organic, etc.)
- Dual preview: iOS mobile app + full website layout
- Live CSS variables for colors, typography, spacing, shadows
- Claude Code integration (copy prompts, download markdown)
- URL-based state sharing (`?style=<id>&view=app|website`)
- WCAG contrast ratio validation for iOS HIG compliance
- AI slop pattern warnings for styles with commonly overused patterns
- Accessibility: skip link, prefers-reduced-motion support

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
- `aiSlopWarning` - (optional) Warning about AI slop patterns in this style

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

### Preview Enhancement Pass (Feb 2026)
Comprehensive enhancement of all 43 design style previews against frontend-design skill principles.

**Website Decorations Added (12 styles):**
Previously 30 styles had decorative SVG/CSS elements; now all 42 real styles have visual identity reinforcement:
- Collage: torn paper edges, tape strips, stamp
- Handcrafted: pencil strokes, handmade stamp
- Skeuomorphic: leather texture strip, stitching line
- Monochromatic: halftone dots, gradient overlay
- Grid/Modular: visible grid lines, modular blocks
- Academic: margin rule lines, footnote marker
- Outlined: stroke-only geometric shapes (circle, square, triangle)
- Kinetic: animated motion lines, directional arrow
- Atmospheric: fog gradients, vignette overlay
- Data Viz: SVG chart polyline, dot grid
- Focus Mode: vignette, spotlight effect
- Flat Design: bold color blocks
- Metro: live tile blocks

**iOS Decorations Added (7 styles):**
Previously only 5 styles had iOS-specific decorations. Added:
- Terminal: green scanlines
- Art Deco: gold geometric border
- Memphis: zigzag, circle, dot patterns
- Neubrutalism: bold border block
- Maximalist: layered color splashes
- Kawaii: cloud, star, heart elements
- Bauhaus: primary color circle + triangle

**Under-Styled Previews Enhanced (6 styles):**
Added comprehensive CSS overrides for styles that relied only on CSS variables:
| Style | Enhancements |
|-------|-------------|
| Organic | Rounded cards, nature-inspired nav, biomorphic feature icons, organic footer |
| Wabi-Sabi | Asymmetric card borders, rough textures, muted badge, weathered sidebar |
| Dark Mode | Glow accents, colored card borders, refined focus states, glass nav |
| Y2K | Glossy gradient buttons, metallic card headers, aurora effects, inset inputs |
| Industrial | Concrete textures, hazard accents, utilitarian inputs, exposed-bolt sidebar |
| Skeuomorphic | Gradient cards, inset shadow inputs, realistic button depth, stitched sidebar |

### Accessibility & Frontend Design Skill Audit (Jan 2026)
Comprehensive review against custom frontend-design skill principles.

**Accessibility Improvements:**
- Added skip link to `App.jsx:100` for keyboard navigation
- Added `id="main-content"` to main element for skip link target
- Added `prefers-reduced-motion` CSS media query in `App.css:24-32`
- Fixed 11 instances of `gap: 6px` → `8px` for 8-point grid compliance

**AI Slop Pattern Warnings:**
Added `aiSlopWarning` property to 6 styles with patterns from the skill's "AI Slop Patterns to Avoid" list:
| Style | Warning |
|-------|---------|
| Organic | Cream bg, warm shadow, 24px radius |
| Gradient | Purple-pink gradients, colored shadows |
| Glassmorphism | Purple gradient, 16px radius |
| Collage | Cream background |
| Soft Pastel | Warm shadows, 16px radius |
| Corporate Memphis | 12px radius, Big Tech aesthetic |

StyleInfo.jsx displays amber warning box when style has `aiSlopWarning` property.

**Typography Fix:**
- Changed Dark Mode font from "Inter" (flagged as generic AI font) to "Geist" in `styles.js:929`

**Audit Results Summary:**
- 31 styles PASS with no issues
- 12 styles have AI slop patterns (intentional for their aesthetic)
- See full audit in session history for details on each style

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

Completed preview enhancement pass - all 42 real styles now have visual decorations and comprehensive CSS overrides.

## Design Skill Compliance

Project audited against custom frontend-design skill at:
`/Users/nhattran/documents/projects/claude-skills/skills/frontend/frontend-design-complete/SKILL.md`

Key compliance areas:
- [x] Skip link for keyboard navigation
- [x] `prefers-reduced-motion` support
- [x] 8-point grid spacing
- [x] Form elements consistently styled (input, select, textarea)
- [x] Glassmorphism dropdown options have solid backgrounds
- [x] WCAG contrast checking built into StyleInfo
- [x] AI slop pattern warnings displayed to users

## Status

Active development, main branch clean
