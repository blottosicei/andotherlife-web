# 앤아더라이프 심리상담연구소 — 프로젝트 기초 문서 (Project Foundation)

**프로젝트명:** 앤아더라이프 심리상담연구소 SEO 블로그 웹사이트
**작성일:** 2026년 4월 6일
**최종 수정:** 2026년 4월 6일
**버전:** v1.0

---

## 1. 기술 스택 상세

### 1.1 핵심 기술

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 15+ | App Router, SSG/ISR, 메타데이터 API |
| React | 19+ | UI 라이브러리 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | v4 | 유틸리티 퍼스트 CSS |
| shadcn/ui | latest | UI 컴포넌트 라이브러리 |

### 1.2 라이브러리 목록

| 라이브러리 | 용도 | 비고 |
|-----------|------|------|
| @supabase/supabase-js | Supabase 클라이언트 | 브라우저 환경 |
| @supabase/ssr | 서버 사이드 Supabase | App Router 대응 (middleware 지원) |
| zustand | 클라이언트 상태 관리 | 가벼운 글로벌 상태 (UI 토글, 모달 등) |
| react-hook-form | 폼 관리 | 비제어 컴포넌트 기반, 성능 최적화 |
| zod | 스키마 검증 | 폼 + API 데이터 검증 |
| framer-motion | 애니메이션 | 부드러운 마이크로 인터랙션 (페이드, 슬라이드) |
| lucide-react | 아이콘 | Tree-shakable, 커스터마이징 가능 |
| remark | Markdown 파싱 | 플러그인 기반 확장 가능 |
| remark-gfm | GitHub Flavored Markdown | 테이블, 취소선, 체크리스트 |
| rehype | HTML 처리 | Markdown → HTML 변환 |
| rehype-slug | 자동 ID 생성 | Heading에 id 부여 (TOC 용) |
| rehype-autolink-headings | 앵커 링크 | Heading을 자동으로 클릭 가능하게 |
| next/font | 폰트 최적화 | Pretendard (한글 웹폰트) 로드 |
| next/image | 이미지 최적화 | WebP/AVIF 자동 변환, lazy loading |

### 1.3 개발 도구

| 도구 | 용도 |
|-----|------|
| ESLint | 코드 린팅 |
| Prettier | 코드 포매팅 |
| PostCSS | CSS 처리 (Tailwind) |
| TypeScript Compiler | 타입 체크 |

---

## 2. 프로젝트 디렉토리 구조

### 2.1 전체 구조

