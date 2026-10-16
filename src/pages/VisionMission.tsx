import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { visionMissionValues } from '../data/institution';
import { Eye, Target, Heart, Shield, BookOpen, Users, Globe, Award } from 'lucide-react';

export default function VisionMission() {
  const { t } = useLanguage();

  const coreValueIcons = [
    Heart, Shield, BookOpen, Users, Globe, Award, Target, Eye
  ];

  return (
    <>
      <PageHeader
        title={t('আমাদের লক্ষ্য, উদ্দেশ্য ও মূলনীতি', 'Vision, Mission & Core Values')}
        subtitle={t('প্রতিষ্ঠানের দিকনির্দেশনা ও মূল আদর্শ', 'Guiding principles and core values of the institution')}
        breadcrumb={<Breadcrumb items={[
          { label: t('আমাদের সম্পর্কে', 'About Us'), href: '/about' },
          { label: t('লক্ষ্য ও উদ্দেশ্য', 'Vision & Mission') }
        ]} />}
      />

      {/* Vision */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আমাদের দৃষ্টিভঙ্গি', 'Our Vision')}
            centered={false}
          />
          <Card padding="lg" className="border-l-4 border-l-primary-600">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary-700" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-neutral-800 leading-relaxed font-bengali">
                  {t(visionMissionValues.vision.bn, visionMissionValues.vision.en)}
                </p>
                {visionMissionValues.vision.status === 'draft' && (
                  <p className="text-xs text-amber-600 italic mt-3">
                    {t('[খসড়া - প্রতিষ্ঠানের অনুমোদন সাপেক্ষে]', '[Draft - Pending institutional approval]')}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Mission */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আমাদের লক্ষ্য', 'Our Mission')}
            centered={false}
          />
          <Card padding="lg" className="border-l-4 border-l-gold-600">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-gold-700" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-neutral-800 leading-relaxed font-bengali">
                  {t(visionMissionValues.mission.bn, visionMissionValues.mission.en)}
                </p>
                {visionMissionValues.mission.status === 'draft' && (
                  <p className="text-xs text-amber-600 italic mt-3">
                    {t('[খসড়া - প্রতিষ্ঠানের অনুমোদন সাপেক্ষে]', '[Draft - Pending institutional approval]')}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title={t('আমাদের মূলনীতি', 'Our Core Values')}
            subtitle={t('যে আদর্শগুলো আমাদের পরিচালিত করে', 'The principles that guide us')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visionMissionValues.coreValues.map((value, index) => {
              const Icon = coreValueIcons[index % coreValueIcons.length];
              return (
                <Card key={index} padding="lg" hover className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary-900 font-bengali">
                    {t(value.bn, value.en)}
                  </h3>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Commitment Statement */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আমাদের অঙ্গীকার', 'Our Commitment')}
            centered={false}
          />
          <Card padding="lg">
            <p className="text-neutral-700 leading-relaxed text-center">
              {t(
                'আমরা বিশ্বাস করি, শিক্ষা হলো সেই আলো যা মানুষের জীবনকে আলোকিত করে। আমাদের এই প্রতিষ্ঠান শুধু জ্ঞান অর্জনের স্থান নয়, বরং চরিত্র গঠন, নৈতিকতা বিকাশ এবং মানবিক মূল্যবোধ প্রতিষ্ঠার কেন্দ্র। আমরা প্রতিটি শিক্ষার্থীকে এমনভাবে গড়ে তুলতে চাই যারা সমাজে ইতিবাচক অবদান রাখতে পারে এবং আল্লাহর নৈকট্যশীল হতে পারে।',
                'We believe that education is the light that illuminates human life. Our institution is not just a place for acquiring knowledge, but a center for character building, ethical development, and establishment of human values. We want to shape every student in such a way that they can contribute positively to society and become closer to Allah.'
              )}
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
