import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BottomCTA } from '@/components/cta/BottomCTA';
import { getAuthors } from '@/lib/supabase/queries';
import type { Author } from '@/types/blog';
import { SITE_CONFIG } from '@/constants/site';
import { Award } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: '교수진 소개',
  description:
    '앤아더라이프 심리상담연구소의 전문 상담사와 교수진을 소개합니다. 풍부한 경험과 전문성을 갖춘 상담사들이 함께합니다.',
  path: '/team',
});

function RoleSection({
  title,
  description,
  authors,
  variant,
}: {
  title: string;
  description: string;
  authors: Author[];
  variant: 'representative' | 'supervisor' | 'counselor';
}) {
  if (authors.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2f3331]">{title}</h2>
        <p className="mt-2 text-[#5c605d]">{description}</p>
      </div>

      {variant === 'representative' ? (
        /* 대표: 대형 카드 레이아웃 */
        authors.map((author) => (
          <article
            key={author.id}
            className="rounded-2xl bg-white p-8 shadow-sm md:flex md:gap-8"
          >
            <div className="mb-6 flex justify-center md:mb-0 md:w-48 md:shrink-0">
              <div
                className="h-40 w-40 rounded-full bg-[#b1f0ce] flex items-center justify-center"
                role="img"
                aria-label={`${author.name} 프로필 사진`}
              >
                <span className="font-dangam text-4xl text-[#2d6a4f]">
                  {author.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#2f3331]">{author.name}</h3>
                {author.title && (
                  <p className="mt-1 text-lg text-[#2d6a4f] font-medium">{author.title}</p>
                )}
              </div>

              {author.bio && (
                <p className="mb-4 text-[#5c605d] leading-relaxed">{author.bio}</p>
              )}

              {/* 자격 */}
              {author.credentials && author.credentials.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-[#2d6a4f]" />
                    <h4 className="text-sm font-semibold text-[#2f3331]">자격 및 인증</h4>
                  </div>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {author.credentials.map((c) => (
                      <li key={c} className="text-sm text-[#5c605d]">· {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 경력 - career 필드는 DB 확장 후 사용 */}
              {author.specialties && author.specialties.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {author.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-[#b1f0ce]/40 px-3 py-1 text-xs font-medium text-[#1f5e44]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/team/${author.slug}`}
                className="inline-block rounded-lg bg-[#2d6a4f] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1f5e44]"
              >
                상세 프로필 보기
              </Link>
            </div>
          </article>
        ))
      ) : (
        /* 슈퍼바이저 & 전문상담원: 카드 그리드 */
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {authors.map((author) => (
            <li key={author.id}>
              <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex justify-center">
                  <div
                    className={`h-20 w-20 rounded-full flex items-center justify-center ${
                      variant === 'supervisor' ? 'bg-[#e7e2da]' : 'bg-[#b1f0ce]/50'
                    }`}
                    role="img"
                    aria-label={`${author.name} 프로필 사진`}
                  >
                    <span className={`font-dangam text-2xl ${
                      variant === 'supervisor' ? 'text-[#615f59]' : 'text-[#2d6a4f]'
                    }`}>
                      {author.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="mb-3 text-center">
                  <h3 className="font-semibold text-[#2f3331]">{author.name}</h3>
                  {author.title && (
                    <p className="mt-1 text-sm text-[#5c605d]">{author.title}</p>
                  )}
                </div>

                {author.credentials && author.credentials.length > 0 && (
                  <ul className="mb-3 space-y-1">
                    {author.credentials.slice(0, 4).map((c) => (
                      <li key={c} className="text-xs text-[#5c605d] leading-snug">· {c}</li>
                    ))}
                  </ul>
                )}

                {author.specialties && author.specialties.length > 0 && (
                  <div className="mb-3 flex flex-wrap justify-center gap-1">
                    {author.specialties.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[#afb3af] px-2 py-0.5 text-xs text-[#5c605d]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-2 text-center">
                  <Link
                    href={`/team/${author.slug}`}
                    className="inline-block rounded-lg border border-[#2d6a4f] px-4 py-2 text-sm font-medium text-[#2d6a4f] transition-colors hover:bg-[#2d6a4f] hover:text-white"
                  >
                    프로필 보기
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function TeamPage() {
  const authors = (await getAuthors()) as unknown as (Author & { role?: string })[];

  const representative = authors.filter((a) => a.role === 'representative');
  const supervisors = authors.filter((a) => a.role === 'supervisor');
  const counselors = authors.filter((a) => a.role === 'counselor' || (!a.role && a.role !== 'representative' && a.role !== 'supervisor'));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '교수진 소개', url: `${SITE_CONFIG.url}/team` },
  ]);

  const personSchemas = authors.map((author) =>
    generatePersonSchema({
      name: author.name,
      jobTitle: author.title ?? null,
      description: author.bio ?? null,
      url: `${SITE_CONFIG.url}/team/${author.slug}`,
      image: null,
      specialties: author.specialties ?? null,
    })
  );

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, ...personSchemas]} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb items={[{ label: '교수진 소개' }]} />

        <header className="mb-12">
          <h1 className="font-dangam text-3xl text-[#2f3331] md:text-4xl">상담팀 소개</h1>
          <p className="mt-3 text-lg text-[#5c605d]">
            앤아더라이프의 전문 상담팀을 만나보세요. 풍부한 경험과 전문성을 갖춘 상담사들이 함께합니다.
          </p>
        </header>

        {authors.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[#afb3af] text-[#5c605d]">
            <p>등록된 상담팀 정보가 없습니다.</p>
          </div>
        ) : (
          <>
            <RoleSection
              title="대표 소개"
              description="30년 경력의 가족상담 전문가가 이끄는 앤아더라이프"
              authors={representative}
              variant="representative"
            />
            <RoleSection
              title="슈퍼바이저"
              description="풍부한 임상 경험으로 상담의 질을 지도·감독합니다"
              authors={supervisors}
              variant="supervisor"
            />
            <RoleSection
              title="전문상담원"
              description="전문 자격과 교수급 슈퍼비전 체계 아래 상담을 진행합니다"
              authors={counselors}
              variant="counselor"
            />
          </>
        )}

        <div className="mt-12">
          <BottomCTA ctaType="consultation" />
        </div>
      </main>
    </>
  );
}
