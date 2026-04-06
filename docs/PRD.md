# 앤아더라이프 심리상담연구소 — PRD (Product Requirements Document)

**프로젝트명:** 앤아더라이프 심리상담연구소 웹사이트
**작성일:** 2026년 4월 6일
**버전:** v1.0
**기획 문서 기반:** 앤아더라이프_SEO블로그_기획문서.md v1.4

---

## 문서 개요

### 프로젝트 개요
앤아더라이프 심리상담연구소의 온라인 거점으로서 SEO 최적화된 대규모 블로그 콘텐츠를 통해 심리상담이 필요한 내담자(예비 클라이언트)와 전문 상담사를 유입시키고, 상담 예약·교육 프로그램 수강·리드 수집 등의 전환 목표를 달성하는 웹사이트를 구축한다.

### 관련 문서
- 기획 문서: `앤아더라이프_SEO블로그_기획문서.md`
- 설계 문서: (추후 작성)
- 스프린트 계획: (추후 작성)

---

## 1. 제품 개요

### 1.1 제품 비전
SEO 퍼스트 원칙에 따라 건설된 심리상담 전문 콘텐츠 플랫폼으로, 검색엔진을 통해 자연스럽게 유입된 사용자를 상담 예약, 교육 신청, 리드 수집 등의 명확한 전환 목표로 유도하는 통합 마케팅 시스템.

### 1.2 핵심 가치 제안

| 가치 | 대상 | 설명 |
|------|------|------|
| **신뢰할 수 있는 정보** | 내담자 | 심리상담 전문가가 검증한 신뢰성 높은 콘텐츠로 심리적 어려움 해결 정보 제공 |
| **쉬운 접근성** | 내담자 | 검색을 통한 자연스러운 유입, 명확한 상담 예약 CTA로 진입 장벽 낮춤 |
| **전문성 입증** | 전문가 | 보수교육 및 전문가 네트워크 콘텐츠로 전문가 커뮤니티 강화 |
| **데이터 기반 마케팅** | 운영사 | 자동 생성 콘텐츠 + 측정 가능한 전환 추적으로 효율적 마케팅 ROI 달성 |

### 1.3 성공 지표 (KPI)

| KPI | 목표 | 측정 방법 |
|-----|------|----------|
| 월간 오가닉 트래픽 | 런칭 6개월 내 월 10,000+ 세션 | Google Analytics |
| Core Web Vitals | 모든 지표 "Good" 등급 달성 | PageSpeed Insights |
| 블로그 → 상담 문의 전환율 | 1% 이상 | Supabase + GA 이벤트 추적 |
| 블로그 → 교육 신청 전환율 | 0.5% 이상 | Supabase + GA 이벤트 추적 |
| 뉴스레터 구독 전환율 | 2% 이상 | Supabase 구독자 수 |
| 인덱싱 비율 | 발행 콘텐츠의 95% 이상 Google 인덱싱 | Google Search Console |
| 평균 검색 순위 | 주요 키워드 TOP 10 달성 | Ahrefs / Search Console |
| Lighthouse SEO 점수 | 95점 이상 | Lighthouse |

---

## 2. 기능 요구사항 (Functional Requirements)

### 2.1 블로그 시스템 (핵심)

#### [FR-001] 블로그 목록 페이지
- **우선순위:** P0
- **설명:** 발행된 모든 블로그 포스트를 목록 형태로 표시하는 페이지 (`/blog`)
- **수락 기준:**
  - 포스트 카드(썸네일, 제목, 발췌, 카테고리, 작성일, 읽기 시간) 그리드 레이아웃
  - 카테고리 탭/필터링으로 특정 카테고리 콘텐츠만 조회 가능
  - 숫자 페이지네이션 (SEO 최적화, 무한 스크롤 비권장)
  - 포스트당 1페이지 = 12개 항목 기준
  - 사이드바: 인기 글 3개, 카테고리 목록, CTA 배너
  - 블로그 내 검색 기능 (Supabase 풀텍스트 검색)
- **관련 페이지:** `/blog`
- **관련 컴포넌트:** `PostCard.tsx`, `CategoryFilter.tsx`, `SearchBar.tsx`

#### [FR-002] 블로그 상세 페이지
- **우선순위:** P0
- **설명:** 개별 블로그 포스트의 전체 내용을 표시하는 페이지 (`/blog/[category]/[slug]`)
- **수락 기준:**
  - Markdown 본문을 HTML로 렌더링
  - 제목, 작성일, 카테고리, 태그, 읽기 시간 표시
  - 요약 박스: `summary` 필드(200~400자) 기반 핵심 내용 미리보기
  - TOC(Table of Contents) 자동 생성 (H2/H3 기준)
  - 본문 내 테이블은 반응형 래퍼(`overflow-x: auto`)로 감싸기
  - 관련 포스트 추천 섹션 (같은 카테고리/태그 기반 3~5개)
  - 참고 자료 섹션: `references` JSONB 필드 자동 렌더링 (아웃링크 출처 목록)
  - FAQ 섹션: 구조화 데이터 (FAQPage Schema) 적용
  - CTA 삽입: 본문 중간(InlineCTA) + 하단(BottomCTA, 카테고리별 다른 CTA)
  - 소셜 공유 버튼 (Twitter, Facebook, 카카오톡)
  - ISR: 1시간 단위 재검증
- **관련 페이지:** `/blog/[category]/[slug]`
- **관련 컴포넌트:** `PostContent.tsx`, `TableOfContents.tsx`, `RelatedPosts.tsx`, `FAQSection.tsx`, `InlineCTA.tsx`, `BottomCTA.tsx`

#### [FR-003] 카테고리별 목록 페이지
- **우선순위:** P1
- **설명:** 특정 카테고리에 속한 포스트만 표시하는 페이지 (`/blog/[category]`)
- **수락 기준:**
  - 카테고리 SEO 제목/설명 표시
  - 카테고리별 포스트 목록 (페이지네이션)
  - BreadcrumbList 구조화 데이터
  - 카테고리별 메타 태그 (seo_title, seo_description)
- **관련 페이지:** `/blog/[category]`
- **관련 컴포넌트:** `Breadcrumb.tsx`, `PostCard.tsx`

#### [FR-004] 태그별 목록 페이지
- **우선순위:** P2
- **설명:** 특정 태그로 분류된 포스트를 표시하는 페이지 (`/blog/tag/[tag]`)
- **수락 기준:**
  - 태그 이름 표시
  - 태그별 포스트 목록 (페이지네이션)
  - Breadcrumb 네비게이션
- **관련 페이지:** `/blog/tag/[tag]`

