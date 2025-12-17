import React, { useRef, useState } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// --- 1. SHARED ASSETS ---
// Simple low-poly tree to decorate your "islands"
const Tree = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.8, 2.5, 4]} /> {/* 4 segments = Low Poly look */}
            <meshStandardMaterial color="#2d2d55" flatShading />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.5]} />
            <meshStandardMaterial color="#1a1a3a" />
        </mesh>
    </group>
)

// The floating text label above each shop
const ShopLabel = ({ title, subtitle, position }) => (
    <group position={position}>
        <Text
            color="white"
            fontSize={0.5}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.4, 0]}
        >
            {title.toUpperCase()}
        </Text>
        <Text
            color="#a3a3ff"
            fontSize={0.25}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0]}
        >
            {subtitle}
        </Text>
    </group>
)

// --- 2. THE SHOPS (Based on your PDF) ---

// A. EDUCATION: "The Academy"
// Design: Classical pillars representing your foundation at NIT Warangal
export function EducationShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Base Platform */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[4, 4, 0.2, 8]} />
                <meshStandardMaterial color="#4a4a8a" flatShading />
            </mesh>

            {/* Main Hall */}
            <mesh position={[0, 1.5, -0.5]} castShadow>
                <boxGeometry args={[3.5, 2.5, 2]} />
                <meshStandardMaterial color="#5c5cff" flatShading />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 3, -0.5]}>
                <coneGeometry args={[3, 1.5, 4]} />
                <meshStandardMaterial color="#333366" flatShading />
            </mesh>

            {/* Pillars */}
            {[-1.2, 1.2].map((x, i) => (
                <mesh key={i} position={[x, 1.2, 1]}>
                    <cylinderGeometry args={[0.2, 0.2, 2.5]} />
                    <meshStandardMaterial color="#a3a3ff" />
                </mesh>
            ))}

            {/* Contextual Trees */}
            <Tree position={[-3, 0, 1]} />
            <Tree position={[3, 0, -1]} />

            <ShopLabel
                title="NIT Warangal"
                subtitle="Metallurgy & Materials (2023-2027)"
                position={[0, 5, 0]}
            />
        </group>
    )
}

// B. EXPERIENCE: "The Auto Factory"
// Design: Industrial garage look for 'Rajputana Vehicles', with a low-poly car
export function ExperienceShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Concrete Pad */}
            <mesh position={[0, 0.05, 0]} receiveShadow>
                <boxGeometry args={[6, 0.1, 5]} />
                <meshStandardMaterial color="#333" flatShading />
            </mesh>

            {/* Factory Building */}
            <mesh position={[-1.5, 1.5, -1]} castShadow>
                <boxGeometry args={[3, 3, 2.5]} />
                <meshStandardMaterial color="#ff6b6b" flatShading /> {/* Red for "Action/Work" */}
            </mesh>

            {/* Garage Door */}
            <mesh position={[-1.5, 0.8, 0.3]}>
                <planeGeometry args={[2, 1.6]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Low Poly EV Car (Symbolizing the Data Analyst Role at EV firm) */}
            <group position={[1.5, 0.4, 0.5]} rotation={[0, -0.5, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.4, 0.5, 2.2]} />
                    <meshStandardMaterial color="#eee" />
                </mesh>
                <mesh position={[0, 0.5, -0.2]}>
                    <boxGeometry args={[1.2, 0.4, 1.2]} />
                    <meshStandardMaterial color="#ccc" />
                </mesh>
            </group>

            <ShopLabel
                title="Rajputana Vehicles"
                subtitle="Data Analyst (May - June 2025)"
                position={[0, 4, 0]}
            />
        </group>
    )
}

// C. SKILLS: "The Tech Monolith"
// Design: Futuristic floating server blocks representing AI, Python, & Data
export function SkillsShop({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    const group = useRef()

    // Animate the monolith to rotate slowly
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
        }
    })

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            <group ref={group}>
                {/* Main Core */}
                <mesh position={[0, 2, 0]} castShadow>
                    <boxGeometry args={[2, 4.5, 2]} />
                    <meshStandardMaterial color="#4ecdc4" flatShading /> {/* Teal for Tech */}
                </mesh>

                {/* Floating Data Blocks */}
                {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} position={[Math.sin(i * 2) * 1.8, i + 0.5, Math.cos(i * 2) * 1.8]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="white" emissive="#4ecdc4" emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </group>

            <ShopLabel
                title="AI & Data Stack"
                subtitle="Python | C++ | SQL | AWS | LLMs"
                position={[0, 5.5, 0]}
            />
        </group>
    )
}
