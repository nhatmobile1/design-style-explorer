# Design Styles Explorer

An interactive React application for exploring and previewing 43 different web design styles. See how the same UI looks across minimalist, brutalist, glassmorphism, cyberpunk, and many more design aesthetics.

## Features

- **43 Design Styles** - From Minimalist to Maximalist, Y2K to Cyberpunk, and everything in between
- **Live Preview** - See a mock Japanese learning app rendered in each style in real-time
- **Style Details** - View color palettes, typography, border radius, shadows, and more for each style
- **Categorized Navigation** - Styles organized into 13 categories for easy browsing

## Design Style Categories

- Minimalist & Clean
- Material & Depth
- Maximalist & Bold
- Retro & Nostalgic
- Natural & Organic
- Soft & Gentle
- Elegant & Refined
- Raw & Unconventional
- Tech & Futuristic
- Color-Focused
- Layout & Structure
- Interactive & Dynamic
- Other Notable Styles

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/design-styles-explorer.git
cd design-styles-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- CSS3 with CSS Variables

## Project Structure

```
src/
├── components/
│   ├── AppPreview.jsx    # Live preview of the selected style
│   ├── StyleInfo.jsx     # Style details panel
│   └── StyleSelector.jsx # Style navigation sidebar
├── data/
│   └── styles.js         # All 43 design style definitions
├── App.jsx               # Main app layout
├── App.css               # App styles
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## License

MIT
