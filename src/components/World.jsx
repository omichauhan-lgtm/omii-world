import { useMemo } from 'react'
import * as THREE from 'three'
import { EducationShop, ExperienceShop, SkillsShop } from './ShopLayouts'

export function World() {
    // Terrain Generation
    const terrainGeometry = useMemo(() => {
        const geom = new THREE.PlaneGeometry(100, 100, 64, 64)
        // Rotate to lie flat
        geom.rotateX(-Math.PI / 2)

        // Displace vertices
        const count = geom.attributes.position.count
        const positions = geom.attributes.position
        for (let i = 0; i < count; i++) {
            const x = positions.getX(i)
            const z = positions.getZ(i)
            // Rolling hills logic: mix of sin/cos
            const y = Math.sin(x * 0.2) * 2 + Math.cos(z * 0.15) * 2 + Math.sin(x * 0.5 + z * 0.5) * 0.5
            positions.setY(i, y)
        }
        geom.computeVertexNormals()
        return geom
    }, [])

    // Tree Generation
    const trees = useMemo(() => {
        const items = []
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 80
            const z = (Math.random() - 0.5) * 80
            // Avoid center (radius 10)
            if (x * x + z * z < 100) continue

            const scale = 0.5 + Math.random() * 0.5
            // Calculate Y position based on terrain formula at this X/Z
            const y = Math.sin(x * 0.2) * 2 + Math.cos(z * 0.15) * 2 + Math.sin(x * 0.5 + z * 0.5) * 0.5

            items.push({ pos: [x, y, z], scale })
        }
        return items
    }, [])

    return (
        <group>
            {/* 1. The Beginning (Education) - Placed to the Left */}
            <EducationShop position={[-8, 0, -5]} />

            {/* 2. The Job (Experience) - Placed to the Right */}
            <ExperienceShop position={[8, 0, -2]} />

            {/* 3. The Core Identity (Summary) - Center Stage */}
            <SkillsShop position={[0, 0, -10]} />

            {/* Terrain */}
            <mesh geometry={terrainGeometry} receiveShadow>
                <meshStandardMaterial
                    color="#5c5cff"
                    flatShading={true}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Trees */}
            {trees.map((tree, i) => (
                <group key={i} position={tree.pos} scale={[tree.scale, tree.scale, tree.scale]}>
                    {/* Trunk */}
                    <mesh position={[0, 0.5, 0]}>
                        <cylinderGeometry args={[0.2, 0.4, 1, 6]} />
                        <meshStandardMaterial color="#4a2c2a" flatShading />
                    </mesh>
                    {/* Leaves */}
                    <mesh position={[0, 1.5, 0]}>
                        <coneGeometry args={[1, 2, 6]} />
                        <meshStandardMaterial color="#ffffff" flatShading />
                    </mesh>
                </group>
            ))}

            {/* Ambient Snow Particles (Simple) */}
            <mesh position={[0, 10, 0]}>
                <bufferGeometry />
                <pointsMaterial color="white" size={0.1} />
            </mesh>

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        </group>
    )
}
