import { useState, useRef, useEffect, useCallback } from 'react'
import { weddingData } from '../../data/weddingData'
import './Envelope.css'

const STATUS = {
  CLOSED: 'closed',
  OPENING: 'opening',
  DISSOLVING: 'dissolving',
}

const LIGHT_STAGE = {
  OFF: 'off',
  EMERGING: 'emerging',   // 120ms: subtle warm glow escaping through opening gap
  EXPANDING: 'expanding', // 350ms: volumetric beams emerge & widen
  PEAK: 'peak',           // 1100ms: full volumetric god rays brilliance
  SOFTENING: 'softening', // 1650ms: softening into ambient golden glow
}

/**
 * Envelope.jsx — Screen 1: Mobile-First Realistic Luxury Cream Envelope
 * Features:
 * - Slow, elegant flap opening (1.4s physical weight curve)
 * - Synchronized golden light rays starting as soon as flap lifts (120ms)
 * - Layered volumetric god rays engine (SVG tapered beams, core glow, atmospheric haze)
 * - Photorealistic embossed cotton paper flap image with gold border & floral relief
 * - 24K gold wax seal stamp with "P & S" monogram & laurel wreath
 * - Clean physical envelope look without artificial crossing border lines
 */
export default function Envelope({ onOpenComplete, onBurstChange }) {
  const [status, setStatus] = useState(STATUS.CLOSED)
  const [lightStage, setLightStage] = useState(LIGHT_STAGE.OFF)

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

    // Step 1 (0ms): Wax seal releases & flap begins slow, weighted 1.4s 3D rotation
    setStatus(STATUS.OPENING)

    // Step 2 (120ms): Flap lifts ~12°, warm light emerges through the opening beneath the flap
    safeTimeout(() => {
      setLightStage(LIGHT_STAGE.EMERGING)
    }, 120)

    // Step 3 (380ms): As opening widens, volumetric rays progressively emerge and expand outward
    safeTimeout(() => {
      setLightStage(LIGHT_STAGE.EXPANDING)
      if (onBurstChange) onBurstChange(true)
    }, 380)

    // Step 4 (1100ms): Near full open position, rays reach peak majestic illumination
    safeTimeout(() => {
      setLightStage(LIGHT_STAGE.PEAK)
    }, 1100)

    // Step 5 (1600ms): Rays soften naturally as envelope prepares to reveal card
    safeTimeout(() => {
      setLightStage(LIGHT_STAGE.SOFTENING)
      setStatus(STATUS.DISSOLVING)
    }, 1600)

    // Step 6 (2150ms): Clean transition to Screen 2
    safeTimeout(() => {
      setLightStage(LIGHT_STAGE.OFF)
      isActionPendingRef.current = false
      if (onBurstChange) onBurstChange(false)
      if (onOpenComplete) onOpenComplete()
    }, 2150)
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
      {/* Background Interior Back Cavity with Gold Lattice Lining (Visible behind flap) */}
      <div className="envelope-cavity-back" aria-hidden="true">
        <div className="cavity-gold-lining" />
        <div className="cavity-card-peek">
          <div className="peek-gold-rim" />
          <p className="peek-names">{weddingData.couple.bride.firstName} &amp; {weddingData.couple.groom.firstName}</p>
        </div>
      </div>

      {/* Layered Volumetric Golden God Rays Engine (Anchored at cavity opening) */}
      <div
        className={`volumetric-lighting-system stage-${lightStage}`}
        aria-hidden="true"
      >
        {/* Layer A & C: Concentrated Atmospheric Core Bloom */}
        <div className="light-core-ambient" />
        <div className="light-core-hotspot" />

        {/* Layer B: Multi-Directional Upward & Outward Tapered SVG God Rays */}
        <svg
          className="volumetric-beams-svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="softRayBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.8" />
            </filter>
            <filter id="wideRayBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="13" />
            </filter>

            {/* Core radial glow */}
            <radialGradient id="radialCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#fff8d2" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#d4af37" stopOpacity="0.4" />
              <stop offset="90%" stopColor="#b8860b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
            </radialGradient>

            {/* Directional beam gradients (Champagne-white core transitioning to gold) */}
            <linearGradient id="beamCoreUp" x1="50%" y1="50%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#fef3c7" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#d4af37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamUpLeft1" x1="50%" y1="50%" x2="35%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="22%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="68%" stopColor="#d4af37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamUpRight1" x1="50%" y1="50%" x2="65%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="22%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="68%" stopColor="#d4af37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamDiagLeft" x1="50%" y1="50%" x2="15%" y2="5%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#fae7a0" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#d4af37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamDiagRight" x1="50%" y1="50%" x2="85%" y2="5%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#fae7a0" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#d4af37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamWideLeft" x1="50%" y1="50%" x2="0%" y2="25%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="28%" stopColor="#fde68a" stopOpacity="0.65" />
              <stop offset="72%" stopColor="#d4af37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamWideRight" x1="50%" y1="50%" x2="100%" y2="25%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="28%" stopColor="#fde68a" stopOpacity="0.65" />
              <stop offset="72%" stopColor="#d4af37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamHorizLeft" x1="50%" y1="50%" x2="0%" y2="46%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#fde68a" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#d4af37" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beamHorizRight" x1="50%" y1="50%" x2="100%" y2="46%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#fde68a" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#d4af37" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Central atmospheric radial core glow */}
          <ellipse cx="400" cy="388" rx="140" ry="90" fill="url(#radialCoreGrad)" filter="url(#wideRayBlur)" />

          {/* Broad atmospheric soft shafts */}
          <g filter="url(#wideRayBlur)" opacity="0.6" className="broad-shafts">
            <polygon points="400,388 300,-40 500,-40" fill="url(#beamCoreUp)" />
            <polygon points="398,389 40,30 190,-30" fill="url(#beamDiagLeft)" />
            <polygon points="402,389 610,-30 760,30" fill="url(#beamDiagRight)" />
            <polygon points="397,390 -30,220 50,130" fill="url(#beamHorizLeft)" />
            <polygon points="403,390 750,130 830,220" fill="url(#beamHorizRight)" />
          </g>

          {/* Defined volumetric god rays with natural tapered widths radiating upward and outward */}
          <g filter="url(#softRayBlur)" className="defined-rays">
            {/* Center high vertical shafts */}
            <polygon points="398,386 385,-40 415,-40 402,386" fill="url(#beamCoreUp)" opacity="0.95" />
            <polygon points="396,386 350,-20 450,-20 404,386" fill="url(#beamCoreUp)" opacity="0.85" />

            {/* Inner diagonal shafts */}
            <polygon points="397,387 310,-30 360,-30 400,387" fill="url(#beamUpLeft1)" opacity="0.9" />
            <polygon points="400,387 440,-30 490,-30 403,387" fill="url(#beamUpRight1)" opacity="0.9" />

            {/* Diagonal left & right shafts */}
            <polygon points="396,388 170,-10 240,-20 399,387" fill="url(#beamDiagLeft)" opacity="0.88" />
            <polygon points="401,388 560,-20 630,-10 404,387" fill="url(#beamDiagRight)" opacity="0.88" />

            {/* Mid diagonal shafts */}
            <polygon points="395,389 60,70 135,25 398,388" fill="url(#beamWideLeft)" opacity="0.82" />
            <polygon points="402,389 665,25 740,70 405,388" fill="url(#beamWideRight)" opacity="0.82" />

            {/* Low outward shafts fanning across the rim */}
            <polygon points="394,390 -10,190 40,130 397,389" fill="url(#beamHorizLeft)" opacity="0.75" />
            <polygon points="403,390 760,130 810,190 406,389" fill="url(#beamHorizRight)" opacity="0.75" />
          </g>
        </svg>

        {/* Layer E: Atmospheric optical shimmer and dust motes */}
        <div className="sunlight-optical-overlay" />
      </div>

      {/* Lower Envelope Pocket (Embossed Paper Front Pocket with Invitation Copy) */}
      <div className="envelope-lower-body" aria-hidden="true">
        <div className="lower-body-texture" />
        {/* Layer D: Restrained warm light spill on pocket rim */}
        <div className={`paper-light-spill stage-${lightStage}`} />

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

      {/* Top Triangular Flap (Slow 1.4s 3D Perspective Fold with Photographic Flap) */}
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

