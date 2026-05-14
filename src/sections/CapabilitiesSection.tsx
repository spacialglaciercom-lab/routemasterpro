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
  Zap,
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
      icon: Zap,
      title: 'Rust Core Solver',
      desc: 'Blazing-fast CPP and VRP solvers optimized for edge coverage and turn penalties with zero Python overhead.',
      category: 'Performance',
    },
    {
      icon: WifiOff,
      title: 'MCP Server',
      desc: 'Native Model Context Protocol support. Let AI agents (Claude/Cursor) trigger routing workflows programmatically.',
      category: 'Agent-First',
    },
    {
      icon: MapPin,
      title: 'Overture Support',
      desc: 'Extract multi-source data directly from Overture Maps via AWS S3 or OpenStreetMap PBF files.',
      category: 'Data Architecture',
    },
    {
      icon: CheckCircle,
      title: 'Pure Rust ML',
      desc: 'Powered by Candle for AutoML hyperparameter tuning and neural-guided search without heavy dependencies.',
      category: 'Intelligence',
    },
    {
      icon: Plane,
      title: 'Terrain Awareness',
      desc: 'Elevation-aware routing using DEM GeoTIFFs to calculate precise fuel consumption and stats.',
      category: 'Optimization',
    },
    {
      icon: Upload,
      title: 'Optimized .rmp',
      desc: 'A custom binary format providing 90% size reduction vs GeoJSON with CRC32 integrity checking.',
      category: 'Data Storage',
    },
    {
      icon: Eye,
      title: 'TUI & GUI',
      desc: 'Versatile interfaces including a Terminal UI and an egui-based desktop application for all workflows.',
      category: 'Interface',
    },
    {
      icon: Volume2,
      title: 'Headless Server',
      desc: 'Full JSON-RPC support for integration into existing pipelines and enterprise infrastructure.',
      category: 'Connectivity',
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
            Next-generation spatial infrastructure
          </h2>
          <p className="text-lg text-[#6F6F6F]">
            Built from the ground up in Rust for performance, portability, and AI-native automation.
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
