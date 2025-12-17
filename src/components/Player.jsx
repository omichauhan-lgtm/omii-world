import { useKeyboardControls, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Avatar } from './Avatar'
import { JetpackTrails } from './Particles'

const SPEED = 6
const ROTATION_SPEED = 5

export function Player() {
    const avatar = useRef()
    const controlsRef = useRef()
    const [sub, get] = useKeyboardControls()
    const [isMoving, setIsMoving] = useState(false)

    // Camera State
    const cameraPosition = useRef(new THREE.Vector3(0, 8, 15)) // Initial Camera Pos

    useFrame((state, delta) => {
        if (!avatar.current) return

        // 1. GET INPUTS
        const { forward, backward, left, right } = get()

        // --- FIX: REVERSED LEFT/RIGHT ---
        // Previous: Number(left) - Number(right)
        // New: Number(right) - Number(left)
        const moveX = Number(right) - Number(left)
        const moveZ = Number(forward) - Number(backward)

        const isCtrlMoving = moveX !== 0 || moveZ !== 0
        setIsMoving(isCtrlMoving)

        // 2. MOVEMENT LOGIC (Camera Relative)
        if (isCtrlMoving) {
            // We need to move relative to where the CAMERA is facing
            // Get camera forward direction (ignoring Y axis for flat movement)
            const cameraForward = new THREE.Vector3()
            state.camera.getWorldDirection(cameraForward)
            cameraForward.y = 0
            cameraForward.normalize()

            const cameraRight = new THREE.Vector3()
            cameraRight.crossVectors(cameraForward, new THREE.Vector3(0, 1, 0))

            // Calculate final move vector
            const moveDir = new THREE.Vector3()
                .addScaledVector(cameraForward, moveZ)
                .addScaledVector(cameraRight, moveX)
                .normalize()

            // Apply Movement
            avatar.current.position.x += moveDir.x * SPEED * delta
            avatar.current.position.z += moveDir.z * SPEED * delta

            // Smooth Rotation to face move direction
            const targetRotation = Math.atan2(moveDir.x, moveDir.z)

            // Shortest path rotation
            let rotDiff = targetRotation - avatar.current.rotation.y
            if (rotDiff > Math.PI) rotDiff -= Math.PI * 2
            if (rotDiff < -Math.PI) rotDiff += Math.PI * 2

            avatar.current.rotation.y += rotDiff * ROTATION_SPEED * delta
        }

        // 3. UPDATE ORBIT CONTROLS TARGET
        // This forces the camera to look at the player, even while you rotate/zoom
        if (controlsRef.current) {
            // Smoothly move the camera target to the player's position
            controlsRef.current.target.lerp(avatar.current.position, 0.1)
            controlsRef.current.update()
        }
    })

    return (
        <>
            {/* ORBIT CONTROLS 
        - enableZoom={true} -> Scroll to Zoom
        - enableRotate={true} -> Click & Drag to Rotate
        - maxPolarAngle -> Prevents going below the ground
      */}
            <OrbitControls
                ref={controlsRef}
                enablePan={false} // Disable panning so you don't lose the character
                enableZoom={true}
                maxPolarAngle={Math.PI / 2 - 0.1} // Stop camera at ground level
                minDistance={5} // Min Zoom
                maxDistance={30} // Max Zoom
            />

            <group ref={avatar}>
                <Avatar isMoving={isMoving} />
                <JetpackTrails parentRef={avatar} isMoving={isMoving} />
            </group>
        </>
    )
}
