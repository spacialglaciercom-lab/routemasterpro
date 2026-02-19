import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OverviewSectionProps {
  className?: string;
}

const OverviewSection = ({ className = '' }: OverviewSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const limeCardRef = useRef<HTMLDivElement>(null);
  const topCenterImgRef = useRef<HTMLDivElement>(null);
  const topRightImgRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomRightImgRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<HTMLDivElement>(null);

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
          limeCardRef.current,
          { y: '-40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          topCenterImgRef.current,
          { y: '-35vh', scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          topRightImgRef.current,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          bottomLeftCardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          bottomRightImgRef.current,
          { y: '70vh', scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          listItemsRef.current?.children || [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.18
        );

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .to(limeCardRef.current, {
          y: '-18vh',
          opacity: 0,
          ease: 'power2.in',
        }, 0.7)
        .to(
          topCenterImgRef.current,
          { y: '-14vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          topRightImgRef.current,
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

  const overviewItems = [
    {
      num: '01',
      title: 'The Challenge',
      desc: 'Understanding the pain points in traditional route planning.',
    },
    {
      num: '02',
      title: 'Meet RouteMaster Pro',
      desc: 'The solution built for waste collection professionals.',
    },
    {
      num: '03',
      title: 'Key Features',
      desc: 'Powerful tools designed for modern operations.',
    },
    {
      num: '04',
      title: 'How It Works',
      desc: 'Simple three-step process to optimized routes.',
    },
    {
      num: '05',
      title: 'Business Impact',
      desc: 'Real results and measurable benefits.',
    },
    {
      num: '06',
      title: 'Get Started',
      desc: 'Join the beta and start optimizing today.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Top Left Lime Card */}
        <div
          ref={limeCardRef}
          className="card-lime absolute left-[4vw] top-[10vh] w-[28vw] h-[26vh] p-6 lg:p-8 flex flex-col justify-center hidden lg:flex"
        >
          <span className="font-mono-label text-xs text-[#111111]/70 mb-2">
            Overview
          </span>
          <h2 className="font-display font-bold text-2xl lg:text-3xl xl:text-4xl text-[#111111]">
            What We'll Cover
          </h2>
        </div>

        {/* Top Center Image */}
        <div
          ref={topCenterImgRef}
          className="absolute left-[4vw] lg:left-[34vw] top-[10vh] w-[42vw] lg:w-[28vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
        >
          <img
            src="/images/overview_truck_city.jpg"
            alt="Waste truck in city"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Image */}
        <div
          ref={topRightImgRef}
          className="absolute right-[4vw] lg:left-[64vw] top-[10vh] w-[42vw] lg:w-[32vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden sm:block"
        >
          <img
            src="/images/overview_worker_closeup.jpg"
            alt="Waste worker portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left Outline Card */}
        <div
          ref={bottomLeftCardRef}
          className="card-outline absolute left-[4vw] top-[40vh] w-[92vw] lg:w-[58vw] h-[50vh] p-6 lg:p-10 overflow-auto"
        >
          <h3 className="font-display font-bold text-xl lg:text-2xl text-[#111111] mb-6 lg:hidden">
            What We'll Cover
          </h3>
          <div
            ref={listItemsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {overviewItems.map((item) => (
              <div key={item.num} className="flex gap-4">
                <span className="font-mono-label text-xs text-[#B7FF3A] bg-[#111111] px-2 py-1 rounded h-fit">
                  {item.num}
                </span>
                <div>
                  <h4 className="font-display font-semibold text-base lg:text-lg text-[#111111]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#6F6F6F] mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Right Image */}
        <div
          ref={bottomRightImgRef}
          className="absolute right-[4vw] top-[40vh] w-[32vw] h-[50vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/overview_bins_alley.jpg"
            alt="Waste bins in alley"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
