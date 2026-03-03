import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PortraitSection1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    const headline = headlineRef.current;

    if (!section || !portrait || !panel || !text || !headline) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Portrait panel - enters from left
      scrollTl
        .fromTo(portrait,
          { x: '-60vw', opacity: 0.8 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(portrait,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.35, ease: 'power2.in' },
          0.7
        );

      // Right dark panel - enters from right
      scrollTl
        .fromTo(panel,
          { x: '45vw' },
          { x: 0, ease: 'none' },
          0
        )
        .fromTo(panel,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0.6, ease: 'power2.in' },
          0.7
        );

      // Text content
      const words = headline.querySelectorAll('.word');
      const bodyLines = text.querySelectorAll('.body-line');

      scrollTl
        .fromTo(words,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(bodyLines,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.15
        )
        .fromTo(text.querySelector('.cta'),
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        )
        // Exit
        .fromTo(words,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(bodyLines,
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'THE WAY YOU LOOK AT THE WORLD';
  const words = headlineText.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative w-screen h-screen overflow-hidden z-30"
    >
      {/* Left Portrait Panel */}
      <div 
        ref={portraitRef}
        className="absolute left-0 top-0 w-[55vw] h-full"
      >
        <img 
          src="/portrait_confidence_left.jpg" 
          alt="Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.6) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-night-slate/40" />
      </div>

      {/* Vertical Hairline */}
      <div 
        className="absolute top-0 h-full hairline-vertical"
        style={{ left: '55vw' }}
      />

      {/* Right Dark Panel */}
      <div 
        ref={panelRef}
        className="absolute right-0 top-0 w-[45vw] h-full bg-night-slate"
      />

      {/* Text Content */}
      <div 
        ref={textRef}
        className="absolute left-[62vw] top-1/2 -translate-y-1/2 w-[30vw]"
      >
        {/* Star Mark */}
        <div className="mb-6">
          <Star 
            className="w-5 h-5 text-antique-gold star-glow" 
            fill="#D4A24F"
            strokeWidth={0}
          />
        </div>

        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="font-serif text-warm-ivory uppercase tracking-wider leading-snug mb-6"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em]">
              {word}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="body-line font-sans text-sm text-muted-parchment leading-relaxed mb-2">
          You find beauty in small things.
        </p>
        <p className="body-line font-sans text-sm text-muted-parchment leading-relaxed mb-8">
          You make ordinary days feel like scenes from a film.
        </p>

        {/* CTA */}
        <a 
          href="#reply" 
          className="cta font-sans text-sm text-warm-ivory link-underline inline-block"
        >
          Leave a reply
        </a>
      </div>
    </section>
  );
}
