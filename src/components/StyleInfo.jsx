import { styleData } from '../data/styles';

function StyleInfo({ selectedStyle }) {
  const style = styleData[selectedStyle];

  if (!style) {
    return (
      <div className="style-info">
        <p>Select a style to see details</p>
      </div>
    );
  }

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
