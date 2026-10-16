/**
 * Firebase Configuration Module
 *
 * Project: Khagrachhari Baitush Sharaf Jabbaria Adarsha Fazil (Degree) Madrasa
 * Firebase Project: kbsjafm
 *
 * This module initializes Firebase exactly once and exports reusable service
 * instances for the entire application.
 *
 * IMPORTANT NOTES:
 * - Firebase is initialized using getApps() to prevent duplicate initialization
 *   during Vite's Hot Module Replacement (HMR).
 * - This file contains the PUBLIC web app configuration, which is safe to
 *   expose in client code. Security is enforced via Firestore/Storage rules
 *   and Firebase Auth, NOT by hiding these keys.
 * - NEVER place Firebase Admin SDK credentials or service-account private
 *   keys in client code.
 * - For production deployments, prefer environment variables via .env files.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Firebase Web App Configuration for project "kbsjafm".
 *
 * These values are PUBLIC and safe to include in client bundles.
 * If environment variables are available (Vite's import.meta.env), they
 * take precedence to allow per-environment overrides.
 */
export const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ??
    'AIzaSyDsAKi3WN4wcYg6VlqKTezFdZ2MiGXF8nI',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'kbsjafm.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'kbsjafm',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    'kbsjafm.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '1098656776179',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ??
    '1:1098656776179:web:fef7c35e90812b1232dc86',
};

// ---------------------------------------------------------------------------
// Initialization (single-instance, HMR-safe)
// ---------------------------------------------------------------------------

/**
 * The Firebase App instance.
 *
 * Uses getApps() to detect whether Firebase has already been initialized
 * (e.g. after a hot reload). If so, it reuses the existing app instead of
 * creating a new one, which would throw a "duplicate app" error.
 */
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/** Firebase Authentication service */
export const auth: Auth = getAuth(app);

/** Cloud Firestore service */
export const db: Firestore = getFirestore(app);

/** Firebase Storage service */
export const storage: FirebaseStorage = getStorage(app);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Indicates whether Firebase has been successfully initialized.
 * Always true after this module is imported, but exposed for convenience.
 */
export const isFirebaseInitialized = true;

/**
 * The Firebase project ID.
 */
export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
