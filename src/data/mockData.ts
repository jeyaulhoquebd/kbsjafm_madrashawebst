import { NavItem, Notice, Department, InstitutionInfo, Teacher } from '../types';
import { institutionIdentity, brandAssets } from './institution';

// Institution Information
export const institutionInfo: InstitutionInfo = {
  name: institutionIdentity.nameBn,
  nameEn: institutionIdentity.nameEn,
  shortName: institutionIdentity.shortNameBn,
  shortNameEn: institutionIdentity.shortNameEn,
  established: institutionIdentity.establishedYearBn,
  eiin: institutionIdentity.eiin,
  address: institutionIdentity.addressBn,
  addressEn: institutionIdentity.addressEn,
  phone: institutionIdentity.phonePrimary,
  email: institutionIdentity.email,
  website: institutionIdentity.ebmebUrl,
};

// Navigation Items - Exact 14 items matching specification
export const navigationItems: NavItem[] = [
  { label: 'হোম', labelEn: 'Home', href: '/' },
  {
    label: 'আমাদের সম্পর্কে',
    labelEn: 'About Us',
    href: '/about',
    children: [
      { label: 'মাদরাসার পরিচিতি', labelEn: 'About Madrasa', href: '/about' },
      { label: 'ইতিহাস ও ঐতিহ্য', labelEn: 'History & Heritage', href: '/about/history' },
      { label: 'লক্ষ্য ও উদ্দেশ্য', labelEn: 'Vision & Mission', href: '/about/vision-mission' },
      { label: 'অধ্যক্ষের বাণী', labelEn: "Principal's Message", href: '/about/principal' },
      { label: 'পরিচালনা কমিটি', labelEn: 'Governing Body', href: '/about/governing-body' },
    ],
  },
  {
    label: 'একাডেমিক',
    labelEn: 'Academics',
    href: '/academics',
    children: [
      { label: 'শিক্ষাকার্যক্রম', labelEn: 'Academic Programs', href: '/academics/programs' },
      { label: 'বিভাগ ও শ্রেণি', labelEn: 'Departments & Classes', href: '/academics/departments' },
      { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academics/routine' },
      { label: 'পরীক্ষার রুটিন', labelEn: 'Exam Routine', href: '/academics/exam-routine' },
      { label: 'শিক্ষা পঞ্জিকা', labelEn: 'Academic Calendar', href: '/academics/calendar' },
    ],
  },
  { label: 'শিক্ষক ও কর্মকর্তা', labelEn: 'Teachers & Staff', href: '/teachers' },
  {
    label: 'ভর্তি',
    labelEn: 'Admission',
    href: '/admission',
    children: [
      { label: 'ভর্তি বিজ্ঞপ্তি ও তথ্য', labelEn: 'Admission Info', href: '/admission' },
      { label: 'অনলাইন আবেদন ফরম', labelEn: 'Online Application', href: '/admission/apply' },
      { label: 'ভর্তির যোগ্যতা ও নিয়মাবলী', labelEn: 'Eligibility & Rules', href: '/admission/eligibility' },
    ],
  },
  { label: 'নোটিশ', labelEn: 'Notices', href: '/notices' },
  { label: 'ফলাফল', labelEn: 'Results', href: '/results' },
  {
    label: 'শিক্ষার্থী কর্নার',
    labelEn: 'Student Corner',
    href: '/student-corner',
    children: [
      { label: 'শিক্ষার্থীদের তথ্য ও নির্দেশিকা', labelEn: 'Student Guidelines', href: '/student-corner' },
      { label: 'পাঠ্যক্রম ও সিলেবাস', labelEn: 'Syllabus', href: '/academics/syllabus' },
      { label: 'ডাউনলোড সেবা', labelEn: 'Downloads', href: '/downloads' },
    ],
  },
  { label: 'এতিমখানা', labelEn: 'Orphanage', href: '/orphanage' },
  { label: 'হেফজখানা', labelEn: 'Hifzkhana', href: '/hifzkhana' },
  { label: 'সংবাদ ও অনুষ্ঠান', labelEn: 'News & Events', href: '/news-events' },
  {
    label: 'গ্যালারি',
    labelEn: 'Gallery',
    href: '/gallery',
    children: [
      { label: 'ফটো গ্যালারি', labelEn: 'Photo Gallery', href: '/gallery' },
      { label: 'ভিডিও গ্যালারি', labelEn: 'Video Gallery', href: '/video-gallery' },
    ],
  },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads' },
  { label: 'যোগাযোগ', labelEn: 'Contact', href: '/contact' },
];

// Notices with full content
export interface NoticeFull extends Notice {
  content: string;
  contentEn: string;
  attachmentUrl?: string;
  attachmentName?: string;
  author?: string;
}

export const sampleNotices: NoticeFull[] = [
  {
    id: '1',
    title: '২০২৬ শিক্ষাবর্ষে ইবতেদায়ি, দাখিল ও আলিম শ্রেণিতে ভর্তি কার্যক্রমের বিজ্ঞপ্তি',
    titleEn: 'Admission notice for 2026 academic session across all levels',
    date: '২০২৬-০১-০৫',
    category: 'admission',
    isUrgent: true,
    content: 'খাগড়াছড়ি বায়তুশ শরফ জব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদরাসায় ২০২৬ শিক্ষাবর্ষে ইবতেদায়ি ১ম শ্রেণি হতে আলিম শ্রেণি পর্যন্ত শিক্ষার্থীদের ভর্তি ফরম বিতরণ ও গ্রহণ কার্যক্রম শুরু হয়েছে। আগ্রহী অভিভাবক ও শিক্ষার্থীদের মাদরাসা কার্যালয় থেকে অথবা অনলাইনে আবেদন করার জন্য অনুরোধ করা যাচ্ছে।',
    contentEn: 'Admission application for the 2026 academic session from Ibtidayi Class 1 to Alim level is now open. Interested guardians and students can collect forms from the office or apply online.',
    author: 'অধ্যক্ষ মহোদয়',
    attachmentName: 'ভর্তি_ফরম_২০২৬.pdf',
    attachmentUrl: '#',
  },
  {
    id: '2',
    title: 'পবিত্র মাহে রমজান ও ঈদুল ফিতর উপলক্ষে একাডেমিক ছুটির নোটিশ',
    titleEn: 'Academic vacation notice for holy Ramadan and Eid-ul-Fitr',
    date: '২০২৬-০২-১২',
    category: 'notice',
    isUrgent: false,
    content: 'সকল শিক্ষক, শিক্ষার্থী ও কর্মচারীদের জানানো যাচ্ছে যে, পবিত্র মাহে রমজান ও ঈদুল ফিতর উপলক্ষে মাদরাসার শ্রেণিকক্ষে নিয়মিত পাঠদান নির্ধারিত সূচি অনুযায়ী বন্ধ থাকবে। তবে প্রশাসনিক ও ভর্তি কার্যক্রম সীমিত পরিসরে অব্যাহত থাকবে।',
    contentEn: 'Notice is hereby given that regular academic classes will be suspended according to schedule for Ramadan and Eid-ul-Fitr. Administrative activities will remain open on a limited scale.',
    author: 'প্রশাসন শাখা',
  },
  {
    id: '3',
    title: 'বার্ষিক কুরআন তিলাওয়াত, হিফজ ও হামদ-নাত প্রতিযোগিতার সময়সূচি',
    titleEn: 'Schedule of annual Quran recitation, Hifz, and Islamic cultural competition',
    date: '২০২৬-০২-২০',
    category: 'event',
    isUrgent: false,
    content: 'মাদরাসার মিলনায়তনে শিক্ষার্থীদের অংশগ্রহণে বার্ষিক হিফজুল কুরআন, সহীহ কিরাত এবং হামদ-নাত প্রতিযোগিতা অনুষ্ঠিত হবে। শ্রেণিভিত্তিক নাম অন্তর্ভুক্তির জন্য শ্রেণি শিক্ষকের সাথে যোগাযোগের নির্দেশ দেওয়া হলো।',
    contentEn: 'The annual Quran recitation and Islamic cultural competition will take place at the madrasa auditorium. Students are advised to submit names through their class teachers.',
    author: 'সাংস্কৃতিক কমিটি',
  },
  {
    id: '4',
    title: 'দাখিল ও আলিম নির্বাচনী পরীক্ষার ফলাফল ও অভিভাবক সমাবেশ',
    titleEn: 'Test examination results and guardian meeting notice',
    date: '২০২৬-০৩-০১',
    category: 'result',
    isUrgent: true,
    content: 'দাখিল ও আলিম পরীক্ষার্থীদের নির্বাচনী পরীক্ষার ফলাফল প্রকাশ করা হয়েছে। ফলাফল মূল্যায়ন ও বোর্ড পরীক্ষার চূড়ান্ত প্রস্তুতি নিয়ে সংশ্লিষ্ট সকল শিক্ষার্থীর অভিভাবকদের নিয়ে বিশেষ মতবিনিময় সভা অনুষ্ঠিত হবে।',
    contentEn: 'Test examination results for Dakhil and Alim candidates have been published. A parent-teacher assembly will be held to review academic performance.',
    author: 'পরীক্ষা নিয়ন্ত্রণ কমিটি',
  },
];

// Departments
export const departments: Department[] = [
  { id: 'quran', name: 'বিভাগুল কুরআন ও হিফজ', nameEn: 'Department of Quran & Hifz', description: 'কুরআন তিলাওয়াত, তাজবিদ ও হিফজুল কুরআন পাঠদান বিভাগ।', descriptionEn: 'Department dedicated to Quranic recitation, Tajweed, and Quran memorization.', icon: 'BookOpen' },
  { id: 'hadith', name: 'বিভাগুল হাদীস ও ফিকহ', nameEn: 'Department of Hadith & Fiqh', description: 'হাদিস শাস্ত্র, তাফসির ও ইসলামী আইনশাস্ত্রের পাঠদান বিভাগ।', descriptionEn: 'Department for study of Prophetic traditions, exegesis, and Islamic jurisprudence.', icon: 'ScrollText' },
  { id: 'arabic', name: 'বিভাগুল আরবি ভাষা ও সাহিত্য', nameEn: 'Department of Arabic Literature', description: 'আরবি ব্যাকরণ, সাহিত্য ও ব্যবহারিক কথোপকথন চর্চা।', descriptionEn: 'Arabic grammar, rhetoric, and modern Arabic communication.', icon: 'Languages' },
  { id: 'general', name: 'সাধারণ শিক্ষা ও বিজ্ঞান বিভাগ', nameEn: 'General Education & Science', description: 'বাংলা, ইংরেজি, গণিত, তথ্যপ্রযুক্তি ও সাধারণ বিজ্ঞান পাঠদান।', descriptionEn: 'General subjects including Bengali, English, Mathematics, ICT, and Science.', icon: 'GraduationCap' },
];

// Teachers List
export const demoTeachers: Teacher[] = [
  {
    id: '1',
    name: 'মাওলানা মোহাম্মদ আবু ওছমান',
    nameEn: 'Maulana Mohammad Abu Osman',
    designation: 'অধ্যক্ষ',
    designationEn: 'Principal',
    department: 'quran',
    departmentEn: 'Department of Quran',
    image: brandAssets.principalPhoto,
  },
  {
    id: '2',
    name: 'মাওলানা আব্দুল কুদ্দুস',
    nameEn: 'Maulana Abdul Kuddus',
    designation: 'সহকারী অধ্যাপক (হাদীস)',
    designationEn: 'Assistant Professor (Hadith)',
    department: 'hadith',
    departmentEn: 'Department of Hadith',
  },
  {
    id: '3',
    name: 'মাওলানা নুরুল হক',
    nameEn: 'Maulana Nurul Haque',
    designation: 'প্রভাষক (আরবি)',
    designationEn: 'Lecturer (Arabic)',
    department: 'arabic',
    departmentEn: 'Department of Arabic',
  },
  {
    id: '4',
    name: 'মুহাম্মদ রেজাউল করিম',
    nameEn: 'Muhammad Rezaul Karim',
    designation: 'প্রভাষক (ইংরেজি ও সাধারণ শিক্ষা)',
    designationEn: 'Lecturer (English & General)',
    department: 'general',
    departmentEn: 'General Education',
  },
  {
    id: '5',
    name: 'হাফেজ ক্বারী আহমদ উল্লাহ',
    nameEn: 'Hafez Qari Ahmad Ullah',
    designation: 'প্রধান ক্বারী ও হিফজ শিক্ষক',
    designationEn: 'Head Qari & Hifz Instructor',
    department: 'quran',
    departmentEn: 'Department of Quran',
  },
];

// Academic Programs
export interface AcademicProgram {
  id: string;
  name: string;
  nameEn: string;
  level: string;
  levelEn: string;
  duration: string;
  durationEn: string;
  description: string;
  descriptionEn: string;
}

export const academicPrograms: AcademicProgram[] = [
  {
    id: 'fazil',
    name: 'ফাজিল (ডিগ্রি)',
    nameEn: 'Fazil (Degree)',
    level: 'স্নাতক (পাস)',
    levelEn: 'Bachelor Pass',
    duration: '৩ বছর',
    durationEn: '3 Years',
    description: 'ইসলামিক আরবি বিশ্ববিদ্যালয়ের অধিভুক্ত স্নাতক সমমানের উচ্চতর শিক্ষাকার্যক্রম।',
    descriptionEn: 'Undergraduate bachelor degree program affiliated with Islamic Arabic University.',
  },
  {
    id: 'alim',
    name: 'আলিম',
    nameEn: 'Alim',
    level: 'উচ্চ মাধ্যমিক সমমান',
    levelEn: 'Higher Secondary Equivalent',
    duration: '২ বছর',
    durationEn: '2 Years',
    description: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ডের অধীনে উচ্চ মাধ্যমিক পর্যায়ের ইসলামী ও সাধারণ শিক্ষা।',
    descriptionEn: 'Higher secondary certificate level education under Bangladesh Madrasah Education Board.',
  },
  {
    id: 'dakhil',
    name: 'দাখিল',
    nameEn: 'Dakhil',
    level: 'মাধ্যমিক সমমান',
    levelEn: 'Secondary Equivalent',
    duration: '৫ বছর',
    durationEn: '5 Years',
    description: 'মাদরাসা শিক্ষা বোর্ডের অনুমোদিত সাধারণ ও বিজ্ঞান বিভাগভিত্তিক দাখিল শিক্ষাক্রম।',
    descriptionEn: 'Secondary educational curriculum under Bangladesh Madrasah Education Board.',
  },
  {
    id: 'ibtedayi',
    name: 'ইবতেদায়ি',
    nameEn: 'Ibtidayi',
    level: 'প্রাথমিক সমমান',
    levelEn: 'Primary Equivalent',
    duration: '৫ বছর',
    durationEn: '5 Years',
    description: 'প্রথম হতে পঞ্চম শ্রেণি পর্যন্ত মৌলিক দ্বীনি ও সাধারণ প্রাথমিক শিক্ষাকার্যক্রম।',
    descriptionEn: 'Primary Islamic foundation and general education from Class 1 to Class 5.',
  },
  {
    id: 'hifz',
    name: 'হিফজুল কুরআন',
    nameEn: 'Hifzul Quran',
    level: 'কুরআন হিফজ',
    levelEn: 'Quran Memorization',
    duration: '৩-৪ বছর',
    durationEn: '3-4 Years',
    description: 'অভিজ্ঞ হাফেজে কুরআনের সার্বক্ষণিক তত্ত্বাবধানে সহীহ তাজবিদসহ পূর্ণাঙ্গ কুরআন হিফজ।',
    descriptionEn: 'Full Quran memorization program with accurate Tajweed under certified Huffaz.',
  },
];

// Downloads
export interface DownloadItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'admission' | 'routine' | 'exam' | 'syllabus' | 'calendar' | 'other';
  date: string;
  fileSize?: string;
  fileType: string;
  url?: string;
}

