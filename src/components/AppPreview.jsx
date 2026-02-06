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
          {selectedStyle === 'terminal' && (
            <div className="ios-deco-terminal">
              <div className="ios-terminal-scanlines" />
            </div>
          )}
          {selectedStyle === 'art-deco' && (
            <div className="ios-deco-artdeco">
              <div className="ios-artdeco-border" />
            </div>
          )}
          {selectedStyle === 'memphis' && (
            <div className="ios-deco-memphis">
              <div className="ios-memphis-zigzag" />
              <div className="ios-memphis-circle" />
              <div className="ios-memphis-dots" />
            </div>
          )}
          {selectedStyle === 'neubrutalism' && (
            <div className="ios-deco-neubrutalism">
              <div className="ios-neubrutalism-block" />
            </div>
          )}
          {selectedStyle === 'maximalist' && (
            <div className="ios-deco-maximalist">
              <div className="ios-max-splash ios-max-splash-1" />
              <div className="ios-max-splash ios-max-splash-2" />
            </div>
          )}
          {selectedStyle === 'kawaii' && (
            <div className="ios-deco-kawaii">
              <div className="ios-kawaii-cloud" />
              <div className="ios-kawaii-star">★</div>
              <div className="ios-kawaii-heart">♥</div>
            </div>
          )}
          {selectedStyle === 'bauhaus' && (
            <div className="ios-deco-bauhaus">
              <div className="ios-bauhaus-circle" />
              <div className="ios-bauhaus-triangle" />
            </div>
          )}

          {/* iOS Status Bar */}
          <div className="ios-status-bar">
            <span className="ios-time">9:41</span>
            <div className="ios-status-icons">
              <svg className="ios-signal" width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.75" />
                <rect x="5" y="4.5" width="3" height="7.5" rx="0.75" />
                <rect x="10" y="2" width="3" height="10" rx="0.75" />
                <rect x="15" y="0" width="3" height="12" rx="0.75" opacity="0.35" />
              </svg>
              <svg className="ios-wifi" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 10a1.25 1.25 0 110 2.5A1.25 1.25 0 018 10z" />
                <path d="M5.17 8.17a4 4 0 015.66 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.34 5.34a8 8 0 0111.32 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="ios-battery">
                <div className="ios-battery-level" />
              </div>
            </div>
          </div>

          {/* Header with menu and actions */}
          <header className="ios-header">
            <div className="ios-header-row">
              <button className="ios-header-btn">
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 2h18M1 7h18M1 12h18" />
                </svg>
              </button>
              <h1 className="ios-header-title">Dashboard</h1>
              <button className="ios-header-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v4l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6z" />
                  <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="ios-scroll-content">

            {/* Primary Action Card */}
            <div className="ios-action-banner">
              <div className="ios-banner-content">
                <span className="ios-banner-label">Learn</span>
                <span className="ios-banner-value">0/5</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" opacity="0.6">
                <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Secondary Action Card */}
            <div className="ios-action-banner ios-action-banner-secondary">
              <div className="ios-banner-content">
                <span className="ios-banner-label">Review</span>
                <span className="ios-banner-sublabel">Grammar & Vocab</span>
              </div>
              <div className="ios-banner-badge">22</div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" opacity="0.6">
                <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* User Profile Card */}
            <div className="ios-profile-card">
              <div className="ios-profile-avatar">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="var(--accent)">
                  <circle cx="14" cy="10" r="6" />
                  <path d="M4 26c0-5.5 4.5-10 10-10s10 4.5 10 10" />
                </svg>
              </div>
              <div className="ios-profile-info">
                <span className="ios-profile-name">nhatmobile</span>
                <span className="ios-profile-level">Lvl 37 (460 XP until Lvl 38)</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="ios-stats-row">
              <div className="ios-stat-card">
                <div className="ios-stat-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                  </svg>
                </div>
                <span className="ios-stat-value">70</span>
                <span className="ios-stat-label">Days Studied</span>
              </div>
              <div className="ios-stat-card">
                <div className="ios-stat-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                  </svg>
                </div>
                <span className="ios-stat-value">100%</span>
                <span className="ios-stat-label">Last Session</span>
              </div>
              <div className="ios-stat-card">
                <div className="ios-stat-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                  </svg>
                </div>
                <span className="ios-stat-value">156</span>
                <span className="ios-stat-label">Items Studied</span>
              </div>
            </div>

            {/* Streak Card */}
            <div className="ios-streak-card">
              <div className="ios-streak-header">
                <span className="ios-streak-title">Current Streak – 1</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-tertiary)">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
              <div className="ios-streak-days">
                <div className="ios-streak-day">
                  <div className="ios-streak-dot"></div>
                  <span>5月</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot"></div>
                  <span>6火</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot"></div>
                  <span>7水</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot"></div>
                  <span>8木</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot"></div>
                  <span>9金</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot ios-streak-dot-active"></div>
                  <span>10土</span>
                </div>
                <div className="ios-streak-day">
                  <div className="ios-streak-dot ios-streak-dot-empty"></div>
                  <span>11日</span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="ios-progress-section">
              <div className="ios-progress-header">
                <span className="ios-progress-title">JLPT Progress (Grammar)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-tertiary)">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="ios-progress-list">
                <div className="ios-progress-row">
                  <span className="ios-progress-label">N5</span>
                  <div className="ios-progress-track">
                    <div className="ios-progress-bar-fill" style={{ width: '87%' }}></div>
                  </div>
                  <span className="ios-progress-count">111/127</span>
                </div>
                <div className="ios-progress-row">
                  <span className="ios-progress-label">N4</span>
                  <div className="ios-progress-track">
                    <div className="ios-progress-bar-fill" style={{ width: '19%' }}></div>
                  </div>
                  <span className="ios-progress-count">34/178</span>
                </div>
                <div className="ios-progress-row">
                  <span className="ios-progress-label">N3</span>
                  <div className="ios-progress-track">
                    <div className="ios-progress-bar-fill ios-progress-bar-low" style={{ width: '1%' }}></div>
                  </div>
                  <span className="ios-progress-count">3/219</span>
                </div>
                <div className="ios-progress-row">
                  <span className="ios-progress-label">N2</span>
                  <div className="ios-progress-track">
                    <div className="ios-progress-bar-fill" style={{ width: '0%' }}></div>
                  </div>
                  <span className="ios-progress-count">0/217</span>
                </div>
                <div className="ios-progress-row">
                  <span className="ios-progress-label">N1</span>
                  <div className="ios-progress-track">
                    <div className="ios-progress-bar-fill" style={{ width: '0%' }}></div>
                  </div>
                  <span className="ios-progress-count">0/184</span>
                </div>
              </div>
            </div>

          </div>

          {/* iOS Tab Bar */}
          <nav className="ios-tab-bar">
            <button className="ios-tab active">
              <div className="ios-tab-badge">22</div>
              {/* Home/Dashboard icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
              </svg>
              <span>Dashboard</span>
            </button>
            <button className="ios-tab">
              {/* Grammar - structured blocks/puzzle pieces */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="3" width="8" height="6" rx="1"/>
                <rect x="13" y="3" width="8" height="6" rx="1"/>
                <path d="M7 9v3h10V9" strokeLinecap="round"/>
                <rect x="5" y="12" width="14" height="6" rx="1"/>
              </svg>
              <span>Grammar</span>
            </button>
            <button className="ios-tab">
              {/* Decks - stacked cards */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="4" y="6" width="16" height="12" rx="2"/>
                <path d="M7 6V4.5A1.5 1.5 0 018.5 3h7A1.5 1.5 0 0117 4.5V6"/>
                <path d="M4 10h16"/>
              </svg>
              <span>Decks</span>
            </button>
            <button className="ios-tab">
              {/* Content - book with bookmark */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/>
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                <path d="M14 2v8l-2-1.5L10 10V2"/>
              </svg>
              <span>Content</span>
            </button>
            <button className="ios-tab">
              {/* Search - magnifying glass */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="7"/>
                <path d="M21 21l-5-5"/>
              </svg>
              <span>Search</span>
            </button>
            {/* Home Indicator */}
            <div className="ios-home-indicator" />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AppPreview;
