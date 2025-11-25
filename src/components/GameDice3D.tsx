import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

export function GameDice3D() {
  const diceRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (diceRef.current) {
      diceRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      diceRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      diceRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.3;
    }
  });

  return (
    <RoundedBox ref={diceRef} args={[1.5, 1.5, 1.5]} radius={0.15} smoothness={4}>
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.2} 
        roughness={0.3}
      />
      {/* Dots on faces */}
      {/* Face 1 - Center dot */}
      <mesh position={[0, 0, 0.76]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Face 2 - Two dots */}
      <mesh position={[-0.3, 0.76, -0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.3, 0.76, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Face 3 - Three dots */}
      <mesh position={[0.76, -0.3, -0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.76, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.76, 0.3, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </RoundedBox>
  );
}
