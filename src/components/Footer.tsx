import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { institutionInfo, navigationItems, quickLinks } from '../data/mockData';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Institution Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg font-bengali-serif">শ</span>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  {t(institutionInfo.shortName, institutionInfo.shortNameEn)}
                </h3>
              </div>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed mb-4">
              {t(
                'একটি ইসলামী শিক্ষা প্রতিষ্ঠান যা দ্বীনী ও আধুনিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের গড়ে তুলছে।',
                'An Islamic educational institution nurturing students with a blend of religious and modern education.'
              )}
            </p>
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t(institutionInfo.address, institutionInfo.addressEn)}</span>
              </div>
              {institutionInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{institutionInfo.phone}</span>
                </div>
              )}
              {institutionInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{institutionInfo.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-300 mb-4">
              {t('নেভিগেশন', 'Navigation')}
            </h4>
            <ul className="space-y-2">
              {navigationItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {t(item.label, item.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-300 mb-4">
              {t('দ্রুত লিংক', 'Quick Links')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {t(link.label, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-300 mb-4">
              {t('গুরুত্বপূর্ণ', 'Important')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://www.aliaeducationboard.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  {t('আলিয়া মাদ্রাসা শিক্ষা বোর্ড', 'Alia Madrasa Education Board')}
                </a>
              </li>
              <li>
                <a
                  href="http://www.moe.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  {t('শিক্ষা মন্ত্রণালয়', 'Ministry of Education')}
                </a>
              </li>
              <li>
                <a
                  href="http://www.bangladesh.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  {t('বাংলাদেশ জাতীয় তথ্য বাতায়ন', 'Bangladesh National Portal')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-400">
            <p>
              © {currentYear} {t(institutionInfo.shortName, institutionInfo.shortNameEn)}.{' '}
              {t('সর্বস্বত্ব সংরক্ষিত', 'All rights reserved')}.
            </p>
            <p>
              {t('ডিজাইন ও ডেভেলপমেন্ট', 'Design & Development')} © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
