import { useState, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  fallbackText?: string;
}

export default function SafeImage({
  src,
  alt,
  fallback,
  fallbackText,
  className = '',
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  if (hasError) {
    return (
      <div className={`bg-neutral-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-xs text-neutral-400">
            {fallbackText || 'Image unavailable'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-neutral-100 animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
}
