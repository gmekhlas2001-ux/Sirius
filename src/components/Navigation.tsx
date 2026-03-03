import { useState, useEffect } from 'react';
import { Star, Mail } from 'lucide-react';

interface NavigationProps {
  onToggleMessages: () => void;
  showingMessages: boolean;
}

export default function Navigation({ onToggleMessages, showingMessages }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

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

  useEffect(() => {
    if (!showingMessages) {
      setIsMouseNearTop(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsMouseNearTop(e.clientY < 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showingMessages]);

  const shouldShowNav = showingMessages ? isMouseNearTop : isVisible;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        shouldShowNav
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="w-full px-6 md:px-10 py-5 flex items-center justify-between bg-night-slate/80 backdrop-blur-md">
        {/* Logo */}
        <button
          onClick={() => showingMessages && onToggleMessages()}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Star
            className="w-4 h-4 text-antique-gold"
            fill="#D4A24F"
            strokeWidth={0}
          />
          <span className="font-serif text-warm-ivory text-lg tracking-wider">
            Sirius
          </span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!showingMessages && (
            <>
              <button
                onClick={onToggleMessages}
                className="px-4 py-2 flex items-center gap-2 text-muted-parchment hover:text-antique-gold font-sans text-xs tracking-wider transition-colors"
                title="View messages"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Messages</span>
              </button>

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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
