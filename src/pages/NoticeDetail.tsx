import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { sampleNotices } from '../data/mockData';
import { Calendar, User, Download, ArrowLeft, Bell } from 'lucide-react';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const notice = sampleNotices.find((n) => n.id === id);

  if (!notice) {
    return (
      <>
        <PageHeader
          title={t('নোটিশ পাওয়া যায়নি', 'Notice Not Found')}
          breadcrumb={<Breadcrumb items={[{ label: t('নোটিশ', 'Notices'), href: '/notices' }, { label: t('পাওয়া যায়নি', 'Not Found') }]} />}
        />
        <Section background="white">
          <div className="max-w-2xl mx-auto text-center py-12">
            <p className="text-neutral-600 mb-4">{t('এই নোটিশটি পাওয়া যায়নি', 'This notice was not found')}</p>
            <Link to="/notices">
              <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
                {t('নোটিশ বোর্ডে ফিরে যান', 'Back to Notices')}
              </Button>
            </Link>
          </div>
        </Section>
      </>
    );
  }

  const categoryLabel = {
    notice: t('নোটিশ', 'Notice'),
    event: t('অনুষ্ঠান', 'Event'),
    result: t('ফলাফল', 'Result'),
    admission: t('ভর্তি', 'Admission'),
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(t('bn', 'en') === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <PageHeader
        title={t('নোটিশ বিস্তারিত', 'Notice Details')}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: t('নোটিশ', 'Notices'), href: '/notices' },
              { label: t('বিস্তারিত', 'Details') },
            ]}
          />
        }
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card padding="lg">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                <Bell className="w-3 h-3" />
                {categoryLabel[notice.category]}
              </span>
              {notice.isUrgent && (
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                  {t('জরুরি', 'Urgent')}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl lg:text-2xl font-bold text-primary-900 font-bengali mb-4">
              {t(notice.title, notice.titleEn)}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={notice.date}>{formatDate(notice.date)}</time>
              </div>
              {notice.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{notice.author}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed mb-6">
              <p>{t(notice.content, notice.contentEn)}</p>
            </div>

            {/* Attachment */}
            {notice.attachmentUrl && (
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary-700" />
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{notice.attachmentName}</p>
                      <p className="text-xs text-neutral-500">{t('সংযুক্তি', 'Attachment')}</p>
                    </div>
                  </div>
                  <a
                    href={notice.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    {t('ডাউনলোড', 'Download')}
                  </a>
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-4 border-t border-neutral-200">
              <Link to="/notices">
                <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                  {t('নোটিশ বোর্ডে ফিরে যান', 'Back to Notices')}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
