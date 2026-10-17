import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { historicalTimelineList, institutionIdentity } from '../data/institution';
import { Calendar, Award, Star, History as HistoryIcon, BookOpen, ExternalLink } from 'lucide-react';

export default function History() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('ইতিহাস ও ঐতিহ্য', 'History & Heritage')}
        subtitle={t('খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসার প্রতিষ্ঠার পটভূমি ও ক্রমবিকাশ', 'Founding background and academic evolution')}
        breadcrumb={<Breadcrumb items={[
          { label: t('আমাদের সম্পর্কে', 'About Us'), href: '/about' },
          { label: t('ইতিহাস ও ঐতিহ্য', 'History & Heritage') }
        ]} />}
      />

      {/* Establishment Background */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('প্রতিষ্ঠার পটভূমি', 'Background of Establishment')}
            subtitle={t('পার্বত্য খাগড়াছড়িতে দ্বীনি শিক্ষার আলোকবর্তিকা', 'Lighting the lamp of Islamic knowledge in Khagrachhari')}
            centered={false}
          />

          <Card padding="lg" className="border-neutral-200 mb-8 bg-gradient-to-br from-white to-primary-50/20">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-3 font-bengali text-neutral-700 text-sm sm:text-base leading-relaxed">
                <p>
                  খাগড়াছড়ি জেলার সদর উপজেলার আরামবাগ এলাকায় ১৯৯১ সালের ১ জানুয়ারি শুভ পদার্পণ ঘটে খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসার। পার্বত্য অঞ্চলের মুসলিম জনগোষ্ঠীর মধ্যে বিশুদ্ধ দ্বীনি জ্ঞান প্রচার এবং সুবিধাবঞ্চিত শিশুদের শিক্ষার মূলধারায় সম্পৃক্ত করার মহৎ প্রত্যয়ে এই প্রতিষ্ঠান প্রতিষ্ঠিত হয়।
                </p>
                <p>
                  প্রতিষ্ঠালগ্ন থেকে স্থানীয় শিক্ষানুরাগী, ধর্মপ্রাণ ব্যক্তিবর্গ এবং বায়তুশ শরফ আনজুমনে ইত্তেহাদ বাংলাদেশের শুভানুধ্যায়ীদের ঐকান্তিক ত্যাগ ও পৃষ্ঠপোষকতায় এটি একটি পূর্ণাঙ্গ ফাজিল (ডিগ্রি) মাদরাসায় রূপান্তরিত হয়েছে।
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Founder & Inspirational Heritage */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('বায়তুশ শরফ ঐতিহ্য ও অনুপ্রেরণা', 'Baitush Sharaf Tradition & Inspiration')}
            subtitle={t('শাহ সুফী আলহাজ্ব হযরত মাওলানা মুহাম্মদ আব্দুল জব্বার (রহ.)-এর পুণ্যময় আদর্শ', 'The inspiring legacy of Shah Sufi Hazrat Maulana Muhammad Abdul Jabbar (Rah.)')}
            centered={false}
          />

          <Card padding="lg" className="border-gold-300 bg-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-950 font-bengali">
                  শাহ সুফী আলহাজ্ব হযরত মাওলানা মুহাম্মদ আব্দুল জব্বার (রহ.)
                </h3>
                <p className="text-xs text-gold-700 font-semibold mt-0.5">
                  আধ্যাত্মিক রাহবার ও সমাজসংস্কারক
                </p>
              </div>
            </div>

            <div className="space-y-3 font-bengali text-sm text-neutral-700 leading-relaxed">
              <p>
                বায়তুশ শরফের ঐতিহ্যবাহী আধ্যাত্মিক ধারা ও সমাজসেবামূলক শিক্ষা কার্যক্রমের অন্যতম পথিকৃৎ ছিলেন প্রখ্যাত আলেমে দ্বীন শাহ সুফী হযরত মাওলানা মুহাম্মদ আব্দুল জব্বার (রহ.)। তিনি আজীবন কুরআন-সুন্নাহর দাওয়াত, মানবকল্যাণ, এতিম-অসহায়দের পুনর্বাসন এবং ইসলামী শিক্ষাপ্রতিষ্ঠান গড়ে তোলার ক্ষেত্রে অনন্য অবদান রেখেছেন।
              </p>
              <p>
                এই আদর্শ ও প্রেরণাকে হৃদয়ে ধারণ করে পার্বত্য জনপদে দ্বীনের খেদমত ও সুনাগরিক গড়ে তোলার লক্ষ্যেই 'জব্বারিয়া' নামকরণে এই প্রতিষ্ঠানটির নামকরণ ও কর্মপরিকল্পনা প্রণীত হয়।
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-bengali">
                বায়তুশ শরফ ঐতিহ্য ও ইতিহাস সম্পর্কে বিস্তারিত জানুন:
              </span>
              <a
                href="https://baitushsharaf.org/timeline/2?language=bn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800"
              >
                <span>বায়তুশ শরফ ইতিহাস আর্কাইভ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* Historical Timeline */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('একাডেমিক অগ্রযাত্রার সময়রেখা', 'Academic Evolution Timeline')}
            subtitle={t('১৯৯১ সাল থেকে বর্তমান পর্যন্ত প্রতিষ্ঠানের মাইলফলকসমূহ', 'Milestones from 1991 to present')}
          />

          <div className="relative border-l-2 border-primary-200 ml-4 sm:ml-6 space-y-8 py-2">
            {historicalTimelineList.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 group">
                {/* Timeline node marker */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary-600 group-hover:border-gold-500 group-hover:scale-125 transition-all shadow-sm"></div>

                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-primary-950 font-bengali">
                      {t(item.titleBn, item.titleEn)}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-xs font-bold font-bengali">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 font-bengali leading-relaxed">
                    {t(item.descriptionBn, item.descriptionEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Official Recognition & Portals */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <Card padding="lg" className="border-primary-100 bg-primary-50/50">
            <h4 className="text-base font-bold text-primary-950 font-bengali mb-2">
              সরকারি প্রাতিষ্ঠানিক স্বীকৃতি ও পরিচিতি
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-700 font-bengali">
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <span className="font-semibold text-primary-800 block">ইআইআইএন (EIIN):</span>
                <span className="font-latin text-base font-bold text-neutral-900">{institutionIdentity.eiin}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <span className="font-semibold text-primary-800 block">শিক্ষা বোর্ড স্বীকৃতি:</span>
                <span>বাংলাদেশ মাদরাসা শিক্ষা বোর্ড ও ইসলামিক আরবি বিশ্ববিদ্যালয়</span>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
