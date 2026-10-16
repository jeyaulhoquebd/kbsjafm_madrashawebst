/**
 * Cloudinary Service
 *
 * This service handles all Cloudinary image operations.
 * Currently uses mock implementation.
 * Will be connected to Cloudinary when configured.
 */

import type {
  CloudinaryConfig,
  CloudinaryUploadResult,
  CloudinaryTransformation,
  CLOUDINARY_FOLDERS,
} from '../types/cloudinary';

export interface CloudinaryService {
  // Configuration
  initialize(config: CloudinaryConfig): void;

  // Upload operations
  uploadImage(file: File, folder: string, tags?: string[]): Promise<CloudinaryUploadResult>;
  uploadMultiple(files: File[], folder: string): Promise<CloudinaryUploadResult[]>;

  // URL generation
  getImageUrl(publicId: string, transformation?: CloudinaryTransformation): string;
  getThumbnailUrl(publicId: string): string;

  // Management
  deleteImage(publicId: string): Promise<void>;
  listImages(folder: string): Promise<CloudinaryUploadResult[]>;

  // Transformations
  applyTransformation(publicId: string, transformation: CloudinaryTransformation): string;
}

/**
 * Mock Cloudinary Service
 *
 * This is a demonstration implementation that simulates Cloudinary operations.
 * Images are NOT actually uploaded anywhere.
 * Replace with real Cloudinary SDK for production use.
 */
export class MockCloudinaryService implements CloudinaryService {
  private config: CloudinaryConfig | null = null;
  private uploadedImages: Map<string, CloudinaryUploadResult> = new Map();

  initialize(config: CloudinaryConfig): void {
    this.config = config;
    console.log('[Cloudinary] Initialized with config:', config.cloudName);
  }

  async uploadImage(
    file: File,
    folder: string,
    tags: string[] = []
  ): Promise<CloudinaryUploadResult> {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock public ID
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const publicId = `${folder}/${timestamp}-${randomString}-${file.name.split('.')[0]}`;

    // Generate mock URLs
    const cloudName = this.config?.cloudName || 'demo-cloud';
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/v${timestamp}/${publicId}`;
    const secureUrl = url; // HTTPS

    const result: CloudinaryUploadResult = {
      asset_id: `asset-${timestamp}`,
      public_id: publicId,
      version: timestamp,
      version_id: `version-${timestamp}`,
      signature: `sig-${Math.random().toString(36).substring(2, 10)}`,
      width: 1920,
      height: 1080,
      format: file.type.split('/')[1] || 'jpg',
      resource_type: 'image',
      created_at: new Date().toISOString(),
      tags: tags,
      bytes: file.size,
      type: 'upload',
      etag: `etag-${timestamp}`,
      placeholder: false,
      url: url,
      secure_url: secureUrl,
      folder: folder,
      original_filename: file.name,
      api_key: this.config?.apiKey || 'demo-key',
    };

    this.uploadedImages.set(publicId, result);
    return result;
  }

  async uploadMultiple(
    files: File[],
    folder: string
  ): Promise<CloudinaryUploadResult[]> {
    const results: CloudinaryUploadResult[] = [];
    for (const file of files) {
      const result = await this.uploadImage(file, folder);
      results.push(result);
    }
    return results;
  }

  getImageUrl(publicId: string, transformation?: CloudinaryTransformation): string {
    const cloudName = this.config?.cloudName || 'demo-cloud';
    let baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

    // Apply transformations
    if (transformation) {
      const transforms: string[] = [];
      if (transformation.width) transforms.push(`w_${transformation.width}`);
      if (transformation.height) transforms.push(`h_${transformation.height}`);
      if (transformation.crop) transforms.push(`c_${transformation.crop}`);
      if (transformation.quality) transforms.push(`q_${transformation.quality}`);
      if (transformation.format) transforms.push(`f_${transformation.format}`);
      if (transformation.gravity) transforms.push(`g_${transformation.gravity}`);
      if (transformation.effect) transforms.push(`e_${transformation.effect}`);

      if (transforms.length > 0) {
        baseUrl += `/${transforms.join(',')}`;
      }
    }

    return `${baseUrl}/${publicId}`;
  }

  getThumbnailUrl(publicId: string): string {
    return this.getImageUrl(publicId, {
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.uploadedImages.delete(publicId);
  }

  async listImages(folder: string): Promise<CloudinaryUploadResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Array.from(this.uploadedImages.values()).filter((img) =>
      img.folder.startsWith(folder)
    );
  }

  applyTransformation(publicId: string, transformation: CloudinaryTransformation): string {
    return this.getImageUrl(publicId, transformation);
  }
}

// Export singleton instance
export const cloudinaryService = new MockCloudinaryService();

/**
 * Cloudinary Helper Functions
 */
export const cloudinaryHelpers = {
  /**
   * Generate optimized image URL with transformations
   */
  getOptimizedUrl(
    publicId: string,
    options: {
      width?: number;
      height?: number;
      quality?: 'auto' | number;
      format?: 'auto' | 'webp' | 'jpg' | 'png';
    } = {}
  ): string {
    const { width, height, quality = 'auto', format = 'auto' } = options;
    const transforms: string[] = [];

    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    transforms.push(`q_${quality}`);
    transforms.push(`f_${format}`);

    // This would use the actual Cloudinary cloud name in production
    const cloudName = 'dc80xvaid'; // From the existing URLs
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`;
  },

  /**
   * Generate responsive srcset for an image
   */
  generateSrcSet(publicId: string, widths: number[] = [320, 640, 960, 1280, 1920]): string {
    return widths
      .map((width) => `${cloudinaryHelpers.getOptimizedUrl(publicId, { width })} ${width}w`)
      .join(', ');
  },

  /**
   * Check if a URL is a Cloudinary URL
   */
  isCloudinaryUrl(url: string): boolean {
    return url.includes('res.cloudinary.com');
  },

  /**
   * Extract public ID from a Cloudinary URL
   */
  extractPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    return match ? match[1] : null;
  },
};
