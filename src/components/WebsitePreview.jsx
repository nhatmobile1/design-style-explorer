import { styleData } from '../data/styles';

// Image mappings for different styles
const styleImages = {
  // Minimalist/Zen styles - use serene, minimal images
  'minimalist': {
    hero: '/pexels-pixabay-301614.jpg', // Torii gate in water (B&W minimal)
    cta: '/pexels-andrey-grushnikov-223358-707680.jpg', // Snowy temple
  },
  'zen': {
    hero: '/pexels-pixabay-301614.jpg',
    cta: '/pexels-pixabay-302100.jpg', // Moss garden
  },
  'wabi-sabi': {
    hero: '/pexels-andrey-grushnikov-223358-707680.jpg',
    cta: '/pexels-pixabay-302100.jpg',
  },

  // Japanese traditional styles
  'japanese': {
    hero: '/pexels-belle-co-99483-402028.jpg', // Pagoda sunset
    cta: '/pexels-tomas-malik-793526-3408353.jpg', // Mt Fuji with pagoda
    testimonials: '/pexels-satoshi-1325837.jpg', // Geishas
  },
  'editorial': {
    hero: '/pexels-evgeny-tchebotarev-1058775-2187661.jpg', // Person with umbrella
    testimonials: '/pexels-satoshi-1325837.jpg',
  },

  // Cyberpunk/Neon styles - use night city images
  'cyberpunk': {
    hero: '/pexels-haugenzhays-1798631.jpg', // Dotonbori neon
    cta: '/pexels-audrey-mari-1016051-3421920.jpg', // Red lanterns
  },
  'neon': {
    hero: '/pexels-haugenzhays-1798631.jpg',
    cta: '/pexels-audrey-mari-1016051-3421920.jpg',
  },
  'vaporwave': {
    hero: '/pexels-haugenzhays-1798631.jpg',
    testimonials: '/pexels-itfeelslikefilm-590478.jpg', // Night alley
  },
  'retro-futuristic': {
    hero: '/pexels-audrey-mari-1016051-3421920.jpg',
    cta: '/pexels-haugenzhays-1798631.jpg',
  },

  // Atmospheric/moody styles
  'atmospheric': {
    hero: '/pexels-evgeny-tchebotarev-1058775-2187605.jpg', // Village rooftops
    cta: '/pexels-itfeelslikefilm-590478.jpg',
  },
  'dark-mode': {
    hero: '/pexels-itfeelslikefilm-590478.jpg',
    cta: '/pexels-audrey-mari-1016051-3421920.jpg',
  },
  'monochromatic': {
    hero: '/pexels-pixabay-301614.jpg',
    cta: '/pexels-andrey-grushnikov-223358-707680.jpg',
  },

  // Vibrant/colorful styles
  'bold': {
    hero: '/pexels-vincent-ma-janssen-1310788.jpg', // Orange torii gates
    cta: '/pexels-belle-co-99483-402028.jpg',
  },
  'vibrant': {
    hero: '/pexels-vincent-ma-janssen-1310788.jpg',
    testimonials: '/pexels-audrey-mari-1016051-3421920.jpg',
  },

  // Nature/organic styles
  'organic': {
    hero: '/pexels-pixabay-302100.jpg',
    cta: '/pexels-spdel-2758567.jpg', // Pavilion reflection
  },
  'nature': {
    hero: '/pexels-liger-pham-232622-1108701.jpg', // Mt Fuji lake
    cta: '/pexels-spdel-2758567.jpg',
  },

  // Soft/elegant styles
  'soft-pastel': {
    hero: '/pexels-nien-tran-dinh-788736-1654748.jpg', // Himeji castle cherry blossoms
    testimonials: '/pexels-evgeny-tchebotarev-1058775-2187661.jpg',
  },
  'elegant': {
    hero: '/pexels-nien-tran-dinh-788736-1654748.jpg',
    cta: '/pexels-tomas-malik-793526-3408353.jpg',
  },
  'luxury': {
    hero: '/pexels-tomas-malik-793526-3408353.jpg',
    cta: '/pexels-belle-co-99483-402028.jpg',
  },

  // Cultural styles
  'cultural': {
    hero: '/pexels-satoshi-1325837.jpg',
    cta: '/pexels-vincent-ma-janssen-1310788.jpg',
  },

  // Styles that should have NO images
  'terminal': {},

  // Default fallback for styles without specific images
  'default': {
    hero: '/pexels-belle-co-99483-402028.jpg',
    cta: '/pexels-liger-pham-232622-1108701.jpg',
  }
};

