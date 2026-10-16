import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admission() {
  const { t } = useLanguage();

  return (
    <>
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('ভর্তি তথ্য', 'Admission Information')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'ভর্তি সংক্রান্ত সকল তথ্য ও নির্দেশনা',
              'All admission-related information and guidelines'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('ভর্তি কার্যক্রম', 'Admission Process')}
            centered={false}
          />

          <Card padding="lg" className="mb-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t('ভর্তি বিজ্ঞপ্তি', 'Admission Notice')}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {t(
                    '[ভর্তি সংক্রান্ত বিস্তারিত তথ্য এখানে বসবে - সম্পাদনাযোগ্য। ভর্তির সময়সূচী, যোগ্যতা, প্রয়োজনীয় কাগজপত্র এবং অন্যান্য তথ্য এখানে দেওয়া হবে।]',
                    '[Detailed admission information will be placed here - Editable. Admission schedule, eligibility, required documents, and other information will be provided here.]'
                  )}
                </p>
              </div>
            </div>
          </Card>

          <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-3 font-bengali">
              {t('ভর্তির শর্তাবলী', 'Admission Requirements')}
            </h3>
            <ul className="space-y-2 text-neutral-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                <span>{t('[শর্ত ১ - সম্পাদনাযোগ্য]', '[Requirement 1 - Editable]')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                <span>{t('[শর্ত ২ - সম্পাদনাযোগ্য]', '[Requirement 2 - Editable]')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                <span>{t('[শর্ত ৩ - সম্পাদনাযোগ্য]', '[Requirement 3 - Editable]')}</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link to="/admission/apply">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                {t('অনলাইন আবেদন করুন', 'Apply Online')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
