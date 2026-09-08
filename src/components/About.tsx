import { useScrollReveal } from '@/hooks/useScrollReveal';

export const About = () => {
  const reveal = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          ref={(el) => (reveal.current[0] = el)}
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
        >
          About Me
        </h2>

        <div
          ref={(el) => (reveal.current[1] = el)}
          className="glass rounded-2xl p-8 md:p-12 backdrop-blur-xl"
          style={{ transitionDelay: '100ms' }}
        >
          <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
            {/* Profile Image Panel */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-foreground to-muted-foreground rounded-full opacity-20 blur group-hover:opacity-30 transition duration-500"></div>
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-border glass">
                  <img
                    src="./PortfolioVisualIcons/MyImageCrop.webp"
                    alt="Hrithik Sharma"
                    width={640}
                    height={627}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg md:text-xl">
                Hi, I'm <span className="text-foreground font-semibold">Hrithik Sharma</span>, a Unity and C# game developer with 7+ years of experience building
                games across 2D, 3D, Multiplayer, AR, VR, and XR.
              </p>

              <p className="text-lg md:text-xl">
                I've worked on Android, iOS, Web, and Steam projects, ensuring smooth performance and engaging gameplay across all devices.
                My focus is always on delivering polished, optimized, and player-friendly experiences.
              </p>

              <p className="text-lg md:text-xl">
                From core architecture to gameplay design, I handle end-to-end development with attention to detail.
                I'm passionate about creating fun, high-quality games and constantly improving my craft.
              </p>

              <p className="text-lg md:text-xl">
                I work remotely with studios, publishers and independent teams across the
                United States, United Kingdom, Canada and Europe — comfortable with
                overlapping hours, async handoffs, and both long-running contracts and
                full-time roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
