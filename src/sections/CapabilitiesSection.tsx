import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Upload,
  Volume2,
  Eye,
  Plane,
  MapPin,
  WifiOff,
  Moon,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  className?: string;
}

const CapabilitiesSection = ({ className = '' }: CapabilitiesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 32, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      icon: Upload,
      title: 'GPX Import/Export',
      desc: 'Import and export GPX files seamlessly. Plan and optimize collection routes with intuitive tools.',
      category: 'Route Planning',
    },
    {
      icon: Volume2,
      title: 'Voice Guidance',
      desc: 'Turn-by-turn navigation with real-time voice guidance keeps drivers on track.',
      category: 'Navigation',
    },
    {
      icon: Eye,
      title: 'Street-Level Imagery',
      desc: 'Preview destinations with Mapillary integration. Know exactly where to stop.',
      category: 'Mapillary Powered',
    },
    {
      icon: Plane,
      title: 'Aerial Imagery',
      desc: 'Quebec government orthophoto layer provides detailed aerial views.',
      category: 'Quebec Optimized',
    },
    {
      icon: MapPin,
      title: 'Smart Markers',
      desc: 'Save favorites, create custom markers, and search addresses efficiently.',
      category: 'Organization',
    },
    {
      icon: WifiOff,
      title: 'Offline Support',
      desc: 'Download maps for offline use. Navigate without cellular connectivity.',
      category: 'Anywhere Access',
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      desc: 'Switch between standard and dark map styles. Easy on the eyes.',
      category: 'Driver Comfort',
    },
    {
      icon: CheckCircle,
      title: 'Track Completion',
      desc: 'Mark stops as completed, add notes, and keep routes organized.',
      category: 'Progress Tracking',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className={`relative bg-[#F4F2EE] py-20 lg:py-32 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Heading */}
        <div ref={headingRef} className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111111] mb-4">
            Powerful features for modern waste management
          </h2>
          <p className="text-lg text-[#6F6F6F]">
            Everything you need to plan, navigate, and finish routes—without the
            backtracking.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="card-outline p-6 hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center mb-4">
                <cap.icon className="w-6 h-6" />
              </div>
              <span className="font-mono-label text-[10px] text-[#6F6F6F] mb-2 block">
                {cap.category}
              </span>
              <h3 className="font-display font-semibold text-lg text-[#111111] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
