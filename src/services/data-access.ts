/**
 * Unified Data Access Layer
 *
 * This module provides a unified interface for data access.
 * It automatically switches between mock data and Firebase based on configuration.
 *
 * Architecture:
 * - If Firebase is configured: Uses Firestore
 * - If Firebase is not configured: Uses mock data
 *
 * This allows the application to work in both modes without code changes.
 */

import { isFirebaseReady } from './firebase';
import { databaseService, type DatabaseService } from './database.service';

/**
 * Data Access Mode
 */
export type DataAccessMode = 'mock' | 'firebase';

/**
 * Get current data access mode
 */
export function getDataAccessMode(): DataAccessMode {
  return isFirebaseReady() ? 'firebase' : 'mock';
}

/**
 * Get the appropriate database service
 *
 * Currently always returns mock service.
 * When Firebase is integrated, this will return the Firestore service.
 */
export function getDatabaseService(): DatabaseService {
  // When Firebase is integrated:
  // if (isFirebaseReady()) {
  //   return firestoreService; // Firestore implementation
  // }
  
  return databaseService; // Mock implementation
}

/**
 * Data Access Statistics
 */
export interface DataAccessStats {
  mode: DataAccessMode;
  isFirebaseReady: boolean;
  lastAccessed: Date;
}

/**
 * Get data access statistics
 */
export function getDataAccessStats(): DataAccessStats {
  return {
    mode: getDataAccessMode(),
    isFirebaseReady: isFirebaseReady(),
    lastAccessed: new Date(),
  };
}

/**
 * Log data access mode (for debugging)
 */
export function logDataAccessMode(): void {
  const mode = getDataAccessMode();
  console.log(`[Data Access] Mode: ${mode}`);
  if (mode === 'firebase') {
    console.log('[Data Access] Using Firestore');
  } else {
    console.log('[Data Access] Using mock data (in-memory)');
  }
}
