/**
 * Cloudinary Types
 *
 * Type definitions for Cloudinary image management.
 * These types will be used when Cloudinary is integrated.
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset?: string;
  apiKey?: string;
  apiSecret?: string;
}

export interface CloudinaryImage {
  publicId: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  createdAt: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secureUrl: string;
}

export interface CloudinaryUploadResult {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}

export interface CloudinaryTransformation {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  gravity?: 'auto' | 'face' | 'center';
  effect?: string;
}

export interface GalleryImageMetadata {
  publicId: string;
  title: string;
  titleEn: string;
  category: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TeacherPhotoMetadata {
  publicId: string;
  teacherId: string;
  uploadedAt: string;
  uploadedBy: string;
}

/**
 * Cloudinary Folder Structure
 *
 * Recommended folder structure for the madrasa website:
 *
 * /madrasa/
 *   /logo/           - Institution logo
 *   /building/       - Building photographs
 *   /principal/      - Principal photograph
 *   /teachers/       - Teacher photos (one per teacher)
 *   /gallery/        - Gallery images
 *     /events/       - Event photos
 *     /classrooms/   - Classroom photos
 *     /library/      - Library photos
 *   /documents/      - Document thumbnails (if needed)
 */
export const CLOUDINARY_FOLDERS = {
  ROOT: 'madrasa',
  LOGO: 'madrasa/logo',
  BUILDING: 'madrasa/building',
  PRINCIPAL: 'madrasa/principal',
  TEACHERS: 'madrasa/teachers',
  GALLERY: 'madrasa/gallery',
  GALLERY_EVENTS: 'madrasa/gallery/events',
  GALLERY_CLASSROOMS: 'madrasa/gallery/classrooms',
  GALLERY_LIBRARY: 'madrasa/gallery/library',
  DOCUMENTS: 'madrasa/documents',
} as const;