#### [FR-005] 카테고리/태그 시스템
- **우선순위:** P0
- **설명:** 블로그 콘텐츠 분류 체계
- **수락 기준:**
  - 카테고리: 마음건강, 심리상담 이야기, 관계/소통, 아동·청소년, 자기성장, 상담사 전문가 칼럼, 교육·자격 정보
  - 각 카테고리에 `target_audience` 설정 ('client' 또는 'professional')
  - 각 카테고리에 `default_cta_type` 설정 (상담 vs 교육)
  - 태그는 자유로운 분류용 (사용자 탐색 용도)
- **관련 DB:** `categories`, `tags`, `post_tags`

#### [FR-006] 블로그 내 검색 기능
- **우선순위:** P1
- **설명:** 키워드 기반 포스트 검색 기능
- **수락 기준:**
  - Supabase 풀텍스트 검색 (title, summary, content 기반)
  - 검색 결과 페이지네이션
  - 실시간 검색 제안 (선택사항)
  - 검색어 강조(highlight) 표시
- **관련 페이지:** `/blog?q=[search_query]`
- **관련 컴포넌트:** `SearchBar.tsx`

---

### 2.2 SEO/AEO 시스템

#### [FR-007] 동적 메타 태그 자동 생성
- **우선순위:** P0
- **설명:** 모든 페이지에 검색엔진 최적화된 메타 태그 자동 생성
- **수락 기준:**
  - `<title>`: 60자 이내, 핵심 키워드 포함, 페이지별 고유
  - `<meta name="description">`: 155자 이내, CTA 포함, 페이지별 고유
  - Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
  - Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
  - Canonical URL: 자동 생성
  - 언어: `hreflang` (한국어 단일)
- **관련 라이브러리:** `next/head`, Metadata API
- **관련 파일:** `lib/seo/metadata.ts`

#### [FR-008] 구조화 데이터 자동 생성
- **우선순위:** P0
- **설명:** Schema.org 기반 구조화 데이터로 검색엔진 이해도 향상
- **수락 기준:**
  - **Article Schema:** 블로그 포스트 (headline, author, datePublished, dateModified, image, articleBody)
  - **FAQPage Schema:** FAQ 섹션 (mainEntity → questions 배열)
  - **BreadcrumbList Schema:** 네비게이션 구조
  - **Organization Schema:** 홈페이지 (name, address, telephone, openingHours)
  - **LocalBusiness Schema:** 지역 비즈니스 정보
  - **Person Schema:** 교수진 프로필
  - **Course Schema:** 교육 프로그램
  - JSON-LD 형식으로 `<head>` 내 자동 삽입
- **관련 파일:** `lib/seo/schema.ts`, `components/seo/SchemaMarkup.tsx`

#### [FR-009] 동적 사이트맵 생성
- **우선순위:** P0
- **설명:** 모든 포스트, 카테고리, 페이지를 포함하는 XML 사이트맵 자동 생성 (`/sitemap.xml`)
- **수락 기준:**
  - Supabase에서 published 포스트 조회 → sitemap 동적 생성
  - 각 항목에 `lastmod` (updated_at), `changefreq`, `priority` 포함
  - 블로그 포스트: priority 0.8, changefreq weekly
  - 정적 페이지: priority 0.9, changefreq monthly
  - Next.js sitemap API (`app/sitemap.ts`)
- **관련 파일:** `app/sitemap.ts`

#### [FR-010] robots.txt 생성
- **우선순위:** P0
- **설명:** 검색 로봇 크롤링 규칙 정의
- **수락 기준:**
  - 모든 경로 크롤링 허용
  - sitemap.xml 경로 명시
  - 관리자 이메일 포함 (선택사항)
  - Next.js robots API (`app/robots.ts`)
- **관련 파일:** `app/robots.ts`

#### [FR-011] OG 이미지 자동 생성
- **우선순위:** P0
- **설명:** 나노바나나2(Gemini) 기반 텍스트 없는 일러스트 생성 + Next.js Edge Runtime으로 OG 이미지 합성
- **수락 기준:**
  - **블로그 대표 이미지:** 나노바나나2 API로 생성한 텍스트 없는 일러스트 (1K 해상도, 따뜻한 수채화/파스텔 톤, 미니멀)
  - 파일명: `{slug}.webp` (slug와 1:1 매칭)
  - Supabase Storage: `blog-images/thumbnails/{slug}.webp`
  - DB `thumbnail_url` 필드에 저장: `{SUPABASE_URL}/storage/v1/object/public/blog-images/thumbnails/{slug}.webp`
  - **OG 이미지:** `opengraph-image.tsx`에서 thumbnail_url 배경 + 반투명 오버레이(그라디언트) + 글 제목 + 카테고리 + 로고 합성
  - OG 이미지 크기: 1200x630px, Next.js Edge Runtime 실시간 렌더링
  - `og_image_url` null이면 자동 생성, 값 있으면 커스텀 이미지 사용
  - 스타일: 브랜드 컬러(딥 그린, 소프트 베이지, 웜 코랄)와 조화
- **관련 파일:** `app/blog/[category]/[slug]/opengraph-image.tsx`, Claude Skills (blog-content-generator)

#### [FR-012] Core Web Vitals 최적화
- **우선순위:** P0
- **설명:** 페이지 성능 최적화로 검색 순위 향상
- **수락 기준:**
  - **LCP (Largest Contentful Paint) < 2.5s:** Next.js Image Optimization, 폰트 프리로드, 서버 컴포넌트 활용
  - **INP (Interaction to Next Paint) < 200ms:** 클라이언트 JS 최소화, 코드 스플리팅, 이벤트 핸들러 최적화
  - **CLS (Cumulative Layout Shift) < 0.1:** 이미지 크기 명시, 폰트 fallback 설정, 레이아웃 안정성
  - Lighthouse Performance 점수 90+
- **관련 도구:** Lighthouse, PageSpeed Insights, Vercel Speed Insights

---

### 2.3 CTA/전환 시스템

#### [FR-013] 카테고리별 자동 CTA 분기
- **우선순위:** P0
- **설명:** 콘텐츠 카테고리에 따라 자동으로 다른 CTA 표시
- **수락 기준:**
  - **내담자 대상 콘텐츠** (마음건강, 심리상담 이야기, 관계/소통, 아동·청소년): "상담 예약하기", "무료 상담 문의"
  - **전문가 대상 콘텐츠** (상담사 전문가 칼럼, 교육·자격 정보): "교육 과정 살펴보기", "수강 신청하기"
  - **공통:** "뉴스레터 구독으로 최신 콘텐츠 받기"
  - 카테고리의 `target_audience` + `default_cta_type` 필드 기반 로직
- **관련 컴포넌트:** CTA 라우팅 로직 (유틸 함수)

#### [FR-014] 인라인 CTA 배너
- **우선촉:** P1
- **설명:** 블로그 본문 중간에 삽입되는 맥락적 CTA
- **수락 기준:**
  - 본문 400~600자 지점에 자동 삽입
  - 콘텐츠 주제와 연관된 CTA 텍스트
  - 카테고리별 다른 버튼 텍스트/색상
  - 반응형: 모바일 전체 너비, 데스크탑 본문 너비
