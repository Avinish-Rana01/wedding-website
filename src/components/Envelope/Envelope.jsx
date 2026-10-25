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
 * Inspired directly by luxury wedding stationery references:
 * - Covers the mobile viewport completely ("the mobile should look like an envelope")
 * - Authentic blind-embossed floral paper texture
 * - Precision 3D V-flap fold with gold border trim
 * - 24K gold wax seal stamp with "P & S" and laurel wreath
 * - Volumetric golden sunlight rays bursting from inside upon tap
 * - Seamless dissolve into Screen 2
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

    // Step 1: Seal breaks & flap begins folding backward in 3D (0ms)
    setStatus(STATUS.OPENING)

    // Step 2: Intense volumetric golden sunlight rays burst from the cavity (260ms)
    safeTimeout(() => {
      setIsBursting(true)
      if (onBurstChange) onBurstChange(true)
    }, 260)

    // Step 3: Envelope dissolves into the golden sunlight (680ms)
    safeTimeout(() => {
      setStatus(STATUS.DISSOLVING)
    }, 680)

    // Step 4: Complete transition to Screen 2 (1050ms)
    safeTimeout(() => {
      setIsBursting(false)
      isActionPendingRef.current = false
      if (onBurstChange) onBurstChange(false)
      if (onOpenComplete) onOpenComplete()
    }, 1050)
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

      {/* Background Interior Back Plate with Gold Lattice Lining */}
      <div className="envelope-cavity-back" aria-hidden="true">
        <div className="cavity-gold-lining" />
        <div className="cavity-card-peek">
          <div className="peek-gold-rim" />
          <p className="peek-names">{weddingData.couple.bride.firstName} &amp; {weddingData.couple.groom.firstName}</p>
        </div>
      </div>

      {/* Volumetric Sunlight Rays Burst Engine */}
      <div className={`sunlight-burst ${isBursting ? 'active-burst' : ''}`} aria-hidden="true">
        <div className="sunlight-core-glow" />
        <div className="sunlight-central-flare" />
        <div className="rays-spokes spokes-layer-1">
          <div className="ray-beam r-1" />
          <div className="ray-beam r-2" />
          <div className="ray-beam r-3" />
          <div className="ray-beam r-4" />
          <div className="ray-beam r-5" />
          <div className="ray-beam r-6" />
        </div>
        <div className="rays-spokes spokes-layer-2">
          <div className="ray-beam r-7" />
          <div className="ray-beam r-8" />
          <div className="ray-beam r-9" />
          <div className="ray-beam r-10" />
          <div className="ray-beam r-11" />
          <div className="ray-beam r-12" />
        </div>
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

      {/* Top V-Flap (Folds in 3D perspective from top edge) */}
      <div className="envelope-flap-3d-wrapper" aria-hidden="true">
        {/* Outer Face (Embossed texture pointing down) */}
        <div className="flap-face-outer">
          <div className="flap-texture" />
          {/* Triangular Gold Foil Edge Borders */}
          <svg className="flap-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="50" y2="100" stroke="url(#goldGrad)" strokeWidth="1.8" />
            <line x1="100" y1="0" x2="50" y2="100" stroke="url(#goldGrad)" strokeWidth="1.8" />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf1b8" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#9e7518" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Inner Face (Gold lining visible once folded 180deg backward) */}
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
