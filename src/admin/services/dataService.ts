// Admin Data Service - Abstraction Layer
// This service abstracts data operations so Firebase can replace it later
// without rewriting the UI components.

import { NoticeFull } from '../../data/mockData';
import type { Teacher } from '../../types';

// ============ Types ============

export interface GalleryImage {
  id: string;
  src: string;
  cloudinaryPublicId?: string;
  alt: string;
  altEn: string;
  category: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroDescription: string;
  heroDescriptionEn: string;
  heroBackgroundUrl?: string;
  heroBackgroundPublicId?: string;
  announcement: string;
  announcementEn: string;
  principalName: string;
  principalNameEn: string;
  principalDesignation: string;
  principalDesignationEn: string;
  principalMessage: string;
  principalMessageEn: string;
  principalPhotoUrl?: string;
  principalPhotoPublicId?: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  titleEn: string;
  type: 'routine' | 'exam-routine' | 'syllabus' | 'calendar' | 'other';
  category: string;
  date: string;
  fileSize?: string;
  fileType: string;
  url?: string;
}

export interface SiteSettings {
  institutionName: string;
  institutionNameEn: string;
  shortName: string;
  shortNameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  website: string;
  eiin: string;
  established: string;
  motto: string;
  mottoEn: string;
}

// ============ Initial Demo Data ============

export const initialNotices: NoticeFull[] = [
  {
    id: '1',
    title: '[নমুনা নোটিশ - ২০২৫ শিক্ষাবর্ষে ভর্তি কার্যক্রম শুরু]',
    titleEn: '[Sample Notice - Admission for 2025 Academic Year Started]',
    date: '2025-01-15',
    category: 'admission',
    isUrgent: true,
    content: '[নোটিশের বিস্তারিত বিবরণ এখানে বসবে - সম্পাদনাযোগ্য।]',
    contentEn: '[Detailed notice content will be placed here - Editable.]',
    author: '[প্রশাসন - সম্পাদনাযোগ্য]',
  },
  {
    id: '2',
    title: '[নমুনা নোটিশ - বার্ষিক পরীক্ষার সময়সূচী প্রকাশ]',
    titleEn: '[Sample Notice - Annual Exam Schedule Published]',
    date: '2025-01-10',
    category: 'notice',
    content: '[পরীক্ষার সময়সূচী সংক্রান্ত নোটিশের বিস্তারিত বিবরণ]',
    contentEn: '[Detailed notice content about exam schedule]',
    attachmentUrl: '#',
    attachmentName: 'পরীক্ষার_সময়সূচী_২০২৫.pdf',
  },
  {
    id: '3',
    title: '[নমুনা নোটিশ - বার্ষিক দোয়া ও পুরস্কার বিতরণী অনুষ্ঠান]',
    titleEn: '[Sample Notice - Annual Prayer and Prize Distribution]',
    date: '2025-01-05',
    category: 'event',
    content: '[অনুষ্ঠান সংক্রান্ত নোটিশের বিস্তারিত বিবরণ]',
    contentEn: '[Detailed notice content about the event]',
  },
];

