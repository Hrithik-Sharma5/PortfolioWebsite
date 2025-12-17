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

const selfPublishedGames = [
    {
        title: 'Crush Point',
        description: 'A satisfying 2D ball crushing game with multiple levels and free play modes. Crush balls between the bars and avoid the obstacles.',
        platforms: [
            { name: 'steam' as const, url: 'https://store.steampowered.com/app/3977490/Crush_Point/' },
        ],
        image: './PortfolioVisualIcons/CrushPoint.jpg',
    },
    {
        title: 'Chill Guy Survival (To be released)',
        description: 'A 2D survival game where you use a variety of weapons to fight enemy waves. Each weapon generates at different speeds, requiring strategic planning across multiple maps.',
        platforms: [
            { name: 'website' as const, url: 'https://www.crazygames.com/preview/ea00d315-5bb0-4ee6-80ee-b13c96f8d1aa?sdk_debug=true&gameBuildId=c00a68c8-7cfc-4a16-ae14-15a6a1366cb4&qaTool=true&disableSubmitQA=true&role=developer' }
        ],
        image: './PortfolioVisualIcons/ChillGuy.jpg',
    },
];

const platformConfig = {
    playstore: { label: 'Play Store', icon: Smartphone, color: 'hover:bg-green-600' },
    appstore: { label: 'App Store', icon: Apple, color: 'hover:bg-blue-600' },
    steam: { label: 'Steam', icon: ExternalLink, color: 'hover:bg-indigo-600' },
    website: { label: 'Website', icon: Globe, color: 'hover:bg-purple-600' },
};

export const SelfPublished = () => {
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
        <section id="self-published" ref={sectionRef} className="min-h-screen py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Self Published Games</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selfPublishedGames.map((game, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group"
                        >
                            <Card className="glass overflow-hidden border-border hover:border-accent transition-all duration-500 h-full cursor-pointer">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                                </div>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-2xl font-bold">{game.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{game.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {game.platforms.map((platform, i) => {
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
