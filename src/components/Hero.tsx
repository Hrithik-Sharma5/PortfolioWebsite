import { lazy, Suspense, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

// three.js + @react-three/* is roughly 830 kB raw / 220 kB gzipped - by far the
// largest thing on the page, and purely decorative. Loading it in its own chunk
// lets the hero copy paint without waiting on it.
const GameScene3D = lazy(() =>
  import('./GameScene3D').then((m) => ({ default: m.GameScene3D }))
);

export const Hero = () => {
  // Starts false so the chunk is never on the first-render path, then enables
  // after mount unless the visitor has asked for reduced motion - in which case
  // a permanently auto-rotating scene is exactly what they opted out of, and
  // they never pay to download it.
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setEnable3D(!query.matches);

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        {enable3D && (
          <Suspense fallback={null}>
            <GameScene3D variant="all" />
          </Suspense>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(0_0%_100%/0.05),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <p className="animate-hero-rise text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light">
          Unity Game Developer
        </p>

        <h1 className="animate-hero-zoom text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground leading-tight">
          Hrithik Sharma
        </h1>

        <p className="animate-hero-rise text-2xl md:text-3xl font-light text-muted-foreground mb-8">
          Crafting Immersive Game Experiences
        </p>

        <p className="animate-hero-rise text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Transforming creative visions into interactive realities with cutting-edge
          game development and innovative design solutions.
        </p>

        <div className="animate-hero-rise flex gap-4 justify-center">
          <Button
            size="lg"
            className="glass text-foreground hover:bg-accent transition-all duration-500 text-base px-8"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass border-border hover:bg-secondary transition-all duration-500 text-base px-8"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll Indicator. The centering transform lives on the wrapper so the
          entrance animation's own transform cannot cancel it out. */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <button
          type="button"
          aria-label="Scroll to about section"
          className="animate-hero-rise flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </button>
      </div>
    </section>
  );
};
