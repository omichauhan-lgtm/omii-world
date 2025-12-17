import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export function Avatar({ position, rotation, isMoving }) {
    const group = useRef()

    // Animation: Bobbing when moving
    useFrame((state) => {
        if (group.current) {
            if (isMoving) {
                group.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.1 + 0.5
            } else {
                group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.5
            }
        }
    })

    return (
        <group ref={group} position={position} rotation={rotation}>
            {/* BODY */}
            <mesh castShadow position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.3, 0.7, 4, 8]} />
                <meshStandardMaterial color="#ff6b6b" />
            </mesh>

            {/* HEAD (Visor) */}
            <mesh position={[0, 1, 0.2]}>
                <boxGeometry args={[0.4, 0.2, 0.2]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* BACKPACK (Jetpack) */}
            <mesh position={[0, 0.6, -0.25]}>
                <boxGeometry args={[0.4, 0.6, 0.3]} />
                <meshStandardMaterial color="#555" />
            </mesh>
        </group>
    )
}
