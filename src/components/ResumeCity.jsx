import React from 'react';
import { cityData } from '../data/cityData';

export function ResumeCity({ onSelect }) {
    return (
        <group>
            {cityData.map((data, index) => {
                let geometry;
                const { type, pos, color, title, desc, stats } = data;

                // Distinct shapes for distinct sections
                // Using R3F logic: we can just use different mesh components or props

                return (
                    <mesh
                        key={index}
                        position={[pos.x, pos.y, pos.z]}
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
                );
            })}
        </group>
    );
}
