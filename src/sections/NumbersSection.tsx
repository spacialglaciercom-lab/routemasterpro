import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, DollarSign, Fuel, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NumbersSectionProps {
  className?: string;
}

const NumbersSection = ({ className = '' }: NumbersSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const limeCardRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomRightImgRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);

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
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          limeCardRef.current,
          { y: '-40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          rightImgRef.current,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          bottomLeftCardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          bottomRightImgRef.current,
          { y: '70vh', scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.14
        )
        .fromTo(
          savingsRef.current?.children || [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
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
          { y: '-14vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          rightImgRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bottomLeftCardRef.current,
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bottomRightImgRef.current,
          { y: '22vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const savings = [
    {
      icon: DollarSign,
      value: '$18,250+',
      label: 'Annual savings per truck',
    },
    {
      icon: TrendingUp,
      value: '20%',
      label: 'More stops daily',
    },
    {
      icon: Fuel,
      value: '$14,500+',
      label: 'Annual fuel savings',
    },
    {
      icon: Clock,
      value: '$380K+',
      label: 'Added revenue per truck',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Left Top Image */}
        <div
          ref={leftImgRef}
          className="absolute left-[4vw] top-[10vh] w-[28vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/numbers_truck_motion.jpg"
            alt="Waste truck in motion"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Top Lime Title Card */}
        <div
          ref={limeCardRef}
          className="card-lime absolute left-[4vw] lg:left-[34vw] top-[10vh] w-[92vw] lg:w-[34vw] h-auto min-h-[26vh] p-6 lg:p-8 flex flex-col justify-center"
        >
          <span className="font-mono-label text-xs text-[#111111]/70 mb-2">
            The Numbers
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-[#111111]">
            The Cost of Inefficiency
          </h2>
        </div>

        {/* Right Top Image */}
        <div
          ref={rightImgRef}
          className="absolute right-[4vw] lg:left-[70vw] top-[10vh] w-[40vw] lg:w-[26vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden sm:block"
        >
          <img
            src="/images/numbers_aerial_road.jpg"
            alt="Aerial view of road"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left Wide Savings Card */}
        <div
          ref={bottomLeftCardRef}
          className="card-outline absolute left-[4vw] top-[40vh] w-[92vw] lg:w-[62vw] h-auto min-h-[50vh] p-6 lg:p-10"
        >
          <h3 className="font-display font-bold text-xl lg:text-2xl text-[#111111] mb-2">
            Annual Savings Per Truck
          </h3>
          <p className="text-sm text-[#6F6F6F] mb-8">
            Real numbers from optimized routing
          </p>

          <div
            ref={savingsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {savings.map((item) => (
              <div
                key={item.label}
                className="bg-[#F4F2EE] border-2 border-[#111111] rounded-2xl p-4 lg:p-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-2xl lg:text-3xl text-[#111111]">
                  {item.value}
                </div>
                <div className="text-xs text-[#6F6F6F] mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#B7FF3A]/20 border-2 border-[#111111] rounded-2xl">
            <p className="text-sm text-[#111111]">
              <strong>ROI Calculator Example:</strong> 25 trucks × 6 days/week ×
              52 weeks × 5 min saved ={' '}
              <span className="font-display font-bold">$65,000/year</span>
            </p>
          </div>
        </div>

        {/* Bottom Right Tall Image */}
        <div
          ref={bottomRightImgRef}
          className="absolute right-[4vw] top-[40vh] w-[28vw] h-[50vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/numbers_worker_bins.jpg"
            alt="Worker handling bins"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
