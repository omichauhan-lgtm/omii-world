import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

// Projects data from user_context
const projects = [
    { title: "LoanRiskX", desc: "FinTech SaaS / FastAPI", color: "#ff6b6b", pos: [-4, 2, -5] },
    { title: "Meta-Sim", desc: "Phase Simulator", color: "#4ecdc4", pos: [5, 1, -8] },
    { title: "Rajputana", desc: "Brand Identity", color: "#ffe66d", pos: [-3, -2, -2] },
    { title: "Data Pipeline", desc: "Analytics / Pandas", color: "#1a535c", pos: [4, -3, -4] }
]

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

            {/* Projects */}
            {projects.map((proj, i) => (
                <group key={i} position={proj.pos}>
                    <mesh position={[0, 1, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={proj.color} />
                    </mesh>
                    <Text
                        position={[0, 2, 0]}
                        fontSize={0.5}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.05}
                        outlineColor="#5c5cff"
                    >
                        {proj.title}
                    </Text>
                    <Text
                        position={[0, 1.5, 0]}
                        fontSize={0.25}
                        color="#eeeeee"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {proj.desc}
                    </Text>
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
