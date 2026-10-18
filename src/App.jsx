import { useState, useCallback } from 'react'
import Envelope from './components/Envelope/Envelope'
import InvitationCard from './components/InvitationCard/InvitationCard'
import Particles from './components/Particles/Particles'

/**
 * App.jsx — Wedding Invitation Experience for Prachi & Sumit
 * Two-Screen Architecture:
 * - Screen 1: 3D Royal Envelope Opening Ceremony with Sunlight Rays
 * - Screen 2: Full Scrollable Luxury Mobile Invitation Card Frame
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
    <>
      {/* Golden Ambient and Burst Particles */}
      <Particles triggerBurst={isBursting} />

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
    </>
  )
}

export default App
