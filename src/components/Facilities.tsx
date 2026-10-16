import { useLanguage } from '../context/LanguageContext';
import { facilities } from '../data/institution';
import Section, { SectionHeader } from './ui/Section';
import Card from './ui/Card';
import { Building2, TreePine, DoorOpen, Maximize, Users, BookOpen, AlertCircle } from 'lucide-react';

export default function Facilities() {
  const { t } = useLanguage();

  const facilityItems = [
    {
      icon: <TreePine className="w-6 h-6" />,
      labelBn: 'মোট জমির পরিমাণ',
      labelEn: 'Total Land Area',
      value: facilities.landArea.value,
      unitBn: facilities.landArea.unit,
      unitEn: facilities.landArea.unitEn,
      verified: facilities.landArea.verified,
      note: facilities.landArea.note,
      noteEn: facilities.landArea.noteEn,
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      labelBn: 'খেলার মাঠ',
      labelEn: 'Playground Area',
      value: facilities.playgroundArea.value,
      unitBn: facilities.playgroundArea.unit,
      unitEn: facilities.playgroundArea.unitEn,
      verified: facilities.playgroundArea.verified,
      note: facilities.playgroundArea.note,
      noteEn: facilities.playgroundArea.noteEn,
    },
    {
      icon: <DoorOpen className="w-6 h-6" />,
      labelBn: 'মোট কক্ষ সংখ্যা',
      labelEn: 'Total Rooms',
      value: facilities.roomCount.value,
      unitBn: facilities.roomCount.unit,
      unitEn: facilities.roomCount.unitEn,
      verified: facilities.roomCount.verified,
      note: facilities.roomCount.note,
      noteEn: facilities.roomCount.noteEn,
    },
    {
      icon: <Maximize className="w-6 h-6" />,
      labelBn: 'মোট মেঝের ক্ষেত্রফল',
      labelEn: 'Total Floor Space',
      value: facilities.floorSpace.value,
      unitBn: facilities.floorSpace.unit,
      unitEn: facilities.floorSpace.unitEn,
      verified: facilities.floorSpace.verified,
      note: facilities.floorSpace.note,
      noteEn: facilities.floorSpace.noteEn,
    },
  ];

  return (
    <Section background="light">
      <SectionHeader
        title={t('প্রাতিষ্ঠানিক সুযোগ-সুবিধা', 'Institutional Facilities')}
        subtitle={t(
          'আমাদের প্রতিষ্ঠানের অবকাঠামো ও সুযোগ-সুবিধা',
          'Infrastructure and facilities of our institution'
        )}
      />

      {/* Verification Notice */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 font-medium mb-1">
              {t('গুরুত্বপূর্ণ তথ্য', 'Important Notice')}
            </p>
            <p className="text-xs text-amber-800">
              {t(
                'নিম্নলিখিত তথ্যগুলো প্রতিবেদন ভিত্তিক এবং প্রশাসনিক যাচাই সাপেক্ষে। সঠিক তথ্যের জন্য প্রতিষ্ঠান কর্তৃপক্ষের সাথে যোগাযোগ করুন।',
                'The following information is reported and subject to administrative verification. Please contact the institution authority for accurate information.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
        {facilityItems.map((item, index) => (
          <Card key={index} padding="lg" className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3">
              {item.icon}
            </div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              {t(item.labelBn, item.labelEn)}
            </h3>
            <div className="mb-2">
              <span className="text-2xl font-bold text-primary-900">{item.value}</span>
              <span className="text-sm text-neutral-600 ml-1">
                {t(item.unitBn, item.unitEn)}
              </span>
            </div>
            {!item.verified && (
              <p className="text-xs text-amber-600 italic mt-2">
                {t(item.note, item.noteEn)}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Additional Facilities */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Orphanage */}
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                {t('এতিমখানা', 'Orphanage')}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-2">
                {t(facilities.orphanage.descriptionBn, facilities.orphanage.descriptionEn)}
              </p>
              {!facilities.orphanage.verified && (
                <p className="text-xs text-amber-600 italic">
                  {t(facilities.orphanage.nameBn, facilities.orphanage.nameEn)}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Hifzkhana */}
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-2 font-bengali">
                {t('হিফজখানা', 'Hifzkhana')}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-2">
                {t(facilities.hifzkhana.descriptionBn, facilities.hifzkhana.descriptionEn)}
              </p>
              {!facilities.hifzkhana.verified && (
                <p className="text-xs text-amber-600 italic">
                  {t(facilities.hifzkhana.nameBn, facilities.hifzkhana.nameEn)}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
