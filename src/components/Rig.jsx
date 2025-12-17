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

            // SENSITIVITY
            velocity.current.x -= deltaX * 0.01
            velocity.current.y -= deltaY * 0.01

            prevPointer.current.set(e.clientX, e.clientY)
        }

        window.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointermove', onMove)

        return () => {
            window.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointermove', onMove)
        }
    }, [])

    useFrame(() => {
        camera.position.x += velocity.current.x
        camera.position.z += velocity.current.y

        // FRICTION
        velocity.current.x *= 0.92
        velocity.current.y *= 0.92

        // --- CRITICAL FIX: EXPANDED BOUNDARIES ---
        // Previously this was too small. Now we allow you to go much further.
        if (camera.position.x > 30) camera.position.x = 30
        if (camera.position.x < -30) camera.position.x = -30
        if (camera.position.z > 30) camera.position.z = 30
        if (camera.position.z < -30) camera.position.z = -30
    })

    return null
}
