/**
 * Base Firestore Utility
 * Common operations for Firestore collections
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { logFirebaseError } from '../../lib/firebase-errors';
import type { AuditFields, PublicationStatus } from '../../types/firestore-collections';

// ============================================================================
// Collection References
// ============================================================================

export const collections = {
  siteSettings: collection(db, 'siteSettings'),
  notices: collection(db, 'notices'),
  teachers: collection(db, 'teachers'),
  gallery: collection(db, 'gallery'),
  resources: collection(db, 'resources'),
  academicContent: collection(db, 'academicContent'),
  results: collection(db, 'results'),
  admissionInquiries: collection(db, 'admissionInquiries'),
  contactMessages: collection(db, 'contactMessages'),
  admins: collection(db, 'admins'),
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert Firestore document to typed object
 */
export function docToTyped<T>(docSnap: QueryDocumentSnapshot): T {
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as T;
}

/**
 * Convert Firestore document snapshot to typed object
 */
export function docSnapToTyped<T>(docSnap: any): T | null {
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as T;
}

/**
 * Create audit fields for new documents
 */
export function createAuditFields(userId: string): Omit<AuditFields, 'createdAt' | 'updatedAt'> & {
  createdAt: ReturnType<typeof serverTimestamp>;
  updatedAt: ReturnType<typeof serverTimestamp>;
} {
  return {
    createdBy: userId,
    updatedBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

/**
 * Create update audit fields
 */
export function updateAuditFields(userId: string) {
  return {
    updatedBy: userId,
    updatedAt: serverTimestamp(),
  };
}

/**
 * Build query constraints from options
 */
export function buildQueryConstraints(options: {
  status?: PublicationStatus;
  category?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  startAfterDoc?: QueryDocumentSnapshot;
}): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (options.status) {
    constraints.push(where('status', '==', options.status));
  }

  if (options.category) {
    constraints.push(where('category', '==', options.category));
  }

  if (options.orderBy) {
    constraints.push(orderBy(options.orderBy, options.orderDirection || 'desc'));
  }

  if (options.limit) {
    constraints.push(limit(options.limit));
  }

  if (options.startAfterDoc) {
    constraints.push(startAfter(options.startAfterDoc));
  }

  return constraints;
}

// ============================================================================
// Generic CRUD Operations
// ============================================================================

/**
 * Get all documents from a collection
 */
export async function getAllDocuments<T>(
  collectionRef: any,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc: any) => docToTyped<T>(doc));
  } catch (error) {
    logFirebaseError('getAllDocuments', error);
    throw error;
  }
}

/**
 * Get a single document by ID
 */
export async function getDocumentById<T>(
  collectionRef: any,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(collectionRef, id);
    const docSnap = await getDoc(docRef);
    return docSnapToTyped<T>(docSnap);
  } catch (error) {
    logFirebaseError('getDocumentById', error);
    throw error;
  }
}

/**
 * Create a new document
 */
export async function createDocument<T extends DocumentData>(
  collectionRef: any,
  data: T
): Promise<string> {
  try {
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    logFirebaseError('createDocument', error);
    throw error;
  }
}

/**
 * Update a document
 */
export async function updateDocument(
  collectionRef: any,
  id: string,
  data: Partial<DocumentData>
): Promise<void> {
  try {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, data);
  } catch (error) {
    logFirebaseError('updateDocument', error);
    throw error;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(
  collectionRef: any,
  id: string
): Promise<void> {
  try {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
  } catch (error) {
    logFirebaseError('deleteDocument', error);
    throw error;
  }
}

/**
 * Paginated query
 */
export async function getPaginatedDocuments<T>(
  collectionRef: any,
  constraints: QueryConstraint[],
  pageSize: number
): Promise<{ data: T[]; lastDoc: any | null; hasMore: boolean }> {
  try {
    const q = query(collectionRef, ...constraints, limit(pageSize + 1));
    const querySnapshot = await getDocs(q);
    
    const hasMore = querySnapshot.docs.length > pageSize;
    const docs = querySnapshot.docs.slice(0, pageSize);
    const lastDoc = hasMore ? docs[docs.length - 1] : null;
    const resultData = docs.map((doc: any) => docToTyped<T>(doc));
    
    return {
      data: resultData,
      lastDoc,
      hasMore,
    };
  } catch (error) {
    logFirebaseError('getPaginatedDocuments', error);
    throw error;
  }
}
