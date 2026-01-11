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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm6 16h-4v-5h-4v5H6v-9l6-4.5 6 4.5v9z"/>
              </svg>
              <span>Dashboard</span>
            </button>
            <button className="ios-tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
              <span>Grammar</span>
            </button>
            <button className="ios-tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span>Decks</span>
            </button>
            <button className="ios-tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
                <path d="M8 12h8M12 8v8" strokeLinecap="round"/>
              </svg>
              <span>Content</span>
            </button>
            <button className="ios-tab">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4-4"/>
              </svg>
              <span>Search</span>
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
