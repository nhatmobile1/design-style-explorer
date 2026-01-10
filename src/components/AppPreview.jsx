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
    '--radius': style.radius,
    '--shadow': style.shadow,
  };

  // For gradient backgrounds, apply directly
  const backgroundStyle = style.gradient
    ? { background: style.gradient }
    : { backgroundColor: 'var(--bg-primary)' };

  return (
    <div className="app-preview" style={cssVars}>
      <div className="preview-container" style={backgroundStyle}>
        {/* Scanlines overlay for terminal style */}
        {style.hasScanlines && <div className="scanlines-overlay" />}

        {/* Grid overlay for retro-futuristic style */}
        {style.hasGrid && <div className="grid-overlay" />}

        {/* Mock App Header */}
        <header className="preview-header">
          <div className="logo">
            <span className="logo-icon">日</span>
            <span className="logo-text">NihonGo</span>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link active">Learn</a>
            <a href="#" className="nav-link">Practice</a>
            <a href="#" className="nav-link">Review</a>
          </nav>
          <div className="header-actions">
            <span className="streak">🔥 7</span>
            <button className="btn-icon">⚙️</button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="preview-main">
          {/* Hero Section */}
          <section className="hero-section">
            <h1>Learn Japanese Today</h1>
            <p>Master hiragana, katakana, and kanji with our interactive lessons</p>
            <div className="hero-actions">
              <button className="btn btn-primary">Start Learning</button>
              <button className="btn btn-secondary">View Progress</button>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stat-card">
              <span className="stat-value">156</span>
              <span className="stat-label">Words Learned</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">42</span>
              <span className="stat-label">Kanji Mastered</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">N5</span>
              <span className="stat-label">Current Level</span>
            </div>
          </section>

          {/* Lesson Cards */}
          <section className="lessons-section">
            <h2>Continue Learning</h2>
            <div className="lesson-cards">
              <div className="lesson-card">
                <div className="lesson-icon">あ</div>
                <div className="lesson-content">
                  <h3>Hiragana Basics</h3>
                  <p>Learn the fundamental Japanese alphabet</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>

              <div className="lesson-card">
                <div className="lesson-icon">漢</div>
                <div className="lesson-content">
                  <h3>Basic Kanji</h3>
                  <p>Essential characters for beginners</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>

              <div className="lesson-card">
                <div className="lesson-icon">📝</div>
                <div className="lesson-content">
                  <h3>Grammar Patterns</h3>
                  <p>Sentence structures and particles</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="features-section">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Daily Goals</h3>
              <p>Set and track your learning objectives</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🃏</span>
              <h3>Flashcards</h3>
              <p>Spaced repetition for better retention</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎮</span>
              <h3>Mini Games</h3>
              <p>Learn through fun interactive challenges</p>
            </div>
          </section>

          {/* Form Example */}
          <section className="form-section">
            <h2>Quick Practice</h2>
            <div className="practice-form">
              <div className="form-group">
                <label>Translate this word:</label>
                <div className="word-display">猫</div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter your answer..." className="input-field" />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary">Check Answer</button>
                <button className="btn btn-outline">Skip</button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="preview-footer">
          <p>© 2024 NihonGo - Japanese Language Learning</p>
        </footer>
      </div>
    </div>
  );
}

export default AppPreview;
