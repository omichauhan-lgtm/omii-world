import React from 'react';
import { Text } from '@react-three/drei';
import { cityData } from '../data/cityData';

export function ResumeCity({ onSelect }) {
    return (
        <group>
            {cityData.map((data, index) => {
                const { type, pos, color, title } = data;

                // Determine height based on type to position text correctly
                let height = 2; // Default
                if (type === 'foundry') height = 3; // Cylinder height 6 (y is center) -> top is y+3
                if (type === 'cyber') height = 3; // Box height 6 -> top is y+3
                if (type === 'command') height = 2; // Octahedron radius 2

                return (
                    <group key={index} position={[pos.x, pos.y, pos.z]}>
                        {/* FLOATING LABEL */}
                        <Text
                            position={[0, height + 1.5, 0]} // Float above the mesh
                            fontSize={0.8}
                            color={color} // Match building color
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.05}
                            outlineColor="#000000"
                        >
                            {title}
                        </Text>

                        {/* BUILDING MESH */}
                        <mesh
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(data);
                            }}
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                document.body.style.cursor = 'pointer';
                            }}
                            onPointerOut={(e) => {
                                document.body.style.cursor = 'auto';
                            }}
                        >
                            {type === 'foundry' && <cylinderGeometry args={[2, 2, 6, 16]} />}
                            {type === 'cyber' && <boxGeometry args={[3, 6, 3]} />}
                            {type === 'command' && <octahedronGeometry args={[2]} />}

                            <meshStandardMaterial
                                color={color}
                                roughness={0.2}
                                metalness={0.8}
                                emissive={color}
                                emissiveIntensity={0.4}
                            />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}
