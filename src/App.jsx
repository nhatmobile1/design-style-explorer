import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StyleSelector from './components/StyleSelector';
import StyleInfo from './components/StyleInfo';
import SkillsDownload from './components/SkillsDownload';
import AppPreview from './components/AppPreview';
import WebsitePreview from './components/WebsitePreview';
import IntroPage from './components/IntroPage';
import { styleData } from './data/styles';
import './App.css';

const INTRO_STORAGE_KEY = 'designStylesExplorer_hideIntro';

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

  // Intro page state - show unless user has dismissed it permanently
  // Skip intro if URL has specific style/view params (direct link)
  const hasDirectLink = styleFromUrl || viewFromUrl;
  const [showIntro, setShowIntro] = useState(() => {
    if (hasDirectLink) return false;
    const hidden = localStorage.getItem(INTRO_STORAGE_KEY);
    return hidden !== 'true';
  });

  const handleDismissIntro = (dontShowAgain) => {
    setShowIntro(false);
    if (dontShowAgain) {
      localStorage.setItem(INTRO_STORAGE_KEY, 'true');
    }
  };

  const handleShowIntro = () => {
    setShowIntro(true);
  };

  const handleResetIntro = () => {
    localStorage.removeItem(INTRO_STORAGE_KEY);
    setShowIntro(true);
  };

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

  // Show intro page
  if (showIntro) {
    return <IntroPage onDismiss={handleDismissIntro} />;
  }

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <aside className="sidebar-left">
        <StyleSelector
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />
      </aside>

      <main id="main-content" className="main-content">
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
          <button
            className="intro-btn"
            onClick={handleResetIntro}
            title="Show intro page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
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
        <SkillsDownload />
      </aside>
    </div>
  );
}

export default App;
