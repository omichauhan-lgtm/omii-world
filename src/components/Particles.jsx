import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function JetpackTrails({ parentRef, isMoving }) {
    const count = 20
    const mesh = useRef()
    const dummy = new THREE.Object3D()

    // Store particle data (position, life)
    const particles = useRef(new Array(count).fill({ life: 0, x: 0, y: 0, z: 0 }))

    useFrame((state, delta) => {
        if (!mesh.current || !parentRef.current) return

        // Get current player position
        const playerPos = parentRef.current.position

        particles.current.forEach((p, i) => {
            // If player is moving, spawn new particles
            if (isMoving && Math.random() > 0.8) {
                p.life = 1.0 // Reset life
                p.x = playerPos.x + (Math.random() - 0.5) * 0.5
                p.y = playerPos.y + 0.5
                p.z = playerPos.z + (Math.random() - 0.5) * 0.5
            }

            // Decay life
            if (p.life > 0) {
                p.life -= delta * 2 // Fade speed
                p.y -= delta * 0.5 // Fall down slightly

                // Update Instance
                dummy.position.set(p.x, p.y, p.z)
                const scale = p.life * 0.3
                dummy.scale.set(scale, scale, scale)
                dummy.updateMatrix()
                mesh.current.setMatrixAt(i, dummy.matrix)
            } else {
                // Hide
                dummy.scale.set(0, 0, 0)
                dummy.updateMatrix()
                mesh.current.setMatrixAt(i, dummy.matrix)
            }
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
        </instancedMesh>
    )
}
