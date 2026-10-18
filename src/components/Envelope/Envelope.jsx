import { useState, useRef, useEffect, useCallback } from 'react'
import { weddingData } from '../../data/weddingData'
import './Envelope.css'

/**
 * Finite animation states for predictable envelope lifecycle
 */
const STATUS = {
  CLOSED: 'closed',
  OPENING: 'opening',
  DISSOLVING: 'dissolving',
}

/**
 * Envelope.jsx — Screen 1: 3D Royal Wedding Envelope Opening Ritual
 * Features golden wax seal, 3D flap opening, dramatic sunlight rays burst,
 * and smooth dissolve transitioning into Screen 2 (the scrollable invitation).
 */
export default function Envelope({ onOpenComplete, onBurstChange }) {
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

    // Synchronous immediate guard
    if (isActionPendingRef.current || status !== STATUS.CLOSED) return
    isActionPendingRef.current = true

    // Step 1: Wax seal breaks and top flap begins folding backward in 3D (0ms)
    setStatus(STATUS.OPENING)

    // Step 2: Intense golden sunlight rays explode from inside the envelope cavity (280ms)
    safeTimeout(() => {
      setIsBursting(true)
      if (onBurstChange) onBurstChange(true)
    }, 280)

    // Step 3: Envelope dissolves into the golden sunlight (620ms)
    safeTimeout(() => {
      setStatus(STATUS.DISSOLVING)
    }, 620)

    // Step 4: Complete transition to Screen 2 (full scrollable invitation) (920ms)
    safeTimeout(() => {
      setIsBursting(false)
      isActionPendingRef.current = false
      if (onBurstChange) onBurstChange(false)
      if (onOpenComplete) onOpenComplete()
    }, 920)
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
    <main className="envelope-scene" aria-label="Royal Wedding Envelope Opening Ceremony">
      {/* Sacred Geometry Watermark Background */}
      <div className="scene-watermark" aria-hidden="true" />

      {/* Header Guidance Badge & Instruction */}
      <header className={`scene-header ${!isClosed ? 'hidden-state' : ''}`}>
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

      {/* 3D Envelope Container */}
      <div
        className={`envelope-wrapper ${isClosed ? 'idle-state' : ''} ${isOpening ? 'is-opening' : ''} ${isDissolving ? 'is-dissolving' : ''}`}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-box">
          {/* Layer 1: Envelope Back Plate with Inner Silk Lining */}
          <div className="envelope-back">
            <div className="envelope-back-inner-pattern" />
          </div>

          {/* Layer 2: Radiant Warm Sunlight Rays Burst */}
          <div
            className={`light-rays-burst ${isBursting ? 'active-burst' : ''}`}
            aria-hidden="true"
          >
            <div className="light-rays-core" />
            <div className="light-beam beam-1" />
            <div className="light-beam beam-2" />
            <div className="light-beam beam-3" />
            <div className="light-beam beam-4" />
            <div className="light-beam beam-5" />
            <div className="light-beam beam-6" />
            <div className="light-beam beam-7" />
            <div className="light-beam beam-8" />
            <div className="light-beam beam-9" />
            <div className="light-beam beam-10" />
            <div className="light-beam beam-11" />
            <div className="light-beam beam-12" />
          </div>

          {/* Layer 3: Envelope Front Triangular Pockets */}
          <div className="envelope-pocket-left" aria-hidden="true" />
          <div className="envelope-pocket-right" aria-hidden="true" />
          <div className="envelope-pocket-bottom" aria-hidden="true" />

          {/* Layer 4: 3D Folding Top Flap */}
          <div className="envelope-flap-container" aria-hidden="true">
            <div className="envelope-flap-outer">
              <div className="flap-edge-gold" />
            </div>
          </div>

          {/* Layer 5: Golden Wax Seal (Authoritative focusable accessible button) */}
          <div
            className={`wax-seal-wrapper ${!isClosed ? 'releasing-seal' : ''}`}
          >
            <button
              type="button"
              className="wax-seal-btn"
              onClick={handleOpen}
              aria-label="Break golden wax seal and open invitation for Prachi and Sumit"
              aria-expanded={!isClosed}
              tabIndex={isClosed ? 0 : -1}
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
