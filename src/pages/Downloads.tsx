import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Download, FileText } from 'lucide-react';

export default function Downloads() {
  const { t } = useLanguage();

  const downloadItems = [
    { id: '1', title: '[নমুনা - ভর্তি ফরম]', titleEn: '[Sample - Admission Form]', date: '2025-01-15' },
    { id: '2', title: '[নমুনা - ক্লাস রুটিন]', titleEn: '[Sample - Class Routine]', date: '2025-01-10' },
    { id: '3', title: '[নমুনা - পরীক্ষার সময়সূচী]', titleEn: '[Sample - Exam Schedule]', date: '2025-01-05' },
  ];

  return (
    <>
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('ডাউনলোড', 'Downloads')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'প্রয়োজনীয় ফরম ও নথি ডাউনলোড করুন',
              'Download necessary forms and documents'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('ডাউনলোডযোগ্য ফাইল', 'Downloadable Files')}
            centered={false}
          />

          <div className="space-y-3">
            {downloadItems.map((item) => (
              <Card key={item.id} padding="md" hover>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-neutral-800 truncate">
                        {t(item.title, item.titleEn)}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <button
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    aria-label={t('ডাউনলোড', 'Download')}
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('ডাউনলোড', 'Download')}</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
