import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { World } from './components/World'
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
      {/* Overlay Instructions */}
      <div className="controls-overlay">
        <h2>WASD to Move</h2>
        <p>Explore Omii's World</p>
      </div>

      <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}>
        {/* Note: We REMOVED <Rig /> because the Player now controls the camera */}
        <World />
      </Canvas>
    </KeyboardControls>
  )
}
