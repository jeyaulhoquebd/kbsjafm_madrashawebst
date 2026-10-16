/**
 * Centralized Firebase Error Handling
 *
 * Provides user-friendly error messages for Firebase errors.
 * Never exposes raw internal errors to public users.
 */

/**
 * User-friendly error messages mapped from Firebase error codes.
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Bengali messages
  'auth/invalid-email': 'অবৈধ ইমেইল ঠিকানা',
  'auth/user-disabled': 'এই অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে',
  'auth/user-not-found': 'ব্যবহারকারী খুঁজে পাওয়া যায়নি',
  'auth/wrong-password': 'ভুল পাসওয়ার্ড',
  'auth/email-already-in-use': 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হচ্ছে',
  'auth/weak-password': 'পাসওয়ার্ড দুর্বল (কমপক্ষে ৬ অক্ষর প্রয়োজন)',
  'auth/invalid-credential': 'অবৈধ ক্রেডেনশিয়াল',
  'auth/too-many-requests': 'অনেক অনুরোধ। অনুগ্রহ করে পরে আবার চেষ্টা করুন',
  'auth/network-request-failed': 'নেটওয়ার্ক ত্রুটি। সংযোগ পরীক্ষা করুন',
  'auth/requires-recent-login': 'নিরাপত্তার জন্য পুনরায় লগইন করুন',
  
  // English messages
  'auth/invalid-email-en': 'Invalid email address',
  'auth/user-disabled-en': 'This account has been disabled',
  'auth/user-not-found-en': 'User not found',
  'auth/wrong-password-en': 'Incorrect password',
  'auth/email-already-in-use-en': 'Email is already in use',
  'auth/weak-password-en': 'Password is too weak (minimum 6 characters)',
  'auth/invalid-credential-en': 'Invalid credentials',
  'auth/too-many-requests-en': 'Too many requests. Please try again later',
  'auth/network-request-failed-en': 'Network error. Check your connection',
  'auth/requires-recent-login-en': 'Please re-authenticate for security',
};

const FIRESTORE_ERROR_MESSAGES: Record<string, string> = {
  'permission-denied': 'অনুমতি প্রত্যাখ্যাত',
  'permission-denied-en': 'Permission denied',
  'not-found': 'ডকুমেন্ট খুঁজে পাওয়া যায়নি',
  'not-found-en': 'Document not found',
  'unavailable': 'সেবা উপলব্ধ নয়',
  'unavailable-en': 'Service unavailable',
};

const STORAGE_ERROR_MESSAGES: Record<string, string> = {
  'storage/object-not-found': 'ফাইল খুঁজে পাওয়া যায়নি',
  'storage/object-not-found-en': 'File not found',
  'storage/unauthorized': 'আপলোডের অনুমতি নেই',
  'storage/unauthorized-en': 'Unauthorized to upload',
  'storage/canceled': 'আপলোড বাতিল করা হয়েছে',
  'storage/canceled-en': 'Upload canceled',
  'storage/unknown': 'অজানা ত্রুটি',
  'storage/unknown-en': 'Unknown error',
};

/**
 * Get user-friendly error message from Firebase error.
 * 
 * @param error - Firebase error object
 * @param language - 'bn' for Bengali, 'en' for English
 * @returns User-friendly error message
 */
export function getFirebaseErrorMessage(
  error: unknown,
  language: 'bn' | 'en' = 'bn'
): string {
  if (!error || typeof error !== 'object') {
    return language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred';
  }

  const firebaseError = error as { code?: string; message?: string };
  const errorCode = firebaseError.code || '';
  
  // Try to find a user-friendly message
  const suffix = language === 'bn' ? '' : '-en';
  const messageKey = errorCode + suffix;
  
  // Check auth errors
  if (errorCode.startsWith('auth/')) {
    return AUTH_ERROR_MESSAGES[messageKey] || 
           (language === 'bn' ? 'লগইন ত্রুটি' : 'Authentication error');
  }
  
  // Check Firestore errors
  if (errorCode.startsWith('firestore/')) {
    const firestoreCode = errorCode.replace('firestore/', '');
    return FIRESTORE_ERROR_MESSAGES[firestoreCode + suffix] ||
           (language === 'bn' ? 'ডেটাবেস ত্রুটি' : 'Database error');
  }
  
  // Check Storage errors
  if (errorCode.startsWith('storage/')) {
    return STORAGE_ERROR_MESSAGES[messageKey] ||
           (language === 'bn' ? 'ফাইল আপলোড ত্রুটি' : 'File upload error');
  }
  
  // Fallback: log the actual error for developers, show generic message to users
  if (import.meta.env.DEV) {
    console.error('[Firebase Error]', error);
  }
  
  return language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred';
}

/**
 * Log Firebase error for debugging (development only).
 * In production, this could send to an error tracking service.
 */
export function logFirebaseError(context: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.error(`[Firebase:${context}]`, error);
  }
  // In production, integrate with error tracking (Sentry, etc.)
}

/**
 * Type guard for Firebase errors.
 */
export function isFirebaseError(error: unknown): error is { code: string; message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  );
}
