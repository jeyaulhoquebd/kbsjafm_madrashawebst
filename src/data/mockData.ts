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

// Navigation Items - Complete set
export const navigationItems: NavItem[] = [
  {
    label: 'হোম',
    labelEn: 'Home',
    href: '/',
  },
  {
    label: 'পরিচিতি',
    labelEn: 'About Us',
    href: '/about',
    children: [
      { label: 'প্রতিষ্ঠান পরিচিতি', labelEn: 'Institution Overview', href: '/about' },
      { label: 'ইতিহাস', labelEn: 'History', href: '/about/history' },
      { label: 'কর্তৃপক্ষ', labelEn: 'Administration', href: '/about/administration' },
      { label: 'অধ্যক্ষের বাণী', labelEn: "Principal's Message", href: '/about/principal' },
    ],
  },
  {
    label: 'একাডেমিক',
    labelEn: 'Academics',
    href: '/academic',
    children: [
      { label: 'বিভাগসমূহ', labelEn: 'Departments', href: '/academic/departments' },
      { label: 'শিক্ষা কার্যক্রম', labelEn: 'Programs', href: '/academic/programs' },
      { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academic/routine' },
      { label: 'শিক্ষা ক্যালেন্ডার', labelEn: 'Academic Calendar', href: '/academic/calendar' },
    ],
  },
  {
    label: 'শিক্ষকবৃন্দ',
    labelEn: 'Teachers',
    href: '/teachers',
  },
  {
    label: 'ভর্তি',
    labelEn: 'Admission',
    href: '/admission',
    children: [
      { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission' },
      { label: 'অনলাইন আবেদন', labelEn: 'Online Application', href: '/admission/apply' },
    ],
  },
  {
    label: 'নোটিশ',
    labelEn: 'Notices',
    href: '/notices',
  },
  {
    label: 'ফলাফল',
    labelEn: 'Results',
    href: '/results',
  },
  {
    label: 'ডাউনলোড',
    labelEn: 'Downloads',
    href: '/downloads',
  },
  {
    label: 'গ্যালারি',
    labelEn: 'Gallery',
    href: '/gallery',
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
    title: '[নমুনা নোটিশ - ২০২৫ শিক্ষাবর্ষে ভর্তি কার্যক্রম শুরু]',
    titleEn: '[Sample Notice - Admission for 2025 Academic Year Started]',
    date: '2025-01-15',
    category: 'admission',
    isUrgent: true,
  },
  {
    id: '2',
    title: '[নমুনা নোটিশ - বার্ষিক পরীক্ষার সময়সূচী প্রকাশ]',
    titleEn: '[Sample Notice - Annual Exam Schedule Published]',
    date: '2025-01-10',
    category: 'notice',
  },
  {
    id: '3',
    title: '[নমুনা নোটিশ - বার্ষিক দোয়া ও পুরস্কার বিতরণী অনুষ্ঠান]',
    titleEn: '[Sample Notice - Annual Prayer and Prize Distribution]',
    date: '2025-01-05',
    category: 'event',
  },
  {
    id: '4',
    title: '[নমুনা নোটিশ - ফাজিল প্রথম বর্ষের ক্লাস শুরুর তারিখ]',
    titleEn: '[Sample Notice - Fazil 1st Year Class Start Date]',
    date: '2025-01-02',
    category: 'notice',
  },
  {
    id: '5',
    title: '[নমুনা নোটিশ - আলিম পরীক্ষার ফলাফল প্রকাশ]',
    titleEn: '[Sample Notice - Alim Exam Results Published]',
    date: '2024-12-28',
    category: 'result',
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

// Quick Services
export const quickServices = [
  { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission', icon: 'FileText' },
  { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academic/routine', icon: 'Calendar' },
  { label: 'পরীক্ষার রুটিন', labelEn: 'Exam Routine', href: '/academic/exam-routine', icon: 'ClipboardList' },
  { label: 'ফলাফল', labelEn: 'Results', href: '/results', icon: 'Award' },
  { label: 'নোটিশ বোর্ড', labelEn: 'Notice Board', href: '/notices', icon: 'Bell' },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads', icon: 'Download' },
  { label: 'শিক্ষা ক্যালেন্ডার', labelEn: 'Academic Calendar', href: '/academic/calendar', icon: 'CalendarDays' },
  { label: 'যোগাযোগ', labelEn: 'Contact & Location', href: '/contact', icon: 'MapPin' },
];

// Quick Links
export const quickLinks = [
  { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission' },
  { label: 'পরীক্ষার ফলাফল', labelEn: 'Exam Results', href: '/results' },
  { label: 'শিক্ষক পঞ্জিকা', labelEn: 'Teacher Directory', href: '/teachers' },
  { label: 'অনলাইন আবেদন', labelEn: 'Online Application', href: '/admission/apply' },
  { label: 'লাইব্রেরি', labelEn: 'Library', href: '/library' },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads' },
];

// Demo Teachers
export const demoTeachers = [
  {
    id: '1',
    name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]',
    nameEn: '[Teacher Name - Editable]',
    designation: '[পদবি - সম্পাদনাযোগ্য]',
    designationEn: '[Designation - Editable]',
    department: 'quran',
    departmentEn: 'Quran',
    image: undefined,
  },
  {
    id: '2',
    name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]',
    nameEn: '[Teacher Name - Editable]',
    designation: '[পদবি - সম্পাদনাযোগ্য]',
    designationEn: '[Designation - Editable]',
    department: 'hadith',
    departmentEn: 'Hadith',
    image: undefined,
  },
  {
    id: '3',
    name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]',
    nameEn: '[Teacher Name - Editable]',
    designation: '[পদবি - সম্পাদনাযোগ্য]',
    designationEn: '[Designation - Editable]',
    department: 'arabic',
    departmentEn: 'Arabic',
    image: undefined,
  },
  {
    id: '4',
    name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]',
    nameEn: '[Teacher Name - Editable]',
    designation: '[পদবি - সম্পাদনাযোগ্য]',
    designationEn: '[Designation - Editable]',
    department: 'fiqh',
    departmentEn: 'Fiqh',
    image: undefined,
  },
];

// Gallery Images
export const galleryImages = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165382/bitushbg.jpg',
    alt: 'মাদ্রাসা ভবন',
    altEn: 'Madrasa Building',
    category: 'building',
  },
];
