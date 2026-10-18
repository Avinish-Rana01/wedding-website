import { useEffect, useRef } from 'react'

/**
 * Particles.jsx
 * Canvas-based ambient golden dust and dynamic burst particles.
 * High performance (60fps), GPU-friendly, low memory footprint.
 */
export default function Particles({ triggerBurst = false, burstOrigin = { x: 0.5, y: 0.5 } }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Base ambient particles (soft golden dust)
    const AMBIENT_COUNT = 38
    const particles = []

    const createAmbientParticle = (initialY = null) => {
      return {
        x: Math.random() * width,
        y: initialY !== null ? initialY : Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.55 + 0.15,
        targetAlpha: Math.random() * 0.55 + 0.15,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? '251, 238, 164' : '212, 175, 55',
      }
    }

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      particles.push(createAmbientParticle())
    }

    // Dynamic burst particles
    const burstParticles = []

    const addBurst = () => {
      const originX = width * burstOrigin.x
      const originY = height * burstOrigin.y
      const BURST_COUNT = 45

      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6.5 + 2.0
        burstParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          radius: Math.random() * 2.5 + 1.2,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.008,
          gravity: 0.04,
          color: Math.random() > 0.3 ? '255, 243, 176' : '212, 175, 55',
        })
      }
    }

    if (triggerBurst) {
      addBurst()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw and update ambient particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y += p.speedY
        p.x += p.speedX
        p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed

        if (Math.abs(p.targetAlpha - p.alpha) < 0.05) {
          p.targetAlpha = Math.random() * 0.6 + 0.15
        }

        // Wrap around screen edges
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.8})`
        ctx.fill()
      }

      // 2. Draw and update burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i]
        bp.x += bp.vx
        bp.y += bp.vy
        bp.vy += bp.gravity
        bp.vx *= 0.98
        bp.alpha -= bp.decay

        if (bp.alpha <= 0) {
          burstParticles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${bp.color}, ${bp.alpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(255, 240, 160, ${bp.alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [triggerBurst, burstOrigin])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
      aria-hidden="true"
    />
  )
}
