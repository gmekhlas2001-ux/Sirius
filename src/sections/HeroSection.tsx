import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const star = starRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !content || !star || !eyebrow || !headline || !subhead || !cta || !bg) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bg, { opacity: 0, scale: 1.06 });
      gsap.set(star, { y: -18, opacity: 0, rotate: -12 });
      gsap.set(eyebrow, { y: 10, opacity: 0 });
      gsap.set(headline.querySelectorAll('.word'), { y: 26, opacity: 0 });
      gsap.set(subhead, { y: 14, opacity: 0 });
      gsap.set(cta.children, { y: 14, opacity: 0 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.3 });
      
      entranceTl
        .to(bg, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' })
        .to(star, { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8')
        .to(eyebrow, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to(headline.querySelectorAll('.word'), { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.05, 
          ease: 'power2.out' 
        }, '-=0.4')
        .to(subhead, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(cta.children, { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: 'power2.out' 
        }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.to(content, { y: 0, opacity: 1, duration: 0.3 });
            gsap.to(bg, { scale: 1, opacity: 1, duration: 0.3 });
          }
        }
      });

      // Phase 1 (0-70%): Hold position
      // Phase 2 (70-100%): Exit
      scrollTl
        .fromTo(content, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bg, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.08, opacity: 0.35, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  // Split headline into words
  const headlineText = 'A PRIVATE UNIVERSE, BUILT FOR TWO.';
  const words = headlineText.split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative w-screen h-screen overflow-hidden z-10"
    >
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/hero_starfield.jpg" 
          alt="Starfield"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(25%) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-slate/30 via-transparent to-night-slate/60" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,980px)] text-center"
      >
        {/* Star Mark */}
        <div ref={starRef} className="flex justify-center mb-6">
          <Star 
            className="w-6 h-6 text-antique-gold star-glow" 
            fill="#D4A24F"
            strokeWidth={0}
          />
        </div>

        {/* Eyebrow */}
        <div 
          ref={eyebrowRef}
          className="font-sans text-xs tracking-widest text-muted-parchment mb-4"
        >
          SIRIUS
        </div>

        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="font-serif text-warm-ivory uppercase tracking-widest leading-tight mb-6"
          style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadRef}
          className="font-sans text-sm text-muted-parchment tracking-wide mb-10"
        >
          A quiet place to remember, to celebrate, and to look forward.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center justify-center gap-6">
          <button className="px-8 py-3 border border-antique-gold text-antique-gold font-sans text-sm tracking-wider btn-hover hover:bg-antique-gold/10 transition-colors">
            Open the letter
          </button>
          <a 
            href="#memories" 
            className="font-sans text-sm text-warm-ivory link-underline"
          >
            Share a memory
          </a>
        </div>
      </div>
    </section>
  );
}
