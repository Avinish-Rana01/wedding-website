import { useState, useRef, useEffect, useCallback } from 'react'
import { weddingData } from '../../data/weddingData'
import './Envelope.css'

/**
 * Finite animation states for predictable envelope lifecycle
 */
const STATUS = {
  CLOSED: 'closed',
  OPENING: 'opening',
  OPEN: 'open',
}

/**
 * Envelope.jsx — 3D Interactive Royal Wedding Envelope
 * Audited & Refactored: Single authoritative trigger, immediate sync guard,
 * strict timer cancellation, semantic heading hierarchy, and zero dead actions.
 */
export default function Envelope({ onOpenStateChange }) {
  const [status, setStatus] = useState(STATUS.CLOSED)
  const [isBursting, setIsBursting] = useState(false)

  // Immediate synchronous guard preventing race conditions / double bubbling
  const isActionPendingRef = useRef(false)
  const timersRef = useRef([])

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id))
    timersRef.current = []
  }, [])

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const safeTimeout = useCallback((callback, delay) => {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter((tId) => tId !== id)
      callback()
    }, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const handleOpen = useCallback((e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }

    // Synchronous guard
    if (isActionPendingRef.current || status !== STATUS.CLOSED) return
    isActionPendingRef.current = true

    // Step 1: Wax seal breaks and top flap begins folding backward (0ms)
    setStatus(STATUS.OPENING)
    if (onOpenStateChange) {
      onOpenStateChange({ isOpening: true, isOpen: false, isBursting: false })
    }

    // Step 2: Golden rays ignite as flap clears opening (320ms)
    safeTimeout(() => {
      setIsBursting(true)
      if (onOpenStateChange) {
        onOpenStateChange({ isOpening: true, isOpen: false, isBursting: true })
      }
    }, 320)

    // Step 3: Top flap is fully folded behind back plate; card ascends (480ms)
    safeTimeout(() => {
      setStatus(STATUS.OPEN)
      if (onOpenStateChange) {
        onOpenStateChange({ isOpening: false, isOpen: true, isBursting: true })
      }
    }, 480)

    // Step 4: Burst settles into ambient golden aura behind emerged card (1500ms)
    safeTimeout(() => {
      setIsBursting(false)
      isActionPendingRef.current = false
      if (onOpenStateChange) {
        onOpenStateChange({ isOpening: false, isOpen: true, isBursting: false })
      }
    }, 1500)
  }, [status, onOpenStateChange, safeTimeout])

  const handleReset = useCallback((e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }

    clearAllTimers()
    isActionPendingRef.current = false
    setStatus(STATUS.CLOSED)
    setIsBursting(false)

    if (onOpenStateChange) {
      onOpenStateChange({ isOpening: false, isOpen: false, isBursting: false })
    }
  }, [clearAllTimers, onOpenStateChange])

  const handleEnvelopeClick = (e) => {
    // Only open if clicked while closed and action not already pending
    if (status === STATUS.CLOSED && !isActionPendingRef.current) {
      handleOpen(e)
    }
  }

  const isOpen = status === STATUS.OPEN
  const isOpening = status === STATUS.OPENING

  return (
    <main className="envelope-scene" aria-label="Wedding Invitation Envelope Experience">
      {/* Subtle Rotating Damask / Sacred Geometry Watermark */}
      <div className="scene-watermark" aria-hidden="true" />

      {/* Header Guidance (Fades out gracefully once the envelope opens) */}
      <header className={`scene-header ${isOpen ? 'hidden-state' : ''}`}>
        <div className="scene-title-badge">
          <span className="ornament-bullet" aria-hidden="true">✦</span>
          <span>{weddingData.general.instructionOpen}</span>
          <span className="ornament-bullet" aria-hidden="true">✦</span>
        </div>
        <p className="scene-instruction">
          <span className="pulse-dot" aria-hidden="true" />
          <span>{weddingData.general.instructionTap}</span>
        </p>
      </header>

      {/* 3D Envelope Container (Pure scene container with optional surface tap) */}
      <div
        className={`envelope-wrapper ${isOpen ? 'is-open' : 'idle-state'} ${isOpening ? 'is-opening' : ''}`}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-box">
          {/* Layer 1: Envelope Back Plate with Inner Silk Lining */}
          <div className="envelope-back">
            <div className="envelope-back-inner-pattern" />
          </div>

          {/* Layer 2: Radiant Golden Light Rays Burst & Ambient Backlight */}
          <div
            className={`light-rays-burst ${isBursting ? 'active-burst' : ''} ${isOpen ? 'settled-glow' : ''}`}
            aria-hidden="true"
          >
            <div className="light-rays-core" />
            <div className="light-beam beam-1" />
            <div className="light-beam beam-2" />
            <div className="light-beam beam-3" />
            <div className="light-beam beam-4" />
            <div className="light-beam beam-5" />
            <div className="light-beam beam-6" />
          </div>

          {/* Soft ambient backlight behind card when emerged */}
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
                {weddingData.general.showInvocation && (
                  <>
                    <p className="card-invocation" lang="sa">{weddingData.general.invocation}</p>
                    <p className="card-invocation-sub">{weddingData.general.invocationSub}</p>
                  </>
                )}

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

                {/* Single Semantic H1 for Couple Names (High Contrast Gold Foil) */}
                <h1 className="card-couple-heading">
                  <span className="couple-name">{weddingData.couple.bride.firstName}</span>
                  <span className="couple-ampersand" aria-hidden="true">&amp;</span>
                  <span className="couple-name">{weddingData.couple.groom.firstName}</span>
                </h1>

                {/* Tagline */}
                <p className="card-tagline">{weddingData.general.tagline}</p>

                {/* Save The Date Ribbon */}
                <div className="card-save-date-badge">
                  <span>Save the Date • Celebrations Ahead</span>
                </div>

                {/* Card Action Controls: Clean, functional replay action */}
                <div className="card-actions-row">
                  <button
                    type="button"
                    className="card-replay-btn"
                    onClick={handleReset}
                    aria-label="Fold and close invitation envelope"
                    tabIndex={isOpen ? 0 : -1}
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
          </div>

          {/* Layer 6: Golden Wax Seal (Authoritative focusable accessible button) */}
          <div
            className={`wax-seal-wrapper ${isOpening ? 'releasing-seal' : ''} ${isOpen ? 'broken-seal' : ''}`}
          >
            <button
              type="button"
              className="wax-seal-btn"
              onClick={handleOpen}
              aria-label="Break golden wax seal and open invitation for Prachi and Sumit"
              aria-expanded={isOpen}
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
