import { Notice as NoticeType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Calendar, AlertCircle } from 'lucide-react';

interface NoticeProps {
  notice: NoticeType;
  compact?: boolean;
}

const categoryColors = {
  notice: 'bg-primary-100 text-primary-800',
  event: 'bg-gold-100 text-gold-800',
  result: 'bg-blue-100 text-blue-800',
  admission: 'bg-red-100 text-red-800',
};

export default function Notice({ notice, compact = false }: NoticeProps) {
  const { t } = useLanguage();

  const categoryLabel = {
    notice: t('নোটিশ', 'Notice'),
    event: t('অনুষ্ঠান', 'Event'),
    result: t('ফলাফল', 'Result'),
    admission: t('ভর্তি', 'Admission'),
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (t('bn', 'en') === 'bn') {
      return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <article
      className={`
        group relative
        bg-white rounded-lg
        border border-neutral-200
        hover:border-primary-300 hover:shadow-sm
        transition-all duration-200
        ${compact ? 'p-3' : 'p-4'}
      `}
    >
      {notice.isUrgent && (
        <div className="absolute top-2 right-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary-700" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`
                inline-flex items-center px-2 py-0.5
                text-xs font-medium rounded-full
                ${categoryColors[notice.category]}
              `}
            >
              {categoryLabel[notice.category]}
            </span>
            {notice.isUrgent && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                {t('জরুরি', 'Urgent')}
              </span>
            )}
          </div>

          <h3
            className={`
              font-medium text-neutral-800
              group-hover:text-primary-700 transition-colors
              ${compact ? 'text-sm line-clamp-1' : 'text-base line-clamp-2'}
            `}
          >
            {t(notice.title, notice.titleEn)}
          </h3>

          <div className="flex items-center gap-1 mt-1.5 text-xs text-neutral-500">
            <Calendar className="w-3 h-3" />
            <time dateTime={notice.date}>{formatDate(notice.date)}</time>
          </div>
        </div>
      </div>
    </article>
  );
}
