import { useState } from 'react';
import { styleData } from '../data/styles';

// ============================================
// iOS HIG Compliance Utilities (for iOS prompt only)
// ============================================

// Calculate relative luminance for contrast ratio
const getLuminance = (hex) => {
  if (!hex || hex === 'transparent') return 1;
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      return calculateLuminance(r, g, b);
    }
    return 0.5;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return calculateLuminance(r, g, b);
};

const calculateLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate WCAG contrast ratio
const getContrastRatio = (color1, color2) => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// iOS-specific color adjustments for HIG compliance
const iOSColorOverrides = {
  'neomorphism': {
    reason: 'Low contrast and transparent borders',
    overrides: {
      textPrimary: '#1A2A3A',
      textSecondary: '#3A4A5A',
      border: '#C0C5CC',
      borderStrong: '#A0A5AC',
    }
  },
  'glassmorphism': {
    reason: 'Variable contrast on transparent backgrounds',
    overrides: {
      bgSecondary: 'rgba(255, 255, 255, 0.85)',
      textSecondary: 'rgba(255, 255, 255, 0.9)',
    }
  },
  'soft-pastel': {
    reason: 'Low accent contrast on light background',
    overrides: {
      accent: '#C4788E',
      accentSoft: 'rgba(196, 120, 142, 0.25)',
    }
  },
  'kawaii': {
    reason: 'Low accent contrast on light background',
    overrides: {
      accent: '#E5458A',
      textSecondary: '#6A4A5A',
    }
  },
  'claymorphism': {
    reason: 'Transparent borders make form controls invisible',
    overrides: {
      border: '#D4C8E8',
      borderStrong: '#B8A8D8',
    }
  },
  'atmospheric': {
    reason: 'Tertiary text too low contrast',
    overrides: {
      textTertiary: 'rgba(255, 255, 255, 0.6)',
    }
  },
  'vaporwave': {
    reason: 'Some text colors too low contrast',
    overrides: {
      textTertiary: '#D090E0',
    }
  },
  'terminal': {
    reason: 'Pure green can cause eye strain; add secondary colors',
    note: 'Consider using cyan (#00FFFF) for links and amber (#FFB000) for warnings to avoid color-only information',
  },
  'retro-futuristic': {
    reason: 'Pure neon colors can cause visual strain',
    note: 'Consider reducing saturation slightly for extended use',
  },
};

// Check if style has HIG compliance issues
const getHIGComplianceStatus = (styleKey, colors) => {
  const issues = [];

  // Check text contrast on primary background
  const textContrast = getContrastRatio(colors.textPrimary, colors.bgPrimary);
  if (textContrast < 4.5) {
    issues.push({ type: 'contrast', message: `Primary text contrast ${textContrast.toFixed(1)}:1 (needs 4.5:1)` });
  }

  const secondaryContrast = getContrastRatio(colors.textSecondary, colors.bgPrimary);
  if (secondaryContrast < 4.5) {
    issues.push({ type: 'contrast', message: `Secondary text contrast ${secondaryContrast.toFixed(1)}:1 (needs 4.5:1)` });
  }

  // Check for transparent borders
  if (colors.border === 'transparent' || colors.border === 'rgba(0,0,0,0)') {
    issues.push({ type: 'visibility', message: 'Transparent borders - form controls may be invisible' });
  }

  // Check if we have overrides for this style
  const hasOverrides = iOSColorOverrides[styleKey];

  return {
    isCompliant: issues.length === 0 && !hasOverrides,
    issues,
    hasOverrides: !!hasOverrides,
    overrideInfo: hasOverrides,
  };
};

