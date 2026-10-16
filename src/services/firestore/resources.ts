/**
 * Resources Service
 * Firestore operations for the resources collection
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
import type { Resource, QueryOptions } from '../../types/firestore-collections';

const collectionRef = collection(db, 'resources');

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

export async function getPublishedResources(options: QueryOptions = {}): Promise<Resource[]> {
  const constraints = buildQueryConstraints({
    ...options,
    status: 'published',
    orderBy: options.orderBy || 'displayOrder',
    orderDirection: options.orderDirection || 'asc',
  });
  return getAllDocuments<Resource>(collectionRef, constraints);
}

export async function getPublishedResource(id: string): Promise<Resource | null> {
  const resource = await getDocumentById<Resource>(collectionRef, id);
  if (!resource || resource.status !== 'published') {
    return null;
  }
  return resource;
}

export async function getResourcesByType(type: string): Promise<Resource[]> {
  const constraints = [
    where('status', '==', 'published'),
    where('type', '==', type),
    orderBy('displayOrder', 'asc'),
  ];
  return getAllDocuments<Resource>(collectionRef, constraints);
}

// ============================================================================
// Admin Operations
// ============================================================================

export async function getAllResourcesAdmin(): Promise<Resource[]> {
  const constraints = [orderBy('displayOrder', 'asc')];
  return getAllDocuments<Resource>(collectionRef, constraints);
}

export async function getResourceByIdAdmin(id: string): Promise<Resource | null> {
  return getDocumentById<Resource>(collectionRef, id);
}

export async function createResource(
  data: Omit<Resource, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>,
  userId: string
): Promise<string> {
  const resourceData = {
    ...data,
    ...createAuditFields(userId),
  };
  return createDocument(collectionRef, resourceData);
}

export async function updateResource(
  id: string,
  data: Partial<Resource>,
  userId: string
): Promise<void> {
  const updateData = {
    ...data,
    ...updateAuditFields(userId),
  };
  return updateDocument(collectionRef, id, updateData);
}

export async function deleteResource(id: string): Promise<void> {
  return deleteDocument(collectionRef, id);
}

export async function publishResource(id: string, userId: string): Promise<void> {
  return updateResource(id, { status: 'published' }, userId);
}

export async function unpublishResource(id: string, userId: string): Promise<void> {
  return updateResource(id, { status: 'draft' }, userId);
}
