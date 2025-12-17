import {
    SummaryPlaza,
    EducationZone,
    ExperienceZone,
    SkillsZone,
    CertificationZone,
    ContactZone
} from './ShopLayouts'

export function World() {
    return (
        <group>
            {/* --- LIGHTING --- */}
            <ambientLight intensity={0.7} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* --- THE RESUME VILLAGE --- */}

            {/* 1. Center: The Welcome Mat */}
            <SummaryPlaza position={[0, 0, 0]} />

            {/* 2. Left: Education */}
            <EducationZone position={[-15, 0, 0]} />

            {/* 3. Right: Experience */}
            <ExperienceZone position={[15, 0, 0]} />

            {/* 4. Far Right: Skills */}
            <SkillsZone position={[25, 0, 5]} />

            {/* 5. Back Left: Certifications */}
            <CertificationZone position={[-10, 0, -15]} />

            {/* 6. Far Back: Contact */}
            <ContactZone position={[0, 0, -20]} />

            {/* --- ENVIRONMENT --- */}

            {/* The Infinite Floor - Expanded for the larger map */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#5c5cff" />
            </mesh>

            {/* Background Fog to blend the horizon */}
            <fog attach="fog" args={['#5c5cff', 10, 60]} />
        </group>
    )
}
