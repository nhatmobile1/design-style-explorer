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
      <div className="preview-container" style={backgroundStyle}>
        {/* Style-specific overlays and effects */}
        {style.hasScanlines && <div className="scanlines-overlay" />}
        {style.hasGrid && <div className="grid-overlay" />}
        {style.hasNoise && <div className="noise-overlay" />}
        {style.hasGrain && <div className="grain-overlay" />}

        {/* Distinctive decorative elements per style */}
        <StyleDecorations styleId={selectedStyle} />

        {/* Header */}
        <header className="preview-header">
          <div className="logo">
            <div className="logo-mark">語</div>
            <div className="logo-text-group">
              <span className="logo-text">日本語</span>
              <span className="logo-subtitle">Quick Guide</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Theme">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="search-container">
          <div className="search-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" className="search-input" placeholder="Search phrases..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button className="tab active">Restaurant</button>
            <button className="tab">Shopping</button>
            <button className="tab">Conversation</button>
            <button className="tab">Counters</button>
          </div>
        </div>

        {/* Content */}
        <main className="preview-main">
          {/* Japanese Font Showcase */}
          <section className="font-showcase">
            <h3 className="section-title">Japanese Typography</h3>
            <div className="font-samples">
              <div className="font-sample">
                <span className="font-label">Hiragana</span>
                <span className="font-text hiragana">あいうえお かきくけこ</span>
              </div>
              <div className="font-sample">
                <span className="font-label">Katakana</span>
                <span className="font-text katakana">アイウエオ カキクケコ</span>
              </div>
              <div className="font-sample">
                <span className="font-label">Kanji</span>
                <span className="font-text kanji">日本語 漢字 勉強</span>
              </div>
            </div>
          </section>

          {/* Category Header */}
          <div className="category-header">
            <span className="category-title">Entering & Seating</span>
            <span className="category-count">6 phrases</span>
          </div>

          {/* Phrase Cards */}
          <div className="phrase-card">
            <div className="phrase-top">
              <div className="phrase-content">
                <div className="japanese">すみません、二人です</div>
                <div className="romaji">Sumimasen, futari desu</div>
                <div className="english">Excuse me, two people please</div>
              </div>
              <div className="card-actions">
                <button className="action-btn" aria-label="Play">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button className="action-btn" aria-label="Favorite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="phrase-card">
            <div className="phrase-top">
              <div className="phrase-content">
                <div className="japanese">予約していません</div>
                <div className="romaji">Yoyaku shite imasen</div>
                <div className="english">I don't have a reservation</div>
                <div className="note">Use when asked about reservations</div>
              </div>
              <div className="card-actions">
                <button className="action-btn" aria-label="Play">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button className="action-btn active" aria-label="Favorite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tip Box */}
          <div className="tip-box">
            <div className="tip-icon">💡</div>
            <div className="tip-text">
              Numbers 1-10 have special readings when using the general counter 〜つ
            </div>
          </div>

          {/* Counter Grid */}
          <div className="category-header">
            <span className="category-title">General Objects (〜つ)</span>
          </div>

          <div className="counter-grid">
            <div className="counter-card"><div className="counter-num">1</div><div className="counter-jp">ひとつ</div></div>
            <div className="counter-card"><div className="counter-num">2</div><div className="counter-jp">ふたつ</div></div>
            <div className="counter-card"><div className="counter-num">3</div><div className="counter-jp">みっつ</div></div>
            <div className="counter-card"><div className="counter-num">4</div><div className="counter-jp">よっつ</div></div>
            <div className="counter-card"><div className="counter-num">5</div><div className="counter-jp">いつつ</div></div>
            <div className="counter-card"><div className="counter-num">6</div><div className="counter-jp">むっつ</div></div>
            <div className="counter-card"><div className="counter-num">7</div><div className="counter-jp">ななつ</div></div>
            <div className="counter-card"><div className="counter-num">8</div><div className="counter-jp">やっつ</div></div>
            <div className="counter-card"><div className="counter-num">9</div><div className="counter-jp">ここのつ</div></div>
            <div className="counter-card"><div className="counter-num">10</div><div className="counter-jp">とお</div></div>
          </div>

          {/* Style Info Badge */}
          <div className="style-badge">
            <span className="style-badge-name">{style.name}</span>
            <span className="style-badge-desc">{style.description.substring(0, 60)}...</span>
          </div>
        </main>
      </div>
    </div>
  );
}

