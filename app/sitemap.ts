import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://andtoherlife.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/programs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  let postPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];
  let tagPages: MetadataRoute.Sitemap = [];
  let counselingPages: MetadataRoute.Sitemap = [];

  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, category:categories(slug)')
      .eq('status', 'published');

    if (posts) {
      postPages = posts.map((post: any) => ({
        url: `${SITE_URL}/blog/${post.category?.slug || 'uncategorized'}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }

    const { data: categories } = await supabase
      .from('categories')
      .select('slug');

    if (categories) {
      categoryPages = categories.map((cat: any) => ({
        url: `${SITE_URL}/blog/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }

    const { data: tags } = await supabase
      .from('tags')
      .select('slug');

    if (tags) {
      tagPages = tags.map((tag: any) => ({
        url: `${SITE_URL}/blog/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }

    const { data: counselingPrograms } = await supabase
      .from('counseling_programs')
      .select('slug')
      .eq('is_active', true);

    if (counselingPrograms) {
      counselingPages = [
        {
          url: `${SITE_URL}/counseling`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        },
        ...counselingPrograms.map((p: any) => ({
          url: `${SITE_URL}/counseling/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        })),
      ];
    }
  } catch {
    // Supabase not configured yet, return static pages only
  }

  return [...staticPages, ...counselingPages, ...categoryPages, ...tagPages, ...postPages];
}
