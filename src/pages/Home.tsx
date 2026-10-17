import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { quickServices, galleryImages, sampleNotices, demoTeachers, academicPrograms } from '../data/mockData';
import { institutionIdentity, brandAssets, principalInfo, orphanageData, hifzkhanaData, getContactLinks } from '../data/institution';
import { useLatestNotices, usePublishedTeachers, usePublishedGallery } from '../hooks/useFirestore';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Button from '../components/ui/Button';
import SafeImage from '../components/ui/SafeImage';
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
  Users,
  GraduationCap,
  Phone,
  Mail,
  Heart,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const serviceIconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
  Calendar: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
  ClipboardList: <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />,
  Award: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
  Bell: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
  Download: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
  CalendarDays: <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />,
  MapPin: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
  BookOpen: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
  Users: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
  Image: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
};

export default function Home() {
  const { t } = useLanguage();
  const { notices, loading: noticesLoading } = useLatestNotices(4);
  const { teachers, loading: teachersLoading } = usePublishedTeachers();
  const { images: galleryData, loading: galleryLoading } = usePublishedGallery();

  // Use Firestore data or fallback to clean verified defaults
  const displayNotices = notices.length > 0 ? notices : sampleNotices.slice(0, 4);
  const displayTeachers = teachers.length > 0
    ? teachers.slice(0, 4)
    : demoTeachers.slice(0, 4).map(t => ({
        id: t.id,
        name: t.name,
        nameEn: t.nameEn,
        designation: t.designation,
        designationEn: t.designationEn,
        department: t.department,
        departmentEn: t.departmentEn,
        photoUrl: t.image,
        displayOrder: 1,
        status: 'published' as const,
        createdAt: '',
        updatedAt: '',
      }));

  const normalizedGallery = galleryData.length > 0
    ? galleryData.map(img => ({
        id: img.id,
        src: (img as any).imageUrl || (img as any).src || '',
        alt: (img as any).altText || (img as any).alt || '',
        altEn: (img as any).altTextEn || (img as any).altEn || '',
        category: img.category,
      }))
    : galleryImages;

  return (
    <>
      {/* =========================================================================
          SECTION A: HERO BANNER
          ========================================================================= */}
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center">
        {/* Madrasa Building Photograph from Cloudinary */}
        <div className="absolute inset-0">
          <SafeImage
            src={brandAssets.buildingPhoto}
            alt={t(institutionIdentity.nameBn, institutionIdentity.nameEn)}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Subtle Emerald Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-950/85 to-primary-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-primary-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="max-w-3xl">
            {/* Bismillah */}
            <p className="text-gold-300 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 font-bengali-serif opacity-95 tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Official Bengali Motto Headline */}
            <div className="inline-block px-3 py-1 rounded bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              {t('জ্ঞান, বিশ্বাস ও সেবা', 'Knowledge, Faith & Service')}
            </div>

            {/* Full Official Institution Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-bengali mb-3 sm:mb-4">
              {t(institutionIdentity.nameBn, institutionIdentity.nameEn)}
            </h1>

            {/* Official Description */}
            <p className="text-primary-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8 font-bengali">
              {t(institutionIdentity.descriptionBn, institutionIdentity.descriptionEn)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <Link to="/about">
                <Button
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto font-semibold shadow-lg"
                >
                  {t('মাদরাসা সম্পর্কে জানুন', 'About the Madrasa')}
                </Button>
              </Link>

              <Link to="/admission">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-gold-400/80 text-gold-200 hover:bg-gold-500/20 hover:border-gold-300 font-semibold"
                >
                  {t('ভর্তি তথ্য দেখুন', 'View Admission Info')}
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-primary-100 hover:text-white hover:bg-white/10"
                >
                  {t('যোগাযোগ করুন', 'Contact Us')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 text-neutral-50 preserve-3d">
            <path d="M0 32L1440 32L1440 12C1440 12 1100 0 720 0C340 0 0 12 0 12L0 32Z" fill="#F7FAF8" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: IMPORTANT INFORMATION CARDS
          ========================================================================= */}
      <section className="bg-primary-50 py-6 sm:py-8 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Card 1: EIIN */}
            <div className="bg-white p-4 rounded-xl border border-primary-200/80 shadow-sm text-center">
              <span className="text-xs text-primary-700 font-semibold uppercase tracking-wider block mb-1">
                {t('ইআইআইএন (EIIN)', 'EIIN')}
              </span>
              <p className="text-xl sm:text-2xl font-bold text-primary-950 font-latin">
                {institutionIdentity.eiin}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">মাদরাসা শিক্ষা বোর্ড</p>
            </div>

            {/* Card 2: Establishment Year */}
            <div className="bg-white p-4 rounded-xl border border-primary-200/80 shadow-sm text-center">
              <span className="text-xs text-primary-700 font-semibold uppercase tracking-wider block mb-1">
                {t('প্রতিষ্ঠা সন', 'Established')}
              </span>
              <p className="text-xl sm:text-2xl font-bold text-primary-950 font-bengali">
                {institutionIdentity.establishedYearBn} খ্রি.
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">১ জানুয়ারি ১৯৯১</p>
            </div>

            {/* Card 3: Address */}
            <div className="bg-white p-4 rounded-xl border border-primary-200/80 shadow-sm text-center">
              <span className="text-xs text-primary-700 font-semibold uppercase tracking-wider block mb-1">
                {t('ঠিকানা ও অবস্থান', 'Location')}
              </span>
              <p className="text-sm sm:text-base font-bold text-primary-950 font-bengali truncate">
                আরামবাগ, খাগড়াছড়ি সদর
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">বায়তুশ শরফ রোড</p>
            </div>

            {/* Card 4: Contact Number */}
            <div className="bg-white p-4 rounded-xl border border-primary-200/80 shadow-sm text-center">
              <span className="text-xs text-primary-700 font-semibold uppercase tracking-wider block mb-1">
                {t('যোগাযোগ নম্বর', 'Helpline')}
              </span>
              <a
                href={getContactLinks.phone(institutionIdentity.phonePrimary)}
                className="text-base sm:text-xl font-bold text-primary-700 hover:text-primary-900 font-latin block transition-colors"
              >
                {institutionIdentity.phonePrimary}
              </a>
              <p className="text-[11px] text-neutral-500 mt-0.5">দাপ্তরিক তথ্যসেবা</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C & D: NOTICE BOARD & MADRASA INTRODUCTION
          ========================================================================= */}
      <Section background="white">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column: Notices */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <SectionHeader
                title={t('সর্বশেষ নোটিশ', 'Latest Notices')}
                subtitle={t('মাদরাসার সাম্প্রতিক বিজ্ঞপ্তি ও ঘোষণা', 'Recent announcements and circulars')}
                centered={false}
                className="mb-0"
              />
              <Link
                to="/notices"
                className="text-sm text-primary-700 hover:text-primary-800 font-semibold flex items-center gap-1 shrink-0"
              >
                {t('সকল নোটিশ দেখুন', 'View All')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {noticesLoading ? (
                <div className="flex items-center justify-center py-10 bg-primary-50/50 rounded-xl">
                  <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                </div>
              ) : displayNotices.length > 0 ? (
                displayNotices.map((notice) => (
                  <Link key={notice.id} to={`/notices/${notice.id}`} className="block group">
                    <Notice notice={notice} />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 font-bengali">
                  {t('বর্তমানে কোনো প্রকাশিত নোটিশ নেই।', 'No published notices available.')}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: About Madrasa Introduction */}
          <div className="lg:col-span-2 flex flex-col">
            <SectionHeader
              title={t('মাদরাসা পরিচিতি', 'About the Madrasa')}
              subtitle={t('দ্বীনি ও আধুনিক শিক্ষার সমন্বয়', 'Blend of Islamic & Modern Education')}
              centered={false}
              className="mb-5"
            />

            <Card padding="lg" className="flex-1 flex flex-col justify-between border-primary-100 bg-gradient-to-br from-white to-primary-50/30">
              <div>
                <div className="mb-4 rounded-xl overflow-hidden shadow-sm h-40 relative">
                  <img
                    src={brandAssets.buildingPhoto}
                    alt={institutionIdentity.nameBn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">
                      {institutionIdentity.shortNameBn}
                    </p>
                  </div>
                </div>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-bengali mb-4">
                  {t(
                    'খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসা পার্বত্য অঞ্চলের একটি সুপরিচিত ইসলামী শিক্ষাপ্রতিষ্ঠান। কুরআন-হাদিসের বিশুদ্ধ পাঠ, সুন্নাহভিত্তিক চরিত্রগঠন ও আধুনিক জাতীয় শিক্ষাক্রমের যুগোপযোগী সমন্বয়ে শিক্ষার্থীদের গড়ে তোলাই এই প্রতিষ্ঠানের মূল লক্ষ্য।',
                    'Khagrachhari Baitush Sharaf Jabbaria Adarsha Fazil (Degree) Madrasa is an established Islamic institution in the region. Its mission is to nurture students through pure Islamic values, character building, and the national educational curriculum.'
                  )}
                </p>
              </div>

              <div className="pt-2">
                <Link to="/about">
                  <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    {t('বিস্তারিত ইতিহাস ও পরিচিতি', 'Learn More About Us')}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION E: PRINCIPAL'S MESSAGE
          ========================================================================= */}
      <Section background="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-neutral-200">
            {/* Principal Photo */}
            <div className="lg:col-span-1 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border-4 border-primary-100">
                  <SafeImage
                    src={brandAssets.principalPhoto}
                    alt={t(principalInfo.nameBn, principalInfo.nameEn)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fallbackText="অধ্যক্ষ"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gold-400 text-primary-950 flex items-center justify-center font-bold text-xs shadow">
                  ★
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-primary-950 font-bengali">
                {t(principalInfo.nameBn, principalInfo.nameEn)}
              </h3>
              <p className="text-sm text-gold-600 font-semibold mt-0.5">
                {t(principalInfo.designationBn, principalInfo.designationEn)}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {institutionIdentity.shortNameBn}
              </p>
            </div>

            {/* Principal Message Content */}
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">
                {t('অধ্যক্ষের বাণী', "Principal's Message")}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-950 font-bengali mb-4">
                {t('শিক্ষার্থীদের প্রতি দিকনির্দেশনা ও শুভেচ্ছা', 'Guidance and Blessings for Students')}
              </h2>

              <div className="bg-primary-50/70 rounded-xl p-5 border border-primary-100 mb-5">
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-bengali line-clamp-6">
                  {t(principalInfo.messageBn, principalInfo.messageEn)}
                </p>
              </div>

              <Link to="/about/principal">
                <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('সম্পূর্ণ বাণী পড়ুন', 'Read Full Message')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION F: ACADEMIC PROGRAMS
          ========================================================================= */}
      <Section background="white">
        <SectionHeader
          title={t('আমাদের শিক্ষাকার্যক্রম', 'Our Academic Programs')}
          subtitle={t('ইবতেদায়ি থেকে ফাজিল (ডিগ্রি) এবং হিফজুল কুরআন বিভাগ', 'From Ibtidayi to Fazil Degree and Quran Memorization')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicPrograms.map((prog) => (
            <Card key={prog.id} hover padding="lg" className="flex flex-col justify-between border-neutral-200 h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary-950 font-bengali mb-1">
                  {t(prog.name, prog.nameEn)}
                </h3>
                <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 mb-3 border border-primary-100">
                  {t(prog.level, prog.levelEn)} • {t(prog.duration, prog.durationEn)}
                </span>
                <p className="text-neutral-600 text-sm leading-relaxed font-bengali">
                  {t(prog.description, prog.descriptionEn)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100">
                <Link
                  to="/academics/programs"
                  className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
                >
                  <span>{t('বিস্তারিত কারিকুলাম', 'View Curriculum')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* =========================================================================
          SECTION G: TEACHERS & FACULTY HIGHLIGHTS
          ========================================================================= */}
      <Section background="light">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title={t('আমাদের সম্মানিত শিক্ষকবৃন্দ', 'Honorable Faculty')}
            subtitle={t('অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকমণ্ডলী', 'Experienced and dedicated teaching faculty')}
            centered={false}
            className="mb-0"
          />
          <Link
            to="/teachers"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            {t('সকল শিক্ষক দেখুন', 'View All Faculty')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {teachersLoading ? (
            <div className="col-span-full py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          ) : (
            displayTeachers.map((teacher) => (
              <Link key={teacher.id} to={`/teachers/${teacher.id}`} className="block group">
                <Card hover padding="none" className="overflow-hidden h-full border-neutral-200">
                  <div className="aspect-[4/5] bg-neutral-100 flex items-center justify-center overflow-hidden relative">
                    {teacher.photoUrl ? (
                      <SafeImage
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        fallbackText="শিক্ষক"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <User className="w-12 h-12 text-primary-400 mx-auto mb-1" />
                        <span className="text-xs text-neutral-400">ছবি সংরক্ষিত</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3.5 text-center">
                    <h4 className="text-sm font-bold text-primary-950 font-bengali truncate group-hover:text-primary-700 transition-colors">
                      {t(teacher.name, teacher.nameEn)}
                    </h4>
                    <p className="text-xs text-gold-600 font-medium truncate mt-0.5">
                      {t(teacher.designation, teacher.designationEn)}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {t(teacher.department, teacher.departmentEn)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </Section>

      {/* =========================================================================
          SECTION H: QUICK SERVICES DIRECTORY
          ========================================================================= */}
      <Section background="white">
        <SectionHeader
          title={t('দ্রুত সেবাসমূহ', 'Quick Services')}
          subtitle={t('শিক্ষার্থী, অভিভাবক ও শুভানুধ্যায়ীদের জন্য প্রয়োজনীয় লিংক', 'Essential services and portals in one click')}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {quickServices.map((service, index) => (
            <Link key={index} to={service.href}>
              <Card hover padding="md" className="text-center h-full group border-neutral-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-800 mb-2.5 group-hover:bg-primary-700 group-hover:text-white transition-all duration-200">
                  {serviceIconMap[service.icon] || <Star className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-semibold text-primary-950 group-hover:text-primary-700 transition-colors font-bengali">
                  {t(service.label, service.labelEn)}
                </h4>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* =========================================================================
          SECTION I: ORPHANAGE & HIFZKHANA SECTION
          ========================================================================= */}
      <Section background="light">
        <SectionHeader
          title={t('সেবামূলক কার্যক্রম', 'Humanitarian & Quranic Services')}
          subtitle={t('সুবিধাবঞ্চিত শিশুদের আশ্রয় ও পবিত্র কুরআন হিফজের পবিত্র অঙ্গন', 'Sanctuary for orphans and noble Quran memorization department')}
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Orphanage Card */}
          <Card hover padding="lg" className="border-primary-100 flex flex-col justify-between h-full bg-white">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-950 font-bengali">
                    {t(orphanageData.titleBn, orphanageData.titleEn)}
                  </h3>
                  <span className="text-xs text-primary-700 font-medium">মানবিক আশ্রয় ও শিক্ষা সহায়তা</span>
                </div>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed font-bengali mb-4">
                {t(orphanageData.descriptionBn, orphanageData.descriptionEn)}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 font-bengali">
                {orphanageData.objectivesBn.slice(0, 3).map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <Link to="/orphanage">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                {t('এতিমখানা কার্যক্রম বিস্তারিত', 'Learn About Orphanage')}
              </Button>
            </Link>
          </Card>

          {/* Hifzkhana Card */}
          <Card hover padding="lg" className="border-gold-200 flex flex-col justify-between h-full bg-white">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-950 font-bengali">
                    {t(hifzkhanaData.titleBn, hifzkhanaData.titleEn)}
                  </h3>
                  <span className="text-xs text-gold-700 font-medium">সহীহ তাজবিদ ও পূর্ণাঙ্গ হিফজ</span>
                </div>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed font-bengali mb-4">
                {t(hifzkhanaData.descriptionBn, hifzkhanaData.descriptionEn)}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-neutral-600 font-bengali">
                {hifzkhanaData.featuresBn.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-gold-600 font-bold">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <Link to="/hifzkhana">
              <Button variant="gold" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                {t('হেফজখানা কার্যক্রম বিস্তারিত', 'Learn About Hifzkhana')}
              </Button>
            </Link>
          </Card>
        </div>
      </Section>

      {/* =========================================================================
          SECTION J: PHOTO GALLERY PREVIEW
          ========================================================================= */}
      <Section background="white">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title={t('ফটো গ্যালারি', 'Photo Gallery')}
            subtitle={t('মাদরাসার ক্যাম্পাস ও কার্যক্রমের চিত্রমালা', 'Campus glimpses and moments')}
            centered={false}
            className="mb-0"
          />
          <Link
            to="/gallery"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            {t('সম্পূর্ণ গ্যালারি দেখুন', 'View Full Gallery')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {galleryLoading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {normalizedGallery.map((img) => (
              <div key={img.id} className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm group">
                <SafeImage
                  src={img.src}
                  alt={t(img.alt, img.altEn)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  fallbackText="গ্যালারি"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs sm:text-sm font-semibold font-bengali">
                    {t(img.alt, img.altEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* =========================================================================
          SECTION K: CONTACT & MAP OVERVIEW
          ========================================================================= */}
      <section className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2 block">
                {t('যোগাযোগের ঠিকানা', 'Contact Information')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-white mb-4">
                {t('যে কোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন', 'Get in Touch with Us for Any Inquiries')}
              </h2>
              <p className="text-primary-200 text-sm leading-relaxed mb-6 font-bengali">
                ভর্তি তথ্য, একাডেমিক কার্যক্রম কিংবা এতিমখানা ও হেফজখানা সংক্রান্ত যে কোনো তথ্যের জন্য সরাসরি মাদরাসা কার্যালয়ে যোগাযোগ করতে পারেন অথবা নিচের নম্বরে ফোন করতে পারেন।
              </p>

              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3 text-primary-100">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>{institutionIdentity.addressBn}</span>
                </p>
                <p className="flex items-center gap-3 text-primary-100">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  <a href={getContactLinks.phone(institutionIdentity.phonePrimary)} className="hover:text-gold-300 font-latin">
                    {institutionIdentity.phonePrimary}
                  </a>
                </p>
                <p className="flex items-center gap-3 text-primary-100">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                  <a href={getContactLinks.email(institutionIdentity.email)} className="hover:text-gold-300 font-latin">
                    {institutionIdentity.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
              <MapPin className="w-12 h-12 text-gold-400 mb-3" />
              <h3 className="text-lg font-bold font-bengali text-white mb-2">
                গুগল ম্যাপে মাদরাসার অবস্থান
              </h3>
              <p className="text-xs text-primary-200 max-w-sm mb-5">
                বায়তুশ শরফ রোড, আরামবাগ, খাগড়াছড়ি সদর
              </p>
              <a
                href={getContactLinks.maps()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-primary-950 font-bold text-sm shadow transition-all"
              >
                <span>{t('গুগল ম্যাপে দেখুন', 'Open in Google Maps')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
