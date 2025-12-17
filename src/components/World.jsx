import {
    SummaryPlaza,
    EducationZone,
    ExperienceZone,
    SkillsZone,
    CertificationZone,
    ContactZone
} from './ShopLayouts'
import { Player } from './Player'
import * as THREE from 'three'

export function World() {
    const RADIUS = 15 // Distance of shops from center

    return (
        <group>
            {/* 1. THE PLAYER (You Control This) */}
            <Player />

            {/* 2. THE CENTER (Spawn) */}
            <SummaryPlaza position={[0, 0, 0]} />

            {/* 3. THE CIRCLE OF SHOPS */}
            {/* We arrange 5 items in a circle (72 degrees apart) */}

            {/* Shop 1: Education (Angle 0) */}
            <EducationZone position={[RADIUS * Math.sin(0), 0, RADIUS * Math.cos(0)]} />

            {/* Shop 2: Experience (Angle 72 deg) */}
            <ExperienceZone position={[RADIUS * Math.sin(1.25), 0, RADIUS * Math.cos(1.25)]} />

            {/* Shop 3: Skills (Angle 144 deg) */}
            <SkillsZone position={[RADIUS * Math.sin(2.5), 0, RADIUS * Math.cos(2.5)]} />

            {/* Shop 4: Certifications (Angle 216 deg) */}
            <CertificationZone position={[RADIUS * Math.sin(3.76), 0, RADIUS * Math.cos(3.76)]} />

            {/* Shop 5: Contact (Angle 288 deg) */}
            <ContactZone position={[RADIUS * Math.sin(5.02), 0, RADIUS * Math.cos(5.02)]} />


            {/* --- ENVIRONMENT --- */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <circleGeometry args={[40, 64]} />
                <meshStandardMaterial color="#5c5cff" />
            </mesh>

            {/* Instructions on Floor */}
            <gridHelper args={[80, 80, 0xaaaaaa, 0x6666ff]} position={[0, 0.01, 0]} />
        </group>
    )
}
