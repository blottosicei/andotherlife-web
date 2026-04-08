# 앤아더라이프 심리상담연구소 웹사이트

## 프로젝트 개요
SEO 최적화된 대규모 블로그 콘텐츠를 기반으로 하는 심리상담 전문 웹사이트.
검색엔진을 통해 유입된 사용자를 상담 예약, 교육 프로그램 수강, 뉴스레터 구독으로 전환하는 통합 마케팅 플랫폼.

## 기술 스택
- **프레임워크:** Next.js 16 (App Router, SSG/ISR)
- **언어:** TypeScript 5.x (strict mode)
- **스타일링:** Tailwind CSS v4 + shadcn/ui
- **DB/백엔드:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **상태관리:** Zustand (클라이언트 UI 상태만)
- **폼:** React Hook Form + Zod
- **애니메이션:** Framer Motion
- **아이콘:** Lucide React
- **Markdown:** remark + rehype 파이프라인
- **배포:** Vercel

## 디렉토리 구조
```
app/           → Next.js App Router 페이지
  blog/        → 블로그 (목록, 카테고리, 상세, 태그)
  counseling/  → 상담 프로그램 (목록 + 정적 상세: couple, young-adult)
  about/       → 센터 소개
  team/        → 교수진
  programs/    → 상담사 교육
  contact/     → 상담 예약 폼
components/    → 재사용 컴포넌트 (layout, blog, counseling, cta, forms, home, seo, ui)
lib/           → 유틸리티 (supabase, seo, markdown, utils)
hooks/         → 커스텀 React 훅
types/         → TypeScript 타입 정의
constants/     → 사이트 상수, 카테고리, SEO 기본값
styles/        → 글로벌 CSS
public/        → 정적 자산
supabase/      → DB 마이그레이션 + Edge Functions
docs/          → 기획 문서 (PRD, IA, DESIGN_SYSTEM 등)
```

## 코딩 컨벤션

### 파일명
- 컴포넌트: PascalCase (PostCard.tsx)
- 유틸/훅: camelCase (useScrollSpy.ts)
- 상수: camelCase 파일 + UPPER_CASE 변수

### 컴포넌트
- Server Component가 기본. 'use client'는 클라이언트 상태/이벤트 필요시만
- 화살표 함수 + Props interface 패턴
- shadcn/ui 컴포넌트는 components/ui/ 에서 import

### 스타일
- Tailwind CSS 유틸리티 클래스만 사용
- 조건부 스타일은 cn() 함수 (lib/utils.ts)
- 인라인 스타일 금지

### 데이터 페칭
- Server Component에서 lib/supabase/server.ts 사용
- 쿼리 함수는 lib/supabase/queries.ts에 중앙화
- ISR: blog 3600초, static 86400초

## Supabase 연동

### 환경 변수
- NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: 공개 API 키
- SUPABASE_SERVICE_ROLE_KEY: 서버 전용 관리자 키

### 클라이언트
- 브라우저: lib/supabase/client.ts (createBrowserClient)
- 서버: lib/supabase/server.ts (createServerClient, async)

### DB 스키마
9개 테이블: counseling_programs, categories, tags, authors, posts, post_tags, contact_inquiries, program_registrations, newsletter_subscribers
- `counseling_programs`: CTA 자동 매칭 + `/counseling` 목록 카드용 (상세 페이지는 정적 코드)
- `posts.counseling_program_id`: 발행 시 match_keywords 비교로 자동 저장
- `categories.default_program_id`: 키워드 매칭 실패 시 폴백 프로그램
마이그레이션: supabase/migrations/001_initial_schema.sql

## SEO 주의사항

### 필수 규칙
- 모든 페이지에 generateMetadata() 또는 metadata 객체 필수
- 시맨틱 HTML: article, section, nav, main, aside 사용
- 이미지에 alt 텍스트 필수
- 외부 링크: rel="noopener noreferrer" target="_blank"
- 구조화 데이터: Article, FAQPage, BreadcrumbList, Organization, Person, Course Schema

### 블로그 본문
- Markdown → HTML: lib/markdown/processor.ts
- 테이블은 반응형 래퍼로 감싸기
- H2/H3 자동 ID 생성 (rehype-slug)
- 외부 링크 자동 보안 속성 추가

### Core Web Vitals 목표
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

## 폰트
- **기본 본문:** Pretendard (로컬 폰트, --font-pretendard, public/fonts/)
- **제목/강조:** ChangwonDangamRound (로컬 폰트, --font-dangam, public/fonts/)
- h1, h2는 자동으로 font-heading(ChangwonDangamRound) 적용
- 개별 요소에 `.font-dangam` 클래스로 적용 가능

## 브랜드 컬러 (Stitch 디자인 토큰 기반)
- Primary: #2d6a4f (딥 그린), Container: #b1f0ce, Dim: #1f5e44
- Secondary: #615f59 (웜 그레이), Container: #e7e2da (베이지)
- Tertiary/Accent: #8c4f36 (웜 브라운), Container: #fdae8f (피치)
- Background: #f9f9f6, Foreground: #2f3331
- Surface 계층: lowest #ffffff → low #f3f4f0 → mid #eceeeb → high #e6e9e5
- Inverse: #0d0f0d (푸터), Outline: #777c78
- 카카오톡: #FFE812
- **UI 디자인 레퍼런스:** docs/STITCH_UI_REFERENCE.md 참조

## 커밋 규칙
- Conventional Commits: feat, fix, docs, style, refactor, test, chore
- 브랜치: feature/{기능}, fix/{버그}, chore/{작업}
- 한국어 커밋 메시지 허용

## 주요 명령어
```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

## 전환 퍼널

### 내담자 전환 퍼널 (상담 프로그램 경유)
```
블로그 글 → InlineCTA/BottomCTA "○○상담 알아보기" → /counseling/[slug] → "상담 예약하기" → /contact
```
- CTA 링크: `posts.counseling_program_id` 기반 → `/counseling/{slug}`
- 매칭 프로그램 없으면 → `/counseling` (목록)
- 하이브리드: DB(`counseling_programs`)는 CTA 매칭 + 목록 카드만. 상세 페이지는 정적 코드 파일

### 전문가 전환 퍼널
```
블로그 글 → CTA "교육 과정 살펴보기" → /programs → /programs/[slug] → 수강 신청
```

## 네비게이션
```
홈 | 블로그 | 상담 프로그램 | 센터소개 | 교수진 | 상담사 교육 | 상담예약
```

## 카테고리 (7개)
1. mental-health (마음건강) → 내담자 → 상담 CTA
2. counseling-stories (심리상담 이야기) → 내담자 → 상담 CTA
3. relationships-communication (관계/소통) → 내담자 → 상담 CTA
4. children-youth (아동·청소년) → 내담자 → 상담 CTA
5. self-growth (자기성장) → 내담자 → 뉴스레터 CTA
6. expert-column (상담사 전문가 칼럼) → 전문가 → 교육 CTA
7. education-certification (교육·자격 정보) → 전문가 → 교육 CTA
