import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Notice from '../components/ui/Notice';
import { sampleNotices } from '../data/mockData';

export default function Notices() {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Header */}
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('নোটিশ বোর্ড', 'Notice Board')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'সকল নোটিশ ও ঘোষণা এক জায়গায়',
              'All notices and announcements in one place'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('সকল নোটিশ', 'All Notices')}
            centered={false}
          />

          <div className="space-y-4">
            {sampleNotices.length > 0 ? (
              sampleNotices.map((notice) => (
                <Notice key={notice.id} notice={notice} />
              ))
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-xl border border-neutral-200">
                <p className="text-neutral-500">
                  {t(
                    'কোনো নোটিশ নেই',
                    'No notices available'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
