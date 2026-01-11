import { useState } from 'react';
import { styleData } from '../data/styles';

function StyleInfo({ selectedStyle, viewMode }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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
${style.hasGrid ? '- Grid Effect: Yes' : ''}
${style.hasScanlines ? '- Scanlines: Yes' : ''}

**Best Used For:** ${style.tags.join(', ')}
**Examples:** ${style.examples.join(', ')}

Please apply this design style to the interface I'm building.`;
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const generateMarkdown = () => {
    return `# ${style.name} Design Style Reference

> Use this reference with Claude Code to apply the ${style.name} design aesthetic to your frontend projects.

## Quick Start

Before starting your project, invoke the following skills in Claude Code:

\`\`\`
/frontend-design
/color-palette
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
}
\`\`\`

---

## Typography

| Type | Font Stack |
|------|------------|
| Display | \`${style.fonts.display}\` |
| Body | \`${style.fonts.body}\` |
| Japanese | \`${style.fonts.japanese}\` |

### CSS

\`\`\`css
:root {
  --font-display: ${style.fonts.display};
  --font-body: ${style.fonts.body};
  --font-japanese: ${style.fonts.japanese};
}
\`\`\`

---

## Visual Properties

| Property | Value |
|----------|-------|
| Border Radius | \`${style.radius}\` |
| Shadow | \`${style.shadow}\` |
${style.gradient ? `| Gradient | \`${style.gradient}\` |` : ''}
${style.hasGrid ? '| Grid Effect | Yes |' : ''}
${style.hasScanlines ? '| Scanlines | Yes |' : ''}

---

## Use Cases

**Best for:** ${style.tags.join(', ')}

**Examples:** ${style.examples.join(', ')}

---

## Sample Prompt for Claude Code

\`\`\`
I'd like you to create a frontend interface using the "${style.name}" design style.

Please use the /frontend-design and /color-palette skills to ensure high-quality,
distinctive design that avoids generic AI aesthetics.

Apply these specifications:
- Colors: Use the CSS variables defined in this reference
- Typography: ${style.fonts.display.split(',')[0].replace(/"/g, '')} for headings, ${style.fonts.body.split(',')[0].replace(/"/g, '')} for body
- Border radius: ${style.radius}
- Shadow style: ${style.shadow === 'none' ? 'No shadows' : 'Custom shadows as specified'}
${style.gradient ? `- Use gradient background: ${style.gradient}` : ''}

Design philosophy: ${style.description}
\`\`\`

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

      {/* Action Buttons */}
      <div className="style-actions">
        <button className="style-action-btn" onClick={handleCopyPrompt} title="Copy prompt for Claude">
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
          <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
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