- **관련 컴포넌트:** `InlineCTA.tsx`

#### [FR-015] 하단 CTA 섹션
- **우선순위:** P0
- **설명:** 블로그 포스트 하단 전체 너비 CTA 섹션
- **수락 기준:**
  - 포스트 하단에 고정 배치
  - 카테고리별 다른 CTA 텍스트/색상
  - 배경 이미지 또는 그라디언트
  - "상담 예약하기" / "교육 신청하기" 버튼
- **관련 컴포넌트:** `BottomCTA.tsx`

#### [FR-016] 사이드바 CTA 위젯
- **우선순위:** P1
- **설명:** 데스크탑 사이드바에 고정되는 CTA
- **수락 기준:**
  - 스크롤 시에도 뷰포트 내 유지 (sticky)
  - 상담 문의 or 뉴스레터 구독 선택형
  - 모바일에서는 숨김
- **관련 컴포넌트:** `SidebarCTA.tsx`

#### [FR-017] 플로팅 카카오톡 버튼
- **우선순위:** P1
- **설명:** 모바일/데스크탑 하단 우측 플로팅 버튼
- **수락 기준:**
  - 카카오톡 상담 링크 (KakaoTalk 채널 URL)
  - 스크롤 시에도 항상 표시
  - 다른 CTA와 z-index 충돌 없음
- **관련 컴포넌트:** `FloatingCTA.tsx`

#### [FR-018] 뉴스레터 팝업
- **우선순위:** P2
- **설명:** 이탈 방지 뉴스레터 구독 팝업
- **수락 기준:**
  - 페이지 이탈 의도 감지 시 자동 표시
  - 이메일 입력 폼 포함
  - 닫기 버튼 및 1회 일일 제한
  - 로컬스토리지에 표시 여부 저장
- **관련 컴포넌트:** `NewsletterPopup.tsx`

#### [FR-019] UTM 파라미터 추적
- **우선순위:** P1
- **설명:** 마케팅 캠페인 효과 측정
- **수락 기준:**
  - 모든 문의/신청 폼에 자동으로 현재 URL의 UTM 파라미터 캡처
  - `utm_source`, `utm_medium`, `utm_campaign` DB 저장
  - Google Analytics 이벤트 추적 연동
- **관련 DB:** `contact_inquiries`, `program_registrations`

---

### 2.4 폼/데이터 수집

#### [FR-020] 상담 예약/문의 폼
- **우선순위:** P0
- **설명:** 사용자가 상담을 예약하거나 문의하는 폼 (`/contact`)
- **수락 기준:**
  - 필드: 이름, 연락처(전화/휴대폰), 이메일, 상담 유형(드롭다운), 희망 일시, 문의 내용
  - React Hook Form + Zod 검증
  - 서버 사이드 제출 (Server Action)
  - Supabase `contact_inquiries` 테이블 저장
  - 이메일 알림 발송 (Supabase Edge Function)
  - 제출 후 성공 메시지 + 안내 텍스트
  - reCAPTCHA v3 또는 Honeypot 필드로 스팸 방지 (선택)
  - 폼 데이터에 자동으로 `source_url`, `utm_*` 파라미터 포함
- **관련 컴포넌트:** `ContactForm.tsx`
- **관련 DB:** `contact_inquiries`
- **관련 Edge Function:** `/functions/submit-inquiry`

#### [FR-021] 교육 프로그램 신청 폼
- **우선순위:** P1
- **설명:** 교육 프로그램 수강 신청 폼
- **수락 기준:**
  - 필드: 프로그램명, 이름, 연락처, 이메일, 소속(선택), 문의 내용
  - React Hook Form + Zod 검증
  - Supabase `program_registrations` 테이블 저장
  - 이메일 알림 발송
  - 제출 후 성공 메시지
- **관련 컴포넌트:** `ProgramForm.tsx`
- **관련 DB:** `program_registrations`

#### [FR-022] 뉴스레터 구독 폼
- **우선순위:** P1
- **설명:** 이메일 리드 수집 폼
- **수락 기준:**
  - 필드: 이메일, 이름(선택)
  - React Hook Form + Zod 검증
  - Supabase `newsletter_subscribers` 테이블 저장
  - 중복 구독 방지 (UNIQUE 제약)
  - 제출 후 성공 메시지 + 확인 메일 발송 (선택)
  - 모든 위치에 동일한 폼 컴포넌트 사용 가능 (사이드바, 팝업, 풀 와이드)
- **관련 컴포넌트:** `NewsletterForm.tsx`
- **관련 DB:** `newsletter_subscribers`
- **관련 Edge Function:** `/functions/subscribe`

---

### 2.5 정적 페이지

#### [FR-023] 홈페이지
- **우선순위:** P0
- **설명:** 사이트 입구 페이지 (`/`)
- **수락 기준:**
  - 히어로 섹션: 브랜드 메시지 + 핵심 CTA (상담 예약)
  - 최신 블로그 포스트 캐러셀 (3~6개, ISR 1시간)
  - 센터 핵심 서비스 소개 (상담/교육/연구)
  - 교수진 하이라이트 (카드 3~4명)
  - 신뢰 요소: 자격증, 수료 현황, 클라이언트 후기, 보도자료
  - 하단 CTA 배너
  - 메타 데이터: Organization Schema, OpenGraph
- **관련 페이지:** `/`
- **관련 컴포넌트:** `HeroSection.tsx`, `LatestPosts.tsx`, `Services.tsx`, `TeamHighlight.tsx`, `TrustElements.tsx`

#### [FR-024] 센터 소개 페이지
- **우선순위:** P1
- **설명:** 연구소/센터 정보 페이지 (`/about`)
- **수락 기준:**
  - 비전, 미션, 핵심 가치
  - 상담 철학 및 접근법
  - 시설 사진 갤러리 (lightbox)
  - 오시는 길 (카카오맵/네이버맵 임베드)
  - 운영 시간 안내
  - LocalBusiness Schema
- **관련 페이지:** `/about`
- **관련 컴포넌트:** `Vision.tsx`, `Philosophy.tsx`, `Gallery.tsx`, `Map.tsx`

#### [FR-025] 교수진/상담사 소개
- **우선순위:** P1
- **설명:** 교수진 목록 페이지 (`/team`) 및 개별 프로필 (`/team/[slug]`)
- **수락 기준:**
  - 목록: 카드 그리드 레이아웃, 사진/이름/직책/전문 분야
  - 상세: 학력, 경력, 자격증, 전문 영역, 논문/저서
  - Person Schema (개별 프로필)
  - 포스트 작성자로 자동 연결 (authors 테이블)
