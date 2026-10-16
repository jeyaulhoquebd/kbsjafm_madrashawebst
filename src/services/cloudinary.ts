/**
 * Cloudinary Upload Service
 * Handles image uploads to Cloudinary with validation and progress tracking
 */

// ============================================================================
// Configuration
// ============================================================================

export const CLOUDINARY_CONFIG = {
  cloudName: 'dc80xvaid',
  uploadPreset: 'kbsjafmadrasha',
  uploadUrl: 'https://api.cloudinary.com/v1_1/dc80xvaid/image/upload',
};

// ============================================================================
// Types
// ============================================================================

export interface UploadResult {
  secureUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ValidationError {
  code: 'INVALID_FORMAT' | 'TOO_LARGE' | 'NO_FILE';
  message: string;
}

// ============================================================================
// Validation
// ============================================================================

const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File | null): ValidationError | null {
  if (!file) {
    return {
      code: 'NO_FILE',
      message: 'কোনো ফাইল নির্বাচন করা হয়নি',
    };
  }

  if (!ALLOWED_FORMATS.includes(file.type)) {
    return {
      code: 'INVALID_FORMAT',
      message: 'শুধুমাত্র JPEG, PNG, এবং WebP ফরম্যাট অনুমোদিত',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      code: 'TOO_LARGE',
      message: 'ফাইলের আকার 5 MB এর বেশি হতে পারবে না',
    };
  }

  return null;
}

// ============================================================================
// Upload Functions
// ============================================================================

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(
  file: File,
  folder: string = 'madrasa',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  // Validate file
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Generate unique public ID
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
  const publicId = `${folder}/${timestamp}-${randomString}-${fileName}`;

  // Create FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('public_id', publicId);
  formData.append('folder', folder);

  // Upload with progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Progress tracking
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage: Math.round((event.loaded / event.total) * 100),
        });
      }
    });

    // Success handler
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            secureUrl: response.secure_url,
            publicId: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
          });
        } catch (error) {
          reject(new Error('আপলোড প্রতিক্রিয়া পার্স করতে ব্যর্থ'));
        }
      } else {
        reject(new Error(`আপলোড ব্যর্থ: ${xhr.status} ${xhr.statusText}`));
      }
    });

    // Error handler
    xhr.addEventListener('error', () => {
      reject(new Error('নেটওয়ার্ক ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন'));
    });

    // Abort handler
    xhr.addEventListener('abort', () => {
      reject(new Error('আপলোড বাতিল করা হয়েছে'));
    });

    // Open and send
    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl);
    xhr.send(formData);
  });
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string = 'madrasa',
  onProgress?: (index: number, progress: UploadProgress) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const result = await uploadImage(files[i], folder, (progress) => {
      onProgress?.(i, progress);
    });
    results.push(result);
  }

  return results;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto', crop } = options;
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality !== 'auto') transformations.push(`q_${quality}`);
  if (format !== 'auto') transformations.push(`f_${format}`);

  const transformString = transformations.length > 0 ? transformations.join(',') + '/' : '';

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformString}${publicId}`;
}

/**
 * Generate thumbnail URL
 */
export function getThumbnailUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Generate responsive srcset
 */
export function generateSrcSet(
  publicId: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  return widths
    .map((width) => `${getCloudinaryUrl(publicId, { width })} ${width}w`)
    .join(', ');
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  return match ? match[1] : null;
}

/**
 * Check if URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes(`res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`);
}

// ============================================================================
// Folder Structure
// ============================================================================

export const CLOUDINARY_FOLDERS = {
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
