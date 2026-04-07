import { createClient } from './server';
import type { Database } from './types';
import type { Post } from '@/types/blog';

type Category = Database['public']['Tables']['categories']['Row'];

export async function getPublishedPosts(options?: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  tagSlug?: string;
}): Promise<{ posts: Post[]; total: number }> {
  const { page = 1, perPage = 12, categorySlug } = options ?? {};
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let categoryId: string | undefined;
  if (categorySlug) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single() as { data: { id: string } | null; error: unknown };
    if (category) {
      categoryId = category.id;
    }
  }

  const baseQuery = supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  const { data, count, error } = await (categoryId
    ? baseQuery.eq('category_id', categoryId)
    : baseQuery);
  if (error) throw error;
  return { posts: (data ?? []) as unknown as Post[], total: count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) return null;
  return data as unknown as Post;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAuthors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedPosts(limit = 6): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as Post[];
}

export async function getLatestPosts(limit = 6): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as Post[];
}

export async function getPostsByTag(tagSlug: string, options?: { page?: number; perPage?: number }) {
  const { page = 1, perPage = 12 } = options ?? {};
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data: tag } = await supabase
    .from('tags')
    .select('id, name')
    .eq('slug', tagSlug)
    .single();

  if (!tag) return { posts: [], total: 0, tagName: null };

  const { data: postTags } = await supabase
    .from('post_tags')
    .select('post_id')
    .eq('tag_id', (tag as any).id);

  if (!postTags || postTags.length === 0) return { posts: [], total: 0, tagName: (tag as any).name };

  const postIds = postTags.map((pt: any) => pt.post_id);

  const { data, count } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)', { count: 'exact' })
    .eq('status', 'published')
    .in('id', postIds)
    .order('published_at', { ascending: false })
    .range(from, to);

  return { posts: (data ?? []) as any[], total: count ?? 0, tagName: (tag as any).name };
}

export async function getPopularPosts(limit = 5) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, category:categories(slug)')
    .eq('status', 'published')
    .order('view_count', { ascending: false })
    .limit(limit);

  return (data ?? []) as any[];
}

export async function searchPosts(query: string, limit = 20) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:authors(*)')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,summary.ilike.%${query}%`)
    .order('published_at', { ascending: false })
    .limit(limit);

  return (data ?? []) as any[];
}

export async function getCounselingPrograms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('counseling_programs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as any[];
}