- **관련 페이지:** `/team`, `/team/[slug]`
- **관련 DB:** `authors`
- **관련 컴포넌트:** `TeamCard.tsx`, `ProfileDetail.tsx`

#### [FR-026] 교육 프로그램 페이지
- **우선순위:** P1
- **설명:** 교육 프로그램 목록 및 상세 페이지
- **수락 기준:**
  - 목록: 프로그램 카드 (제목, 기간, 대상, 상태 표시)
  - 상세: 커리큘럼, 일정, 강사, 대상, 수강료, 신청 CTA
  - Course Schema, Event Schema
  - 수강 신청 폼 통합
- **관련 페이지:** `/programs`, `/programs/[slug]`
- **관련 컴포넌트:** `ProgramCard.tsx`, `ProgramDetail.tsx`, `ProgramForm.tsx`

---

### 2.6 콘텐츠 자동화 파이프라인

#### [FR-027] Claude Skills 블로그 생성 스킬
- **우선순위:** P0
- **설명:** SEO+AEO 최적화 블로그 글 자동 생성 스킬
- **수락 기준:**
  - 입력: 키워드, 카테고리, CTA 유형, 대상 오디언스
  - 출력:
    - **제목** (60자 이내, 핵심 키워드 포함)
    - **본문** (Markdown, AEO 구조 규칙 준수):
      - H2/H3 섹션당 200~350자 (섹션 독립성 보장)
      - 각 섹션 첫 1~2문장은 80~120자의 직접 답변 (AI 인용 블록)
      - 질문형 소제목 (사용자가 검색할 법한 질문)
      - 비교·수치형 주제는 Markdown 테이블 자동 삽입 (30~40% 콘텐츠에 테이블)
      - FAQ 섹션 필수 포함 (3~5개 질문, FAQPage Schema)
    - **summary** (3~5문장, 200~400자)
    - **keywords** (TEXT[] 배열, 3~7개 SEO 타겟 키워드)
    - **meta_title** (60자 이내)
    - **meta_description** (155자 이내)
    - **schema_markup** (Article, FAQPage Schema JSON-LD)
    - **references** (JSONB 배열, Tier별 아웃링크 포함)
      - Tier 1 (학술/의료): 대한심리학회, 한국상담심리학회, APA, PubMed, 국립정신건강센터
      - Tier 2 (정부/공공): 보건복지부, 정신건강복지센터, 자살예방상담전화, 정신건강위기상담전화
      - Tier 3 (업계/자격): 한국산업인력공단, 한국상담학회
      - 포스트당 최소 2~5개 아웃링크
      - 모든 링크에 `rel="noopener noreferrer"`, `target="_blank"` 적용
      - 광고성 링크: `rel="sponsored"`, UGC: `rel="ugc"`
    - **대표 이미지:**
      - 나노바나나2 API로 텍스트 없는 일러스트 생성
      - 스타일: 따뜻한 수채화/파스톀 톤, 미니멀, 텍스트 일절 없음
      - 파일명: `{slug}.webp`
      - Supabase Storage 업로드 후 `thumbnail_url` 자동 저장
  - 아웃링크 URL 유효성 검증 (HTTP 200 확인, 실패 시 대체 또는 제거)
  - Supabase `posts` 테이블에 draft 상태로 저장
  - 에러 처리: 실패 시 로깅 및 재시도 로직
- **스킬 이름:** `blog-content-generator`
- **트리거:** 수동 입력 또는 스케줄 기반
- **의존성:** 나노바나나2 API, Ahrefs/Semrush (아웃링크 추천), Supabase

#### [FR-028] 스케줄 발행 스킬
- **우선순위:** P1
- **설명:** 정기적으로 새 콘텐츠 생성 및 자동 발행
- **수락 기준:**
  - 일일/주간/월간 스케줄 설정 가능
  - 스케줄 실행 시 [FR-027] 블로그 생성 스킬 호출
  - 생성된 포스트를 자동으로 published 상태로 변경
  - Vercel ISR 트리거로 페이지 재생성
  - 발행 후 이메일 알림 (선택)
  - 초기 목표: 일 1~3편 자동 발행
- **스킬 이름:** `blog-auto-publisher`
- **트리거:** Cron 표현식 (예: `0 9 * * *` = 매일 9시)

#### [FR-029] 콘텐츠 최적화/리프레시 스킬
- **우선순위:** P2
- **설명:** 기존 콘텐츠의 SEO/AEO 성능 분석 및 개선
- **수락 기준:**
  - Search Console 데이터 기반 성능 분석 (클릭, 노출, CTR, 순위)
  - 개선 대상 콘텐츠 자동 식별 (CTR 낮음, 순위 하락 등)
  - 분기별 콘텐츠 리프레시 수행:
    - 통계/연구 데이터 업데이트
    - 최신 연구/가이드라인 반영
    - 깨진 아웃링크 교체
    - 섹션 구조 개선 (AEO 규칙)
    - FAQ 내용 보강
  - 수정 사항 적용 후 `updated_at` + 구조화 데이터 `dateModified` 자동 갱신
  - Vercel ISR 트리거
- **스킬 이름:** `content-optimizer`
- **트리거:** 분기별 스케줄 또는 수동 트리거

#### [FR-030] 아웃링크 검증 스킬
- **우선순위:** P2
- **설명:** 발행된 콘텐츠의 아웃링크 유효성 주기적 검증
- **수락 기준:**
  - 모든 published 포스트의 `references` 아웃링크 URL을 HTTP 요청으로 검증
  - 404 또는 다른 에러 감지 시 로깅
  - 깨진 링크를 대체 URL로 자동 교체하거나 삭제
  - 월 1회 전체 검증 스케줄 + 필요 시 수동 실행
  - 검증 결과 리포트 생성 (깨진 링크 목록)
- **스킬 이름:** `outlink-validator`
- **트리거:** 월 1회 또는 수동

#### [FR-031] 나노바나나2 이미지 생성 파이프라인
- **우선순위:** P0
- **설명:** 블로그 대표 이미지 자동 생성
- **수락 기준:**
  - [FR-027] 콘텐츠 생성 스킬에서 글 주제 → 시각적 소재 키워드 자동 추출
  - 나노바나나2(Google Gemini 3 Flash Image) API 호출
  - 프롬프트:
    ```
    [고정 스타일]
    "Minimal warm watercolor illustration, soft pastel tones with beige and muted green,
     no text, no letters, no words, clean composition, gentle and calming mood"

    + [스타일 레퍼런스 이미지 2~3장]
    + [주제별 소재 키워드]
    예: "a person breathing calmly in nature, soft light, serene atmosphere"
    ```
  - 생성 이미지: 1K 해상도, WebP 포맷
  - Supabase Storage 업로드: `blog-images/thumbnails/{slug}.webp`
  - DB `thumbnail_url` 자동 저장
  - 예상 비용: 1K 이미지당 $0.067 (Batch API 50% 할인 시), 500편 기준 $17~$34
