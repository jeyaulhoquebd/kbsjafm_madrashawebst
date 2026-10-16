/**
 * Database Service Interface
 *
 * This defines the contract for database operations.
 * Currently uses local mock data.
 * Will be replaced with Cloud Firestore in production.
 */

import type { NoticeFull } from '../data/mockData';
import type { Teacher } from '../types';
import type { GalleryImage, AcademicResource, HomepageContent, SiteSettings } from '../admin/services/dataService';

export interface DatabaseService {
  // Notices
  getNotices(): Promise<NoticeFull[]>;
  addNotice(notice: Omit<NoticeFull, 'id'>): Promise<string>;
  updateNotice(id: string, notice: Partial<NoticeFull>): Promise<void>;
  deleteNotice(id: string): Promise<void>;

  // Teachers
  getTeachers(): Promise<Teacher[]>;
  addTeacher(teacher: Omit<Teacher, 'id'>): Promise<string>;
  updateTeacher(id: string, teacher: Partial<Teacher>): Promise<void>;
  deleteTeacher(id: string): Promise<void>;

  // Resources
  getResources(): Promise<AcademicResource[]>;
  addResource(resource: Omit<AcademicResource, 'id'>): Promise<string>;
  updateResource(id: string, resource: Partial<AcademicResource>): Promise<void>;
  deleteResource(id: string): Promise<void>;

  // Gallery
  getGallery(): Promise<GalleryImage[]>;
  addGalleryImage(image: Omit<GalleryImage, 'id'>): Promise<string>;
  updateGalleryImage(id: string, image: Partial<GalleryImage>): Promise<void>;
  deleteGalleryImage(id: string): Promise<void>;

  // Homepage
  getHomepage(): Promise<HomepageContent>;
  updateHomepage(content: Partial<HomepageContent>): Promise<void>;

  // Settings
  getSettings(): Promise<SiteSettings>;
  updateSettings(settings: Partial<SiteSettings>): Promise<void>;
}

/**
 * Mock Database Service
 *
 * This is a demonstration implementation using in-memory storage.
 * All data is lost on page refresh.
 * Replace with Cloud Firestore for production use.
 */
export class MockDatabaseService implements DatabaseService {
  private notices: NoticeFull[] = [];
  private teachers: Teacher[] = [];
  private resources: AcademicResource[] = [];
  private gallery: GalleryImage[] = [];
  private homepage: HomepageContent | null = null;
  private settings: SiteSettings | null = null;

  // Notices
  async getNotices(): Promise<NoticeFull[]> {
    return this.notices;
  }

  async addNotice(notice: Omit<NoticeFull, 'id'>): Promise<string> {
    const id = 'notice-' + Date.now();
    this.notices.push({ ...notice, id });
    return id;
  }

  async updateNotice(id: string, updates: Partial<NoticeFull>): Promise<void> {
    const index = this.notices.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notices[index] = { ...this.notices[index], ...updates };
    }
  }

  async deleteNotice(id: string): Promise<void> {
    this.notices = this.notices.filter((n) => n.id !== id);
  }

  // Teachers
  async getTeachers(): Promise<Teacher[]> {
    return this.teachers;
  }

  async addTeacher(teacher: Omit<Teacher, 'id'>): Promise<string> {
    const id = 'teacher-' + Date.now();
    this.teachers.push({ ...teacher, id });
    return id;
  }

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<void> {
    const index = this.teachers.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.teachers[index] = { ...this.teachers[index], ...updates };
    }
  }

  async deleteTeacher(id: string): Promise<void> {
    this.teachers = this.teachers.filter((t) => t.id !== id);
  }

  // Resources
  async getResources(): Promise<AcademicResource[]> {
    return this.resources;
  }

  async addResource(resource: Omit<AcademicResource, 'id'>): Promise<string> {
    const id = 'resource-' + Date.now();
    this.resources.push({ ...resource, id });
    return id;
  }

  async updateResource(id: string, updates: Partial<AcademicResource>): Promise<void> {
    const index = this.resources.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.resources[index] = { ...this.resources[index], ...updates };
    }
  }

  async deleteResource(id: string): Promise<void> {
    this.resources = this.resources.filter((r) => r.id !== id);
  }

  // Gallery
  async getGallery(): Promise<GalleryImage[]> {
    return this.gallery;
  }

  async addGalleryImage(image: Omit<GalleryImage, 'id'>): Promise<string> {
    const id = 'gallery-' + Date.now();
    this.gallery.push({ ...image, id });
    return id;
  }

  async updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<void> {
    const index = this.gallery.findIndex((g) => g.id === id);
    if (index !== -1) {
      this.gallery[index] = { ...this.gallery[index], ...updates };
    }
  }

  async deleteGalleryImage(id: string): Promise<void> {
    this.gallery = this.gallery.filter((g) => g.id !== id);
  }

  // Homepage
  async getHomepage(): Promise<HomepageContent> {
    if (!this.homepage) {
      throw new Error('Homepage not initialized');
    }
    return this.homepage;
  }

  async updateHomepage(content: Partial<HomepageContent>): Promise<void> {
    if (this.homepage) {
      this.homepage = { ...this.homepage, ...content };
    }
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    if (!this.settings) {
      throw new Error('Settings not initialized');
    }
    return this.settings;
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<void> {
    if (this.settings) {
      this.settings = { ...this.settings, ...settings };
    }
  }

  // Initialize with default data
  initialize(defaultData: {
    notices: NoticeFull[];
    teachers: Teacher[];
    resources: AcademicResource[];
    gallery: GalleryImage[];
    homepage: HomepageContent;
    settings: SiteSettings;
  }): void {
    this.notices = defaultData.notices;
    this.teachers = defaultData.teachers;
    this.resources = defaultData.resources;
    this.gallery = defaultData.gallery;
    this.homepage = defaultData.homepage;
    this.settings = defaultData.settings;
  }
}

// Export singleton instance
export const databaseService = new MockDatabaseService();
