import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Download, Globe, Smartphone, Wifi, Zap, Box, Brain } from 'lucide-react';
import { GITHUB_URL, CRATES_IO_URL, HUGGING_FACE_URL } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

interface SolutionSectionProps {
  className?: string;
}

const SolutionSection = ({ className = '' }: SolutionSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const limeCardRef = useRef<HTMLDivElement>(null);
  const whiteCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(
          leftImgRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          limeCardRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          whiteCardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          ctaRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.18
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .to(leftImgRef.current, {
          x: '-18vw',
          opacity: 0,
          ease: 'power2.in',
        }, 0.7)
        .to(
          limeCardRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          whiteCardRef.current,
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          ctaRef.current,
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Rust Powered',
      desc: 'Engineered for speed and safety. Zero garbage collection and ultra-low memory footprint.',
    },
    {
      icon: Globe,
      title: 'Agent-First',
      desc: 'Native MCP server allows AI agents to optimize and control routing pipelines autonomously.',
    },
    {
      icon: Smartphone,
      title: 'Data Sovereign',
      desc: 'Full offline support and .rmp binary format ensure your spatial data stays under your control.',
    },
    {
      icon: Wifi,
      title: 'Overture Native',
      desc: 'Built for the next generation of spatial data, with native support for the Overture Maps schema.',
    },
  ];

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
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Left Tall Image */}
        <div
          ref={leftImgRef}
          className="absolute left-[4vw] top-[10vh] w-[34vw] h-[80vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/solution_truck_city.jpg"
            alt="Technical data visualization"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Top Lime Card */}
        <div
          ref={limeCardRef}
          className="card-lime absolute left-[4vw] lg:left-[40vw] top-[10vh] w-[92vw] lg:w-[56vw] h-auto min-h-[30vh] p-6 lg:p-8"
        >
          <span className="font-mono-label text-xs text-[#111111]/70 mb-4 block">
            THE SOLUTION
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-[#111111] mb-2">
            RouteMaster Pro v2
          </h2>
          <p className="font-display font-semibold text-lg lg:text-xl text-[#111111]/80">
            High-performance intelligence for the modern spatial web.
          </p>
        </div>

        {/* Right Bottom White Card */}
        <div
          ref={whiteCardRef}
          className="card-outline absolute left-[4vw] lg:left-[40vw] top-[44vh] w-[92vw] lg:w-[56vw] h-auto min-h-[46vh] p-6 lg:p-8"
        >
          <p className="text-base lg:text-lg text-[#6F6F6F] mb-8">
            v2rmp is a complete rewrite of the RouteMasterPro engine in pure Rust. 
            It brings unprecedented performance, agentic automation, and terrain-aware 
            optimization to complex routing problems like CPP and VRP.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-[#111111]">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#6F6F6F] mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore on GitHub
              </a>
              <span className="text-sm text-[#6F6F6F]">Pure Rust • Open Core</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={CRATES_IO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-[#111111] hover:text-[#6F6F6F] transition-colors bg-white border-2 border-[#111111] px-4 py-2 rounded-xl shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <Box className="w-4 h-4 mr-2" />
                Cargo Package
              </a>
              <a
                href={HUGGING_FACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-[#111111] hover:text-[#6F6F6F] transition-colors bg-white border-2 border-[#111111] px-4 py-2 rounded-xl shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <Brain className="w-4 h-4 mr-2" />
                ML Models
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
