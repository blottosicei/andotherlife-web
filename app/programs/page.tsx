import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = generatePageMetadata({
  title: '교육 프로그램',
  description:
    '앤아더라이프 심리상담연구소의 전문 교육 프로그램을 소개합니다. CBT, MBSR, 아동청소년 상담, 수퍼비전 그룹 과정을 운영합니다.',
  path: '/programs',
});

interface Program {
  title: string;
  status: '진행중' | '모집예정';
  duration: string;
  target: string;
  instructor: string;
  slug: string;
  description: string;
}

const PROGRAMS: Program[] = [
  {
    title: '상담사 수련프로그램',
    status: '진행중',
    duration: '연간 과정',
    target: '수련 상담사',
    instructor: '이인수 대표',
    slug: 'counselor-training',
    description: '한국상담학회 전문상담사 자격 취득을 위한 체계적인 수련 프로그램',
  },
  {
    title: '보웬가족체계치료 전문가과정',
    status: '모집예정',
    duration: '6개월 과정',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'bowen-family-systems',
    description: 'Bowen Center 정통 교육을 기반으로 한 가족체계이론 전문 과정',
  },
  {
    title: '구조적가족치료 전문가과정',
    status: '모집예정',
    duration: '6개월 과정',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'structural-family-therapy',
    description: 'Minuchin의 구조적 가족치료 이론과 기술을 체계적으로 학습하는 과정',
  },
  {
    title: '사례개념화 연수과정',
    status: '진행중',
    duration: '분기별 운영',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'case-conceptualization',
    description: '사례 분석과 개념화 능력을 심화하는 연수 프로그램',
  },
];

const STATUS_STYLE: Record<Program['status'], string> = {
  진행중: 'bg-[#b1f0ce] text-[#1d5c42]',
  모집예정: 'bg-[#fdae8f] text-[#622e17]',
};

export default function ProgramsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '교육 프로그램', url: `${SITE_CONFIG.url}/programs` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb items={[{ label: '교육 프로그램' }]} />

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#2f3331]">교육 프로그램</h1>
          <p className="mt-2 text-[#5c605d]">
            심리상담 전문가를 위한 체계적인 교육 과정을 제공합니다.
          </p>
        </header>

        <ul className="space-y-6" role="list">
          {PROGRAMS.map((program) => (
            <li key={program.slug}>
              <article className="flex flex-col overflow-hidden rounded-xl border border-[#dde0dc] bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row">
                {/* Image placeholder */}
                <div
                  className="h-48 w-full shrink-0 bg-[#eceeeb] md:h-auto md:w-56"
                  role="img"
                  aria-label={`${program.title} 이미지`}
                />

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[program.status]}`}
                    >
                      {program.status}
                    </span>
                  </div>

                  <h2 className="mb-2 text-lg font-semibold text-[#2f3331]">{program.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-[#5c605d]">
                    {program.description}
                  </p>

                  <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex gap-1">
                      <dt className="font-medium text-[#2f3331]">강사:</dt>
                      <dd className="text-[#5c605d]">{program.instructor}</dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="font-medium text-[#2f3331]">대상:</dt>
                      <dd className="text-[#5c605d]">{program.target}</dd>
                    </div>
                    <div className="col-span-2 flex gap-1">
                      <dt className="font-medium text-[#2f3331]">기간:</dt>
                      <dd className="text-[#5c605d]">{program.duration}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-block rounded-lg border border-[#2d6a4f] px-4 py-2 text-sm font-medium text-[#2d6a4f] transition-colors hover:bg-[#2d6a4f] hover:text-white"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* CTA section */}
        <section
          aria-labelledby="programs-cta-heading"
          className="mt-12 rounded-2xl px-8 py-12 text-center"
          style={{ background: '#e7e2da' }}
        >
          <h2 id="programs-cta-heading" className="mb-3 text-2xl font-bold text-[#2f3331]">
            맞춤 교육이 필요하신가요?
          </h2>
          <p className="mb-6 text-[#5c605d]">
            기관 및 단체를 위한 맞춤형 교육 프로그램을 기획해 드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-[#2d6a4f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f5e44]"
          >
            문의하기
          </Link>
        </section>
      </main>
    </>
  );
}
