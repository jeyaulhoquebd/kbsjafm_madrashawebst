import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Notice from '../components/ui/Notice';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { sampleNotices } from '../data/mockData';
import { Search, Filter, Bell, ArrowDown } from 'lucide-react';

export default function Notices() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredNotices = useMemo(() => {
    let filtered = sampleNotices.filter((notice) => {
      const matchesSearch =
        searchQuery === '' ||
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.titleEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || notice.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const visibleNotices = filteredNotices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNotices.length;

  const categories = [
    { value: '', label: t('সকল বিভাগ', 'All Categories') },
    { value: 'notice', label: t('নোটিশ', 'Notice') },
    { value: 'event', label: t('অনুষ্ঠান', 'Event') },
    { value: 'result', label: t('ফলাফল', 'Result') },
    { value: 'admission', label: t('ভর্তি', 'Admission') },
  ];

  return (
    <>
      <PageHeader
        title={t('নোটিশ বোর্ড', 'Notice Board')}
        subtitle={t('সকল নোটিশ ও ঘোষণা এক জায়গায়', 'All notices and announcements in one place')}
        breadcrumb={<Breadcrumb items={[{ label: t('নোটিশ', 'Notices') }]} />}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder={t('নোটিশ অনুসন্ধান করুন...', 'Search notices...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none bg-white min-w-[160px]"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none bg-white"
                aria-label={t('সাজানোর ক্রম', 'Sort order')}
              >
                <option value="newest">{t('নতুন আগে', 'Newest First')}</option>
                <option value="oldest">{t('পুরাতন আগে', 'Oldest First')}</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-neutral-500 mb-4">
            {t(`${filteredNotices.length} টি নোটিশ পাওয়া গেছে`, `${filteredNotices.length} notice(s) found`)}
          </p>

          {/* Notices List */}
          {visibleNotices.length > 0 ? (
            <>
              <div className="space-y-3">
                {visibleNotices.map((notice) => (
                  <Link key={notice.id} to={`/notices/${notice.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
                    <Notice notice={notice} />
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                    icon={<ArrowDown className="w-4 h-4" />}
                  >
                    {t('আরো দেখুন', 'Load More')} ({filteredNotices.length - visibleCount} {t('বাকি', 'remaining')})
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<Bell className="w-8 h-8" />}
              title={t('কোনো নোটিশ পাওয়া যায়নি', 'No notices found')}
              description={t('অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন', 'Try changing your search criteria')}
            />
          )}
        </div>
      </Section>
    </>
  );
}
