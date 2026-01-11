import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StyleSelector from './components/StyleSelector';
import StyleInfo from './components/StyleInfo';
import AppPreview from './components/AppPreview';
import WebsitePreview from './components/WebsitePreview';
import { styleData } from './data/styles';
import './App.css';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const styleFromUrl = searchParams.get('style');
  const viewFromUrl = searchParams.get('view');
  const previewOnly = searchParams.get('preview') === 'true';

  // Initialize from URL or defaults
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return styleFromUrl && styleData[styleFromUrl] ? styleFromUrl : 'minimalist';
  });
  const [viewMode, setViewMode] = useState(() => {
    return viewFromUrl === 'website' ? 'website' : 'app';
  });

  // Sync URL when style or view changes (only in non-preview mode)
  useEffect(() => {
    if (!previewOnly) {
      const newParams = new URLSearchParams();
      newParams.set('style', selectedStyle);
      newParams.set('view', viewMode);
      setSearchParams(newParams, { replace: true });
    }
  }, [selectedStyle, viewMode, setSearchParams, previewOnly]);

  // Handle URL changes (browser back/forward)
  useEffect(() => {
    if (styleFromUrl && styleData[styleFromUrl] && styleFromUrl !== selectedStyle) {
      setSelectedStyle(styleFromUrl);
    }
    if (viewFromUrl && viewFromUrl !== viewMode) {
      setViewMode(viewFromUrl === 'website' ? 'website' : 'app');
    }
  }, [styleFromUrl, viewFromUrl]);

  // Preview-only mode: show just the preview without sidebars
  if (previewOnly) {
    const style = styleData[selectedStyle];
    return (
      <div className="preview-only-layout">
        <div className="preview-only-header">
          <h1>{style?.name || 'Design Style'}</h1>
          <span className="preview-only-badge">{viewMode === 'app' ? 'App Preview' : 'Website Preview'}</span>
        </div>
        <div className="preview-only-content">
          {viewMode === 'app' ? (
            <AppPreview selectedStyle={selectedStyle} />
          ) : (
            <WebsitePreview selectedStyle={selectedStyle} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar-left">
        <StyleSelector
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />
      </aside>

      <main className="main-content">
        {/* View Toggle */}
        <div className="view-toggle-bar">
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'app' ? 'active' : ''}`}
              onClick={() => setViewMode('app')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              App
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'website' ? 'active' : ''}`}
              onClick={() => setViewMode('website')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Website
            </button>
          </div>
        </div>

        {/* Preview Area */}
        {viewMode === 'app' ? (
          <AppPreview selectedStyle={selectedStyle} />
        ) : (
          <WebsitePreview selectedStyle={selectedStyle} />
        )}
      </main>

      <aside className="sidebar-right">
        <StyleInfo selectedStyle={selectedStyle} viewMode={viewMode} />
      </aside>
    </div>
  );
}

export default App;
