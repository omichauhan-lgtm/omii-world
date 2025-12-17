import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Rig() {
    const { camera } = useThree()
    const velocity = useRef(new THREE.Vector2(0, 0))
    const isDragging = useRef(false)
    const prevPointer = useRef(new THREE.Vector2(0, 0))

    useEffect(() => {
        const onDown = (e) => {
            isDragging.current = true
            prevPointer.current.set(e.clientX, e.clientY)
        }
        const onUp = () => isDragging.current = false
        const onMove = (e) => {
            if (!isDragging.current) return
            const deltaX = e.clientX - prevPointer.current.x
            const deltaY = e.clientY - prevPointer.current.y
            velocity.current.x -= deltaX * 0.002 // Speed factor
            velocity.current.y += deltaY * 0.002
            prevPointer.current.set(e.clientX, e.clientY)
        }

        // Bind events to window
        window.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointermove', onMove)

        return () => {
            window.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointermove', onMove)
        }
    }, []) // Empty dependency array to run once

    useFrame(() => {
        camera.position.x += velocity.current.x
        camera.position.z += velocity.current.y // Move in X and Z plane

        // Friction (The "Ice" feel)
        velocity.current.multiplyScalar(0.95)
    })
    return null
}
