/**
 * Admission Inquiries Service
 * Firestore operations for the admissionInquiries collection
 */

import { collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  buildQueryConstraints,
} from './base';
import { logFirebaseError } from '../../lib/firebase-errors';
import type { AdmissionInquiry } from '../../types/firestore-collections';

const collectionRef = collection(db, 'admissionInquiries');

// ============================================================================
// Public Operations
// ============================================================================

/**
 * Submit a new admission inquiry - Public
 */
export async function submitAdmissionInquiry(
  data: Omit<AdmissionInquiry, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'reviewedAt' | 'reviewedBy'>
): Promise<string> {
  try {
    const inquiryData = {
      ...data,
      status: 'new' as const,
      adminNotes: '',
      submittedAt: serverTimestamp(),
    };
    return await createDocument(collectionRef, inquiryData);
  } catch (error) {
    logFirebaseError('submitAdmissionInquiry', error);
    throw error;
  }
}

// ============================================================================
// Admin Operations
// ============================================================================

/**
 * Get all admission inquiries - Admin only
 */
export async function getAllAdmissionInquiriesAdmin(): Promise<AdmissionInquiry[]> {
  const constraints = [orderBy('submittedAt', 'desc')];
  return getAllDocuments<AdmissionInquiry>(collectionRef, constraints);
}

/**
 * Get admission inquiries by status - Admin only
 */
export async function getAdmissionInquiriesByStatusAdmin(
  status: AdmissionInquiry['status']
): Promise<AdmissionInquiry[]> {
  const constraints = [
    where('status', '==', status),
    orderBy('submittedAt', 'desc'),
  ];
  return getAllDocuments<AdmissionInquiry>(collectionRef, constraints);
}

/**
 * Get a single admission inquiry by ID - Admin only
 */
export async function getAdmissionInquiryByIdAdmin(id: string): Promise<AdmissionInquiry | null> {
  return getDocumentById<AdmissionInquiry>(collectionRef, id);
}

/**
 * Update admission inquiry status - Admin only
 */
export async function updateAdmissionInquiryStatus(
  id: string,
  status: AdmissionInquiry['status'],
  adminNotes: string,
  userId: string
): Promise<void> {
  const updateData = {
    status,
    adminNotes,
    reviewedAt: serverTimestamp(),
    reviewedBy: userId,
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Mark inquiry as reviewed - Admin only
 */
export async function markInquiryAsReviewed(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  return updateAdmissionInquiryStatus(id, 'reviewed', adminNotes, userId);
}

/**
 * Mark inquiry as responded - Admin only
 */
export async function markInquiryAsResponded(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  return updateAdmissionInquiryStatus(id, 'responded', adminNotes, userId);
}

/**
 * Mark inquiry as closed - Admin only
 */
export async function markInquiryAsClosed(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  return updateAdmissionInquiryStatus(id, 'closed', adminNotes, userId);
}
