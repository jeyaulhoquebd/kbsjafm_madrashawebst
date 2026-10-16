import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section, { SectionHeader } from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getFirebaseErrorMessage } from '../lib/firebase-errors';
import { FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface FormData {
  name: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  class: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Admission() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fatherName: '',
    motherName: '',
    phone: '',
    email: '',
    class: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = t('নাম আবশ্যক', 'Name is required');
    if (!formData.fatherName.trim()) newErrors.fatherName = t("পিতার নাম আবশ্যক", "Father's name is required");
    if (!formData.phone.trim()) {
      newErrors.phone = t('ফোন নম্বর আবশ্যক', 'Phone number is required');
    } else if (!/^[\d+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = t('সঠিক ফোন নম্বর দিন', 'Enter a valid phone number');
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('সঠিক ইমেইল দিন', 'Enter a valid email');
    }
    if (!formData.class) newErrors.class = t('শ্রেণি নির্বাচন করুন', 'Select a class');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Submit to Firestore
      await addDoc(collection(db, 'admissionInquiries'), {
        studentName: formData.name,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        phone: formData.phone,
        email: formData.email,
        appliedClass: formData.class,
        message: formData.message,
        status: 'new',
        adminNotes: '',
        submittedAt: serverTimestamp(),
      });
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        fatherName: '',
        motherName: '',
        phone: '',
        email: '',
        class: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting admission form:', error);
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
        title={t('ভর্তি তথ্য', 'Admission Information')}
        subtitle={t('ভর্তি সংক্রান্ত সকল তথ্য ও নির্দেশনা', 'All admission-related information and guidelines')}
        breadcrumb={<Breadcrumb items={[{ label: t('ভর্তি', 'Admission') }]} />}
      />

      {/* Admission Info */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('ভর্তি সংক্রান্ত তথ্য', 'Admission Information')} centered={false} />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card padding="lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 font-bengali">{t('যোগ্যতা', 'Eligibility')}</h3>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                  <span>{t('[যোগ্যতা ১ - সম্পাদনাযোগ্য]', '[Eligibility 1 - Editable]')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                  <span>{t('[যোগ্যতা ২ - সম্পাদনাযোগ্য]', '[Eligibility 2 - Editable]')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                  <span>{t('[যোগ্যতা ৩ - সম্পাদনাযোগ্য]', '[Eligibility 3 - Editable]')}</span>
                </li>
              </ul>
            </Card>

            <Card padding="lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 font-bengali">{t('প্রয়োজনীয় কাগজপত্র', 'Required Documents')}</h3>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                  <span>{t('[কাগজপত্র ১ - সম্পাদনাযোগ্য]', '[Document 1 - Editable]')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                  <span>{t('[কাগজপত্র ২ - সম্পাদনাযোগ্য]', '[Document 2 - Editable]')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                  <span>{t('[কাগজপত্র ৩ - সম্পাদনাযোগ্য]', '[Document 3 - Editable]')}</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Admission Procedure */}
          <Card padding="lg" className="mb-8">
            <h3 className="text-lg font-semibold text-primary-900 mb-4 font-bengali">{t('ভর্তি পদ্ধতি', 'Admission Procedure')}</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-bold">
                    {step}
                  </div>
                  <p className="text-sm text-neutral-700 pt-0.5">
                    {t(`[ধাপ ${step} - সম্পাদনাযোগ্য]`, `[Step ${step} - Editable]`)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Downloadable Documents */}
          <Card padding="lg" className="mb-8">
            <h3 className="text-lg font-semibold text-primary-900 mb-4 font-bengali">{t('ডাউনলোডযোগ্য ফরম', 'Downloadable Forms')}</h3>
            <div className="space-y-2">
              {[
                { title: t('[ভর্তি ফরম]', '[Admission Form]'), titleEn: '[Admission Form]' },
                { title: t('[তথ্য ফরম]', '[Information Form]'), titleEn: '[Information Form]' },
              ].map((form, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-700" />
                    <span className="text-sm text-neutral-700">{t(form.title, form.titleEn)}</span>
                  </div>
                  <button className="text-sm text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {t('ডাউনলোড', 'Download')}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Admission Inquiry Form */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={t('ভর্তি জিজ্ঞাসা ফরম', 'Admission Inquiry Form')}
            subtitle={t('নিচের ফরমটি পূরণ করে আমাদের কাছে পাঠান', 'Fill out the form below to send us your inquiry')}
          />

          {isSubmitted ? (
            <Card padding="lg">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 font-bengali">
                  {t('ধন্যবাদ!', 'Thank You!')}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {t(
                    'আপনার জিজ্ঞাসা সফলভাবে জমা দেওয়া হয়েছে (ডেমো)। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
                    'Your inquiry has been successfully submitted (demo). We will contact you soon.'
                  )}
                </p>
                <p className="text-xs text-neutral-400 mb-4">
                  {t(
                    '※ এটি একটি ডেমো ফরম। কোনো তথ্য প্রকৃতপক্ষে সংরক্ষণ করা হয়নি।',
                    '※ This is a demo form. No data has been actually saved.'
                  )}
                </p>
                <Button variant="outline" onClick={() => { setIsSubmitted(false); setIsLoading(false); setFormData({ name: '', fatherName: '', motherName: '', phone: '', email: '', class: '', message: '' }); }}>
                  {t('নতুন জিজ্ঞাসা', 'New Inquiry')}
                </Button>
              </div>
            </Card>
          ) : (
            <Card padding="lg">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('শিক্ষার্থীর নাম', "Student's Name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                      placeholder={t('নাম লিখুন', 'Enter name')}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      {t("পিতার নাম", "Father's Name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleChange('fatherName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.fatherName ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                      placeholder={t("পিতার নাম লিখুন", "Enter father's name")}
                    />
                    {errors.fatherName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fatherName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t("মাতার নাম", "Mother's Name")}</label>
                    <input
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => handleChange('motherName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder={t("মাতার নাম লিখুন", "Enter mother's name")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('ফোন নম্বর', 'Phone Number')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                      placeholder={t('ফোন নম্বর লিখুন', 'Enter phone number')}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t('ইমেইল', 'Email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                      placeholder={t('ইমেইল লিখুন', 'Enter email')}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('ভর্তির শ্রেণি', 'Admission Class')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.class}
                      onChange={(e) => handleChange('class', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 bg-white ${errors.class ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}`}
                    >
                      <option value="">{t('নির্বাচন করুন', 'Select')}</option>
                      <option value="dakhil">{t('দাখিল', 'Dakhil')}</option>
                      <option value="alim">{t('আলিম', 'Alim')}</option>
                      <option value="fazil">{t('ফাজিল', 'Fazil')}</option>
                    </select>
                    {errors.class && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.class}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t('অতিরিক্ত তথ্য', 'Additional Information')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                    placeholder={t('আপনার জিজ্ঞাসা বা অতিরিক্ত তথ্য লিখুন...', 'Enter your inquiry or additional information...')}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
                    {isLoading ? t('পাঠানো হচ্ছে...', 'Submitting...') : t('জিজ্ঞাসা পাঠান', 'Submit Inquiry')}
                  </Button>
                  <p className="text-xs text-neutral-400">
                    {t('※ ডেমো ফরম - কোনো তথ্য সংরক্ষণ হবে না', '※ Demo form - No data will be saved')}
                  </p>
                </div>
              </form>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}
