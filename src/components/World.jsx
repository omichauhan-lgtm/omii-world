import { EducationShop, ExperienceShop, SkillsShop } from './ShopLayouts'

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

            {/* --- THE SHOPS (Your Career Timeline) --- */}

            {/* 1. Education (Far Left) */}
            <EducationShop position={[-12, 0, -4]} />

            {/* 2. Experience (Center Right) */}
            <ExperienceShop position={[8, 0, -2]} />

            {/* 3. Skills/Tech Stack (Far Right) */}
            <SkillsShop position={[20, 0, -6]} />

            {/* --- ENVIRONMENT --- */}

            {/* The Infinite Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#5c5cff" /> {/* The Joshua Purple */}
            </mesh>

            {/* Background Fog to blend the horizon */}
            <fog attach="fog" args={['#5c5cff', 10, 50]} />
        </group>
    )
}
