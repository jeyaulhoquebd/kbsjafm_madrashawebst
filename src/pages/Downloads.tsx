import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { downloadItems } from '../data/mockData';
import { Download, FileText, Filter } from 'lucide-react';

export default function Downloads() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { value: '', label: t('সকল', 'All') },
    { value: 'admission', label: t('ভর্তি ফরম', 'Admission Forms') },
    { value: 'routine', label: t('ক্লাস রুটিন', 'Class Routines') },
    { value: 'exam', label: t('পরীক্ষার রুটিন', 'Exam Routines') },
    { value: 'syllabus', label: t('সিলেবাস', 'Syllabus') },
    { value: 'calendar', label: t('শিক্ষা ক্যালেন্ডার', 'Academic Calendar') },
    { value: 'other', label: t('অন্যান্য', 'Other') },
  ];

  const filteredDownloads = selectedCategory
    ? downloadItems.filter((item) => item.category === selectedCategory)
    : downloadItems;

  return (
    <>
      <PageHeader
        title={t('ডাউনলোড', 'Downloads')}
        subtitle={t('প্রয়োজনীয় ফরম ও নথি ডাউনলোড করুন', 'Download necessary forms and documents')}
        breadcrumb={<Breadcrumb items={[{ label: t('ডাউনলোড', 'Downloads') }]} />}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-4 h-4 text-neutral-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-primary-700 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Downloads List */}
          {filteredDownloads.length > 0 ? (
            <div className="space-y-3">
              {filteredDownloads.map((item) => (
                <Card key={item.id} padding="md" hover>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-neutral-800 truncate">
                          {t(item.title, item.titleEn)}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                          <span>{item.date}</span>
                          {item.fileSize && <span>• {item.fileSize}</span>}
                          <span>• {item.fileType}</span>
                        </div>
                      </div>
                    </div>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('ডাউনলোড', 'Download')}</span>
                      </a>
                    ) : (
                      <span className="shrink-0 text-xs text-neutral-400 italic px-3">
                        {t('[ফাইল নেই]', '[No File]')}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Download className="w-8 h-8" />}
              title={t('কোনো ডাউনলোড পাওয়া যায়নি', 'No downloads found')}
              description={t('এই বিভাগে কোনো ফাইল নেই', 'No files in this category')}
            />
          )}

          {/* Info Notice */}
          <div className="mt-8 bg-primary-50 border border-primary-100 rounded-lg p-4">
            <p className="text-xs text-primary-700">
              {t(
                '※ উল্লেখ্য: কিছু ফাইল এখনও আপলোড করা হয়নি। প্রকৃত ফাইল পাওয়া গেলে ডাউনলোড লিংক সক্রিয় হবে।',
                '※ Note: Some files have not been uploaded yet. Download links will be activated when actual files are available.'
              )}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
