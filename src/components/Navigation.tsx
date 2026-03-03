import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Show nav after scrolling past hero (about 100vh)
      setIsVisible(scrollY > windowHeight * 0.5);
      
      // Check if near bottom
      setIsAtBottom(scrollY + windowHeight > docHeight - 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="w-full px-6 md:px-10 py-5 flex items-center justify-between bg-night-slate/80 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Star 
            className="w-4 h-4 text-antique-gold" 
            fill="#D4A24F"
            strokeWidth={0}
          />
          <span className="font-serif text-warm-ivory text-lg tracking-wider">
            Sirius
          </span>
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => {
            if (isAtBottom) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-5 py-2 border border-antique-gold text-antique-gold font-sans text-xs tracking-wider btn-hover hover:bg-antique-gold/10 transition-colors"
        >
          {isAtBottom ? 'Back to top' : 'Send a note'}
        </button>
      </div>
    </nav>
  );
}
