import { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 lg:py-16 bg-neutral-50 rounded-xl border border-neutral-200">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-4">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-4">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
