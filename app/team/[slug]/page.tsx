import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BottomCTA } from '@/components/cta/BottomCTA';
import { createClient } from '@/lib/supabase/server';
import type { Author } from '@/types/blog';
import { SITE_CONFIG } from '@/constants/site';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: author } = await (supabase as any)
    .from('authors')
    .select('name, title, bio')
    .eq('slug', slug)
    .single() as { data: Pick<Author, 'name' | 'title' | 'bio'> | null };

  if (!author) {
    return { title: '상담사를 찾을 수 없습니다' };
  }

  return generatePageMetadata({
    title: `${author.name} 상담사 소개`,
    description: author.bio ?? `${author.name} 상담사의 프로필을 확인하세요.`,
    path: `/team/${slug}`,
  });
}

export default async function TeamMemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: author } = await (supabase as any)
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .single() as { data: Author | null };

  if (!author) {
    notFound();
  }

  const personSchema = generatePersonSchema({
    name: author.name,
    jobTitle: author.title ?? null,
    description: author.bio ?? null,
    url: `${SITE_CONFIG.url}/team/${slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '교수진 소개', url: `${SITE_CONFIG.url}/team` },
    { name: author.name, url: `${SITE_CONFIG.url}/team/${slug}` },
  ]);

  return (
    <>
      <SchemaMarkup schema={[personSchema, breadcrumbSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb
          items={[
            { label: '교수진 소개', href: '/team' },
            { label: author.name },
          ]}
        />

        <article className="mt-8">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
            {/* Avatar */}
            <div
              className="h-48 w-48 rounded-full bg-[#b1f0ce]"
              role="img"
              aria-label={`${author.name} 프로필 사진`}
            />

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold text-[#2f3331]">{author.name}</h1>
              {author.title && (
                <p className="mt-2 text-lg text-[#5c605d]">{author.title}</p>
              )}

              {/* Specialties */}
              {author.specialties && author.specialties.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {author.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#afb3af] px-3 py-1 text-sm text-[#5c605d]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Credentials */}
              {author.credentials && author.credentials.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-2 font-semibold text-[#2f3331]">자격 및 학력</h2>
                  <ul className="space-y-1">
                    {author.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-[#5c605d]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bio */}
              {author.bio && (
                <div className="mt-6">
                  <h2 className="mb-2 font-semibold text-[#2f3331]">소개</h2>
                  <p className="leading-relaxed text-[#5c605d]">{author.bio}</p>
                </div>
              )}
            </div>
          </div>
        </article>

        <div className="mt-12">
          <BottomCTA ctaType="consultation" />
        </div>
      </main>
    </>
  );
}
