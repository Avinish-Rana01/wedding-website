import { useState, useCallback } from 'react'
import Envelope from './components/Envelope/Envelope'
import Particles from './components/Particles/Particles'

/**
 * App.jsx — Wedding Invitation Experience for Prachi & Sumit
 * Synchronized particle burst and 3D envelope opening.
 */
function App() {
  const [isBursting, setIsBursting] = useState(false)

  const handleOpenStateChange = useCallback(({ isBursting: bursting }) => {
    setIsBursting(Boolean(bursting))
  }, [])

  return (
    <>
      {/* Golden Ambient and Burst Particles */}
      <Particles triggerBurst={isBursting} />

      {/* 3D Envelope Scene */}
      <Envelope onOpenStateChange={handleOpenStateChange} />
    </>
  )
}

export default App
