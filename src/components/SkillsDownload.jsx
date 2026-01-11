import { useState } from 'react';
import JSZip from 'jszip';

// Skills content embedded for download
const skillsContent = {
  'frontend-design-complete': {
    'SKILL.md': `---
name: frontend-design-complete
description: Create distinctive, production-grade frontend interfaces with high design quality AND comprehensive mobile responsiveness. Combines aesthetic guidelines with mobile-first patterns, form consistency, and color contrast rules. Use this as your single frontend design skill.
version: 1.0.0
---

# Complete Frontend Design Guidelines

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics while ensuring proper mobile responsiveness and cross-element consistency.

---

## Part 1: Design Thinking & Aesthetics

### Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision.

### AI Slop Patterns to Avoid

**Colors to avoid:**
- Cream/off-white backgrounds (#f8f6f3, #fdfcfb, #faf8f5)
- Terracotta/coral/rust accents (#c45c48, #e07860, #d4715f)
- Orange and teal combinations
- Purple/blue gradients on white backgrounds

**Layout patterns to avoid:**
- Generous rounded corners (12-16px+)
- Left-border accent lines on cards
- Pill-shaped tabs and buttons
- The "cozy webapp" look

---

## Part 2: Mobile-First Responsive Patterns

### Hero Sections

\`\`\`css
/* Desktop: 2-column grid */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

/* Mobile: Switch to centered flex */
@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
  }
}
\`\`\`

**Key Rule**: When hiding grid columns on mobile, switch from \`display: grid\` to \`display: flex\`.

### Form Layouts

\`\`\`css
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  .form-group {
    width: 100%;
  }
}
\`\`\`

### Status/Alert Cards

\`\`\`css
@media (max-width: 768px) {
  .alert {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
\`\`\`

---

## Part 3: Form Element Consistency

### Always Style as a Group

\`\`\`css
/* CORRECT - Targets all form fields */
.input,
.select,
.textarea {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-secondary);
}
\`\`\`

### Transparent Border Styles

For Neomorphism/Claymorphism styles with transparent borders:

\`\`\`css
.radio-mark {
  border: 2px solid #B8BEC7; /* Add visible border */
  box-shadow: inset 2px 2px 4px rgba(163,177,198,0.3);
}
\`\`\`

---

## Pre-Implementation Checklist

- [ ] Hero section centers on mobile
- [ ] All form fields (input, select, textarea) styled consistently
- [ ] Radio buttons/checkboxes visible
- [ ] Grid layouts collapse to single column
- [ ] Labels use semantic color variables
- [ ] Avoided AI slop patterns
`
  },
  'color-palette': {
    'SKILL.md': `---
name: color-palette
description: Create distinctive, accessible color palettes for UI/web design that avoid generic AI aesthetics.
---

# Color Palette Creation

## When to Use This Skill

- Designing color palettes for websites, apps, or digital interfaces
- Ensuring accessibility compliance (WCAG AA/AAA)
- Breaking away from generic "AI-looking" designs

## Common AI Design Pitfalls to Avoid

- Cream/off-white backgrounds
- Terracotta/coral accents
- Orange and teal combinations
- Purple/blue gradients on white

## Color Harmony Types

- **Complementary**: Colors opposite on the wheel (high contrast)
- **Analogous**: Adjacent colors (harmonious)
- **Triadic**: Three evenly spaced colors (vibrant)
- **Split-complementary**: Base + two adjacent to complement

## Accessibility Requirements

- **WCAG AA**: 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA**: 7:1 for normal text, 4.5:1 for large text

## Domain-Specific Recommendations

### Tech/SaaS
- Cool blues, teals, purples
- High contrast for readability
- Avoid warm "friendly" palettes

### Healthcare
- Calming blues and greens
- Soft, muted tones
- High accessibility standards

### Finance
- Deep blues, greens, golds
- Conservative, trustworthy
- Strong contrast
`
  },
  'design-styles': {
    'SKILL.md': `---
name: design-styles
description: Comprehensive web design aesthetics guide with 40+ design styles.
---

# Design Styles

## Quick Reference

| Style | Key Characteristics | Best For |
|-------|---------------------|----------|
| Minimalist | Whitespace, simplicity | Professional, luxury, tech |
| Glassmorphism | Transparency, blur | Overlays, cards, modern UI |
| Neomorphism | Soft 3D, subtle shadows | Dashboards, buttons |
| Brutalist | Bare-bones, harsh | Artistic, anti-establishment |
| Art Deco | Geometric patterns, luxury | Luxury hotels, fashion |
| Cyberpunk | Dark, neon, glitch | Gaming, tech, Web3 |
| Kawaii | Chibi characters, adorable | Anime, playful apps |
| Editorial | Grid layouts, strong hierarchy | Content sites, magazines |

## How to Use

1. User mentions a style name -> Apply that style's characteristics
2. User asks for recommendations -> Match to industry/audience
3. User wants to browse -> Present style options

## Style Application

When applying a style, provide:
- Color palette with hex codes
- Typography recommendations
- Layout principles
- CSS/code examples
- Component-specific guidance
`
  }
};

function SkillsDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);

    try {
      const zip = new JSZip();
      const skillsFolder = zip.folder('claude-skills');

      // Add each skill
      Object.entries(skillsContent).forEach(([skillName, files]) => {
        const skillFolder = skillsFolder.folder(skillName);
        Object.entries(files).forEach(([fileName, content]) => {
          skillFolder.file(fileName, content);
        });
      });

      // Add README
      skillsFolder.file('README.md', `# Claude Code Custom Skills

## Installation

1. Extract this folder
2. Copy the skill folders to your Claude skills directory:
   \`\`\`bash
   cp -r * ~/.claude/skills/
   \`\`\`

Or create a symlink for easier updates:
\`\`\`bash
ln -s /path/to/claude-skills ~/.claude/skills
\`\`\`

## Usage

Invoke skills in Claude Code:
\`\`\`
/frontend-design-complete
/color-palette
/design-styles
\`\`\`

## Skills Included

- **frontend-design-complete** - All-in-one frontend design with mobile responsiveness
- **color-palette** - Accessible color palette creation
- **design-styles** - 40+ design style references
`);

      // Generate and download
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'claude-skills.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="skills-download">
      <div className="skills-download-header">
        <h3>Claude Code Skills</h3>
        <p>Get the companion skills for optimal results</p>
      </div>

      <div className="skills-download-actions">
        <button
          className="skills-download-btn skills-download-btn-primary"
          onClick={handleDownloadZip}
          disabled={isDownloading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{isDownloading ? 'Creating...' : 'Download Skills'}</span>
        </button>

        <a
          href="https://github.com/YOUR_USERNAME/claude-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="skills-download-btn skills-download-btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>

      <button
        className="skills-download-toggle"
        onClick={() => setShowInstructions(!showInstructions)}
      >
        <span>{showInstructions ? 'Hide' : 'Show'} Installation Instructions</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transform: showInstructions ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {showInstructions && (
        <div className="skills-download-instructions">
          <div className="instruction-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <strong>Download & Extract</strong>
              <p>Download the zip file and extract it to a location of your choice.</p>
            </div>
          </div>
          <div className="instruction-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <strong>Copy to Claude Skills Directory</strong>
              <code>cp -r claude-skills/* ~/.claude/skills/</code>
            </div>
          </div>
          <div className="instruction-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <strong>Invoke in Claude Code</strong>
              <code>/frontend-design-complete</code>
            </div>
          </div>
        </div>
      )}

      <div className="skills-list">
        <div className="skill-item">
          <span className="skill-name">/frontend-design-complete</span>
          <span className="skill-desc">Mobile-first design + aesthetics</span>
        </div>
        <div className="skill-item">
          <span className="skill-name">/color-palette</span>
          <span className="skill-desc">Accessible color generation</span>
        </div>
        <div className="skill-item">
          <span className="skill-name">/design-styles</span>
          <span className="skill-desc">40+ style references</span>
        </div>
      </div>
    </div>
  );
}

export default SkillsDownload;
