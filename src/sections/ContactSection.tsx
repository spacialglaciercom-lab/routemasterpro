import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Globe, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-[#111111] py-20 lg:py-32 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Text Content */}
          <div ref={textRef} className="lg:w-[42vw] flex flex-col justify-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Ready to optimize your routes?
            </h2>
            <p className="text-lg text-[#6F6F6F] mb-8">
              Join our beta and start navigating smarter today. Free during
              beta—no commitment required.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B7FF3A] border-2 border-white flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <div className="text-[#6F6F6F] text-sm">Email</div>
                  <a
                    href="mailto:droneservicesqc@proton.me"
                    className="text-white font-semibold hover:text-[#B7FF3A] transition-colors"
                  >
                    droneservicesqc@proton.me
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B7FF3A] border-2 border-white flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <div className="text-[#6F6F6F] text-sm">Website</div>
                  <a
                    href="https://routemasterpro.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:text-[#B7FF3A] transition-colors"
                  >
                    routemasterpro.ca
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[#6F6F6F] text-sm">
                <Check className="w-4 h-4 text-[#B7FF3A]" />
                Free During Beta
              </div>
              <div className="flex items-center gap-2 text-[#6F6F6F] text-sm">
                <Check className="w-4 h-4 text-[#B7FF3A]" />
                No Credit Card
              </div>
              <div className="flex items-center gap-2 text-[#6F6F6F] text-sm">
                <Check className="w-4 h-4 text-[#B7FF3A]" />
                Full Features
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div ref={formRef} className="lg:w-[46vw]">
            <div className="card-outline p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#B7FF3A] border-2 border-[#111111] flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#111111] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#6F6F6F]">
                    We've received your request and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-[#111111] mb-6">
                    Request Beta Access
                  </h3>
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F4F2EE] border-2 border-[#111111] rounded-xl text-[#111111] placeholder-[#6F6F6F] focus:outline-none focus:ring-2 focus:ring-[#B7FF3A]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F4F2EE] border-2 border-[#111111] rounded-xl text-[#111111] placeholder-[#6F6F6F] focus:outline-none focus:ring-2 focus:ring-[#B7FF3A]"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F4F2EE] border-2 border-[#111111] rounded-xl text-[#111111] placeholder-[#6F6F6F] focus:outline-none focus:ring-2 focus:ring-[#B7FF3A]"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-[#F4F2EE] border-2 border-[#111111] rounded-xl text-[#111111] placeholder-[#6F6F6F] focus:outline-none focus:ring-2 focus:ring-[#B7FF3A] resize-none"
                      placeholder="Tell us about your operation..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full disabled:opacity-60 disabled:pointer-events-none"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending…' : 'Request Access'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display font-bold text-white">
            RouteMaster Pro
          </div>
          <div className="text-[#6F6F6F] text-sm">
            © 2026 RouteMaster Pro. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-[#6F6F6F] text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#contact"
              className="text-[#6F6F6F] text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
