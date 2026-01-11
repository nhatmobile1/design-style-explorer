# Design Styles Explorer

A React application for exploring and previewing 43+ distinct web design aesthetics. Built to help designers, developers, and AI assistants understand and apply different design styles to frontend projects.

## Features

- **43+ Design Styles** organized into 13 categories (Minimalist, Retro, Tech, Luxury, etc.)
- **Dual Preview Modes**: View styles as a mobile app (iOS) or full website layout
- **Live CSS Variables**: Each style exports colors, typography, and visual properties as CSS custom properties
- **Claude Code Integration**: Copy prompts or download markdown references for AI-assisted development
- **URL-Based State**: Share specific style + view combinations via URL parameters
- **Preview-Only Mode**: Embeddable preview without the UI chrome

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## URL Parameters

The app supports URL-based navigation for easy sharing:

| Parameter | Values | Description |
|-----------|--------|-------------|
| `style` | Style ID (e.g., `minimalist`, `cyberpunk`) | Selects the design style |
| `view` | `app` or `website` | Toggles between mobile app and website preview |
| `preview` | `true` | Enables preview-only mode (hides sidebars) |

**Examples:**
```
/?style=glassmorphism&view=app
/?style=brutalist&view=website
/?style=retro-futuristic&view=app&preview=true
```

## Available Design Styles

### Minimalist & Clean
- `minimalist` - Apple, Dropbox, Stripe
- `flat-design` - Windows UI, Airbnb, Duolingo
- `swiss` - Bloomberg, gov.uk

### Material & Depth
- `glassmorphism` - macOS Big Sur, iOS, Linear
- `neomorphism` - Soft UI, Modern dashboards
- `skeuomorphic` - Early iOS, GarageBand
- `claymorphism` - 3D inflated, Play-Doh aesthetic

### Maximalist & Bold
- `maximalist` - Meow Wolf, Artist portfolios
- `memphis` - Figma illustrations, Spotify Wrapped
- `collage` - Festival websites, Zines

### Retro & Nostalgic
- `retro-futuristic` - Synthwave, 80s sci-fi
- `y2k` - Windows Vista/7, Web 2.0
- `vaporwave` - poolsuite.net, Aesthetic art
- `art-deco` - Gatsby-era, Luxury hotels

### Natural & Organic
- `organic` - Headspace, Calm, Wellness brands
- `wabi-sabi` - Aesop, Kinfolk, Japanese aesthetics
- `handcrafted` - Craft breweries, Artisan brands

### Soft & Gentle
- `soft-pastel` - Wellness, Feminine brands
- `kawaii` - Anime merchandise, Character goods
- `playful` - Children's products, Toys

### Elegant & Refined
- `luxury` - Chanel, Dior, Premium automotive
- `editorial` - NYT, Vogue, Medium
- `corporate` - IBM, Microsoft Enterprise

### Raw & Unconventional
- `brutalist` - Craigslist, Balenciaga
- `neubrutalism` - Gumroad, Figma Community
- `industrial` - Architecture firms, Manufacturing

### Tech & Futuristic
- `cyberpunk` - Cyberpunk 2077, MKBHD
- `terminal` - Dev tools, Hacker aesthetic
- `metro` - Windows Phone, Modern UI

### Color-Focused
- `monochromatic` - Photography portfolios
- `gradient` - Instagram, Stripe, Vercel
- `dark-mode` - GitHub, Discord, Spotify

### Layout & Structure
- `grid-modular` - Pinterest, Dribbble, Behance
- `academic` - Universities, Research journals
- `outlined` - Icon libraries, Line art

### Interactive & Dynamic
- `kinetic` - Apple products, Awwwards sites
- `atmospheric` - Tesla, Luxury travel
- `data-viz` - NYT graphics, FiveThirtyEight

### Other Notable Styles
- `corporate-memphis` - Facebook/Meta, Slack, Lyft
- `isometric` - Pitch.com, Loom illustrations
- `bauhaus` - Design agency portfolios
- `focus-mode` - Study apps, Productivity tools

## Project Structure

```
design-styles-explorer/
├── src/
│   ├── App.jsx              # Main app with routing and layout
│   ├── App.css              # Global styles and CSS variables
│   ├── main.jsx             # Entry point with router setup
│   ├── index.css            # Base styles
│   ├── components/
│   │   ├── StyleSelector.jsx    # Left sidebar style picker
│   │   ├── StyleInfo.jsx        # Right sidebar with details
│   │   ├── AppPreview.jsx       # iOS mobile app preview
│   │   └── WebsitePreview.jsx   # Full website preview
│   └── data/
│       └── styles.js        # Style definitions and categories
├── index.html
├── package.json
└── vite.config.js
```

## Style Data Structure

Each design style includes:

```javascript
{
  name: 'Style Name',
  description: 'Style description and philosophy',
  tags: ['Use Case 1', 'Use Case 2'],
  examples: ['Brand 1', 'Brand 2'],
  colors: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FAFAFA',
    bgTertiary: '#F5F5F5',
    textPrimary: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#0066FF',
    accentSoft: 'rgba(0, 102, 255, 0.1)',
    secondary: '#FF6600',
    border: '#E0E0E0',
    borderStrong: '#CCCCCC',
  },
  fonts: {
    display: '"Font Name", fallback',
    body: '"Font Name", fallback',
    japanese: '"Japanese Font", fallback',
  },
  radius: '8px',
  shadow: 'box-shadow value or "none"',
  // Optional properties
  gradient: 'linear-gradient(...)',
  hasGrid: true,
  hasScanlines: true,
  cardStyle: 'glass',
  buttonStyle: 'solid',
}
```

## Using with Claude Code

### Copy Prompt
Click "Copy Prompt" in the style info panel to get a formatted prompt with all style specifications for Claude.

### Download Markdown
Click "Download .md" to save a comprehensive markdown reference file that includes:
- CSS variables for all colors and typography
- Quick start instructions for Claude Code skills
- Sample prompts for applying the style

### Preview URL
Each style generates a shareable preview URL that can be referenced in prompts:
```
https://your-domain.com/?style=glassmorphism&view=website&preview=true
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Available Scripts
```bash
npm run dev      # Start dev server on localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding a New Style

1. Add style definition to `src/data/styles.js`:
```javascript
'my-new-style': {
  name: 'My New Style',
  description: '...',
  tags: ['...'],
  examples: ['...'],
  colors: { /* ... */ },
  fonts: { /* ... */ },
  radius: '...',
  shadow: '...',
}
```

2. Add to appropriate category in `styleCategories` array

3. (Optional) Add style-specific decorations in `WebsitePreview.jsx` and `AppPreview.jsx`

4. (Optional) Add style-specific CSS in `App.css` using `.style-my-new-style` selector

## Tech Stack

- [React 19](https://react.dev/) - UI framework
- [Vite 7](https://vite.dev/) - Build tool and dev server
- [React Router 7](https://reactrouter.com/) - URL-based routing and state
- CSS Custom Properties - Dynamic theming

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-style`)
3. Commit your changes (`git commit -m 'Add new style'`)
4. Push to the branch (`git push origin feature/new-style`)
5. Open a Pull Request
