import { useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Avatar } from './Avatar'

const SPEED = 5
const ROTATION_SPEED = 4

export function Player() {
    const avatar = useRef()
    const [sub, get] = useKeyboardControls()
    const [isMoving, setIsMoving] = useState(false)

    // Current Velocity
    const velocity = useRef(new THREE.Vector3())

    useFrame((state, delta) => {
        if (!avatar.current) return

        const { forward, backward, left, right } = get()

        // 1. Calculate Movement Direction
        const moveZ = Number(forward) - Number(backward) // Front/Back
        const moveX = Number(left) - Number(right)       // Left/Right

        const isCtrlMoving = moveX !== 0 || moveZ !== 0
        setIsMoving(isCtrlMoving)

        if (isCtrlMoving) {
            // Move Logic
            const moveDir = new THREE.Vector3(moveX, 0, -moveZ).normalize()

            // Update Position
            avatar.current.position.x += moveDir.x * SPEED * delta
            avatar.current.position.z += moveDir.z * SPEED * delta

            // Smooth Rotation to face direction
            const targetRotation = Math.atan2(moveDir.x, moveDir.z)

            // Shortest path rotation logic
            let rotDiff = targetRotation - avatar.current.rotation.y
            if (rotDiff > Math.PI) rotDiff -= Math.PI * 2
            if (rotDiff < -Math.PI) rotDiff += Math.PI * 2

            avatar.current.rotation.y += rotDiff * ROTATION_SPEED * delta
        }

        // 2. Camera Follow Logic
        // Camera stays 8 units back and 6 units up
        const camOffset = new THREE.Vector3(0, 8, 12)

        // Smoothly interpolate camera position to follow player
        const targetCamPos = avatar.current.position.clone().add(camOffset)
        state.camera.position.lerp(targetCamPos, 0.1)
        state.camera.lookAt(avatar.current.position)
    })

    return (
        <group ref={avatar}>
            <Avatar isMoving={isMoving} />
        </group>
    )
}
