/**
 * Firebase Configuration Template
 *
 * This file will be used when Firebase is integrated.
 * Currently, the application uses local mock data.
 *
 * To enable Firebase:
 * 1. Install Firebase: npm install firebase
 * 2. Create a Firebase project at https://console.firebase.google.com
 * 3. Copy your Firebase config here
 * 4. Update the service files in src/services/ to use Firebase
 *
 * IMPORTANT: Never commit actual API keys to version control.
 * Use environment variables (VITE_FIREBASE_*) instead.
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Template configuration - replace with actual values from Firebase Console
export const firebaseConfigTemplate: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

/**
 * Environment Variables Required:
 *
 * Create a .env file in the project root:
 *
 * VITE_FIREBASE_API_KEY=your_api_key
 * VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 * VITE_FIREBASE_PROJECT_ID=your_project_id
 * VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 * VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 * VITE_FIREBASE_APP_ID=your_app_id
 *
 * Add .env to .gitignore to prevent committing secrets.
 */
