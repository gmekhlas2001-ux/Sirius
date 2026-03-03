import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const beautifulMessages = [
  "You make every morning feel like a new beginning.",
  "Your laugh is my favorite sound in the world.",
  "You turn ordinary moments into cherished memories.",
  "The world feels softer when you're near.",
  "You have a way of making everything feel possible.",
  "Your presence is the calmest part of my day.",
  "You see beauty where others see nothing at all.",
  "You make me believe in magic again.",
  "Your kindness ripples out in ways you'll never know.",
  "You're the reason I look forward to tomorrow.",
  "Your smile could light up the darkest room.",
  "You make me want to be a better person.",
  "Time stops when I'm with you.",
  "You're my favorite kind of certainty.",
  "Your heart is the safest place I know.",
  "You make the complex feel simple.",
  "You're the poetry I never knew I needed.",
  "You turn chaos into calm without even trying.",
  "Your energy changes everything around you.",
  "You make me feel at home in my own skin.",
  "You're proof that gentle strength exists.",
  "You make hope feel tangible.",
  "Your eyes hold entire galaxies.",
  "You're the plot twist I never saw coming.",
  "You make vulnerability feel like courage.",
  "You're my favorite discovery.",
  "You make silence feel like conversation.",
  "Your wisdom comes wrapped in warmth.",
  "You're the rare kind of real.",
  "You make gratitude feel effortless.",
];

export default function DayCounterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [days, setDays] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const startDate = new Date('2026-01-18');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDays(diffDays);

    const randomMessage = beautifulMessages[Math.floor(Math.random() * beautifulMessages.length)];
    setMessage(randomMessage);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const number = numberRef.current;
    const text = textRef.current;

    if (!section || !number || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl
        .fromTo(number,
          { scale: 0.85, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
          0
        )
        .fromTo(text,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.15
        )
        .to(number,
          { scale: 1.05, opacity: 0.8, ease: 'power2.in' },
          0.65
        )
        .to(text,
          { opacity: 0, y: -10, ease: 'power2.in' },
          0.65
        );

    }, section);

    return () => ctx.revert();
  }, [days]);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden z-20 bg-night-slate"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-antique-gold/5 via-transparent to-transparent" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-antique-gold/30 rounded-full animate-float"
             style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-antique-gold/20 rounded-full animate-float"
             style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-antique-gold/25 rounded-full animate-float"
             style={{ animationDelay: '4s', animationDuration: '12s' }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Heart Icon */}
        <div className="mb-6 md:mb-8">
          <Heart
            className="w-6 h-6 md:w-8 md:h-8 text-antique-gold"
            fill="#D4A24F"
            strokeWidth={0}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(212, 162, 79, 0.4))'
            }}
          />
        </div>

        {/* Day Counter */}
        <div ref={numberRef} className="text-center mb-6 md:mb-8">
          <div className="font-serif text-antique-gold mb-2 md:mb-3"
               style={{
                 fontSize: 'clamp(48px, 12vw, 120px)',
                 lineHeight: '1',
                 textShadow: '0 0 30px rgba(212, 162, 79, 0.3)'
               }}>
            {days.toLocaleString()}
          </div>
          <div className="font-sans text-warm-ivory tracking-[0.3em] uppercase"
               style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}>
            Days of loving you
          </div>
        </div>

        {/* Random Message */}
        <div ref={textRef} className="max-w-2xl text-center px-6">
          <p className="font-sans text-muted-parchment leading-relaxed italic"
             style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}>
            "{message}"
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-px h-12 md:h-16 bg-gradient-to-b from-antique-gold/50 to-transparent" />
      </div>
    </section>
  );
}