```
notherlife-web/
├── app/                               # Next.js App Router
│   ├── layout.tsx                     # 루트 레이아웃 (글로벌 메타, 폰트, 네비게이션, 분석)
│   ├── page.tsx                       # 홈페이지
│   ├── not-found.tsx                  # 404 페이지
│   ├── error.tsx                      # 에러 바운더리
│   ├── loading.tsx                    # 글로벌 로딩 UI
│   ├── blog/
│   │   ├── page.tsx                   # 블로그 목록 (필터, 검색, 페이지네이션)
│   │   ├── [category]/
│   │   │   ├── page.tsx               # 카테고리별 목록 (ISR)
│   │   │   ├── layout.tsx             # 카테고리 전용 레이아웃
│   │   │   └── [slug]/
│   │   │       ├── page.tsx           # 개별 포스트 (SSG)
│   │   │       ├── layout.tsx         # 포스트 전용 레이아웃
│   │   │       └── opengraph-image.tsx # 동적 OG 이미지 (1200x630)
│   │   └── tag/[tag]/
│   │       └── page.tsx               # 태그별 목록 (ISR)
│   ├── counseling/
│   │   ├── page.tsx                   # 상담 프로그램 목록 (DB: counseling_programs)
│   │   ├── couple/page.tsx            # 부부상담 소개 (정적 코드)
│   │   ├── young-adult/page.tsx       # 2030상담 소개 (정적 코드)
│   │   └── [slug]/page.tsx            # 향후 추가 프로그램 (정적 코드)
│   ├── about/
│   │   ├── page.tsx                   # 센터 소개 (정적)
│   │   ├── philosophy/page.tsx        # 상담 철학
│   │   └── facility/page.tsx          # 시설 안내
│   ├── team/
│   │   ├── page.tsx                   # 교수진 목록 (동적: authors 테이블)
│   │   └── [slug]/page.tsx            # 개별 프로필 (동적)
│   ├── programs/
│   │   ├── page.tsx                   # 프로그램 목록 (동적)
│   │   └── [slug]/page.tsx            # 프로그램 상세 (동적)
│   ├── contact/
│   │   └── page.tsx                   # 상담 예약/문의 폼
│   ├── api/
│   │   ├── revalidate/route.ts        # ISR 리밸리데이션 API (secret 검증)
│   │   └── webhook/route.ts           # Supabase Webhook 처리 (선택)
│   ├── sitemap.ts                     # 동적 사이트맵 (posts, categories, 정적 페이지)
│   └── robots.ts                      # robots.txt 생성
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # 네비게이션 + 로고 + CTA 버튼
│   │   ├── Footer.tsx                 # 푸터 (회사 정보, 링크, 사이트맵)
│   │   ├── Navigation.tsx             # 메인 네비게이션 (데스크탑 + 모바일)
│   │   ├── MobileMenu.tsx             # 모바일 메뉴 (토글)
│   │   └── Breadcrumb.tsx             # 브레드크럼 (SEO + UX)
│   ├── blog/
│   │   ├── PostCard.tsx               # 블로그 목록용 카드 (썸네일, 제목, 발췌, 메타)
│   │   ├── PostContent.tsx            # 포스트 본문 렌더러 (Markdown → HTML + 구조화)
│   │   ├── PostMeta.tsx               # 포스트 메타정보 (날짜, 작성자, 읽기 시간)
│   │   ├── SummaryBox.tsx             # 본문 상단 요약 박스 (summary 필드)
│   │   ├── TableOfContents.tsx        # 목차 (헤딩 자동 추출)
│   │   ├── RelatedPosts.tsx           # 관련 포스트 추천 (같은 카테고리/태그)
│   │   ├── ReferencesList.tsx         # 참고 자료 섹션 (references JSONB 렌더링)
│   │   ├── FAQSection.tsx             # FAQ 섹션 (구조화 데이터 FAQPage)
│   │   ├── CategoryFilter.tsx         # 카테고리 필터 (탭/사이드바)
│   │   ├── TagFilter.tsx              # 태그 필터 (칩/버튼)
│   │   ├── Pagination.tsx             # 페이지 네비게이션 (숫자)
│   │   └── BlogSearch.tsx             # 블로그 내 검색 (keywords + summary 풀텍스트)
│   ├── counseling/
│   │   └── CounselingCard.tsx         # 상담 프로그램 카드 (목록 페이지용)
│   ├── cta/
│   │   ├── InlineCTA.tsx              # 본문 중간 CTA 배너 (program prop으로 /counseling/{slug} 링크)
│   │   ├── BottomCTA.tsx              # 포스트 하단 CTA (program prop으로 커스텀 텍스트/링크)
│   │   ├── SidebarCTA.tsx             # 사이드바 고정 CTA (고정 버튼)
│   │   ├── FloatingCTA.tsx            # 플로팅 버튼 (카카오톡, 모바일 하단)
│   │   └── NewsletterPopup.tsx        # 이탈 방지 뉴스레터 팝업 (useExitIntent)
│   ├── forms/
│   │   ├── ContactForm.tsx            # 상담 문의 폼 (react-hook-form + zod)
│   │   ├── ProgramForm.tsx            # 프로그램 수강 신청 폼
│   │   └── NewsletterForm.tsx         # 뉴스레터 구독 폼
│   ├── home/
│   │   ├── HeroSection.tsx            # 히어로 섹션 (브랜드 메시지 + CTA)
│   │   ├── ServiceSection.tsx         # 서비스 소개 (상담/교육/연구)
│   │   ├── LatestPosts.tsx            # 최신 블로그 포스트 캐러셀
│   │   ├── TeamHighlight.tsx          # 교수진 하이라이트
│   │   └── TrustSection.tsx           # 신뢰도 강화 (자격증, 수료 현황)
│   ├── seo/
│   │   └── SchemaMarkup.tsx           # 구조화 데이터 JSON-LD 컴포넌트
│   └── ui/
│       ├── button.tsx                 # shadcn/ui: 버튼
│       ├── input.tsx                  # shadcn/ui: 입력 필드
│       ├── card.tsx                   # shadcn/ui: 카드
│       ├── select.tsx                 # shadcn/ui: 셀렉트
│       ├── dialog.tsx                 # shadcn/ui: 모달
│       └── ...                        # 기타 shadcn/ui 컴포넌트
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # 브라우저 환경 Supabase 클라이언트
│   │   ├── server.ts                  # 서버 환경 Supabase 클라이언트 (SSR)
│   │   ├── queries.ts                 # DB 쿼리 함수 모음 (getPosts, getPost, getCategories 등)
│   │   └── types.ts                   # Supabase 타입 정의 (자동 생성: supabase gen types)
│   ├── seo/
│   │   ├── metadata.ts                # 메타데이터 생성 유틸 (generateMetadata)
│   │   ├── schema.ts                  # 구조화 데이터 생성 (Article, FAQPage, Organization 등)
│   │   ├── sitemap.ts                 # 사이트맵 생성 유틸
│   │   └── openGraph.ts               # OG 이미지 생성 유틸
│   ├── markdown/
│   │   ├── processor.ts               # Markdown → HTML 변환 (remark + rehype)
│   │   ├── plugins.ts                 # 커스텀 플러그인 (반응형 테이블, 외부 링크 처리)
│   │   └── schema.ts                  # Markdown 스키마 검증 (타입 안전성)
│   └── utils/
│       ├── reading-time.ts            # 읽기 시간 계산 (분 단위)
│       ├── date.ts                    # 날짜 포맷 유틸 (ISO → 한국 형식)
│       ├── cn.ts                      # className 유틸 (clsx + tailwind-merge)
│       └── constants.ts               # 사이트 상수 (URL, 이메일, 전화)
├── hooks/
│   ├── useScrollSpy.ts                # TOC 스크롤 위치 감지 (activeId 추적)
│   ├── useExitIntent.ts               # 이탈 감지 (mouseleave on document, 모바일 백버튼)
│   ├── useMediaQuery.ts               # 미디어 쿼리 훅 (반응형 감지)
│   └── usePagination.ts               # 페이지네이션 로직 훅
├── types/
│   ├── blog.ts                        # 블로그 관련 타입 (BlogPost, Category, Tag)
│   ├── form.ts                        # 폼 관련 타입 (ContactForm, ProgramForm)
│   ├── api.ts                         # API 응답 타입
│   └── seo.ts                         # SEO 관련 타입 (MetaData, SchemaMarkup)
├── constants/
│   ├── site.ts                        # 사이트 기본정보 (이름, URL, 연락처, 주소)
│   ├── categories.ts                  # 카테고리 목록 (ID, 슬러그, 이름, 대상 타겟)
│   ├── seo.ts                         # SEO 기본값 (타이틀, 디스크립션, 키워드)
│   └── colors.ts                      # 디자인 토큰 (컬러, 스페이싱 등)
├── styles/
│   └── globals.css                    # 글로벌 스타일 (Tailwind @directives, 커스텀 CSS)
├── public/
│   ├── images/
│   │   ├── logo.svg                   # 앤아더라이프 로고
│   │   ├── og-default.png             # 기본 OG 이미지 (1200x630)
│   │   ├── favicon.ico
│   │   └── ...
│   └── fonts/                         # 로컬 폰트 파일 (필요 시 WOFF2)
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql     # 전체 DB 스키마 생성
│   │   └── ...
│   └── functions/
│       ├── publish-post/index.ts      # 포스트 발행 시 ISR 트리거
│       ├── submit-inquiry/index.ts    # 문의 접수 및 이메일 알림
│       ├── submit-program/index.ts    # 프로그램 신청 처리
│       └── subscribe/index.ts         # 뉴스레터 구독 처리
├── .env.local                         # 환경 변수 (로컬) — .gitignore에 포함
├── .env.example                       # 환경 변수 템플릿
├── .eslintrc.json                     # ESLint 규칙
├── .prettierrc                        # Prettier 포매팅 규칙
├── next.config.ts                     # Next.js 설정 (이미지 도메인, 리다이렉트, 헤더)
├── tailwind.config.ts                 # Tailwind 설정 (디자인 토큰: 컬러, 폰트, 스페이싱)
├── tsconfig.json                      # TypeScript 설정 (경로 별칭, 엄격 모드)
├── postcss.config.js                  # PostCSS 설정 (Tailwind)
├── package.json                       # 의존성 정의
├── package-lock.json
├── README.md                          # 프로젝트 개요 및 세팅 가이드
└── docs/
    ├── PROJECT_FOUNDATION.md          # 이 파일
    ├── CODING_CONVENTIONS.md          # 코딩 스타일 가이드
    ├── DATABASE_SCHEMA.md             # DB 스키마 상세
    ├── DEPLOYMENT.md                  # 배포 가이드
    └── TROUBLESHOOTING.md             # 문제 해결 가이드
```

