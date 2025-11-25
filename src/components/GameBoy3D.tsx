import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

export function GameBoy3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Body */}
      <RoundedBox args={[2, 3, 0.4]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e8e8e8" metalness={0.3} roughness={0.4} />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox args={[1.6, 1.4, 0.1]} radius={0.05} smoothness={4} position={[0, 0.6, 0.21]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Screen Glass */}
      <RoundedBox args={[1.4, 1.2, 0.05]} radius={0.03} smoothness={4} position={[0, 0.6, 0.26]}>
        <meshStandardMaterial 
          color="#2d5016" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#2d5016"
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* D-Pad */}
      <group position={[-0.5, -0.4, 0.21]}>
        {/* Horizontal */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.2} roughness={0.6} />
        </mesh>
        {/* Vertical */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.2} roughness={0.6} />
        </mesh>
      </group>

      {/* A Button */}
      <mesh position={[0.5, -0.3, 0.21]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
        <meshStandardMaterial color="#8b1538" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* B Button */}
      <mesh position={[0.7, -0.5, 0.21]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
        <meshStandardMaterial color="#8b1538" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Start Button */}
      <mesh position={[0.1, -0.9, 0.21]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Select Button */}
      <mesh position={[-0.1, -0.9, 0.21]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Speaker Holes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.12, 1.2, 0.21]}>
          <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Power LED */}
      <mesh position={[0.8, 1.3, 0.21]}>
        <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
