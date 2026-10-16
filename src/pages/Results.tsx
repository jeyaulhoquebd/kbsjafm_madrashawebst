import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { examTypes, examYears } from '../data/mockData';
import { resultsAndAchievements } from '../data/institution';
import { Search, Award, Info, AlertCircle } from 'lucide-react';

export default function Results() {
  const { t } = useLanguage();
  const [examType, setExamType] = useState('');
  const [examYear, setExamYear] = useState('');
  const [studentId, setStudentId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading (demo only)
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 1000);
  };

  return (
    <>
      <PageHeader
        title={t('পরীক্ষার ফলাফল', 'Exam Results')}
        subtitle={t('পরীক্ষার ফলাফল যাচাই করুন', 'Check examination results')}
        breadcrumb={<Breadcrumb items={[{ label: t('ফলাফল', 'Results') }]} />}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-8">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 font-medium mb-1">
                {t('খসড়া - যাচাই ও অনুমোদন সাপেক্ষে', 'Draft - Subject to verification and approval')}
              </p>
              <p className="text-xs text-amber-800 whitespace-pre-line">
                {t(resultsAndAchievements.notice, resultsAndAchievements.noticeEn)}
              </p>
            </div>
          </div>

          {/* Search Form */}
          <Card padding="lg" className="mb-8">
            <SectionHeader title={t('ফলাফল অনুসন্ধান', 'Search Results')} centered={false} className="mb-6" />

            <form onSubmit={handleSearch}>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t('পরীক্ষার ধরন', 'Exam Type')}</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                  >
                    {examTypes.map((type) => (
                      <option key={type.value} value={type.value}>{t(type.label, type.labelEn)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t('শিক্ষাবর্ষ', 'Academic Year')}</label>
                  <select
                    value={examYear}
                    onChange={(e) => setExamYear(e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                  >
                    {examYears.map((year) => (
                      <option key={year.value} value={year.value}>{t(year.label, year.labelEn)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t('রোল নম্বর / রেজিস্ট্রেশন', 'Roll / Registration No.')}</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder={t('রোল নম্বর লিখুন', 'Enter roll number')}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" icon={<Search className="w-4 h-4" />} isLoading={isLoading} disabled={isLoading}>
                {isLoading ? t('অনুসন্ধান করা হচ্ছে...', 'Searching...') : t('ফলাফল দেখুন', 'View Results')}
              </Button>
            </form>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card padding="lg">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                  <svg className="animate-spin h-6 w-6 text-primary-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
                <p className="text-neutral-600">{t('ফলাফল অনুসন্ধান করা হচ্ছে...', 'Searching for results...')}</p>
              </div>
            </Card>
          )}

          {/* Demo Results State */}
          {hasSearched && !isLoading && (
            <Card padding="lg">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 mb-4">
                  <Award className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 font-bengali">
                  {t('ডেমো ফলাফল', 'Demo Results')}
                </h3>
                <p className="text-neutral-600 mb-4 max-w-md mx-auto">
                  {t(
                    'এটি একটি ডেমো ফলাফল পৃষ্ঠা। প্রকৃত ফলাফল এখনও সংযুক্ত করা হয়নি।',
                    'This is a demo results page. Actual results have not been connected yet.'
                  )}
                </p>

                {/* Demo Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-blue-800 font-medium mb-1">{t('তথ্য', 'Information')}</p>
                      <p className="text-xs text-blue-700">
                        {t(
                          'ফলাফল সংক্রান্ত প্রকৃত তথ্য শীঘ্রই এখানে যুক্ত করা হবে। আপাতত এটি একটি ডেমো ইন্টারফেস।',
                          'Actual result information will be added here soon. For now, this is a demo interface.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Demo Search Summary */}
                <div className="bg-neutral-50 rounded-lg p-4 max-w-md mx-auto text-left">
                  <h4 className="text-sm font-semibold text-neutral-800 mb-2">{t('অনুসন্ধানের সারাংশ', 'Search Summary')}</h4>
                  <div className="space-y-1 text-xs text-neutral-600">
                    <p><span className="font-medium">{t('পরীক্ষার ধরন:', 'Exam Type:')}</span> {examType ? examTypes.find(t => t.value === examType)?.[t('bn', 'en') === 'bn' ? 'label' : 'labelEn'] : t('সকল', 'All')}</p>
                    <p><span className="font-medium">{t('শিক্ষাবর্ষ:', 'Year:')}</span> {examYear || t('সকল', 'All')}</p>
                    <p><span className="font-medium">{t('রোল নম্বর:', 'Roll No:')}</span> {studentId || t('উল্লেখ করা হয়নি', 'Not specified')}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Info Notice */}
          {!hasSearched && (
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-primary-800 font-medium mb-1">{t('গুরুত্বপূর্ণ তথ্য', 'Important Information')}</p>
                  <p className="text-xs text-primary-700">
                    {t(
                      'ফলাফল যাচাই করতে উপরের ফর্মে তথ্য দিন। এটি একটি ডেমো ইন্টারফেস - প্রকৃত ফলাফল শীঘ্রই সংযুক্ত করা হবে।',
                      'Enter information in the form above to check results. This is a demo interface - actual results will be connected soon.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
