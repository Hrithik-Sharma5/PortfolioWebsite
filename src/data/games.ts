export type PlatformName = 'playstore' | 'appstore' | 'steam' | 'website';

export type Platform = {
  name: PlatformName;
  url: string;
};

export type Game = {
  title: string;
  description: string;
  platforms: Platform[];
  image: string;
  /** Genre, used for VideoGame structured data. */
  genre: string;
  /**
   * Whether the store listing is currently live.
   *
   * Games marked false still appear on the page as portfolio work, but are left
   * out of the structured data - we should not hand Google a machine-readable
   * claim that points at a dead store URL.
   */
  listed: boolean;
};

/** Platform label and the operatingSystem value schema.org expects. */
export const platformMeta: Record<PlatformName, { label: string; os: string }> = {
  playstore: { label: 'Play Store', os: 'Android' },
  appstore: { label: 'App Store', os: 'iOS' },
  steam: { label: 'Steam', os: 'Windows' },
  website: { label: 'Website', os: 'Web browser' },
};

/** Commercial work shipped for studios and publishers. */
export const featuredProjects: Game[] = [
  {
    title: 'Spa Empire',
    description:
      'An idle spa management game where you welcome customers, complete tasks, unlock new rooms, and expand your spa into an empire.',
    platforms: [
      { name: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.ctt.littlespa' },
    ],
    image: './PortfolioVisualIcons/SpaEmpire.webp',
    genre: 'Idle Simulation',
    listed: true,
  },
  {
    title: 'Hero Survival: Zombie Defense',
    description:
      'A base defence survival game where you build and upgrade combinations of troops, then hold off escalating waves of zombies through each night.',
    platforms: [
      { name: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.ctt.zombiesurvivor' },
    ],
    image: './PortfolioVisualIcons/HeroSurvival.webp',
    genre: 'Tower Defense',
    listed: true,
  },
  {
    title: 'Gear Defense : Survival',
    description:
      'Gear Defence is a zombie survival RPG. Build, merge, and upgrade your gears to fight endless waves of zombies in a bullet hell defence arena.',
    platforms: [
      { name: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.CTT.geardefence' },
    ],
    image: './PortfolioVisualIcons/GearSurvival.webp',
    genre: 'Survival RPG',
    listed: true,
  },
  {
    title: 'Car Parking Driving School',
    description:
      'A realistic open world car simulation game featuring diverse missions, deep vehicle customization, and a physics based driving system.',
    platforms: [
      {
        name: 'playstore',
        url: 'https://play.google.com/store/apps/details?id=com.racinggames_city.car.racing_Free',
      },
      {
        name: 'appstore',
        url: 'https://apps.apple.com/us/app/car-parking-driving-school/id1193550697',
      },
    ],
    image: './PortfolioVisualIcons/CPDS.webp',
    genre: 'Driving Simulation',
    listed: true,
  },
  {
    title: 'Mineventure',
    description:
      'A 2D idle mining game where you collect resources, upgrade miners and weapons, and progress through levels by clearing the rocks and mines from the area.',
    platforms: [
      { name: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.CTT.mineventure' },
    ],
    image: './PortfolioVisualIcons/MineVenture.webp',
    genre: 'Idle Clicker',
    listed: false,
  },
  {
    title: 'Gas Station Tycoon',
    description:
      'An idle gas station tycoon game where you manage a gas station, fill customer’s tanks, upgrade pumps, hire workers, and expand your station.',
    platforms: [
      { name: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.CTT.gasstation3d&hl=en' },
    ],
    image: './PortfolioVisualIcons/GasStationTycooon.webp',
    genre: 'Idle Tycoon',
    listed: true,
  },
];

/** Games designed, built and published independently. */
export const selfPublishedGames: Game[] = [
  {
    title: 'Crush Point',
    description:
      'A satisfying 2D ball crushing game with multiple levels and free play modes. Crush balls between the bars and avoid the obstacles.',
    platforms: [
      { name: 'steam', url: 'https://store.steampowered.com/app/3977490/Crush_Point/' },
    ],
    image: './PortfolioVisualIcons/CrushPoint.webp',
    genre: 'Casual Arcade',
    listed: true,
  },
  {
    title: 'Chill Guy Survival (To be released)',
    description:
      'A 2D survival game where you use a variety of weapons to fight enemy waves. Each weapon generates at different speeds, requiring strategic planning across multiple maps.',
    platforms: [
      {
        name: 'website',
        url: 'https://www.crazygames.com/preview/ea00d315-5bb0-4ee6-80ee-b13c96f8d1aa?sdk_debug=true&gameBuildId=c00a68c8-7cfc-4a16-ae14-15a6a1366cb4&qaTool=true&disableSubmitQA=true&role=developer',
      },
    ],
    image: './PortfolioVisualIcons/ChillGuy.webp',
    genre: 'Survival Action',
    listed: false,
  },
];
