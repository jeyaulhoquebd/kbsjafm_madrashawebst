import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { Video, PlayCircle } from 'lucide-react';

export default function VideoGallery() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('ভিডিও গ্যালারি', 'Video Gallery')}
        subtitle={t('প্রতিষ্ঠানের ভিডিও সংগ্রহ', 'Video collection of the institution')}
        breadcrumb={<Breadcrumb items={[{ label: t('ভিডিও গ্যালারি', 'Video Gallery') }]} />}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={t('ভিডিও সংগ্রহ', 'Video Collection')}
            subtitle={t('প্রতিষ্ঠানের বিভিন্ন অনুষ্ঠান ও কার্যক্রমের ভিডিও', 'Videos of various programs and activities of the institution')}
          />

          <EmptyState
            icon={<Video className="w-8 h-8" />}
            title={t('কোনো ভিডিও নেই', 'No Videos Available')}
            description={t(
              'বর্তমানে কোনো ভিডিও আপলোড করা হয়নি। শীঘ্রই ভিডিও যুক্ত করা হবে।',
              'No videos have been uploaded yet. Videos will be added soon.'
            )}
          />
        </div>
      </Section>

      {/* Categories */}
      <Section background="light">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={t('ভিডিও বিভাগ', 'Video Categories')}
            centered={false}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { bn: 'অনুষ্ঠান', en: 'Events' },
              { bn: 'শিক্ষা কার্যক্রম', en: 'Educational Activities' },
              { bn: 'ধর্মীয় অনুষ্ঠান', en: 'Religious Programs' },
              { bn: 'সাংস্কৃতিক অনুষ্ঠান', en: 'Cultural Programs' },
              { bn: 'ক্রীড়া প্রতিযোগিতা', en: 'Sports Competitions' },
              { bn: 'এতিমখানা কার্যক্রম', en: 'Orphanage Activities' },
              { bn: 'হেফজখানা কার্যক্রম', en: 'Hifzkhana Activities' },
              { bn: 'বিশেষ অনুষ্ঠান', en: 'Special Events' },
            ].map((category, index) => (
              <Card key={index} padding="md" className="text-center">
                <PlayCircle className="w-8 h-8 text-primary-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-neutral-700 font-bengali">
                  {t(category.bn, category.en)}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {t('[শীঘ্রই আসছে]', '[Coming Soon]')}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
