/**
 * Protected Route Component
 * 
 * Protects routes that require Firebase Authentication and admin role.
 * Uses real Firebase Auth state and Firestore admin document verification.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'super-admin' | 'editor';
}

/**
 * ProtectedRoute Component
 * 
 * Verifies:
 * 1. User is authenticated via Firebase Auth
 * 2. User has an active admin document in Firestore
 * 3. User has the required role (if specified)
 * 
 * Security is enforced by Firestore Security Rules, not just frontend checks.
 */
export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, admin, loading, isAdmin } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page with return URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if user has admin role
  if (!isAdmin || !admin) {
    // User is authenticated but not an admin
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">অ্যাক্সেস প্রত্যাখ্যাত</h2>
          <p className="text-neutral-600 mb-6">
            আপনার অ্যাডমিন ড্যাশবোর্ডে প্রবেশের অনুমতি নেই।
          </p>
          <p className="text-sm text-neutral-500 mb-6">
            এই অ্যাকাউন্টটি অ্যাডমিনিস্ট্রেটর হিসেবে নিবন্ধিত নয় বা নিষ্ক্রিয় করা হয়েছে।
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  // Check role-based access (if required)
  if (requiredRole) {
    const roleHierarchy = {
      'editor': 1,
      'admin': 2,
      'super-admin': 3,
    };

    const userRoleLevel = roleHierarchy[admin.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      // User doesn't have required permissions
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">অপর্যাপ্ত অনুমতি</h2>
            <p className="text-neutral-600 mb-6">
              এই পৃষ্ঠায় প্রবেশ করার জন্য আপনার প্রয়োজনীয় অনুমতি নেই।
            </p>
            <button
              onClick={() => window.location.href = '/admin'}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ড্যাশবোর্ডে ফিরে যান
            </button>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}
