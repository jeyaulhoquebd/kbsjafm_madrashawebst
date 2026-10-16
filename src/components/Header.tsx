import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { navigationItems, institutionInfo } from '../data/mockData';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Button from './ui/Button';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}
      `}
    >
      {/* Top Bar */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline opacity-80">
                {t(institutionInfo.address, institutionInfo.addressEn)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-primary-800 transition-colors"
                aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / Institution Name */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary-800 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg lg:text-xl font-bengali-serif">শ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm lg:text-base font-bold text-primary-900 leading-tight font-bengali">
                {t(institutionInfo.shortName, institutionInfo.shortNameEn)}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('খাগড়াছড়ি, বাংলাদেশ', 'Khagrachhari, Bangladesh')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`
                    flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
                    }
                  `}
                >
                  {t(item.label, item.labelEn)}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                      >
                        {t(child.label, child.labelEn)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-primary-50 transition-colors"
            aria-label={isMobileMenuOpen ? t('মেনু বন্ধ', 'Close menu') : t('মেনু খুলুন', 'Open menu')}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <div key={item.href}>
                <Link
                  to={item.href}
                  className={`
                    block px-4 py-3 rounded-lg text-base font-medium
                    transition-colors
                    ${isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
                    }
                  `}
                >
                  {t(item.label, item.labelEn)}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        {t(child.label, child.labelEn)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Language Switch */}
            <div className="pt-4 mt-4 border-t border-neutral-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="w-full"
                icon={<Globe className="w-4 h-4" />}
              >
                {language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