// Distinctive decorations for each style
function StyleDecorations({ styleId }) {
  switch (styleId) {
    case 'glassmorphism':
      return (
        <div className="deco-glass">
          <div className="glass-orb glass-orb-1" />
          <div className="glass-orb glass-orb-2" />
          <div className="glass-orb glass-orb-3" />
        </div>
      );

    case 'neomorphism':
      return (
        <div className="deco-neo">
          <div className="neo-circle neo-circle-1" />
          <div className="neo-circle neo-circle-2" />
        </div>
      );

    case 'brutalist':
    case 'neubrutalism':
      return (
        <div className="deco-brutal">
          <div className="brutal-stripe brutal-stripe-1" />
          <div className="brutal-stripe brutal-stripe-2" />
          <div className="brutal-asterisk">*</div>
        </div>
      );

    case 'memphis':
      return (
        <div className="deco-memphis">
          <div className="memphis-squiggle" />
          <div className="memphis-circle" />
          <div className="memphis-triangle" />
          <div className="memphis-dots" />
        </div>
      );

    case 'retro-futuristic':
      return (
        <div className="deco-retro">
          <div className="retro-sun" />
          <div className="retro-mountains" />
        </div>
      );

    case 'vaporwave':
      return (
        <div className="deco-vapor">
          <div className="vapor-grid" />
          <div className="vapor-sun" />
          <div className="vapor-palm" />
        </div>
      );

    case 'cyberpunk':
      return (
        <div className="deco-cyber">
          <div className="cyber-glitch" />
          <div className="cyber-line cyber-line-1" />
          <div className="cyber-line cyber-line-2" />
          <div className="cyber-corner cyber-corner-tl" />
          <div className="cyber-corner cyber-corner-br" />
        </div>
      );

    case 'art-deco':
      return (
        <div className="deco-artdeco">
          <div className="artdeco-fan artdeco-fan-1" />
          <div className="artdeco-fan artdeco-fan-2" />
          <div className="artdeco-line" />
        </div>
      );

    case 'bauhaus':
      return (
        <div className="deco-bauhaus">
          <div className="bauhaus-circle" />
          <div className="bauhaus-square" />
          <div className="bauhaus-triangle" />
        </div>
      );

    case 'swiss':
      return (
        <div className="deco-swiss">
          <div className="swiss-grid" />
          <div className="swiss-dot swiss-dot-1" />
          <div className="swiss-dot swiss-dot-2" />
        </div>
      );

    case 'terminal':
      return (
        <div className="deco-terminal">
          <div className="terminal-cursor" />
          <div className="terminal-prompt">&gt;_</div>
        </div>
      );

    case 'y2k':
      return (
        <div className="deco-y2k">
          <div className="y2k-star y2k-star-1">✦</div>
          <div className="y2k-star y2k-star-2">✧</div>
          <div className="y2k-bubble y2k-bubble-1" />
          <div className="y2k-bubble y2k-bubble-2" />
        </div>
      );

    case 'kawaii':
      return (
        <div className="deco-kawaii">
          <div className="kawaii-star">★</div>
          <div className="kawaii-heart">♥</div>
          <div className="kawaii-sparkle">✨</div>
          <div className="kawaii-cloud" />
        </div>
      );

    case 'organic':
    case 'wabi-sabi':
      return (
        <div className="deco-organic">
          <div className="organic-blob organic-blob-1" />
          <div className="organic-blob organic-blob-2" />
          <div className="organic-leaf" />
        </div>
      );

    case 'luxury':
      return (
        <div className="deco-luxury">
          <div className="luxury-line luxury-line-h" />
          <div className="luxury-line luxury-line-v" />
          <div className="luxury-diamond">◆</div>
        </div>
      );

    case 'editorial':
      return (
        <div className="deco-editorial">
          <div className="editorial-rule editorial-rule-1" />
          <div className="editorial-rule editorial-rule-2" />
          <div className="editorial-drop-cap">A</div>
        </div>
      );

    case 'grunge':
      return (
        <div className="deco-grunge">
          <div className="grunge-scratch grunge-scratch-1" />
          <div className="grunge-scratch grunge-scratch-2" />
          <div className="grunge-splatter" />
        </div>
      );

    case 'industrial':
      return (
        <div className="deco-industrial">
          <div className="industrial-bolt industrial-bolt-1" />
          <div className="industrial-bolt industrial-bolt-2" />
          <div className="industrial-stripe" />
        </div>
      );

    case 'collage':
      return (
        <div className="deco-collage">
          <div className="collage-torn collage-torn-1" />
          <div className="collage-tape" />
          <div className="collage-stamp">〒</div>
        </div>
      );

    case 'gradient':
      return (
        <div className="deco-gradient">
          <div className="gradient-mesh" />
        </div>
      );

    case 'maximalist':
      return (
        <div className="deco-maximalist">
          <div className="max-shape max-shape-1" />
          <div className="max-shape max-shape-2" />
          <div className="max-shape max-shape-3" />
          <div className="max-zigzag" />
        </div>
      );

    case 'kinetic':
    case 'atmospheric':
      return (
        <div className="deco-kinetic">
          <div className="kinetic-ring kinetic-ring-1" />
          <div className="kinetic-ring kinetic-ring-2" />
        </div>
      );

    case 'isometric':
      return (
        <div className="deco-isometric">
          <div className="iso-cube" />
          <div className="iso-cube iso-cube-2" />
        </div>
      );

    case 'corporate-memphis':
      return (
        <div className="deco-corp-memphis">
          <div className="corp-blob corp-blob-1" />
          <div className="corp-blob corp-blob-2" />
          <div className="corp-dots" />
        </div>
      );

    case 'claymorphism':
      return (
        <div className="deco-clay">
          <div className="clay-blob clay-blob-1" />
          <div className="clay-blob clay-blob-2" />
        </div>
      );

    case 'metro':
      return (
        <div className="deco-metro">
          <div className="metro-tile metro-tile-1" />
          <div className="metro-tile metro-tile-2" />
          <div className="metro-tile metro-tile-3" />
        </div>
      );

    case 'data-viz':
      return (
        <div className="deco-dataviz">
          <div className="dataviz-bar dataviz-bar-1" />
          <div className="dataviz-bar dataviz-bar-2" />
          <div className="dataviz-bar dataviz-bar-3" />
          <div className="dataviz-line" />
        </div>
      );

    case 'outlined':
      return (
        <div className="deco-outlined">
          <div className="outlined-circle" />
          <div className="outlined-square" />
          <div className="outlined-line" />
        </div>
      );

    case 'focus-mode':
      return (
        <div className="deco-focus">
          <div className="focus-glow" />
        </div>
      );

    case 'soft-pastel':
      return (
        <div className="deco-pastel">
          <div className="pastel-cloud pastel-cloud-1" />
          <div className="pastel-cloud pastel-cloud-2" />
          <div className="pastel-star">✦</div>
        </div>
      );

    case 'playful':
      return (
        <div className="deco-playful">
          <div className="playful-bounce playful-bounce-1" />
          <div className="playful-bounce playful-bounce-2" />
          <div className="playful-confetti" />
        </div>
      );

    case 'handcrafted':
      return (
        <div className="deco-handcrafted">
          <div className="handcrafted-line handcrafted-line-1" />
          <div className="handcrafted-line handcrafted-line-2" />
          <div className="handcrafted-x">✕</div>
        </div>
      );

    case 'academic':
      return (
        <div className="deco-academic">
          <div className="academic-footnote">¹</div>
          <div className="academic-margin-note">cf. §2.1</div>
        </div>
      );

    case 'skeuomorphic':
      return (
        <div className="deco-skeu">
          <div className="skeu-shadow" />
          <div className="skeu-highlight" />
        </div>
      );

    case 'monochromatic':
      return (
        <div className="deco-mono">
          <div className="mono-gradient" />
        </div>
      );

    case 'dark-mode':
      return (
        <div className="deco-darkmode">
          <div className="darkmode-glow darkmode-glow-1" />
          <div className="darkmode-glow darkmode-glow-2" />
        </div>
      );

    case 'grid-modular':
      return (
        <div className="deco-grid-mod">
          <div className="grid-mod-line grid-mod-line-h" />
          <div className="grid-mod-line grid-mod-line-v" />
        </div>
      );

    case 'corporate':
      return (
        <div className="deco-corporate">
          <div className="corporate-accent" />
        </div>
      );

    default:
      return null;
  }
}

export default AppPreview;
