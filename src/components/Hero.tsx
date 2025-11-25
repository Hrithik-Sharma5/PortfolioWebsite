import { useSpring, animated } from '@react-spring/web';
import { GameScene3D } from './GameScene3D';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 80, friction: 25 },
    delay: 200,
  });

  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 100, friction: 30 },
    delay: 400,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <GameScene3D variant="all" />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(0_0%_100%/0.05),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <animated.div style={fadeIn}>
          <p className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light">
            Unity Game Developer
          </p>
        </animated.div>

        <animated.h1
          style={titleSpring}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground leading-tight"
        >
          Hrithik Sharma
        </animated.h1>

        <animated.p
          style={fadeIn}
          className="text-2xl md:text-3xl font-light text-muted-foreground mb-8"
        >
          Crafting Immersive Game Experiences
        </animated.p>

        <animated.p
          style={fadeIn}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Transforming creative visions into interactive realities with cutting-edge
          game development and innovative design solutions.
        </animated.p>

        <animated.div style={fadeIn} className="flex gap-4 justify-center">
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
        </animated.div>
      </div>

      {/* Scroll Indicator */}
      <animated.div
        style={fadeIn}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </animated.div>
    </section>
  );
};
