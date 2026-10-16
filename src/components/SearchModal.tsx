import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sampleNotices, demoTeachers, downloadItems } from '../data/mockData';
import { Link } from 'react-router-dom';
import { X, Search, FileText, User, Bell, Download } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset query when modal opens/closes
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { notices: [], teachers: [], downloads: [] };

    const q = query.toLowerCase();

    const notices = sampleNotices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.titleEn.toLowerCase().includes(q)
    );

    const teachers = demoTeachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        t.designationEn.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.departmentEn.toLowerCase().includes(q)
    );

    const downloads = downloadItems.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q)
    );

    return { notices, teachers, downloads };
  }, [query]);

  const totalResults = results.notices.length + results.teachers.length + results.downloads.length;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-16 lg:pt-24 px-3 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('অনুসন্ধান', 'Search')}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] sm:max-h-[70vh] flex flex-col overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-neutral-200">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('নোটিশ, শিক্ষক বা ডকুমেন্ট খুঁজুন...', 'Search notices, teachers, or documents...')}
            className="flex-1 text-sm sm:text-base outline-none placeholder-neutral-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500"
            aria-label={t('বন্ধ করুন', 'Close')}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-neutral-500 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
              <p>{t('অনুসন্ধান করতে টাইপ করুন', 'Type to search')}</p>
              <p className="text-xs text-neutral-400 mt-1">
                {t('নোটিশ, শিক্ষক এবং ডকুমেন্ট খুঁজুন', 'Search notices, teachers, and documents')}
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-neutral-500 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
              <p className="font-medium">{t('কোনো ফলাফল পাওয়া যায়নি', 'No results found')}</p>
              <p className="text-xs text-neutral-400 mt-1">
                {t('অন্য শব্দ দিয়ে চেষ্টা করুন', 'Try different keywords')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Notices */}
              {results.notices.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5" />
                    {t('নোটিশ', 'Notices')} ({results.notices.length})
                  </h3>
                  <div className="space-y-1">
                    {results.notices.slice(0, 5).map((notice) => (
                      <Link
                        key={notice.id}
                        to={`/notices/${notice.id}`}
                        onClick={onClose}
                        className="block p-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
                      >
                        <p className="text-sm text-neutral-800 group-hover:text-primary-700 line-clamp-1">
                          {t(notice.title, notice.titleEn)}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">{notice.date}</p>
                      </Link>
                    ))}
                    {results.notices.length > 5 && (
                      <Link
                        to="/notices"
                        onClick={onClose}
                        className="block p-2 text-xs text-primary-700 hover:text-primary-800 font-medium"
                      >
                        {t(`আরো ${results.notices.length - 5} টি নোটিশ দেখুন`, `View ${results.notices.length - 5} more notices`)} →
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Teachers */}
              {results.teachers.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {t('শিক্ষক', 'Teachers')} ({results.teachers.length})
                  </h3>
                  <div className="space-y-1">
                    {results.teachers.slice(0, 5).map((teacher) => (
                      <Link
                        key={teacher.id}
                        to={`/teachers/${teacher.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-primary-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-neutral-800 group-hover:text-primary-700 truncate">
                            {t(teacher.name, teacher.nameEn)}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {t(teacher.designation, teacher.designationEn)}
                          </p>
                        </div>
                      </Link>
                    ))}
                    {results.teachers.length > 5 && (
                      <Link
                        to="/teachers"
                        onClick={onClose}
                        className="block p-2 text-xs text-primary-700 hover:text-primary-800 font-medium"
                      >
                        {t(`আরো ${results.teachers.length - 5} জন শিক্ষক দেখুন`, `View ${results.teachers.length - 5} more teachers`)} →
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Downloads */}
              {results.downloads.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    {t('ডকুমেন্ট', 'Documents')} ({results.downloads.length})
                  </h3>
                  <div className="space-y-1">
                    {results.downloads.slice(0, 5).map((doc) => (
                      <Link
                        key={doc.id}
                        to="/downloads"
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-primary-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-neutral-800 group-hover:text-primary-700 truncate">
                            {t(doc.title, doc.titleEn)}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {doc.fileType} {doc.fileSize && `• ${doc.fileSize}`}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-4 py-2.5 bg-neutral-50">
          <p className="text-xs text-neutral-400 text-center">
            {t(
              '※ স্থানীয় ডেটা থেকে অনুসন্ধান করা হচ্ছে',
              '※ Searching from local data only'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