export const initialTeachers: Teacher[] = [
  { id: '1', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'অধ্যক্ষ', designationEn: 'Principal', department: 'quran', departmentEn: 'Quran', image: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165301/probasak.jpg' },
  { id: '2', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'সহকারী অধ্যাপক', designationEn: 'Assistant Professor', department: 'hadith', departmentEn: 'Hadith' },
  { id: '3', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'প্রভাষক', designationEn: 'Lecturer', department: 'arabic', departmentEn: 'Arabic' },
  { id: '4', name: '[শিক্ষকের নাম - সম্পাদনাযোগ্য]', nameEn: '[Teacher Name - Editable]', designation: 'প্রভাষক', designationEn: 'Lecturer', department: 'fiqh', departmentEn: 'Fiqh' },
];

export const initialResources: AcademicResource[] = [
  { id: '1', title: '[নমুনা - ক্লাস রুটিন]', titleEn: '[Sample - Class Routine]', type: 'routine', category: 'routine', date: '2025-01-10', fileSize: '180 KB', fileType: 'PDF' },
  { id: '2', title: '[নমুনা - পরীক্ষার সময়সূচী]', titleEn: '[Sample - Exam Schedule]', type: 'exam-routine', category: 'exam', date: '2025-01-05', fileSize: '320 KB', fileType: 'PDF' },
  { id: '3', title: '[নমুনা - সিলেবাস - দাখিল]', titleEn: '[Sample - Syllabus - Dakhil]', type: 'syllabus', category: 'syllabus', date: '2024-12-20', fileSize: '1.2 MB', fileType: 'PDF' },
];

export const initialGallery: GalleryImage[] = [
  { id: '1', src: 'https://res.cloudinary.com/dc80xvaid/image/upload/v1792165382/bitushbg.jpg', alt: 'মাদ্রাসা ভবন', altEn: 'Madrasa Building', category: 'building' },
];

export const initialHomepage: HomepageContent = {
  heroTitle: 'খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া',
  heroTitleEn: 'Khagrachhari Baitush Sharaf Jabbaria',
  heroSubtitle: 'আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা',
  heroSubtitleEn: 'Adarsha Fazil (Degree) Madrasa',
  heroDescription: 'এই প্রতিষ্ঠান কুরআন, হাদীস, ফিকহ ও আধুনিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের জ্ঞানার্জন ও চরিত্র গঠনে নিবেদিত।',
  heroDescriptionEn: 'This institution is dedicated to nurturing students through a combination of Quran, Hadith, Fiqh, and modern education.',
  announcement: '[হোমপেজ ঘোষণা - সম্পাদনাযোগ্য]',
  announcementEn: '[Homepage announcement - Editable]',
  principalName: '[অধ্যক্ষের নাম - সম্পাদনাযোগ্য]',
  principalNameEn: "[Principal's Name - Editable]",
  principalDesignation: '[পদবি - সম্পাদনাযোগ্য]',
  principalDesignationEn: '[Designation - Editable]',
  principalMessage: '[অধ্যক্ষের বাণী এখানে বসবে - সম্পাদনাযোগ্য।]',
  principalMessageEn: "[Principal's message will be placed here - Editable.]",
};

export const initialSettings: SiteSettings = {
  institutionName: 'খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা',
  institutionNameEn: 'Khagrachhari Baitush Sharaf Jabbaria Adarsha Fazil (Degree) Madrasa',
  shortName: 'বাইতুশ শরফ জাব্বারিয়া মাদ্রাসা',
  shortNameEn: 'Baitush Sharaf Jabbaria Madrasa',
  address: '[প্রতিষ্ঠানের ঠিকানা - সম্পাদনাযোগ্য], খাগড়াছড়ি, বাংলাদেশ',
  addressEn: '[Institution Address - Editable], Khagrachhari, Bangladesh',
  phone: '[ফোন নম্বর - সম্পাদনাযোগ্য]',
  email: '[ইমেইল - সম্পাদনাযোগ্য]',
  website: '[ওয়েবসাইট - সম্পাদনাযোগ্য]',
  eiin: '[EIIN নম্বর - সম্পাদনাযোগ্য]',
  established: '[স্থাপনের বছর - সম্পাদনাযোগ্য]',
  motto: 'জ্ঞান, বিশ্বাস ও সেবা',
  mottoEn: 'Knowledge, Faith & Service',
};

// ============ Service Functions ============
// These functions will later be replaced with Firebase calls

export const dataService = {
  // Notices
  getNotices: async (): Promise<NoticeFull[]> => {
    return initialNotices;
  },

  // Teachers
  getTeachers: async (): Promise<Teacher[]> => {
    return initialTeachers;
  },

  // Resources
  getResources: async (): Promise<AcademicResource[]> => {
    return initialResources;
  },

  // Gallery
  getGallery: async (): Promise<GalleryImage[]> => {
    return initialGallery;
  },

  // Homepage
  getHomepage: async (): Promise<HomepageContent> => {
    return initialHomepage;
  },

  // Settings
  getSettings: async (): Promise<SiteSettings> => {
    return initialSettings;
  },
};

// Helper: Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
