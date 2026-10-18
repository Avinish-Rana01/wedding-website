import { useState } from 'react'
import Envelope from './components/Envelope/Envelope'
import Particles from './components/Particles/Particles'

/**
 * App.jsx — Wedding Invitation Experience for Prachi & Sumit
 * Phase 2: Cinematic 3D Envelope Opening Ritual
 */
function App() {
  const [burstState, setBurstState] = useState(false)

  const handleOpenStateChange = ({ isBursting }) => {
    if (isBursting) {
      setBurstState(true)
      // Reset burst trigger after particles spawn
      setTimeout(() => setBurstState(false), 500)
    }
  }

  const handleExplore = () => {
    // Prepared for Phase 4: Smooth transition into the full wedding website & itinerary
    const event = new CustomEvent('wedding:explore')
    window.dispatchEvent(event)
  }

  return (
    <>
      {/* Golden Ambient and Burst Particles */}
      <Particles triggerBurst={burstState} burstOrigin={{ x: 0.5, y: 0.52 }} />

      {/* 3D Envelope Scene */}
      <Envelope onOpenStateChange={handleOpenStateChange} onExplore={handleExplore} />
    </>
  )
}

export default App