- **API 사양:** Nano Banana 2 API (Google Gemini 기반)
- **비용 최적화:** Batch API 사용으로 50% 비용 절감

---

## 3. 비기능 요구사항 (Non-Functional Requirements)

### 3.1 성능 (Performance)

| 항목 | 목표 | 측정 방법 |
|------|------|----------|
| LCP | < 2.5s | Lighthouse, PageSpeed Insights |
| INP | < 200ms | Lighthouse, Core Web Vitals 대시보드 |
| CLS | < 0.1 | Lighthouse, Core Web Vitals 대시보드 |
| Lighthouse Performance | 90+ | Lighthouse |
| 초기 로딩 시간 | < 3초 (3G) | WebPageTest |
| 첫 상호작용까지의 시간 | < 100ms | Lab 측정 |

### 3.2 보안 (Security)

| 항목 | 요구사항 |
|------|---------|
| RLS (Row Level Security) | published 포스트는 공개 읽기, 쓰기/수정은 인증된 관리자만 가능 |
| 입력 검증 | 모든 폼 입력 서버 사이드 검증 (Zod) |
| XSS 방지 | 모든 사용자 입력 sanitize, Markdown 렌더링 시 DOMPurify |
| CSRF 보호 | Next.js Server Action 기본 CSRF 토큰 |
| HTTPS | 모든 통신 HTTPS 강제 (Vercel 기본) |
| API 인증 | 관리자 기능은 JWT/Session 기반 인증 |
| 데이터 암호화 | 민감 정보(이메일, 전화)는 저장 전 암호화 (선택) |
| 레이트 제한 | 폼 제출, API 엔드포인트 레이트 제한 |

### 3.3 접근성 (Accessibility)

| 항목 | 표준 |
|------|------|
| WCAG 준수 | WCAG 2.1 AA 최소 준수 |
| 스크린 리더 | 모든 이미지에 alt 텍스트, 시맨틱 HTML |
| 키보드 탐색 | Tab 키로 모든 대화형 요소 접근 가능 |
| 색상 대비 | 텍스트 대비 최소 4.5:1 (일반 텍스트) |
| 폼 라벨 | 모든 입력 필드에 label 태그 + `htmlFor` |
| 포커스 표시 | 명확한 포커스 outline |
| 언어 마크업 | `<html lang="ko">` |

### 3.4 확장성 (Scalability)

| 항목 | 요구사항 |
|------|---------|
| 콘텐츠 규모 | 500+ → 수천 편 콘텐츠 대응 가능 |
| ISR 빌드 시간 | 한 페이지당 < 5초 |
| 데이터베이스 인덱싱 | status, category, tags, keywords, 풀텍스트 검색 최적화 |
| CDN | Vercel Edge Network로 글로벌 응답 시간 최소화 |
| 동시 사용자 | 초기 1,000+ 동시 사용자 대응 (Supabase Pro 티어) |

### 3.5 SEO (Search Engine Optimization)

| 항목 | 목표 |
|------|------|
| Lighthouse SEO 점수 | 95+점 |
| 핵심 Web Vitals | Good 등급 (CLS, LCP, INP) |
| 모바일 친화성 | Mobile-friendly 검증 |
| 사이트 인덱싱 | 발행 콘텐츠 95% 이상 인덱싱 (6개월 내) |
| 메타 태그 완성도 | 100% 페이지 meta description, OG 태그 보유 |
| 구조화 데이터 | 검증 도구에서 에러 0 |
| 내부 링크 | 토픽 클러스터 구조로 자동 연결 |

---

## 4. 기술 아키텍처

### 4.1 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                       사용자 브라우저                         │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌────────────────┐  ┌─────────────┐
            │  Vercel Edge   │  │  Vercel CDN │
            │   (ISR, SSG)   │  │  (정적 자산) │
            └────────────────┘  └─────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
    ┌──────────┐          ┌──────────────┐
    │ Next.js  │          │  Supabase    │
    │ App      │◄────────►│  (DB, Auth,  │
    │ Router   │          │   Storage)   │
    └──────────┘          └──────────────┘
        │
        ├─────────┬─────────┬─────────┐
        ▼         ▼         ▼         ▼
    [SSG]    [ISR]    [API]    [Edge Fn]
    정적      블로그    폼      발행/알림
    페이지    업데이트  처리    자동화
        │
        └─────────────────────┐
                              ▼
                    ┌────────────────┐
                    │ Claude Skills  │
                    │ (자동화)       │
                    └────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌────────────────┐  ┌─────────────────┐
            │ Nano Banana 2  │  │ Ahrefs/Semrush  │
            │ (이미지 생성)  │  │ (키워드 검색)   │
            └────────────────┘  └─────────────────┘
```

### 4.2 데이터 흐름

```
[키워드 리서치]
    ↓
[Claude Skills: blog-content-generator]
    ├─ 콘텐츠 작성 (AEO 구조 적용)
    ├─ 아웃링크 매칭 (Tier별)
    ├─ 아웃링크 검증 (HTTP 200 확인)
    ├─ 메타데이터 생성 (title, description, keywords, schema)
    ├─ 나노바나나2로 이미지 생성 → Supabase Storage 업로드
    └─ Supabase posts 테이블에 draft 저장
    ↓
[선택사항: 사람 검수]
    ↓
[상태 변경: draft → published]
    ↓
[Vercel ISR 트리거]
    ├─ 블로그 상세 페이지 재생성 ([slug])
    ├─ 카테고리 페이지 재생성 ([category])
    ├─ 홈페이지 최신 포스트 재생성
    └─ 사이트맵 업데이트
    ↓
[Google Search Console 사이트맵 크롤링]
    ↓
[Google 인덱싱 (평균 24~48시간)]
```

---

## 5. 데이터베이스 스키마

### 5.1 전체 SQL 스키마

```sql
-- ============================================================
-- 1. 카테고리 (categories)
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                     -- 카테고리명
  slug TEXT UNIQUE NOT NULL,              -- URL 슬러그
  description TEXT,                       -- 카테고리 설명
  target_audience TEXT,                   -- 'client' | 'professional'
  default_cta_type TEXT,                  -- 'consultation' | 'education' | 'newsletter'
  seo_title TEXT,                         -- 카테고리 페이지 SEO 타이틀
  seo_description TEXT,                   -- 카테고리 페이지 SEO 디스크립션
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_target_audience ON categories(target_audience);

-- ============================================================
-- 2. 태그 (tags)
-- ============================================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- ============================================================
-- 3. 작성자/상담사 (authors)
-- ============================================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,                             -- 직책 (심리상담사, 교수 등)
  bio TEXT,                               -- 소개
  profile_image_url TEXT,
  credentials TEXT[],                     -- 자격증 목록
  specialties TEXT[],                     -- 전문 분야
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_authors_slug ON authors(slug);

