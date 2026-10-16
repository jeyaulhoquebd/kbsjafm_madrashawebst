import { useLanguage } from '../context/LanguageContext';
import { institutionInfo, sampleNotices, departments } from '../data/mockData';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ScrollText,
  Scale,
  Languages,
  GraduationCap,
  Users,
  Building2,
  Calendar,
  Award,
  ArrowRight,
  Star,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  ScrollText: <ScrollText className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  Languages: <Languages className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-emerald">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-bg" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary-300/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Bismillah */}
            <p className="text-primary-200 text-lg mb-4 font-bengali-serif">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Institution Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight font-bengali mb-4">
              {t(
                'খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া',
                'Khagrachhari Baitush Sharaf Jabbaria'
              )}
              <br />
              <span className="text-gold-300">
                {t('আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা', 'Adarsha Fazil (Degree) Madrasa')}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-primary-100 text-base lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              {t(
                'দ্বীনী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে গড়ে উঠা একটি আদর্শ শিক্ষা প্রতিষ্ঠান',
                'An ideal educational institution combining Islamic knowledge with modern education'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/about">
                <Button variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  {t('আমাদের সম্পর্কে জানুন', 'Learn About Us')}
                </Button>
              </Link>
              <Link to="/notices">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  {t('নোটিশ বোর্ড', 'Notice Board')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <Section background="white" className="-mt-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {[
            {
              icon: <Users className="w-7 h-7" />,
              value: '[সংখ্যা]',
              label: t('শিক্ষার্থী', 'Students'),
            },
            {
              icon: <GraduationCap className="w-7 h-7" />,
              value: '[সংখ্যা]',
              label: t('শিক্ষক', 'Teachers'),
            },
            {
              icon: <Building2 className="w-7 h-7" />,
              value: `${departments.length}`,
              label: t('বিভাগ', 'Departments'),
            },
            {
              icon: <Calendar className="w-7 h-7" />,
              value: '[বছর]',
              label: t('বছরের সেবা', 'Years of Service'),
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 lg:p-6 rounded-xl bg-primary-50 border border-primary-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-primary-800">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section background="light">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <SectionHeader
              title={t('প্রতিষ্ঠান সম্পর্কে', 'About the Institution')}
              centered={false}
            />
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                {t(
                  '[প্রতিষ্ঠানের সংক্ষিপ্ত বিবরণ এখানে বসবে। এই মাদ্রাসা খাগড়াছড়ি জেলায় অবস্থিত একটি স্বনামধন্য ইসলামী শিক্ষা প্রতিষ্ঠান।] ',
                  '[Brief description of the institution will be placed here. This madrasa is a renowned Islamic educational institution located in Khagrachhari district.] '
                )}
              </p>
              <p>
                {t(
                  '[এই প্রতিষ্ঠানের উদ্দেশ্য, লক্ষ্য ও কার্যক্রম সম্পর্কে বিস্তারিত তথ্য এখানে দেওয়া হবে।]',
                  '[Detailed information about the purpose, goals, and activities of this institution will be provided here.]'
                )}
              </p>
            </div>
            <div className="mt-6">
              <Link to="/about">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('আরও পড়ুন', 'Read More')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 font-bengali mb-2">
                  {t('আমাদের লক্ষ্য', 'Our Mission')}
                </h3>
                <p className="text-neutral-600">
                  {t(
                    '[প্রতিষ্ঠানের লক্ষ্য ও উদ্দেশ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                    '[Institution mission and objectives will be placed here - Editable]'
                  )}
                </p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-gold-200/50 blur-xl" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-primary-200/50 blur-xl" />
          </div>
        </div>
      </Section>

      {/* Departments Section */}
      <Section background="white">
        <SectionHeader
          title={t('বিভাগসমূহ', 'Departments')}
          subtitle={t(
            'আমাদের মাদ্রাসায় বিভিন্ন বিভাগে মানসম্মত শিক্ষা প্রদান করা হয়',
            'Our madrasa provides quality education across various departments'
          )}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card key={dept.id} hover padding="lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-700 mb-4">
                  {iconMap[dept.icon] || <BookOpen className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t(dept.name, dept.nameEn)}
                </h3>
                <p className="text-sm text-neutral-600">
                  {t(dept.description, dept.descriptionEn)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Notices Section */}
      <Section background="light">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notices */}
          <div className="lg:col-span-2">
            <SectionHeader
              title={t('সর্বশেষ নোটিশ', 'Latest Notices')}
              centered={false}
            />
            <div className="space-y-3">
              {sampleNotices.map((notice) => (
                <Notice key={notice.id} notice={notice} />
              ))}
            </div>
            <div className="mt-6">
              <Link to="/notices">
                <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('সব নোটিশ দেখুন', 'View All Notices')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar - Quick Info */}
          <div>
            <SectionHeader
              title={t('গুরুত্বপূর্ণ তথ্য', 'Important Info')}
              centered={false}
            />
            <Card className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-800">
                    {t('EIIN নম্বর', 'EIIN Number')}
                  </h4>
                  <p className="text-sm text-neutral-600">{institutionInfo.eiin}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-800">
                    {t('স্থাপিত', 'Established')}
                  </h4>
                  <p className="text-sm text-neutral-600">{institutionInfo.established}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
