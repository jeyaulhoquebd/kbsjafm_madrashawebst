/**
 * Custom React Hooks for Firestore Data
 */

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logFirebaseError } from '../lib/firebase-errors';
import type { Notice, Teacher, GalleryImage, AcademicContent, Result, SiteSettings } from '../types/firestore-collections';

// ============================================================================
// Notices Hooks
// ============================================================================

export function usePublishedNotices(category?: string) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('date', 'desc'),
    ];

    if (category) {
      constraints.unshift(where('category', '==', category));
    }

    const q = query(collection(db, 'notices'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Notice[];
        setNotices(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('usePublishedNotices', err);
        setError('নোটিশ লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category]);

  return { notices, loading, error };
}

export function useLatestNotices(count: number = 5) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'notices'),
      where('status', '==', 'published'),
      orderBy('date', 'desc'),
      limit(count)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Notice[];
        setNotices(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('useLatestNotices', err);
        setError('নোটিশ লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [count]);

  return { notices, loading, error };
}

// ============================================================================
// Teachers Hooks
// ============================================================================

export function usePublishedTeachers(department?: string) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('displayOrder', 'asc'),
    ];

    if (department) {
      constraints.unshift(where('department', '==', department));
    }

    const q = query(collection(db, 'teachers'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Teacher[];
        setTeachers(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('usePublishedTeachers', err);
        setError('শিক্ষক তথ্য লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [department]);

  return { teachers, loading, error };
}

// ============================================================================
// Gallery Hooks
// ============================================================================

export function usePublishedGallery(category?: string) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('displayOrder', 'asc'),
    ];

    if (category && category !== 'all') {
      constraints.unshift(where('category', '==', category));
    }

    const q = query(collection(db, 'gallery'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryImage[];
        setImages(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('usePublishedGallery', err);
        setError('গ্যালারি লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category]);

  return { images, loading, error };
}

// ============================================================================
// Academic Content Hooks
// ============================================================================

export function usePublishedAcademicContent(type?: string) {
  const [content, setContent] = useState<AcademicContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('displayOrder', 'asc'),
    ];

    if (type) {
      constraints.unshift(where('type', '==', type));
    }

    const q = query(collection(db, 'academicContent'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as AcademicContent[];
        setContent(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('usePublishedAcademicContent', err);
        setError('একাডেমিক তথ্য লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [type]);

  return { content, loading, error };
}

// ============================================================================
// Results Hooks
// ============================================================================

export function usePublishedResults(examType?: string) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('publishDate', 'desc'),
    ];

    if (examType) {
      constraints.unshift(where('examType', '==', examType));
    }

    const q = query(collection(db, 'results'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Result[];
        setResults(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('usePublishedResults', err);
        setError('ফলাফল লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [examType]);

  return { results, loading, error };
}

// ============================================================================
// Site Settings Hook
// ============================================================================

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const settingsRef = collection(db, 'siteSettings');
    const q = query(settingsRef, limit(1));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setSettings({
            id: doc.id,
            ...doc.data(),
          } as SiteSettings);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        logFirebaseError('useSiteSettings', err);
        setError('সাইট সেটিংস লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { settings, loading, error };
}
