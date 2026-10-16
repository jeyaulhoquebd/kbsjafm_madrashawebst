import { ReactNode } from 'react';

interface AdminCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export default function AdminCard({ children, className = '', padding = 'md' }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-neutral-200 shadow-sm ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}

interface AdminCardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminCardHeader({ title, description, action }: AdminCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
