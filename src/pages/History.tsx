import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { historicalInfo } from '../data/institution';
import { AlertCircle, Calendar, User, Award } from 'lucide-react';

export default function History() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('মাদরাসার ইতিহাস ও ঐতিহ্য', 'History & Heritage')}
        subtitle={t('প্রতিষ্ঠানের গৌরবোজ্জ্বল ইতিহাস ও ঐতিহ্য', 'The glorious history and heritage of the institution')}
        breadcrumb={<Breadcrumb items={[
          { label: t('আমাদের সম্পর্কে', 'About Us'), href: '/about' },
          { label: t('ইতিহাস ও ঐতিহ্য', 'History & Heritage') }
        ]} />}
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
                  'নিম্নলিখিত ঐতিহাসিক তথ্যগুলো যাচাই সাপেক্ষে। সঠিক তথ্যের জন্য প্রতিষ্ঠান কর্তৃপক্ষের সাথে যোগাযোগ করুন বা সরকারি নথি দেখুন।',
                  'The following historical information is pending verification. Please contact the institution authority or refer to official documents for accurate information.'
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Establishment Background */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('প্রতিষ্ঠার পটভূমি', 'Background of Establishment')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t(historicalInfo.establishmentDate.date, historicalInfo.establishmentDate.dateEn)}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  {t(
                    '[প্রতিষ্ঠার পটভূমি সম্পর্কে বিস্তারিত বিবরণ এখানে বসবে - যাচাই সাপেক্ষে]',
                    '[Detailed description about the background of establishment will be placed here - Pending verification]'
                  )}
                </p>
                <p className="text-xs text-amber-600 italic">
                  {t(historicalInfo.establishmentDate.note, historicalInfo.establishmentDate.noteEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Founder & Inspiration */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('প্রতিষ্ঠাতা ও অনুপ্রেরণা', 'Founder & Inspiration')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gold-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t(historicalInfo.inspirationalFigure.nameBn, historicalInfo.inspirationalFigure.nameEn)}
                </h3>
                <p className="text-sm text-gold-700 mb-3">
                  {t(historicalInfo.inspirationalFigure.roleBn, historicalInfo.inspirationalFigure.roleEn)}
                </p>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  {t(
                    '[প্রতিষ্ঠাতা বা অনুপ্রেরণাদায়ক ব্যক্তিত্ব সম্পর্কে বিস্তারিত বিবরণ এখানে বসবে - যাচাই সাপেক্ষে]',
                    '[Detailed description about the founder or inspirational figure will be placed here - Pending verification]'
                  )}
                </p>
                <p className="text-xs text-amber-600 italic">
                  {t(historicalInfo.inspirationalFigure.note, historicalInfo.inspirationalFigure.noteEn)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Tradition Association */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('ঐতিহ্য ও সম্পর্ক', 'Tradition & Association')}
            centered={false}
          />
          <Card padding="lg">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                  {t(historicalInfo.traditionAssociation.nameBn, historicalInfo.traditionAssociation.nameEn)}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  {t(historicalInfo.traditionAssociation.descriptionBn, historicalInfo.traditionAssociation.descriptionEn)}
                </p>
                <p className="text-xs text-amber-600 italic">
                  {t(historicalInfo.traditionAssociation.status === 'pending_verification' ? '[যাচাই সাপেক্ষে]' : '[Pending verification]', 
                     historicalInfo.traditionAssociation.status === 'pending_verification' ? '[Pending verification]' : '[Pending verification]')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Academic Development Timeline */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('একাডেমিক উন্নয়ন', 'Academic Development')}
            subtitle={t('প্রতিষ্ঠানের একাডেমিক অগ্রযাত্রা', 'The academic journey of the institution')}
          />
          <div className="space-y-4">
            {historicalInfo.academicTimeline.map((item, index) => (
              <Card key={index} padding="md" className="border-l-4 border-l-primary-600">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-700">
                        {t(item.year, item.yearEn)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                      {t(item.eventBn, item.eventEn)}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed mb-2">
                      {t(item.descriptionBn, item.descriptionEn)}
                    </p>
                    {item.status === 'pending_verification' && (
                      <p className="text-xs text-amber-600 italic">
                        {t('[যাচাই সাপেক্ষে]', '[Pending verification]')}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Future Plans */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('বর্তমান কার্যক্রম ও ভবিষ্যৎ পরিকল্পনা', 'Current Activities & Future Plans')}
            centered={false}
          />
          <Card padding="lg">
            <p className="text-neutral-700 leading-relaxed">
              {t(
                '[বর্তমান কার্যক্রম এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে বিস্তারিত বিবরণ এখানে বসবে - যাচাই সাপেক্ষে]',
                '[Detailed description about current activities and future plans will be placed here - Pending verification]'
              )}
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
