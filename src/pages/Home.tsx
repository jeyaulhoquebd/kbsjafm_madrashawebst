import { useLanguage } from '../context/LanguageContext';
import { quickServices, galleryImages } from '../data/mockData';
import { useLatestNotices, usePublishedTeachers, usePublishedGallery, useSiteSettings } from '../hooks/useFirestore';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Button from '../components/ui/Button';
import SafeImage from '../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  ClipboardList,
  Award,
  Bell,
  Download,
  CalendarDays,
  MapPin,
  ArrowRight,
  Star,
  User,
  Image as ImageIcon,
  BookOpen,
  Loader2,
} from 'lucide-react';

const serviceIconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  ClipboardList: <ClipboardList className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Bell: <Bell className="w-6 h-6" />,
  Download: <Download className="w-6 h-6" />,
  CalendarDays: <CalendarDays className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
};

export default function Home() {
  const { t } = useLanguage();
  const { notices, loading: noticesLoading } = useLatestNotices(4);
  const { teachers, loading: teachersLoading } = usePublishedTeachers();
  const { images: galleryData, loading: galleryLoading } = usePublishedGallery();
  const { settings, loading: settingsLoading } = useSiteSettings();

  // Use Firestore data or fallback to defaults
  const displayNotices = notices.length > 0 ? notices : [];
  const displayTeachers = teachers.length > 0 ? teachers.slice(0, 4) : [];
  
  // Normalize gallery data to handle both Firestore and mock data formats
  const normalizedGallery = galleryData.length > 0 
    ? galleryData.map(img => ({
        id: img.id,
        src: (img as any).imageUrl || (img as any).src || '',
        alt: (img as any).altText || (img as any).alt || '',
        altEn: (img as any).altTextEn || (img as any).altEn || '',
        category: img.category,
      }))
    : galleryImages;
  
  const displayGallery = normalizedGallery;

  return (
    <>
      {/* SECTION 4: HERO BANNER */}
      <section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SafeImage
            src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165382/bitushbg.jpg"
            alt={t('মাদ্রাসা ভবন', 'Madrasa Building')}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/80 to-primary-800/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-primary-950/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
          <div className="max-w-2xl">
            {/* Bismillah */}
            <p className="text-gold-300 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 font-bengali-serif opacity-90">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Short Educational Message */}
            <p className="text-primary-200 text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 leading-relaxed">
              {t(
                'দ্বীনী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে গড়ে উঠা একটি আদর্শ শিক্ষা প্রতিষ্ঠান',
                'An ideal educational institution combining Islamic knowledge with modern education'
              )}
            </p>

            {/* Full Institution Name */}
            <h1 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight font-bengali mb-3 sm:mb-4">
              {t(
                'খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া',
                'Khagrachhari Baitush Sharaf Jabbaria'
              )}
              <br />
              <span className="text-gold-300 text-lg sm:text-xl lg:text-3xl xl:text-4xl">
                {t('আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা', 'Adarsha Fazil (Degree) Madrasa')}
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-primary-100 text-xs sm:text-sm lg:text-base xl:text-lg mt-3 sm:mt-4 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              {t(
                'এই প্রতিষ্ঠান কুরআন, হাদীস, ফিকহ ও আধুনিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের জ্ঞানার্জন ও চরিত্র গঠনে নিবেদিত।',
                'This institution is dedicated to nurturing students through a combination of Quran, Hadith, Fiqh, and modern education.'
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
              <Link to="/about" className="sm:inline-block">
                <Button variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />} className="w-full sm:w-auto text-sm sm:text-base">
                  {t('আমাদের সম্পর্কে জানুন', 'Learn About Us')}
                </Button>
              </Link>
              <Link to="/admission" className="sm:inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-sm sm:text-base"
                >
                  {t('ভর্তি তথ্য', 'Admission Info')}
                </Button>
              </Link>
              <Link to="/notices" className="sm:inline-block">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-primary-100 hover:text-white hover:bg-white/10 text-sm sm:text-base"
                  icon={<Bell className="w-4 h-4 sm:w-5 sm:h-5" />}
                >
                  {t('সর্বশেষ নোটিশ', 'Latest Notices')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L1440 40L1440 20C1440 20 1200 0 720 0C240 0 0 20 0 20L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* SECTION 5: NOTICE BOARD AND MADRASA INTRODUCTION */}
      <Section background="white">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Notices */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <SectionHeader
                title={t('সর্বশেষ নোটিশ', 'Latest Notices')}
                centered={false}
                className="mb-0"
              />
              <Link
                to="/notices"
                className="text-sm text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1 shrink-0"
              >
                {t('সব দেখুন', 'View All')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {noticesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                </div>
              ) : displayNotices.length > 0 ? (
                displayNotices.map((notice) => (
                  <Link key={notice.id} to={`/notices/${notice.id}`} className="block">
                    <Notice notice={notice} />
                  </Link>
                ))
              ) : (
                <p className="text-center py-8 text-neutral-500">
                  {t('কোনো নোটিশ নেই', 'No notices available')}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Madrasa Introduction */}
          <div className="lg:col-span-2">
            <SectionHeader
              title={t('মাদ্রাসা পরিচিতি', 'About Madrasa')}
              centered={false}
              className="mb-6"
            />

            <Card padding="lg" className="h-full">
              {/* Quran Image */}
              <div className="mb-4 rounded-lg overflow-hidden bg-primary-50 flex items-center justify-center h-40">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-primary-300 mx-auto mb-2" />
                  <p className="text-xs text-neutral-400">
                    {t('[কুরআনের ছবি - সম্পাদনাযোগ্য]', '[Quran Image - Editable]')}
                  </p>
                </div>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                {t(
                  '[মাদ্রাসার সংক্ষিপ্ত পরিচিতি এখানে বসবে। এই প্রতিষ্ঠানটি খাগড়াছড়ি জেলায় অবস্থিত একটি স্বনামধন্য ইসলামী শিক্ষা প্রতিষ্ঠান যা দ্বীনী ও আধুনিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের গড়ে তুলছে।]',
                  '[Brief introduction of the madrasa will be placed here. This institution is a renowned Islamic educational institution in Khagrachhari district, nurturing students with a blend of religious and modern education.]'
                )}
              </p>

              <Link to="/about">
                <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('আরও জানুন', 'Learn More')}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Section>

      {/* SECTION 6: QUICK SERVICES */}
      <Section background="light">
        <SectionHeader
          title={t('দ্রুত সেবাসমূহ', 'Quick Services')}
          subtitle={t(
            'প্রয়োজনীয় সেবা এক ক্লিকেই পান',
            'Access essential services with a single click'
          )}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickServices.map((service, index) => (
            <Link key={index} to={service.href}>
              <Card hover padding="lg" className="text-center h-full group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:bg-primary-200 transition-colors">
                  {serviceIconMap[service.icon] || <Star className="w-6 h-6" />}
                </div>
                <h3 className="text-sm lg:text-base font-semibold text-primary-900 group-hover:text-primary-700 transition-colors font-bengali">
                  {t(service.label, service.labelEn)}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* SECTION 7: PRINCIPAL INTRODUCTION */}
      <Section background="white">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Principal Photo */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-primary-100">
                <SafeImage
                  src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165301/probasak.jpg"
                  alt={t('অধ্যক্ষের ছবি', "Principal's Photo")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fallbackText={t('ছবি', 'Photo')}
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl bg-gold-200/50 -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl bg-primary-200/50 -z-10" />
            </div>
          </div>

          {/* Principal Message */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <p className="text-gold-600 text-sm font-medium uppercase tracking-wider mb-1">
                {t('অধ্যক্ষের বাণী', "Principal's Message")}
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 font-bengali">
                {t('[অধ্যক্ষের নাম - সম্পাদনাযোগ্য]', "[Principal's Name - Editable]")}
              </h2>
              <p className="text-neutral-600 mt-1">
                {t('[পদবি - সম্পাদনাযোগ্য]', '[Designation - Editable]')}
              </p>
            </div>

            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 mb-6">
              <p className="text-neutral-700 leading-relaxed text-sm lg:text-base">
                {t(
                  '[অধ্যক্ষের বাণী এখানে বসবে - সম্পাদনাযোগ্য। শিক্ষা প্রতিষ্ঠানের উদ্দেশ্য, লক্ষ্য এবং শিক্ষার্থীদের প্রতি বার্তা এখানে প্রকাশিত হবে।]',
                  "[Principal's message will be placed here - Editable. The purpose, goals, and message to students of the educational institution will be expressed here.]"
                )}
              </p>
            </div>

            <Link to="/about/principal">
              <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                {t('সম্পূর্ণ বাণী পড়ুন', 'Read Full Message')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* SECTION 8: TEACHERS */}
      <Section background="light">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title={t('আমাদের শিক্ষকবৃন্দ', 'Our Teachers')}
            subtitle={t(
              'অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকমণ্ডলী',
              'Experienced and dedicated teaching faculty'
            )}
            centered={false}
            className="mb-0"
          />
          <Link
            to="/teachers"
            className="hidden sm:flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800 font-medium shrink-0"
          >
            {t('সব দেখুন', 'View All')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {teachersLoading ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
            </div>
          ) : displayTeachers.length > 0 ? (
            displayTeachers.map((teacher) => (
              <Link key={teacher.id} to={`/teachers/${teacher.id}`}>
                <Card hover padding="none" className="overflow-hidden h-full">
                  {/* Teacher Photo */}
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                    {teacher.photoUrl ? (
                      <SafeImage
                        src={teacher.photoUrl}
                        alt={t(teacher.name, teacher.nameEn)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <User className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                        <p className="text-xs text-primary-500 px-2">
                          {t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Teacher Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold text-primary-900 truncate font-bengali">
                      {t(teacher.name, teacher.nameEn)}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 truncate">
                      {t(teacher.designation, teacher.designationEn)}
                    </p>
                    <p className="text-xs text-primary-600 mt-0.5">
                      {t(teacher.department, teacher.departmentEn)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-neutral-500">
              {t('কোনো শিক্ষক তথ্য নেই', 'No teacher information available')}
            </div>
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link to="/teachers">
            <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
              {t('সব শিক্ষক দেখুন', 'View All Teachers')}
            </Button>
          </Link>
        </div>
      </Section>

      {/* SECTION 9: PHOTO GALLERY */}
      <Section background="white">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title={t('ফটো গ্যালারি', 'Photo Gallery')}
            subtitle={t(
              'আমাদের প্রতিষ্ঠানের মুহূর্তগুলো',
              'Moments from our institution'
            )}
            centered={false}
            className="mb-0"
          />
          <Link
            to="/gallery"
            className="hidden sm:flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800 font-medium shrink-0"
          >
            {t('সব ছবি দেখুন', 'View All Photos')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {galleryLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
          </div>
        ) : displayGallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Main large image */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-2 rounded-xl overflow-hidden shadow-md group cursor-pointer">
              <div className="relative h-full min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]">
                <img
                  src={displayGallery[0].src}
                  alt={t(displayGallery[0].alt, displayGallery[0].altEn)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                  <p className="text-white text-xs sm:text-sm font-medium">
                    {t(displayGallery[0].alt, displayGallery[0].altEn)}
                  </p>
                </div>
              </div>
            </div>

            {/* Smaller images */}
            {displayGallery.slice(1, 5).map((image, index) => (
              <div key={image.id || index} className="rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={t(image.alt, image.altEn)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <ImageIcon className="w-8 h-8 text-primary-300 mx-auto mb-1" />
                      <p className="text-xs text-primary-400">
                        {t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium">
                      {t(image.alt, image.altEn)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-500">
            {t('কোনো ছবি নেই', 'No images available')}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link to="/gallery">
            <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
              {t('সব ছবি দেখুন', 'View All Photos')}
            </Button>
          </Link>
        </div>
      </Section>

      {/* Stats Banner */}
      <section className="gradient-emerald py-8 sm:py-10 lg:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-bg" />
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: '[সংখ্যা]', label: t('শিক্ষার্থী', 'Students'), icon: <User className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { value: '[সংখ্যা]', label: t('শিক্ষক', 'Teachers'), icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { value: '৫+', label: t('বিভাগ', 'Departments'), icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { value: '[বছর]', label: t('বছরের সেবা', 'Years of Service'), icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-gold-300 mb-2 sm:mb-3">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-primary-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