### 2.2 디렉토리별 상세 설명

#### `/app` — Next.js App Router
- 모든 라우트 파일은 `page.tsx` 형식
- `layout.tsx`: 계층적 레이아웃 관리
- 동적 라우트: `[param]` 형식 (예: `/blog/[category]/[slug]`)
- 특수 파일: `error.tsx`, `not-found.tsx`, `loading.tsx` (에러 핸들링)

#### `/components` — 재사용 가능한 React 컴포넌트
- **layout/**: 페이지 구조 컴포넌트 (Header, Footer, Navigation)
- **blog/**: 블로그 전용 컴포넌트 (PostCard, TOC, RelatedPosts)
- **cta/**: 전환 관련 컴포넌트 (InlineCTA, FloatingCTA, NewsletterPopup)
- **forms/**: 폼 컴포넌트 (react-hook-form 기반)
- **ui/**: shadcn/ui 컴포넌트 (버튼, 입력, 모달)

#### `/lib` — 유틸리티 및 설정
- **supabase/**: DB 접근 로직 (클라이언트, 서버, 쿼리 함수)
- **seo/**: SEO 관련 함수 (메타데이터, 구조화 데이터, 사이트맵)
- **markdown/**: Markdown 처리 (remark + rehype)
- **utils/**: 범용 유틸리티 (날짜, 읽기 시간, className 병합)

#### `/hooks` — 커스텀 React 훅
- 상태 관리, 이벤트 감지, 미디어 쿼리 등 재사용 가능한 로직 캡슐화

#### `/types` — TypeScript 타입 정의
- 타입 안전성을 위해 모든 데이터 구조 미리 정의
- `zod` 스키마와 연동 가능

#### `/constants` — 상수 정의
- 하드코딩 값 제거: 사이트명, URL, 연락처, 카테고리 등

#### `/styles` — 스타일링
- Tailwind CSS 설정 + 커스텀 CSS (@layer)
- 글로벌 스타일은 `globals.css`에만 작성

#### `/public` — 정적 자산
- 이미지, 폰트, 아이콘 (웹팩 처리 제외)

#### `/supabase` — Supabase 설정
- **migrations/**: DB 마이그레이션 SQL 파일
- **functions/**: Edge Functions (Deno 기반, TypeScript)

---

## 3. 코딩 컨벤션

### 3.1 파일명 규칙

| 파일 유형 | 규칙 | 예시 |
|----------|------|------|
| 컴포넌트 | PascalCase | `PostCard.tsx`, `ContactForm.tsx` |
| 페이지 | page.tsx (Next.js 규칙) | `app/blog/page.tsx` |
| 유틸/훅 | camelCase | `useScrollSpy.ts`, `readingTime.ts` |
| 타입 | PascalCase | `BlogPost.ts`, `ContactForm.ts` |
| 상수 | CONSTANT_CASE (선택) 또는 camelCase | `SITE_URL` 또는 `siteUrl` |
| 스타일 | globals.css 또는 module.css | `globals.css`, `PostCard.module.css` |

### 3.2 컴포넌트 작성 규칙

```typescript
// ✅ 올바른 패턴
'use client'; // 필요한 경우만 추가

import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  title: string;
  excerpt: string;
  thumbnail_url?: string;
}

const PostCard: FC<PostCardProps> = ({ title, excerpt, thumbnail_url }) => {
  return (
    <article className={cn('p-4', 'rounded-lg', 'bg-white')}>
      {thumbnail_url && <img src={thumbnail_url} alt={title} />}
      <h2>{title}</h2>
      <p>{excerpt}</p>
    </article>
  );
};

export default PostCard;
```

**규칙:**
1. 함수형 컴포넌트 + 화살표 함수 권장
2. Props 타입은 `interface ComponentNameProps` 형식 (컴포넌트 파일 내 정의)
3. **Server Component를 기본으로**: `'use client'` 지시자는 클라이언트 상태/이벤트 필요할 때만
4. 구조:
   - imports
   - 타입 정의 (interface Props)
   - 컴포넌트 함수
   - export default

### 3.3 스타일 규칙

```typescript
// ✅ Tailwind 유틸리티 클래스 (권장)
<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">제목</h2>
</div>

// ✅ 조건부 스타일은 cn() 유틸 사용
import { cn } from '@/lib/utils';

<button className={cn(
  'px-4 py-2 rounded-lg font-semibold',
  isActive ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
)}>
  버튼
</button>

// ❌ 인라인 스타일 금지
<div style={{ display: 'flex', padding: '16px' }}>불가</div>

// ❌ CSS 모듈 권장하지 않음 (Tailwind 사용)
```

**규칙:**
- 모든 스타일은 **Tailwind CSS 유틸리티 클래스** 사용
- 조건부 스타일은 `cn()` 함수 (clsx + tailwind-merge) 활용
- 복잡한 스타일은 `@layer components` in `globals.css`에 정의
- 인라인 스타일 금지

### 3.4 데이터 페칭 규칙

```typescript
// ✅ Server Component에서 직접 쿼리
// app/blog/page.tsx
import { getPosts } from '@/lib/supabase/queries';

export const revalidate = 3600; // ISR: 1시간

export default async function BlogPage() {
  const posts = await getPosts({ limit: 20 });
  return <BlogList posts={posts} />;
}

// ✅ 쿼리 함수는 lib/supabase/queries.ts 중앙 관리
// lib/supabase/queries.ts
import { createClient } from '@/lib/supabase/server';

export async function getPosts(options: { limit?: number }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(options.limit ?? 10);

  if (error) throw new Error(`Failed to fetch posts: ${error.message}`);
  return data;
}

// ❌ 클라이언트에서 직접 쿼리 (불가, SSR 보안 issue)
```

**규칙:**
1. **Server Component가 기본**: `lib/supabase/server.ts`로 데이터 페칭
2. **쿼리 함수 중앙화**: `lib/supabase/queries.ts`에 모든 DB 함수 정의
3. **에러 핸들링**: try/catch + 사용자 친화적 메시지
4. **ISR**: `export const revalidate = 3600` (경로별로 지정)
5. **캐싱**: Next.js 기본 캐싱 + Supabase 쿼리 최소화

### 3.5 SEO 규칙

```typescript
// ✅ 모든 페이지에 메타데이터
// app/blog/[category]/[slug]/page.tsx
import { generateMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return generateMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    ogImage: post.og_image_url || `${SITE_URL}/og-default.png`,
    url: `${SITE_URL}/blog/${params.category}/${params.slug}`,
  });
}

// ✅ 시맨틱 HTML 태그 필수
<article>
  <header>
    <h1>{post.title}</h1>
  </header>
  <section>{post.content}</section>
  <footer>
    <nav aria-label="Related">...</nav>
  </footer>
</article>

// ✅ 이미지 alt 텍스트 필수
<Image
  src={thumbnail_url}
  alt={post.title}
  width={1200}
  height={630}
/>

// ✅ 외부 링크는 보안 속성 자동 적용
<a
  href="https://example.com"
  rel="noopener noreferrer"
  target="_blank"
>
  외부 링크
</a>
```

**규칙:**
1. 모든 `page.tsx`에 `generateMetadata()` 또는 `metadata` 객체 필수
2. 시맨틱 HTML: `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` 사용
3. 이미지에 **alt 텍스트 필수**
4. 외부 링크: `rel="noopener noreferrer" target="_blank"` 자동 적용

### 3.6 폼 처리 규칙

```typescript
// ✅ react-hook-form + zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일을 입력하세요'),
  message: z.string().min(10, '메시지는 10자 이상이어야 합니다'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('제출 실패');
      // 성공 메시지
    } catch (error) {
      // 에러 메시지
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="이름" />
      {errors.name && <span>{errors.name.message}</span>}
      {/* 나머지 필드 */}
    </form>
  );
}
```

**규칙:**
- **react-hook-form**: 비제어 컴포넌트, 성능 최적화
- **zod**: 클라이언트 + 서버 검증 (타입 일관성)
- 모든 입력 필드에 유효성 검사 및 에러 메시지 표시

### 3.7 Git 규칙

| 항목 | 규칙 | 예시 |
|-----|------|------|
| 브랜치 | feature/{기능}, fix/{버그}, chore/{작업} | `feature/blog-search`, `fix/typo-metadata` |
| 커밋 메시지 | Conventional Commits | `feat: 블로그 검색 기능 추가` |
| PR | main 직접 push 금지, PR 필수 | GitHub PR 템플릿 사용 |

**커밋 타입:**
- `feat:` — 새로운 기능 추가
- `fix:` — 버그 수정
- `docs:` — 문서 변경
- `style:` — 코드 스타일 (포매팅, 세미콜론 등)
- `refactor:` — 코드 리팩토링 (기능 변화 없음)
- `test:` — 테스트 추가/수정
- `chore:` — 빌드, 의존성 등 (프로덕션 코드 영향 없음)

---

## 4. 환경 변수

### 4.1 .env.local 설정

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# 사이트 기본정보
NEXT_PUBLIC_SITE_URL=https://notherlife.com
NEXT_PUBLIC_SITE_NAME=앤아더라이프 심리상담연구소
NEXT_PUBLIC_SITE_EMAIL=contact@notherlife.com
NEXT_PUBLIC_SITE_PHONE=02-1234-5678

# Vercel (배포)
VERCEL_URL=notherlife.vercel.app
REVALIDATION_SECRET=your-secret-key-min-32-characters

# 이미지 생성 (나노바나나2)
NANOBANANA_API_KEY=your-api-key

# 분석 (선택사항)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 이메일 (선택)
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@notherlife.com
```

