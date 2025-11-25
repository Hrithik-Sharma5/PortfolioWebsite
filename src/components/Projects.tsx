import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Smartphone, Apple, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Platform = {
  name: 'playstore' | 'appstore' | 'steam' | 'website';
  url: string;
};

const projects = [
  {
    title: 'Spa Empire',
    description: 'An idle spa management game where you welcome customers, complete tasks, unlock new rooms, and expand your spa into an empire.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.CTT.myperfectspa&hl=en' },
    ],
    image: './PortfolioVisualIcons/SpaEmpire.png',
  },
  {
    title: 'Gear Defense : Survival',
    description: 'Gear Defence is a zombie survival RPG. Build, merge, and upgrade your gears to fight endless waves of zombies in a bullet hell defence arena.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.CTT.geardefence' },
    ],
    image: './PortfolioVisualIcons/GearSurvival.png',
  },
  {
    title: 'Car Parking Driving School',
    description: 'A realistic open world car simulation game featuring diverse missions, deep vehicle customization, and a physics based driving system.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.racinggames_city.car.racing_Free' },
      { name: 'appstore' as const, url: 'https://apps.apple.com/us/app/car-parking-driving-school/id1193550697' },
    ],
    image: './PortfolioVisualIcons/CPDS.png',
  },
  {
    title: 'Mineventure',
    description: 'A 2D idle mining game where you collect resources, upgrade miners and weapons, and progress through levels by clearing the rocks and mines from the area.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.CTT.mineventure' },
    ],
    image: './PortfolioVisualIcons/MineVenture.png',
  },
  {
    title: 'Gas Station Tycoon',
    description: 'An idle gas station tycoon game where you manage a gas station, fill customer’s tanks, upgrade pumps, hire workers, and expand your station.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.CTT.gasstation3d&hl=en' },
    ],
    image: './PortfolioVisualIcons/GasStationTycooon.png',
  },
  {
    title: 'Tower Strike',
    description: 'An idle gas station tycoon game where you manage a gas station, fill customer’s tanks, upgrade pumps, hire workers, and expand your station.',
    platforms: [
      { name: 'playstore' as const, url: 'https://play.google.com/store/apps/details?id=com.goosebump.towerstrike' },
    ],
    image: './PortfolioVisualIcons/TowerStrike.png',
  },
];

const platformConfig = {
  playstore: { label: 'Play Store', icon: Smartphone, color: 'hover:bg-green-600' },
  appstore: { label: 'App Store', icon: Apple, color: 'hover:bg-blue-600' },
  steam: { label: 'Steam', icon: ExternalLink, color: 'hover:bg-indigo-600' },
  website: { label: 'Website', icon: Globe, color: 'hover:bg-purple-600' },
};

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Featured Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
            >
              <Card className="glass overflow-hidden border-border hover:border-accent transition-all duration-500 h-full cursor-pointer">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.platforms.map((platform, i) => {
                      const config = platformConfig[platform.name];
                      const Icon = config.icon;
                      return (
                        <Button
                          key={i}
                          size="sm"
                          variant="outline"
                          className={`glass border-border transition-all duration-300 ${config.color}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(platform.url, '_blank');
                          }}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {config.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
