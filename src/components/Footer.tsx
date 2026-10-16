import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { institutionInfo, navigationItems, quickLinks } from '../data/mockData';
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Institution Info with Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165465/madrashalogo.jpg"
                alt={t(institutionInfo.shortName, institutionInfo.shortNameEn)}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-700"
                loading="lazy"
              />
              <div>
                <h3 className="text-sm font-bold leading-tight font-bengali">
                  {t(institutionInfo.shortName, institutionInfo.shortNameEn)}
                </h3>
                <p className="text-xs text-primary-300 font-latin">
                  {t(institutionInfo.shortNameEn, institutionInfo.shortNameEn)}
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed mb-4">
              {t(
                'একটি ইসলামী শিক্ষা প্রতিষ্ঠান যা দ্বীনী ও আধুনিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের গড়ে তুলছে।',
                'An Islamic educational institution nurturing students with a blend of religious and modern education.'
              )}
            </p>
            {/* Contact Info */}
            <div className="space-y-2.5 text-sm text-primary-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                <span>{t(institutionInfo.address, institutionInfo.addressEn)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary-400" />
                <span>{institutionInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary-400" />
                <span>{institutionInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {t('নেভিগেশন', 'Navigation')}
            </h4>
            <ul className="space-y-2">
              {navigationItems.slice(0, 7).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-200 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {t(item.label, item.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {t('দ্রুত লিংক', 'Quick Links')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-200 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {t(link.label, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links & Location */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {t('গুরুত্বপূর্ণ লিংক', 'Important Links')}
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <a
                  href="http://www.aliaeducationboard.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('আলিয়া মাদ্রাসা শিক্ষা বোর্ড', 'Alia Madrasa Board')}
                </a>
              </li>
              <li>
                <a
                  href="http://www.moe.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('শিক্ষা মন্ত্রণালয়', 'Ministry of Education')}
                </a>
              </li>
              <li>
                <a
                  href="http://www.bangladesh.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-200 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('জাতীয় তথ্য বাতায়ন', 'National Portal')}
                </a>
              </li>
            </ul>

            {/* Map Placeholder */}
            <div className="rounded-lg overflow-hidden border border-primary-800 bg-primary-900 h-28 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-6 h-6 text-primary-500 mx-auto mb-1" />
                <p className="text-xs text-primary-400">
                  {t('[মানচিত্র - সম্পাদনাযোগ্য]', '[Map - Editable]')}
                </p>
              </div>
            </div>
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
