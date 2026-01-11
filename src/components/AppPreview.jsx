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
        {/* Dynamic Island / Notch */}
        <div className="iphone-notch">
          <div className="iphone-speaker" />
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

          {/* Status Bar */}
          <div className="ios-status-bar">
            <span className="ios-time">9:41</span>
            <div className="ios-status-icons">
              <svg className="ios-signal" width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="6" width="3" height="6" rx="1" />
                <rect x="5" y="4" width="3" height="8" rx="1" />
                <rect x="10" y="2" width="3" height="10" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.3" />
              </svg>
              <svg className="ios-wifi" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                <path d="M4.5 7.5a5 5 0 017 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1.5 4.5a9 9 0 0113 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="ios-battery">
                <div className="ios-battery-level" />
              </div>
            </div>
          </div>

          {/* Navigation Bar - iOS Large Title Style */}
          <header className="ios-nav-bar">
            <div className="ios-nav-title-large">日本語</div>
            <div className="ios-nav-subtitle">Japanese Learning</div>
          </header>

          {/* Search Bar */}
          <div className="ios-search-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
            <span>Search phrases...</span>
          </div>

          {/* Scrollable Content */}
          <div className="ios-scroll-content">
            {/* Segmented Control */}
            <div className="ios-segmented-control">
              <button className="ios-segment active">Phrases</button>
              <button className="ios-segment">Kanji</button>
              <button className="ios-segment">Grammar</button>
            </div>

            {/* Section Header */}
            <div className="ios-section-header">
              <span className="ios-section-title">Today's Phrases</span>
              <button className="ios-section-action">See All</button>
            </div>

            {/* List Items - iOS Style */}
            <div className="ios-list-group">
              <div className="ios-list-item">
                <div className="ios-list-content">
                  <div className="ios-list-japanese">おはようございます</div>
                  <div className="ios-list-romaji">Ohayou gozaimasu</div>
                  <div className="ios-list-english">Good morning (polite)</div>
                </div>
                <div className="ios-list-accessory">
                  <button className="ios-play-btn" aria-label="Play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                  <svg className="ios-chevron" width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l6 6-6 6" />
                  </svg>
                </div>
              </div>

              <div className="ios-list-item">
                <div className="ios-list-content">
                  <div className="ios-list-japanese">ありがとうございます</div>
                  <div className="ios-list-romaji">Arigatou gozaimasu</div>
                  <div className="ios-list-english">Thank you (polite)</div>
                </div>
                <div className="ios-list-accessory">
                  <button className="ios-play-btn" aria-label="Play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                  <svg className="ios-chevron" width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l6 6-6 6" />
                  </svg>
                </div>
              </div>

              <div className="ios-list-item">
                <div className="ios-list-content">
                  <div className="ios-list-japanese">すみません</div>
                  <div className="ios-list-romaji">Sumimasen</div>
                  <div className="ios-list-english">Excuse me / Sorry</div>
                </div>
                <div className="ios-list-accessory">
                  <button className="ios-play-btn" aria-label="Play">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                  <svg className="ios-chevron" width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="ios-section-header">
              <span className="ios-section-title">Your Progress</span>
            </div>

            <div className="ios-card">
              <div className="ios-card-row">
                <div className="ios-progress-item">
                  <div className="ios-progress-ring">
                    <svg viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--bg-tertiary)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="3"
                        strokeDasharray="75, 100"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="ios-progress-value">75%</span>
                  </div>
                  <span className="ios-progress-label">Daily Goal</span>
                </div>
                <div className="ios-progress-stats">
                  <div className="ios-stat-row">
                    <span className="ios-stat-label">Streak</span>
                    <span className="ios-stat-value">12 days</span>
                  </div>
                  <div className="ios-stat-row">
                    <span className="ios-stat-label">Learned</span>
                    <span className="ios-stat-value">156 words</span>
                  </div>
                  <div className="ios-stat-row">
                    <span className="ios-stat-label">Time today</span>
                    <span className="ios-stat-value">23 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="ios-section-header">
              <span className="ios-section-title">Quick Practice</span>
            </div>

            <div className="ios-action-grid">
              <button className="ios-action-card">
                <div className="ios-action-icon">📝</div>
                <span>Flashcards</span>
              </button>
              <button className="ios-action-card">
                <div className="ios-action-icon">🎧</div>
                <span>Listening</span>
              </button>
              <button className="ios-action-card">
                <div className="ios-action-icon">✍️</div>
                <span>Writing</span>
              </button>
              <button className="ios-action-card">
                <div className="ios-action-icon">🎤</div>
                <span>Speaking</span>
              </button>
            </div>

            {/* Style Badge */}
            <div className="ios-style-badge">
              <span className="ios-badge-label">Current Style</span>
              <span className="ios-badge-value">{style.name}</span>
            </div>
          </div>

          {/* Bottom Tab Bar - iOS Style */}
          <nav className="ios-tab-bar">
            <button className="ios-tab active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>Home</span>
            </button>
            <button className="ios-tab">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search</span>
            </button>
            <button className="ios-tab">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              <span>Library</span>
            </button>
            <button className="ios-tab">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
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
