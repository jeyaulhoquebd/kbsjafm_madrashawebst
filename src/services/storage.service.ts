/**
 * Storage Service Interface
 *
 * This defines the contract for file storage operations.
 * Currently uses placeholder implementation.
 * Will be replaced with Firebase Storage in production.
 */

export interface UploadResult {
  url: string;
  path: string;
  name: string;
  size: number;
  type: string;
}

export interface StorageService {
  // File upload
  uploadFile(file: File, path: string): Promise<UploadResult>;
  uploadFiles(files: File[], path: string): Promise<UploadResult[]>;

  // File management
  deleteFile(path: string): Promise<void>;
  getDownloadUrl(path: string): Promise<string>;

  // Image optimization
  uploadImage(file: File, path: string, options?: ImageOptions): Promise<UploadResult>;

  // Progress tracking
  onUploadProgress(callback: (progress: number) => void): void;
}

export interface ImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Mock Storage Service
 *
 * This is a demonstration implementation that simulates file uploads.
 * Files are NOT actually stored anywhere.
 * Replace with Firebase Storage for production use.
 */
export class MockStorageService implements StorageService {
  private progressCallback: ((progress: number) => void) | null = null;

  async uploadFile(file: File, path: string): Promise<UploadResult> {
    // Simulate upload progress
    await this.simulateProgress();

    // Generate mock URL (in production, this would be a real Firebase Storage URL)
    const url = `https://mock-storage.example.com/${path}/${file.name}`;

    return {
      url,
      path: `${path}/${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async uploadFiles(files: File[], path: string): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    for (const file of files) {
      const result = await this.uploadFile(file, path);
      results.push(result);
    }
    return results;
  }

  async deleteFile(_path: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Mock implementation - would delete from Firebase Storage
  }

  async getDownloadUrl(path: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    // Return mock URL
    return `https://mock-storage.example.com/${path}`;
  }

  async uploadImage(
    file: File,
    path: string,
    _options?: ImageOptions
  ): Promise<UploadResult> {
    // In production, this would resize/optimize the image before uploading
    return this.uploadFile(file, path);
  }

  onUploadProgress(callback: (progress: number) => void): void {
    this.progressCallback = callback;
  }

  private async simulateProgress(): Promise<void> {
    // Simulate upload progress from 0 to 100
    for (let progress = 0; progress <= 100; progress += 20) {
      if (this.progressCallback) {
        this.progressCallback(progress);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

// Export singleton instance
export const storageService = new MockStorageService();

/**
 * File Upload Helper
 *
 * Utility functions for handling file uploads in the UI.
 */
export const fileUploadHelpers = {
  /**
   * Validate file before upload
   */
  validateFile(file: File, maxSizeMB: number = 5, allowedTypes: string[] = []): {
    valid: boolean;
    error?: string;
  } {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    return { valid: true };
  },

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  },

  /**
   * Generate unique file path
   */
  generateFilePath(folder: string, fileName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = fileName.split('.').pop();
    const baseName = fileName.split('.').slice(0, -1).join('.');

    return `${folder}/${timestamp}-${randomString}-${baseName}.${extension}`;
  },
};
