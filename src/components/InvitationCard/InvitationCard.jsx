import { weddingData } from '../../data/weddingData'
import './InvitationCard.css'

/**
 * InvitationCard.jsx — Screen 2: Full Scrollable Luxury Cream Wedding Invitation
 * Features:
 * - High-end cream & ivory luxury stationery parchment aesthetic
 * - Authentic 24K gold foil borders and corner filigrees
 * - Sacred invocation (॥ श्री गणेशाय नमः ॥) with traditional blessing emblem
 * - Couple reveal for Prachi & Sumit in embossed gold foil calligraphy
 * - Complete 5-event itinerary (Haldi, Mehendi, Sangeet, Wedding, Reception)
 * - Strict '__' placeholder compliance per WEDDING_CONTENT.md
 * - Dedicated RSVP section & venue cards
 * - Smooth touch momentum scrolling with hidden scrollbars
 * - Floating replay button to re-seal the envelope
 */
export default function InvitationCard({ onReplay }) {
  const getEventBadgeClass = (theme) => {
    switch (theme) {
      case 'haldi': return 'badge-haldi'
      case 'mehendi': return 'badge-mehendi'
      case 'sangeet': return 'badge-sangeet'
      case 'wedding': return 'badge-wedding'
      case 'reception': return 'badge-reception'
      default: return 'badge-default'
    }
  }

  return (
    <main className="invitation-page" aria-label="Royal Wedding Invitation for Prachi and Sumit">
      {/* Background Sacred Geometric Watermark */}
      <div className="invitation-watermark" aria-hidden="true" />
      <div className="invitation-ambient-halo" aria-hidden="true" />

      {/* Main Scrollable Card Container */}
      <div className="invitation-scroll-container">
        <article className="invitation-card-sheet" aria-label="Wedding Invitation Stationery">
          {/* Gold Foil Double Borders & Corner Filigrees */}
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
                <div className="ganesha-symbol" aria-hidden="true">
                  <svg viewBox="0 0 40 40" width="36" height="36" fill="currentColor">
                    <path d="M20 3 C12 3 9 7 9 12 C9 17 12 21 16 23 C14 25 12 28 12 32 C12 37 16 38 20 38 C24 38 28 37 28 32 C28 28 26 25 24 23 C28 21 31 17 31 12 C31 7 28 3 20 3 Z M20 6 C25 6 27 9 27 12 C27 15 25 18 20 18 C15 18 13 15 13 12 C13 9 15 6 20 6 Z M18 25 C19 25.5 20 25.5 21 25 C23 27 25 29 25 32 C25 34.5 23 35.5 20 35.5 C17 35.5 15 34.5 15 32 C15 29 17 27 18 25 Z" />
                  </svg>
                </div>
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

            {/* Single Semantic Primary H1 for Couple Names (Gold Foil Calligraphy) */}
            <h1 className="card-couple-heading">
              <span className="couple-name">{weddingData.couple.bride.firstName}</span>
              <span className="couple-ampersand" aria-hidden="true">&amp;</span>
              <span className="couple-name">{weddingData.couple.groom.firstName}</span>
            </h1>

            {/* Tagline */}
            <p className="card-tagline">{weddingData.general.tagline}</p>

            {/* Couple Branding & Save The Date Badge */}
            <div className="card-badges-row">
              <div className="card-save-date-badge">
                <span className="badge-sparkle" aria-hidden="true">✦</span>
                <span>Save the Date • Celebrations Ahead</span>
                <span className="badge-sparkle" aria-hidden="true">✦</span>
              </div>
              {weddingData.couple.hashtag && (
                <div className="card-hashtag-badge">
                  <span>{weddingData.couple.hashtag}</span>
                </div>
              )}
            </div>

            {/* Ornamental Section Divider */}
            <div className="card-ornamental-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-ornament">❖ ❦ ❖</span>
              <span className="divider-line" />
            </div>

            {/* ============================================================== */}
            {/* EVENT ITINERARY (The 5 Sacred Wedding Functions)              */}
            {/* ============================================================== */}
            <section className="events-itinerary-section" aria-label="Wedding Events Itinerary">
              <div className="section-title-wrap">
                <h2 className="section-title">The Wedding Festivities</h2>
                <p className="section-subtitle">Five sacred celebrations marking our union</p>
              </div>

              <div className="events-grid">
                {weddingData.events.map((event, index) => (
                  <article key={event.id} className="event-card" aria-label={event.title}>
                    <div className="event-header-row">
                      <span className={`event-index-pill ${getEventBadgeClass(event.theme)}`}>
                        0{index + 1}
                      </span>
                      <h3 className="event-title">{event.title}</h3>
                    </div>

                    <p className="event-tagline">{event.tagline}</p>

                    <div className="event-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Date & Time</span>
                        <span className="detail-value">{event.date} • {event.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Venue</span>
                        <span className="detail-value">{event.venue}</span>
                        {event.address && event.address !== '__' && (
                          <span className="detail-address">{event.address}</span>
                        )}
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Attire</span>
                        <span className="detail-value detail-attire">{event.dressCode}</span>
                      </div>
                    </div>

                    {event.mapUrl && (
                      <div className="event-action-row">
                        <a
                          href={event.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-map-btn"
                          aria-label={`View map directions for ${event.title}`}
                        >
                          <span className="map-btn-icon" aria-hidden="true">📍</span>
                          <span>Get Directions</span>
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Ornamental Section Divider */}
            <div className="card-ornamental-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-ornament">❖</span>
              <span className="divider-line" />
            </div>

            {/* ============================================================== */}
            {/* CELEBRATION VENUE CARD                                         */}
            {/* ============================================================== */}
            <section className="venue-section" aria-label="Celebration Venue">
              <div className="venue-card">
                <span className="venue-pin-badge" aria-hidden="true">🏛️</span>
                <h3 className="venue-title">{weddingData.venueSummary.title}</h3>
                <p className="venue-hall">{weddingData.venueSummary.hall}</p>
                <p className="venue-address">{weddingData.venueSummary.address}</p>
                <p className="venue-city">{weddingData.venueSummary.city}</p>
                <a
                  href={weddingData.venueSummary.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue-directions-btn"
                >
                  <span aria-hidden="true">🗺️</span>
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </section>

            {/* ============================================================== */}
            {/* RSVP SECTION                                                   */}
            {/* ============================================================== */}
            <section className="rsvp-section" aria-label="RSVP & Hospitality">
              <div className="rsvp-card">
                <span className="rsvp-badge">RSVP</span>
                <h3 className="rsvp-heading">Kindly Grace Our Occasion</h3>
                <p className="rsvp-note">{weddingData.rsvp.note}</p>

                <div className="rsvp-actions">
                  <a
                    href={`https://wa.me/${weddingData.rsvp.whatsappNumber !== '__' ? weddingData.rsvp.whatsappNumber : ''}?text=${encodeURIComponent(weddingData.rsvp.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-rsvp-btn"
                    aria-label="Confirm attendance via WhatsApp"
                  >
                    <span className="btn-icon" aria-hidden="true">💬</span>
                    <span>Confirm via WhatsApp</span>
                  </a>

                  {weddingData.rsvp.phone !== '__' && (
                    <a
                      href={`tel:${weddingData.rsvp.phone}`}
                      className="call-rsvp-btn"
                      aria-label="Call RSVP contact"
                    >
                      <span className="btn-icon" aria-hidden="true">📞</span>
                      <span>Call {weddingData.rsvp.contactPerson}</span>
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* Traditional Family Blessing & Footer */}
            <footer className="card-footer-note">
              <p className="family-blessing">{weddingData.general.familyBlessing}</p>
              <div className="footer-monogram" aria-hidden="true">
                <span>{weddingData.couple.monogram}</span>
              </div>
            </footer>

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
          <span className="floating-replay-text">{weddingData.general.instructionReplay}</span>
        </button>
      </aside>
    </main>
  )
}
