/**
 * Academic Content Service
 * Firestore operations for the academicContent collection
 */

import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  createAuditFields,
  updateAuditFields,
  buildQueryConstraints,
} from './base';
import type { AcademicContent, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'academicContent');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

export async function getPublishedAcademicContent(options: QueryOptions = {}): Promise<AcademicContent[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'displayOrder',
    orderDirection: options.orderDirection || 'asc',
  });
  return getAllDocuments<AcademicContent>(collectionRef, constraints);
}

export async function getPublishedAcademicContentById(id: string): Promise<AcademicContent | null> {
  const content = await getDocumentById<AcademicContent>(collectionRef, id);
  if (!content || content.status !== 'published') {
    return null;
  }
  return content;
}

export async function getAcademicContentByType(type: string): Promise<AcademicContent[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('type', '==', type),
    orderBy('displayOrder', 'asc'),
  ];
  return getAllDocuments<AcademicContent>(collectionRef, constraints);
}

export async function getAcademicContentByYear(academicYear: string): Promise<AcademicContent[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('academicYear', '==', academicYear),
    orderBy('displayOrder', 'asc'),
  ];
  return getAllDocuments<AcademicContent>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations
// ============================================================================

export async function getAllAcademicContentAdmin(): Promise<AcademicContent[]> {
  const constraints = [orderBy('displayOrder', 'asc')];
  return getAllDocuments<AcademicContent>(collectionRef, constraints);
}

export async function getAcademicContentByIdAdmin(id: string): Promise<AcademicContent | null> {
  return getDocumentById<AcademicContent>(collectionRef, id);
}

export async function createAcademicContent(
  data: Omit<AcademicContent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const contentData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, contentData);
}

export async function updateAcademicContent(
  id: string,
  data: Partial<AcademicContent>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

export async function deleteAcademicContent(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

export async function publishAcademicContent(id: string, userId: string): Promise<void> {
  return updateAcademicContent(id, { status: 'published' }, userId);
}

export async function unpublishAcademicContent(id: string, userId: string): Promise<void> {
  return updateAcademicContent(id, { status: 'draft' }, userId);
}
