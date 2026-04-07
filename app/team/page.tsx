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

export const metadata: Metadata = generatePageMetadata({
  title: '교수진 소개',
  description:
    '앤아더라이프 심리상담연구소의 전문 상담사와 교수진을 소개합니다. 풍부한 경험과 전문성을 갖춘 상담사들이 함께합니다.',
  path: '/team',
});

export default async function TeamPage() {
  const authors = (await getAuthors()) as unknown as Author[];

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

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#2f3331]">교수진 소개</h1>
          <p className="mt-2 text-[#5c605d]">
            앤아더라이프의 전문 상담사와 교수진을 만나보세요.
          </p>
        </header>

        {authors.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[#afb3af] text-[#5c605d]">
            <p>등록된 교수진이 없습니다.</p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {authors.map((author) => (
              <li key={author.id}>
                <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  {/* Avatar */}
                  <div className="mb-4 flex justify-center">
                    <div
                      className="h-24 w-24 rounded-full bg-[#b1f0ce]"
                      role="img"
                      aria-label={`${author.name} 프로필 사진`}
                    />
                  </div>

                  {/* Name & title */}
                  <div className="mb-3 text-center">
                    <h2 className="font-semibold text-[#2f3331]">{author.name}</h2>
                    {author.title && (
                      <p className="mt-1 text-sm text-[#5c605d]">{author.title}</p>
                    )}
                  </div>

                  {/* Specialty tags */}
                  {author.specialties && author.specialties.length > 0 && (
                    <div className="mb-3 flex flex-wrap justify-center gap-1">
                      {author.specialties.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[#afb3af] px-2 py-0.5 text-xs text-[#5c605d]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bio excerpt */}
                  {author.bio && (
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#5c605d]">
                      {author.bio}
                    </p>
                  )}

                  {/* Profile link */}
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

        <div className="mt-12">
          <BottomCTA ctaType="consultation" />
        </div>
      </main>
    </>
  );
}