function StyleInfo({ selectedStyle, viewMode }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [promptType, setPromptType] = useState('web'); // 'web' or 'ios'

  const style = styleData[selectedStyle];

  if (!style) {
    return (
      <div className="style-info">
        <p>Select a style to see details</p>
      </div>
    );
  }

  const getPreviewUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?style=${selectedStyle}&view=${viewMode}&preview=true`;
  };

  const generatePrompt = () => {
    // Build special effects list
    const specialEffects = [];
    if (style.hasGrid) specialEffects.push('Grid overlay');
    if (style.hasScanlines) specialEffects.push('Scanlines effect');
    if (style.hasNoise) specialEffects.push('Noise texture');
    if (style.hasGrain) specialEffects.push('Film grain');
    if (style.gradient) specialEffects.push('Gradient background');

    return `I'd like you to create a frontend interface using the "${style.name}" design style.

Reference URL: ${getPreviewUrl()}

## Style Specifications

**Design Philosophy:** ${style.description}

**Color Palette:**
- Background Primary: ${style.colors.bgPrimary}
- Background Secondary: ${style.colors.bgSecondary}
- Background Tertiary: ${style.colors.bgTertiary}
- Text Primary: ${style.colors.textPrimary}
- Text Secondary: ${style.colors.textSecondary}
- Text Tertiary: ${style.colors.textTertiary}
- Accent: ${style.colors.accent}
- Accent Soft: ${style.colors.accentSoft}
- Secondary: ${style.colors.secondary}
- Border: ${style.colors.border}
- Border Strong: ${style.colors.borderStrong}

**Typography:**
- Display Font: ${style.fonts.display}
- Body Font: ${style.fonts.body}
- Japanese Font: ${style.fonts.japanese}

**Visual Properties:**
- Border Radius: ${style.radius}
- Shadow: ${style.shadow}
${style.gradient ? `- Gradient: ${style.gradient}` : ''}
${specialEffects.length > 0 ? `- Special Effects: ${specialEffects.join(', ')}` : ''}

**Form Elements:**
- Apply consistent styling to inputs, selects, and textareas
- Use the same border-radius, border, and background for all form fields
- Ensure proper contrast for text and placeholder colors
- Style radio buttons and checkboxes to match the design aesthetic
${style.colors.border === 'transparent' ? '- Note: This style uses transparent borders - add visible borders or shadows to form controls' : ''}

**Mobile Responsive Requirements:**
- Hero section: Center all content on mobile (text-align: center, align-items: center)
- Convert 2-column grid layouts to single column on mobile
- Stack form fields vertically on smaller screens
- Center status/alert cards with consistent alignment
- Use flex-direction: column for navigation on mobile

**Best Used For:** ${style.tags.join(', ')}
**Examples:** ${style.examples.join(', ')}

Please apply this design style to the interface I'm building. Ensure the design is fully mobile responsive.`;
  };

  const generateiOSPrompt = () => {
    // Convert hex to SwiftUI Color format
    const hexToSwiftUI = (hex) => {
      if (hex.startsWith('rgba')) {
        const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
        if (match) {
          const [, r, g, b, a] = match;
          return `Color(red: ${(parseInt(r)/255).toFixed(3)}, green: ${(parseInt(g)/255).toFixed(3)}, blue: ${(parseInt(b)/255).toFixed(3)}, opacity: ${a || 1})`;
        }
      }
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      return `Color(red: ${(r/255).toFixed(3)}, green: ${(g/255).toFixed(3)}, blue: ${(b/255).toFixed(3)})`;
    };

    // Determine if style is dark or light
    const bgLuminance = (hex) => {
      if (hex.startsWith('rgba') || hex.startsWith('rgb')) return 0.5;
      const r = parseInt(hex.slice(1,3), 16) / 255;
      const g = parseInt(hex.slice(3,5), 16) / 255;
      const b = parseInt(hex.slice(5,7), 16) / 255;
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };
    const isDarkStyle = bgLuminance(style.colors.bgPrimary) < 0.5;

    // Get HIG compliance status and any overrides
    const higStatus = getHIGComplianceStatus(selectedStyle, style.colors);
    const overrideData = iOSColorOverrides[selectedStyle];

    // Merge original colors with iOS-safe overrides
    const iOSColors = overrideData?.overrides
      ? { ...style.colors, ...overrideData.overrides }
      : style.colors;

    // Build HIG warning section if needed
    let higWarningSection = '';
    if (!higStatus.isCompliant || overrideData) {
      higWarningSection = `
---

## ⚠️ HIG Compliance Adjustments

This style required modifications for iOS HIG compliance:

**Reason:** ${overrideData?.reason || 'Contrast ratio issues detected'}

${overrideData?.overrides ? `**Color Overrides Applied:**
${Object.entries(overrideData.overrides).map(([key, value]) => `- \`${key}\`: \`${style.colors[key]}\` → \`${value}\``).join('\n')}` : ''}

${overrideData?.note ? `**Note:** ${overrideData.note}` : ''}

${higStatus.issues.length > 0 ? `**Detected Issues:**
${higStatus.issues.map(i => `- ${i.message}`).join('\n')}` : ''}
`;
    }

    return `I'd like you to create an iOS app interface using the "${style.name}" design style with SwiftUI.

Reference URL: ${getPreviewUrl()}

## Style Specifications

**Design Philosophy:** ${style.description}

**Best Used For:** ${style.tags.join(', ')}

${!higStatus.isCompliant ? `**⚠️ iOS HIG Status:** This style has been adjusted for HIG compliance. See adjustments below.` : `**✅ iOS HIG Status:** This style meets accessibility requirements.`}
${higWarningSection}
---

## HIG-Compliant Color System

Create a custom color scheme that adapts to light/dark mode:

\`\`\`swift
// Colors.swift
import SwiftUI

extension Color {
    // MARK: - ${style.name} Theme Colors (iOS HIG-Adjusted)

    static let themePrimary = ${hexToSwiftUI(iOSColors.bgPrimary)}
    static let themeSecondary = ${hexToSwiftUI(iOSColors.bgSecondary)}
    static let themeTertiary = ${hexToSwiftUI(iOSColors.bgTertiary)}

    static let themeTextPrimary = ${hexToSwiftUI(iOSColors.textPrimary)}
    static let themeTextSecondary = ${hexToSwiftUI(iOSColors.textSecondary)}
    static let themeTextTertiary = ${hexToSwiftUI(iOSColors.textTertiary)}

    static let themeAccent = ${hexToSwiftUI(iOSColors.accent)}
    static let themeAccentSoft = ${hexToSwiftUI(iOSColors.accentSoft)}
    static let themeBorder = ${hexToSwiftUI(iOSColors.border)}
}

// For production, use Asset Catalog colors that support light/dark mode:
// Color("ThemePrimary") instead of hardcoded values
\`\`\`

---

## Typography (Dynamic Type Support)

Use system text styles that scale with user preferences:

\`\`\`swift
// REQUIRED: Use semantic font styles, NOT fixed sizes
Text("Page Title")
    .font(.largeTitle)
    .fontWeight(.bold)

Text("Section Header")
    .font(.headline)

Text("Body Content")
    .font(.body)

Text("Caption/Metadata")
    .font(.caption)
    .foregroundColor(.secondary)

// For custom fonts, use relativeTo: for Dynamic Type scaling
Text("Custom Title")
    .font(.custom("${style.fonts.display.split(',')[0].replace(/"/g, '')}", size: 28, relativeTo: .title))
\`\`\`

---

## HIG Compliance Requirements

### Layout & Spacing
- [ ] Minimum 44x44pt tap targets for all interactive elements
- [ ] Use system spacing: \`.padding()\` for standard, \`.padding(.horizontal)\` for directional
- [ ] Respect safe areas - use \`.safeAreaInset()\` for persistent content
- [ ] Use NavigationStack (not deprecated NavigationView)

### Colors & Dark Mode
- [ ] ${isDarkStyle ? 'This is a dark theme - ensure it works in both light AND dark system modes' : 'This is a light theme - create dark mode variant for system dark mode'}
- [ ] Use semantic colors where possible: \`.primary\`, \`.secondary\`, \`Color(.systemBackground)\`
- [ ] Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- [ ] Never convey information by color alone

### Accessibility
- [ ] All icon-only buttons need \`.accessibilityLabel("Description")\`
- [ ] Use \`.accessibilityAddTraits(.isButton)\` for custom tap gestures
- [ ] Test with VoiceOver enabled
- [ ] Test at largest Dynamic Type size (Accessibility XXXL)

---

## SwiftUI Component Examples

### Card Component
\`\`\`swift
struct ${style.name.replace(/[^a-zA-Z]/g, '')}Card<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding()
            .background(Color.themeSecondary)
            .cornerRadius(${parseInt(style.radius) || 0})
            ${style.shadow !== 'none' ? '.shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)' : '// No shadow for this style'}
            .overlay(
                RoundedRectangle(cornerRadius: ${parseInt(style.radius) || 0})
                    .stroke(Color.themeBorder, lineWidth: 1)
            )
    }
}
\`\`\`

### Button Style
\`\`\`swift
struct ${style.name.replace(/[^a-zA-Z]/g, '')}ButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundColor(${isDarkStyle ? 'Color.themeTextPrimary' : '.white'})
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .frame(minWidth: 44, minHeight: 44) // HIG minimum tap target
            .background(Color.themeAccent)
            .cornerRadius(${parseInt(style.radius) || 0})
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}
\`\`\`

### Form Field
\`\`\`swift
struct ${style.name.replace(/[^a-zA-Z]/g, '')}TextField: View {
    let title: String
    @Binding var text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.subheadline)
                .foregroundColor(.themeTextSecondary)

            TextField("", text: $text)
                .font(.body)
                .padding(12)
                .background(Color.themeTertiary)
                .cornerRadius(${parseInt(style.radius) || 0})
                .overlay(
                    RoundedRectangle(cornerRadius: ${parseInt(style.radius) || 0})
                        .stroke(Color.themeBorder, lineWidth: 1)
                )
        }
    }
}
\`\`\`

---

## Testing Checklist

Before considering the UI complete:

1. **VoiceOver**: Navigate entire UI with VoiceOver enabled
2. **Dynamic Type**: Test at Settings → Accessibility → Larger Text → Maximum
3. **Dark Mode**: Toggle system appearance and verify all elements
4. **Reduce Motion**: Ensure animations respect \`accessibilityReduceMotion\`
5. **Device Sizes**: Test on smallest (iPhone SE) and largest (iPhone Pro Max) devices

---

## Skills to Invoke

\`\`\`
/ios-development
/ios-ui-review
\`\`\`

Please apply this design style following Apple's Human Interface Guidelines.`;
  };

  const handleCopyPrompt = async () => {
    try {
      const prompt = promptType === 'ios' ? generateiOSPrompt() : generatePrompt();
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const generateMarkdown = () => {
    // Build special effects list
    const specialEffects = [];
    if (style.hasGrid) specialEffects.push('Grid overlay');
    if (style.hasScanlines) specialEffects.push('Scanlines effect');
    if (style.hasNoise) specialEffects.push('Noise texture');
    if (style.hasGrain) specialEffects.push('Film grain');

    return `# ${style.name} Design Style Reference

> Use this reference with Claude Code to apply the ${style.name} design aesthetic to your frontend projects.

## Quick Start

Before starting your project, invoke the following skills in Claude Code:

**For Web/Frontend:**
\`\`\`
/frontend-design-complete
/color-palette
/design-styles
\`\`\`

**For iOS/SwiftUI:**
\`\`\`
/ios-development
/ios-ui-review
\`\`\`

Then share this document or paste the specifications below.

---

## Reference URL

\`\`\`
${getPreviewUrl()}
\`\`\`

---

## Design Philosophy

${style.description}

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| \`--bg-primary\` | \`${style.colors.bgPrimary}\` | Main background |
| \`--bg-secondary\` | \`${style.colors.bgSecondary}\` | Card/section backgrounds |
| \`--bg-tertiary\` | \`${style.colors.bgTertiary}\` | Subtle backgrounds |
| \`--text-primary\` | \`${style.colors.textPrimary}\` | Headings, main text |
| \`--text-secondary\` | \`${style.colors.textSecondary}\` | Body text |
| \`--text-tertiary\` | \`${style.colors.textTertiary}\` | Muted text |
| \`--accent\` | \`${style.colors.accent}\` | Primary actions, highlights |
| \`--accent-soft\` | \`${style.colors.accentSoft}\` | Subtle accent backgrounds |
| \`--secondary\` | \`${style.colors.secondary}\` | Secondary highlights |
| \`--border\` | \`${style.colors.border}\` | Default borders |
| \`--border-strong\` | \`${style.colors.borderStrong}\` | Emphasized borders |

### CSS Variables

\`\`\`css
:root {
  --bg-primary: ${style.colors.bgPrimary};
  --bg-secondary: ${style.colors.bgSecondary};
  --bg-tertiary: ${style.colors.bgTertiary};
  --text-primary: ${style.colors.textPrimary};
  --text-secondary: ${style.colors.textSecondary};
  --text-tertiary: ${style.colors.textTertiary};
  --accent: ${style.colors.accent};
  --accent-soft: ${style.colors.accentSoft};
  --secondary: ${style.colors.secondary};
  --border: ${style.colors.border};
  --border-strong: ${style.colors.borderStrong};
  --radius: ${style.radius};
  --shadow: ${style.shadow};
  --font-display: ${style.fonts.display};
  --font-body: ${style.fonts.body};
}
\`\`\`

---

## Typography

| Type | Font Stack |
|------|------------|
| Display | \`${style.fonts.display}\` |
| Body | \`${style.fonts.body}\` |
| Japanese | \`${style.fonts.japanese}\` |

---

## Visual Properties

| Property | Value |
|----------|-------|
| Border Radius | \`${style.radius}\` |
| Shadow | \`${style.shadow}\` |
${style.gradient ? `| Gradient | \`${style.gradient}\` |` : ''}
${specialEffects.length > 0 ? specialEffects.map(e => `| ${e} | Yes |`).join('\n') : ''}

---

## Form Elements

Apply consistent styling across all form controls:

\`\`\`css
/* Base form field styles */
.input,
.select,
.textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-primary);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 14px;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input::placeholder,
.textarea::placeholder {
  color: var(--text-tertiary);
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

/* Labels */
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

/* Radio buttons */
.radio-mark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-radius: 50%;
  position: relative;
}

.radio input:checked + .radio-mark {
  border-color: var(--accent);
}

.radio input:checked + .radio-mark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
}
\`\`\`
${style.colors.border === 'transparent' ? `
> **Note:** This style uses transparent borders. Add visible borders or use shadows/background colors to make form controls visible.
` : ''}

---

## Mobile Responsive Design

### Key Breakpoints

\`\`\`css
/* Tablet */
@media (max-width: 1200px) {
  /* Stack sidebars below main content */
}

/* Mobile */
@media (max-width: 768px) {
  /* Full single-column layout */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* Compact spacing and font sizes */
}
\`\`\`

### Mobile Layout Guidelines

\`\`\`css
/* Hero Section - Center on mobile */
@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 32px;
    text-align: center;
  }

  .hero-subtitle {
    font-size: 14px;
    text-align: center;
  }

  .hero-cta {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .hero-cta .btn {
    width: 100%;
    max-width: 280px;
  }
}

/* Form Layout - Stack on mobile */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    width: 100%;
  }
}

/* Status/Alert Cards - Center content */
@media (max-width: 768px) {
  .alert {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
}

/* Grid Layouts - Single column */
@media (max-width: 768px) {
  .pricing-grid,
  .feature-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
}
\`\`\`

---

## Use Cases

**Best for:** ${style.tags.join(', ')}

**Examples:** ${style.examples.join(', ')}

---

## Sample Prompt for Claude Code

\`\`\`
I'd like you to create a frontend interface using the "${style.name}" design style.

Please use the /frontend-design-complete and /color-palette skills to ensure high-quality,
distinctive design that avoids generic AI aesthetics and is fully mobile responsive.

Apply these specifications:
- Colors: Use the CSS variables defined in this reference
- Typography: ${style.fonts.display.split(',')[0].replace(/"/g, '')} for headings, ${style.fonts.body.split(',')[0].replace(/"/g, '')} for body
- Border radius: ${style.radius}
- Shadow style: ${style.shadow === 'none' ? 'No shadows' : 'Custom shadows as specified'}
${style.gradient ? `- Use gradient background: ${style.gradient}` : ''}
${specialEffects.length > 0 ? `- Special effects: ${specialEffects.join(', ')}` : ''}

Form elements requirements:
- Style inputs, selects, and textareas consistently
- Ensure proper contrast for labels and placeholder text
- Style radio buttons and checkboxes to match the aesthetic

Mobile responsive requirements:
- Center hero content on mobile
- Stack form fields vertically
- Use single-column layouts for grids
- Center status/alert cards

Design philosophy: ${style.description}
\`\`\`

---

## iOS App Development

For iOS/SwiftUI implementations, invoke these skills:

\`\`\`
/ios-development
/ios-ui-review
\`\`\`

### SwiftUI Color Extension

\`\`\`swift
import SwiftUI

extension Color {
    // ${style.name} Theme
    static let themePrimary = Color(hex: "${style.colors.bgPrimary}")
    static let themeSecondary = Color(hex: "${style.colors.bgSecondary}")
    static let themeAccent = Color(hex: "${style.colors.accent}")
    static let themeTextPrimary = Color(hex: "${style.colors.textPrimary}")
    static let themeTextSecondary = Color(hex: "${style.colors.textSecondary}")
    static let themeBorder = Color(hex: "${style.colors.border}")
}
\`\`\`

### HIG Requirements Checklist

- [ ] Minimum 44x44pt tap targets
- [ ] Dynamic Type support (use \`.font(.headline)\` not fixed sizes)
- [ ] Semantic colors for dark mode support
- [ ] Accessibility labels on icon-only buttons
- [ ] Test with VoiceOver and largest text size

---

*Generated from Design Styles Explorer*
`;
  };

  const handleDownloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedStyle}-design-style.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUrlFocus = (e) => {
    e.target.select();
  };

  const colorPairs = [
    { name: 'Background', colors: [style.colors.bgPrimary, style.colors.bgSecondary, style.colors.bgTertiary] },
    { name: 'Text', colors: [style.colors.textPrimary, style.colors.textSecondary, style.colors.textTertiary] },
    { name: 'Accent', colors: [style.colors.accent, style.colors.accentSoft, style.colors.secondary] },
    { name: 'Border', colors: [style.colors.border, style.colors.borderStrong] },
  ];

  return (
    <div className="style-info">
      <div className="style-info-header">
        <h2>{style.name}</h2>
        <div className="style-tags">
          {style.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <p className="style-description">{style.description}</p>

      {/* Preview URL */}
      <div className="style-url-section">
        <label className="style-url-label">Preview URL</label>
        <input
          type="text"
          className="style-url-input"
          value={getPreviewUrl()}
          readOnly
          onFocus={handleUrlFocus}
        />
      </div>

      {/* Platform Toggle */}
      <div className="platform-toggle">
        <button
          className={`platform-toggle-btn ${promptType === 'web' ? 'active' : ''}`}
          onClick={() => setPromptType('web')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Web
        </button>
        <button
          className={`platform-toggle-btn ${promptType === 'ios' ? 'active' : ''}`}
          onClick={() => setPromptType('ios')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          iOS
        </button>
      </div>

      {/* HIG Compliance Indicator (iOS only) */}
      {promptType === 'ios' && (() => {
        const higStatus = getHIGComplianceStatus(selectedStyle, style.colors);
        const hasOverrides = iOSColorOverrides[selectedStyle];
        return (
          <div className={`hig-compliance-badge ${higStatus.isCompliant && !hasOverrides ? 'compliant' : 'adjusted'}`}>
            {higStatus.isCompliant && !hasOverrides ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>HIG Compliant</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Colors Adjusted for HIG</span>
              </>
            )}
          </div>
        );
      })()}

      {/* Action Buttons */}
      <div className="style-actions">
        <button className="style-action-btn" onClick={handleCopyPrompt} title={`Copy ${promptType === 'ios' ? 'iOS' : 'Web'} prompt for Claude`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {copiedPrompt ? (
              <polyline points="20 6 9 17 4 12" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
          <span>{copiedPrompt ? 'Copied!' : `Copy ${promptType === 'ios' ? 'iOS' : 'Web'} Prompt`}</span>
        </button>
        <button className="style-action-btn style-action-btn-primary" onClick={handleDownloadMarkdown} title="Download markdown reference">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download .md</span>
        </button>
      </div>

      <div className="style-examples">
        <h4>Examples</h4>
        <div className="examples-list">
          {style.examples.map((example) => (
            <span key={example} className="example">{example}</span>
          ))}
        </div>
      </div>

      <div className="color-palette">
        <h4>Color Palette</h4>
        {colorPairs.map((pair) => (
          <div key={pair.name} className="color-row">
            <span className="color-label">{pair.name}</span>
            <div className="color-swatches">
              {pair.colors.map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ background: color }}
                  title={color}
                >
                  <span className="color-value">{color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="style-properties">
        <h4>Properties</h4>
        <div className="property">
          <span className="property-label">Border Radius</span>
          <span className="property-value">{style.radius}</span>
        </div>
        <div className="property">
          <span className="property-label">Shadow</span>
          <span className="property-value">{style.shadow === 'none' ? 'None' : 'Custom'}</span>
        </div>
        <div className="property">
          <span className="property-label">Display Font</span>
          <span className="property-value">{style.fonts.display.split(',')[0].replace(/"/g, '')}</span>
        </div>
        <div className="property">
          <span className="property-label">Body Font</span>
          <span className="property-value">{style.fonts.body.split(',')[0].replace(/"/g, '')}</span>
        </div>
        {style.gradient && (
          <div className="property">
            <span className="property-label">Gradient</span>
            <div className="gradient-preview" style={{ background: style.gradient }} />
          </div>
        )}
        {style.hasGrid && (
          <div className="property">
            <span className="property-label">Grid Effect</span>
            <span className="property-value">Yes</span>
          </div>
        )}
        {style.hasScanlines && (
          <div className="property">
            <span className="property-label">Scanlines</span>
            <span className="property-value">Yes</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StyleInfo;
