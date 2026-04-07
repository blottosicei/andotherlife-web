'use client';

import { useRouter } from 'next/navigation';
import type { Category } from '@/types/blog';

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  const router = useRouter();

  function handleClick(slug?: string) {
    router.push(slug ? `/blog/${slug}` : '/blog');
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* 전체 tab */}
      <button
        onClick={() => handleClick(undefined)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          !activeSlug
            ? 'bg-primary text-white'
            : 'border border-[#777c78] text-foreground hover:bg-[#f3f4f0]'
        }`}
      >
        전체
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.slug)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            activeSlug === cat.slug
              ? 'bg-primary text-white'
              : 'border border-[#777c78] text-foreground hover:bg-[#f3f4f0]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
