import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GameBoy3D } from './GameBoy3D';
import { GameController3D } from './GameController3D';
import { GameDice3D } from './GameDice3D';

interface GameScene3DProps {
  variant?: 'gameboy' | 'controller' | 'dice' | 'all';
}

export const GameScene3D = ({ variant = 'all' }: GameScene3DProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // React Three Fiber defaults to frameloop="always" and has no built-in
  // off-screen detection, so the scene would keep rendering at ~60fps for the
  // whole session even once it is scrolled far out of view. Pause it instead.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        // Decorative background rendered at 30% opacity - the default cap of 2
        // buys no visible detail here but costs ~44% more pixels to shade.
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        {/* The two coloured point lights carry the look, so they stay. The
            overhead spotLight was the costliest of the five to shade and is not
            distinguishable through the 30% opacity and gradient overlay. */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4ade80" />
        <pointLight position={[10, -10, 5]} intensity={0.6} color="#3b82f6" />

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
