import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Eye, Target, Heart, Shield, BookOpen, Users, Globe, Award, Sparkles } from 'lucide-react';
import { institutionIdentity } from '../data/institution';

export default function VisionMission() {
  const { t } = useLanguage();

  const coreValues = [
    { bn: 'ইসলামী মূল্যবোধ', en: 'Islamic Values', icon: Heart, desc: 'কুরআন ও সুন্নাহর আলোকে চরিত্র ও জীবনের প্রতিটি পদক্ষেপে ঈমানী দৃঢ়তা।' },
    { bn: 'জ্ঞান ও প্রজ্ঞা', en: 'Knowledge & Wisdom', icon: BookOpen, desc: 'দ্বীনি ইলম ও সমকালীন আধুনিক শিক্ষার সমন্বয়ে প্রজ্ঞাবান ব্যক্তিত্ব গঠন।' },
    { bn: 'সততা ও নৈতিকতা', en: 'Honesty & Ethics', icon: Shield, desc: 'ব্যক্তিগত ও সামাজিক জীবনে আমানতদারিতা, সততা ও সুবিচার প্রতিষ্ঠা।' },
    { bn: 'শৃঙ্খলা ও দায়িত্বশীলতা', en: 'Discipline & Duty', icon: Target, desc: 'শিক্ষাঙ্গনে ও কর্মক্ষেত্রে নিয়মানুবর্তিতা এবং সমাজ ও রাষ্ট্রের প্রতি দায়বদ্ধতা।' },
    { bn: 'মানবসেবা ও সহমর্মিতা', en: 'Compassion & Service', icon: Users, desc: 'এতিম, অসহায় ও সুবিধাবঞ্চিত মানুষের প্রতি স্নেহ, মমতা ও নিঃস্বার্থ সেবা।' },
    { bn: 'দেশ ও সমাজের কল্যাণ', en: 'Welfare of Society', icon: Globe, desc: 'মাতৃভূমির অগ্রগতি ও শান্তিপূর্ণ সমাজ বিনির্মাণে ইতিবাচক ভূমিকা পালন।' },
    { bn: 'জ্ঞানচর্চা ও ব্যক্তিত্ব বিকাশ', en: 'Self Development', icon: Award, desc: 'সৃজনশীল মেধা, বাগ্মিতা, নেতৃত্বগুণ ও সুকুমার বৃত্তির বিকাশসাধন।' },
    { bn: 'পরোপকার ও আন্তরিকতা', en: 'Altruism & Sincerity', icon: Sparkles, desc: 'সকল কাজে একমাত্র আল্লাহর সন্তুষ্টি অর্জন ও ইখলাসের চর্চা।' },
  ];

  return (
    <>
      <PageHeader
        title={t('লক্ষ্য, উদ্দেশ্য ও মূলনীতি', 'Vision, Mission & Core Values')}
        subtitle={t('খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসার মূল দর্শন', 'Guiding principles and foundational philosophy')}
        breadcrumb={<Breadcrumb items={[
          { label: t('আমাদের সম্পর্কে', 'About Us'), href: '/about' },
          { label: t('লক্ষ্য ও উদ্দেশ্য', 'Vision & Mission') }
        ]} />}
      />

      {/* Vision */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আমাদের দৃষ্টিভঙ্গি (Vision)', 'Our Vision')}
            subtitle={t('সুদূরপ্রসারী লক্ষ্য ও স্বপ্নের রূপরেখা', 'Our overarching future vision')}
            centered={false}
          />
          <Card padding="lg" className="border-l-4 border-l-primary-700 bg-gradient-to-r from-primary-50/50 to-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary-950 font-bengali mb-2">
                  দ্বীনি ও আধুনিক শিক্ষার সমন্বয়ে আদর্শ প্রজন্ম গঠন
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed font-bengali">
                  দ্বীনি ও আধুনিক শিক্ষার সমন্বয়ে এমন একটি জ্ঞানসমৃদ্ধ, নৈতিকতাবান, শৃঙ্খলাবদ্ধ ও মানবিক মূল্যবোধসম্পন্ন প্রজন্ম গড়ে তোলা—যারা কুরআনিক আলোয় জীবন পরিচালনা করবে এবং সমাজ ও দেশের কল্যাণে দায়িত্বশীল ভূমিকা রাখবে।
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Mission */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('আমাদের লক্ষ্য (Mission)', 'Our Mission')}
            subtitle={t('লক্ষ্য বাস্তবায়নে আমাদের কর্মপরিকল্পনা', 'Our core mission in action')}
            centered={false}
          />
          <Card padding="lg" className="border-l-4 border-l-gold-500 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary-950 font-bengali mb-2">
                  মানসম্মত শিক্ষাদান ও নৈতিক চরিত্রগঠন
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed font-bengali">
                  শিক্ষার্থীদের বিশুদ্ধ কুরআন পাঠ, সুন্নাহর অনুসরণ, আরবি ও বাংলা-ইংরেজি ভাষা দক্ষতা, গণিত ও তথ্যপ্রযুক্তিতে দক্ষ করে গড়ে তোলা; পাশাপাশি নিরাপদ ও স্নেহপূর্ণ পরিবেশে সুবিধাবঞ্চিত এতিম ও হেফজ শিক্ষার্থীদের পূর্ণাঙ্গ প্রতিপালন নিশ্চিত করা।
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={t('আমাদের মূলনীতি ও আদর্শসমূহ', 'Our Core Values')}
            subtitle={t('যে সুমহান মূল্যবোধে পরিচালিত হয় আমাদের প্রতিটি পদক্ষেপ', 'Foundational pillars of our educational community')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} padding="lg" hover className="text-center h-full flex flex-col justify-between border-neutral-200">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-800 mb-3.5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-primary-950 font-bengali mb-1.5">
                      {t(value.bn, value.en)}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-bengali">
                      {value.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Commitment Banner */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary-950 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-md">
            <h4 className="text-xl font-bold font-bengali text-gold-300">
              {t(institutionIdentity.mottoBn, institutionIdentity.mottoEn)}
            </h4>
            <p className="text-sm sm:text-base text-primary-100 leading-relaxed font-bengali max-w-2xl mx-auto">
              খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসা প্রতিজ্ঞাবদ্ধ—এখানে প্রতিটি শিক্ষার্থী কেবল পরীক্ষার্থী নয়, বরং আল্লাহর জমিনে ইনসাফ ও কল্যাণের অগ্রদূত।
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
