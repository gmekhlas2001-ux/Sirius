import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiptychSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPortraitRef = useRef<HTMLDivElement>(null);
  const rightPortraitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftPortrait = leftPortraitRef.current;
    const rightPortrait = rightPortraitRef.current;
    const card = cardRef.current;
    const text = textRef.current;

    if (!section || !leftPortrait || !rightPortrait || !card || !text) return;

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

      // Left portrait - enters from left
      scrollTl
        .fromTo(leftPortrait,
          { x: '-40vw', opacity: 0.6 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(leftPortrait,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0.35, ease: 'power2.in' },
          0.7
        );

      // Right portrait - enters from right
      scrollTl
        .fromTo(rightPortrait,
          { x: '40vw', opacity: 0.6 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(rightPortrait,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0.35, ease: 'power2.in' },
          0.7
        );

      // Center card - scales up from center
      scrollTl
        .fromTo(card,
          { scale: 0.86, y: '10vh', opacity: 0 },
          { scale: 1, y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(card,
          { scale: 1, y: 0, opacity: 1 },
          { scale: 0.96, y: '-6vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        );

      // Text content
      const headline = text.querySelector('.headline');
      const bodyLines = text.querySelectorAll('.body-line');
      const cta = text.querySelector('.cta');

      scrollTl
        .fromTo(headline?.querySelectorAll('.word') || [],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(bodyLines,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.12
        )
        .fromTo(cta,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        )
        // Exit
        .fromTo(text,
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'TWO FRAMES, ONE STORY';
  const words = headlineText.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative w-screen h-screen overflow-hidden z-50"
    >
      {/* Left Portrait */}
      <div 
        ref={leftPortraitRef}
        className="absolute left-0 top-0 w-[35vw] h-full"
      >
        <img 
          src="/portrait_diptych_left.jpg" 
          alt="Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.6) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-night-slate/50" />
      </div>

      {/* Left Hairline */}
      <div 
        className="absolute top-0 h-full hairline-vertical"
        style={{ left: '35vw', opacity: 0.3 }}
      />

      {/* Right Portrait */}
      <div 
        ref={rightPortraitRef}
        className="absolute right-0 top-0 w-[35vw] h-full"
      >
        <img 
          src="/portrait_diptych_right.jpg" 
          alt="Portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.6) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-night-slate/50" />
      </div>

      {/* Right Hairline */}
      <div 
        className="absolute top-0 h-full hairline-vertical"
        style={{ right: '35vw', opacity: 0.3 }}
      />

      {/* Center Message Card */}
      <div 
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(46vw,520px)] bg-deep-ink/80 border border-warm-ivory/10 p-10 md:p-12"
      >
        <div ref={textRef}>
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
            style={{ fontSize: 'clamp(24px, 3.5vw, 48px)' }}
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.2em]">
                {word}
              </span>
            ))}
          </h2>

          {/* Body */}
          <p className="body-line font-sans text-sm text-muted-parchment leading-relaxed mb-2">
            Some people change the temperature of a room
          </p>
          <p className="body-line font-sans text-sm text-muted-parchment leading-relaxed mb-8">
            just by walking in. You change the temperature of a life.
          </p>

          {/* CTA */}
          <button className="cta px-6 py-2 border border-antique-gold text-antique-gold font-sans text-sm tracking-wider btn-hover hover:bg-antique-gold/10 transition-colors">
            Add a photo
          </button>
        </div>
      </div>
    </section>
  );
}
