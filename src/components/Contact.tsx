import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Contact = () => {
  const reveal = useScrollReveal();

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
        <div ref={(el) => (reveal.current[0] = el)}>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">Let's Connect</h2>
          <p className="text-muted-foreground text-center text-lg mb-16 max-w-2xl mx-auto">
            Hiring a Unity developer, or have a game in mind? I take on remote contract
            work and full-time roles with studios and publishers worldwide. Tell me about
            the project and I'll get back to you.
          </p>

          <div className="glass rounded-2xl p-8 md:p-12 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm text-muted-foreground">Name</label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm text-muted-foreground">Email</label>
                  <Input
                    id="contact-email"
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
                <label htmlFor="contact-subject" className="text-sm text-muted-foreground">Subject</label>
                <Input
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm text-muted-foreground">Message</label>
                <Textarea
                  id="contact-message"
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
                <Button asChild variant="outline" size="icon" className="glass hover:bg-secondary">
                  <a
                    href="https://github.com/Hrithik-Sharma5"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Hrithik Sharma on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="glass hover:bg-secondary">
                  <a
                    href="https://www.linkedin.com/in/hrithik-s-a86851107/"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Hrithik Sharma on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="glass hover:bg-secondary">
                  <a
                    href="https://x.com/NoDotBalls"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Hrithik Sharma on X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
