import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from './ui/Section';
import Card from './ui/Card';
import { Building2, TreePine, DoorOpen, BookOpen, Users, Award, ShieldCheck, Heart } from 'lucide-react';

export default function Facilities() {
  const { t } = useLanguage();

  const facilitiesList = [
    {
      icon: <Building2 className="w-6 h-6 text-primary-700" />,
      titleBn: 'আধুনিক একাডেমিক ভবন',
      titleEn: 'Modern Academic Building',
      descBn: 'সুপরিসর শ্রেণিকক্ষ, পর্যাপ্ত আলো-বাতাস এবং সুশৃঙ্খল পাঠদানের মনোরম ক্যাম্পাস।',
      descEn: 'Spacious classrooms with natural ventilation and a peaceful learning environment.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary-700" />,
      titleBn: 'ইসলামিক ও সাধারণ লাইব্রেরি',
      titleEn: 'Islamic & General Library',
      descBn: 'কুরআন, হাদিস, ফিকহ, আরবি সাহিত্য ও আধুনিক পাঠ্যবই সমৃদ্ধ পাঠকক্ষ।',
      descEn: 'Well-stocked library featuring classical Islamic texts, Arabic literature, and modern reference books.',
    },
    {
      icon: <TreePine className="w-6 h-6 text-primary-700" />,
      titleBn: 'খেলার মাঠ ও উন্মুক্ত প্রাঙ্গণ',
      titleEn: 'Playground & Open Campus',
      descBn: 'শিক্ষার্থীদের শারীরিক বিকাশ, দৈনিক সমাবেশ ও সহশিক্ষা কার্যক্রমের জন্য উন্মুক্ত প্রাঙ্গণ।',
      descEn: 'Open playground for daily assemblies, physical recreation, and extracurricular activities.',
    },
    {
      icon: <Heart className="w-6 h-6 text-primary-700" />,
      titleBn: 'বায়তুশ শরফ এতিমখানা',
      titleEn: 'Baitush Sharaf Orphanage',
      descBn: 'পিতৃহীন ও সুবিধাবঞ্চিত শিশুদের স্নেহপূর্ণ আবাসিক পরিচর্যা ও শিক্ষা সহায়তা।',
      descEn: 'Dedicated residential care, welfare, and educational patronage for orphaned children.',
    },
    {
      icon: <Award className="w-6 h-6 text-gold-700" />,
      titleBn: 'জব্বারিয়া হেফজখানা বিভাগ',
      titleEn: 'Jabbaria Hifzkhana Section',
      descBn: 'অভিজ্ঞ হাফেজগণের নিবিড় তত্ত্বাবধানে সহীহ তাজবিদসহ পূর্ণাঙ্গ কুরআন হিফজ।',
      descEn: 'Specialized Quran memorization section under certified Huffaz with proper Tajweed.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary-700" />,
      titleBn: 'নিরাপদ ও সুশৃঙ্খল পরিবেশ',
      titleEn: 'Safe & Disciplined Environment',
      descBn: 'ইসলামী অনুশাসন, নৈতিক মূল্যবোধ ও নিবিড় শিক্ষকমণ্ডলীর তত্ত্বাবধান।',
      descEn: 'Strict adherence to Islamic decorum, safety, and close pastoral teacher mentorship.',
    },
  ];

  return (
    <Section background="light">
      <SectionHeader
        title={t('প্রাতিষ্ঠানিক সুযোগ-সুবিধা', 'Institutional Facilities')}
        subtitle={t('আমাদের প্রতিষ্ঠানের অবকাঠামো ও শিক্ষা পরিবেশ', 'Campus infrastructure and learning facilities')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {facilitiesList.map((item, index) => (
          <Card key={index} padding="lg" hover className="border-neutral-200 bg-white">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 mb-4">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-primary-950 mb-2 font-bengali">
              {t(item.titleBn, item.titleEn)}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-bengali">
              {t(item.descBn, item.descEn)}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
