import { SITE_CONFIG } from '@/constants/site';

export function generateArticleSchema(post: {
  title: string;
  excerpt?: string | null;
  content: string;
  published_at?: string | null;
  updated_at: string;
  thumbnail_url?: string | null;
  author?: { name: string } | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.thumbnail_url || '',
    datePublished: post.published_at || post.updated_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author?.name || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'Korean',
      ...(SITE_CONFIG.phone ? { telephone: SITE_CONFIG.phone } : {}),
      ...(SITE_CONFIG.email ? { email: SITE_CONFIG.email } : {}),
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone || undefined,
    email: SITE_CONFIG.email || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: '서울',
      addressCountry: 'KR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
  };
}

export function generatePersonSchema(person: {
  name: string;
  jobTitle?: string | null;
  description?: string | null;
  url?: string | null;
  image?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.description ? { description: person.description } : {}),
    ...(person.url ? { url: person.url } : {}),
    ...(person.image ? { image: person.image } : {}),
    affiliation: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}
