import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { academicPrograms, departments } from '../data/mockData';
import { institutionIdentity } from '../data/institution';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Download,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Award,
} from 'lucide-react';

export default function Academics() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'programs' | 'departments' | 'routines' | 'boardLinks'>('programs');

  const boardLinks = [
    {
      title: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
      url: 'http://www.bmeb.gov.bd/',
      desc: 'দাখিল ও আলিম স্তরের কারিকুলাম, রেজিস্ট্রেশন ও বোর্ড নোটিশ',
    },
    {
      title: 'ইসলামিক আরবি বিশ্ববিদ্যালয় (IAU)',
      url: 'https://iau.edu.bd/',
      desc: 'ফাজিল (ডিগ্রি) ও কামিল স্তরের ফলাফল ও ভর্তি তথ্য',
    },
    {
      title: 'মাদরাসা শিক্ষা অধিদপ্তর (DME)',
      url: 'http://www.dme.gov.bd/',
      desc: 'মাদরাসা শিক্ষক ও শিক্ষার্থীদের জাতীয় নির্দেশনা ও বৃত্তি তথ্য',
    },
    {
      title: 'ই-বোর্ড মাদরাসা পোর্টাল (EIIN 131810)',
      url: institutionIdentity.ebmebUrl,
      desc: 'খাগড়াছড়ি বায়তুশ শরফ মাদরাসার অফিসিয়াল সরকারি ই-বোর্ড প্রোফাইল',
    },
  ];

  return (
    <>
      <PageHeader
        title={t('একাডেমিক কার্যক্রম', 'Academic Programs & Activities')}
        subtitle={t('ইবতেদায়ি থেকে ফাজিল (ডিগ্রি) এবং হিফজুল কুরআন বিভাগের সার্বিক শিক্ষাকার্যক্রম', 'Comprehensive education from primary to degree and Hifz levels')}
        breadcrumb={<Breadcrumb items={[{ label: t('একাডেমিক', 'Academics') }]} />}
      />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto py-2.5 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-bengali ${activeTab === 'programs' ? 'bg-primary-700 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              {t('শিক্ষাকার্যক্রমসমূহ', 'Academic Programs')}
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-bengali ${activeTab === 'departments' ? 'bg-primary-700 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              {t('বিভাগ ও বিষয়সমূহ', 'Departments & Subjects')}
            </button>
            <button
              onClick={() => setActiveTab('routines')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-bengali ${activeTab === 'routines' ? 'bg-primary-700 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              {t('রুটিন ও ক্যালেন্ডার', 'Routines & Calendar')}
            </button>
            <button
              onClick={() => setActiveTab('boardLinks')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-bengali ${activeTab === 'boardLinks' ? 'bg-primary-700 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              {t('শিক্ষা বোর্ডের লিংক', 'Education Board Links')}
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ACADEMIC PROGRAMS */}
      {activeTab === 'programs' && (
        <Section background="white">
          <SectionHeader
            title={t('অনুমোদিত শিক্ষাকার্যক্রমসমূহ', 'Authorized Academic Programs')}
            subtitle={t('বাংলাদেশ মাদরাসা শিক্ষা বোর্ড ও ইসলামিক আরবি বিশ্ববিদ্যালয় অনুমোদিত কোর্সসমূহ', 'Courses approved by BMEB and Islamic Arabic University')}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {academicPrograms.map((program) => (
              <Card key={program.id} hover padding="lg" className="border-neutral-200 flex flex-col justify-between h-full bg-white">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-primary-50 text-primary-800 border border-primary-200">
                      {t(program.level, program.levelEn)}
                    </span>
                    <span className="text-xs text-neutral-500 font-latin">
                      {t(program.duration, program.durationEn)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary-950 font-bengali mb-2">
                    {t(program.name, program.nameEn)}
                  </h3>

                  <p className="text-sm text-neutral-600 font-bengali leading-relaxed mb-4">
                    {t(program.description, program.descriptionEn)}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-700 font-bengali mb-4">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                      <span>বিশুদ্ধ কুরআন-হাদিস ও তাজবিদ শিক্ষা</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                      <span>জাতীয় শিক্ষাক্রম অনুযায়ী বাংলা, ইংরেজি ও গণিত</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                      <span>নৈতিক চরিত্রগঠন ও বাস্তবমুখী প্রশিক্ষণ</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to="/admission"
                    className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
                  >
                    <span>{t('ভর্তি যোগ্যতা ও তথ্য', 'Admission Details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* TAB 2: DEPARTMENTS */}
      {activeTab === 'departments' && (
        <Section background="white">
          <SectionHeader
            title={t('বিভাগ ও বিষয়সমূহ', 'Departments & Academic Faculties')}
            subtitle={t('দ্বীনি ও সাধারণ শিক্ষার সমন্বিত বিভাগসমূহ', 'Specialized departments for comprehensive learning')}
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {departments.map((dept) => (
              <Card key={dept.id} hover padding="lg" className="border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-950 font-bengali mb-1">
                      {t(dept.name, dept.nameEn)}
                    </h3>
                    <p className="text-sm text-neutral-600 font-bengali leading-relaxed mb-3">
                      {t(dept.description, dept.descriptionEn)}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-neutral-500 font-bengali">
                      <span className="px-2 py-0.5 rounded bg-neutral-100">অভিজ্ঞ শিক্ষক পরিষদ</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-100">নিয়মিত পরীক্ষা ও মূল্যায়ন</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* TAB 3: ROUTINES & CALENDAR */}
      {activeTab === 'routines' && (
        <Section background="white">
          <SectionHeader
            title={t('রুটিন ও শিক্ষা পঞ্জিকা', 'Class Routines & Academic Calendar')}
            subtitle={t('সাপ্তাহিক ক্লাসের সময়সূচি ও বাৎসরিক ছুটির তালিকা', 'Weekly timetables and annual schedule')}
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Class Routine */}
            <Card hover padding="lg" className="border-neutral-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-primary-950 font-bengali mb-1">
                  {t('ক্লাস রুটিন', 'Class Routine')}
                </h3>
                <p className="text-xs text-neutral-600 font-bengali mb-4">
                  ইবতেদায়ি, দাখিল ও আলিম শ্রেণির সাপ্তাহিক ক্লাস সময়সূচি।
                </p>
              </div>
              <Link to="/downloads">
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} className="w-full">
                  {t('রুটিন ডাউনলোড', 'Download Routine')}
                </Button>
              </Link>
            </Card>

            {/* Exam Routine */}
            <Card hover padding="lg" className="border-neutral-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-primary-950 font-bengali mb-1">
                  {t('পরীক্ষার রুটিন', 'Exam Routine')}
                </h3>
                <p className="text-xs text-neutral-600 font-bengali mb-4">
                  অর্ধ-বার্ষিক, বার্ষিক ও নির্বাচনী পরীক্ষার সময়সূচি।
                </p>
              </div>
              <Link to="/downloads">
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} className="w-full">
                  {t('পরীক্ষার রুটিন দেখুন', 'View Exam Routine')}
                </Button>
              </Link>
            </Card>

            {/* Academic Calendar */}
            <Card hover padding="lg" className="border-neutral-200 text-center flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-primary-950 font-bengali mb-1">
                  {t('শিক্ষা পঞ্জিকা ২০২৬', 'Academic Calendar 2026')}
                </h3>
                <p className="text-xs text-neutral-600 font-bengali mb-4">
                  সম্পূর্ণ শিক্ষাবর্ষের ছুটির তালিকা ও শিক্ষা কার্যক্রমের ক্যালেন্ডার।
                </p>
              </div>
              <Link to="/downloads">
                <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />} className="w-full">
                  {t('ক্যালেন্ডার ডাউনলোড', 'Download Calendar')}
                </Button>
              </Link>
            </Card>
          </div>
        </Section>
      )}

      {/* TAB 4: BOARD LINKS */}
      {activeTab === 'boardLinks' && (
        <Section background="white">
          <SectionHeader
            title={t('শিক্ষা বোর্ড ও প্রাতিষ্ঠানিক পোর্টাল', 'Education Board & Institutional Links')}
            subtitle={t('জাতীয় মাদরাসা শিক্ষা সংক্রান্ত গুরুত্বপূর্ণ অফিশিয়াল পোর্টালসমূহ', 'Official national portals')}
          />

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {boardLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all bg-white group flex items-start justify-between gap-4"
              >
                <div>
                  <h4 className="text-base font-bold text-primary-950 font-bengali group-hover:text-primary-700 transition-colors mb-1">
                    {link.title}
                  </h4>
                  <p className="text-xs text-neutral-600 font-bengali leading-relaxed">
                    {link.desc}
                  </p>
                  <span className="inline-block text-[11px] text-primary-700 font-latin mt-2 group-hover:underline">
                    {link.url}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-700 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
