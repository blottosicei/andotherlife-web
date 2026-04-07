import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[#5c605d]">
        <li>
          <Link href="/" className="hover:text-[#2d6a4f] transition-colors">
            홈
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#2d6a4f] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#2f3331] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
