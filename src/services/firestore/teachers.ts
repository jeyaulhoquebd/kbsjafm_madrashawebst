/**
 * Teachers Service
 * Firestore operations for the teachers collection
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
import type { Teacher, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'teachers');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

/**
 * Get all published teachers
 */
export async function getPublishedTeachers(options: QueryOptions = {}): Promise<Teacher[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'displayOrder',
    orderDirection: options.orderDirection || 'asc',
  });
  return getAllDocuments<Teacher>(collectionRef, constraints);
}

/**
 * Get a single teacher by ID (only if published)
 */
export async function getPublishedTeacher(id: string): Promise<Teacher | null> {
  const teacher = await getDocumentById<Teacher>(collectionRef, id);
  if (!teacher || teacher.status !== 'published') {
    return null;
  }
  return teacher;
}

/**
 * Get teachers by department
 */
export async function getTeachersByDepartment(department: string): Promise<Teacher[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('department', '==', department),
    orderBy('displayOrder', 'asc'),
  ];
  return getAllDocuments<Teacher>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations (Require authentication)
// ============================================================================

/**
 * Get all teachers (including drafts) - Admin only
 */
export async function getAllTeachersAdmin(): Promise<Teacher[]> {
  const constraints = [orderBy('displayOrder', 'asc')];
  return getAllDocuments<Teacher>(collectionRef, constraints);
}

/**
 * Get a single teacher by ID (including drafts) - Admin only
 */
export async function getTeacherByIdAdmin(id: string): Promise<Teacher | null> {
  return getDocumentById<Teacher>(collectionRef, id);
}

/**
 * Create a new teacher - Admin only
 */
export async function createTeacher(
  data: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const teacherData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, teacherData);
}

/**
 * Update a teacher - Admin only
 */
export async function updateTeacher(
  id: string,
  data: Partial<Teacher>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Delete a teacher - Admin only
 */
export async function deleteTeacher(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

/**
 * Publish a teacher - Admin only
 */
export async function publishTeacher(id: string, userId: string): Promise<void> {
  return updateTeacher(id, { status: 'published' }, userId);
}

/**
 * Unpublish a teacher (set to draft) - Admin only
 */
export async function unpublishTeacher(id: string, userId: string): Promise<void> {
  return updateTeacher(id, { status: 'draft' }, userId);
}