-- ============================================================
-- 4. 블로그 게시글 (posts)
-- ============================================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                    -- 게시글 제목
  slug TEXT UNIQUE NOT NULL,              -- URL 슬러그
  excerpt TEXT,                           -- 발췌/요약 (메타 디스크립션 겸용)
  content TEXT NOT NULL,                  -- 본문 (Markdown)
  summary TEXT,                           -- 본문 요약 (3~5문장, 200~400자)
  keywords TEXT[] DEFAULT '{}',           -- 타겟 SEO 키워드 배열 (3~7개)
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  thumbnail_url TEXT,                     -- 대표 이미지 URL (Supabase Storage)
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft',            -- draft | published | archived
  meta_title TEXT,                        -- SEO 메타 타이틀 (60자 이내)
  meta_description TEXT,                  -- SEO 메타 디스크립션 (155자 이내)
  og_image_url TEXT,                      -- OG 이미지 URL (null이면 thumbnail_url 기반 자동 생성)
  schema_markup JSONB,                    -- 구조화 데이터 (Article, FAQPage Schema JSON-LD)
  references JSONB DEFAULT '[]'::jsonb,   -- 참고 자료 [{name, url, type(Tier1/2/3), description}]
  cta_type TEXT DEFAULT 'consultation',   -- 'consultation' | 'education' | 'newsletter'
  reading_time INTEGER,                   -- 읽기 시간 (분)
  view_count INTEGER DEFAULT 0,           -- 조회수
  is_featured BOOLEAN DEFAULT FALSE,      -- 인기글/추천글 여부
  published_at TIMESTAMPTZ,               -- 발행일
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_posts_category ON posts(category_id, published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured, published_at DESC) WHERE is_featured = TRUE;
CREATE INDEX idx_posts_keywords ON posts USING GIN(keywords);
CREATE INDEX idx_posts_fulltext ON posts USING GIN(
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, ''))
);

-- ============================================================
-- 5. 게시글-태그 관계 (post_tags)
-- ============================================================
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- ============================================================
-- 6. 상담 문의 (contact_inquiries)
-- ============================================================
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  counseling_type TEXT,                   -- 상담 유형 (개인, 부부, 아동 등)
  preferred_date TEXT,                    -- 희망 일시
  message TEXT,
  source_url TEXT,                        -- 유입 페이지 URL
  utm_source TEXT,                        -- UTM 파라미터
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  status TEXT DEFAULT 'new',              -- new | contacted | scheduled | completed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- ============================================================
-- 7. 교육 프로그램 신청 (program_registrations)
-- ============================================================
CREATE TABLE program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  affiliation TEXT,                       -- 소속
  message TEXT,
  status TEXT DEFAULT 'pending',          -- pending | confirmed | cancelled
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_program_registrations_email ON program_registrations(email);
CREATE INDEX idx_program_registrations_status ON program_registrations(status);

-- ============================================================
-- 8. 뉴스레터 구독자 (newsletter_subscribers)
-- ============================================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source_url TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);

-- ============================================================
-- RLS 정책
-- ============================================================

-- posts: published만 공개 읽기
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY posts_public_select ON posts FOR SELECT
  USING (status = 'published');
CREATE POLICY posts_admin_all ON posts FOR ALL
  USING (auth.role() = 'authenticated');

-- categories: 공개 읽기
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY categories_public_select ON categories FOR SELECT
  USING (true);

-- tags: 공개 읽기
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY tags_public_select ON tags FOR SELECT
  USING (true);

-- authors: 공개 읽기
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY authors_public_select ON authors FOR SELECT
  USING (true);

-- contact_inquiries: anon 쓰기, 인증된 읽기
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY contact_inquiries_anon_insert ON contact_inquiries FOR INSERT
  WITH CHECK (true);
CREATE POLICY contact_inquiries_admin_select ON contact_inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

-- program_registrations: anon 쓰기, 인증된 읽기
ALTER TABLE program_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY program_registrations_anon_insert ON program_registrations FOR INSERT
  WITH CHECK (true);
CREATE POLICY program_registrations_admin_select ON program_registrations FOR SELECT
  USING (auth.role() = 'authenticated');

-- newsletter_subscribers: anon 쓰기, 인증된 읽기
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY newsletter_subscribers_anon_insert ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);
CREATE POLICY newsletter_subscribers_admin_select ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 5.2 데이터 모델 다이어그램

```
┌──────────────────┐
│   categories     │
├──────────────────┤
│ id (PK)          │
│ name             │
│ slug (UNIQUE)    │
│ target_audience  │◄─────────┐
│ default_cta_type │          │
│ seo_title        │          │
│ seo_description  │          │
└──────────────────┘          │
        ▲                      │
        │ 1:N                  │
        │                      │
    ┌───┴──────────────────────┴──────────────────────┐
    │                                                  │
┌───┴──────────┐                              ┌───────┴──────┐
│    posts     │                              │    authors   │
├──────────────┤                              ├──────────────┤
│ id (PK)      │                              │ id (PK)      │
│ title        │                              │ name         │
│ slug(UNIQUE) │                              │ slug(UNIQUE) │
│ content      │                              │ title        │
│ summary      │                              │ bio          │
│ keywords[]   │                              │ credentials[]│
│ category_id──┼──────────────────┐           │ specialties[]│
│ author_id────┼────────────────┐  │           └──────────────┘
│ thumbnail_url│                │  │
│ og_image_url │                │  │
│ schema_markup│                │  │
│ references   │                │  │
│ cta_type     │                │  │
│ status       │                │  │
│ published_at │                │  │
│ updated_at   │                │  │
└──────────────┘                │  │
        │                       │  │
        │ N:M                   │  │
        │                       │  │
    ┌───┴────────┐              │  │
    │ post_tags  │              │  │
    ├────────────┤              │  │
    │ post_id    │◄─────────────┘  │
    │ tag_id     │                 │
    └────┬───────┘                 │
         │ N:M                     │
         │                         │
    ┌────┴────┐                    │
    │   tags   │                   │
    ├──────────┤                   │
    │ id (PK)  │                   │
    │ name     │                   │
    │ slug     │                   │
    └──────────┘                   │
                                   │
    ┌──────────────────────────────┘
    │
    │
┌───┴──────────────────────────┐
│   contact_inquiries          │
├──────────────────────────────┤
│ id (PK)                      │
│ name                         │
│ email                        │
│ phone                        │
│ counseling_type              │
│ preferred_date               │
│ message                      │
│ source_url                   │
│ utm_source/medium/campaign   │
│ status                       │
│ created_at                   │
└──────────────────────────────┘

┌──────────────────────────────┐
│  program_registrations       │
├──────────────────────────────┤
│ id (PK)                      │
│ program_name                 │
│ name                         │
│ email                        │
│ phone                        │
│ affiliation                  │
│ message                      │
│ status                       │
│ created_at                   │
└──────────────────────────────┘

┌──────────────────────────────┐
│ newsletter_subscribers       │
├──────────────────────────────┤
│ id (PK)                      │
│ email (UNIQUE)               │
│ name                         │
│ source_url                   │
│ subscribed_at                │
│ is_active                    │
│ unsubscribed_at              │
└──────────────────────────────┘
```

