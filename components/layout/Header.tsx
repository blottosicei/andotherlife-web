'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { href: '/blog', label: '블로그' },
  { href: '/counseling', label: '상담 프로그램' },
  { href: '/about', label: '센터소개' },
  { href: '/team', label: '교수진' },
  { href: '/programs', label: '상담사 교육' },
  { href: '/contact', label: '상담예약' },
];

const COUNSELING_SLUG_TO_TITLE: Record<string, string> = {
  individual: '개인상담 (성인)',
  couple: '부부상담 프로그램',
  'child-youth': '아동·청소년 상담',
  family: '가족상담',
  'young-adult': '2030 청년상담 프로그램',
  eap: 'EAP(기업)상담',
  'social-contribution': '사회공헌상담',
  'psychological-testing': '심리검사',
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const contactHref = useMemo(() => {
    const match = pathname.match(/^\/counseling\/([^/]+)/);
    if (match && COUNSELING_SLUG_TO_TITLE[match[1]]) {
      return `/contact?type=${encodeURIComponent(COUNSELING_SLUG_TO_TITLE[match[1]])}`;
    }
    return '/contact';
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-white'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-text.webp"
              alt="앤아더라이프 심리상담연구소"
              width={140}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="주 메뉴">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#2f3331] hover:text-[#2d6a4f] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {pathname === '/counseling/young-adult' ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-youth-modal'))}
                className="hidden md:inline-flex items-center rounded-lg bg-[#8c4f36] px-4 py-2 text-sm font-medium text-white hover:bg-[#7d432b] transition-colors"
              >
                상담 예약하기
              </button>
            ) : (
              <Link
                href={contactHref}
                className="hidden md:inline-flex items-center rounded-lg bg-[#8c4f36] px-4 py-2 text-sm font-medium text-white hover:bg-[#7d432b] transition-colors"
              >
                상담 예약하기
              </Link>
            )}
            <button
              className="md:hidden p-2 text-[#2f3331]"
              onClick={() => setMobileOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={NAV_ITEMS}
        contactHref={contactHref}
      />
    </>
  );
}
