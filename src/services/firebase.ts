/**
 * Firebase Initialization Module
 *
 * This module initializes Firebase services when environment variables are present.
 * If Firebase is not configured, the application continues to work with mock data.
 *
 * To enable Firebase:
 * 1. Install Firebase: npm install firebase
 * 2. Create .env file with VITE_FIREBASE_* variables
 * 3. This module will automatically initialize Firebase
 */

// Firebase will be imported when installed
// import { initializeApp, FirebaseApp } from 'firebase/app';
// import { getAuth, Auth } from 'firebase/auth';
// import { getFirestore, Firestore } from 'firebase/firestore';
// Firebase Storage is NOT used - all images are stored in Cloudinary

export interface FirebaseServices {
  // app: FirebaseApp;
  // auth: Auth;
  // db: Firestore;
  // Firebase Storage is NOT used - all images are stored in Cloudinary
  isInitialized: boolean;
}

/**
 * Check if Firebase is configured
 */
export function isFirebaseConfigured(): boolean {
  return !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

/**
 * Initialize Firebase services
 *
 * This function will initialize Firebase when:
 * 1. Firebase SDK is installed
 * 2. Environment variables are configured
 *
 * Currently returns a mock implementation.
 */
export function initializeFirebase(): FirebaseServices {
  if (!isFirebaseConfigured()) {
    console.log('[Firebase] Not configured - using mock data');
    return {
      isInitialized: false,
    };
  }

  // When Firebase is installed, uncomment this:
  /*
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  // Firebase Storage is NOT used - all images are stored in Cloudinary

  console.log('[Firebase] Initialized successfully');

  return {
    app,
    auth,
    db,
    // Firebase Storage is NOT used - all images are stored in Cloudinary
    isInitialized: true,
  };
  */

  // Mock implementation for now
  console.log('[Firebase] Configuration detected but SDK not installed yet');
  return {
    isInitialized: false,
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
  return getFirebase().isInitialized;
}
