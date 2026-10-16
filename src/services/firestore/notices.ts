/**
 * Notices Service
 * Firestore operations for the notices collection
 */

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getPaginatedDocuments,
  createAuditFields,
  updateAuditFields,
  buildQueryConstraints,
} from './base';
import type { Notice, PublicationStatus, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'notices');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

/**
 * Get all published notices
 */
export async function getPublishedNotices(options: QueryOptions = {}): Promise<Notice[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'date',
    orderDirection: options.orderDirection || 'desc',
  });
  return getAllDocuments<Notice>(collectionRef, constraints);
}

/**
 * Get a single notice by ID (only if published)
 */
export async function getPublishedNotice(id: string): Promise<Notice | null> {
  const notice = await getDocumentById<Notice>(collectionRef, id);
  if (!notice || notice.status !== 'published') {
    return null;
  }
  return notice;
}

/**
 * Get paginated published notices
 */
export async function getPaginatedPublishedNotices(
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot,
  category?: string
) {
  const constraints = buildQueryConstraints({
    status: 'published',
    category,
    orderBy: 'date',
    orderDirection: 'desc',
  });

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  return getPaginatedDocuments<Notice>(collectionRef, constraints, pageSize);
}

/**
 * Get notices by category
 */
export async function getNoticesByCategory(category: string): Promise<Notice[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('category', '==', category),
    orderBy('date', 'desc'),
  ];
  return getAllDocuments<Notice>(collectionRef, constraints);
}

/**
 * Get urgent notices
 */
export async function getUrgentNotices(): Promise<Notice[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('isUrgent', '==', true),
    orderBy('date', 'desc'),
  ];
  return getAllDocuments<Notice>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations (Require authentication)
// ============================================================================

/**
 * Get all notices (including drafts) - Admin only
 */
export async function getAllNoticesAdmin(): Promise<Notice[]> {
  const constraints = [orderBy('date', 'desc')];
  return getAllDocuments<Notice>(collectionRef, constraints);
}

/**
 * Get a single notice by ID (including drafts) - Admin only
 */
export async function getNoticeByIdAdmin(id: string): Promise<Notice | null> {
  return getDocumentById<Notice>(collectionRef, id);
}

/**
 * Create a new notice - Admin only
 */
export async function createNotice(
  data: Omit<Notice, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const noticeData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, noticeData);
}

/**
 * Update a notice - Admin only
 */
export async function updateNotice(
  id: string,
  data: Partial<Notice>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Delete a notice - Admin only
 */
export async function deleteNotice(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

/**
 * Publish a notice - Admin only
 */
export async function publishNotice(id: string, userId: string): Promise<void> {
  return updateNotice(id, { status: 'published' }, userId);
}

/**
 * Unpublish a notice (set to draft) - Admin only
 */
export async function unpublishNotice(id: string, userId: string): Promise<void> {
  return updateNotice(id, { status: 'draft' }, userId);
}
