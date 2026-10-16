import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { uploadImage, validateImageFile, type UploadResult, type UploadProgress } from '../../services/cloudinary';

interface ImageUploadProps {
  folder: string;
  onUploadComplete: (result: UploadResult) => void;
  currentImage?: string;
  label?: string;
}

export default function ImageUpload({ folder, onUploadComplete, currentImage, label = 'ছবি আপলোড করুন' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError.message);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress({ loaded: 0, total: file.size, percentage: 0 });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const result = await uploadImage(file, folder, (uploadProgress) => {
        setProgress(uploadProgress);
      });

      onUploadComplete(result);
      setProgress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'আপলোড ব্যর্থ হয়েছে');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Preview Area */}
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
        {preview ? (
          <div className="relative group">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
            {!uploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-1">{progress?.percentage || 0}%</div>
                  <div className="text-sm">আপলোড হচ্ছে...</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-gray-50 transition-colors">
            {uploading ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{progress?.percentage || 0}%</div>
                <div className="text-sm text-gray-600">আপলোড হচ্ছে...</div>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">ছবি নির্বাচন করুন</span>
                <span className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP (সর্বোচ্চ 5MB)</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Progress Bar */}
      {uploading && progress && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
