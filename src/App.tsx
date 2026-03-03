import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import NoteSection from './sections/NoteSection';
import PortraitSection1 from './sections/PortraitSection1';
import PortraitSection2 from './sections/PortraitSection2';
import DiptychSection from './sections/DiptychSection';
import PortraitSection3 from './sections/PortraitSection3';
import ClosingSection from './sections/ClosingSection';
import Footer from './sections/Footer';
import MessagesPanel from './sections/MessagesPanel';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showMessages, setShowMessages] = useState(false);
  useEffect(() => {
    if (showMessages) return;

    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            // If not in pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [showMessages]);

  if (showMessages) {
    return (
      <div className="relative bg-night-slate min-h-screen">
        <div className="grain-overlay" />
        <Navigation onToggleMessages={() => setShowMessages(false)} showingMessages={true} />
        <MessagesPanel />
      </div>
    );
  }

  return (
    <div className="relative bg-night-slate min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onToggleMessages={() => setShowMessages(true)} showingMessages={false} />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Note */}
        <NoteSection />

        {/* Section 3: Portrait 1 */}
        <PortraitSection1 />

        {/* Section 4: Portrait 2 */}
        <PortraitSection2 />

        {/* Section 5: Diptych */}
        <DiptychSection />

        {/* Section 6: Portrait 3 */}
        <PortraitSection3 />

        {/* Section 7: Closing + Contact */}
        <div id="contact">
          <ClosingSection />
        </div>

        {/* Section 8: Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
