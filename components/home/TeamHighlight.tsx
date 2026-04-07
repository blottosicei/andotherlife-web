import Link from 'next/link';
import { getAuthors } from '@/lib/supabase/queries';
import type { Author } from '@/types/blog';

export async function TeamHighlight() {
  const allAuthors = (await getAuthors()) as unknown as Author[];
  const authors = allAuthors.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-[#e7e2da]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-[#2f3331] md:text-3xl">전문 상담팀</h2>
          <Link
            href="/team"
            className="text-sm font-medium text-[#2d6a4f] hover:underline"
          >
            전체 보기 →
          </Link>
        </div>

        {authors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[#777c78] text-base">등록된 상담사 정보가 없습니다.</p>
            <p className="text-[#9ca3a0] text-sm mt-1">곧 전문 상담팀을 소개해 드릴 예정입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex flex-col items-center text-center bg-white/60 rounded-xl p-6 shadow-sm"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-[#b1f0ce] flex items-center justify-center mb-4 overflow-hidden">
                  {author.profile_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={author.profile_image_url}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[#2d6a4f]">
                      {author.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-[#2f3331] text-base">{author.name}</h3>
                {author.title && (
                  <p className="text-sm text-[#5c605d] mt-1">{author.title}</p>
                )}

                {author.specialties && author.specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {author.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block px-2 py-0.5 rounded-full text-xs bg-[#2d6a4f]/10 text-[#2d6a4f]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
