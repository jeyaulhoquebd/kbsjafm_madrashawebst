import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NoticeFull } from '../../data/mockData';
import type { Teacher } from '../../types';
import {
  GalleryImage,
  HomepageContent,
  AcademicResource,
  SiteSettings,
  initialNotices,
  initialTeachers,
  initialResources,
  initialGallery,
  initialHomepage,
  initialSettings,
  generateId,
} from '../services/dataService';

// ============ Context Types ============

interface AdminContextType {
  // Notices
  notices: NoticeFull[];
  addNotice: (notice: Omit<NoticeFull, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<NoticeFull>) => void;
  deleteNotice: (id: string) => void;

  // Teachers
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Resources
  resources: AcademicResource[];
  addResource: (resource: Omit<AcademicResource, 'id'>) => void;
  updateResource: (id: string, resource: Partial<AcademicResource>) => void;
  deleteResource: (id: string) => void;

  // Gallery
  gallery: GalleryImage[];
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;

  // Homepage
  homepage: HomepageContent;
  updateHomepage: (content: Partial<HomepageContent>) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ============ Provider ============

export function AdminProvider({ children }: { children: ReactNode }) {
  // Notices State
  const [notices, setNotices] = useState<NoticeFull[]>(initialNotices);

  const addNotice = (notice: Omit<NoticeFull, 'id'>) => {
    const newNotice: NoticeFull = { ...notice, id: generateId() };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, updates: Partial<NoticeFull>) => {
    setNotices((prev) =>
      prev.map((notice) => (notice.id === id ? { ...notice, ...updates } : notice))
    );
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  // Teachers State
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = { ...teacher, id: generateId() };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers((prev) =>
      prev.map((teacher) => (teacher.id === id ? { ...teacher, ...updates } : teacher))
    );
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
  };

  // Resources State
  const [resources, setResources] = useState<AcademicResource[]>(initialResources);

  const addResource = (resource: Omit<AcademicResource, 'id'>) => {
    const newResource: AcademicResource = { ...resource, id: generateId() };
    setResources((prev) => [newResource, ...prev]);
  };

  const updateResource = (id: string, updates: Partial<AcademicResource>) => {
    setResources((prev) =>
      prev.map((resource) => (resource.id === id ? { ...resource, ...updates } : resource))
    );
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id));
  };

  // Gallery State
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage: GalleryImage = { ...image, id: generateId() };
    setGallery((prev) => [newImage, ...prev]);
  };

  const updateGalleryImage = (id: string, updates: Partial<GalleryImage>) => {
    setGallery((prev) =>
      prev.map((image) => (image.id === id ? { ...image, ...updates } : image))
    );
  };

  const deleteGalleryImage = (id: string) => {
    setGallery((prev) => prev.filter((image) => image.id !== id));
  };

  // Homepage State
  const [homepage, setHomepage] = useState<HomepageContent>(initialHomepage);

  const updateHomepage = (updates: Partial<HomepageContent>) => {
    setHomepage((prev) => ({ ...prev, ...updates }));
  };

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const contextValue: AdminContextType = {
    notices,
    addNotice,
    updateNotice,
    deleteNotice,
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    resources,
    addResource,
    updateResource,
    deleteResource,
    gallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    homepage,
    updateHomepage,
    settings,
    updateSettings,
  };

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
}

// ============ Hook ============

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
