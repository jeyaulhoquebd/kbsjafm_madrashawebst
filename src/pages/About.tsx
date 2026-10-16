import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Building2, Target, Eye, BookOpen, Award, Users, ArrowRight } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('প্রতিষ্ঠান পরিচিতি', 'About the Institution')}
        subtitle={t('আমাদের প্রতিষ্ঠান সম্পর্কে বিস্তারিত তথ্য', 'Detailed information about our institution')}
        breadcrumb={<Breadcrumb items={[{ label: t('পরিচিতি', 'About') }]} />}
      />

      {/* Overview Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={t('প্রতিষ্ঠান পরিচিতি', 'Institution Overview')} centered={false} />
          <div className="bg-primary-50 rounded-xl p-6 lg:p-8 border border-primary-100 mb-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-neutral-700 leading-relaxed">
                  {t(
                    '[প্রতিষ্ঠানের বিস্তারিত পরিচিতি এখানে বসবে - সম্পাদনাযোগ্য। এই মাদ্রাসা খাগড়াছড়ি জেলায় অবস্থিত একটি গুরুত্বপূর্ণ ইসলামী শিক্ষা প্রতিষ্ঠান। এখানে কুরআন, হাদীস, ফিকহ, আরবি ভাষা ও সাধারণ শিক্ষার সমন্বয়ে পাঠদান করা হয়।]',
                    '[Detailed introduction of the institution will be placed here - Editable. This madrasa is an important Islamic educational institution located in Khagrachhari district. It provides education combining Quran, Hadith, Fiqh, Arabic language, and general education.]'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section background="light">
        <SectionHeader title={t('আমাদের লক্ষ্য ও উদ্দেশ্য', 'Our Vision & Mission')} />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card hover padding="lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-700 mb-4">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3 font-bengali">{t('দৃষ্টিভঙ্গি', 'Vision')}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {t(
                  '[প্রতিষ্ঠানের দৃষ্টিভঙ্গি এখানে বসবে - সম্পাদনাযোগ্য। একটি আদর্শ ইসলামী শিক্ষা প্রতিষ্ঠান গড়ে তোলা যেখানে দ্বীনী ও আধুনিক শিক্ষার সমন্বয় ঘটবে।]',
                  '[Institution vision will be placed here - Editable. To build an ideal Islamic educational institution where religious and modern education will be combined.]'
                )}
              </p>
            </div>
          </Card>
          <Card hover padding="lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-100 text-gold-700 mb-4">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3 font-bengali">{t('লক্ষ্য', 'Mission')}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {t(
                  '[প্রতিষ্ঠানের লক্ষ্য এখানে বসবে - সম্পাদনাযোগ্য। দক্ষ ও নৈতিকতাসম্পন্ন মুসলিম নাগরিক গড়ে তোলা, যারা সমাজে ইতিবাচক অবদান রাখতে পারবে।]',
                  '[Institution mission will be placed here - Editable. To develop skilled and ethical Muslim citizens who can contribute positively to society.]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* History */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={t('ইতিহাস ও ঐতিহ্য', 'History & Heritage')} centered={false} />
          <div className="flex items-start gap-4 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <p className="text-neutral-700 leading-relaxed">
                {t(
                  '[প্রতিষ্ঠানের ইতিহাস এখানে বসবে - সম্পাদনাযোগ্য। প্রতিষ্ঠানটি কবে প্রতিষ্ঠিত হয়েছিল, কে প্রতিষ্ঠা করেছিলেন, এবং কীভাবে বিবর্তিত হয়েছে - এই তথ্যগুলো এখানে যুক্ত করা হবে।]',
                  '[History of the institution will be placed here - Editable. When the institution was founded, who founded it, and how it has evolved - this information will be added here.]'
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Educational Philosophy */}
      <Section background="light">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('শিক্ষা দর্শন', 'Educational Philosophy')} />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: t('কুরআন ও সুন্নাহ', 'Quran & Sunnah'), desc: t('[বিবরণ - সম্পাদনাযোগ্য]', '[Description - Editable]') },
              { icon: <Users className="w-6 h-6" />, title: t('চরিত্র গঠন', 'Character Building'), desc: t('[বিবরণ - সম্পাদনাযোগ্য]', '[Description - Editable]') },
              { icon: <Award className="w-6 h-6" />, title: t('আধুনিক শিক্ষা', 'Modern Education'), desc: t('[বিবরণ - সম্পাদনাযোগ্য]', '[Description - Editable]') },
            ].map((item, i) => (
              <Card key={i} hover padding="lg" className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Principal's Message */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('অধ্যক্ষের বাণী', "Principal's Message")} />
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-primary-100">
                  <img
                    src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165301/probasak.jpg"
                    alt={t('অধ্যক্ষের ছবি', "Principal's Photo")}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl bg-gold-200/50 -z-10" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-primary-900 mb-1 font-bengali">
                {t('[অধ্যক্ষের নাম - সম্পাদনাযোগ্য]', "[Principal's Name - Editable]")}
              </h3>
              <p className="text-neutral-600 text-sm mb-4">{t('[পদবি - সম্পাদনাযোগ্য]', '[Designation - Editable]')}</p>
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                <p className="text-neutral-700 leading-relaxed">
                  {t(
                    '[অধ্যক্ষের বাণী এখানে বসবে - সম্পাদনাযোগ্য। শিক্ষা প্রতিষ্ঠানের উদ্দেশ্য, লক্ষ্য এবং শিক্ষার্থীদের প্রতি বার্তা এখানে প্রকাশিত হবে।]',
                    "[Principal's message will be placed here - Editable. The purpose, goals, and message to students will be expressed here.]"
                  )}
                </p>
              </div>
              <div className="mt-4">
                <Link to="/about/principal">
                  <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    {t('সম্পূর্ণ বাণী পড়ুন', 'Read Full Message')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
