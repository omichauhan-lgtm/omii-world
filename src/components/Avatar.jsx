import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Avatar({ isMoving }) {
    const group = useRef()
    const bodyMesh = useRef()

    useFrame((state) => {
        if (group.current) {
            // 1. Hovering Animation (Always active)
            const hover = Math.sin(state.clock.elapsedTime * 2) * 0.1
            group.current.position.y = hover + 0.5

            // 2. Running Tilt (When moving)
            const targetTilt = isMoving ? 0.4 : 0
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetTilt, 0.1)
        }
    })

    return (
        <group ref={group}>
            {/* --- CHARACTER MODEL --- */}

            {/* HEAD */}
            <mesh position={[0, 1.4, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* VISOR (Glowing) */}
            <mesh position={[0, 1.4, 0.21]}>
                <planeGeometry args={[0.4, 0.2]} />
                <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.8} />
            </mesh>
            {/* ANTENNA */}
            <mesh position={[0.25, 1.65, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.5]} />
                <meshStandardMaterial color="#888" />
            </mesh>

            {/* BODY */}
            <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.6, 0.7, 0.4]} />
                <meshStandardMaterial color="#ff6b6b" /> {/* Main Suit Color */}
            </mesh>
            {/* CHEST PLATE */}
            <mesh position={[0, 0.9, 0.21]}>
                <planeGeometry args={[0.3, 0.3]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* JETPACK */}
            <mesh position={[0, 0.9, -0.25]}>
                <boxGeometry args={[0.4, 0.6, 0.2]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            {/* JET FLAMES (Only visible when moving?) - We keep them static for style */}
            <mesh position={[-0.1, 0.5, -0.25]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.05, 0.2, 8]} />
                <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.1, 0.5, -0.25]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.05, 0.2, 8]} />
                <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
            </mesh>

            {/* ARMS (Floating detached style) */}
            <mesh position={[-0.45, 0.8, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.45, 0.8, 0]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* LEGS (Floating detached style) */}
            <mesh position={[-0.2, 0.2, 0]}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.2, 0.2, 0]}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    )
}
