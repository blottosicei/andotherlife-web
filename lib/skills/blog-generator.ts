export interface BlogPostContent {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  summary: string;
  keywords: string[];
  meta_title: string;
  meta_description: string;
  faq: Array<{ question: string; answer: string }>;
  references: Array<{
    name: string;
    url: string;
    type: 'academic' | 'government' | 'industry';
    description: string;
  }>;
  visual_keywords: string[];
}

/**
 * Build FAQPage schema from FAQ data
 */
export function buildFAQSchema(faq: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Calculate reading time (Korean: ~400 chars/min)
 */
export function calculateReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.length / 400));
}

/**
 * Validate that a BlogPostContent object has all required fields
 */
export function validateContent(content: unknown): content is BlogPostContent {
  const c = content as BlogPostContent;
  return !!(
    c?.title &&
    c?.slug &&
    c?.content &&
    c?.excerpt &&
    c?.summary &&
    Array.isArray(c?.keywords) &&
    c?.meta_title &&
    c?.meta_description &&
    Array.isArray(c?.faq) &&
    Array.isArray(c?.references)
  );
}
