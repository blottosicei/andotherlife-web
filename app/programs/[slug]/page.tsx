import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SITE_CONFIG } from '@/constants/site';

const PROGRAMS_MAP: Record<string, string> = {
  'counselor-training': '상담사 수련프로그램',
  'bowen-family-systems': '보웬가족체계치료 전문가과정',
  'structural-family-therapy': '구조적가족치료 전문가과정',
  'case-conceptualization': '사례개념화 연수과정',
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return {
    ...generatePageMetadata({
      title: PROGRAMS_MAP[slug] || slug,
      description: '앤아더라이프 심리상담연구소 교육 프로그램 상세 안내',
      path: `/programs/${slug}`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function ProgramDetailPage({ params }: { params: Params }) {
  const { slug } = await params;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '교육 프로그램', url: `${SITE_CONFIG.url}/programs` },
    { name: PROGRAMS_MAP[slug] || slug, url: `${SITE_CONFIG.url}/programs/${slug}` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb
          items={[
            { label: '교육 프로그램', href: '/programs' },
            { label: PROGRAMS_MAP[slug] || slug },
          ]}
        />

        <div className="mt-16 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#afb3af] text-center">
          <p className="text-lg font-medium text-[#2f3331]">프로그램 상세 페이지 준비 중입니다</p>
          <p className="mt-2 text-sm text-[#5c605d]">곧 자세한 내용을 안내해 드리겠습니다.</p>
        </div>
      </main>
    </>
  );
}
