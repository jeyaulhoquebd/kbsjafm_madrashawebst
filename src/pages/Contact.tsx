import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import { institutionInfo } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Header */}
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('যোগাযোগ', 'Contact Us')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'আমাদের সাথে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন',
              'Use the information below to contact us'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <SectionHeader
                title={t('যোগাযোগের তথ্য', 'Contact Information')}
                centered={false}
              />

              <div className="space-y-4">
                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">
                        {t('ঠিকানা', 'Address')}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {t(institutionInfo.address, institutionInfo.addressEn)}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">
                        {t('ফোন', 'Phone')}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {institutionInfo.phone}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">
                        {t('ইমেইল', 'Email')}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {institutionInfo.email}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">
                        {t('অফিস সময়', 'Office Hours')}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {t(
                          '[অফিস সময় - সম্পাদনাযোগ্য]',
                          '[Office hours - Editable]'
                        )}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">
                        {t('ওয়েবসাইট', 'Website')}
                      </h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        {institutionInfo.website}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Map / Additional Info */}
            <div>
              <SectionHeader
                title={t('অবস্থান', 'Location')}
                centered={false}
              />
              <Card padding="none" className="overflow-hidden h-64 md:h-full min-h-[300px] flex items-center justify-center bg-primary-50">
                <div className="text-center p-6">
                  <MapPin className="w-12 h-12 text-primary-300 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">
                    {t(
                      '[মানচিত্র এখানে বসবে - সম্পাদনাযোগ্য]',
                      '[Map will be placed here - Editable]'
                    )}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
