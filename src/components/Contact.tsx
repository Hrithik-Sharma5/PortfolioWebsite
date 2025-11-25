import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const Contact = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 80, friction: 25 },
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Replace this with your actual email address
  const YOUR_EMAIL = 'hrithik5374@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const mailtoLink = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Optional: Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-32 px-6 relative flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-secondary/20 to-background" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <animated.div style={fadeIn}>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">Let's Connect</h2>
          <p className="text-muted-foreground text-center text-lg mb-16 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>

          <div className="glass rounded-2xl p-8 md:p-12 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-secondary border-border min-h-[150px] resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full glass hover:bg-accent transition-all duration-500"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-center text-muted-foreground mb-6">Or connect with me on</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="glass hover:bg-secondary"
                  onClick={() => window.open('https://github.com/Hrithik-Sharma5', '_blank')}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="glass hover:bg-secondary"
                  onClick={() => window.open('https://www.linkedin.com/in/hrithik-s-a86851107/', '_blank')}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="glass hover:bg-secondary"
                  onClick={() => window.open('https://x.com/NoDotBalls', '_blank')}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};