---

## 6. 스프린트 계획

### Sprint 1: 프로젝트 초기화 + 인프라 (1주)
**목표:** 개발 환경 구축 및 배포 파이프라인 완성

**태스크:**
- Next.js 15+ 프로젝트 생성 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui 설정
- Supabase 프로젝트 생성
- 전체 DB 스키마 마이그레이션 실행 (위 5.1 SQL)
- Vercel 배포 파이프라인 구축 (자동 배포)
- 환경 변수 설정 (.env.local)
- ESLint + Prettier 설정
- 기본 레이아웃: Header, Footer, Navigation, Breadcrumb
- 글로벌 스타일, 폰트(Pretendard), 디자인 토큰 설정
- README 작성

**완료 조건:**
- 로컬 개발 서버 정상 작동
- Vercel 배포 성공 (푸시 자동 배포)
- Supabase DB 마이그레이션 성공

---

### Sprint 2: 블로그 핵심 기능 (2주)
**목표:** 블로그 CRUD + 페이지 네비게이션 완성

**태스크:**
- Supabase 쿼리 유틸 작성 (lib/supabase/queries.ts)
  - getPosts, getPostBySlug, getPostsByCategory, getPostsByTag
  - getCategories, getTags, getRelatedPosts
- 블로그 목록 페이지 (/blog) [FR-001]
  - SSG 렌더링
  - 카테고리 필터링
  - 숫자 페이지네이션 (12개 항목/페이지)
  - 포스트 카드 컴포넌트
  - 사이드바 (인기 글, 카테고리, CTA)
- 블로그 상세 페이지 (/blog/[category]/[slug]) [FR-002]
  - ISR (1시간 재검증)
  - Markdown → HTML 렌더링
  - TOC 자동 생성
  - 요약 박스
  - 메타 정보 표시 (작성일, 카테고리, 태그, 읽기 시간)
  - 테이블 반응형 처리
  - 관련 포스트 추천
  - 참고 자료 렌더링
  - FAQ 섹션
- 카테고리별 목록 페이지 (/blog/[category]) [FR-003]
- 태그별 목록 페이지 (/blog/tag/[tag]) [FR-004]
- 블로그 내 검색 기능 [FR-006]
  - Supabase 풀텍스트 검색
  - 검색 결과 페이지

**완료 조건:**
- 블로그 페이지 모두 렌더링 성공
- ISR 동작 확인
- 검색 기능 정상 작동

---

### Sprint 3: 정적 페이지 개발 (1주)
**목표:** 홈페이지, 소개, 교수진, 프로그램 페이지 완성

**태스크:**
- 홈페이지 (/) [FR-023]
  - 히어로 섹션
  - 최신 포스트 캐러셀
  - 서비스 소개
  - 교수진 하이라이트
  - 신뢰 요소 섹션
- 센터 소개 (/about) [FR-024]
  - 비전/미션/철학
  - 시설 갤러리
  - 지도 임베드
- 교수진 목록/상세 (/team, /team/[slug]) [FR-025]
- 교육 프로그램 목록/상세 (/programs, /programs/[slug]) [FR-026]

**완료 조건:**
- 모든 정적 페이지 렌더링 성공
- 링크 네비게이션 정상

---

### Sprint 4: SEO + CTA + 폼 (1주)
**목표:** SEO 최적화, 전환 시스템, 데이터 수집 완성

**태스크:**
- 구조화 데이터 구현 [FR-008]
  - Article, FAQPage, BreadcrumbList, Organization, Person, Course
  - SchemaMarkup 컴포넌트
- 동적 사이트맵 생성 [FR-009]
- robots.txt 생성 [FR-010]
- 메타 태그 자동 생성 [FR-007]
  - metadata.ts 유틸
  - 페이지별 title, description, OG 태그
- OG 이미지 자동 생성 [FR-011]
  - opengraph-image.tsx 구현
  - thumbnail_url 기반 합성
- CTA 시스템 [FR-013~FR-018]
  - InlineCTA, BottomCTA, SidebarCTA, FloatingCTA, NewsletterPopup
  - 카테고리별 CTA 분기 로직
- 폼 구현 [FR-020~FR-022]
  - ContactForm, ProgramForm, NewsletterForm
  - React Hook Form + Zod 검증
  - Server Action으로 Supabase 저장
  - 이메일 알림 (선택)
- UTM 파라미터 추적 [FR-019]

**완료 조건:**
- Lighthouse SEO 점수 95+
- 폼 제출 성공 + DB 저장 확인
- OG 이미지 생성 확인

---

### Sprint 5: 성능 최적화 + QA (1주)
**목표:** Core Web Vitals 달성, 크로스 브라우저 테스트

**태스크:**
- Core Web Vitals 최적화 [FR-012]
  - Next.js Image Optimization
  - 폰트 로딩 최적화
  - 코드 스플리팅
  - ISR revalidation 조정
- Lighthouse 점수 검증
- 크로스 브라우저 테스트 (Chrome, Safari, Firefox, Edge)
- 모바일 반응형 테스트
- 접근성 검사 (WCAG 2.1 AA)
- 블로그 검색 기능 최적화

**완료 조건:**
- Lighthouse: Performance 90+, SEO 95+, Accessibility 90+
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- 모바일 렌더링 완벽

---

### Sprint 6: 콘텐츠 자동화 + 런칭 (2주)
**목표:** Claude Skills 구축, 초기 콘텐츠 대량 생성, 프로덕션 배포

**태스크:**
- Claude Skills 블로그 생성 스킬 개발 [FR-027]
  - 키워드 입력 → SEO+AEO 최적화 글 생성
  - 아웃링크 자동 매칭 + 검증
  - 메타데이터 생성
  - 나노바나나2 이미지 생성
  - Supabase 저장
- 스케줄 발행 스킬 개발 [FR-028]
  - 정기 콘텐츠 생성 및 자동 발행
- 나노바나나2 이미지 생성 파이프라인 [FR-031]
  - Nano Banana 2 API 연동
  - Supabase Storage 업로드
- 초기 콘텐츠 대량 생성
  - 목표: 500편 이상
  - 키워드 클러스터별 생성
  - 각 콘텐츠 검증 (아웃링크, 메타데이터, 이미지)
