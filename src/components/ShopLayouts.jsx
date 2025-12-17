import React, { useState, useRef } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// --- SHARED COMPONENTS ---
const Label = ({ title, subtitle, position }) => (
    <group position={position}>
        <Text
            color="white"
            fontSize={0.6} // Made text larger for readability
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.5, 0]}
        >
            {title.toUpperCase()}
        </Text>
        <Text
            color="#a3a3ff"
            fontSize={0.25}
            maxWidth={5}
            textAlign="center"
            lineHeight={1.2}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="top"
            position={[0, 0, 0]}
        >
            {subtitle}
        </Text>
    </group>
)

// --- 1. CENTER: SUMMARY (The Spawn) ---
export function SummaryPlaza({ position }) {
    return (
        <group position={position}>
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[2, 2, 0.2, 32]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <octahedronGeometry args={[1]} />
                <meshStandardMaterial color="white" wireframe />
            </mesh>

            <Label
                title="Omii Chauhan"
                subtitle="AI & Data Engineer | NIT Warangal\n'I build data systems that solve expensive problems.'"
                position={[0, 3, 0]}
            />
        </group>
    )
}

// --- 2. LEFT: EDUCATION ---
export function EducationZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* NIT Warangal */}
            <mesh position={[-1.5, 1.5, 0]}>
                <boxGeometry args={[2.5, 3, 2]} />
                <meshStandardMaterial color="#4a4a8a" flatShading />
            </mesh>
            {/* Sri Chaitanya */}
            <mesh position={[1.5, 1, 0.5]}>
                <boxGeometry args={[2, 2, 1.5]} />
                <meshStandardMaterial color="#3a3a6a" flatShading />
            </mesh>

            <Label
                title="Education"
                subtitle="NIT Warangal (Metallurgy 2023-27)\nSri Chaitanya (2017-2022)"
                position={[0, 4.5, 0]}
            />
        </group>
    )
}

// --- 3. RIGHT: EXPERIENCE ---
export function ExperienceZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            <mesh position={[0, 1.5, -1]}>
                <boxGeometry args={[4, 3, 2]} />
                <meshStandardMaterial color="#ff6b6b" flatShading />
            </mesh>

            <Label
                title="Experience"
                subtitle="Rajputana Vehicles (Data Analyst)\nMay-June 2025\n• Increased lead conversion by 15%\n• Reduced processing time by 40%"
                position={[0, 4.5, 0]}
            />
        </group>
    )
}

// --- 4. FAR RIGHT: SKILLS ---
export function SkillsZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {[-1, 0, 1].map((x, i) => (
                <mesh key={i} position={[x * 1.2, 1.5, 0]}>
                    <boxGeometry args={[0.8, 3, 0.8]} />
                    <meshStandardMaterial color="#4ecdc4" flatShading />
                </mesh>
            ))}

            <Label
                title="Technical Stack"
                subtitle="• LLMs & GenAI\n• Python (Pandas), C++, SQL\n• React & System Optimization"
                position={[0, 4.5, 0]}
            />
        </group>
    )
}

// --- 5. BACK: CERTIFICATIONS ---
export function CertificationZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Gold Pedestals */}
            <mesh position={[-1.2, 0.5, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
                <meshStandardMaterial color="#ffd700" flatShading />
            </mesh>
            <mesh position={[1.2, 0.5, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
                <meshStandardMaterial color="#ffd700" flatShading />
            </mesh>

            <Label
                title="Certifications"
                subtitle="• J.P. Morgan: Quantitative Research\n• EA Sports: Software Engineering"
                position={[0, 3, 0]}
            />
        </group>
    )
}

// --- 6. FAR BACK: CONTACT ---
export function ContactZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            <mesh position={[0, 2.5, 0]}>
                <octahedronGeometry args={[2, 0]} />
                <meshStandardMaterial color="#ff0055" wireframe />
            </mesh>

            <Label
                title="Contact Me"
                subtitle="📞 9770845401\n✉️ omichauhan08@gmail.com\n🔗 linkedin.com/in/omii-chauhan"
                position={[0, 5, 0]}
            />
        </group>
    )
}
