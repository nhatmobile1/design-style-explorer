import { useState } from 'react';

function IntroPage({ onDismiss }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleGetStarted = () => {
    onDismiss(dontShowAgain);
  };

  return (
    <div className="intro-page">
      <div className="intro-content">
        <div className="intro-badge">42 Design Styles</div>
        <h1 className="intro-title">Design Styles Explorer</h1>
        <p className="intro-description">
          Explore and preview distinct web design aesthetics. See how each style looks
          on an iOS app and website layout, then export CSS variables and SwiftUI code
          for your projects.
        </p>

        <div className="intro-features">
          <div className="intro-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
            </svg>
            <span>iOS App Preview</span>
          </div>
          <div className="intro-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Website Preview</span>
          </div>
          <div className="intro-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Export CSS & Swift</span>
          </div>
        </div>

        <button className="intro-cta" onClick={handleGetStarted}>
          View Designs
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <label className="intro-toggle">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          />
          <span>Don't show this again</span>
        </label>
      </div>
    </div>
  );
}

export default IntroPage;
