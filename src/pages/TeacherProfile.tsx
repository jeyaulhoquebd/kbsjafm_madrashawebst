import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { demoTeachers } from '../data/mockData';
import { User, Mail, Phone, BookOpen, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function TeacherProfile() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const teacher = demoTeachers.find((t) => t.id === id);

  if (!teacher) {
    return (
      <>
        <PageHeader
          title={t('শিক্ষক পাওয়া যায়নি', 'Teacher Not Found')}
          breadcrumb={<Breadcrumb items={[{ label: t('শিক্ষকবৃন্দ', 'Teachers'), href: '/teachers' }, { label: t('পাওয়া যায়নি', 'Not Found') }]} />}
        />
        <Section background="white">
          <div className="max-w-2xl mx-auto text-center py-12">
            <p className="text-neutral-600 mb-4">{t('এই শিক্ষকের তথ্য পাওয়া যায়নি', 'This teacher profile was not found')}</p>
            <Link to="/teachers">
              <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
                {t('শিক্ষক তালিকায় ফিরে যান', 'Back to Teachers')}
              </Button>
            </Link>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={t(teacher.name, teacher.nameEn)}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: t('শিক্ষকবৃন্দ', 'Teachers'), href: '/teachers' },
              { label: t(teacher.name, teacher.nameEn) },
            ]}
          />
        }
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Photo */}
            <div className="md:col-span-1">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt={t(teacher.name, teacher.nameEn)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center p-4">
                    <User className="w-16 h-16 text-primary-400 mx-auto mb-3" />
                    <p className="text-sm text-primary-500">{t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-primary-900 font-bengali mb-1">
                {t(teacher.name, teacher.nameEn)}
              </h2>
              <p className="text-lg text-primary-700 mb-4">{t(teacher.designation, teacher.designationEn)}</p>

              <Card padding="lg" className="mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500">{t('বিভাগ', 'Department')}</p>
                      <p className="text-sm font-medium text-neutral-800">{t(teacher.department, teacher.departmentEn)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500">{t('ইমেইল', 'Email')}</p>
                      <p className="text-sm text-neutral-800">{t('[ইমেইল - সম্পাদনাযোগ্য]', '[Email - Editable]')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500">{t('ফোন', 'Phone')}</p>
                      <p className="text-sm text-neutral-800">{t('[ফোন - সম্পাদনাযোগ্য]', '[Phone - Editable]')}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">{t('পরিচিতি', 'Introduction')}</h3>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {t(
                    '[শিক্ষকের সংক্ষিপ্ত পরিচিতি এখানে বসবে - সম্পাদনাযোগ্য]',
                    '[Brief introduction of the teacher will be placed here - Editable]'
                  )}
                </p>
              </div>

              <div className="mt-6">
                <Link to="/teachers">
                  <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                    {t('সকল শিক্ষক দেখুন', 'View All Teachers')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
