import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

export function GameController3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Main Body */}
      <RoundedBox args={[3, 1.2, 0.5]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.6} 
          roughness={0.3}
        />
      </RoundedBox>

      {/* Left Grip */}
      <RoundedBox args={[0.6, 0.8, 0.4]} radius={0.15} smoothness={4} position={[-1.2, -0.6, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* Right Grip */}
      <RoundedBox args={[0.6, 0.8, 0.4]} radius={0.15} smoothness={4} position={[1.2, -0.6, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* D-Pad */}
      <group position={[-0.8, 0.1, 0.26]}>
        <mesh>
          <boxGeometry args={[0.4, 0.1, 0.05]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.1, 0.4, 0.05]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
      </group>

      {/* ABXY Buttons */}
      {/* A Button (Right) */}
      <mesh position={[0.9, 0.1, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.3} />
      </mesh>

      {/* B Button (Bottom) */}
      <mesh position={[0.75, -0.05, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>

      {/* X Button (Top) */}
      <mesh position={[0.75, 0.25, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>

      {/* Y Button (Left) */}
      <mesh position={[0.6, 0.1, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
      </mesh>

      {/* Analog Sticks */}
      <mesh position={[-0.3, -0.2, 0.26]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0.3, -0.2, 0.26]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Center Button */}
      <mesh position={[0, 0.1, 0.26]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
