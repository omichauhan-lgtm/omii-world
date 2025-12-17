import React, { useRef, useState } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// --- REUSABLE COMPONENTS ---

// A simple low-poly tree to decorate the shops
const Tree = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.8, 2, 4]} /> {/* 4 segments = Low Poly look */}
            <meshStandardMaterial color="#2d2d55" flatShading />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1]} />
            <meshStandardMaterial color="#1a1a3a" />
        </mesh>
    </group>
)

// The Floating Label for each shop
const ShopLabel = ({ title, subtitle, position }) => (
    <group position={position}>
        <Text
            color="white"
            fontSize={0.4}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.3, 0]}
        >
            {title.toUpperCase()}
        </Text>
        <Text
            color="#a3a3ff"
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0]}
        >
            {subtitle}
        </Text>
    </group>
)

// --- THE SHOP LAYOUTS ---

// 1. THE ACADEMY (NIT Warangal)
// Visual: A classical building with pillars, representing stability and education.
export function EducationShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Base Platform */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[3, 3, 0.2, 8]} />
                <meshStandardMaterial color="#4a4a8a" flatShading />
            </mesh>

            {/* Main Building */}
            <mesh position={[0, 1.5, -0.5]} castShadow>
                <boxGeometry args={[3, 2, 1.5]} />
                <meshStandardMaterial color="#5c5cff" flatShading />
            </mesh>

            {/* Roof (Pyramid) */}
            <mesh position={[0, 3, -0.5]} castShadow>
                <coneGeometry args={[2.5, 1.5, 4]} />
                <meshStandardMaterial color="#333366" flatShading />
            </mesh>

            {/* Pillars */}
            {[-1, 1].map((x, i) => (
                <mesh key={i} position={[x, 1, 0.5]} castShadow>
                    <cylinderGeometry args={[0.2, 0.2, 2]} />
                    <meshStandardMaterial color="#a3a3ff" />
                </mesh>
            ))}

            {/* Decor Trees */}
            <Tree position={[-2.5, 0, 1]} />
            <Tree position={[2.5, 0, 1]} />

            {/* Label */}
            <ShopLabel
                title="NIT Warangal"
                subtitle="Metallurgy & Materials (2023-2027)"
                position={[0, 4.5, 0]}
            />
        </group>
    )
}

// 2. THE WORKSHOP (Rajputana Vehicles)
// Visual: An industrial garage/factory with a low-poly car outside.
export function ExperienceShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Concrete Pad */}
            <mesh position={[0, 0.05, 0]} receiveShadow>
                <boxGeometry args={[5, 0.1, 4]} />
                <meshStandardMaterial color="#333" flatShading />
            </mesh>

            {/* Factory Building */}
            <mesh position={[-1, 1.5, -1]} castShadow>
                <boxGeometry args={[2.5, 3, 2]} />
                <meshStandardMaterial color="#ff6b6b" flatShading /> {/* Red accent for "Action" */}
            </mesh>

            {/* Garage Door */}
            <mesh position={[-1, 0.75, 0.01]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            {/* The EV Car (Low Poly) */}
            <group position={[1.5, 0.4, 0.5]} rotation={[0, -0.5, 0]}>
                {/* Car Body */}
                <mesh castShadow>
                    <boxGeometry args={[1.2, 0.5, 2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Car Top */}
                <mesh position={[0, 0.5, -0.2]}>
                    <boxGeometry args={[1, 0.4, 1]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
            </group>

            <ShopLabel
                title="Rajputana Vehicles"
                subtitle="Data Analyst (May - June 2025)"
                position={[0, 3.5, 0]}
            />
        </group>
    )
}

// 3. THE TECH HUB (Summary & Skills)
// Visual: A futuristic server tower/monolith representing your AI/Data skills.
export function SkillsShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    const group = useRef()

    // Gentle rotation for the "Tech" feel
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group position={position} ref={group} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Main Server Monolith */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[1.5, 4, 1.5]} />
                <meshStandardMaterial color="#4ecdc4" flatShading /> {/* Teal for "Tech" */}
            </mesh>

            {/* Floating Data Blocks around it */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[Math.sin(i) * 1.5, i, Math.cos(i) * 1.5]}>
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial color="#fff" emissive="#4ecdc4" emissiveIntensity={2} />
                </mesh>
            ))}

            <ShopLabel
                title="AI & Data Engineer"
                subtitle="Python | SQL | C++ | FinTech"
                position={[0, 4.5, 0]}
            />
        </group>
    )
}
