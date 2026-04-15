import type { Metadata } from 'next';
import Link from 'next/link';
import { getCounselingPrograms } from '@/lib/supabase/queries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SITE_CONFIG } from '@/constants/site';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: '상담 프로그램',
    description: '앤아더라이프 심리상담연구소의 다양한 전문 상담 프로그램을 소개합니다.',
    path: '/counseling',
  });
}

export const revalidate = 3600;

export default async function CounselingPage() {
  const programs = await getCounselingPrograms();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
  ]);

  const serviceSchemas = programs.map((program: any) =>
    generateServiceSchema({
      name: program.title,
      description: program.subtitle || program.title,
      slug: program.slug,
    })
  );

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, ...serviceSchemas]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[{ label: '상담 프로그램' }]} />

        <div className="mb-12 text-center">
          <h1>상담 프로그램</h1>
          <p className="mt-3 text-lg text-[#5c605d]">
            당신에게 맞는 전문 상담을 찾아보세요
          </p>
        </div>

        {programs.length === 0 ? (
          <p className="text-center text-[#5c605d]">준비 중인 프로그램이 없습니다.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program: any) => (
              <Link
                key={program.id}
                href={`/counseling/${program.slug}`}
                className="group flex flex-col rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 min-h-[200px]"
              >
                <h2 className="text-2xl font-bold text-[#2f3331] transition-colors group-hover:text-[#2d6a4f]">{program.title}</h2>
                {program.subtitle && (
                  <p className="mt-1 text-sm text-[#5c605d]">{program.subtitle}</p>
                )}
                {program.target_audience && (
                  <p className="mt-3 text-sm text-[#777c78]">
                    <span className="font-medium">대상:</span> {program.target_audience}
                  </p>
                )}
                {program.duration && (
                  <p className="text-sm text-[#777c78]">
                    <span className="font-medium">기간:</span> {program.duration}
                  </p>
                )}
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-[#2d6a4f] group-hover:text-[#1f5e44]">
                  자세히 보기 <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
