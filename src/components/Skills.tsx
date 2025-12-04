const skills = [
  'Unity Engine',
  'C# Programming',
  'Game Design',
  'Shader Programming',
  'AI & Navigation',
  'Multiplayer/Netcode',
  'Physics Simulation',
  'Performance Optimization',
  '2D Game Development',
  '3D Game Development',
  'AR/VR Development',
  'Mobile Game Development',
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Technical Skills</h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass px-3 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full border border-border backdrop-blur-xl text-center hover:scale-105 transition-transform duration-300"
            >
              <span className="text-foreground font-medium text-sm sm:text-base md:text-lg break-words">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
