import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Smartphone, Apple, Globe } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { selfPublishedGames, platformMeta, type PlatformName } from '@/data/games';

const platformIcons: Record<PlatformName, typeof Smartphone> = {
  playstore: Smartphone,
  appstore: Apple,
  steam: ExternalLink,
  website: Globe,
};

const platformStyles: Record<PlatformName, string> = {
  playstore: 'hover:bg-green-600',
  appstore: 'hover:bg-blue-600',
  steam: 'hover:bg-indigo-600',
  website: 'hover:bg-purple-600',
};

export const SelfPublished = () => {
    const reveal = useScrollReveal();

    return (
        <section id="self-published" className="min-h-screen py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Self Published Games</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selfPublishedGames.map((game, index) => (
                        <div
                            key={index}
                            ref={(el) => (reveal.current[index] = el)}
                            className="group"
                            style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                        >
                            <Card className="glass overflow-hidden border-border hover:border-accent transition-all duration-500 h-full cursor-pointer">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={game.image}
                                        alt={`${game.title} — ${game.genre} game developed and self-published by Hrithik Sharma`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                                </div>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-2xl font-bold">{game.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{game.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {game.platforms.map((platform, i) => {
                                            const Icon = platformIcons[platform.name];
                                            const label = platformMeta[platform.name].label;
                                            return (
                                                <Button
                                                    key={i}
                                                    asChild
                                                    size="sm"
                                                    variant="outline"
                                                    className={`glass border-border transition-all duration-300 ${platformStyles[platform.name]}`}
                                                >
                                                    <a
                                                        href={platform.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${game.title} on ${label}`}
                                                    >
                                                        <Icon className="w-4 h-4 mr-2" />
                                                        {label}
                                                    </a>
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
