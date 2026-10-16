import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { BookOpen } from 'lucide-react';

export default function Academic() {
  const { t } = useLanguage();

  return (
    <>
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('একাডেমিক', 'Academic')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'শিক্ষা কার্যক্রম ও বিভাগসমূহ',
              'Academic programs and departments'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto text-center">
          <Card padding="lg">
            <div className="py-8">
              <BookOpen className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-primary-900 mb-2 font-bengali">
                {t('একাডেমিক তথ্য শীঘ্রই আসছে', 'Academic Information Coming Soon')}
              </h2>
              <p className="text-neutral-600">
                {t(
                  '[একাডেমিক তথ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Academic information will be placed here - Editable]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
