import { useState, useCallback } from 'react'
import Envelope from './components/Envelope/Envelope'
import InvitationCard from './components/InvitationCard/InvitationCard'
import Particles from './components/Particles/Particles'

/**
 * App.jsx — Wedding Invitation Experience for Prachi & Sumit
 * Mobile-First Architecture:
 * - The entire mobile screen looks like a physical luxury envelope
 * - Centered on mobile and desktop, covering the full mobile screen
 * - Screen 1: 3D Royal Vertical Envelope Opening with Sunlight Rays
 * - Screen 2: Full Scrollable Luxury Cream Invitation Card
 */
function App() {
  const [currentView, setCurrentView] = useState('envelope') // 'envelope' | 'invitation'
  const [isBursting, setIsBursting] = useState(false)

  const handleOpenComplete = useCallback(() => {
    setCurrentView('invitation')
  }, [])

  const handleReplay = useCallback(() => {
    setCurrentView('envelope')
    setIsBursting(false)
  }, [])

  const handleBurstChange = useCallback((bursting) => {
    setIsBursting(Boolean(bursting))
  }, [])

  return (
    <div className="app-viewport-root">
      {/* Golden Ambient and Burst Particles */}
      <Particles triggerBurst={isBursting} />

      {/* Centered Mobile Envelope & Card Stage */}
      <div className="app-mobile-stage">
        {/* Screen 1: The Royal Opening Envelope Ceremony */}
        {currentView === 'envelope' && (
          <Envelope
            onOpenComplete={handleOpenComplete}
            onBurstChange={handleBurstChange}
          />
        )}

        {/* Screen 2: Full Scrollable Luxury Wedding Invitation Page */}
        {currentView === 'invitation' && (
          <InvitationCard onReplay={handleReplay} />
        )}
      </div>
    </div>
  )
}

export default App
