import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'primary' | 'pattern';
  id?: string;
}

const bgStyles = {
  white: 'bg-white',
  light: 'bg-neutral-50',
  primary: 'gradient-emerald text-white',
  pattern: 'bg-primary-50 pattern-bg',
};

export default function Section({
  children,
  className = '',
  background = 'white',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 lg:py-16 ${bgStyles[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 lg:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 font-bengali">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-neutral-600 text-base lg:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-0.5 w-8 bg-gold-400 rounded-full" />
          <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          <div className="h-0.5 w-8 bg-gold-400 rounded-full" />
        </div>
      )}
    </div>
  );
}
