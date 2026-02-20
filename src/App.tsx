import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import OverviewSection from './sections/OverviewSection';
import ProblemSection from './sections/ProblemSection';
import NumbersSection from './sections/NumbersSection';
import SolutionSection from './sections/SolutionSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import ProcessSection from './sections/ProcessSection';
import ImpactSection from './sections/ImpactSection';
import ContactSection from './sections/ContactSection';
import { MapillaryCallback } from './pages/MapillaryCallback';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Mapillary OAuth callback (TrashRoute app redirects here)
  if (typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/mapillary-callback') {
    return <MapillaryCallback />;
  }

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#F4F2EE]">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <OverviewSection className="z-20" />
        <ProblemSection className="z-30" />
        <NumbersSection className="z-40" />
        <SolutionSection className="z-50" />
        <CapabilitiesSection className="z-60" />
        <ProcessSection className="z-70" />
        <ImpactSection className="z-80" />
        <ContactSection className="z-90" />
      </main>
    </div>
  );
}

export default App;