export const downloadItems: DownloadItem[] = [
  { id: '1', title: '২০২৬ শিক্ষাবর্ষের ভর্তি আবেদন ফরম', titleEn: 'Admission Application Form 2026', category: 'admission', date: '২০২৬-০১-১০', fileSize: '৩২০ কেবি', fileType: 'PDF' },
  { id: '2', title: 'দাখিল ও আলিম শ্রেণির সাপ্তাহিক ক্লাস রুটিন', titleEn: 'Class Routine for Dakhil & Alim', category: 'routine', date: '২০২৬-০১-১৫', fileSize: '২৪০ কেবি', fileType: 'PDF' },
  { id: '3', title: '২০২৬ সালের বার্ষিক একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা', titleEn: 'Annual Academic Calendar 2026', category: 'calendar', date: '২০২৬-০১-০১', fileSize: '৫০০ কেবি', fileType: 'PDF' },
  { id: '4', title: 'দাখিল শ্রেণির বাংলা, আরবি ও সাধারণ গণিত সিলেবাস', titleEn: 'Dakhil Detailed Syllabus', category: 'syllabus', date: '২০২৬-০১-০৮', fileSize: '১.২ এমবি', fileType: 'PDF' },
  { id: '5', title: 'আলিম নির্বাচনী পরীক্ষার বিস্তারিত সময়সূচি', titleEn: 'Alim Test Examination Routine', category: 'exam', date: '২০২৬-০২-০১', fileSize: '১৮০ কেবি', fileType: 'PDF' },
];

