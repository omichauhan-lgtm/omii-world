import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { World } from './components/World'
import { SoundManager } from './components/SoundManager'
import { ResumeCity } from './components/ResumeCity'
import { InfoModal } from './components/InfoModal'
import './index.css'

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  // Define Control Map
  const map = [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  ]

  return (
    <KeyboardControls map={map}>
      {/* 1. UI LAYER (Outside Canvas) */}
      <SoundManager />
      <InfoModal data={selectedBuilding} onClose={() => setSelectedBuilding(null)} />

      <div className="controls-overlay">
        <h2>WASD to Move</h2>
        <p>Explore Omii's World</p>
        <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#00ff41' }}>Click buildings for info</p>
      </div>

      {/* 2. 3D WORLD LAYER */}
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}>
        <World />
        <ResumeCity onSelect={setSelectedBuilding} />
      </Canvas>
    </KeyboardControls>
  )
}
