import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Facilities from '../components/Facilities';
import { Link } from 'react-router-dom';
import {
  Building2,
  Target,
  Eye,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Heart,
  GraduationCap,
} from 'lucide-react';
import { institutionIdentity, principalInfo, brandAssets } from '../data/institution';

export default function About() {
  const { t } = useLanguage();

  const governingBodyMembers = [
    { name: 'সভাপতি', designation: 'পরিচালনা কমিটি', role: 'সভাপতি' },
    { name: 'মাওলানা মোহাম্মদ আবু ওছমান', designation: 'অধ্যক্ষ ও সদস্য সচিব', role: 'সদস্য সচিব' },
    { name: 'অভিভাবক প্রতিনিধি সদস্য', designation: 'পরিচালনা কমিটি', role: 'অভিভাবক প্রতিনিধি' },
    { name: 'শিক্ষক প্রতিনিধি সদস্য', designation: 'পরিচালনা কমিটি', role: 'শিক্ষক প্রতিনিধি' },
    { name: 'বিদ্যোৎসাহী সদস্য', designation: 'পরিচালনা কমিটি', role: 'বিদ্যোৎসাহী প্রতিনিধি' },
  ];

  return (
    <>
      <PageHeader
        title={t('মাদরাসার পরিচিতি', 'About the Madrasa')}
        subtitle={t('খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসার বিস্তারিত বিবরণ', 'Detailed institutional profile and heritage')}
        breadcrumb={<Breadcrumb items={[{ label: t('আমাদের সম্পর্কে', 'About Us') }]} />}
      />

      {/* Section 1: Overview & Background */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block mb-1">
                {t('পরিচিতি ও সূচনা', 'Introduction & Origins')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 font-bengali leading-tight mb-4">
                {t(institutionIdentity.nameBn, institutionIdentity.nameEn)}
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-bengali mb-4">
                {t(
                  'খাগড়াছড়ি জেলার সদর উপজেলার মনোরম পরিবেশে অবস্থিত খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসা একটি ঐতিহ্যবাহী ও প্রতিষ্ঠিত ইসলামী বিদ্যাপীঠ। ১৯৯১ সালে প্রতিষ্ঠিত হয়ে প্রতিষ্ঠানটি পাহাড়ি ও সমতল অঞ্চলের শিক্ষার্থীদের দ্বীনি ও আধুনিক শিক্ষার আলো ছড়িয়ে দিয়ে আসছে।',
                  'Established in 1991, Khagrachhari Baitush Sharaf Jabbaria Adarsha Fazil (Degree) Madrasa is a renowned Islamic institution dedicated to spreading Islamic and modern education across the hill tract region.'
                )}
              </p>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-bengali">
                {t(
                  'মাদরাসাটি কুরআন-সুন্নাহর মৌলিক শিক্ষার পাশাপাশি গণিত, বিজ্ঞান, তথ্যপ্রযুক্তি ও ভাষা শিক্ষার সুসমন্বয় ঘটিয়ে শিক্ষার্থীদের সৎ, যোগ্য, আত্মনির্ভরশীল ও মানবিক গুণাবলিসম্পন্ন নাগরিক হিসেবে গড়ে তুলতে প্রতিশ্রুতিবদ্ধ।',
                  'The madrasa harmonizes Islamic foundational teachings with mathematics, science, ICT, and languages, fostering competent, self-reliant, and morally upright citizens.'
                )}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border-4 border-primary-100">
              <img
                src={brandAssets.buildingPhoto}
                alt={institutionIdentity.nameBn}
                className="w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2: Vision, Mission & Philosophy */}
      <Section background="light">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title={t('লক্ষ্য, উদ্দেশ্য ও শিক্ষাদর্শন', 'Vision, Mission & Educational Philosophy')}
            subtitle={t('যে নীতি ও আর্দশের ওপর প্রতিষ্ঠিত আমাদের শিক্ষাব্যবস্থা', 'Core values and guiding principles')}
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Vision */}
            <Card hover padding="lg" className="border-primary-100 bg-white">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary-950 mb-2 font-bengali">
                {t('আমাদের দৃষ্টিভঙ্গি (Vision)', 'Our Vision')}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed font-bengali">
                {t(
                  'দ্বীনি ও আধুনিক শিক্ষার সমন্বয়ে জ্ঞানসমৃদ্ধ, নৈতিকতাবান, দায়িত্বশীল ও মানবিক গুণাবলিসম্পন্ন আদর্শ মুসলিম নাগরিক গড়ে তোলা—যারা সমাজের কল্যাণে এবং আখিরাতের কামিয়াবিতে অগ্রণী ভূমিকা রাখবে।',
                  'To cultivate enlightened, ethical, responsible, and humane Muslim citizens through the fusion of Islamic and modern education.'
                )}
              </p>
            </Card>

            {/* Mission */}
            <Card hover padding="lg" className="border-gold-200 bg-white">
              <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-primary-950 mb-2 font-bengali">
                {t('আমাদের লক্ষ্য (Mission)', 'Our Mission')}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed font-bengali">
                {t(
                  'শিক্ষার্থীদের ধর্মীয় অনুশাসন, চরিত্র গঠন, নিয়মানুবর্তিতা ও আধুনিক জ্ঞান অর্জনে উপযুক্ত ও আন্তরিক শিক্ষাদান পরিবেশ নিশ্চিত করা এবং উচ্চশিক্ষার সুষ্ঠু দ্বার উন্মোচন করা।',
                  'To provide a caring academic environment that nurtures religious discipline, moral character, and contemporary knowledge for academic excellence.'
                )}
              </p>
            </Card>
          </div>

          {/* Educational Philosophy */}
          <Card padding="lg" className="border-primary-100 bg-primary-50/70">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-primary-950 font-bengali mb-1.5">
                  {t('আমাদের শিক্ষাদর্শন', 'Educational Philosophy')}
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed font-bengali">
                  {t(
                    'প্রকৃত শিক্ষা হলো তাই যা মানুষের অন্তরকে আল্লাহর প্রতি অনুগত করে, সমাজে ন্যায় ও মানবিকতা প্রতিষ্ঠা করে এবং ইহকাল ও পরকালে মুক্তির পথ সুগম করে। এই দর্শনেই পরিচালিত হয় মাদরাসার প্রতিটি শিক্ষাকার্যক্রম।',
                    'True education is that which aligns the heart with obedience to Allah, establishes justice and compassion in society, and paves the path to salvation in both worlds.'
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 3: Facilities */}
      <Facilities />

      {/* Section 4: Governing Body */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('পরিচালনা কমিটি', 'Governing Body')}
            subtitle={t('মাদরাসার সুষ্ঠু প্রশাসন ও সার্বিক তত্ত্বাবধানে নিয়োজিত পরিচালনা পর্ষদ', 'Institutional administration and management committee')}
          />

          <Card padding="lg" className="border-neutral-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-bengali">
                <thead>
                  <tr className="border-b border-neutral-200 text-primary-900 bg-primary-50/60">
                    <th className="py-3 px-4 font-bold">{t('ক্রম', 'SL')}</th>
                    <th className="py-3 px-4 font-bold">{t('নাম / প্রতিনিধি', 'Name / Member')}</th>
                    <th className="py-3 px-4 font-bold">{t('পদবি', 'Designation')}</th>
                    <th className="py-3 px-4 font-bold">{t('দায়িত্ব', 'Role')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {governingBodyMembers.map((member, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-4 font-latin font-medium">{index + 1}</td>
                      <td className="py-3 px-4 font-semibold text-primary-950">{member.name}</td>
                      <td className="py-3 px-4">{member.designation}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                          {member.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-neutral-500 mt-4 italic">
              * মাদরাসা শিক্ষা বোর্ড ও সংশ্লিষ্ট কর্তৃপক্ষের অনুমোদনক্রমে গঠিত পরিচালনা পর্ষদ দ্বারা সার্বিক শিক্ষা ও প্রশাসনিক কার্যক্রম পরিচালিত হয়।
            </p>
          </Card>
        </div>
      </Section>

      {/* Section 5: Principal's Message & Links */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-primary-900 text-white rounded-2xl shadow">
            <div>
              <h3 className="text-lg font-bold font-bengali mb-1">
                {t('অধ্যক্ষের বাণী ও দিকনির্দেশনা পড়ুন', "Read Principal's Message")}
              </h3>
              <p className="text-xs sm:text-sm text-primary-200 font-bengali">
                {principalInfo.nameBn} - {principalInfo.designationBn}
              </p>
            </div>
            <Link to="/about/principal">
              <Button variant="gold" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                {t('অধ্যক্ষের বাণী', "Principal's Speech")}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
