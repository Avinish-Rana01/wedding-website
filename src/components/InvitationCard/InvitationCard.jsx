import { weddingData } from '../../data/weddingData'
import './InvitationCard.css'

/**
 * InvitationCard.jsx — Screen 2: Full Scrollable Luxury Wedding Invitation
 * Mobile-first architecture, hidden scrollbars, smooth touch momentum,
 * and high-contrast royal gold stationery styling.
 */
export default function InvitationCard({ onReplay }) {
  return (
    <main className="invitation-page" aria-label="Royal Wedding Invitation for Prachi and Sumit">
      {/* Sacred Geometry Watermark Background */}
      <div className="invitation-watermark" aria-hidden="true" />

      {/* Ambient Golden Halo Backdrop */}
      <div className="invitation-ambient-halo" aria-hidden="true" />

      {/* Main Scrollable Card Container (Scrollbar Hidden, Momentum Smooth) */}
      <div className="invitation-scroll-container">
        <article className="invitation-card-sheet" aria-label="Wedding Invitation Stationery">
          {/* Gold Foil Borders & Corner Filigrees */}
          <div className="card-outer-border" aria-hidden="true" />
          <div className="card-inner-border" aria-hidden="true" />
          <div className="corner-flourish corner-tl" aria-hidden="true" />
          <div className="corner-flourish corner-tr" aria-hidden="true" />
          <div className="corner-flourish corner-bl" aria-hidden="true" />
          <div className="corner-flourish corner-br" aria-hidden="true" />

          {/* Invitation Stationery Content */}
          <div className="card-content-body">
            {/* Auspicious Invocation Header */}
            {weddingData.general.showInvocation && (
              <header className="card-invocation-group">
                <p className="card-invocation" lang="sa">
                  {weddingData.general.invocation}
                </p>
                <p className="card-invocation-sub">
                  {weddingData.general.invocationSub}
                </p>
              </header>
            )}

            {/* P & S Monogram Crest Motif */}
            <div className="card-monogram-crest" aria-hidden="true">
              <span className="crest-line" />
              <span className="crest-seal">
                <span className="crest-initials">{weddingData.couple.monogram}</span>
              </span>
              <span className="crest-line" />
            </div>

            {/* Formal Wedding Invitation Heading */}
            <span className="card-heading-tag">{weddingData.general.heading}</span>

            {/* Formal Family Announcement & Blessing Plea */}
            <p className="card-greeting">{weddingData.general.invitationGreeting}</p>
            <p className="card-plea">{weddingData.general.invitationPlea}</p>

            {/* Single Semantic Primary H1 for Couple Names (High Contrast Gold Foil) */}
            <h1 className="card-couple-heading">
              <span className="couple-name">{weddingData.couple.bride.firstName}</span>
              <span className="couple-ampersand" aria-hidden="true">&amp;</span>
              <span className="couple-name">{weddingData.couple.groom.firstName}</span>
            </h1>

            {/* Tagline */}
            <p className="card-tagline">{weddingData.general.tagline}</p>

            {/* Save The Date Ribbon */}
            <div className="card-save-date-badge">
              <span className="badge-sparkle" aria-hidden="true">✦</span>
              <span>Save the Date • Celebrations Ahead</span>
              <span className="badge-sparkle" aria-hidden="true">✦</span>
            </div>

            {/* Decorative Divider preparing for future sections */}
            <div className="card-bottom-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-ornament">❖</span>
              <span className="divider-line" />
            </div>
          </div>
        </article>
      </div>

      {/* Floating Discreet Replay Action Button */}
      <aside className="floating-replay-bar" aria-label="Invitation Controls">
        <button
          type="button"
          className="floating-replay-btn"
          onClick={onReplay}
          aria-label="Fold and replay envelope opening ceremony"
        >
          <span className="floating-replay-icon" aria-hidden="true">↺</span>
          <span className="floating-replay-text">Replay Opening</span>
        </button>
      </aside>
    </main>
  )
}
