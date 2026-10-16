import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { Calendar, Newspaper, AlertCircle } from 'lucide-react';

export default function NewsEvents() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('সংবাদ ও অনুষ্ঠান', 'News & Events')}
        subtitle={t('প্রতিষ্ঠানের সর্বশেষ সংবাদ ও কার্যক্রম', 'Latest news and activities of the institution')}
        breadcrumb={<Breadcrumb items={[{ label: t('সংবাদ ও অনুষ্ঠান', 'News & Events') }]} />}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Info Notice */}
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-primary-800">
                {t(
                  'সংবাদ ও অনুষ্ঠান বিভাগটি শীঘ্রই চালু করা হবে। অনুগ্রহ করে নোটিশ বিভাগ থেকে সর্বশেষ তথ্য দেখুন।',
                  'The News & Events section will be launched soon. Please check the Notices section for the latest information.'
                )}
              </p>
            </div>
          </div>

          {/* Empty State */}
          <EmptyState
            icon={<Newspaper className="w-8 h-8" />}
            title={t('কোনো সংবাদ নেই', 'No News Available')}
            description={t(
              'বর্তমানে কোনো সংবাদ বা অনুষ্ঠানের তথ্য প্রকাশিত হয়নি।',
              'No news or event information has been published at this time.'
            )}
          />
        </div>
      </Section>

      {/* Recent Activities Placeholder */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('সাম্প্রতিক কার্যক্রম', 'Recent Activities')}
            centered={false}
          />
          <Card padding="lg">
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">
                {t(
                  '[সাম্প্রতিক কার্যক্রম এখানে প্রদর্শিত হবে - সম্পাদনাযোগ্য]',
                  '[Recent activities will be displayed here - Editable]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
