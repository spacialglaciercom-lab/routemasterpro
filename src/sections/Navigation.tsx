import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TESTFLIGHT_INVITE_URL } from '@/constants';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#capabilities' },
    { label: 'How it works', href: '#process' },
    { label: 'Impact', href: '#impact' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F2EE]/90 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-lg sm:text-xl text-[#111111] tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            RouteMaster Pro
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-[#111111] hover:text-[#6F6F6F] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={TESTFLIGHT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Join the beta
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#F4F2EE] pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-2xl font-display font-semibold text-left"
              >
                {item.label}
              </button>
            ))}
            <a
              href={TESTFLIGHT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg mt-4 w-full block text-center"
            >
              Join the beta
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
