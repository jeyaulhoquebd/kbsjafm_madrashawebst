import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Download, FileText, ArrowRight, GraduationCap } from 'lucide-react';

export default function StudentCorner() {
  const { t } = useLanguage();

  const resources = [
    {
      icon: <Calendar className="w-6 h-6" />,
      titleBn: 'একাডেমিক ক্যালেন্ডার',
      titleEn: 'Academic Calendar',
      descBn: 'সম্পূর্ণ শিক্ষাবর্ষের সময়সূচী',
      descEn: 'Complete academic year schedule',
      href: '/academics/calendar',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      titleBn: 'ক্লাস রুটিন',
      titleEn: 'Class Routine',
      descBn: 'শ্রেণি ভিত্তিক ক্লাসের সময়সূচী',
      descEn: 'Class-wise schedule',
      href: '/academics/routine',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      titleBn: 'পরীক্ষার রুটিন',
      titleEn: 'Exam Routine',
      descBn: 'পরীক্ষার সময়সূচী',
      descEn: 'Examination schedule',
      href: '/academics/exam-routine',
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      titleBn: 'পরীক্ষার ফলাফল',
      titleEn: 'Exam Results',
      descBn: 'পরীক্ষার ফলাফল দেখুন',
      descEn: 'View examination results',
      href: '/results',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      titleBn: 'সিলেবাস',
      titleEn: 'Syllabus',
      descBn: 'বিষয় ভিত্তিক সিলেবাস',
      descEn: 'Subject-wise syllabus',
      href: '/academics/syllabus',
    },
    {
      icon: <Download className="w-6 h-6" />,
      titleBn: 'ডাউনলোড',
      titleEn: 'Downloads',
      descBn: 'প্রয়োজনীয় ফরম ও নথি',
      descEn: 'Necessary forms and documents',
      href: '/downloads',
    },
  ];

  return (
    <>
      <PageHeader
        title={t('শিক্ষার্থী কর্নার', 'Student Corner')}
        subtitle={t('শিক্ষার্থীদের জন্য প্রয়োজনীয় তথ্য ও সুবিধা', 'Essential information and resources for students')}
        breadcrumb={<Breadcrumb items={[{ label: t('শিক্ষার্থী কর্নার', 'Student Corner') }]} />}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={t('শিক্ষা সংক্রান্ত তথ্য', 'Academic Information')}
            subtitle={t('দ্রুত প্রবেশের জন্য শিক্ষা সংক্রান্ত সকল তথ্য', 'All academic information for quick access')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <Link key={index} to={resource.href}>
                <Card hover padding="lg" className="h-full group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-primary-900 font-bengali group-hover:text-primary-700 transition-colors">
                        {t(resource.titleBn, resource.titleEn)}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1">
                        {t(resource.descBn, resource.descEn)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-primary-600 font-medium">
                    <span>{t('বিস্তারিত দেখুন', 'View Details')}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Student Guidelines */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('শিক্ষার্থী নির্দেশিকা', 'Student Guidelines')}
            centered={false}
          />
          <Card padding="lg">
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                {t(
                  '[শিক্ষার্থী নির্দেশিকা এখানে বসবে - সম্পাদনাযোগ্য]',
                  '[Student guidelines will be placed here - Editable]'
                )}
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Important Notices for Students */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ নোটিশ', 'Important Notices for Students')}
            centered={false}
          />
          <Card padding="lg">
            <div className="text-center py-4">
              <Link to="/notices">
                <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('সকল নোটিশ দেখুন', 'View All Notices')}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
