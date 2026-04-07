import Link from 'next/link';
import { getLatestPosts } from '@/lib/supabase/queries';
import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/types/blog';

export async function LatestPosts() {
  const posts = (await getLatestPosts(6)) as unknown as Post[];

  return (
    <section className="py-16 md:py-20 bg-[#fafaf8]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-[#2f3331] md:text-3xl">최근 콘텐츠</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#2d6a4f] hover:underline"
          >
            더 보기 →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[#777c78] text-base">아직 게시된 콘텐츠가 없습니다.</p>
            <p className="text-[#9ca3a0] text-sm mt-1">곧 새로운 글이 업로드될 예정입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
