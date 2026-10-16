/**
 * Admins Service
 * Firestore operations for the admins collection
 */

import { collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from './base';
import { logFirebaseError } from '../../lib/firebase-errors';
import type { Admin } from '../../types/firestore-collections';

const collectionRef = collection(db, 'admins');

// ============================================================================
// Admin Operations (Require super-admin authentication)
// ============================================================================

/**
 * Get all admins - Super Admin only
 */
export async function getAllAdmins(): Promise<Admin[]> {
  const constraints = [orderBy('createdAt', 'desc')];
  return getAllDocuments<Admin>(collectionRef, constraints);
}

/**
 * Get active admins only - Super Admin only
 */
export async function getActiveAdmins(): Promise<Admin[]> {
  const constraints = [
    where('isActive', '==', true),
    orderBy('createdAt', 'desc'),
  ];
  return getAllDocuments<Admin>(collectionRef, constraints);
}

/**
 * Get admin by UID - Super Admin only
 */
export async function getAdminByUid(uid: string): Promise<Admin | null> {
  return getDocumentById<Admin>(collectionRef, uid);
}

/**
 * Get admin by email - Super Admin only
 */
export async function getAdminByEmail(email: string): Promise<Admin | null> {
  const constraints = [where('email', '==', email)];
  const admins = await getAllDocuments<Admin>(collectionRef, constraints);
  return admins.length > 0 ? admins[0] : null;
}

/**
 * Create a new admin - Super Admin only
 */
export async function createAdmin(
  uid: string,
  email: string,
  displayName: string,
  role: Admin['role'],
  createdByUid: string
): Promise<string> {
  try {
    const adminData = {
      email,
      displayName,
      role,
      isActive: true,
      createdAt: serverTimestamp(),
      createdBy: createdByUid,
    };
    return await createDocument(collectionRef, adminData);
  } catch (error) {
    logFirebaseError('createAdmin', error);
    throw error;
  }
}

/**
 * Update admin role - Super Admin only
 */
export async function updateAdminRole(
  uid: string,
  role: Admin['role']
): Promise<void> {
  return updateDocument(collectionRef, uid, { role });
}

/**
 * Deactivate admin - Super Admin only
 */
export async function deactivateAdmin(uid: string): Promise<void> {
  return updateDocument(collectionRef, uid, { isActive: false });
}

/**
 * Activate admin - Super Admin only
 */
export async function activateAdmin(uid: string): Promise<void> {
  return updateDocument(collectionRef, uid, { isActive: true });
}

/**
 * Delete admin - Super Admin only
 */
export async function deleteAdmin(uid: string): Promise<void> {
  return deleteDocument(collectionRef, uid);
}

/**
 * Update last login timestamp - Called on login
 */
export async function updateLastLogin(uid: string): Promise<void> {
  return updateDocument(collectionRef, uid, {
    lastLoginAt: serverTimestamp() as any,
  });
}

/**
 * Check if user is admin - Used for authorization
 */
export async function isAdmin(uid: string): Promise<boolean> {
  const admin = await getAdminByUid(uid);
  return admin !== null && admin.isActive;
}

/**
 * Check if user is super admin - Used for authorization
 */
export async function isSuperAdmin(uid: string): Promise<boolean> {
  const admin = await getAdminByUid(uid);
  return admin !== null && admin.isActive && admin.role === 'super-admin';
}
