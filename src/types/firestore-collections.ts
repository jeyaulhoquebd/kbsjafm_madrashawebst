/**
 * Firestore Collection Types
 * Type definitions for all Firestore collections in the madrasa website
 */

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// Common Types
// ============================================================================

export type PublicationStatus = 'draft' | 'published';

export interface AuditFields {
  createdBy: string;
  updatedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// 1. siteSettings Collection
// ============================================================================

export interface SiteSettings {
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
  principalPhotoUrl: string;
  logoUrl: string;
  buildingPhotoUrl: string;
  updatedAt: Timestamp;
  updatedBy: string;
}

// ============================================================================
// 2. notices Collection
// ============================================================================

export interface Notice extends AuditFields {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  date: string;
  category: 'notice' | 'event' | 'result' | 'admission';
  isUrgent: boolean;
  status: PublicationStatus;
  author: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: string;
}

// ============================================================================
// 3. teachers Collection
// ============================================================================

export interface Teacher extends AuditFields {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  department: string;
  departmentEn: string;
  biography: string;
  biographyEn: string;
  photoUrl: string;
  email: string;
  phone: string;
  displayOrder: number;
  status: PublicationStatus;
}

// ============================================================================
// 4. gallery Collection
// ============================================================================

export interface GalleryImage extends AuditFields {
  id: string;
  title: string;
  titleEn: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  category: string;
  altText: string;
  altTextEn: string;
  displayOrder: number;
  status: PublicationStatus;
}

// ============================================================================
// 5. resources Collection
// ============================================================================

export interface Resource extends AuditFields {
  id: string;
  title: string;
  titleEn: string;
  type: 'routine' | 'exam-routine' | 'syllabus' | 'calendar' | 'other';
  category: string;
  fileName: string;
  fileFormat: string;
  fileSize: string;
  storagePath: string;
  downloadUrl: string;
  displayOrder: number;
  status: PublicationStatus;
}

// ============================================================================
// 6. academicContent Collection
// ============================================================================

export interface AcademicContent extends AuditFields {
  id: string;
  title: string;
  titleEn: string;
  type: 'program' | 'routine' | 'exam-schedule' | 'syllabus' | 'calendar';
  content: string;
  contentEn: string;
  academicYear: string;
  displayOrder: number;
  status: PublicationStatus;
}

// ============================================================================
// 7. results Collection
// ============================================================================

export interface Result extends AuditFields {
  id: string;
  title: string;
  titleEn: string;
  examType: string;
  academicYear: string;
  className: string;
  publishDate: string;
  summary: string;
  summaryEn: string;
  detailsUrl?: string;
  status: PublicationStatus;
}

// ============================================================================
// 8. admissionInquiries Collection
// ============================================================================

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  appliedClass: string;
  message: string;
  status: 'new' | 'reviewed' | 'responded' | 'closed';
  adminNotes: string;
  submittedAt: Timestamp;
  reviewedAt?: Timestamp;
  reviewedBy?: string;
}

// ============================================================================
// 9. contactMessages Collection
// ============================================================================

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  adminNotes: string;
  submittedAt: Timestamp;
  readAt?: Timestamp;
  readBy?: string;
}

// ============================================================================
// 10. admins Collection
// ============================================================================

export interface Admin {
  id: string;
  email: string;
  displayName: string;
  role: 'super-admin' | 'admin' | 'editor';
  isActive: boolean;
  lastLoginAt?: Timestamp;
  createdAt: Timestamp;
  createdBy: string;
}

// ============================================================================
// Query Types
// ============================================================================

export interface QueryOptions {
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  status?: PublicationStatus;
  category?: string;
}

// Pagination helper - will be used in services
export type PaginatedData = {
  data: any[];
  lastDoc: any | null;
  hasMore: boolean;
};
