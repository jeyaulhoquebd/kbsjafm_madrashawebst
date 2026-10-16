/**
 * Authentication Service Interface
 *
 * This defines the contract for authentication operations.
 * Currently uses mock implementation.
 * Will be replaced with Firebase Authentication in production.
 */

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface AuthService {
  // Authentication methods
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  signUp(email: string, password: string, displayName: string): Promise<User>;

  // State management
  getCurrentUser(): User | null;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;

  // Password management
  resetPassword(email: string): Promise<void>;
  updatePassword(newPassword: string): Promise<void>;

  // User management
  updateUserProfile(updates: Partial<User>): Promise<void>;
}

/**
 * Mock Authentication Service
 *
 * This is a demonstration implementation that simulates authentication.
 * It does NOT provide real security.
 * Replace with Firebase Authentication for production use.
 */
export class MockAuthService implements AuthService {
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  async signIn(email: string, _password: string): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock user - in production, validate credentials with Firebase
    const user: User = {
      uid: 'mock-user-' + Date.now(),
      email,
      displayName: 'Demo Administrator',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    this.currentUser = user;
    this.notifyListeners();
    return user;
  }

  async signOut(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.currentUser = null;
    this.notifyListeners();
  }

  async signUp(email: string, _password: string, displayName: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user: User = {
      uid: 'mock-user-' + Date.now(),
      email,
      displayName,
      role: 'viewer',
      createdAt: new Date().toISOString(),
    };

    this.currentUser = user;
    this.notifyListeners();
    return user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    // Immediately call with current state
    callback(this.currentUser);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  async resetPassword(_email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Mock implementation - would send email via Firebase
  }

  async updatePassword(_newPassword: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Mock implementation
  }

  async updateUserProfile(updates: Partial<User>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      this.notifyListeners();
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}

// Export singleton instance
export const authService = new MockAuthService();