- Supabase Edge Functions 배포
  - /functions/publish-post (ISR 트리거)
  - /functions/submit-inquiry (문의 알림)
  - /functions/subscribe (구독 처리)
- Google Search Console 등록 + 사이트맵 제출
- 네이버 서치어드바이저 등록
- 프로덕션 배포 + 모니터링 설정
- 분석 대시보드 구축 (GA4, Vercel Analytics)

**완료 조건:**
- 500편 이상 콘텐츠 발행
- Search Console 사이트맵 인덱싱 확인
- Google 크롤링 통계 확인
- 프로덕션 안정성 검증 (48시간 모니터링)

---

## 7. 위험 요소 및 의존성

### 7.1 주요 위험 요소

| 위험 | 영향도 | 대응 방안 |
|------|--------|----------|
| **나노바나나2 API 안정성** | 높음 | Batch API 사용, 폴백 이미지 준비, 오류 로깅 |
| **대규모 ISR 빌드 시간** | 중간 | Incremental generation, 페이지 우선순위 설정, 빌드 최적화 |
| **Supabase 무료 티어 한도** | 높음 | Pro 티어로 업그레이드 검토, 데이터베이스 정크 정리 |
| **AI 생성 콘텐츠 품질** | 높음 | 프롬프트 지속적 개선, 샘플 검증, 인간 검수 프로세스 |
| **Google 인덱싱 지연** | 중간 | Search Console 사이트맵 재제출, 저품질 콘텐츠 정리 |
| **AEO 알고리즘 변동** | 중간 | 정기적 콘텐츠 리프레시, 구조 검증 도구 모니터링 |

### 7.2 주요 의존성

| 의존성 | 담당 | 영향 |
|--------|------|------|
| Supabase API 서비스 | Supabase | DB 가용성, 데이터 무결성 |
| Vercel Edge Network | Vercel | 배포, ISR, CDN 성능 |
| Nano Banana 2 API | Google | 이미지 생성 품질, 비용 |
| Claude API (Skills) | Anthropic | 콘텐츠 생성 품질, 비용 |
| Google Search 알고리즘 | Google | SEO 순위, 트래픽 |

---

## 8. 런칭 후 운영 계획

### 8.1 정기 콘텐츠 발행
- **일일 자동 발행:** Claude Skills 스케줄 기반 1~3편 자동 생성 + 발행
- **수동 특집 글:** 월 2~4편 전문가 필진 기고 (editors draft)
- **스케줄 관리:** Supabase `published_at` 기반 예약 발행

### 8.2 분기별 콘텐츠 리프레시 [FR-029]
- 기존 콘텐츠의 SEO/AEO 성능 분석
- 통계/연구 데이터 업데이트
- 깨진 아웃링크 교체
- 구조화 데이터 개선
- `updated_at` + `dateModified` 갱신

### 8.3 주간 아웃링크 검증 [FR-030]
- 모든 포스트의 아웃링크 URL 유효성 확인
- 깨진 링크(404) 자동 감지 + 교체 또는 삭제
- 검증 리포트 생성

### 8.4 월간 SEO 성과 리포트
- Google Search Console 데이터 수집
  - 클릭, 노출, CTR, 평균 순위
  - 인덱싱 상태
- GA4 분석
  - 유입 키워드, 세션, 전환
  - 사용자 행동 흐름
- 순위 추적 (Ahrefs/Semrush)
  - 주요 키워드 순위 변동
  - 경쟁사 비교
- 개선 사항 식별 및 다음 월 작업 계획 수립

### 8.5 트래픽 및 전환 모니터링
- **오가닉 트래픽:** 월 10,000+ 세션 달성 추적
- **전환율:** 블로그 → 상담 문의(1%), 교육 신청(0.5%), 뉴스레터(2%)
- **병목 지점:** CTR 낮은 페이지, 이탈율 높은 페이지 식별
- **개선 우선순위:** 높은 노출 + 낮은 CTR 페이지부터 리라이트

---

## 9. 기술 스택 요약

| 계층 | 기술 | 버전 |
|------|------|------|
| **프론트엔드** | Next.js | 15+ (App Router) |
| | TypeScript | 5.3+ |
| | Tailwind CSS | v4 |
| | shadcn/ui | 최신 |
| | React Hook Form | 7+ |
| | Zod | 3+ |
| | Framer Motion | 10+ |
| | Lucide React | 최신 |
| **백엔드** | Supabase | 클라우드 |
| | PostgreSQL | 15+ |
| | Edge Functions | Deno |
| **배포** | Vercel | 프로덕션 |
| **자동화** | Claude Skills | v1+ |
| | Claude API | (최신 모델) |
| **이미지 생성** | Nano Banana 2 | (Gemini API) |
| **SEO 도구** | Ahrefs/Semrush | (연동) |
| **분석** | Google Analytics 4 | 최신 |
| | Vercel Analytics | 내장 |

---

## 10. 체크리스트 및 성공 기준

### 런칭 전 필수 체크리스트

- [ ] 모든 페이지 렌더링 성공
- [ ] Lighthouse 점수 달성 (SEO 95+, Performance 90+)
- [ ] Core Web Vitals Good 등급 달성
- [ ] 구조화 데이터 검증 도구에서 에러 0
- [ ] 사이트맵 제출 (Google Search Console, 네이버)
- [ ] 모든 폼 제출 기능 테스트
- [ ] 크로스 브라우저 테스트 완료
- [ ] 모바일 반응형 테스트 완료
- [ ] 접근성 검사 (WCAG 2.1 AA) 통과
- [ ] 초기 콘텐츠 500편 이상 발행
- [ ] Claude Skills 콘텐츠 생성 테스트 완료
- [ ] 나노바나나2 이미지 생성 파이프라인 확인
- [ ] Edge Functions 배포 및 테스트
- [ ] 모니터링 대시보드 설정 (GA4, Vercel, Supabase)
- [ ] 프로덕션 보안 검토 (HTTPS, RLS, 입력 검증)

### 런칭 후 4주 성공 기준

- [ ] 월간 2,000+ 오가닉 세션 달성
- [ ] Google 인덱싱 콘텐츠 400편 이상
- [ ] 상담 문의 10건 이상
- [ ] 뉴스레터 구독 50명 이상
- [ ] 사용자 이탈률 < 70%
- [ ] 평균 참여 시간 > 2분

### 런칭 후 6개월 성공 기준

- [ ] 월간 10,000+ 오가닉 세션 달성
- [ ] 주요 키워드 TOP 10 순위 달성
- [ ] 상담 문의 월 200건 이상
- [ ] 뉴스레터 구독 1,000명 이상
- [ ] 전환율: 상담(1%), 교육(0.5%), 뉴스레터(2%)

---

*본 PRD는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
