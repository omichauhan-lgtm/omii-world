import React, { useState, useRef } from 'react'
import { Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// --- HELPER COMPONENT: FLOATING LABEL ---
const Label = ({ title, subtitle, position }) => (
    <group position={position}>
        <Text
            color="white"
            fontSize={0.8}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            position={[0, 1, 0]}
            outlineWidth={0.05}
            outlineColor="#000"
        >
            {title.toUpperCase()}
        </Text>
        <Text
            color="#ccddff"
            fontSize={0.35}
            maxWidth={6}
            textAlign="center"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="top"
            position={[0, 0.4, 0]}
            outlineWidth={0.02}
            outlineColor="#000"
        >
            {subtitle}
        </Text>
    </group>
)

// 1. CENTER: SPAWN HUB (Hologram Platform)
export function SummaryPlaza({ position }) {
    return (
        <group position={position}>
            {/* Platform */}
            <mesh receiveShadow position={[0, 0.1, 0]}>
                <cylinderGeometry args={[4, 4, 0.2, 64]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Glowing Ring */}
            <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.5, 3.8, 64]} />
                <meshBasicMaterial color="#00ffcc" toneMapped={false} />
            </mesh>

            <Label
                title="Omii Chauhan"
                subtitle="AI & Data Engineer | NIT Warangal\nUse WASD to Explore My Career"
                position={[0, 4, 0]}
            />
        </group>
    )
}

// 2. EDUCATION: "THE TEMPLE" (Classical Architecture)
export function EducationZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Base Steps */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[6, 1, 4]} />
                <meshStandardMaterial color="#ddd" />
            </mesh>

            {/* Pillars */}
            {[-2, -0.7, 0.7, 2].map((x, i) => (
                <mesh key={i} position={[x, 2, 1.5]}>
                    <cylinderGeometry args={[0.3, 0.3, 3]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
            ))}

            {/* Roof (Pediment) */}
            <mesh position={[0, 4, 1.5]}>
                <coneGeometry args={[4, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial color="#4a4a8a" />
            </mesh>

            {/* Floating Book Hologram */}
            <mesh position={[0, 2.5, -0.5]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[2, 2.5, 0.3]} />
                <meshStandardMaterial color="#44f" emissive="#22a" emissiveIntensity={2} />
            </mesh>

            <Label
                title="Education"
                subtitle="NIT Warangal (Metallurgy 2023-27)\nSri Chaitanya (2017-2022)"
                position={[0, 6, 0]}
            />
        </group>
    )
}

// 3. EXPERIENCE: "THE SKYSCRAPER" (Corporate/Tech)
export function ExperienceZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Main Tower */}
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[3, 8, 3]} />
                <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Windows (Glowing Stripes) */}
            {[-1, 1, 3].map((y, i) => (
                <mesh key={i} position={[0, y, 1.51]}>
                    <planeGeometry args={[2.5, 0.2]} />
                    <meshBasicMaterial color="#00ffcc" toneMapped={false} />
                </mesh>
            ))}

            {/* Helipad / Roof */}
            <mesh position={[0, 8.1, 0]}>
                <cylinderGeometry args={[2, 2, 0.2, 32]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            <mesh position={[0, 8.2, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshBasicMaterial color="red" toneMapped={false} />
            </mesh>

            <Label
                title="Experience"
                subtitle="Rajputana Vehicles (Data Analyst)\n• +15% Lead Conversion\n• Auto-Data Pipelines"
                position={[0, 9.5, 0]}
            />
        </group>
    )
}

// 4. SKILLS: "THE CORE" (Server / CPU Style)
export function SkillsZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    const group = useRef()

    // Rotate ring
    useFrame((state) => {
        if (group.current) group.current.rotation.y += 0.01
    })

    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Central CPU Block */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[3, 4, 3]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Glowing Circuit Lines */}
            <mesh position={[0, 2, 1.51]}>
                <planeGeometry args={[2, 3]} />
                <meshStandardMaterial color="#0f0" emissive="#0f0" emissiveIntensity={2} wireframe />
            </mesh>

            {/* Floating Data Rings */}
            <group ref={group} position={[0, 2, 0]}>
                {[1, 2, 3].map((i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, i]}>
                        <torusGeometry args={[2 + i * 0.5, 0.1, 16, 100]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                ))}
            </group>

            <Label
                title="Tech Stack"
                subtitle="• LLMs & GenAI\n• Python (Pandas), C++, SQL\n• React & System Optimization"
                position={[0, 6, 0]}
            />
        </group>
    )
}

// 5. CERTIFICATIONS: "THE ARCHWAY" (Trophy Hall)
export function CertificationZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Giant Gold Arch */}
            <mesh position={[0, 3, 0]}>
                <torusGeometry args={[3, 0.5, 16, 100, Math.PI]} />
                <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[-3, 1.5, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 3]} />
                <meshStandardMaterial color="#ffd700" />
            </mesh>
            <mesh position={[3, 1.5, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 3]} />
                <meshStandardMaterial color="#ffd700" />
            </mesh>

            {/* Floating Trophies */}
            <mesh position={[0, 1.5, 0]}>
                <octahedronGeometry args={[1]} />
                <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} wireframe />
            </mesh>

            <Label
                title="Certifications"
                subtitle="• J.P. Morgan (Quant Research)\n• EA Sports (Software Engineering)"
                position={[0, 5, 0]}
            />
        </group>
    )
}

// 6. CONTACT: "THE UPLINK" (Satellite Tower)
export function ContactZone({ position }) {
    const [hovered, set] = useState(false)
    useCursor(hovered)
    return (
        <group position={position} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
            {/* Tower Base */}
            <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.2, 1, 5, 4]} />
                <meshStandardMaterial color="#444" wireframe />
            </mesh>

            {/* Dish */}
            <mesh position={[0, 5, 0.5]} rotation={[0.5, 0, 0]}>
                <coneGeometry args={[2, 1, 32]} />
                <meshStandardMaterial color="#eee" />
            </mesh>

            {/* Blinking Light */}
            <mesh position={[0, 5, 0.5]}>
                <sphereGeometry args={[0.3]} />
                <meshBasicMaterial color="red" toneMapped={false} />
            </mesh>

            <Label
                title="Contact Me"
                subtitle="📞 9770845401\n✉️ omichauhan08@gmail.com\n🔗 linkedin.com/in/omii-chauhan"
                position={[0, 7, 0]}
            />
        </group>
    )
}
