import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { navigationItems, quickLinks } from '../data/mockData';
import { institutionIdentity, brandAssets, getContactLinks } from '../data/institution';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-950 text-white border-t-4 border-gold-500">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Institution Info & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={brandAssets.logo}
                alt={institutionIdentity.shortNameBn}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shrink-0"
                loading="lazy"
              />
              <div>
                <h3 className="text-base font-bold text-white font-bengali leading-tight">
                  {institutionIdentity.shortNameBn}
                </h3>
                <p className="text-xs text-gold-300 font-latin mt-0.5">
                  EIIN: {institutionIdentity.eiin} | Estd: {institutionIdentity.establishedYearBn}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-primary-200/90 leading-relaxed font-bengali">
              {t(institutionIdentity.descriptionBn, institutionIdentity.descriptionEn)}
            </p>

            <div className="p-3 bg-primary-900/60 rounded-lg border border-primary-800 text-xs text-gold-300 font-bengali italic">
              "{t(institutionIdentity.mottoBn, institutionIdentity.mottoEn)}"
            </div>
          </div>

          {/* Column 2: Important Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-primary-800">
              {t('প্রয়োজনীয় লিংক', 'Important Links')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('মাদরাসার পরিচিতি ও ইতিহাস', 'About Madrasa & History')}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('একাডেমিক শিক্ষাকার্যক্রম', 'Academic Programs')}
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('শিক্ষক ও কর্মকর্তা পঞ্জিকা', 'Teachers & Staff Directory')}
                </Link>
              </li>
              <li>
                <Link to="/admission" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('ভর্তি তথ্য ও আবেদন ফরম', 'Admission Info & Apply')}
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('সর্বশেষ নোটিশ বোর্ড', 'Notice Board')}
                </Link>
              </li>
              <li>
                <Link to="/orphanage" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('জব্বারিয়া এতিমখানা', 'Jabbaria Orphanage')}
                </Link>
              </li>
              <li>
                <Link to="/hifzkhana" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('জব্বারিয়া হেফজখানা', 'Jabbaria Hifzkhana')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Services & Official Portals */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-primary-800">
              {t('সরকারি ও প্রাতিষ্ঠানিক লিংক', 'Official External Links')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={institutionIdentity.ebmebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-primary-200 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>ই-বোর্ড পোর্টাল (EIIN 131810)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={institutionIdentity.baitushSharafUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-primary-200 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>বায়তুশ শরফ মূল ওয়েবসাইট</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={institutionIdentity.teachersGovUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-primary-200 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>শিক্ষক বাতায়ন প্রোফাইল</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <Link to="/results" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('পরীক্ষার ফলাফল ও গ্রেডশিট', 'Examination Results')}
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-primary-200 hover:text-white transition-colors block py-0.5">
                  → {t('ডাউনলোড ও শিক্ষা সামগ্রী', 'Downloads & Resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-primary-800">
              {t('যোগাযোগ ও ঠিকানা', 'Contact Information')}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-primary-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{t(institutionIdentity.addressBn, institutionIdentity.addressEn)}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={getContactLinks.phone(institutionIdentity.phonePrimary)}
                  className="hover:text-white transition-colors font-latin"
                >
                  {institutionIdentity.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={getContactLinks.email(institutionIdentity.email)}
                  className="hover:text-white transition-colors font-latin"
                >
                  {institutionIdentity.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={getContactLinks.maps()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-900 hover:bg-primary-800 text-gold-300 text-xs transition-colors border border-primary-700"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{t('গুগল ম্যাপে অবস্থান দেখুন', 'View on Google Maps')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Developer Credit */}
      <div className="bg-primary-950/90 border-t border-primary-900 text-xs text-primary-300 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Copyright */}
          <p className="font-bengali">
            © ২০২৬ {institutionIdentity.nameBn}। সর্বস্বত্ব সংরক্ষিত।
          </p>

          {/* Developer Credit */}
          <p className="font-latin text-primary-300">
            Designed &amp; Developed by{' '}
            <a
              href={institutionIdentity.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>{institutionIdentity.developerName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