// Get images for a style, with fallback
function getStyleImages(styleId) {
  return styleImages[styleId] || styleImages['default'];
}

function WebsitePreview({ selectedStyle }) {
  const style = styleData[selectedStyle];
  const images = getStyleImages(selectedStyle);

  if (!style) {
    return <div className="website-preview">Select a style to preview</div>;
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
    <div className={`website-preview style-${selectedStyle}`} style={cssVars}>
      <div className="website-container" style={backgroundStyle}>
        {/* Style-specific overlays */}
        {style.hasScanlines && <div className="scanlines-overlay" />}
        {style.hasGrid && <div className="grid-overlay" />}
        {style.hasNoise && <div className="noise-overlay" />}
        {style.hasGrain && <div className="grain-overlay" />}

        {/* Decorative elements for website */}
        <WebsiteDecorations styleId={selectedStyle} />

        {/* Navigation Bar */}
        <nav className="web-nav">
          <div className="web-nav-inner">
            <div className="web-nav-logo">
              <span className="web-logo-icon">語</span>
              <span className="web-logo-text">NihongoLab</span>
            </div>
            <div className="web-nav-links">
              <a href="#" className="web-nav-link active">Home</a>
              <a href="#" className="web-nav-link">Features</a>
              <a href="#" className="web-nav-link">Pricing</a>
              <a href="#" className="web-nav-link">Blog</a>
            </div>
            <div className="web-nav-actions">
              <button className="web-btn web-btn-ghost">Log in</button>
              <button className="web-btn web-btn-primary">Get Started</button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="web-hero" style={images.hero ? { '--hero-image': `url(${images.hero})` } : {}}>
          {images.hero && <div className="web-hero-bg" />}
          <div className="web-hero-content">
            <div className="web-badge">New: AI-powered learning paths</div>
            <h1 className="web-hero-title">
              Master Japanese<br />
              <span className="web-hero-accent">the natural way</span>
            </h1>
            <p className="web-hero-subtitle">
              Learn through immersion, not memorization. Our AI adapts to your pace
              and learning style for faster, lasting fluency.
            </p>
            <div className="web-hero-cta">
              <button className="web-btn web-btn-primary web-btn-lg">
                Start learning free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="web-btn web-btn-secondary web-btn-lg">Watch demo</button>
            </div>
          </div>
          <div className="web-hero-visual">
            <div className="web-hero-card">
              <div className="web-card-header">Today's Phrase</div>
              <div className="web-card-jp">お疲れ様です</div>
              <div className="web-card-romaji">Otsukaresama desu</div>
              <div className="web-card-en">"Thank you for your hard work"</div>
            </div>
          </div>
        </section>

        {/* Logo Cloud / Partners - Clean Marquee */}
        <section className="web-logos">
          <p className="web-logos-label">Trusted by teams at</p>
          <div className="web-logos-marquee">
            <div className="web-logos-track">
              <span className="web-logo-text">Google</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Stripe</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Notion</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Figma</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Linear</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Vercel</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">OpenAI</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Anthropic</span>
              <span className="web-logo-divider">·</span>
              {/* Duplicate for seamless loop */}
              <span className="web-logo-text">Google</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Stripe</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Notion</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Figma</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Linear</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Vercel</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">OpenAI</span>
              <span className="web-logo-divider">·</span>
              <span className="web-logo-text">Anthropic</span>
              <span className="web-logo-divider">·</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="web-stats-section">
          <div className="web-stats-grid">
            <div className="web-stats-card">
              <div className="web-stats-number">50K+</div>
              <div className="web-stats-label">Active Learners</div>
              <div className="web-stats-trend web-stats-trend-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  <path d="M17 6h6v6" />
                </svg>
                +12% this month
              </div>
            </div>
            <div className="web-stats-card">
              <div className="web-stats-number">2.5M</div>
              <div className="web-stats-label">Lessons Completed</div>
              <div className="web-stats-trend web-stats-trend-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  <path d="M17 6h6v6" />
                </svg>
                +28% this month
              </div>
            </div>
            <div className="web-stats-card">
              <div className="web-stats-number">98%</div>
              <div className="web-stats-label">Satisfaction Rate</div>
              <div className="web-stats-bar">
                <div className="web-stats-bar-fill" style={{ width: '98%' }} />
              </div>
            </div>
            <div className="web-stats-card">
              <div className="web-stats-number">4.9</div>
              <div className="web-stats-label">App Store Rating</div>
              <div className="web-stats-stars">★★★★★</div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs (subtle) */}
        <div className="web-breadcrumbs">
          <span>Home</span>
          <span className="web-breadcrumb-sep">/</span>
          <span>Features</span>
          <span className="web-breadcrumb-sep">/</span>
          <span className="web-breadcrumb-current">Overview</span>
        </div>

        {/* Features Section with Sidebar Layout */}
        <section className="web-features">
          <div className="web-features-grid">
            {/* Sidebar */}
            <aside className="web-sidebar">
              <h3 className="web-sidebar-title">Quick Links</h3>
              <ul className="web-sidebar-links">
                <li className="active">Vocabulary</li>
                <li>Grammar</li>
                <li>Kanji Practice</li>
                <li>Listening</li>
                <li>Speaking</li>
              </ul>
              <div className="web-sidebar-box">
                <div className="web-sidebar-box-icon">🎯</div>
                <div className="web-sidebar-box-text">
                  <strong>Pro tip:</strong> Practice 15 minutes daily for optimal retention
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="web-features-main">
              <h2 className="web-section-title">Why learners choose us</h2>
              <p className="web-section-subtitle">
                Built by language experts and powered by AI for personalized learning.
              </p>

              <div className="web-feature-cards">
                <div className="web-feature-card">
                  <div className="web-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3>Adaptive Learning</h3>
                  <p>AI adjusts difficulty based on your progress and weak points.</p>
                </div>
                <div className="web-feature-card">
                  <div className="web-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3>Spaced Repetition</h3>
                  <p>Science-backed review intervals for long-term memory.</p>
                </div>
                <div className="web-feature-card">
                  <div className="web-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <h3>Native Audio</h3>
                  <p>Learn pronunciation from native Japanese speakers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="web-pricing">
          <h2 className="web-section-title">Simple, transparent pricing</h2>
          <p className="web-section-subtitle">Start free, upgrade when you're ready</p>

          <div className="web-pricing-toggle">
            <span className="web-pricing-toggle-label active">Monthly</span>
            <div className="web-toggle">
              <div className="web-toggle-track">
                <div className="web-toggle-thumb" />
              </div>
            </div>
            <span className="web-pricing-toggle-label">Yearly <span className="web-pricing-save">Save 20%</span></span>
          </div>

          <div className="web-pricing-grid">
            <div className="web-pricing-card">
              <div className="web-pricing-header">
                <h3>Free</h3>
                <p>For casual learners</p>
              </div>
              <div className="web-pricing-price">
                <span className="web-pricing-amount">$0</span>
                <span className="web-pricing-period">/month</span>
              </div>
              <ul className="web-pricing-features">
                <li><span className="web-check">✓</span> 10 lessons per day</li>
                <li><span className="web-check">✓</span> Basic vocabulary</li>
                <li><span className="web-check">✓</span> Progress tracking</li>
                <li className="web-pricing-disabled"><span className="web-x">✕</span> Offline mode</li>
                <li className="web-pricing-disabled"><span className="web-x">✕</span> Advanced grammar</li>
              </ul>
              <button className="web-btn web-btn-secondary web-btn-full">Get started</button>
            </div>

            <div className="web-pricing-card web-pricing-featured">
              <div className="web-pricing-badge">Most Popular</div>
              <div className="web-pricing-header">
                <h3>Pro</h3>
                <p>For serious learners</p>
              </div>
              <div className="web-pricing-price">
                <span className="web-pricing-amount">$12</span>
                <span className="web-pricing-period">/month</span>
              </div>
              <ul className="web-pricing-features">
                <li><span className="web-check">✓</span> Unlimited lessons</li>
                <li><span className="web-check">✓</span> Full vocabulary</li>
                <li><span className="web-check">✓</span> Advanced grammar</li>
                <li><span className="web-check">✓</span> Offline mode</li>
                <li><span className="web-check">✓</span> JLPT prep courses</li>
              </ul>
              <button className="web-btn web-btn-primary web-btn-full">Start free trial</button>
            </div>

            <div className="web-pricing-card">
              <div className="web-pricing-header">
                <h3>Team</h3>
                <p>For companies & schools</p>
              </div>
              <div className="web-pricing-price">
                <span className="web-pricing-amount">$49</span>
                <span className="web-pricing-period">/month</span>
              </div>
              <ul className="web-pricing-features">
                <li><span className="web-check">✓</span> Everything in Pro</li>
                <li><span className="web-check">✓</span> Team management</li>
                <li><span className="web-check">✓</span> Progress reports</li>
                <li><span className="web-check">✓</span> Custom content</li>
                <li><span className="web-check">✓</span> Priority support</li>
              </ul>
              <button className="web-btn web-btn-secondary web-btn-full">Contact sales</button>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="web-form-section">
          <h2 className="web-section-title">Contact Us</h2>
          <p className="web-section-subtitle">Have questions? We'd love to hear from you.</p>

          <div className="web-form-container">
            <form className="web-form">
              <div className="web-form-row">
                <div className="web-form-group">
                  <label className="web-label">First Name</label>
                  <input type="text" className="web-input" placeholder="John" />
                </div>
                <div className="web-form-group">
                  <label className="web-label">Last Name</label>
                  <input type="text" className="web-input" placeholder="Doe" />
                </div>
              </div>

              <div className="web-form-group">
                <label className="web-label">Email</label>
                <input type="email" className="web-input" placeholder="john@example.com" />
                <span className="web-input-hint">We'll never share your email.</span>
              </div>

              <div className="web-form-group">
                <label className="web-label">Subject</label>
                <select className="web-select">
                  <option>Select a topic...</option>
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="web-form-group">
                <label className="web-label">Message</label>
                <textarea className="web-textarea" rows="4" placeholder="How can we help you?"></textarea>
              </div>

              <div className="web-form-group">
                <label className="web-label">Experience Level</label>
                <div className="web-radio-group">
                  <label className="web-radio">
                    <input type="radio" name="level" defaultChecked />
                    <span className="web-radio-mark"></span>
                    Beginner
                  </label>
                  <label className="web-radio">
                    <input type="radio" name="level" />
                    <span className="web-radio-mark"></span>
                    Intermediate
                  </label>
                  <label className="web-radio">
                    <input type="radio" name="level" />
                    <span className="web-radio-mark"></span>
                    Advanced
                  </label>
                </div>
              </div>

              <div className="web-form-group">
                <label className="web-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span className="web-checkbox-mark"></span>
                  Subscribe to our newsletter
                </label>
              </div>

              <div className="web-form-actions">
                <button type="button" className="web-btn web-btn-secondary">Cancel</button>
                <button type="submit" className="web-btn web-btn-primary">Send Message</button>
              </div>
            </form>

            {/* Alerts */}
            <div className="web-alerts">
              <div className="web-alert web-alert-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <strong>Success!</strong> Your message has been sent.
                </div>
              </div>
              <div className="web-alert web-alert-warning">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <strong>Warning:</strong> Please complete all required fields.
                </div>
              </div>
              <div className="web-alert web-alert-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>
                  <strong>Error:</strong> Something went wrong. Please try again.
                </div>
              </div>
              <div className="web-alert web-alert-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <strong>Tip:</strong> Complete your profile for personalized lessons.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress/Loading Section */}
        <section className="web-progress-section">
          <h2 className="web-section-title">Your Progress</h2>
          <div className="web-progress-cards">
            <div className="web-progress-card">
              <div className="web-progress-header">
                <span>Vocabulary</span>
                <span className="web-progress-value">72%</span>
              </div>
              <div className="web-progress-bar">
                <div className="web-progress-fill" style={{ width: '72%' }} />
              </div>
            </div>
            <div className="web-progress-card">
              <div className="web-progress-header">
                <span>Grammar</span>
                <span className="web-progress-value">45%</span>
              </div>
              <div className="web-progress-bar">
                <div className="web-progress-fill" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="web-progress-card">
              <div className="web-progress-header">
                <span>Kanji</span>
                <span className="web-progress-value">28%</span>
              </div>
              <div className="web-progress-bar">
                <div className="web-progress-fill" style={{ width: '28%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="web-cta" style={images.cta ? { '--cta-image': `url(${images.cta})` } : {}}>
          {images.cta && <div className="web-cta-bg" />}
          <div className="web-cta-content">
            <h2>Ready to start your journey?</h2>
            <p>Join thousands of learners mastering Japanese every day.</p>
            <div className="web-cta-actions">
              <input type="email" placeholder="Enter your email" className="web-input" />
              <button className="web-btn web-btn-primary">Get started</button>
            </div>
            <span className="web-cta-note">Free 14-day trial. No credit card required.</span>
          </div>
        </section>

        {/* Team Section */}
        <section className="web-team">
          <h2 className="web-section-title">Meet the team</h2>
          <p className="web-section-subtitle">Language experts and engineers building the future of learning</p>
          <div className="web-team-grid">
            <div className="web-team-member">
              <div className="web-team-avatar">
                <span>田</span>
              </div>
              <h4>Tanaka Yuki</h4>
              <p className="web-team-role">Founder & CEO</p>
              <p className="web-team-bio">Former linguist at Tokyo University. 15+ years teaching Japanese.</p>
            </div>
            <div className="web-team-member">
              <div className="web-team-avatar">
                <span>M</span>
              </div>
              <h4>Maria Santos</h4>
              <p className="web-team-role">Head of Product</p>
              <p className="web-team-bio">Ex-Duolingo. Passionate about making learning accessible to all.</p>
            </div>
            <div className="web-team-member">
              <div className="web-team-avatar">
                <span>J</span>
              </div>
              <h4>James Chen</h4>
              <p className="web-team-role">Lead Engineer</p>
              <p className="web-team-bio">Built AI systems at Google. JLPT N1 certified learner.</p>
            </div>
            <div className="web-team-member">
              <div className="web-team-avatar">
                <span>A</span>
              </div>
              <h4>Aiko Nakamura</h4>
              <p className="web-team-role">Content Director</p>
              <p className="web-team-bio">Native speaker. Creates authentic, culturally-rich lessons.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="web-faq">
          <h2 className="web-section-title">Frequently asked questions</h2>
          <p className="web-section-subtitle">Everything you need to know to get started</p>
          <div className="web-faq-list">
            <details className="web-faq-item" open>
              <summary className="web-faq-question">
                <span>How long does it take to become fluent?</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="web-faq-answer">
                <p>With consistent practice of 15-30 minutes daily, most learners reach conversational fluency in 12-18 months. Our AI adapts to your pace, helping you progress faster by focusing on areas that need the most attention.</p>
              </div>
            </details>
            <details className="web-faq-item">
              <summary className="web-faq-question">
                <span>Can I learn Japanese without knowing hiragana?</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="web-faq-answer">
                <p>Absolutely! We start complete beginners with romaji and gradually introduce hiragana through our proven character recognition system. Most users master hiragana within the first 2-3 weeks.</p>
              </div>
            </details>
            <details className="web-faq-item">
              <summary className="web-faq-question">
                <span>Is there a mobile app available?</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="web-faq-answer">
                <p>Yes! NihongoLab is available on iOS, Android, and web. Your progress syncs automatically across all devices, so you can learn anywhere.</p>
              </div>
            </details>
            <details className="web-faq-item">
              <summary className="web-faq-question">
                <span>What makes NihongoLab different from other apps?</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="web-faq-answer">
                <p>Our AI-powered adaptive learning system creates a personalized curriculum just for you. Unlike one-size-fits-all approaches, we analyze your strengths and weaknesses in real-time to optimize your learning path.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Testimonials */}
        <section className="web-testimonials" style={images.testimonials ? { '--testimonials-image': `url(${images.testimonials})` } : {}}>
          {images.testimonials && <div className="web-testimonials-bg" />}
          <h2 className="web-section-title">Loved by learners</h2>
          <div className="web-testimonial-grid">
            <div className="web-testimonial">
              <div className="web-testimonial-stars">★★★★★</div>
              <p>"Finally an app that makes learning kanji enjoyable. The spaced repetition really works!"</p>
              <div className="web-testimonial-author">
                <div className="web-testimonial-avatar">S</div>
                <div>
                  <strong>Sarah M.</strong>
                  <span>Learning for 6 months</span>
                </div>
              </div>
            </div>
            <div className="web-testimonial">
              <div className="web-testimonial-stars">★★★★★</div>
              <p>"The native audio helped me understand real conversational Japanese, not textbook language."</p>
              <div className="web-testimonial-author">
                <div className="web-testimonial-avatar">K</div>
                <div>
                  <strong>Kevin L.</strong>
                  <span>JLPT N3 passed</span>
                </div>
              </div>
            </div>
            <div className="web-testimonial">
              <div className="web-testimonial-stars">★★★★★</div>
              <p>"すごい！This app understood exactly where I was struggling and adapted perfectly."</p>
              <div className="web-testimonial-author">
                <div className="web-testimonial-avatar">Y</div>
                <div>
                  <strong>Yuki T.</strong>
                  <span>Heritage learner</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="web-footer">
          <div className="web-footer-main">
            <div className="web-footer-brand">
              <div className="web-footer-logo">
                <span className="web-logo-icon">語</span>
                <span className="web-logo-text">NihongoLab</span>
              </div>
              <p>Making Japanese accessible to everyone, everywhere.</p>
              <div className="web-footer-social">
                <a href="#" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="web-footer-links">
              <div className="web-footer-col">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Mobile App</a>
                <a href="#">API</a>
              </div>
              <div className="web-footer-col">
                <h4>Resources</h4>
                <a href="#">Blog</a>
                <a href="#">Documentation</a>
                <a href="#">Community</a>
                <a href="#">JLPT Guide</a>
              </div>
              <div className="web-footer-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
                <a href="#">Press</a>
              </div>
              <div className="web-footer-col">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Cookies</a>
              </div>
            </div>
          </div>

          <div className="web-footer-bottom">
            <span>© 2025 NihongoLab. All rights reserved.</span>
            <span className="web-footer-style-badge">{style.name} style</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Website-specific decorations
function WebsiteDecorations({ styleId }) {
  switch (styleId) {
    case 'glassmorphism':
      return (
        <div className="web-deco-glass">
          <div className="web-glass-blob web-glass-blob-1" />
          <div className="web-glass-blob web-glass-blob-2" />
          <div className="web-glass-blob web-glass-blob-3" />
        </div>
      );

    case 'brutalist':
    case 'neubrutalism':
      return (
        <div className="web-deco-brutal">
          <div className="web-brutal-block web-brutal-block-1" />
          <div className="web-brutal-block web-brutal-block-2" />
          <div className="web-brutal-marquee">JAPANESE ★ LEARN ★ NIHONGO ★ 日本語 ★</div>
        </div>
      );

    case 'memphis':
      return (
        <div className="web-deco-memphis">
          <div className="web-memphis-shape web-memphis-zigzag" />
          <div className="web-memphis-shape web-memphis-dots" />
          <div className="web-memphis-shape web-memphis-circle" />
          <div className="web-memphis-shape web-memphis-triangle" />
          <div className="web-memphis-shape web-memphis-squiggle" />
        </div>
      );

    case 'retro-futuristic':
      return (
        <div className="web-deco-retro">
          <div className="web-retro-grid" />
          <div className="web-retro-sun" />
          <div className="web-retro-horizon" />
        </div>
      );

    case 'vaporwave':
      return (
        <div className="web-deco-vapor">
          <div className="web-vapor-grid" />
          <div className="web-vapor-statue" />
          <div className="web-vapor-palm web-vapor-palm-1" />
          <div className="web-vapor-palm web-vapor-palm-2" />
        </div>
      );

    case 'cyberpunk':
      return (
        <div className="web-deco-cyber">
          <div className="web-cyber-scanline" />
          <div className="web-cyber-glitch-bar web-cyber-glitch-1" />
          <div className="web-cyber-glitch-bar web-cyber-glitch-2" />
          <div className="web-cyber-corner web-cyber-corner-tl" />
          <div className="web-cyber-corner web-cyber-corner-tr" />
          <div className="web-cyber-corner web-cyber-corner-bl" />
          <div className="web-cyber-corner web-cyber-corner-br" />
        </div>
      );

    case 'art-deco':
      return (
        <div className="web-deco-artdeco">
          <div className="web-artdeco-border" />
          <div className="web-artdeco-fan web-artdeco-fan-1" />
          <div className="web-artdeco-fan web-artdeco-fan-2" />
          <div className="web-artdeco-lines" />
        </div>
      );

    case 'bauhaus':
      return (
        <div className="web-deco-bauhaus">
          <div className="web-bauhaus-circle" />
          <div className="web-bauhaus-square" />
          <div className="web-bauhaus-triangle" />
          <div className="web-bauhaus-line" />
        </div>
      );

    case 'swiss':
      return (
        <div className="web-deco-swiss">
          <div className="web-swiss-grid" />
          <div className="web-swiss-accent" />
        </div>
      );

    case 'terminal':
      return (
        <div className="web-deco-terminal">
          <div className="web-terminal-scanline" />
          <div className="web-terminal-cursor" />
          <div className="web-terminal-prompt">&gt; _</div>
        </div>
      );

    case 'y2k':
      return (
        <div className="web-deco-y2k">
          <div className="web-y2k-star web-y2k-star-1">✦</div>
          <div className="web-y2k-star web-y2k-star-2">✧</div>
          <div className="web-y2k-star web-y2k-star-3">★</div>
          <div className="web-y2k-bubble web-y2k-bubble-1" />
          <div className="web-y2k-bubble web-y2k-bubble-2" />
          <div className="web-y2k-chrome" />
        </div>
      );

    case 'kawaii':
      return (
        <div className="web-deco-kawaii">
          <div className="web-kawaii-cloud web-kawaii-cloud-1" />
          <div className="web-kawaii-cloud web-kawaii-cloud-2" />
          <div className="web-kawaii-star">★</div>
          <div className="web-kawaii-heart">♥</div>
          <div className="web-kawaii-sparkle">✨</div>
        </div>
      );

    case 'organic':
    case 'wabi-sabi':
      return (
        <div className="web-deco-organic">
          <div className="web-organic-blob web-organic-blob-1" />
          <div className="web-organic-blob web-organic-blob-2" />
          <div className="web-organic-texture" />
        </div>
      );

    case 'luxury':
      return (
        <div className="web-deco-luxury">
          <div className="web-luxury-frame" />
          <div className="web-luxury-accent" />
        </div>
      );

    case 'editorial':
      return (
        <div className="web-deco-editorial">
          <div className="web-editorial-line web-editorial-line-1" />
          <div className="web-editorial-line web-editorial-line-2" />
          <div className="web-editorial-dropcap">N</div>
        </div>
      );

    case 'industrial':
      return (
        <div className="web-deco-industrial">
          <div className="web-industrial-stripe" />
          <div className="web-industrial-bolt web-industrial-bolt-1" />
          <div className="web-industrial-bolt web-industrial-bolt-2" />
        </div>
      );

    case 'gradient':
      return (
        <div className="web-deco-gradient">
          <div className="web-gradient-mesh" />
        </div>
      );

    case 'maximalist':
      return (
        <div className="web-deco-maximalist">
          <div className="web-max-layer web-max-layer-1" />
          <div className="web-max-layer web-max-layer-2" />
          <div className="web-max-layer web-max-layer-3" />
          <div className="web-max-pattern" />
        </div>
      );

    case 'dark-mode':
      return (
        <div className="web-deco-dark">
          <div className="web-dark-glow web-dark-glow-1" />
          <div className="web-dark-glow web-dark-glow-2" />
          <div className="web-dark-stars" />
        </div>
      );

    case 'minimalist':
      return (
        <div className="web-deco-minimal">
          <div className="web-minimal-line" />
        </div>
      );

    case 'corporate':
    case 'corporate-memphis':
      return (
        <div className="web-deco-corporate">
          <div className="web-corporate-shape web-corporate-shape-1" />
          <div className="web-corporate-shape web-corporate-shape-2" />
        </div>
      );

    case 'isometric':
      return (
        <div className="web-deco-isometric">
          <div className="web-iso-cube web-iso-cube-1" />
          <div className="web-iso-cube web-iso-cube-2" />
          <div className="web-iso-cube web-iso-cube-3" />
        </div>
      );

    case 'claymorphism':
      return (
        <div className="web-deco-clay">
          <div className="web-clay-blob web-clay-blob-1" />
          <div className="web-clay-blob web-clay-blob-2" />
        </div>
      );

    case 'neomorphism':
      return (
        <div className="web-deco-neo">
          <div className="web-neo-shape web-neo-shape-1" />
          <div className="web-neo-shape web-neo-shape-2" />
        </div>
      );

    case 'soft-pastel':
    case 'playful':
      return (
        <div className="web-deco-pastel">
          <div className="web-pastel-blob web-pastel-blob-1" />
          <div className="web-pastel-blob web-pastel-blob-2" />
          <div className="web-pastel-star">✦</div>
        </div>
      );

    default:
      return null;
  }
}

export default WebsitePreview;
