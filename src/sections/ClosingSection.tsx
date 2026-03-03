import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const text = textRef.current;
    const form = formRef.current;

    if (!section || !scene || !text || !form) return;

    const ctx = gsap.context(() => {
      // Candle scene entrance
      gsap.fromTo(scene,
        { opacity: 0, y: 40, scale: 1.03 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Closing text
      const lines = text.querySelectorAll('.line');
      gsap.fromTo(lines,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );

      // Form panel
      gsap.fromTo(form,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full z-[70]"
    >
      {/* Candle Scene */}
      <div 
        ref={sceneRef}
        className="relative w-full h-screen"
      >
        <img 
          src="/candle_closing.jpg" 
          alt="Candlelight"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.7) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-slate/30 via-transparent to-night-slate/70" />

        {/* Closing Text */}
        <div 
          ref={textRef}
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,860px)] text-center"
        >
          {/* Star Mark */}
          <div className="flex justify-center mb-6">
            <Star 
              className="w-6 h-6 text-antique-gold star-glow" 
              fill="#D4A24F"
              strokeWidth={0}
            />
          </div>

          {/* Headline */}
          <h2 
            className="line font-serif text-warm-ivory uppercase tracking-wider leading-snug mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            KEEP THE LIGHT ON
          </h2>

          {/* Body */}
          <p className="line font-sans text-sm md:text-base text-muted-parchment leading-relaxed max-w-xl mx-auto">
            If you ever need a reminder of how much you matter—come back here. 
            The light stays lit.
          </p>
        </div>
      </div>

      {/* Contact Form Panel */}
      <div 
        ref={formRef}
        className="relative w-full bg-deep-ink py-16 md:py-24"
      >
        <div className="max-w-xl mx-auto px-6 md:px-8">
          {/* Form Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-warm-ivory mb-8 text-center">
            Send a note
          </h3>

          {submitted ? (
            <div className="text-center py-12">
              <Star 
                className="w-8 h-8 text-antique-gold star-glow mx-auto mb-4" 
                fill="#D4A24F"
                strokeWidth={0}
              />
              <p className="font-sans text-warm-ivory">Your note has been sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-sans text-xs text-muted-parchment mb-2 tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-night-slate border border-warm-ivory/20 px-4 py-3 font-sans text-sm text-warm-ivory placeholder:text-muted-parchment/50 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-xs text-muted-parchment mb-2 tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-night-slate border border-warm-ivory/20 px-4 py-3 font-sans text-sm text-warm-ivory placeholder:text-muted-parchment/50 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-xs text-muted-parchment mb-2 tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-night-slate border border-warm-ivory/20 px-4 py-3 font-sans text-sm text-warm-ivory placeholder:text-muted-parchment/50 transition-colors resize-none"
                  placeholder="Write something beautiful..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-antique-gold text-night-slate font-sans text-sm tracking-wider btn-hover transition-colors"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
