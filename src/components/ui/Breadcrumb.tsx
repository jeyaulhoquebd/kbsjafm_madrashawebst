import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-primary-200">
      <Link to="/" className="hover:text-white transition-colors flex items-center gap-1" aria-label="Home">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-primary-400" />
          {item.href ? (
            <Link to={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-100 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
