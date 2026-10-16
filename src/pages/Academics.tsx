import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { academicPrograms } from '../data/institution';
import { GraduationCap, Calendar, Clock, BookOpen, Download, ArrowRight, AlertCircle } from 'lucide-react';

export default function Academics() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('একাডেমিক', 'Academics')}
        subtitle={t('শিক্ষা কার্যক্রম ও বিভাগসমূহ', 'Academic programs and departments')}
        breadcrumb={<Breadcrumb items={[{ label: t('একাডেমিক', 'Academics') }]} />}
      />

      {/* Academic Programs */}
      <Section background="white">
        <SectionHeader
          title={t('শিক্ষা কার্যক্রম', 'Academic Programs')}
          subtitle={t('আমাদের প্রতিষ্ঠানে প্রদত্ত শিক্ষা কার্যক্রমসমূহ', 'Educational programs offered at our institution')}
        />

        {/* Verification Notice */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 font-medium mb-1">
                {t('গুরুত্বপূর্ণ তথ্য', 'Important Notice')}
              </p>
              <p className="text-xs text-amber-800">
                {t(
                  'প্রতিষ্ঠানের প্রকৃত বর্তমান প্রোগ্রাম এবং অধিভুক্তি যাচাই করার আগে এই তথ্যগুলো খসড়া হিসেবে বিবেচিত।',
                  'The actual current programs and affiliations of the institution are considered drafts until verified.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {Object.entries(academicPrograms).map(([key, program]) => (
            <Card key={key} hover padding="lg" className="relative">
              {program.status === 'draft' && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                    {t('খসড়া', 'Draft')}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 font-bengali">{t(program.nameBn, program.nameEn)}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{t(program.levelBn, program.levelEn)}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-3">{t(program.descriptionBn, program.descriptionEn)}</p>
              <div className="flex items-center gap-2 text-xs text-primary-700 bg-primary-50 rounded-lg px-3 py-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('সময়কাল:', 'Duration:')} {t(program.durationBn, program.durationEn)}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Academic Calendar */}
      <Section background="light">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('শিক্ষা ক্যালেন্ডার', 'Academic Calendar')} centered={false} />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t('[শিক্ষা ক্যালেন্ডার - সম্পাদনাযোগ্য]', '[Academic Calendar - Editable]')}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {t(
                    '[শিক্ষা ক্যালেন্ডারের বিস্তারিত তথ্য এখানে বসবে - সম্পাদনাযোগ্য। ক্লাস শুরুর তারিখ, পরীক্ষার সময়সূচী, ছুটির তালিকা ইত্যাদি।]',
                    '[Detailed academic calendar information will be placed here - Editable. Class start dates, exam schedules, holiday lists, etc.]'
                  )}
                </p>
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                  {t('ক্যালেন্ডার ডাউনলোড', 'Download Calendar')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Class & Exam Routines */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card padding="lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 font-bengali">{t('ক্লাস রুটিন', 'Class Routine')}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{t('সাপ্তাহিক ক্লাসের সময়সূচী', 'Weekly class schedule')}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {t(
                  '[ক্লাস রুটিনের তথ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Class routine information will be placed here - Editable]'
                )}
              </p>
              <Link to="/academics/routine">
                <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('বিস্তারিত দেখুন', 'View Details')}
                </Button>
              </Link>
            </Card>

            <Card padding="lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 font-bengali">{t('পরীক্ষার রুটিন', 'Exam Routine')}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{t('পরীক্ষার সময়সূচী', 'Exam schedule')}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                {t(
                  '[পরীক্ষার রুটিনের তথ্য এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Exam routine information will be placed here - Editable]'
                )}
              </p>
              <Link to="/academics/exam-routine">
                <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('বিস্তারিত দেখুন', 'View Details')}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Section>

      {/* Syllabus */}
      <Section background="light">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('সিলেবাস ও পাঠ্যক্রম', 'Syllabus & Curriculum')} centered={false} />
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <p className="text-neutral-600 text-sm mb-4">
              {t(
                '[সিলেবাস ও পাঠ্যক্রমের তথ্য এখানে বসবে - সম্পাদনাযোগ্য। বিভিন্ন শ্রেণির সিলেবাস ডাউনলোড করা যাবে।]',
                '[Syllabus and curriculum information will be placed here - Editable. Syllabus for different classes can be downloaded.]'
              )}
            </p>
            <Link to="/downloads">
              <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />}>
                {t('সিলেবাস ডাউনলোড', 'Download Syllabus')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
