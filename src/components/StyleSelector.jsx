import { styleCategories, styleData } from '../data/styles';

function StyleSelector({ selectedStyle, onSelectStyle }) {
  return (
    <div className="style-selector">
      <div className="selector-header">
        <h2>Design Styles</h2>
        <span className="style-count">{Object.keys(styleData).length} styles</span>
      </div>

      <div className="category-list">
        {styleCategories.map((category) => (
          <div key={category.name} className="category">
            <h3 className="category-name">{category.name}</h3>
            <div className="style-list">
              {category.styles.map((styleId) => {
                const style = styleData[styleId];
                if (!style) return null;

                return (
                  <button
                    key={styleId}
                    className={`style-item ${selectedStyle === styleId ? 'active' : ''}`}
                    onClick={() => onSelectStyle(styleId)}
                  >
                    <span
                      className="style-color-dot"
                      style={{
                        background: style.gradient || style.colors.accent,
                        boxShadow: style.shadow !== 'none' ? `0 0 8px ${style.colors.accent}` : 'none'
                      }}
                    />
                    <span className="style-name">{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StyleSelector;