### 4.2 .env.example (템플릿)

```env
# 레포지토리에 커밋하는 템플릿 (실제 값 제외)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_SITE_EMAIL=
NEXT_PUBLIC_SITE_PHONE=
VERCEL_URL=
REVALIDATION_SECRET=
NANOBANANA_API_KEY=
NEXT_PUBLIC_GA_ID=
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

### 4.3 .gitignore 확인

```
# .env 파일 제외
.env.local
.env.*.local
.env

# node_modules
node_modules/

# 빌드 결과
.next/
out/
dist/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

---

## 5. Supabase 설정

### 5.1 전체 데이터베이스 스키마

다음의 마이그레이션 SQL을 `supabase/migrations/001_initial_schema.sql`에 작성합니다:

```sql
-- ============================================
-- 1. 테이블: categories (카테고리)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  target_audience TEXT DEFAULT 'client', -- 'client' | 'professional'
  default_cta_type TEXT DEFAULT 'consultation', -- 'consultation' | 'program' | 'newsletter'
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. 테이블: tags (태그)
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. 테이블: authors (작성자/상담사)
-- ============================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  bio TEXT,
  profile_image_url TEXT,
  credentials TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. 테이블: posts (블로그 포스트)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  summary TEXT,
  keywords TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  thumbnail_url TEXT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft', -- 'draft' | 'published' | 'archived'
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  schema_markup JSONB,
  references JSONB DEFAULT '[]'::jsonb,
  cta_type TEXT DEFAULT 'consultation',
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. 테이블: post_tags (포스트-태그 관계)
-- ============================================
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================
-- 6. 테이블: contact_inquiries (상담 문의)
-- ============================================
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  counseling_type TEXT,
  preferred_date TEXT,
  message TEXT,
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new', -- 'new' | 'contacted' | 'scheduled' | 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. 테이블: program_registrations (프로그램 신청)
-- ============================================
CREATE TABLE program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  affiliation TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'confirmed' | 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. 테이블: newsletter_subscribers (뉴스레터 구독)
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source_url TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- 인덱스: 성능 최적화
-- ============================================

-- 블로그 포스트 쿼리 최적화
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC)
  WHERE status = 'published';
CREATE INDEX idx_posts_category ON posts(category_id, published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured, published_at DESC)
  WHERE is_featured = TRUE;
CREATE INDEX idx_posts_updated_at ON posts(updated_at DESC);

-- 카테고리, 태그 쿼리 최적화
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

-- 키워드 검색
CREATE INDEX idx_posts_keywords ON posts USING GIN(keywords);

-- 풀텍스트 검색 (제목, 요약, 본문)
CREATE INDEX idx_posts_fulltext ON posts USING GIN(
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, ''))
);

-- 제관계 쿼리
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);

-- ============================================
-- RLS (Row Level Security) 정책 활성화
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS 정책: posts (게시글)
-- ============================================

-- 공개 읽기 (published만)
CREATE POLICY posts_select_public ON posts FOR SELECT
  USING (status = 'published');

-- 인증된 사용자 (관리자) 쓰기
CREATE POLICY posts_insert_authenticated ON posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY posts_update_authenticated ON posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY posts_delete_authenticated ON posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- RLS 정책: categories, tags, authors (공개 읽기)
-- ============================================

CREATE POLICY categories_select_public ON categories FOR SELECT USING (TRUE);
CREATE POLICY categories_insert_authenticated ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY categories_update_authenticated ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY categories_delete_authenticated ON categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY tags_select_public ON tags FOR SELECT USING (TRUE);
CREATE POLICY tags_insert_authenticated ON tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY tags_update_authenticated ON tags FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY tags_delete_authenticated ON tags FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY authors_select_public ON authors FOR SELECT USING (TRUE);
CREATE POLICY authors_insert_authenticated ON authors FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authors_update_authenticated ON authors FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authors_delete_authenticated ON authors FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY post_tags_select_public ON post_tags FOR SELECT USING (TRUE);
CREATE POLICY post_tags_insert_authenticated ON post_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY post_tags_delete_authenticated ON post_tags FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- RLS 정책: contact_inquiries (문의)
-- ============================================

-- 공개 쓰기 (문의 제출)
CREATE POLICY inquiries_insert_public ON contact_inquiries FOR INSERT
  WITH CHECK (TRUE);

-- 인증된 사용자만 읽기/수정 (관리자)
CREATE POLICY inquiries_select_authenticated ON contact_inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY inquiries_update_authenticated ON contact_inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY inquiries_delete_authenticated ON contact_inquiries FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- RLS 정책: program_registrations (프로그램 신청)
-- ============================================

CREATE POLICY programs_insert_public ON program_registrations FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY programs_select_authenticated ON program_registrations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY programs_update_authenticated ON program_registrations FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY programs_delete_authenticated ON program_registrations FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- RLS 정책: newsletter_subscribers (뉴스레터)
-- ============================================

CREATE POLICY newsletter_insert_public ON newsletter_subscribers FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY newsletter_select_authenticated ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY newsletter_update_authenticated ON newsletter_subscribers FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY newsletter_delete_authenticated ON newsletter_subscribers FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 5.2 Storage 버킷 설정

**버킷명:** `blog-images`

**정책:**
- **공개**: 누구나 읽기 가능 (RLS 정책에서 SELECT 허용)
- **관리자만 쓰기**: Edge Functions 또는 서버에서만 업로드 가능

**경로 구조:**
```
blog-images/
└── thumbnails/
    ├── panic-disorder-coping-methods.webp
    ├── depression-early-symptoms.webp
    └── ...
