/**
 * Contact Messages Service
 * Firestore operations for the contactMessages collection
 */

import { collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
} from './base';
import { logFirebaseError } from '../../lib/firebase-errors';
import type { ContactMessage } from '../../types/firestore-collections';

const collectionRef = collection(db, 'contactMessages');

// ============================================================================
// Public Operations
// ============================================================================

/**
 * Submit a new contact message - Public
 */
export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'readAt' | 'readBy'>
): Promise<string> {
  try {
    const messageData = {
      ...data,
      status: 'new' as const,
      adminNotes: '',
      submittedAt: serverTimestamp(),
    };
    return await createDocument(collectionRef, messageData);
  } catch (error) {
    logFirebaseError('submitContactMessage', error);
    throw error;
  }
}

// ============================================================================
// Admin Operations
// ============================================================================

/**
 * Get all contact messages - Admin only
 */
export async function getAllContactMessagesAdmin(): Promise<ContactMessage[]> {
  const constraints = [orderBy('submittedAt', 'desc')];
  return getAllDocuments<ContactMessage>(collectionRef, constraints);
}

/**
 * Get contact messages by status - Admin only
 */
export async function getContactMessagesByStatusAdmin(
  status: ContactMessage['status']
): Promise<ContactMessage[]> {
  const constraints = [
    where('status', '==', status),
    orderBy('submittedAt', 'desc'),
  ];
  return getAllDocuments<ContactMessage>(collectionRef, constraints);
}

/**
 * Get a single contact message by ID - Admin only
 */
export async function getContactMessageByIdAdmin(id: string): Promise<ContactMessage | null> {
  return getDocumentById<ContactMessage>(collectionRef, id);
}

/**
 * Mark message as read - Admin only
 */
export async function markMessageAsRead(id: string, userId: string): Promise<void> {
  const updateData = {
    status: 'read' as const,
    readAt: serverTimestamp(),
    readBy: userId,
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Mark message as responded - Admin only
 */
export async function markMessageAsResponded(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  const updateData = {
    status: 'responded' as const,
    adminNotes,
    readAt: serverTimestamp(),
    readBy: userId,
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Mark message as archived - Admin only
 */
export async function markMessageAsArchived(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  const updateData = {
    status: 'archived' as const,
    adminNotes,
    readAt: serverTimestamp(),
    readBy: userId,
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Update admin notes - Admin only
 */
export async function updateAdminNotes(
  id: string,
  adminNotes: string,
  userId: string
): Promise<void> {
  const updateData = {
    adminNotes,
    readBy: userId,
  };
  return updateDocument(collectionRef, id, updateData);
}
