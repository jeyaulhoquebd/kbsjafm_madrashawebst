/**
 * Gallery Service
 * Firestore operations for the gallery collection
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
import type { GalleryImage, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'gallery');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

/**
 * Get all published gallery images
 */
export async function getPublishedGallery(options: QueryOptions = {}): Promise<GalleryImage[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'displayOrder',
    orderDirection: options.orderDirection || 'asc',
  });
  return getAllDocuments<GalleryImage>(collectionRef, constraints);
}

/**
 * Get a single gallery image by ID (only if published)
 */
export async function getPublishedGalleryImage(id: string): Promise<GalleryImage | null> {
  const image = await getDocumentById<GalleryImage>(collectionRef, id);
  if (!image || image.status !== 'published') {
    return null;
  }
  return image;
}

/**
 * Get gallery images by category
 */
export async function getGalleryByCategory(category: string): Promise<GalleryImage[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('category', '==', category),
    orderBy('displayOrder', 'asc'),
  ];
  return getAllDocuments<GalleryImage>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations (Require authentication)
// ============================================================================

/**
 * Get all gallery images (including drafts) - Admin only
 */
export async function getAllGalleryAdmin(): Promise<GalleryImage[]> {
  const constraints = [orderBy('displayOrder', 'asc')];
  return getAllDocuments<GalleryImage>(collectionRef, constraints);
}

/**
 * Get a single gallery image by ID (including drafts) - Admin only
 */
export async function getGalleryImageByIdAdmin(id: string): Promise<GalleryImage | null> {
  return getDocumentById<GalleryImage>(collectionRef, id);
}

/**
 * Create a new gallery image - Admin only
 */
export async function createGalleryImage(
  data: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const imageData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, imageData);
}

/**
 * Update a gallery image - Admin only
 */
export async function updateGalleryImage(
  id: string,
  data: Partial<GalleryImage>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

/**
 * Delete a gallery image - Admin only
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

/**
 * Publish a gallery image - Admin only
 */
export async function publishGalleryImage(id: string, userId: string): Promise<void> {
  return updateGalleryImage(id, { status: 'published' }, userId);
}

/**
 * Unpublish a gallery image (set to draft) - Admin only
 */
export async function unpublishGalleryImage(id: string, userId: string): Promise<void> {
  return updateGalleryImage(id, { status: 'draft' }, userId);
}