```

**파일명 규칙:** `{slug}.webp` (예: `panic-disorder-coping-methods.webp`)

**thumbnail_url 값:**
```
https://your-project.supabase.co/storage/v1/object/public/blog-images/thumbnails/{slug}.webp
```

### 5.3 Edge Functions 설정

#### 함수 1: `publish-post` (포스트 발행 → ISR 트리거)

**위치:** `supabase/functions/publish-post/index.ts`

**역할:** 포스트 상태가 `published`로 변경되면 자동으로 Vercel의 ISR 리밸리데이션 API 호출

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const vercelRevalidateUrl = Deno.env.get("VERCEL_REVALIDATE_URL")!
const revalidationSecret = Deno.env.get("REVALIDATION_SECRET")!

serve(async (req) => {
  const payload = await req.json()

  // 포스트 상태가 published로 변경된 경우만 처리
  if (payload.record.status !== "published") {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    })
  }

  const { slug, category_id } = payload.record

  // category_id로 카테고리 slug 조회
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const { data: category } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", category_id)
    .single()

  // ISR 리밸리데이션 호출
  const revalidatePaths = [
    `/blog`,
    `/blog/${category?.slug}`,
    `/blog/${category?.slug}/${slug}`,
  ]

  for (const path of revalidatePaths) {
    await fetch(vercelRevalidateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: revalidationSecret,
        path,
      }),
    })
  }

  return new Response(JSON.stringify({ revalidated: revalidatePaths }), {
    headers: { "Content-Type": "application/json" },
  })
})
```

