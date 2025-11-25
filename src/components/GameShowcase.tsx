import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GameScene3D } from './GameScene3D';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: 'Classic Gaming',
    description: 'Retro-inspired mechanics with modern polish',
    variant: 'gameboy' as const,
  },
  {
    title: 'Modern Controls',
    description: 'Intuitive gameplay experiences',
    variant: 'controller' as const,
  },
  {
    title: 'Dynamic Systems',
    description: 'Procedural generation & randomization',
    variant: 'dice' as const,
  },
];

export const GameShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = document.querySelectorAll('.showcase-item');
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
          Game Development Philosophy
        </h2>

        <div className="grid gap-16">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className={`showcase-item grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="glass rounded-2xl p-8 backdrop-blur-xl h-full">
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="glass rounded-2xl aspect-square backdrop-blur-xl overflow-hidden shadow-glow">
                  <GameScene3D variant={item.variant} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
