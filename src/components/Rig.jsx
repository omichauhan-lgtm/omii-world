import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Rig() {
    const { camera } = useThree()
    const velocity = useRef(new THREE.Vector2(0, 0))
    const isDragging = useRef(false)
    const prevPointer = useRef(new THREE.Vector2(0, 0))

    useEffect(() => {
        // We define the functions INSIDE the useEffect to bind them correctly
        const onDown = (e) => {
            isDragging.current = true
            prevPointer.current.set(e.clientX, e.clientY)
            // Optional: Change cursor to 'grabbing'
            document.body.style.cursor = 'grabbing'
        }

        const onUp = () => {
            isDragging.current = false
            document.body.style.cursor = 'auto'
        }

        const onMove = (e) => {
            if (!isDragging.current) return

            const deltaX = e.clientX - prevPointer.current.x
            const deltaY = e.clientY - prevPointer.current.y

            // SENSITIVITY: Change 0.01 to make it faster/slower
            velocity.current.x -= deltaX * 0.01
            velocity.current.y -= deltaY * 0.01

            prevPointer.current.set(e.clientX, e.clientY)
        }

        // Attach listeners
        window.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointermove', onMove)

        // CLEANUP: Remove listeners when component unmounts (Important!)
        return () => {
            window.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointermove', onMove)
        }
    }, []) // <--- Empty dependency array means "run once on mount"

    useFrame(() => {
        // Apply velocity to camera position
        camera.position.x += velocity.current.x
        camera.position.z += velocity.current.y // Move Z instead of Y for a "walking" feel

        // Apply Friction (The "Slide" effect)
        velocity.current.x *= 0.92
        velocity.current.y *= 0.92
    })

    return null
}
