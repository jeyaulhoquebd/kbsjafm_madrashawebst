import { NavItem, Notice, Department, InstitutionInfo, Teacher } from '../types';

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
  { label: 'হোম', labelEn: 'Home', href: '/' },
  {
    label: 'পরিচিতি', labelEn: 'About Us', href: '/about',
    children: [
      { label: 'প্রতিষ্ঠান পরিচিতি', labelEn: 'Institution Overview', href: '/about' },
      { label: 'ইতিহাস', labelEn: 'History', href: '/about/history' },
      { label: 'কর্তৃপক্ষ', labelEn: 'Administration', href: '/about/administration' },
      { label: 'অধ্যক্ষের বাণী', labelEn: "Principal's Message", href: '/about/principal' },
    ],
  },
  {
    label: 'একাডেমিক', labelEn: 'Academics', href: '/academics',
    children: [
      { label: 'শিক্ষা কার্যক্রম', labelEn: 'Programs', href: '/academics/programs' },
      { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academics/routine' },
      { label: 'পরীক্ষার রুটিন', labelEn: 'Exam Routine', href: '/academics/exam-routine' },
      { label: 'শিক্ষা ক্যালেন্ডার', labelEn: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'সিলেবাস', labelEn: 'Syllabus', href: '/academics/syllabus' },
    ],
  },
  { label: 'শিক্ষকবৃন্দ', labelEn: 'Teachers', href: '/teachers' },
  {
    label: 'ভর্তি', labelEn: 'Admission', href: '/admission',
    children: [
      { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission' },
      { label: 'অনলাইন আবেদন', labelEn: 'Online Application', href: '/admission/apply' },
    ],
  },
  { label: 'নোটিশ', labelEn: 'Notices', href: '/notices' },
  { label: 'ফলাফল', labelEn: 'Results', href: '/results' },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads' },
  { label: 'গ্যালারি', labelEn: 'Gallery', href: '/gallery' },
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
    title: '[নমুনা নোটিশ - ২০২৫ শিক্ষাবর্ষে ভর্তি কার্যক্রম শুরু]',
    titleEn: '[Sample Notice - Admission for 2025 Academic Year Started]',
    date: '2025-01-15',
    category: 'admission',
    isUrgent: true,
    content: '[নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য। ভর্তি সংক্রান্ত সকল তথ্য, সময়সূচী এবং প্রয়োজনীয় নির্দেশনা এখানে দেওয়া হবে।]',
    contentEn: '[Detailed notice content will be placed here - Editable. All admission-related information, schedule, and necessary instructions will be provided here.]',
    author: '[প্রশাসন - সম্পাদনাযোগ্য]',
  },
  {
    id: '2',
    title: '[নমুনা নোটিশ - বার্ষিক পরীক্ষার সময়সূচী প্রকাশ]',
    titleEn: '[Sample Notice - Annual Exam Schedule Published]',
    date: '2025-01-10',
    category: 'notice',
    content: '[পরীক্ষার সময়সূচী সংক্রান্ত নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content about exam schedule will be placed here - Editable.]',
    attachmentUrl: '#',
    attachmentName: 'পরীক্ষার_সময়সূচী_২০২৫.pdf',
  },
  {
    id: '3',
    title: '[নমুনা নোটিশ - বার্ষিক দোয়া ও পুরস্কার বিতরণী অনুষ্ঠান]',
    titleEn: '[Sample Notice - Annual Prayer and Prize Distribution]',
    date: '2025-01-05',
    category: 'event',
    content: '[অনুষ্ঠান সংক্রান্ত নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content about the event will be placed here - Editable.]',
  },
  {
    id: '4',
    title: '[নমুনা নোটিশ - ফাজিল প্রথম বর্ষের ক্লাস শুরুর তারিখ]',
    titleEn: '[Sample Notice - Fazil 1st Year Class Start Date]',
    date: '2025-01-02',
    category: 'notice',
    content: '[ক্লাস শুরুর তারিখ সংক্রান্ত নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content about class start date will be placed here - Editable.]',
  },
  {
    id: '5',
    title: '[নমুনা নোটিশ - আলিম পরীক্ষার ফলাফল প্রকাশ]',
    titleEn: '[Sample Notice - Alim Exam Results Published]',
    date: '2024-12-28',
    category: 'result',
    content: '[ফলাফল সংক্রান্ত নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content about results will be placed here - Editable.]',
  },
  {
    id: '6',
    title: '[নমুনা নোটিশ - শীতকালীন ছুটির বিজ্ঞপ্তি]',
    titleEn: '[Sample Notice - Winter Vacation Notice]',
    date: '2024-12-20',
    category: 'notice',
    content: '[ছুটি সংক্রান্ত নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content about vacation will be placed here - Editable.]',
  },
];

