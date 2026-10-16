import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { navigationItems, institutionInfo } from '../data/mockData';
import { Menu, X, Globe, Search, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Information Bar */}
      <div className="bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-8 sm:h-9 text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <span className="hidden md:inline text-primary-200 truncate">
                {t('জ্ঞান, বিশ্বাস ও সেবা', 'Knowledge, Faith & Service')}
              </span>
              <span className="hidden lg:inline text-primary-300 border-l border-primary-700 pl-4">
                EIIN: {institutionInfo.eiin}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2 rounded hover:bg-primary-800 transition-colors"
                aria-label={t('অনুসন্ধান', 'Search')}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 rounded hover:bg-primary-800 transition-colors"
                aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{language === 'bn' ? 'EN' : 'বাংলা'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Logo & Info */}
      <div className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165465/madrashalogo.jpg"
                alt={t(institutionInfo.shortName, institutionInfo.shortNameEn)}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-primary-200 shadow-sm"
                loading="eager"
              />
            </Link>

            {/* Institution Name */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xs sm:text-sm lg:text-lg xl:text-xl font-bold text-primary-900 leading-tight font-bengali line-clamp-2">
                {t(institutionInfo.name, institutionInfo.nameEn)}
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500 font-latin mt-0.5 truncate">
                {t(institutionInfo.nameEn, institutionInfo.nameEn)}
              </p>
            </div>

            {/* Contact Info - Desktop Only */}
            <div className="hidden xl:flex items-center gap-5 shrink-0">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-primary-700 shrink-0" />
                <span className="max-w-[180px] truncate">{t(institutionInfo.address, institutionInfo.addressEn)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="w-4 h-4 text-primary-700 shrink-0" />
                <span>{institutionInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Mail className="w-4 h-4 text-primary-700 shrink-0" />
                <span>{institutionInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-primary-800 shadow-md" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center w-full">
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
                      flex items-center gap-1 px-2 xl:px-3 py-3 text-xs xl:text-sm font-medium
                      transition-colors duration-200 border-b-2
                      focus-visible:outline-none focus-visible:bg-primary-700 focus-visible:text-white
                      ${isActive(item.href)
                        ? 'text-white bg-primary-700 border-gold-400'
                        : 'text-primary-100 hover:text-white hover:bg-primary-700 border-transparent'
                      }
                    `}
                    aria-haspopup={item.children ? 'true' : undefined}
                    aria-expanded={item.children && activeDropdown === item.href ? 'true' : undefined}
                  >
                    {t(item.label, item.labelEn)}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.href && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-b-lg shadow-xl border border-neutral-200 py-2 animate-fade-in z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-700"
                        >
                          {t(child.label, child.labelEn)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2.5 text-primary-100 hover:text-white w-full justify-between"
              aria-label={isMobileMenuOpen ? t('মেনু বন্ধ', 'Close menu') : t('মেনু খুলুন', 'Open menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="text-sm font-medium">{t('মেনু', 'Menu')}</span>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden bg-primary-900 border-t border-primary-700 animate-fade-in"
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {navigationItems.map((item) => (
                <div key={item.href} role="none">
                  <Link
                    to={item.href}
                    onClick={handleMobileNavClick}
                    className={`
                      block px-4 py-2.5 rounded-lg text-sm font-medium
                      transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400
                      ${isActive(item.href)
                        ? 'text-white bg-primary-700'
                        : 'text-primary-100 hover:text-white hover:bg-primary-700'
                      }
                    `}
                    role="menuitem"
                  >
                    {t(item.label, item.labelEn)}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1" role="group">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={handleMobileNavClick}
                          className="block px-4 py-2 text-sm text-primary-200 hover:text-white hover:bg-primary-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                          role="menuitem"
                        >
                          {t(child.label, child.labelEn)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
