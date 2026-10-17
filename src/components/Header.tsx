import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { navigationItems, institutionInfo } from '../data/mockData';
import { institutionIdentity, brandAssets, getContactLinks } from '../data/institution';
import { Menu, X, Globe, Search, Phone, Mail, ChevronDown, GraduationCap } from 'lucide-react';
import SearchModal from './SearchModal';
import SafeImage from './ui/SafeImage';

interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  children?: NavItem[];
}

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobileDropdown(null);
  }, [location.pathname]);

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
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileDropdown(prev => prev === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-200">
      {/* Top Information Bar */}
      <div className="bg-primary-900 text-white text-xs border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 sm:h-10">
            {/* Left side: EIIN & Motto */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <span className="font-medium text-gold-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                EIIN: {institutionIdentity.eiin}
              </span>
              <span className="hidden md:inline text-white/90 truncate border-l border-white/20 pl-3">
                {t(institutionIdentity.mottoBn, institutionIdentity.mottoEn)}
              </span>
            </div>

            {/* Right side: Verified phone, email, search & language */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <a
                href={getContactLinks.phone(institutionIdentity.phonePrimary)}
                className="hidden sm:flex items-center gap-1.5 text-primary-100 hover:text-white transition-colors"
                title={t('ফোন করুন', 'Call us')}
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{institutionIdentity.phonePrimary}</span>
              </a>

              <a
                href={getContactLinks.email(institutionIdentity.email)}
                className="hidden lg:flex items-center gap-1.5 text-primary-100 hover:text-white transition-colors"
                title={t('ইমেইল পাঠান', 'Send email')}
              >
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>{institutionIdentity.email}</span>
              </a>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded hover:bg-white/10 text-primary-100 hover:text-white transition-colors flex items-center gap-1"
                aria-label={t('অনুসন্ধান', 'Search')}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">{t('অনুসন্ধান', 'Search')}</span>
              </button>

              <button
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Globe className="w-3.5 h-3.5 text-gold-300" />
                <span className="text-xs font-semibold">{language === 'bn' ? 'EN' : 'বাং'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Section - Logo, Title & Admission CTA */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo & Names */}
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group min-w-0">
              <div className="relative shrink-0">
                <SafeImage
                  src={brandAssets.logo}
                  alt={institutionInfo.shortName}
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gold-400/80 shadow-md group-hover:scale-105 transition-transform duration-200"
                  loading="eager"
                  fallbackText="মাদরাসা"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-bengali text-white leading-tight group-hover:text-gold-200 transition-colors">
                  {t(institutionIdentity.nameBn, institutionIdentity.nameEn)}
                </h1>
                <p className="text-[11px] sm:text-xs md:text-sm text-gold-300/90 font-latin truncate mt-0.5 sm:mt-1">
                  {institutionIdentity.nameEn}
                </p>
                <p className="text-[10px] sm:text-xs text-primary-200 hidden md:block mt-0.5">
                  {t(institutionIdentity.addressBn, institutionIdentity.addressEn)}
                </p>
              </div>
            </Link>

            {/* Admission CTA Button (Always visible on desktop) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                to="/admission"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-primary-950 font-semibold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-primary-950" />
                <span>{t('ভর্তি তথ্য ও আবেদন', 'Admission & Apply')}</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isMobileMenuOpen ? t('মেনু বন্ধ করুন', 'Close menu') : t('মেনু খুলুন', 'Open menu')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Navigation Bar */}
      <nav className="hidden lg:block bg-white border-b border-neutral-200 shadow-sm" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ul className="flex items-center flex-wrap gap-x-1 gap-y-0.5 py-1">
              {navigationItems.map((item: NavItem, idx: number) => {
                const hasChildren = item.children && item.children.length > 0;
                const active = isActive(item.href);

                return (
                  <li
                    key={`nav-desktop-${idx}-${item.href}`}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.labelEn)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className={`
                        inline-flex items-center gap-1 px-3 py-2.5 text-sm font-medium rounded-md
                        transition-all duration-150
                        ${active
                          ? 'text-primary-800 bg-primary-50 font-semibold'
                          : 'text-neutral-800 hover:text-primary-700 hover:bg-neutral-100'
                        }
                      `}
                      aria-haspopup={hasChildren ? 'true' : undefined}
                      aria-expanded={hasChildren && activeDropdown === item.labelEn ? 'true' : undefined}
                    >
                      <span>{t(item.label, item.labelEn)}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </Link>

                    {/* Desktop Dropdown Menu */}
                    {hasChildren && activeDropdown === item.labelEn && (
                      <div className="absolute top-full left-0 w-60 bg-white rounded-lg shadow-xl border border-neutral-200 py-1.5 animate-fade-in z-50">
                        {item.children!.map((child: NavItem, childIdx: number) => (
                          <Link
                            key={`desktop-sub-${idx}-${childIdx}-${child.href}`}
                            to={child.href}
                            className={`
                              block px-4 py-2.5 text-sm transition-colors
                              ${location.pathname === child.href
                                ? 'bg-primary-50 text-primary-800 font-semibold'
                                : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                              }
                            `}
                          >
                            {t(child.label, child.labelEn)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-b border-neutral-300 shadow-xl max-h-[80vh] overflow-y-auto animate-fade-in"
          role="menu"
        >
          {/* Quick admission button on mobile drawer */}
          <div className="p-3 bg-primary-50 border-b border-primary-100">
            <Link
              to="/admission"
              onClick={handleMobileNavClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gold-500 hover:bg-gold-600 text-primary-950 font-bold text-sm shadow-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('ভর্তি সংক্রান্ত তথ্য ও আবেদন', 'Admission & Apply')}</span>
            </Link>
          </div>

          <div className="p-3 space-y-1">
            {navigationItems.map((item: NavItem, idx: number) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedMobileDropdown === item.labelEn;
              const active = isActive(item.href);

              return (
                <div key={`mobile-nav-${idx}-${item.href}`} className="border-b border-neutral-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      onClick={handleMobileNavClick}
                      className={`
                        flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-colors
                        ${active
                          ? 'text-primary-800 bg-primary-50 font-bold'
                          : 'text-neutral-800 hover:text-primary-700'
                        }
                      `}
                    >
                      {t(item.label, item.labelEn)}
                    </Link>

                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileDropdown(item.labelEn)}
                        className="p-3 text-neutral-500 hover:text-primary-700 transition-colors"
                        aria-label={t('সাব-মেনু খুলুন', 'Toggle Submenu')}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-primary-700' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Submenu for Mobile */}
                  {hasChildren && isExpanded && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 bg-neutral-50 rounded-lg mb-1">
                      {item.children!.map((child: NavItem, childIdx: number) => (
                        <Link
                          key={`mobile-sub-${idx}-${childIdx}-${child.href}`}
                          to={child.href}
                          onClick={handleMobileNavClick}
                          className={`
                            block py-2 px-3 rounded-md text-xs sm:text-sm transition-colors
                            ${location.pathname === child.href
                              ? 'text-primary-800 font-semibold bg-primary-100/60'
                              : 'text-neutral-600 hover:text-primary-700'
                            }
                          `}
                        >
                          {t(child.label, child.labelEn)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Footer Info */}
          <div className="p-4 bg-neutral-100 text-xs text-neutral-600 border-t border-neutral-200 space-y-1.5">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-primary-700" />
              <span>{institutionIdentity.phonePrimary}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary-700" />
              <span>{institutionIdentity.email}</span>
            </p>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
