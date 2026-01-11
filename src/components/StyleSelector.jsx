import { useState } from 'react';
import { styleCategories, styleData } from '../data/styles';

function StyleSelector({ selectedStyle, onSelectStyle }) {
  // Track which category is expanded on mobile (null = all collapsed on mobile)
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  // Find the category of the selected style and expand it by default
  const getSelectedCategory = () => {
    for (const category of styleCategories) {
      if (category.styles.includes(selectedStyle)) {
        return category.name;
      }
    }
    return null;
  };

  // On initial render, expand the category containing the selected style
  const effectiveExpanded = expandedCategory ?? getSelectedCategory();

  return (
    <div className="style-selector">
      <div className="selector-header">
        <h2>Design Styles</h2>
        <span className="style-count">{Object.keys(styleData).length} styles</span>
      </div>

      <div className="category-list">
        {styleCategories.map((category) => {
          const isExpanded = effectiveExpanded === category.name;

          return (
            <div key={category.name} className={`category ${isExpanded ? 'expanded' : ''}`}>
              <button
                className="category-name"
                onClick={() => handleCategoryClick(category.name)}
                aria-expanded={isExpanded}
              >
                <span>{category.name}</span>
                <svg
                  className="category-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
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
          );
        })}
      </div>
    </div>
  );
}

export default StyleSelector;
