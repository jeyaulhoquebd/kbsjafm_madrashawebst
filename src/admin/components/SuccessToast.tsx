import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function SuccessToast({ message, isVisible, onClose }: SuccessToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] animate-fade-in">
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        <p className="text-sm text-green-800 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-green-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-green-600" />
        </button>
      </div>
    </div>
  );
}
