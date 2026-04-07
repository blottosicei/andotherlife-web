'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-dangam text-xl text-[#2d6a4f]" onClick={onClose}>
          앤아더라이프
        </Link>
        <button onClick={onClose} className="p-2 text-[#2f3331]" aria-label="메뉴 닫기">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col gap-2 px-4 pt-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-lg px-4 py-3 text-lg font-medium text-[#2f3331] hover:bg-[#f3f4f0] transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-4 rounded-lg bg-[#8c4f36] px-4 py-3 text-center text-lg font-medium text-white"
        >
          상담 예약하기
        </Link>
      </nav>
    </div>
  );
}
