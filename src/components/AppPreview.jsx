import { styleData } from '../data/styles';

function AppPreview({ selectedStyle }) {
  const style = styleData[selectedStyle];

  if (!style) {
    return <div className="app-preview">Select a style to preview</div>;
  }

  // Build CSS variables from the style
  const cssVars = {
    '--bg-primary': style.colors.bgPrimary,
    '--bg-secondary': style.colors.bgSecondary,
    '--bg-tertiary': style.colors.bgTertiary,
    '--text-primary': style.colors.textPrimary,
    '--text-secondary': style.colors.textSecondary,
    '--text-tertiary': style.colors.textTertiary,
    '--accent': style.colors.accent,
    '--accent-soft': style.colors.accentSoft,
    '--secondary': style.colors.secondary,
    '--border': style.colors.border,
    '--border-strong': style.colors.borderStrong,
    '--font-display': style.fonts.display,
    '--font-body': style.fonts.body,
    '--font-japanese': style.fonts.japanese || '"Noto Sans JP", sans-serif',
    '--radius': style.radius,
    '--shadow': style.shadow,
  };

  // For gradient backgrounds
  const backgroundStyle = style.gradient
    ? { background: style.gradient }
    : { backgroundColor: 'var(--bg-primary)' };

  return (
    <div className={`app-preview style-${selectedStyle}`} style={cssVars}>
      {/* iPhone Frame */}
      <div className="iphone-frame">
        {/* Dynamic Island */}
        <div className="iphone-dynamic-island">
          <div className="dynamic-island-camera" />
        </div>

        {/* Screen Content */}
        <div className="iphone-screen" style={backgroundStyle}>
          {/* Style-specific decorations */}
          {selectedStyle === 'retro-futuristic' && (
            <div className="ios-deco-retro">
              <div className="ios-retro-grid" />
            </div>
          )}
          {selectedStyle === 'vaporwave' && (
            <div className="ios-deco-vapor">
              <div className="ios-vapor-grid" />
            </div>
          )}
          {selectedStyle === 'cyberpunk' && (
            <div className="ios-deco-cyber">
              <div className="ios-cyber-scanlines" />
            </div>
          )}
          {selectedStyle === 'glassmorphism' && (
            <div className="ios-deco-glass">
              <div className="ios-glass-orb ios-glass-orb-1" />
              <div className="ios-glass-orb ios-glass-orb-2" />
            </div>
          )}
          {selectedStyle === 'gradient' && (
            <div className="ios-deco-gradient">
              <div className="ios-gradient-mesh" />
            </div>
          )}

          {/* iOS Status Bar */}
          <div className="ios-status-bar">
            <span className="ios-time">9:41</span>
            <div className="ios-status-icons">
              {/* SF Symbol: signal bars */}
              <svg className="ios-signal" width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.75" />
                <rect x="5" y="4.5" width="3" height="7.5" rx="0.75" />
                <rect x="10" y="2" width="3" height="10" rx="0.75" />
                <rect x="15" y="0" width="3" height="12" rx="0.75" opacity="0.35" />
              </svg>
              {/* SF Symbol: wifi */}
              <svg className="ios-wifi" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 10a1.25 1.25 0 110 2.5A1.25 1.25 0 018 10z" />
                <path d="M5.17 8.17a4 4 0 015.66 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.34 5.34a8 8 0 0111.32 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <div className="ios-battery">
                <div className="ios-battery-level" />
                <span className="ios-battery-percent">80</span>
              </div>
            </div>
          </div>

          {/* iOS Navigation Bar with back button and actions */}
          <header className="ios-nav-bar">
            <div className="ios-nav-top">
              <button className="ios-nav-back" aria-label="Back">
                {/* SF Symbol: chevron.left */}
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2L2 10L10 18" />
                </svg>
                <span>Back</span>
              </button>
              <div className="ios-nav-actions">
                {/* SF Symbol: square.and.arrow.up */}
                <button className="ios-nav-action" aria-label="Share">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 14V2M10 2L5 7M10 2L15 7" />
                    <path d="M3 12v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
                  </svg>
                </button>
                {/* SF Symbol: ellipsis.circle */}
                <button className="ios-nav-action" aria-label="More">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="11" cy="11" r="9" />
                    <circle cx="6.5" cy="11" r="1" fill="currentColor" />
                    <circle cx="11" cy="11" r="1" fill="currentColor" />
                    <circle cx="15.5" cy="11" r="1" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ios-nav-title-large">日本語</div>
            <div className="ios-nav-subtitle">Japanese Learning</div>
          </header>

          {/* iOS Search Bar */}
          <div className="ios-search-container">
            <div className="ios-search-bar">
              {/* SF Symbol: magnifyingglass */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <circle cx="7" cy="7" r="5.25" />
                <path d="M14 14L11 11" />
              </svg>
              <span>Search</span>
              {/* SF Symbol: mic.fill */}
              <svg className="ios-search-mic" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" opacity="0.5">
                <rect x="3" y="0" width="6" height="10" rx="3" />
                <path d="M1 7v1a5 5 0 0010 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 13v3M4 16h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="ios-scroll-content">
            {/* iOS Segmented Control */}
            <div className="ios-segmented-control">
              <div className="ios-segment-bg" />
              <button className="ios-segment active">Phrases</button>
              <button className="ios-segment">Kanji</button>
              <button className="ios-segment">Grammar</button>
            </div>

            {/* Section Header */}
            <div className="ios-section-header">
              <span className="ios-section-title">Today's Phrases</span>
              <button className="ios-section-action">See All</button>
            </div>

            {/* iOS Inset Grouped List */}
            <div className="ios-list-inset-grouped">
              <div className="ios-list-item">
                <div className="ios-list-icon-container">
                  {/* SF Symbol: character.bubble.fill */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.33 1.3 4.42 3.36 5.82L4 20l5-2.5c.97.16 1.97.25 3 .25 5.52 0 10-3.58 10-8S17.52 2 12 2z" />
                    <text x="12" y="12.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">あ</text>
                  </svg>
                </div>
                <div className="ios-list-content">
                  <div className="ios-list-title">おはようございます</div>
                  <div className="ios-list-subtitle">Ohayou gozaimasu • Good morning</div>
                </div>
                <div className="ios-list-accessory">
                  {/* SF Symbol: chevron.right */}
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3">
                    <path d="M1 1l5 5-5 5" />
                  </svg>
                </div>
              </div>

              <div className="ios-list-item">
                <div className="ios-list-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--secondary)">
                    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.33 1.3 4.42 3.36 5.82L4 20l5-2.5c.97.16 1.97.25 3 .25 5.52 0 10-3.58 10-8S17.52 2 12 2z" />
                    <text x="12" y="12.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">あ</text>
                  </svg>
                </div>
                <div className="ios-list-content">
                  <div className="ios-list-title">ありがとうございます</div>
                  <div className="ios-list-subtitle">Arigatou gozaimasu • Thank you</div>
                </div>
                <div className="ios-list-accessory">
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3">
                    <path d="M1 1l5 5-5 5" />
                  </svg>
                </div>
              </div>

              <div className="ios-list-item">
                <div className="ios-list-icon-container">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M12 2C6.48 2 2 5.58 2 10c0 2.33 1.3 4.42 3.36 5.82L4 20l5-2.5c.97.16 1.97.25 3 .25 5.52 0 10-3.58 10-8S17.52 2 12 2z" />
                    <text x="12" y="12.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">あ</text>
                  </svg>
                </div>
                <div className="ios-list-content">
                  <div className="ios-list-title">すみません</div>
                  <div className="ios-list-subtitle">Sumimasen • Excuse me</div>
                </div>
                <div className="ios-list-accessory">
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3">
                    <path d="M1 1l5 5-5 5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="ios-section-header">
              <span className="ios-section-title">Your Progress</span>
            </div>

            {/* iOS Progress Widget Card */}
            <div className="ios-widget-card">
              <div className="ios-widget-header">
                <div className="ios-widget-icon">
                  {/* SF Symbol: flame.fill */}
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="url(#flameGradient)">
                    <defs>
                      <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#FF9500" />
                        <stop offset="100%" stopColor="#FF3B30" />
                      </linearGradient>
                    </defs>
                    <path d="M9 22c-5 0-8-3.5-8-8 0-3 1.5-5.5 3.5-7.5C6 5 7 3 7 1c0 0 2 1.5 3 4 .5-1 1.5-2.5 1.5-2.5S14 5 14 8c0 1.5-.5 3-1.5 4 2-1 3.5-3 3.5-3s2 2.5 2 5c0 4.5-3 8-9 8z" />
                  </svg>
                </div>
                <div className="ios-widget-title">
                  <span className="ios-widget-label">Daily Streak</span>
                  <span className="ios-widget-value">12 days</span>
                </div>
              </div>
              <div className="ios-widget-stats">
                <div className="ios-mini-stat">
                  <span className="ios-mini-stat-value">156</span>
                  <span className="ios-mini-stat-label">Words</span>
                </div>
                <div className="ios-mini-stat-divider" />
                <div className="ios-mini-stat">
                  <span className="ios-mini-stat-value">23m</span>
                  <span className="ios-mini-stat-label">Today</span>
                </div>
                <div className="ios-mini-stat-divider" />
                <div className="ios-mini-stat">
                  <span className="ios-mini-stat-value">75%</span>
                  <span className="ios-mini-stat-label">Goal</span>
                </div>
              </div>
              <div className="ios-progress-bar">
                <div className="ios-progress-fill" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Quick Actions - iOS Small Widget Grid */}
            <div className="ios-section-header">
              <span className="ios-section-title">Quick Practice</span>
            </div>

            <div className="ios-widget-grid">
              <button className="ios-small-widget">
                <div className="ios-small-widget-icon">
                  {/* SF Symbol: rectangle.on.rectangle */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)">
                    <rect x="2" y="6" width="14" height="12" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.75" />
                    <rect x="8" y="2" width="14" height="12" rx="2" />
                  </svg>
                </div>
                <span className="ios-small-widget-label">Flashcards</span>
              </button>
              <button className="ios-small-widget">
                <div className="ios-small-widget-icon">
                  {/* SF Symbol: waveform */}
                  <svg width="20" height="16" viewBox="0 0 22 18" fill="var(--accent)">
                    <rect x="1" y="6" width="2" height="6" rx="1" />
                    <rect x="5" y="3" width="2" height="12" rx="1" />
                    <rect x="9" y="0" width="2" height="18" rx="1" />
                    <rect x="13" y="4" width="2" height="10" rx="1" />
                    <rect x="17" y="7" width="2" height="4" rx="1" />
                  </svg>
                </div>
                <span className="ios-small-widget-label">Listening</span>
              </button>
              <button className="ios-small-widget">
                <div className="ios-small-widget-icon">
                  {/* SF Symbol: pencil.line */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                    <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a1 1 0 000-1.41z" />
                  </svg>
                </div>
                <span className="ios-small-widget-label">Writing</span>
              </button>
              <button className="ios-small-widget">
                <div className="ios-small-widget-icon">
                  {/* SF Symbol: mic.fill */}
                  <svg width="16" height="20" viewBox="0 0 18 24" fill="var(--accent)">
                    <rect x="5" y="1" width="8" height="14" rx="4" />
                    <path d="M1 11v2a8 8 0 0016 0v-2" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 19v4M5 23h8" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="ios-small-widget-label">Speaking</span>
              </button>
            </div>

            {/* Style indicator - subtle */}
            <div className="ios-footer-info">
              <span className="ios-footer-label">Style: {style.name}</span>
            </div>
          </div>

          {/* iOS Tab Bar */}
          <nav className="ios-tab-bar">
            <button className="ios-tab active">
              {/* SF Symbol: house.fill */}
              <svg width="24" height="22" viewBox="0 0 24 22" fill="currentColor">
                <path d="M12 0L0 10h3v12h6v-8h6v8h6V10h3L12 0z" />
              </svg>
              <span>Home</span>
            </button>
            <button className="ios-tab">
              {/* SF Symbol: magnifyingglass */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9.5" cy="9.5" r="7" />
                <path d="M20 20l-5-5" />
              </svg>
              <span>Search</span>
            </button>
            <button className="ios-tab">
              {/* SF Symbol: book.fill */}
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M1 2.5A1.5 1.5 0 012.5 1h5A2.5 2.5 0 0110 3.5V19a1.5 1.5 0 00-1.5-1.5h-6A1.5 1.5 0 011 16V2.5z" />
                <path d="M21 2.5A1.5 1.5 0 0019.5 1h-5A2.5 2.5 0 0012 3.5V19a1.5 1.5 0 011.5-1.5h6A1.5 1.5 0 0021 16V2.5z" />
              </svg>
              <span>Library</span>
            </button>
            <button className="ios-tab">
              {/* SF Symbol: person.crop.circle */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="11" cy="11" r="10" />
                <circle cx="11" cy="8" r="3" />
                <path d="M5.5 18.5a6 6 0 0111 0" />
              </svg>
              <span>Profile</span>
            </button>
          </nav>

          {/* Home Indicator */}
          <div className="ios-home-indicator" />
        </div>
      </div>
    </div>
  );
}

export default AppPreview;
