import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Zap } from 'lucide-react';
import { TESTFLIGHT_INVITE_URL } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        leftCardRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
        .fromTo(
          rightCardRef.current,
          { x: '12vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9 },
          0.08
        )
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.22
        )
        .fromTo(
          subheadlineRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.32
        )
        .fromTo(
          chipsRef.current?.children || [],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          0.38
        )
        .fromTo(
          ctaRef.current,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45 },
          0.45
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([leftCardRef.current, rightCardRef.current], {
              opacity: 1,
              x: 0,
            });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - already visible from load animation
      // SETTLE (30%-70%): Static
      // EXIT (70%-100%): Elements exit
      scrollTl
        .fromTo(
          leftCardRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightCardRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ctaRef.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Left Photo Card */}
        <div
          ref={leftCardRef}
          className="absolute left-[4vw] top-[10vh] w-[44vw] h-[80vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/hero_truck_driver.jpg"
            alt="Waste collection worker"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content Card */}
        <div
          ref={rightCardRef}
          className="card-outline absolute lg:left-[52vw] lg:top-[10vh] lg:w-[44vw] lg:h-[80vh] left-4 right-4 top-[12vh] h-auto min-h-[70vh] p-6 sm:p-8 lg:p-12 flex flex-col justify-center"
        >
          {/* Beta Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-[#B7FF3A] border-2 border-[#111111] rounded-full font-mono-label text-xs">
              Beta Now Open
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#111111] mb-4"
          >
            RouteMaster Pro
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl text-[#111111] mb-6"
          >
            Smart navigation for smarter routes.
          </p>

          {/* Body */}
          <p className="text-base sm:text-lg text-[#6F6F6F] mb-8 max-w-md">
            Plan optimized collection routes and guide drivers with turn-by-turn
            directions—built for waste management teams.
          </p>

          {/* Feature Chips */}
          <div ref={chipsRef} className="flex flex-wrap gap-3 mb-8">
            <span className="chip">
              <MapPin className="w-4 h-4 mr-2" />
              Route Planning
            </span>
            <span className="chip">
              <Navigation className="w-4 h-4 mr-2" />
              Navigation
            </span>
            <span className="chip">
              <Zap className="w-4 h-4 mr-2" />
              Efficiency
            </span>
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <a href={TESTFLIGHT_INVITE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mb-4 inline-block">
              Join the beta
            </a>
            <p className="text-sm text-[#6F6F6F]">
              Available on TestFlight • iOS 15+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
