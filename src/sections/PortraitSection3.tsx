import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PortraitSection3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;

    if (!section || !portrait || !overlay || !text) return;

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

      // Portrait - scale and slide from left
      scrollTl
        .fromTo(portrait,
          { scale: 1.08, x: '-6vw', opacity: 0.7 },
          { scale: 1, x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(portrait,
          { scale: 1, x: 0, opacity: 1 },
          { scale: 1.04, x: '4vw', opacity: 0.4, ease: 'power2.in' },
          0.7
        );

      // Right overlay gradient
      scrollTl.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      // Text block - enters from right
      const headline = text.querySelector('.headline');
      const bodyLines = text.querySelectorAll('.body-line');
      const cta = text.querySelector('.cta');

      scrollTl
        .fromTo(text,
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline?.querySelectorAll('.word') || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        )
        .fromTo(bodyLines,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        )
        .fromTo(cta,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        // Exit
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'A SOFT LIGHT';
  const words = headlineText.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative w-screen h-screen overflow-hidden z-[60]"
    >
      {/* Full-bleed Portrait */}
      <div 
        ref={portraitRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/portrait_soft_light.jpg" 
          alt="Portrait"
          className="w-full h-full object-cover"
          style={{ 
            filter: 'saturate(0.6) contrast(1.1)',
            objectPosition: '38% 50%'
          }}
        />
      </div>

      {/* Right Dark Overlay */}
      <div 
        ref={overlayRef}
        className="absolute right-0 top-0 w-[42vw] h-full"
        style={{
          background: 'linear-gradient(270deg, rgba(11,13,16,0.78), rgba(11,13,16,0))'
        }}
      />

      {/* Text Content */}
      <div 
        ref={textRef}
        className="absolute right-[9vw] top-1/2 -translate-y-1/2 w-[30vw] text-left"
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
          className="headline font-serif text-warm-ivory uppercase tracking-wider leading-snug mb-6"
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
          No matter the season, you carry a kind of warmth
        </p>
        <p className="body-line font-sans text-sm text-muted-parchment leading-relaxed mb-8">
          that makes people feel at home.
        </p>

        {/* CTA */}
        <button className="cta px-6 py-2 border border-antique-gold text-antique-gold font-sans text-sm tracking-wider btn-hover hover:bg-antique-gold/10 transition-colors">
          Light a candle
        </button>
      </div>
    </section>
  );
}
