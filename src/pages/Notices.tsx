import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Notice from '../components/ui/Notice';
import EmptyState from '../components/ui/EmptyState';
import { sampleNotices } from '../data/mockData';
import { Search, Filter, Bell } from 'lucide-react';

export default function Notices() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredNotices = useMemo(() => {
    return sampleNotices.filter((notice) => {
      const matchesSearch =
        searchQuery === '' ||
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.titleEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || notice.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none bg-white min-w-[180px]"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-neutral-500 mb-4">
            {t(`${filteredNotices.length} টি নোটিশ পাওয়া গেছে`, `${filteredNotices.length} notice(s) found`)}
          </p>

          {/* Notices List */}
          {filteredNotices.length > 0 ? (
            <div className="space-y-3">
              {filteredNotices.map((notice) => (
                <a key={notice.id} href={`/notices/${notice.id}`} className="block">
                  <Notice notice={notice} />
                </a>
              ))}
            </div>
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