// Gallery Images
export const galleryImages = [
  {
    id: '1',
    src: brandAssets.buildingPhoto,
    alt: 'মাদরাসা ভবন ও প্রধান ক্যাম্পাস',
    altEn: 'Madrasa Main Building and Campus',
    category: 'building',
  },
  {
    id: '2',
    src: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165465/madrashalogo.jpg',
    alt: 'মাদরাসার প্রাতিষ্ঠানিক মনোগ্রাম',
    altEn: 'Official Madrasa Crest',
    category: 'logo',
  },
];

// Quick Services
export const quickServices = [
  { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission', icon: 'FileText' },
  { label: 'ভর্তি আবেদন', labelEn: 'Apply for Admission', href: '/admission/apply', icon: 'FileText' },
  { label: 'সর্বশেষ নোটিশ', labelEn: 'Latest Notices', href: '/notices', icon: 'Bell' },
  { label: 'পরীক্ষার ফলাফল', labelEn: 'Exam Results', href: '/results', icon: 'Award' },
  { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academics/routine', icon: 'Calendar' },
  { label: 'পরীক্ষার রুটিন', labelEn: 'Exam Routine', href: '/academics/exam-routine', icon: 'ClipboardList' },
  { label: 'শিক্ষা পঞ্জিকা', labelEn: 'Academic Calendar', href: '/academics/calendar', icon: 'CalendarDays' },
  { label: 'সিলেবাস', labelEn: 'Syllabus', href: '/academics/syllabus', icon: 'BookOpen' },
  { label: 'ডাউনলোড কর্নার', labelEn: 'Downloads', href: '/downloads', icon: 'Download' },
  { label: 'শিক্ষক তালিকা', labelEn: 'Teachers List', href: '/teachers', icon: 'Users' },
  { label: 'ফটো গ্যালারি', labelEn: 'Photo Gallery', href: '/gallery', icon: 'Image' },
  { label: 'যোগাযোগ ও অবস্থান', labelEn: 'Contact & Location', href: '/contact', icon: 'MapPin' },
];

// Quick Links for Footer
export const quickLinks = [
  { label: 'ভর্তি তথ্য ও ফরম', labelEn: 'Admission Info', href: '/admission' },
  { label: 'পরীক্ষার ফলাফল', labelEn: 'Exam Results', href: '/results' },
  { label: 'শিক্ষক ও কর্মচারী পঞ্জিকা', labelEn: 'Teachers Directory', href: '/teachers' },
  { label: 'অনলাইন আবেদন', labelEn: 'Online Application', href: '/admission/apply' },
  { label: 'ডকুমেন্ট ডাউনলোড', labelEn: 'Downloads', href: '/downloads' },
  { label: 'যোগাযোগ', labelEn: 'Contact', href: '/contact' },
];

// Exam types for results page
export const examTypes = [
  { value: '', label: 'সকল পরীক্ষা', labelEn: 'All Exams' },
  { value: 'fazil', label: 'ফাজিল (ডিগ্রি) পরীক্ষা', labelEn: 'Fazil Exam' },
  { value: 'alim', label: 'আলিম পরীক্ষা', labelEn: 'Alim Exam' },
  { value: 'dakhil', label: 'দাখিল পরীক্ষা', labelEn: 'Dakhil Exam' },
  { value: 'annual', label: 'বার্ষিক মূল্যায়ন পরীক্ষা', labelEn: 'Annual Exam' },
];

export const examYears = [
  { value: '', label: 'সকল শিক্ষাবর্ষ', labelEn: 'All Years' },
  { value: '2025', label: '২০২৫', labelEn: '2025' },
  { value: '2024', label: '২০২৪', labelEn: '2024' },
  { value: '2023', label: '২০২৩', labelEn: '2023' },
];

// Gallery categories
export const galleryCategories = [
  { value: 'all', label: 'সব ছবি', labelEn: 'All Photos' },
  { value: 'building', label: 'ক্যাম্পাস ও ভবন', labelEn: 'Campus & Building' },
  { value: 'event', label: 'অনুষ্ঠান ও প্রতিযোগিতা', labelEn: 'Events' },
  { value: 'classroom', label: 'শ্রেণিকক্ষ ও শিক্ষা', labelEn: 'Classroom' },
];
