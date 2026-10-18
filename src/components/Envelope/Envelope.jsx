import { useState } from 'react'
import { weddingData } from '../../data/weddingData'
import './Envelope.css'

/**
 * Envelope.jsx — 3D Interactive Royal Envelope Opening Experience
 * Refined for Phase 3: Haute couture stationery, enhanced lighting depth,
 * and preparation for transition into the full wedding website.
 */
export default function Envelope({ onOpenStateChange, onExplore }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isBursting, setIsBursting] = useState(false)

  const handleOpen = () => {
    if (isOpen || isOpening) return

    setIsOpening(true)
    if (onOpenStateChange) {
      onOpenStateChange({ isOpening: true, isOpen: false, isBursting: false })
    }

    // Step 1: Wax seal crack & release (0ms)
    // Step 2: 3D flap unfolds backward, rays burst, card emerges (180ms)
    setTimeout(() => {
      setIsOpen(true)
      setIsBursting(true)
      if (onOpenStateChange) {
        onOpenStateChange({ isOpening: false, isOpen: true, isBursting: true })
      }
    }, 180)

    // Step 3: Burst settles into ambient golden backlight behind the card (1300ms)
    setTimeout(() => {
      setIsBursting(false)
      setIsOpening(false)
      if (onOpenStateChange) {
        onOpenStateChange({ isOpening: false, isOpen: true, isBursting: false })
      }
    }, 1300)
  }

  const handleReset = (e) => {
    e.stopPropagation()
    setIsOpen(false)
    setIsOpening(false)
    setIsBursting(false)
    if (onOpenStateChange) {
      onOpenStateChange({ isOpening: false, isOpen: false, isBursting: false })
    }
  }

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isOpen && !isOpening) {
      e.preventDefault()
      handleOpen()
    }
  }

  const handleExploreClick = (e) => {
    e.stopPropagation()
    if (onExplore) {
      onExplore()
    }
  }

  return (
    <main className="envelope-scene" aria-label="Wedding Invitation Envelope">
      {/* Subtle Rotating Damask / Sacred Geometry Watermark */}
      <div className="scene-watermark" aria-hidden="true" />

      {/* Header Guidance (Fades out gracefully once the envelope opens) */}
      <header className={`scene-header ${isOpen ? 'hidden-state' : ''}`}>
        <div className="scene-title-badge">
          <span className="ornament-bullet">✦</span>
          <span>{weddingData.general.instructionOpen}</span>
          <span className="ornament-bullet">✦</span>
        </div>
        <p className="scene-instruction">
          <span className="pulse-dot" aria-hidden="true" />
          <span>{weddingData.general.instructionTap}</span>
        </p>
      </header>

      {/* 3D Envelope Container */}
      <div
        className={`envelope-wrapper ${isOpen ? 'is-open' : 'idle-state'} ${isOpening ? 'is-opening' : ''}`}
        onClick={!isOpen ? handleOpen : undefined}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={!isOpen ? 0 : -1}
        aria-label="Open wedding invitation for Prachi and Sumit"
        aria-expanded={isOpen}
      >
        <div className="envelope-box">
          {/* Layer 1: Envelope Back Plate with Inner Silk Lining */}
          <div className="envelope-back">
            <div className="envelope-back-inner-pattern" />
          </div>

          {/* Layer 2: Radiant Golden Light Rays Burst & Ambient Backlight */}
          <div className={`light-rays-burst ${isBursting ? 'active-burst' : ''} ${isOpen ? 'settled-glow' : ''}`} aria-hidden="true">
            <div className="light-rays-core" />
            <div className="light-beam beam-1" />
            <div className="light-beam beam-2" />
            <div className="light-beam beam-3" />
            <div className="light-beam beam-4" />
            <div className="light-beam beam-5" />
            <div className="light-beam beam-6" />
          </div>

          {/* Soft ambient back aura behind card when emerged */}
          <div className={`card-ambient-halo ${isOpen ? 'halo-visible' : ''}`} aria-hidden="true" />

          {/* Layer 3: The Rising Royal Invitation Card */}
          <div className="invitation-card-slot">
            <article className="invitation-card" aria-label="Royal Wedding Invitation Card">
              {/* Card Gold Foil Frames & Corner Filigrees */}
              <div className="card-outer-border" aria-hidden="true" />
              <div className="card-inner-border" aria-hidden="true" />
              <div className="corner-flourish corner-tl" aria-hidden="true" />
              <div className="corner-flourish corner-tr" aria-hidden="true" />
              <div className="corner-flourish corner-bl" aria-hidden="true" />
              <div className="corner-flourish corner-br" aria-hidden="true" />

              {/* Card Stationery Typography & Sacred Announcements */}
              <div className="card-content">
                {/* Auspicious Invocation Header */}
                <p className="card-invocation">{weddingData.general.invocation}</p>
                <p className="card-invocation-sub">{weddingData.general.invocationSub}</p>

                {/* Restrained P & S Monogram Seal Motif */}
                <div className="card-monogram-crest" aria-hidden="true">
                  <span className="crest-line" />
                  <span className="crest-seal">
                    <span className="crest-initials">{weddingData.couple.monogram}</span>
                  </span>
                  <span className="crest-line" />
                </div>

                {/* Tasteful Wedding Invitation Heading */}
                <span className="card-heading-tag">{weddingData.general.heading}</span>

                {/* Formal Announcement */}
                <p className="card-greeting">{weddingData.general.invitationGreeting}</p>
                <p className="card-plea">{weddingData.general.invitationPlea}</p>

                {/* Couple Names (High Contrast Gold Foil Typography) */}
                <div className="card-couple-block">
                  <h1 className="couple-name">{weddingData.couple.bride.firstName}</h1>
                  <span className="couple-ampersand" aria-hidden="true">&amp;</span>
                  <h1 className="couple-name">{weddingData.couple.groom.firstName}</h1>
                </div>

                {/* Subtitle / Tagline */}
                <p className="card-tagline">{weddingData.general.tagline}</p>

                {/* Save The Date Badge */}
                <div className="card-save-date-badge">
                  <span>{weddingData.general.saveTheDate} • {weddingData.couple.hashtag}</span>
                </div>

                {/* Invitation Action Buttons (Prepared for full site transition) */}
                <div className="card-actions-row">
                  <button
                    type="button"
                    className="card-explore-btn"
                    onClick={handleExploreClick}
                    aria-label="Explore wedding celebration details"
                  >
                    <span>{weddingData.general.instructionExplore}</span>
                    <span className="btn-arrow" aria-hidden="true">▾</span>
                  </button>

                  <button
                    type="button"
                    className="card-replay-btn"
                    onClick={handleReset}
                    aria-label="Fold and close invitation envelope"
                  >
                    <span className="replay-icon" aria-hidden="true">↺</span>
                    <span>{weddingData.general.instructionReplay}</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Layer 4: Envelope Front Pockets (Masks card inside when closed) */}
          <div className="envelope-pocket-left" aria-hidden="true" />
          <div className="envelope-pocket-right" aria-hidden="true" />
          <div className="envelope-pocket-bottom" aria-hidden="true" />

          {/* Layer 5: 3D Folding Top Flap */}
          <div className="envelope-flap-container" aria-hidden="true">
            <div className="envelope-flap-outer">
              <div className="flap-edge-gold" />
            </div>
            <div className="envelope-flap-inner" />
          </div>

          {/* Layer 6: Golden Wax Seal with 'P & S' Monogram */}
          <div className={`wax-seal-wrapper ${isOpening ? 'releasing-seal' : ''} ${isOpen ? 'broken-seal' : ''}`}>
            <button
              type="button"
              className="wax-seal-btn"
              onClick={handleOpen}
              aria-label="Break wax seal and open invitation"
              tabIndex={!isOpen ? 0 : -1}
            >
              <div className="seal-rim-beads" aria-hidden="true" />
              <div className="seal-inner-circle">
                <span className="seal-monogram">{weddingData.couple.monogram}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
