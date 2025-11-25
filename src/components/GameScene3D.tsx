import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GameBoy3D } from './GameBoy3D';
import { GameController3D } from './GameController3D';
import { GameDice3D } from './GameDice3D';

interface GameScene3DProps {
  variant?: 'gameboy' | 'controller' | 'dice' | 'all';
}

export const GameScene3D = ({ variant = 'all' }: GameScene3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4ade80" />
        <pointLight position={[10, -10, 5]} intensity={0.6} color="#3b82f6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {variant === 'gameboy' && (
          <group position={[0, 0, 0]}>
            <GameBoy3D />
          </group>
        )}

        {variant === 'controller' && (
          <group position={[0, 0, 0]}>
            <GameController3D />
          </group>
        )}

        {variant === 'dice' && (
          <group position={[0, 0, 0]}>
            <GameDice3D />
          </group>
        )}

        {variant === 'all' && (
          <>
            <group position={[-3, 0, 0]}>
              <GameBoy3D />
            </group>
            <group position={[3, 0, 0]}>
              <GameController3D />
            </group>
            <group position={[0, -2, 2]}>
              <GameDice3D />
            </group>
          </>
        )}

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
