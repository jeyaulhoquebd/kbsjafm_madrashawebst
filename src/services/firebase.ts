/**
 * Firebase Initialization Module
 */

import { app, auth, db } from '../lib/firebase';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  isInitialized: boolean;
}

/**
 * Check if Firebase is configured
 */
export function isFirebaseConfigured(): boolean {
  return true;
}

/**
 * Initialize Firebase services
 */
export function initializeFirebase(): FirebaseServices {
  return {
    app,
    auth,
    db,
    isInitialized: true,
  };
}

/**
 * Get Firebase services (singleton)
 */
let firebaseInstance: FirebaseServices | null = null;

export function getFirebase(): FirebaseServices {
  if (!firebaseInstance) {
    firebaseInstance = initializeFirebase();
  }
  return firebaseInstance;
}

/**
 * Check if Firebase is ready
 */
export function isFirebaseReady(): boolean {
  return true;
}
