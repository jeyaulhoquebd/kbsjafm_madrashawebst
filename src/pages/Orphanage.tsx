import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { orphanageInfo } from '../data/institution';
import { Link } from 'react-router-dom';
import { AlertCircle, Users, BookOpen, Home, Heart, ArrowRight } from 'lucide-react';

export default function Orphanage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('এতিমখানা', 'Orphanage')}
        subtitle={t(orphanageInfo.nameBn, orphanageInfo.nameEn)}
        breadcrumb={<Breadcrumb items={[{ label: t('এতিমখানা', 'Orphanage') }]} />}
      />

      {/* Verification Notice */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-8">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 font-medium mb-1">
                {t('গুরুত্বপূর্ণ তথ্য', 'Important Notice')}
              </p>
              <p className="text-xs text-amber-800">
                {t(
                  'নিম্নলিখিত তথ্যগুলো যাচাই সাপেক্ষে। সঠিক তথ্যের জন্য প্রতিষ্ঠান কর্তৃপক্ষের সাথে যোগাযোগ করুন।',
                  'The following information is pending verification. Please contact the institution authority for accurate information.'
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Introduction */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('পরিচিতি', 'Introduction')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-neutral-700 leading-relaxed">
                  {t(orphanageInfo.introductionBn, orphanageInfo.introductionEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Objectives */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('উদ্দেশ্য', 'Objectives')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-gold-700" />
              </div>
              <div>
                <p className="text-neutral-700 leading-relaxed">
                  {t(orphanageInfo.objectivesBn, orphanageInfo.objectivesEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Educational Support */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('শিক্ষা সহায়তা', 'Educational Support')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-neutral-700 leading-relaxed">
                  {t(orphanageInfo.educationalSupportBn, orphanageInfo.educationalSupportEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Accommodation */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আবাসন সুবিধা', 'Accommodation Facilities')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-neutral-700 leading-relaxed">
                  {t(orphanageInfo.accommodationBn, orphanageInfo.accommodationEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Contact Information */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('যোগাযোগ', 'Contact Information')}
            centered={false}
          />
          <Card padding="lg">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-neutral-700 min-w-[100px]">
                  {t('ফোন:', 'Phone:')}
                </span>
                <span className="text-sm text-neutral-600">
                  {orphanageInfo.contactInfo.phone}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-neutral-700 min-w-[100px]">
                  {t('ইমেইল:', 'Email:')}
                </span>
                <span className="text-sm text-neutral-600">
                  {orphanageInfo.contactInfo.email}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Inquiry Button */}
      <Section background="white">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/contact">
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              {t('জিজ্ঞাসা করুন', 'Make an Inquiry')}
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
