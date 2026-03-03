import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    const bg = bgRef.current;

    if (!section || !card || !text || !bg) return;

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

      // Card animation - 3 phases
      scrollTl
        // Phase 1: Enter (0-30%)
        .fromTo(card, 
          { y: '110vh', rotate: -8, scale: 0.92, opacity: 0 },
          { y: 0, rotate: -2, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        // Phase 2: Hold (30-70%) - no animation
        // Phase 3: Exit (70-100%)
        .fromTo(card,
          { y: 0, rotate: -2, opacity: 1 },
          { y: '-60vh', rotate: 2, opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Text animation
      const lines = text.querySelectorAll('.line');
      scrollTl
        .fromTo(lines,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        )
        .fromTo(lines,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Background parallax
      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.05, y: '-5vh', ease: 'none' },
        0
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-screen h-screen overflow-hidden z-20"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="/hero_starfield.jpg" 
          alt="Starfield"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(25%) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-night-slate/40" />
      </div>

      {/* Paper Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] paper-texture shadow-card animate-float"
        style={{
          aspectRatio: '4/3',
          padding: 'clamp(5%, 8%, 10%)',
        }}
      >
        {/* Handwritten Text */}
        <div ref={textRef} className="h-full flex flex-col justify-center">
          <p className="font-handwritten text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed">
            <span className="line block">
              I don't say it enough out loud—so I wrote it down.
            </span>
          </p>
          <p className="font-handwritten text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed mt-3 md:mt-4">
            <span className="line block">
              Thank you for the patience, the laughter, and the quiet
            </span>
          </p>
          <p className="font-handwritten text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed">
            <span className="line block">
              strength you bring into every room.
            </span>
          </p>

          {/* Signature */}
          <p className="font-handwritten text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 mt-8 md:mt-12 text-right pr-[5%] md:pr-[10%]">
            <span className="line block">— Me</span>
          </p>
        </div>
      </div>
    </section>
  );
}
