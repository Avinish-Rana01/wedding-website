import { useState, useRef, useEffect, useCallback } from 'react'
import { weddingData } from '../../data/weddingData'
import './Envelope.css'

const STATUS = {
  CLOSED: 'closed',
  OPENING: 'opening',
  DISSOLVING: 'dissolving',
}

/**
 * Envelope.jsx — Screen 1: Mobile-First Realistic Luxury Cream Envelope
 * Features:
 * - Photorealistic embossed cotton paper flap image with gold border & floral relief
 * - 24K gold wax seal stamp with "P & S" monogram & laurel wreath
 * - Cinematic volumetric god rays / sunlight burst engine
 * - Full-screen mobile envelope immersion
 */
export default function Envelope({ onOpenComplete, onBurstChange }) {
  const [status, setStatus] = useState(STATUS.CLOSED)
  const [isBursting, setIsBursting] = useState(false)

  const isActionPendingRef = useRef(false)
  const timersRef = useRef([])

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id))
    timersRef.current = []
  }, [])

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

    if (isActionPendingRef.current || status !== STATUS.CLOSED) return
    isActionPendingRef.current = true

    // Step 1: Seal breaks & flap folds backward in 3D (0ms)
    setStatus(STATUS.OPENING)

    // Step 2: Intense cinematic volumetric sunlight rays burst from the cavity (250ms)
    safeTimeout(() => {
      setIsBursting(true)
      if (onBurstChange) onBurstChange(true)
    }, 250)

    // Step 3: Envelope dissolves into the golden sunlight bloom (1100ms)
    safeTimeout(() => {
      setStatus(STATUS.DISSOLVING)
    }, 1100)

    // Step 4: Complete transition to Screen 2 (1550ms)
    safeTimeout(() => {
      setIsBursting(false)
      isActionPendingRef.current = false
      if (onBurstChange) onBurstChange(false)
      if (onOpenComplete) onOpenComplete()
    }, 1550)
  }, [status, onOpenComplete, onBurstChange, safeTimeout])

  const handleEnvelopeClick = (e) => {
    if (status === STATUS.CLOSED && !isActionPendingRef.current) {
      handleOpen(e)
    }
  }

  const isClosed = status === STATUS.CLOSED
  const isOpening = status === STATUS.OPENING
  const isDissolving = status === STATUS.DISSOLVING

  return (
    <div
      className={`mobile-envelope-container ${isClosed ? 'is-idle' : ''} ${isOpening ? 'is-opening' : ''} ${isDissolving ? 'is-dissolving' : ''}`}
      onClick={handleEnvelopeClick}
      role="region"
      aria-label="Royal Wedding Envelope Opening Ritual"
    >
      {/* Outer Inset Gold Foil Border Frame */}
      <div className="envelope-outer-frame" aria-hidden="true">
        <div className="frame-corner frame-tl" />
        <div className="frame-corner frame-tr" />
        <div className="frame-corner frame-bl" />
        <div className="frame-corner frame-br" />
      </div>

      {/* Background Interior Back Cavity with Gold Lattice Lining */}
      <div className="envelope-cavity-back" aria-hidden="true">
        <div className="cavity-gold-lining" />
        <div className="cavity-card-peek">
          <div className="peek-gold-rim" />
          <p className="peek-names">{weddingData.couple.bride.firstName} &amp; {weddingData.couple.groom.firstName}</p>
        </div>
      </div>

      {/* Cinematic Volumetric Sunlight Rays Burst Engine */}
      <div className={`sunlight-burst ${isBursting ? 'active-burst' : ''}`} aria-hidden="true">
        <div className="sunlight-ambient-flash" />
        <div className="sunlight-photo-flare flare-layer-1" />
        <div className="sunlight-photo-flare flare-layer-2" />
        <div className="sunlight-core-hotspot" />
      </div>

      {/* Lower Envelope Pocket (Embossed Paper Body with Invitation Text) */}
      <div className="envelope-lower-body" aria-hidden="true">
        <div className="lower-body-texture" />
        <div className="lower-invitation-copy">
          <div className="copy-flourish">❖ ❦ ❖</div>
          <span className="copy-invited-badge">YOU ARE INVITED</span>
          <h2 className="copy-couple-names">
            {weddingData.couple.bride.firstName} &amp; {weddingData.couple.groom.firstName}
          </h2>
          <p className="copy-tap-hint">
            <span className="hint-pulse-dot" />
            <span>Tap wax seal to open</span>
          </p>
        </div>
      </div>

      {/* Top Triangular Flap (Photographic Embossed Flap with 3D Fold) */}
      <div className="envelope-flap-3d-wrapper" aria-hidden="true">
        {/* Outer Face: Realistic Embossed Flap Image */}
        <div className="flap-face-outer">
          <img
            src="/envelope-flap.png"
            alt="Embossed Luxury Wedding Flap"
            className="flap-photo-image"
            draggable="false"
          />
        </div>
        {/* Inner Face: Gold silk lining visible once folded 180deg backward */}
        <div className="flap-face-inner">
          <div className="flap-inner-gold-silk" />
        </div>
      </div>

      {/* Realistic 24K Gold Wax Seal Stamp in the exact center */}
      <div className={`wax-seal-wrapper ${!isClosed ? 'releasing-seal' : ''}`}>
        <button
          type="button"
          className="wax-seal-btn"
          onClick={handleOpen}
          aria-label="Break golden wax seal and open invitation for Prachi and Sumit"
          aria-expanded={!isClosed}
          tabIndex={isClosed ? 0 : -1}
        >
          <img
            src="/gold-wax-seal.jpg"
            alt="P & S Royal Golden Wax Seal"
            className="wax-seal-image"
            draggable="false"
          />
        </button>
      </div>
    </div>
  )
}
