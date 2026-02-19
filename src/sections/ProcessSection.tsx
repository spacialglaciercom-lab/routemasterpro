import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Navigation, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const limeCardRef = useRef<HTMLDivElement>(null);
  const topCenterImgRef = useRef<HTMLDivElement>(null);
  const topRightImgRef = useRef<HTMLDivElement>(null);
  const bottomStepsCardRef = useRef<HTMLDivElement>(null);
  const bottomRightImgRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
          limeCardRef.current,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          topCenterImgRef.current,
          { y: '-35vh', opacity: 0 },
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
          bottomStepsCardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          bottomRightImgRef.current,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        )
        .fromTo(
          stepsRef.current?.children || [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.18
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .to(limeCardRef.current, {
          x: '-18vw',
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
          bottomStepsCardRef.current,
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

  const steps = [
    {
      num: '01',
      icon: Upload,
      title: 'Plan Your Route',
      desc: 'Import GPX files or create routes directly in the app. Add stops, set priorities, and optimize your path.',
      badges: ['GPX Import', 'Custom Routes', 'Priority Stops'],
    },
    {
      num: '02',
      icon: Navigation,
      title: 'Navigate with Confidence',
      desc: 'Follow turn-by-turn directions with voice guidance. Preview stops with street-level imagery.',
      badges: ['Voice Guidance', 'Street View', 'Real-time'],
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Track Completion',
      desc: 'Mark stops as completed, add notes, and keep your route organized from start to finish.',
      badges: ['Mark Complete', 'Add Notes', 'Stay Organized'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`section-pinned bg-[#F4F2EE] ${className}`}
    >
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
        {/* Top Left Lime Title Card */}
        <div
          ref={limeCardRef}
          className="card-lime absolute left-[4vw] top-[10vh] w-[92vw] lg:w-[34vw] h-auto min-h-[26vh] p-6 lg:p-8 flex flex-col justify-center"
        >
          <span className="font-mono-label text-xs text-[#111111]/70 mb-2">
            Process
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-[#111111] mb-2">
            How It Works
          </h2>
          <p className="font-display font-semibold text-lg text-[#111111]/80">
            Simple as 1-2-3
          </p>
        </div>

        {/* Top Center Image */}
        <div
          ref={topCenterImgRef}
          className="absolute left-[4vw] lg:left-[40vw] top-[10vh] w-[42vw] lg:w-[30vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden sm:block"
        >
          <img
            src="/images/process_truck_alley.jpg"
            alt="Waste truck in alley"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Image */}
        <div
          ref={topRightImgRef}
          className="absolute right-[4vw] lg:left-[72vw] top-[10vh] w-[40vw] lg:w-[24vw] h-[26vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden sm:block"
        >
          <img
            src="/images/process_worker_portrait.jpg"
            alt="Waste worker portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left Wide Steps Card */}
        <div
          ref={bottomStepsCardRef}
          className="card-outline absolute left-[4vw] top-[40vh] w-[92vw] lg:w-[62vw] h-auto min-h-[50vh] p-6 lg:p-8 overflow-auto"
        >
          <div ref={stepsRef} className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className={`flex gap-4 pb-6 ${
                  index < steps.length - 1
                    ? 'border-b-2 border-[#111111]/10'
                    : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-label text-xs text-[#B7FF3A] bg-[#111111] px-2 py-1 rounded">
                      {step.num}
                    </span>
                    <h3 className="font-display font-semibold text-lg lg:text-xl text-[#111111]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#6F6F6F] mb-3">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1 bg-[#F4F2EE] border border-[#111111]/20 rounded-full text-xs text-[#6F6F6F]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Right Tall Image */}
        <div
          ref={bottomRightImgRef}
          className="absolute right-[4vw] top-[40vh] w-[28vw] h-[50vh] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.10)] hidden lg:block"
        >
          <img
            src="/images/process_bins_line.jpg"
            alt="Waste bins line"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
