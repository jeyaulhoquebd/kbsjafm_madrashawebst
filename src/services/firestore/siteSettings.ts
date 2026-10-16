/**
 * Site Settings Service
 * Firestore operations for the siteSettings collection
 */

import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { logFirebaseError } from '../../lib/firebase-errors';
import type { SiteSettings } from '../../types/firestore-collections';

const collectionRef = collection(db, 'siteSettings');
const SETTINGS_DOC_ID = 'main'; // Single document for all settings

// ============================================================================
// Public Operations (Read-only)
// ============================================================================

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(collectionRef, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as SiteSettings;
  } catch (error) {
    logFirebaseError('getSiteSettings', error);
    throw error;
  }
}

// ============================================================================
// Admin Operations (Require authentication)
// ============================================================================

/**
 * Update site settings - Admin only
 * Creates the document if it doesn't exist
 */
export async function updateSiteSettings(
  data: Partial<SiteSettings>,
  userId: string
): Promise<void> {
  try {
    const docRef = doc(collectionRef, SETTINGS_DOC_ID);
    
    const updateData = {
      ...data,
      updatedBy: userId,
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(docRef, updateData, { merge: true });
  } catch (error) {
    logFirebaseError('updateSiteSettings', error);
    throw error;
  }
}

/**
 * Initialize site settings with default values - Admin only
 * Call this once when setting up the site
 */
export async function initializeSiteSettings(
  defaultSettings: Omit<SiteSettings, 'id' | 'updatedAt' | 'updatedBy'>,
  userId: string
): Promise<void> {
  try {
    const docRef = doc(collectionRef, SETTINGS_DOC_ID);
    
    const settingsData = {
      ...defaultSettings,
      updatedBy: userId,
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(docRef, settingsData);
  } catch (error) {
    logFirebaseError('initializeSiteSettings', error);
    throw error;
  }
}