// Departments
export const departments: Department[] = [
  { id: 'quran', name: 'বিভাগুল কুরআন', nameEn: 'Department of Quran', description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]', descriptionEn: '[Department description - Editable]', icon: 'BookOpen' },
  { id: 'hadith', name: 'বিভাগুল হাদীস', nameEn: 'Department of Hadith', description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]', descriptionEn: '[Department description - Editable]', icon: 'ScrollText' },
  { id: 'fiqh', name: 'বিভাগুল ফিকহ', nameEn: 'Department of Fiqh', description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]', descriptionEn: '[Department description - Editable]', icon: 'Scale' },
  { id: 'arabic', name: 'বিভাগুল আরবি', nameEn: 'Department of Arabic', description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]', descriptionEn: '[Department description - Editable]', icon: 'Languages' },
  { id: 'general', name: 'সাধারণ শিক্ষা বিভাগ', nameEn: 'General Education Department', description: '[বিভাগের বিবরণ - সম্পাদনাযোগ্য]', descriptionEn: '[Department description - Editable]', icon: 'GraduationCap' },
];

// Teachers - Demo data
export const demoTeachers: Teacher[] = [
  { id: '1', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'অধ্যক্ষ', designationEn: 'Principal', department: 'quran', departmentEn: 'Quran', image: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165301/probasak.jpg' },
  { id: '2', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'সহকারী অধ্যাপক', designationEn: 'Assistant Professor', department: 'hadith', departmentEn: 'Hadith' },
  { id: '3', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'প্রভাষক', designationEn: 'Lecturer', department: 'arabic', departmentEn: 'Arabic' },
  { id: '4', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'প্রভাষক', designationEn: 'Lecturer', department: 'fiqh', departmentEn: 'Fiqh' },
  { id: '5', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'সহকারী শিক্ষক', designationEn: 'Assistant Teacher', department: 'general', departmentEn: 'General Education' },
  { id: '6', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'সহকারী শিক্ষক', designationEn: 'Assistant Teacher', department: 'quran', departmentEn: 'Quran' },
  { id: '7', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'প্রভাষক', designationEn: 'Lecturer', department: 'hadith', departmentEn: 'Hadith' },
  { id: '8', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'সহকারী অধ্যাপক', designationEn: 'Assistant Professor', department: 'arabic', departmentEn: 'Arabic' },
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
    id: 'dawra-hadith',
    name: 'দাওরায়ে হাদীস (তাকমীল)',
    nameEn: 'Dawra-e-Hadith (Takmeel)',
    level: 'উচ্চতর ডিপ্লোমা',
    levelEn: 'Higher Diploma',
    duration: '১ বছর',
    durationEn: '1 Year',
    description: '[প্রোগ্রামের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Program description - Editable]',
  },
  {
    id: 'fazil',
    name: 'ফাজিল (ডিগ্রি)',
    nameEn: 'Fazil (Degree)',
    level: 'স্নাতক (সম্মান)',
    levelEn: 'Bachelor (Honours)',
    duration: '৪ বছর',
    durationEn: '4 Years',
    description: '[প্রোগ্রামের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Program description - Editable]',
  },
  {
    id: 'alim',
    name: 'আলিম',
    nameEn: 'Alim',
    level: 'মাধ্যমিক সমমান',
    levelEn: 'Secondary Equivalent',
    duration: '২ বছর',
    durationEn: '2 Years',
    description: '[প্রোগ্রামের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Program description - Editable]',
  },
  {
    id: 'dakhil',
    name: 'দাখিল',
    nameEn: 'Dakhil',
    level: 'মাধ্যমিক',
    levelEn: 'Secondary',
    duration: '২ বছর',
    durationEn: '2 Years',
    description: '[প্রোগ্রামের বিবরণ - সম্পাদনাযোগ্য]',
    descriptionEn: '[Program description - Editable]',
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
  { id: '1', title: '[নমুনা - ভর্তি ফরম]', titleEn: '[Sample - Admission Form]', category: 'admission', date: '2025-01-15', fileSize: '250 KB', fileType: 'PDF' },
  { id: '2', title: '[নমুনা - ক্লাস রুটিন]', titleEn: '[Sample - Class Routine]', category: 'routine', date: '2025-01-10', fileSize: '180 KB', fileType: 'PDF' },
  { id: '3', title: '[নমুনা - পরীক্ষার সময়সূচী]', titleEn: '[Sample - Exam Schedule]', category: 'exam', date: '2025-01-05', fileSize: '320 KB', fileType: 'PDF' },
  { id: '4', title: '[নমুনা - সিলেবাস - দাখিল]', titleEn: '[Sample - Syllabus - Dakhil]', category: 'syllabus', date: '2024-12-20', fileSize: '1.2 MB', fileType: 'PDF' },
  { id: '5', title: '[নমুনা - শিক্ষা ক্যালেন্ডার ২০২৫]', titleEn: '[Sample - Academic Calendar 2025]', category: 'calendar', date: '2024-12-15', fileSize: '450 KB', fileType: 'PDF' },
  { id: '6', title: '[নমুনা - সিলেবাস - আলিম]', titleEn: '[Sample - Syllabus - Alim]', category: 'syllabus', date: '2024-12-10', fileSize: '1.5 MB', fileType: 'PDF' },
];

// Gallery Images
export const galleryImages = [
  { id: '1', src: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165382/bitushbg.jpg', alt: 'মাদ্রাসা ভবন', altEn: 'Madrasa Building', category: 'building' },
];

// Quick Services
export const quickServices = [
  { label: 'ভর্তি তথ্য', labelEn: 'Admission Info', href: '/admission', icon: 'FileText' },
  { label: 'ক্লাস রুটিন', labelEn: 'Class Routine', href: '/academics/routine', icon: 'Calendar' },
  { label: 'পরীক্ষার রুটিন', labelEn: 'Exam Routine', href: '/academics/exam-routine', icon: 'ClipboardList' },
  { label: 'ফলাফল', labelEn: 'Results', href: '/results', icon: 'Award' },
  { label: 'নোটিশ বোর্ড', labelEn: 'Notice Board', href: '/notices', icon: 'Bell' },
  { label: 'ডাউনলোড', labelEn: 'Downloads', href: '/downloads', icon: 'Download' },
  { label: 'শিক্ষা ক্যালেন্ডার', labelEn: 'Academic Calendar', href: '/academics/calendar', icon: 'CalendarDays' },
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

// Exam types for results page
export const examTypes = [
  { value: '', label: 'সকল পরীক্ষা', labelEn: 'All Exams' },
  { value: 'alim', label: 'আলিম পরীক্ষা', labelEn: 'Alim Exam' },
  { value: 'dakhil', label: 'দাখিল পরীক্ষা', labelEn: 'Dakhil Exam' },
  { value: 'fazil', label: 'ফাজিল পরীক্ষা', labelEn: 'Fazil Exam' },
  { value: 'annual', label: 'বার্ষিক পরীক্ষা', labelEn: 'Annual Exam' },
];

export const examYears = [
  { value: '', label: 'সকল বছর', labelEn: 'All Years' },
  { value: '2024', label: '২০২৪', labelEn: '2024' },
  { value: '2023', label: '২০২৩', labelEn: '2023' },
  { value: '2022', label: '২০২২', labelEn: '2022' },
];

// Gallery categories
export const galleryCategories = [
  { value: 'all', label: 'সব ছবি', labelEn: 'All Photos' },
  { value: 'building', label: 'ভবন', labelEn: 'Building' },
  { value: 'event', label: 'অনুষ্ঠান', labelEn: 'Events' },
  { value: 'classroom', label: 'শ্রেণিকক্ষ', labelEn: 'Classroom' },
  { value: 'library', label: 'লাইব্রেরি', labelEn: 'Library' },
];
