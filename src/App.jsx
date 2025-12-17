import { Canvas } from '@react-three/fiber'
import { Rig } from './components/Rig'
import { World } from './components/World'

function App() {
  return (
    <>
      <div className="overlay-text" style={{ top: '20px', left: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        OMI CHAUHAN
      </div>
      <div className="overlay-text" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)', fontSize: '1rem', opacity: 0.8 }}>
        DRAG TO EXPLORE
      </div>

      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        shadows
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <color attach="background" args={['#5c5cff']} />
        <fog attach="fog" args={['#5c5cff', 10, 40]} />

        <World />
        <Rig />
      </Canvas>
    </>
  )
}

export default App