#### 함수 2: `submit-inquiry` (상담 문의 처리)

**위치:** `supabase/functions/submit-inquiry/index.ts`

**역할:** 문의 폼 데이터 검증 → DB 저장 → 이메일 알림 발송

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY")
const sendgridFromEmail = Deno.env.get("SENDGRID_FROM_EMAIL")
const adminEmail = Deno.env.get("ADMIN_EMAIL")

serve(async (req) => {
  // CORS 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    })
  }

  try {
    const { name, phone, email, counseling_type, preferred_date, message } =
      await req.json()

    // 검증
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "필수 필드 누락" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // DB 저장
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert([
        {
          name,
          phone,
          email,
          counseling_type,
          preferred_date,
          message,
          source_url: req.headers.get("referer"),
        },
      ])
      .select()

    if (error) {
      throw new Error(`DB 저장 실패: ${error.message}`)
    }

    // 이메일 알림 (선택)
    if (sendgridApiKey && adminEmail) {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridApiKey}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: adminEmail }] }],
          from: { email: sendgridFromEmail },
          subject: `새로운 상담 문의: ${name}`,
          content: [
            {
              type: "text/plain",
              value: `
이름: ${name}
이메일: ${email}
전화: ${phone}
상담 유형: ${counseling_type}
희망 일시: ${preferred_date}
메시지: ${message}
              `,
            },
          ],
        }),
      })
    }

    return new Response(JSON.stringify({ id: data[0].id }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
```

#### 함수 3: `subscribe` (뉴스레터 구독)

**위치:** `supabase/functions/subscribe/index.ts`

**역할:** 이메일 검증 → 중복 확인 → DB 저장

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    })
  }

  try {
    const { email, name } = await req.json()

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "유효한 이메일을 입력하세요" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 중복 확인
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (existing) {
      return new Response(
        JSON.stringify({ error: "이미 구독 중인 이메일입니다" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // 저장
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          name: name || null,
          source_url: req.headers.get("referer"),
        },
      ])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return new Response(JSON.stringify({ id: data[0].id }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
```

---

## 6. Next.js 설정

### 6.1 next.config.ts

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-project.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 리다이렉트 (SEO)
  redirects: async () => {
    return [
      {
        source: "/blog/old-slug",
        destination: "/blog/category/new-slug",
        permanent: true, // 301 리다이렉트
      },
    ]
  },

  // 헤더 설정 (보안, 캐싱, CSP)
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/public/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },

  // 환경 변수 공개 설정
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

export default nextConfig
```

### 6.2 tailwind.config.ts

```typescript
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 브랜드 컬러
        primary: {
          50: "#f0f7f4",
          100: "#e0eee9",
          500: "#2D6A4F",
          600: "#1f4d35",
          700: "#164e3a",
          900: "#132e20",
        },
        secondary: {
          50: "#faf8f5",
          100: "#f5f0e8",
          500: "#e8dcc8",
          600: "#d6cdb8",
        },
        accent: {
          50: "#fdf5f1",
          100: "#f9e9e0",
          500: "#C17B5F",
          600: "#a86447",
        },
        neutral: {
          50: "#fafaf7",
          100: "#f5f0e8",
          700: "#4a4a47",
          900: "#333333",
        },
      },
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        serif: ["Pretendard", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2" }],
        h2: ["2rem", { lineHeight: "1.3" }],
        h3: ["1.5rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.8" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
      maxWidth: {
        article: "720px", // 블로그 본문 최적 너비
        container: "1280px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}

export default config
```

### 6.3 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,

    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "allowImportingTsExtensions": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/constants/*": ["./constants/*"],
      "@/styles/*": ["./styles/*"],
      "@/public/*": ["./public/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist", ".next"]
}
```

---

## 7. Markdown 처리 파이프라인

### 7.1 처리 흐름

```
Markdown 문자열 (DB posts.content)
  ↓
remark-parse (AST로 파싱)
  ↓
remark-gfm (테이블, 취소선, 체크리스트 확장)
  ↓
remark-rehype (HTML AST로 변환)
  ↓
rehype-slug (모든 heading에 자동 id 부여)
  ↓
rehype-autolink-headings (heading을 클릭 가능하게 링크로 감싸기)
  ↓
customTableWrapper (테이블을 반응형 div로 감싸기)
  ↓
customExternalLinks (외부 링크에 보안 속성 자동 추가)
  ↓
rehype-stringify (HTML 문자열로 변환)
```

### 7.2 구현: lib/markdown/processor.ts

```typescript
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeStringify from "rehype-stringify"
import { visit } from "unist-util-visit"

// 커스텀 플러그인: 테이블을 반응형 래퍼로 감싸기
function customTableWrapper() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "table") {
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: {
            style: "overflow-x: auto;",
            className: "table-wrapper",
          },
          children: [node],
        }
        Object.assign(node, wrapper)
      }
    })
  }
}

// 커스텀 플러그인: 외부 링크에 보안 속성 추가
function customExternalLinks() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (
        node.tagName === "a" &&
        node.properties &&
        node.properties.href &&
        (node.properties.href.startsWith("http") ||
          node.properties.href.startsWith("//"))
      ) {
        node.properties.rel = ["noopener", "noreferrer"]
        node.properties.target = "_blank"
      }
    })
  }
}

export async function processMarkdown(markdown: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { passThrough: ["mdxFlowExpression", "mdxTextExpression"] })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor-link"] },
    })
    .use(customTableWrapper)
    .use(customExternalLinks)
    .use(rehypeStringify)

  const result = await processor.process(markdown)
  return result.toString()
}
```

### 7.3 TOC 추출: lib/markdown/schema.ts

```typescript
import { unified } from "unified"
import remarkParse from "remark-parse"
import { visit } from "unist-util-visit"

export interface TocItem {
  id: string
  text: string
  level: number
}

export async function extractTableOfContents(
  markdown: string
): Promise<TocItem[]> {
  const ast = unified().use(remarkParse).parse(markdown)
  const toc: TocItem[] = []

  visit(ast, "heading", (node: any) => {
    const text = node.children
      .map((child: any) => (child.type === "text" ? child.value : ""))
      .join("")

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, "")
      .replace(/\s+/g, "-")

    toc.push({
      id,
      text,
      level: node.depth,
    })
  })

  return toc
}
```

---

## 8. Next.js 설정 파일

### 8.1 .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react/no-unescaped-entities": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-html-link-for-pages": "off"
  }
}
```

### 8.2 .prettierrc

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

### 8.3 postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 9. 배포 파이프라인

### 9.1 Vercel 배포 흐름

```
Git Push to main
    ↓
GitHub Webhook → Vercel 감지
    ↓
Vercel Build (Next.js 빌드)
    ↓
next build (SSG 페이지 사전 렌더링)
    ↓
Vercel Edge Network 배포
    ↓
자동 DNS 업데이트
```

### 9.2 ISR (Incremental Static Regeneration) 전략

```
포스트 상태 변경 (draft → published)
    ↓
Supabase DB Trigger
    ↓
Edge Function: publish-post 실행
    ↓
/api/revalidate?secret=XXX&path=/blog/category/slug 호출
    ↓
Next.js가 해당 경로만 재빌드
    ↓
Edge Network에 자동 배포
```

**구현: app/api/revalidate/route.ts**

```typescript
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const path = searchParams.get("path")

  // 시크릿 검증
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!path) {
    return new Response("Missing path", { status: 400 })
  }

  try {
    revalidatePath(path)
    return new Response(JSON.stringify({ revalidated: true, path }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to revalidate" }),
      { status: 500 }
    )
  }
}
```

### 9.3 캐시 전략

| 경로 | ISR 시간 | 설명 |
|-----|---------|------|
| `/blog/[category]/[slug]` | 3600초 (1시간) | 블로그 포스트: 발행 후 ISR로 즉시 재빌드 |
| `/blog` | 3600초 | 블로그 목록: 새 포스트 발행 시 재빌드 |
| `/blog/[category]` | 3600초 | 카테고리별 목록 |
| `/about`, `/team`, `/programs` | 86400초 (24시간) | 정적 페이지: 일일 재빌드 |
| `/` (홈페이지) | 3600초 | 최신 포스트 반영 |

---

## 10. 초기 설정 체크리스트

프로젝트를 시작할 때 이 순서대로 수행합니다:

### Phase 1: 환경 설정 (30분)
- [ ] GitHub 레포지토리 생성 및 로컬 클론
- [ ] Node.js 18+ 설치 확인
- [ ] `npm create next-app@latest` 실행 (TypeScript, Tailwind 선택)
- [ ] ESLint, Prettier 설정 확인

### Phase 2: 의존성 설치 (15분)
- [ ] 필수 라이브러리 설치:
  ```bash
  npm install @supabase/supabase-js @supabase/ssr zustand react-hook-form zod @hookform/resolvers framer-motion lucide-react
  npm install remark remark-gfm remark-rehype rehype-slug rehype-autolink-headings rehype-stringify unist-util-visit
  npm install -D @tailwindcss/typography @tailwindcss/forms
  ```

### Phase 3: 프로젝트 구조 (30분)
- [ ] 디렉토리 구조 생성:
  ```bash
  mkdir -p lib/supabase lib/seo lib/markdown
  mkdir -p components/layout components/blog components/cta components/forms components/home components/ui components/seo
  mkdir -p hooks types constants styles
  mkdir -p supabase/migrations supabase/functions
  mkdir -p docs public/images
  ```
- [ ] 파일 생성: `.env.example`, `.eslintrc.json`, `.prettierrc`

### Phase 4: Supabase 설정 (45분)
- [ ] Supabase 프로젝트 생성 (https://supabase.com)
- [ ] 환경 변수 복사: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `.env.local` 파일 생성 및 값 입력
- [ ] DB 마이그레이션 실행: `supabase/migrations/001_initial_schema.sql` 전체 SQL 실행
- [ ] RLS 정책 활성화 (마이그레이션에 포함됨)
- [ ] Storage 버킷 생성: `blog-images` (공개 읽기)
- [ ] 기본 카테고리 데이터 입력 (categories 테이블)

### Phase 5: Next.js 설정 (45분)
- [ ] `next.config.ts` 작성 (이미지 도메인, 리다이렉트, 헤더)
- [ ] `tailwind.config.ts` 작성 (디자인 토큰)
- [ ] `tsconfig.json` 경로 별칭 설정
- [ ] `app/layout.tsx` 작성 (폰트, 메타데이터, 네비게이션)
- [ ] `styles/globals.css` 작성 (Tailwind, 커스텀 CSS)

### Phase 6: 기본 컴포넌트 개발 (2~3시간)
- [ ] Layout 컴포넌트:
  - [ ] `components/layout/Header.tsx`
  - [ ] `components/layout/Footer.tsx`
  - [ ] `components/layout/Navigation.tsx`
- [ ] Utility 함수:
  - [ ] `lib/supabase/client.ts`
  - [ ] `lib/supabase/server.ts`
  - [ ] `lib/supabase/queries.ts` (기본 CRUD)
  - [ ] `lib/utils/cn.ts`
  - [ ] `lib/utils/date.ts`
  - [ ] `constants/site.ts`

### Phase 7: 핵심 페이지 개발 (3~4시간)
- [ ] `app/page.tsx` (홈페이지)
- [ ] `app/blog/page.tsx` (블로그 목록)
- [ ] `app/blog/[category]/[slug]/page.tsx` (포스트 상세)
- [ ] `app/contact/page.tsx` (문의 폼)
- [ ] `app/sitemap.ts` (동적 사이트맵)
- [ ] `app/robots.ts` (robots.txt)

### Phase 8: SEO 최적화 (2시간)
- [ ] `lib/seo/metadata.ts` 구현
- [ ] `lib/seo/schema.ts` 구현
- [ ] `lib/markdown/processor.ts` 구현
- [ ] 모든 페이지에 `generateMetadata()` 추가

### Phase 9: Vercel 배포 (30분)
- [ ] Vercel 계정 생성
- [ ] GitHub 레포지토리 연동
- [ ] 환경 변수 설정 (Vercel 대시보드)
- [ ] 초기 배포 테스트

### Phase 10: CTA 및 폼 개발 (2시간)
- [ ] `components/cta/` 컴포넌트들 개발
- [ ] `components/forms/` 폼 컴포넌트들 개발
- [ ] Supabase Edge Functions 배포

### Phase 11: 테스트 및 QA (2시간)
- [ ] Lighthouse 분석
- [ ] PageSpeed Insights 확인
- [ ] Core Web Vitals 측정
- [ ] 크로스 브라우저 테스트

### Phase 12: 초기 콘텐츠 (3~4시간)
- [ ] 기본 카테고리 생성
- [ ] 샘플 포스트 5~10개 작성/발행
- [ ] OG 이미지 설정 확인

### Phase 13: 모니터링 설정 (1시간)
- [ ] Google Search Console 등록
- [ ] Google Analytics 4 설정
- [ ] Vercel Analytics 활성화
- [ ] 에러 모니터링 설정 (선택: Sentry)

---

## 11. 핵심 라이브러리 버전

프로젝트 생성 시 권장 버전:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/ssr": "^0.0.10",
    "zustand": "^4.4.0",
    "react-hook-form": "^7.45.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    "remark": "^15.0.0",
    "remark-gfm": "^4.0.0",
    "remark-rehype": "^11.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "rehype-stringify": "^10.0.0",
    "unist-util-visit": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.10",
    "@tailwindcss/forms": "^0.5.4",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "eslint": "^8.50.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 12. 주요 참고 문서

더 자세한 내용은 다음 문서들을 참고하세요:

- **CODING_CONVENTIONS.md** — 코딩 스타일 가이드 (더 상세한 패턴)
- **DATABASE_SCHEMA.md** — Supabase 스키마 상세 설명
- **DEPLOYMENT.md** — Vercel 배포 및 CI/CD 설정
- **TROUBLESHOOTING.md** — 흔한 문제 해결 방법

---

## 13. 핵심 링크

| 리소스 | 링크 |
|--------|------|
| Next.js 공식 문서 | https://nextjs.org/docs |
| Supabase 문서 | https://supabase.com/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |
| React Hook Form | https://react-hook-form.com |
| Zod | https://zod.dev |

---

**이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.**

최종 수정: 2026년 4월 6일
