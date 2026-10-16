import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { institutionInfo } from '../data/mockData';
import { institutionIdentity, getContactLinks, googleMapsLink } from '../data/institution';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getFirebaseErrorMessage } from '../lib/firebase-errors';
import { MapPin, Phone, Mail, Clock, Globe, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = t('নাম আবশ্যক', 'Name is required');
    if (!formData.email.trim()) {
      newErrors.email = t('ইমেইল আবশ্যক', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('সঠিক ইমেইল দিন', 'Enter a valid email');
    }
    if (!formData.message.trim()) newErrors.message = t('বার্তা আবশ্যক', 'Message is required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Submit to Firestore
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        adminNotes: '',
        submittedAt: serverTimestamp(),
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(getFirebaseErrorMessage(error, 'bn'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <>
      <PageHeader
        title={t('যোগাযোগ', 'Contact Us')}
        subtitle={t('আমাদের সাথে যোগাযোগ করুন', 'Get in touch with us')}
        breadcrumb={<Breadcrumb items={[{ label: t('যোগাযোগ', 'Contact') }]} />}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <SectionHeader title={t('যোগাযোগের তথ্য', 'Contact Information')} centered={false} className="mb-6" />

              <div className="space-y-4">
                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('ঠিকানা', 'Address')}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{t(institutionIdentity.addressBn, institutionIdentity.addressEn)}</p>
                      <a
                        href={googleMapsLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 mt-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t('মানচিত্রে দেখুন', 'View on Map')}
                      </a>
                      <p className="text-xs text-amber-600 mt-1 italic">
                        {t(googleMapsLink.note, googleMapsLink.noteEn)}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('ফোন', 'Phone')}</h4>
                      <div className="mt-1 space-y-1">
                        <a
                          href={getContactLinks.phone(institutionIdentity.phonePrimary)}
                          className="block text-sm text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {institutionIdentity.phonePrimary}
                        </a>
                        <a
                          href={getContactLinks.phone(institutionIdentity.phoneAlternative)}
                          className="block text-sm text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {institutionIdentity.phoneAlternative}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('ইমেইল', 'Email')}</h4>
                      <a
                        href={getContactLinks.email(institutionIdentity.email)}
                        className="block text-sm text-primary-600 hover:text-primary-700 hover:underline mt-1"
                      >
                        {institutionIdentity.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('EIIN', 'EIIN')}</h4>
                      <p className="text-sm text-neutral-600 mt-1 font-mono">{institutionIdentity.eiin}</p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('অফিস সময়', 'Office Hours')}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{t('[অফিস সময় - সম্পাদনাযোগ্য]', '[Office hours - Editable]')}</p>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 text-sm">{t('ওয়েবসাইট', 'Website')}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{institutionInfo.website}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SectionHeader title={t('আমাদের মেসেজ পাঠান', 'Send Us a Message')} centered={false} className="mb-6" />

              {isSubmitted ? (
                <Card padding="lg">
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2 font-bengali">{t('ধন্যবাদ!', 'Thank You!')}</h3>
                    <p className="text-neutral-600 mb-4">
                      {t(
                        'আপনার বার্তা সফলভাবে পাঠানো হয়েছে (ডেমো)। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
                        'Your message has been sent successfully (demo). We will contact you soon.'
                      )}
                    </p>
                    <p className="text-xs text-neutral-400 mb-4">
                      {t('※ এটি একটি ডেমো ফরম। কোনো তথ্য প্রকৃতপক্ষে সংরক্ষণ করা হয়নি।', '※ This is a demo form. No data has been actually saved.')}
                    </p>
                    <Button variant="outline" onClick={() => { setIsSubmitted(false); setIsLoading(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                      {t('নতুন বার্তা', 'New Message')}
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card padding="lg">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          {t('নাম', 'Name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                          placeholder={t('আপনার নাম', 'Your name')}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          {t('ইমেইল', 'Email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                          placeholder={t('আপনার ইমেইল', 'Your email')}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('ফোন', 'Phone')}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          placeholder={t('আপনার ফোন নম্বর', 'Your phone number')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('বিষয়', 'Subject')}</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          placeholder={t('বিষয় লিখুন', 'Enter subject')}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('বার্তা', 'Message')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-1 resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                        placeholder={t('আপনার বার্তা লিখুন...', 'Write your message...')}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
                        {isLoading ? t('পাঠানো হচ্ছে...', 'Sending...') : t('বার্তা পাঠান', 'Send Message')}
                      </Button>
                      <p className="text-xs text-neutral-400">
                        {t('※ ডেমো ফরম - কোনো তথ্য সংরক্ষণ হবে না', '※ Demo form - No data will be saved')}
                      </p>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="mt-12">
            <SectionHeader title={t('অবস্থান', 'Location')} />
            <Card padding="none" className="overflow-hidden h-64 md:h-80 flex items-center justify-center bg-primary-50">
              <div className="text-center p-6">
                <MapPin className="w-12 h-12 text-primary-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">
                  {t('[মানচিত্র এখানে বসবে - সম্পাদনাযোগ্য]', '[Map will be placed here - Editable]')}
                </p>
                <p className="text-xs text-neutral-400 mt-2">
                  {t('Google Maps লিংক যুক্ত করা হবে', 'Google Maps link will be added')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
