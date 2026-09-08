import { renderToString } from 'react-dom/server';
import Index from './pages/Index';
import { featuredProjects, selfPublishedGames, platformMeta, type Game } from './data/games';
import {
  SITE_URL,
  PERSON_NAME,
  JOB_TITLE,
  PERSON_DESCRIPTION,
  SKILLS,
  PROFILES,
  TARGET_MARKETS,
} from './data/site';

/**
 * Renders the page to static HTML at build time (see scripts/prerender.mjs).
 *
 * The app is a single route, so this renders <Index /> directly rather than
 * going through a router. Routers emit no DOM of their own, so the markup this
 * produces is identical to what BrowserRouter renders for "/" in the browser,
 * which is what keeps hydration clean.
 */
export function render(): string {
  return renderToString(<Index />);
}

const absolute = (path: string) => `${SITE_URL}/${path.replace(/^\.?\//, '')}`;

const PERSON_ID = `${SITE_URL}/#person`;

function videoGameNode(game: Game) {
  return {
    '@type': 'VideoGame',
    '@id': `${SITE_URL}/#game-${game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    name: game.title.replace(/\s*\(To be released\)\s*/i, '').trim(),
    description: game.description,
    genre: game.genre,
    image: absolute(game.image),
    applicationCategory: 'GameApplication',
    operatingSystem: [...new Set(game.platforms.map((p) => platformMeta[p.name].os))].join(', '),
    url: game.platforms[0]?.url,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * Builds the JSON-LD graph injected into <head> at build time.
 *
 * Generated from the same data the page renders from, so the markup and the
 * structured data cannot drift apart. Only games with a live store listing are
 * included - see the `listed` flag in data/games.ts.
 */
export function structuredData(): string {
  const games = [...featuredProjects, ...selfPublishedGames].filter((g) => g.listed);

  const graph = [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.jpg`,
      jobTitle: JOB_TITLE,
      description: PERSON_DESCRIPTION,
      knowsAbout: SKILLS,
      knowsLanguage: 'en',
      sameAs: PROFILES,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${PERSON_NAME} — ${JOB_TITLE}`,
      description: PERSON_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: `${PERSON_NAME} — ${JOB_TITLE} Portfolio`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Unity Game Development',
      description:
        'Freelance and contract Unity game development: 2D and 3D gameplay, multiplayer ' +
        'netcode, AR/VR, shaders and performance optimisation for Android, iOS, Web and Steam.',
      provider: { '@id': PERSON_ID },
      areaServed: TARGET_MARKETS.map((name) => ({ '@type': 'Country', name })),
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${SITE_URL}/#contact`,
      },
    },
    ...games.map(videoGameNode),
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}
