import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [springs] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="max-w-5xl mx-auto relative z-10">
        <animated.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
          style={springs}
        >
          About Me
        </animated.h2>

        <div className="glass rounded-2xl p-8 md:p-12 backdrop-blur-xl">
          <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
            {/* Profile Image Panel */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-foreground to-muted-foreground rounded-full opacity-20 blur group-hover:opacity-30 transition duration-500"></div>
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-border glass">
                  <img
                    src="./PortfolioVisualIcons/MyImageCrop.png"
                    alt="Hrithik Sharma"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg md:text-xl">
                Hi, I'm <span className="text-foreground font-semibold">Hrithik Sharma</span>, a Unity game developer with 7+ years of experience building
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
