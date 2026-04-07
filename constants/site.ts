export const SITE_CONFIG = {
  name: '앤아더라이프 심리상담연구소',
  shortName: '앤아더라이프',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://andtoherlife.com',
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_SITE_PHONE || '',
  description: '앤아더라이프 심리상담연구소 - 마음건강, 심리상담, 교육 프로그램 전문',
  locale: 'ko-KR',
  language: 'ko',
} as const;

export const REVALIDATION = {
  blog: 3600,       // 1 hour
  static: 86400,    // 24 hours
  home: 3600,       // 1 hour
} as const;

export const PAGINATION = {
  postsPerPage: 12,
} as const;
