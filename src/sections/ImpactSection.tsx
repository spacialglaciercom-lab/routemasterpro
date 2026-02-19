import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, DollarSign, Rocket, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImpactSectionProps {
  className?: string;
}

const ImpactSection = ({ className = '' }: ImpactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const limeCardRef = useRef<HTMLDivElement>(null);
  const whiteCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
          statsRef.current?.children || [],
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'none' },
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
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: '72% → 94%',
      label: 'On-Time Arrival',
      desc: 'Dramatic improvement in service reliability',
    },
    {
      icon: Users,
      value: '+47%',
      label: 'Customer Retention',
      desc: 'Higher renewal rates from consistent service',
    },
    {
      icon: DollarSign,
      value: '$380K+',
      label: 'Added Revenue/Truck',
      desc: 'Additional annual profit per vehicle',
    },
    {
      icon: Rocket,
      value: '33%',
      label: 'Faster Expansion',
      desc: 'Grow faster without new vehicles',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="impact"
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Left Tall Image */}
        <div
          ref={leftImgRef}
          className="absolute left-[4vw] top-[10vh] w-[34vw] h-[80vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/impact_truck_road.jpg"
            alt="Waste truck on road"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Top Lime Card */}
        <div
          ref={limeCardRef}
          className="card-lime absolute left-[4vw] lg:left-[40vw] top-[10vh] w-[92vw] lg:w-[56vw] h-auto min-h-[30vh] p-6 lg:p-8"
        >
          <span className="font-mono-label text-xs text-[#111111]/70 mb-4 block">
            Impact
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-[#111111] mb-2">
            Real Results
          </h2>
          <p className="font-display font-semibold text-lg lg:text-xl text-[#111111]/80">
            The business impact
          </p>
        </div>

        {/* Right Bottom White Card */}
        <div
          ref={whiteCardRef}
          className="card-outline absolute left-[4vw] lg:left-[40vw] top-[44vh] w-[92vw] lg:w-[56vw] h-auto min-h-[46vh] p-6 lg:p-8 overflow-auto"
        >
          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F4F2EE] border-2 border-[#111111] rounded-2xl p-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center mb-3">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-xl lg:text-2xl text-[#111111]">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#111111] mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-[#6F6F6F] mt-1">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="bg-[#111111] rounded-2xl p-6">
            <Quote className="w-8 h-8 text-[#B7FF3A] mb-4" />
            <blockquote className="text-white text-base lg:text-lg leading-relaxed mb-4">
              "After implementing route optimization, our average daily mileage
              dropped from 620 to 450 miles per truck—a 28% decrease!"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B7FF3A] flex items-center justify-center">
                <span className="font-display font-bold text-sm text-[#111111]">
                  RF
                </span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Ryan Ferris
                </div>
                <div className="text-[#6F6F6F] text-xs">Acme Waste</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
