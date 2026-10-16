/**
 * Authentication Context
 * Manages Firebase Authentication state and admin role verification
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { getFirebaseErrorMessage, logFirebaseError } from '../lib/firebase-errors';

// ============================================================================
// Types
// ============================================================================

export interface AdminProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'super-admin' | 'editor';
  active: boolean;
  emailVerified: boolean;
}

export interface AuthContextType {
  // State
  user: User | null;
  admin: AdminProfile | null;
  loading: boolean;
  isAdmin: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          
          // Check if user has admin role in Firestore
          const adminDocRef = doc(db, 'admins', firebaseUser.uid);
          const adminDoc = await getDoc(adminDocRef);
          
          if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            
            // Verify admin is active
            if (adminData.active === true) {
              setAdmin({
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: adminData.displayName || firebaseUser.displayName || 'Administrator',
                role: adminData.role || 'admin',
                active: true,
                emailVerified: firebaseUser.emailVerified,
              });
            } else {
              // Admin account is inactive
              setAdmin(null);
            }
          } else {
            // No admin document found
            setAdmin(null);
          }
        } else {
          setUser(null);
          setAdmin(null);
        }
      } catch (error) {
        logFirebaseError('Auth state change', error);
        setUser(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state listener will handle the rest
    } catch (error) {
      logFirebaseError('Sign in', error);
      throw new Error(getFirebaseErrorMessage(error, 'en'));
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setAdmin(null);
    } catch (error) {
      logFirebaseError('Sign out', error);
      throw new Error(getFirebaseErrorMessage(error, 'en'));
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      logFirebaseError('Password reset', error);
      throw new Error(getFirebaseErrorMessage(error, 'en'));
    }
  };

  const value: AuthContextType = {
    user,
    admin,
    loading,
    isAdmin: admin !== null && admin.active === true,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
