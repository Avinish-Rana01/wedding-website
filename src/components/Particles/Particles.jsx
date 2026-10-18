import { useEffect, useRef } from 'react'

/**
 * Particles.jsx — Ambient Golden Dust & Dynamic Burst Particle System
 * High performance, GPU-friendly, DPR-aware, resilient to parent re-renders.
 */
export default function Particles({ triggerBurst = false, burstOrigin = null }) {
  const canvasRef = useRef(null)
  const burstParticlesRef = useRef([])
  const isHiddenRef = useRef(false)
  const animFrameRef = useRef(null)

  // Trigger burst effect when triggerBurst becomes true
  useEffect(() => {
    if (!triggerBurst) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate real burst origin or fallback to center
    const originX = burstOrigin && typeof burstOrigin.x === 'number'
      ? burstOrigin.x
      : width * 0.5
    const originY = burstOrigin && typeof burstOrigin.y === 'number'
      ? burstOrigin.y
      : height * 0.48

    const BURST_COUNT = 40
    const newParticles = []

    for (let i = 0; i < BURST_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 5.5 + 2.0
      newParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        radius: Math.random() * 2.2 + 1.0,
        alpha: 1.0,
        decay: Math.random() * 0.016 + 0.009,
        gravity: 0.035,
        color: Math.random() > 0.35 ? '255, 245, 180' : '212, 175, 55',
      })
    }

    burstParticlesRef.current.push(...newParticles)
  }, [triggerBurst, burstOrigin])

  // Single mount effect: ambient loop and canvas management
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cssWidth = 0
    let cssHeight = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const updateDimensions = () => {
      if (!canvas) return
      cssWidth = window.innerWidth
      cssHeight = window.innerHeight
      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions, { passive: true })

    const handleVisibilityChange = () => {
      isHiddenRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Ambient floating particles
    const AMBIENT_COUNT = 32
    const ambientParticles = []

    const createAmbient = (initialY = null) => ({
      x: Math.random() * cssWidth,
      y: initialY !== null ? initialY : Math.random() * cssHeight,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.5 + 0.15,
      targetAlpha: Math.random() * 0.5 + 0.15,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      pulseSpeed: Math.random() * 0.018 + 0.006,
      color: Math.random() > 0.4 ? '251, 238, 164' : '212, 175, 55',
    })

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientParticles.push(createAmbient())
    }

    const render = () => {
      if (!isHiddenRef.current) {
        ctx.clearRect(0, 0, cssWidth, cssHeight)

        // 1. Ambient particles
        for (let i = 0; i < ambientParticles.length; i++) {
          const p = ambientParticles[i]
          p.y += p.speedY
          p.x += p.speedX
          p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed

          if (Math.abs(p.targetAlpha - p.alpha) < 0.04) {
            p.targetAlpha = Math.random() * 0.55 + 0.15
          }

          if (p.y < -10) {
            p.y = cssHeight + 10
            p.x = Math.random() * cssWidth
          }
          if (p.x < -10) p.x = cssWidth + 10
          if (p.x > cssWidth + 10) p.x = -10

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
          ctx.shadowBlur = 5
          ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.7})`
          ctx.fill()
        }

        // 2. Burst particles
        const burstList = burstParticlesRef.current
        for (let i = burstList.length - 1; i >= 0; i--) {
          const bp = burstList[i]
          bp.x += bp.vx
          bp.y += bp.vy
          bp.vy += bp.gravity
          bp.vx *= 0.985
          bp.alpha -= bp.decay

          if (bp.alpha <= 0) {
            burstList.splice(i, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${bp.color}, ${bp.alpha})`
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(255, 240, 160, ${bp.alpha})`
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', updateDimensions)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  )
}
