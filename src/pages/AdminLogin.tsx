/**
 * Admin Login Page
 * Professional login interface for administrators
 */

import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirebaseErrorMessage } from '../lib/firebase-errors';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, resetPassword, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMode, setResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Get redirect path from location state
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setResetSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 font-bengali mb-2">
            {resetMode ? 'পাসওয়ার্ড রিসেট' : 'অ্যাডমিন লগইন'}
          </h1>
          <p className="text-neutral-600">
            {resetMode
              ? 'আপনার ইমেইল ঠিকানা দিন'
              : 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {resetMode ? (
            // Password Reset Form
            <>
              {resetSuccess ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    ইমেইল পাঠানো হয়েছে
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6">
                    পাসওয়ার্ড রিসেট লিঙ্কের জন্য আপনার ইমেইল চেক করুন
                  </p>
                  <button
                    onClick={() => {
                      setResetMode(false);
                      setResetSuccess(false);
                      setError(null);
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    লগইনে ফিরে যান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-neutral-700 mb-2">
                      ইমেইল ঠিকানা
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      'রিসেট লিঙ্ক পাঠান'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResetMode(false);
                      setError(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    লগইনে ফিরে যান
                  </button>
                </form>
              )}
            </>
          ) : (
            // Login Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 font-medium mb-1">লগইন ব্যর্থ</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  'লগইন করুন'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setResetMode(true);
                  setError(null);
                }}
                className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-neutral-500">
            খাগড়াছড়ি বাইতুশ শরফ জাব্বারিয়া আদর্শ ফাজিল (ডিগ্রি) মাদ্রাসা
          </p>
        </div>
      </div>
    </div>
  );
}
