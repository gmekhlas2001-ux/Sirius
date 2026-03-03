import { Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-night-slate py-12 md:py-16 z-[80]">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Star Mark */}
        <div className="flex justify-center mb-6">
          <Star 
            className="w-5 h-5 text-antique-gold/60" 
            fill="#D4A24F"
            strokeWidth={0}
          />
        </div>

        {/* Copyright */}
        <p className="font-sans text-sm text-muted-parchment mb-2">
          © 2026 Sirius. A private universe.
        </p>

        {/* Note */}
        <p className="font-sans text-xs text-muted-parchment/60">
          If this ever feels off, we can change anything.
        </p>
      </div>
    </footer>
  );
}
