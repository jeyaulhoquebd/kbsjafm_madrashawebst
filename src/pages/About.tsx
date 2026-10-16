import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { institutionInfo } from '../data/mockData';
import { Building2, Target, Eye, BookOpen } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Header */}
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('প্রতিষ্ঠান পরিচিতি', 'About the Institution')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'আমাদের প্রতিষ্ঠান সম্পর্কে বিস্তারিত তথ্য',
              'Detailed information about our institution'
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-primary-50 rounded-xl p-6 lg:p-8 border border-primary-100 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-900 mb-2 font-bengali">
                    {t(institutionInfo.name, institutionInfo.nameEn)}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    {t(
                      '[প্রতিষ্ঠানের বিস্তারিত পরিচিতি এখানে বসবে - সম্পাদনাযোগ্য। এই মাদ্রাসা খাগড়াছড়ি জেলায় অবস্থিত একটি গুরুত্বপূর্ণ ইসলামী শিক্ষা প্রতিষ্ঠান।]',
                      '[Detailed introduction of the institution will be placed here - Editable. This madrasa is an important Islamic educational institution located in Khagrachhari district.]'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section background="light">
        <SectionHeader
          title={t('আমাদের লক্ষ্য ও উদ্দেশ্য', 'Our Vision & Mission')}
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card hover padding="lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-700 mb-4">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3 font-bengali">
                {t('দৃষ্টিভঙ্গি', 'Vision')}
              </h3>
              <p className="text-neutral-600">
                {t(
                  '[প্রতিষ্ঠানের দৃষ্টিভঙ্গি এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Institution vision will be placed here - Editable]'
                )}
              </p>
            </div>
          </Card>
          <Card hover padding="lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-100 text-gold-700 mb-4">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3 font-bengali">
                {t('লক্ষ্য', 'Mission')}
              </h3>
              <p className="text-neutral-600">
                {t(
                  '[প্রতিষ্ঠানের লক্ষ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Institution mission will be placed here - Editable]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* History Placeholder */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('ইতিহাস', 'History')}
            centered={false}
          />
          <div className="flex items-start gap-4 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <p className="text-neutral-600 leading-relaxed">
                {t(
                  '[প্রতিষ্ঠানের ইতিহাস এখানে বসবে - সম্পাদনাযোগ্য। প্রতিষ্ঠানটি কবে প্রতিষ্ঠিত হয়েছিল, কে প্রতিষ্ঠা করেছিলেন, এবং কীভাবে বিবর্তিত হয়েছে - এই তথ্যগুলো এখানে যুক্ত করা হবে।]',
                  '[History of the institution will be placed here - Editable. When the institution was founded, who founded it, and how it has evolved - this information will be added here.]'
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
