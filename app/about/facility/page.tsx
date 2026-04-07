import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '시설 안내',
    description: '앤아더라이프 심리상담연구소의 상담실, 그룹룸, 교육실 등 시설을 안내합니다.',
    path: '/about/facility',
  }),
  robots: { index: false, follow: true },
};

export default function FacilityPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-12">
      <h1>시설 안내</h1>
    </main>
  );
}
