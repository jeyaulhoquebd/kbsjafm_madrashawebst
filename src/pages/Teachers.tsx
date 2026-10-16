import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { GraduationCap } from 'lucide-react';

export default function Teachers() {
  const { t } = useLanguage();

  return (
    <>
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('শিক্ষকবৃন্দ', 'Teachers')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'আমাদের সম্মানিত শিক্ষকমণ্ডলী',
              'Our respected teaching faculty'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto text-center">
          <Card padding="lg">
            <div className="py-8">
              <GraduationCap className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-primary-900 mb-2 font-bengali">
                {t('শিক্ষক তথ্য শীঘ্রই আসছে', 'Teacher Information Coming Soon')}
              </h2>
              <p className="text-neutral-600">
                {t(
                  '[শিক্ষকদের তথ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Teacher information will be placed here - Editable]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
