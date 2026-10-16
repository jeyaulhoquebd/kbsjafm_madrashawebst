/**
 * Firestore Schema Types
 *
 * Type definitions for Firestore document structures.
 * These types define the shape of data stored in Cloud Firestore.
 *
 * Note: When Firebase is installed, replace Timestamp with:
 * import type { Timestamp } from 'firebase/firestore';
 */

// Temporary Timestamp type - will be replaced with Firebase Timestamp
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
  toDate(): Date;
  toMillis(): number;
}

// ============ Collection Names ============

export const COLLECTIONS = {
  NOTICES: 'notices',
  TEACHERS: 'teachers',
  RESOURCES: 'resources',
  GALLERY: 'gallery',
  HOMEPAGE: 'homepage',
  SETTINGS: 'settings',
  USERS: 'users',
  SUBMISSIONS: 'submissions',
} as const;

// ============ Base Document Types ============

export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
}

// ============ Notice Document ============

export interface NoticeDocument extends BaseDocument {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  date: string; // ISO date string for display
  category: 'notice' | 'event' | 'result' | 'admission';
  isUrgent: boolean;
  isPublished: boolean;
  author?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: number;
  viewCount: number;
}

// ============ Teacher Document ============

export interface TeacherDocument extends BaseDocument {
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  department: string;
  departmentEn: string;
  biography?: string;
  biographyEn?: string;
  photoUrl?: string;
  photoPublicId?: string; // Cloudinary public ID
  email?: string;
  phone?: string;
  isPublished: boolean;
  order: number; // For sorting
}

// ============ Resource Document ============

export interface ResourceDocument extends BaseDocument {
  title: string;
  titleEn: string;
  type: 'routine' | 'exam-routine' | 'syllabus' | 'calendar' | 'other';
  category: string;
  date: string;
  fileSize?: string;
  fileType: string;
  fileUrl?: string;
  filePublicId?: string; // Firebase Storage path
  downloadCount: number;
  isPublished: boolean;
}

// ============ Gallery Document ============

export interface GalleryDocument extends BaseDocument {
  title: string;
  titleEn: string;
  category: string;
  imageUrl: string;
  imagePublicId: string; // Cloudinary public ID
  thumbnailUrl?: string;
  order: number;
  isPublished: boolean;
}

// ============ Homepage Document ============

export interface HomepageDocument {
  id: string;
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroDescription: string;
  heroDescriptionEn: string;
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
  updatedAt: Timestamp;
  updatedBy: string;
}

// ============ Settings Document ============

export interface SettingsDocument {
  id: string;
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
  logoUrl?: string;
  logoPublicId?: string;
  updatedAt: Timestamp;
  updatedBy: string;
}

// ============ User Document ============

export interface UserDocument extends BaseDocument {
  email: string;
  displayName: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLoginAt?: Timestamp;
}

// ============ Submission Document (Contact/Admission Forms) ============

export interface SubmissionDocument extends BaseDocument {
  type: 'contact' | 'admission';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  // Admission-specific fields
  fatherName?: string;
  motherName?: string;
  appliedClass?: string;
  status: 'new' | 'read' | 'responded' | 'archived';
}

// ============ Query Types ============

export interface QueryFilters {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  category?: string;
  isPublished?: boolean;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
  lastDoc?: unknown;
}
