import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-6xl font-bold text-[#2d6a4f]">404</h1>
      <p className="mb-8 text-lg text-[#5c605d]">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-lg bg-[#2d6a4f] px-6 py-3 text-white hover:bg-[#1f5e44] transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
