import { useState } from 'react';
import StyleSelector from './components/StyleSelector';
import StyleInfo from './components/StyleInfo';
import AppPreview from './components/AppPreview';
import WebsitePreview from './components/WebsitePreview';
import './App.css';

function App() {
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  const [viewMode, setViewMode] = useState('app'); // 'app' or 'website'

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
        <StyleInfo selectedStyle={selectedStyle} />
      </aside>
    </div>
  );
}

export default App;
