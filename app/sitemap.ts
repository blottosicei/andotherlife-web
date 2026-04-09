import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://andotherlife.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date('2026-04-07'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date('2026-04-07'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about/philosophy`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/about/facility`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/team`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/programs`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date('2026-04-07'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2026-04-07'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/counseling`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/counseling/individual`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/couple`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/family`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/child-youth`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/young-adult`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/psychological-testing`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/counseling/social-contribution`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/counseling/eap`, lastModified: new Date('2026-04-07'), changeFrequency: 'monthly', priority: 0.7 },
  ];

  let postPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];
  let tagPages: MetadataRoute.Sitemap = [];
  let teamPages: MetadataRoute.Sitemap = [];

  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, category:categories(slug)')
      .eq('status', 'published');

    if (posts) {
      postPages = posts.map((post: { slug: string; updated_at: string; category: { slug: string } | null }) => ({
        url: `${SITE_URL}/blog/${post.category?.slug || 'uncategorized'}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }

    const { data: categories } = await supabase
      .from('categories')
      .select('slug, updated_at');

    if (categories) {
      categoryPages = categories.map((cat: { slug: string; updated_at: string | null }) => ({
        url: `${SITE_URL}/blog/${cat.slug}`,
        lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date('2026-04-07'),
      }));
    }

    const { data: tags } = await supabase
      .from('tags')
      .select('slug');

    if (tags) {
      tagPages = tags.map((tag: { slug: string }) => ({
        url: `${SITE_URL}/blog/tag/${tag.slug}`,
        lastModified: new Date('2026-04-07'),
      }));
    }

    const { data: authors } = await supabase
      .from('authors')
      .select('slug, updated_at');

    if (authors) {
      teamPages = authors.map((author: { slug: string; updated_at: string | null }) => ({
        url: `${SITE_URL}/team/${author.slug}`,
        lastModified: author.updated_at ? new Date(author.updated_at) : new Date('2026-04-07'),
      }));
    }
  } catch {
    // Supabase not configured yet, return static pages only
  }

  return [...staticPages, ...categoryPages, ...tagPages, ...teamPages, ...postPages];
}
