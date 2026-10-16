import { NavItem, Notice, Department, InstitutionInfo } from '../types';

// Institution Information
export const institutionInfo: InstitutionInfo = {
  name: 'খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা',
  nameEn: 'Khagrachhari Baitush Sharaf Jabbaria Adarsha Fazil (Degree) Madrasa',
  shortName: 'বাইতুশ শরফ জাব্বারিয়া মাদ্রাসা',
  shortNameEn: 'Baitush Sharaf Jabbaria Madrasa',
  established: '[স্থাপনের বছর - সম্পাদনাযোগ্য]',
  eiin: '[EIIN নম্বর - সম্পাদনাযোগ্য]',
  address: '[প্রতিষ্ঠানের ঠিকানা - সম্পাদনাযোগ্য], খাগড়াছড়ি, বাংলাদেশ',
  addressEn: '[Institution Address - Editable], Khagrachhari, Bangladesh',
  phone: '[ফোন নম্বর - সম্পাদনাযোগ্য]',
  email: '[ইমেইল - সম্পাদনাযোগ্য]',
  website: '[ওয়েবসাইট - সম্পাদনাযোগ্য]',
};

// Navigation Items
export const navigationItems: NavItem[] = [
  {
    label: 'হোম',
    labelEn: 'Home',
    href: '/',
  },
  {
    label: 'পরিচিতি',
    labelEn: 'About',
    href: '/about',
    children: [
      { label: 'প্রতিষ্ঠান পরিচিতি', labelEn: 'Institution Overview', href: '/about' },
      { label: 'ইতিহাস', labelEn: 'History', href: '/about/history' },
      { label: 'কর্তৃপক্ষ', labelEn: 'Administration', href: '/about/administration' },
    ],
  },
  {
    label: 'একাডেমিক',
    labelEn: 'Academic',
    href: '/academic',
    children: [
      { label: 'বিভাগসমূহ', labelEn: 'Departments', href: '/academic/departments' },
      { label: 'শিক্ষা কার্যক্রম', labelEn: 'Programs', href: '/academic/programs' },
      { label: 'ক্যালেন্ডার', labelEn: 'Calendar', href: '/academic/calendar' },
    ],
  },
  {
    label: 'শিক্ষকবৃন্দ',
    labelEn: 'Teachers',
    href: '/teachers',
  },
  {
    label: 'নোটিশ বোর্ড',
    labelEn: 'Notice Board',
    href: '/notices',
  },
  {
    label: 'ফলাফল',
    labelEn: 'Results',
    href: '/results',
  },
  {
    label: 'যোগাযোগ',
    labelEn: 'Contact',
    href: '/contact',
  },
];

// Sample Notices
export const sampleNotices: Notice[] = [
  {
    id: '1',
    title: '[নমুনা নোটিশ - ভর্তি সংক্রান্ত তথ্য]',
    titleEn: '[Sample Notice - Admission Information]',
    date: '2025-01-15',
    category: 'admission',
    isUrgent: true,
  },
  {
    id: '2',
    title: '[নমুনা নোটিশ - পরীক্ষার সময়সূচী]',
    titleEn: '[Sample Notice - Exam Schedule]',
    date: '2025-01-10',
    category: 'notice',
  },
  {
    id: '3',
    title: '[নমুনা নোটিশ - বার্ষিক মাহফিল]',
    titleEn: '[Sample Notice - Annual Mahfil]',
    date: '2025-01-05',
    category: 'event',
  },
];

// Departments
export const departments: Department[] = [
  {
    id: 'quran',
    name: 'বিভাগুল কুরআন',
    nameEn: 'Department of Quran',
    description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Department description - Editable]',
    icon: 'BookOpen',
  },
  {
    id: 'hadith',
    name: 'বিভাগুল হাদীস',
    nameEn: 'Department of Hadith',
    description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Department description - Editable]',
    icon: 'ScrollText',
  },
  {
    id: 'fiqh',
    name: 'বিভাগুল ফিকহ',
    nameEn: 'Department of Fiqh',
    description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Department description - Editable]',
    icon: 'Scale',
  },
  {
    id: 'arabic',
    name: 'বিভাগুল আরবি',
    nameEn: 'Department of Arabic',
    description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Department description - Editable]',
    icon: 'Languages',
  },
  {
    id: 'general',
    name: 'সাধারণ শিক্ষা বিভাগ',
    nameEn: 'General Education Department',
    description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Department description - Editable]',
    icon: 'GraduationCap',
  },
];

// Quick Links
export const quickLinks = [
  { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission' },
  { label: 'পরীক্ষার ফলাফল', labelEn: 'Exam Results', href: '/results' },
  { label: 'শিক্ষক পঞ্জিকা', labelEn: 'Teacher Directory', href: '/teachers' },
  { label: 'অনলাইন আবেদন', labelEn: 'Online Application', href: '/apply' },
  { label: 'লাইব্রেরি', labelEn: 'Library', href: '/library' },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads' },
];
