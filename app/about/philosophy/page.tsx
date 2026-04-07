import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: '상담 철학',
  description: '앤아더라이프 심리상담연구소의 상담 철학과 치료 접근 방식을 소개합니다.',
  path: '/about/philosophy',
});

export default function PhilosophyPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-12">
      <h1>상담 철학</h1>
    </main>
  );
}
