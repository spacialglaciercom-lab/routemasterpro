import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Fuel, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProblemSectionProps {
  className?: string;
}

const ProblemSection = ({ className = '' }: ProblemSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const topCenterCardRef = useRef<HTMLDivElement>(null);
  const topRightImgRef = useRef<HTMLDivElement>(null);
  const bottomStatsCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(
          leftImgRef.current,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          topCenterCardRef.current,
          { y: '-40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          topRightImgRef.current,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          bottomStatsCardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
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
          topCenterCardRef.current,
          { y: '-14vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          topRightImgRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bottomStatsCardRef.current,
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const painPoints = [
    {
      icon: Clock,
      title: 'Time Wasted',
      desc: 'Inefficient routes mean longer days and missed pickups. Manual planning consumes 25+ hours per week across teams.',
    },
    {
      icon: Fuel,
      title: 'Fuel Costs',
      desc: 'Backtracking and wrong turns burn extra fuel. Unoptimized routes average 620 miles per truck daily.',
    },
    {
      icon: AlertTriangle,
      title: 'Driver Confusion',
      desc: 'Unclear directions lead to stress and delays. Drivers struggle with complex routes and missed stops.',
    },
  ];

  const stats = [
    { value: '62%', label: 'less time with optimization' },
    { value: '28%', label: 'reduction in mileage' },
    { value: '72% → 94%', label: 'on-time arrival improvement' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Left Tall Image */}
        <div
          ref={leftImgRef}
          className="absolute left-[4vw] top-[10vh] w-[30vw] h-[80vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/problem_truck_road.jpg"
            alt="Waste truck on road"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Center White Card */}
        <div
          ref={topCenterCardRef}
          className="card-outline absolute left-[4vw] lg:left-[36vw] top-[10vh] w-[92vw] lg:w-[34vw] h-auto min-h-[34vh] p-6 lg:p-8"
        >
          <span className="font-mono-label text-xs text-[#6F6F6F] mb-4 block">
            THE PROBLEM
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-3xl xl:text-4xl text-[#111111] mb-4">
            The Waste Collection Challenge
          </h2>
          <p className="text-sm lg:text-base text-[#6F6F6F]">
            Inefficient routes mean longer days, missed pickups, and burned fuel.
            Manual planning eats hours every week—and still leaves drivers
            guessing.
          </p>
        </div>

        {/* Top Right Image */}
        <div
          ref={topRightImgRef}
          className="absolute right-[4vw] lg:left-[72vw] top-[10vh] w-[40vw] lg:w-[24vw] h-[34vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden sm:block"
        >
          <img
            src="/images/problem_worker_smiling.jpg"
            alt="Waste worker smiling"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Wide Stats Card */}
        <div
          ref={bottomStatsCardRef}
          className="card-outline absolute left-[4vw] lg:left-[36vw] top-[48vh] w-[92vw] lg:w-[60vw] h-auto min-h-[42vh] p-6 lg:p-8"
        >
          {/* Pain Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {painPoints.map((point) => (
              <div key={point.title} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-[#111111]">
                    {point.title}
                  </h4>
                  <p className="text-xs text-[#6F6F6F] mt-1 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-[#111111]/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl lg:text-4xl text-[#111111]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#6F6F6F] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6F6F6F] mt-6 text-center">
            RouteMaster Pro was built to solve these problems with smart
            navigation designed for waste collection professionals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
