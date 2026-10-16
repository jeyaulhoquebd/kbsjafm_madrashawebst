/**
 * Results Service
 * Firestore operations for the results collection
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
import type { Result, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'results');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

export async function getPublishedResults(options: QueryOptions = {}): Promise<Result[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'publishDate',
    orderDirection: options.orderDirection || 'desc',
  });
  return getAllDocuments<Result>(collectionRef, constraints);
}

export async function getPublishedResult(id: string): Promise<Result | null> {
  const result = await getDocumentById<Result>(collectionRef, id);
  if (!result || result.status !== 'published') {
    return null;
  }
  return result;
}

export async function getResultsByExamType(examType: string): Promise<Result[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('examType', '==', examType),
    orderBy('publishDate', 'desc'),
  ];
  return getAllDocuments<Result>(collectionRef, constraints);
}

export async function getResultsByYear(academicYear: string): Promise<Result[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('academicYear', '==', academicYear),
    orderBy('publishDate', 'desc'),
  ];
  return getAllDocuments<Result>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations
// ============================================================================

export async function getAllResultsAdmin(): Promise<Result[]> {
  const constraints = [orderBy('publishDate', 'desc')];
  return getAllDocuments<Result>(collectionRef, constraints);
}

export async function getResultByIdAdmin(id: string): Promise<Result | null> {
  return getDocumentById<Result>(collectionRef, id);
}

export async function createResult(
  data: Omit<Result, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const resultData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, resultData);
}

export async function updateResult(
  id: string,
  data: Partial<Result>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

export async function deleteResult(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

export async function publishResult(id: string, userId: string): Promise<void> {
  return updateResult(id, { status: 'published' }, userId);
}

export async function unpublishResult(id: string, userId: string): Promise<void> {
  return updateResult(id, { status: 'draft' }, userId);
}
