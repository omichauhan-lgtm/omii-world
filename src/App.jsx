import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { World } from './components/World'
import { SoundManager } from './components/SoundManager'
import './index.css'

export default function App() {
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

      <div className="controls-overlay">
        <h2>WASD to Move</h2>
        <p>Explore Omii's World</p>
      </div>

      {/* 2. 3D WORLD LAYER */}
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}>
        <World />
      </Canvas>
    </KeyboardControls>
  )
}
