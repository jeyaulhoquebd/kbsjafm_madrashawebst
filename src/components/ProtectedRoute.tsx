/**
 * Protected Route Component
 *
 * This component will protect routes that require authentication.
 * Currently, it allows all access (demo mode).
 * Will be connected to Firebase Authentication in production.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { authService, User } from '../services/auth.service';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

/**
 * ProtectedRoute Component
 *
 * Wraps routes that require authentication.
 * In demo mode, allows all access.
 * In production, redirects to login if not authenticated.
 */
export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();

  // DEMO MODE: Allow all access
  // In production, uncomment the authentication check below:

  /*
  // Check if user is authenticated
  if (!currentUser) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    const roleHierarchy = {
      viewer: 1,
      editor: 2,
      admin: 3,
    };

    const userRoleLevel = roleHierarchy[currentUser.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      // User doesn't have required permissions
      return <Navigate to="/unauthorized" replace />;
    }
  }
  */

  // For now, just render children (demo mode)
  return <>{children}</>;
}

/**
 * Check if user has required role
 */
export function hasRole(user: User | null, requiredRole: string): boolean {
  if (!user) return false;

  const roleHierarchy: Record<string, number> = {
    viewer: 1,
    editor: 2,
    admin: 3,
  };

  const userRoleLevel = roleHierarchy[user.role] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

  return userRoleLevel >= requiredRoleLevel;
}

/**
 * Get current user (helper function)
 */
export function getCurrentUser(): User | null {
  return authService.getCurrentUser();
}
