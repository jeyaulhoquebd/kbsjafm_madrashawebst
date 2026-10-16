import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative gradient-emerald py-8 sm:py-10 lg:py-14 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pattern-bg" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {breadcrumb && <div className="mb-3 sm:mb-4">{breadcrumb}</div>}
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white font-bengali leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 sm:mt-3 text-primary-200 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
