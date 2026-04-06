# 앤아더라이프 심리상담연구소 — IA (Information Architecture)

## 1. 사이트맵 (Site Map)

### 1.1 전체 페이지 트리

```
/ (홈)                              [SSG, revalidate: 3600] [코드]
├── /blog                           [SSG, revalidate: 3600] [DB: posts]
│   ├── /blog/[category]            [SSG, revalidate: 3600] [DB: categories + posts]
│   │   └── /blog/[category]/[slug] [ISR, revalidate: 3600] [DB: posts]
│   └── /blog/tag/[tag]             [SSG, revalidate: 3600] [DB: tags + posts]
├── /about                          [SSG] [코드]
│   ├── /about/philosophy           [SSG] [코드]
│   └── /about/facility             [SSG] [코드]
├── /team                           [SSG] [코드]
│   └── /team/[slug]                [SSG] [코드]
├── /programs                       [SSG] [코드]
│   └── /programs/[slug]            [SSG] [코드]
├── /contact                        [SSG] [코드]
├── /sitemap.xml                    [동적 생성] [DB: posts, categories, tags]
└── /robots.txt                     [정적]
```

**렌더링 방식 설명:**
- **SSG (Static Site Generation):** 빌드 타임에 정적 HTML 생성, Vercel CDN에 캐시됨
- **ISR (Incremental Static Regeneration):** 빌드 후 백그라운드에서 자동 갱신, revalidate 시간 이후 재생성
- **동적 생성:** 요청 타임에 생성, 매 방문 시 DB 조회 후 응답 생성

### 1.2 네비게이션 구조

#### 글로벌 네비게이션 (Header)
```
홈 | 블로그 | 센터소개 | 교수진 | 교육프로그램 | 상담예약
```

#### 블로그 서브 네비게이션 (Blog 섹션)
```
전체 | 마음건강 | 심리상담 이야기 | 관계/소통 | 아동·청소년 | 자기성장 | 전문가 칼럼 | 교육·자격 정보
```

#### 모바일 네비게이션 (Mobile)
```
☰ 햄버거 메뉴 → 풀스크린 드로어 네비게이션 (슬라이드 인/아웃)
```

#### Footer 네비게이션 (4칼럼 구조)
```
┌─────────────────────────────────────────────┐
│ 블로그 카테고리  │ 센터 정보    │ 교육 프로그램 │ 고객 지원  │
│ ├ 마음건강      │ ├ 소개      │ ├ 프로그램 목록│ ├ 문의하기 │
│ ├ 심리상담이야기│ ├ 철학      │ ├ 신청 방법   │ ├ 예약 현황│
│ ├ 관계/소통    │ ├ 시설 안내  │ └ 수강료      │ ├ FAQ    │
│ ├ 아동·청소년  │ └ 오시는길  │              │ ├ 이용약관│
│ ├ 자기성장      │              │              │ └ 개인정보│
│ ├ 전문가칼럼   │              │              │            │
│ └ 교육·자격정보│              │              │            │
└─────────────────────────────────────────────┘
```

---

## 2. URL 설계

### 2.1 URL 규칙

- **문자 규칙:** 모든 URL은 소문자, 영문, 하이픈(`-`)으로 구성 (한글 슬러그 사용 안 함)
- **계층 구조:** 의미 있는 계층 구조 유지 → SEO 크롤링 최적화
  - 예: `/blog/{category-slug}/{post-slug}`
  - 각 레벨이 의미 있는 분류 계층을 나타냄
- **Trailing slash:** 없음 (예: `/blog/mental-health/` ✗ → `/blog/mental-health` ✓)
- **도메인 정규화:** www → non-www 리다이렉트 (또는 반대, 도메인 설정에 따라 일관되게 적용)
  - 301 리다이렉트로 canonical 통일

### 2.2 전체 URL 패턴

| 페이지 | URL 패턴 | 예시 | 동적 여부 | 데이터 소스 |
|--------|----------|------|-----------|-----------|
| 홈 | `/` | `/` | 정적 | 코드 |
| 블로그 목록 | `/blog` | `/blog` | 정적+ISR | DB: posts |
| 카테고리 목록 | `/blog/{category}` | `/blog/mental-health` | 동적 | DB: categories + posts |
| 블로그 포스트 | `/blog/{category}/{slug}` | `/blog/mental-health/panic-disorder-coping` | 동적 | DB: posts |
| 태그 목록 | `/blog/tag/{tag}` | `/blog/tag/anxiety` | 동적 | DB: tags + posts |
| 센터 소개 | `/about` | `/about` | 정적 | 코드 |
| 상담 철학 | `/about/philosophy` | `/about/philosophy` | 정적 | 코드 |
| 시설 안내 | `/about/facility` | `/about/facility` | 정적 | 코드 |
| 교수진 목록 | `/team` | `/team` | 정적 | 코드 |
| 교수진 상세 | `/team/{slug}` | `/team/dr-kim` | 정적 | 코드 |
| 프로그램 목록 | `/programs` | `/programs` | 정적 | 코드 |
| 프로그램 상세 | `/programs/{slug}` | `/programs/cbt-certificate` | 정적 | 코드 |
| 상담 예약 | `/contact` | `/contact` | 정적 | 코드 |
| 사이트맵 | `/sitemap.xml` | `/sitemap.xml` | 동적 | DB: posts, categories, tags |
| 로봇 | `/robots.txt` | `/robots.txt` | 정적 | 코드 |

---

## 3. 콘텐츠 모델

### 3.1 블로그 포스트 콘텐츠 모델

#### 데이터 필드 상세

| 필드명 | 타입 | 설명 | 용도 |
|--------|------|------|------|
| **id** | UUID | 고유 식별자 | 데이터베이스 PK |
| **slug** | TEXT (UNIQUE) | URL 슬러그 | `/blog/{category}/{slug}` |
| **title** | TEXT | 포스트 제목 | 페이지 제목, SEO 타이틀 기반 |
| **content** | TEXT | 본문 (Markdown) | HTML 렌더링, 테이블 포함 가능 |
| **excerpt** | TEXT | 발췌/요약 (155자) | 메타 디스크립션, 검색 결과 스니펫 |
| **summary** | TEXT | 본문 요약 (200~400자) | 블로그 목록 카드 미리보기, 구조화 데이터 description |
| **keywords** | TEXT[] | SEO 타겟 키워드 배열 | 풀텍스트 검색 인덱싱, 카니발리제이션 방지, SEO 성과 추적 |
| **category_id** | UUID FK | 카테고리 참조 | 계층 구조, 관련 포스트 추천 |
| **thumbnail_url** | TEXT | 대표 이미지 URL | 블로그 카드, 본문 상단, OG 이미지 배경 |
| **author_id** | UUID FK | 작성자 참조 | 작성자 정보 표시, 작성자별 포스트 필터링 |
| **status** | TEXT | 상태 (draft/published/archived) | 게시 여부 제어 |
| **meta_title** | TEXT | SEO 메타 타이틀 | `<title>` 태그 (60자 이내) |
| **meta_description** | TEXT | SEO 메타 디스크립션 | `<meta name="description">` (155자 이내) |
| **og_image_url** | TEXT | OG 커스텀 이미지 | 소셜 공유 시 표시 이미지 (null이면 thumbnail 기반 자동 생성) |
| **schema_markup** | JSONB | 구조화 데이터 | Article Schema, FAQPage Schema, BreadcrumbList Schema |
| **references** | JSONB | 아웃링크 참고 자료 | [{name, url, type, description}] 구조, 본문에서 자동 렌더링 |
| **cta_type** | TEXT | CTA 유형 | consultation(상담) / education(교육) / newsletter(뉴스레터), 카테고리에서 상속 |
| **reading_time** | INTEGER | 읽기 시간 (분) | 포스트 상단 메타 정보 표시 |
| **view_count** | INTEGER | 조회수 | 인기글 순위 정렬 (선택사항) |
| **is_featured** | BOOLEAN | 인기글/추천글 여부 | 홈페이지 캐러셀, 블로그 목록 상단 고정 |
| **published_at** | TIMESTAMPTZ | 발행일 | 포스트 순서 정렬, 구조화 데이터 datePublished |
| **created_at** | TIMESTAMPTZ | 생성일 | 기록용 |
| **updated_at** | TIMESTAMPTZ | 마지막 수정일 | 구조화 데이터 dateModified, 콘텐츠 신선도 신호 |

#### 스키마 정의

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  summary TEXT,
  keywords TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES categories(id),
  thumbnail_url TEXT,
  author_id UUID REFERENCES authors(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
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
```

### 3.2 카테고리 모델

| 필드명 | 타입 | 설명 |
|--------|------|------|
| **id** | UUID | 고유 식별자 |
| **name** | TEXT | 카테고리명 (예: "마음건강") |
| **slug** | TEXT (UNIQUE) | URL 슬러그 (예: "mental-health") |
| **description** | TEXT | 카테고리 설명 |
| **target_audience** | TEXT | 타겟 ('client' / 'professional') |
| **default_cta_type** | TEXT | 기본 CTA 유형 (consultation / education / newsletter) |
| **seo_title** | TEXT | 카테고리 페이지 SEO 타이틀 |
| **seo_description** | TEXT | 카테고리 페이지 SEO 디스크립션 |
| **sort_order** | INTEGER | 정렬 순서 (네비게이션 표시 순서 제어) |
| **created_at** | TIMESTAMPTZ | 생성일 |

**스키마:**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  target_audience TEXT,
  default_cta_type TEXT,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**카테고리 목록:**

| 이름 | slug | target_audience | default_cta_type | 예시 콘텐츠 |
|------|------|-----------------|-----------------|-----------|
| 마음건강 | mental-health | client | consultation | "불안할 때 시도할 수 있는 5가지 방법" |
| 심리상담 이야기 | counseling-stories | client | consultation | "상담은 어떤 과정으로 진행되나요?" |
| 관계/소통 | relationships-communication | client | consultation | "부부갈등 해결을 위한 소통법" |
| 아동·청소년 | children-youth | client | consultation | "아이의 분리불안, 언제 전문가를 찾아야 할까" |
| 자기성장 | self-growth | client | newsletter | "자존감을 높이는 일상 습관" |
| 전문가 칼럼 | expert-column | professional | education | "상담 기법 심층 분석" |
| 교육·자격 정보 | education-certification | professional | education | "심리상담사 자격증 종류와 취득 과정" |

### 3.3 태그 모델

| 필드명 | 타입 | 설명 |
|--------|------|------|
| **id** | UUID | 고유 식별자 |
| **name** | TEXT | 태그명 (예: "anxiety", "depression") |
| **slug** | TEXT (UNIQUE) | URL 슬러그 |
| **created_at** | TIMESTAMPTZ | 생성일 |

**역할:**
- N:N 관계 (post_tags 조인 테이블로 연결)
- 사용자 탐색 네비게이션: `/blog/tag/{tag-slug}`
- 관련 포스트 추천 알고리즘의 보조 시그널 (카테고리 + 태그 교차 매칭)
- 사용자 경험: 문제별·감정별 필터링 (예: "불안", "우울증", "관계" 등)

**스키마:**
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
```

### 3.4 작성자(상담사) 모델

| 필드명 | 타입 | 설명 |
|--------|------|------|
| **id** | UUID | 고유 식별자 |
| **name** | TEXT | 상담사명 |
| **slug** | TEXT (UNIQUE) | URL 슬러그 (예: "dr-kim") |
| **title** | TEXT | 직책 (예: "수석 상담사", "센터장") |
| **bio** | TEXT | 소개 텍스트 |
| **profile_image_url** | TEXT | 프로필 사진 |
| **credentials** | TEXT[] | 자격증 배열 |
| **specialties** | TEXT[] | 전문 분야 배열 |
| **created_at** | TIMESTAMPTZ | 생성일 |

**스키마:**
```sql
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
```

---

## 4. 사용자 흐름 (User Flow)

### 4.1 내담자(Primary 타겟) 유입 → 전환 흐름

```
Google 검색 결과
("우울증 증상", "불안장애 대처법" 등)
    ↓
/blog/mental-health/depression-symptoms
(블로그 포스트 랜딩)
    ↓
[읽기 경험]
├─ 제목 + 메타 정보 (작성일, 카테고리, 태그, 읽기시간)
├─ 대표 이미지 (나노바나나2 생성 일러스트)
├─ 요약 박스 (summary 필드 기반 핵심 내용 미리보기)
├─ TOC (목차) 자동 생성
├─ 본문 (AEO 최적화 구조)
│  ├─ H2/H3 섹션 (질문형 소제목)
│  ├─ 섹션당 200~350자 (AI 인용률 최적화)
│  ├─ Markdown 테이블 (비교/수치 정보)
│  ├─ 본문 중간 InlineCTA 배너
│  │   └─ "전문 상담이 필요하신가요? 상담 예약하기"
│  └─ 본문 마지막 FAQ (3~5개 질문)
├─ 참고 자료 섹션 (references JSONB → 아웃링크 자동 렌더링)
├─ 소셜 공유 버튼
├─ 관련 포스트 추천 (같은 카테고리/태그)
└─ 하단 BottomCTA 섹션 (카테고리 default_cta_type 기반)
    └─ "지금 상담 예약하기" (주요 CTA)
        ↓
    /contact (상담 예약 폼)
        ↓
    폼 제출 (name, phone, email, counseling_type, preferred_date, message)
        ↓
    Supabase contact_inquiries 테이블 저장
        ↓
    감사 메시지 표시 + 이메일 알림 발송
```

### 4.2 전문가(Secondary 타겟) 유입 → 전환 흐름

```
Google 검색 결과
("심리상담사 자격증 종류", "보수교육 일정" 등)
    ↓
/blog/education-certification/counselor-certification-types
(교육·자격 카테고리 포스트)
    ↓
[읽기 경험]
└─ 본문 중간 InlineCTA: "교육 과정이 궁금하신가요?"
└─ 하단 BottomCTA: "교육 과정 살펴보기"
    ↓
/programs (프로그램 목록)
    ↓
프로그램 카드 탐색 (진행 중/예정/종료 상태 표시)
    ↓
/programs/cbt-certificate (프로그램 상세)
    ↓
[프로그램 상세 정보]
├─ 커리큘럼 소개
├─ 강사 정보
├─ 일정 및 수강료
└─ 수강 신청 CTA
    ↓
수강 신청 폼
    ↓
Supabase program_registrations 테이블 저장
    ↓
감사 메시지 + 확인 이메일
```

### 4.3 직접 유입 → 탐색 흐름

```
도메인 직접 방문 (/)
(즐겨찾기, 추천 등)
    ↓
홈페이지 (/)
├─ 히어로 섹션 ("우리는 심리상담의 새로운 경험을 제공합니다")
├─ 서비스 소개 섹션 (상담/교육/연구)
├─ 최신 블로그 포스트 캐러셀 (3~6개)
├─ 교수진 하이라이트
├─ 신뢰 요소 (자격증, 수료 현황, 후기)
└─ 하단 CTA 배너 ("상담 문의 유도")
    ↓
    [사용자 자발적 탐색]
    ├─ /about → 센터 철학 + 시설 소개 → /contact
    ├─ /team → 교수진 프로필 확인 → 개별 /team/{slug}
    ├─ /blog → 블로그 탐색 → 포스트 상세 → CTA
    └─ /programs → 교육 프로그램 탐색 → 수강 신청
```

### 4.4 뉴스레터 구독 흐름

```
블로그 포스트 열람
    ↓
[구독 유도 포인트]
├─ 사이드바 뉴스레터 CTA 위젯
├─ 본문 중간 "최신 심리 건강 정보 받기" 인라인 배너
├─ 페이지 이탈 방지 팝업 (Exit Intent)
└─ Footer 뉴스레터 폼
    ↓
이메일 입력 + "구독" 클릭
    ↓
Supabase newsletter_subscribers 테이블 저장
    ↓
구독 확인 이메일 발송
    ↓
정기 뉴스레터 자동 발송 (주간/월간)
    ↓
구독 해제 링크 포함 (CAN-SPAM 준수)
```

---

## 5. SEO 구조

### 5.1 내부 링크 전략 (토픽 클러스터 모델)

토픽 클러스터 모델은 SEO 성능을 극대화하기 위해 필러 콘텐츠(Pillar Content)와 클러스터 콘텐츠(Cluster Content)를 계층적으로 연결하는 전략입니다.

#### 예시: 우울증 토픽 클러스터

```
[필러 콘텐츠]
/blog/mental-health/depression-complete-guide
("우울증: 완전 가이드" — 포괄적 관리 페이지)

    ↑ ↓ (양방향 내부 링크)

[클러스터 콘텐츠]
├─ /blog/mental-health/depression-symptoms
│  ("우울증의 주요 증상 10가지")
├─ /blog/mental-health/depression-self-diagnosis
│  ("우울증 자가진단 체크리스트")
├─ /blog/mental-health/depression-counseling-process
│  ("우울증 상담은 어떻게 진행되나요?")
├─ /blog/mental-health/depression-treatment-methods
│  ("우울증 치료 방법: 약물 vs 심리상담")
└─ /blog/mental-health/depression-and-insomnia
   ("우울증과 불면증의 악순환 끊기")

[필터 콘텐츠]
필러 콘텐츠는 모든 클러스터 콘텐츠로 링크하고,
각 클러스터는 다시 필러로 링크하여 네트워크 형성
```

**구현 방식:**
- 필러 콘텐츠 본문에 클러스터로의 내부 링크 자동 삽입
- 각 클러스터 포스트 하단에 "관련된 [주제] 글 더 보기" 섹션 추가
- `post_tags` + `keywords` 교차 매칭으로 자동 관련 포스트 추천

### 5.2 Breadcrumb 구조

모든 페이지에 Breadcrumb 네비게이션 구현 (UX + SEO 최적화)

#### 페이지별 Breadcrumb 경로

| 페이지 | Breadcrumb 경로 |
|--------|-----------------|
| 홈 | (없음) |
| /blog | Home > Blog |
| /blog/mental-health | Home > Blog > 마음건강 |
| /blog/mental-health/depression-symptoms | Home > Blog > 마음건강 > 우울증의 주요 증상 10가지 |
| /team | Home > 교수진 |
| /team/dr-kim | Home > 교수진 > 김○○ 상담사 |
| /programs | Home > 교육 프로그램 |
| /programs/cbt-certificate | Home > 교육 프로그램 > CBT 전문가 과정 |

#### BreadcrumbList Schema 마크업

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.example.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "마음건강",
      "item": "https://www.example.com/blog/mental-health"
    }
  ]
}
```

### 5.3 Canonical URL 규칙

중복 콘텐츠 방지를 위한 canonical 태그 설정 규칙

**규칙:**
- 모든 페이지의 `<head>`에 self-referencing canonical URL 명시
- URL 파라미터(페이지네이션 등)가 있을 경우 base URL을 canonical로 지정

**구현 예시:**

```
페이지: /blog/[category]/[slug]
Canonical: <link rel="canonical" href="https://www.example.com/blog/{category}/{slug}" />

페이지: /blog?page=2&category=mental-health
Canonical: <link rel="canonical" href="https://www.example.com/blog" />
```

**특수 케이스:**

| 상황 | Canonical 지정 |
|------|-----------------|
| 카테고리 페이지네이션 | 첫 페이지 URL (파라미터 제거) |
| 태그 페이지네이션 | 첫 페이지 URL (파라미터 제거) |
| 동적 OG 이미지 생성 페이지 | 실제 블로그 포스트 URL |
| 모바일 vs 데스크탑 | 통일된 URL (반응형 설계로 별도 URL 불필요) |

### 5.4 사이트맵 전략

대규모 콘텐츠(500+편) 대응을 위한 사이트맵 분할 및 자동 생성 전략

#### 사이트맵 인덱스 구조

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.example.com/sitemap-pages.xml</loc>
    <lastmod>2026-04-06T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-posts-1.xml</loc>
    <lastmod>2026-04-06T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-posts-2.xml</loc>
    <lastmod>2026-04-06T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-categories.xml</loc>
    <lastmod>2026-04-06T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemap-tags.xml</loc>
    <lastmod>2026-04-06T00:00:00Z</lastmod>
  </sitemap>
</sitemapindex>
```

#### 사이트맵 분할 규칙

- **sitemap-pages.xml:** 홈, 어바웃, 팀, 프로그램, 컨택트 등 정적 페이지 (~ 50개)
- **sitemap-posts-1.xml, -2.xml, ...:** 블로그 포스트 분할 (파일당 최대 50,000개 URL, 권장 20,000개 이하)
  - 500편 기준: 2개 파일로 분할 (`-1.xml`: 1~250편, `-2.xml`: 251~500편)
- **sitemap-categories.xml:** 모든 카테고리 페이지
- **sitemap-tags.xml:** 모든 태그 페이지

#### 자동 생성 로직 (Next.js)

```typescript
// app/sitemap.ts
export default async function sitemap() {
  // Supabase에서 게시글, 카테고리, 태그 조회
  // 사이트맵 인덱스 + 하위 사이트맵 동적 생성
  // 각 항목에 lastmod (updated_at), changefreq, priority 포함

  return {
    // 동적 사이트맵 URL 배열
  };
}
```

#### robots.txt에서 사이트맵 선언

```
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

---

## 6. 데이터 흐름

### 6.1 블로그 콘텐츠 데이터 흐름

```
Claude Skills
(블로그 콘텐츠 생성 스킬)
    ↓
[입력]
├─ 타겟 키워드
├─ 카테고리
├─ 타겟 오디언스
└─ CTA 유형

    ↓
[콘텐츠 생성]
├─ SEO 최적화 제목/본문 생성
├─ AEO 구조 적용 (두괄식, 질문형 소제목, 섹션당 200~350자, FAQ)
├─ Markdown 테이블 자동 삽입 (비교/수치형 주제)
├─ 신뢰도 높은 아웃링크 매칭 + 본문 삽입 + URL 유효성 검증
├─ summary(200~400자) + keywords(배열) 자동 추출
├─ meta_title, meta_description, schema_markup(Article + FAQPage) 생성
├─ 시각적 소재 키워드 추출 + 나노바나나2 API로 대표 이미지 생성
└─ Supabase Storage에 {slug}.webp로 업로드

    ↓
Supabase DB (posts 테이블)
├─ status: 'draft' (검수 후 'published'로 변경)
├─ 모든 메타데이터 저장 (thumbnail_url 포함)
└─ Markdown content 저장

    ↓
Next.js ISR (Incremental Static Regeneration)
├─ Supabase에서 published 포스트 조회
├─ 개별 블로그 포스트 페이지 정적 생성 (build time)
├─ revalidate: 3600 (1시간 마다 백그라운드 갱신)
└─ 메타데이터/OG 이미지 자동 생성

    ↓
Vercel CDN
├─ 정적 HTML 파일 캐싱
├─ Edge Network 배포
└─ 빠른 응답 (< 100ms)

    ↓
사용자 브라우저
├─ 페이지 렌더링
├─ 구조화 데이터 파싱 (Search Engine Bot)
└─ OG 이미지 표시 (소셜 공유)
```

### 6.2 폼 데이터 흐름

#### 상담 문의 폼

```
/contact (상담 예약 폼)
    ↓
[사용자 입력]
├─ name: 이름
├─ phone: 연락처
├─ email: 이메일
├─ counseling_type: 상담 유형
├─ preferred_date: 희망 일시
├─ message: 추가 메시지
└─ source_url: 유입 페이지 (자동 캡처)
     utm_source, utm_medium, utm_campaign (자동 캡처)

    ↓
[클라이언트 검증] (React Hook Form + Zod)
├─ email 형식 검증
├─ phone 길이/형식 검증
├─ message 글자 수 검증
└─ 필수 필드 확인

    ↓
Supabase Edge Function (/functions/submit-inquiry)
    ↓
[서버 검증]
├─ 데이터 검증 (재검증)
├─ Rate limiting (스팸 방지)
└─ CSRF 토큰 검증 (Next.js 내장)

    ↓
Supabase DB (contact_inquiries 테이블)
├─ 레코드 저장
├─ status: 'new' (초기 상태)
└─ created_at 기록

    ↓
[병렬 처리]
├─ 감사 메일 발송 (사용자에게)
├─ 알림 메일 발송 (관리자에게)
└─ Supabase 저장 완료

    ↓
클라이언트 (사용자)
├─ 성공 메시지 표시
├─ 상담 예약 대기 상태 안내
└─ 확인 이메일 안내
```

#### 뉴스레터 구독 폼

```
뉴스레터 구독 폼
(사이드바, 헤더, 팝업, Footer 등 다중 위치)
    ↓
[사용자 입력]
├─ email: 이메일
├─ name: 이름 (선택)
└─ source_url: 유입 페이지

    ↓
[클라이언트 검증]
└─ email 형식 검증

    ↓
Supabase Edge Function (/functions/subscribe)
    ↓
[중복 확인]
├─ email UNIQUE 제약 확인
├─ 기존 구독자는 is_active를 TRUE로 업데이트
└─ 신규 구독자는 레코드 생성

    ↓
Supabase DB (newsletter_subscribers 테이블)
├─ email (UNIQUE)
├─ name, source_url, subscribed_at, is_active
└─ 레코드 저장

    ↓
구독 확인 메일 발송
└─ 구독 해제 링크 포함

    ↓
클라이언트
├─ "구독이 완료되었습니다" 메시지
└─ 팝업/폼 닫기
```

### 6.3 이미지 데이터 흐름

#### 블로그 대표 이미지 생성 및 활용

```
Claude Skills (블로그 콘텐츠 생성)
    ↓
[시각적 소재 추출]
글 주제에서 자동으로 일러스트 소재 키워드 도출
예: "우울증 증상" → "a person in calm environment, warm light, serene"

    ↓
나노바나나2 API (Gemini 3 Flash Image)
[이미지 생성]
├─ 프롬프트: 고정 스타일 + 소재 키워드
├─ 스타일 레퍼런스 이미지 2~3장 첨부
│  (브랜드 톤앤무드: 따뜻한 수채화/파스텔)
├─ 해상도: 1K (1024x1024)
├─ 텍스트 일절 포함하지 않음 (다목적 활용)
└─ 비용: ~$0.067/이미지 (Batch API 시 50% 할인)

    ↓
생성된 이미지
(텍스트 없는 순수 일러스트)

    ↓
[Supabase Storage 업로드]
경로: storage/blog-images/thumbnails/{slug}.webp
└─ 파일명 = posts.slug (UNIQUE, 1:1 매칭)

    ↓
[이중 활용]
│
├─ 1. 블로그 대표 이미지 (원본)
│   ├─ /blog/[category]/[slug] 본문 상단 표시
│   ├─ posts.thumbnail_url에 URL 저장
│   └─ 반응형 이미지 표시 (Next.js Image 최적화)
│
└─ 2. OG 이미지 (동적 합성)
    ├─ Next.js opengraph-image.tsx에서 런타임 생성
    ├─ 배경: thumbnail_url의 일러스트
    ├─ 오버레이:
    │  ├─ 반투명 그라디언트 (어두운 톤)
    │  ├─ 글 제목 (bold, 흰색, 최대 2줄)
    │  ├─ 카테고리 (작은 텍스트)
    │  └─ 앤아더라이프 로고
    ├─ 사이즈: 1200x630px
    ├─ 포맷: JPEG (소셜 공유 최적화)
    └─ 생성: Vercel Edge Runtime (메모리 효율)

    ↓
og_image_url 필드
├─ null: Next.js가 자동 생성 (기본)
├─ 커스텀 URL: 별도 이미지 사용 (관리자 입력)
└─ Meta og:image 태그 자동 설정

    ↓
[소셜 공유 시]
Facebook, Twitter, LinkedIn 등에서
미리보기 이미지 표시
```

#### 이미지 생성 프롬프트 구조

```
[고정 스타일 프롬프트]
"Minimal warm watercolor illustration, soft pastel tones
with beige and muted green, no text, no letters, no words,
clean composition, gentle and calming mood"

[스타일 레퍼런스 이미지]
+ 2~3장의 예시 일러스트 첨부
  (브랜드 컬러/톤앤무드 일치)

[주제별 소재 키워드]
Claude가 글 내용에서 자동 추출
예: "panic-disorder-coping" 글
→ "a person breathing calmly in nature,
    soft light, serene atmosphere, peaceful moment"

[최종 프롬프트 예]
"Minimal warm watercolor illustration, soft pastel tones
with beige and muted green, no text, no words, clean composition,
gentle and calming mood. A person breathing calmly in nature,
soft light, serene atmosphere, peaceful moment."
```

---

## 7. 페이지별 상세 와이어프레임 사양

### 7.1 홈페이지 (/)

#### 섹션 구조 (위에서 아래 순서)

**1. 헤더 (Header)**
- 고정 네비게이션 바 (sticky)
- 로고 (왼쪽)
- 글로벌 네비게이션 링크 (중앙)
- 상담 예약 CTA 버튼 (오른쪽, 강조 색상)
- 모바일: 햄버거 메뉴 토글

**2. 히어로 섹션**
- 백그라운드: 브랜드 컬러 그라디언트 또는 따뜻한 배경
- 메인 헤드라인: "당신의 마음을 돌보는 것이 우리의 일입니다"
- 서브 헤드라인: "전문 심리상담으로 더 나은 내일을 시작하세요"
- CTA 버튼: "무료 상담 문의하기" (Primary color)
- 이미지: 따뜻한 톤의 일러스트 또는 사진

**데이터 소스:** 코드 (하드코딩)
**반응형:**
- 데스크탑: 텍스트 + 이미지 2칼럼
- 모바일: 텍스트 중심, 이미지 아래

**Schema:** Organization + LocalBusiness

---

**3. 서비스 소개 섹션**
- 3칼럼 카드 그리드 (데스크탑) / 1칼럼 (모바일)
  1. 심리상담 (카드): 아이콘 + "전문 상담사와의 개인 상담" + 설명 + 링크
  2. 보수교육 (카드): 아이콘 + "전문가 대상 교육 프로그램" + 설명 + 링크
  3. 심리 연구 (카드): 아이콘 + "최신 심리학 연구 공유" + 설명 + 링크

**데이터 소스:** 코드
**CTA:** 각 카드 하단 "자세히 알아보기" 링크

---

**4. 최신 블로그 포스트 캐러셀**
- 제목: "최신 심리건강 정보"
- 캐러셀 또는 그리드 (3~6개 포스트 카드)
  - 각 카드: 썸네일 이미지 + 제목 + 발췌(excerpt) + 카테고리 태그 + 작성일
- 포스트 카드 클릭 → 블로그 상세 페이지
- "블로그 전체 보기" 링크

**데이터 소스:** DB (posts, is_featured=true 또는 published_at DESC 기반)
**렌더링:** ISR revalidate: 3600
**Schema:** NewsArticle (선택사항)

---

**5. 교수진 하이라이트 섹션**
- 제목: "저희 교수진을 소개합니다"
- 3~4명의 대표 상담사 카드
  - 프로필 이미지 + 이름 + 직책 + 전문 분야 간단 설명
- "전체 교수진 보기" 링크 → /team

**데이터 소스:** DB (authors, is_featured=true 또는 정렬 순서)
**렌더링:** SSG
**Schema:** Person

---

**6. 신뢰 요소 섹션**
- 통계/수치 박스 (3~4개)
  - "30년 경력", "5,000+ 상담 사례", "95% 만족도"
- 자격증 배지
- 미디어 노출/언론 기사
- 고객 후기 (1~2개 의견)

**데이터 소스:** 코드 또는 DB (후기 테이블, 선택사항)
**렌더링:** SSG

---

**7. 하단 CTA 배너**
- 배경: 브랜드 Secondary 컬러
- 큰 텍스트: "마음이 힘든가요?"
- 서브텍스트: "전문 상담사가 당신의 이야기를 듣겠습니다"
- CTA 버튼: "지금 상담 신청하기"

**데이터 소스:** 코드
**CTA 액션:** /contact로 스크롤 또는 이동

---

**8. 푸터 (Footer)**
- 4칼럼 구조
  1. 블로그 카테고리 (링크 목록)
  2. 센터 정보 (소개, 철학, 시설, 오시는길)
  3. 교육 프로그램 (프로그램 목록)
  4. 고객 지원 (문의, FAQ, 이용약관, 개인정보보호)
- 하단: 저작권 표시 + 소셜 링크 (선택사항)

**데이터 소스:** 코드 + DB (카테고리, 프로그램 동적 링크)

---

### 7.2 블로그 목록 페이지 (/blog)

#### 섹션 구조

**1. 페이지 헤더**
- 페이지 타이틀: "블로그"
- 페이지 설명: "심리건강, 상담, 자기성장 등 다양한 주제의 콘텐츠를 만나보세요"
- Breadcrumb: Home > Blog

**데이터 소스:** 코드
**Schema:** BreadcrumbList + CollectionPage

---

**2. 카테고리 필터 네비게이션**
- 수평 탭 또는 드롭다운
- "전체" (기본) + 각 카테고리 이름
- 선택한 카테고리는 하이라이트 표시
- 클릭 시: /blog/{category}로 페이지네이션 0으로 이동

**데이터 소스:** DB (categories, sort_order 기반)
**렌더링:** SSG

---

**3. 검색 바 (선택사항)**
- 입력: 키워드 입력 필드
- 동작: Supabase 풀텍스트 검색 (title + summary + content)
- 결과: 매칭 포스트 목록 실시간 표시 (클라이언트 JS)

**데이터 소스:** DB 풀텍스트 인덱스 (keywords GIN 인덱스)
**렌더링:** CSR

---

**4. 포스트 목록 카드**
- 그리드 또는 리스트 레이아웃
  - 데스크탑: 2~3칼럼 그리드
  - 모바일: 1칼럼
- 각 카드 구성:
  - 썸네일 이미지 (상단, 정사각형 또는 16:9)
  - 카테고리 태그 (좌상단 오버레이 또는 텍스트)
  - 제목 (2줄, ellipsis)
  - 발췌/excerpt (3줄, ellipsis)
  - 메타 정보: 작성일 + 읽기 시간 + 작성자
  - 클릭 영역: 카드 전체

**데이터 소스:** DB (posts, published_at DESC)
**렌더링:** ISR
**Schema:** Article Schema (각 카드)

---

**5. 페이지네이션**
- 숫자 페이지네이션 (SEO 권장, 무한 스크롤 피함)
- 페이지당 12~15개 포스트
- 페이지 링크: /blog?page=2, /blog?page=3, ...
  - 또는 동적 라우트로 /blog/page/2 등도 가능 (canonical 주의)
- 이전/다음 버튼 포함

**데이터 소스:** DB (offset + limit)
**렌더링:** SSG with ISR

---

**6. 사이드바 (데스크탑)**
- **인기글 섹션:** view_count DESC 상위 5개 포스트 (link)
- **카테고리 목록:** 카테고리별 포스트 수 표시
- **CTA 위젯:**
  - "상담이 필요하신가요?" 버튼
  - "뉴스레터 구독" 인라인 폼 (이메일 + 버튼)

**데이터 소스:** DB (posts.view_count, categories)
**렌더링:** ISR

---

### 7.3 카테고리 페이지 (/blog/[category])

#### 섹션 구조

**1. 페이지 헤드**
- 카테고리명 + 설명
- Breadcrumb: Home > Blog > {카테고리명}
- Meta SEO 타이틀/설명: categories.seo_title, seo_description

**데이터 소스:** DB (categories)
**렌더링:** SSG

---

**2. 포스트 목록**
- /blog 과 동일한 카드 구조
- 필터: category_id = {해당 카테고리} + status='published'
- 정렬: published_at DESC

**데이터 소스:** DB (posts WHERE category_id = X)
**렌더링:** SSG with ISR

---

**3. 페이지네이션**
- /blog/mental-health?page=2, /blog/mental-health?page=3 등

---

### 7.4 개별 블로그 포스트 페이지 (/blog/[category]/[slug])

#### 섹션 구조

**1. 페이지 헤드**
- Breadcrumb: Home > Blog > {카테고리명} > {포스트명}
- 메타 태그: meta_title, meta_description, og_image_url, canonical URL
- Schema: Article + BreadcrumbList + FAQPage (FAQ 섹션 있을 경우)

**데이터 소스:** DB (posts)
**렌더링:** ISR (revalidate: 3600)

---

**2. 포스트 메타 정보 바**
- 제목 (H1)
- 작성일 + 카테고리 + 태그 + 읽기 시간
- 작성자 정보 (profile image + 이름 + 전문 분야)
- 소셜 공유 버튼 (Facebook, Twitter, LinkedIn, KakaoTalk)

**데이터 소스:** DB (posts + authors)

---

**3. 대표 이미지**
- 게시글 상단에 반응형 이미지 표시
- 이미지: posts.thumbnail_url (Supabase Storage)
- Next.js Image 컴포넌트로 최적화 (WebP/AVIF 자동 변환)
- 대체 텍스트: 글 제목 또는 설명

**데이터 소스:** DB (posts.thumbnail_url)

---

**4. 요약 박스 (Summary Box)**
- 배경: 라이트 크림 또는 브랜드 색상 10% 연회색
- 내용: posts.summary (3~5문장)
- 아이콘: 전구 아이콘 (핵심 내용)
- 용도: 사용자가 글의 핵심을 빠르게 파악

**데이터 소스:** DB (posts.summary)

---

**5. 목차 (Table of Contents)**
- 위치: 본문 바로 아래 또는 우측 sticky 사이드바
- 구성: H2/H3 제목 추출 → 링크 생성
- 동작: 클릭하면 해당 섹션으로 스크롤

**렌더링:** 클라이언트 JS (Markdown → HTML 변환 후 헤드 자동 추출)

---

**6. 본문 콘텐츠**
- Markdown → HTML 렌더링
- **AEO 최적화 구조:**
  - H2/H3 섹션 (질문형 소제목)
  - 섹션당 200~350자 (AI 인용률 최적화)
  - 첫 1~2문장에 직접 답변 (인용 블록)
  - 나머지는 보충 설명/예시/근거

- **본문 내 요소:**
  - 일반 문단 (본문 텍스트)
  - 강조 텍스트 (bold, italic, quote)
  - 목록 (bullet list, numbered list)
  - Markdown 테이블 (비교/수치 정보)
    - 반응형 래퍼로 감싼 가로 스크롤 처리
  - 이미지 (필요시, 하지만 기본은 본문 상단 대표 이미지만)
  - 코드 블록 (심리학 관련 체크리스트 등)
  - 인용문 (blockquote)

- **CTA 삽입:**
  - **중간 InlineCTA (본문 50~70% 지점):**
    - 배경: 브랜드 Accent 컬러 (웜 코랄)
    - 텍스트: "이런 증상이 있으신가요? 전문 상담이 도움이 될 수 있습니다"
    - 버튼: "상담 예약하기" → /contact
  - **하단 최종 CTA (BottomCTA):**
    - 배경: 풀 와이드, 브랜드 Primary 색상
    - 텍스트: 카테고리 default_cta_type에 따라 다름
      - client 대상: "지금 상담 예약하기"
      - professional 대상: "교육 과정 살펴보기"
    - 버튼: Primary CTA 버튼

**데이터 소스:** DB (posts.content Markdown)
**렌더링:** 클라이언트 (marked.js 또는 remark)

---

**7. 참고 자료 섹션**
- 제목: "참고 자료"
- 아웃링크 목록 (posts.references JSONB 기반)
- 각 아이템:
  ```
  [아이콘] [출처명]
  [설명]
  [링크] ↗ (target="_blank", rel="noopener noreferrer")
  ```
- 목적: 콘텐츠 신뢰도 강화 + E-E-A-T 신호 + 사용자에게 추가 정보 제공

**데이터 소스:** DB (posts.references JSONB)

---

**8. FAQ 섹션 (Accordion)**
- 위치: 본문 하단, 참고 자료 위
- 구성: 3~5개 Q&A
- 렌더링: Accordion (제목 클릭 → 펼쳐짐)
- Schema: FAQPage + Question/Answer

**데이터 소스:** DB (posts.schema_markup의 FAQ 데이터 또는 별도 필드)

---

**9. 관련 포스트 추천**
- 제목: "이런 글도 읽어보세요"
- 3~4개 포스트 카드 (같은 카테고리 또는 같은 태그)
- 카드 구성: 썸네일 + 제목 + 카테고리
- 정렬: 관련도 점수 (tag 공통도 + keywords 매칭) 또는 최신순

**데이터 소스:** DB (post_tags 기반 추천 또는 같은 category_id)
**렌더링:** ISR

---

**10. 소셜 공유 버튼 (반복)**
- 위치: 본문 최하단 (고정 또는 sticky)
- 버튼: Facebook, Twitter, LinkedIn, KakaoTalk, 복사 링크
- 동작: 각 플랫폼의 공유 대화상자 또는 링크 생성

**데이터 소스:** 페이지 URL + og:title + og:image

---

**11. 댓글 섹션 (선택사항)**
- 써드파티 댓글 라이브러리 (Disqus, Utterances 등)
- 또는 구현하지 않기 (관리 부담 고려)

---

### 7.5 센터 소개 페이지 (/about)

#### 섹션 구조

**1. 히어로 섹션**
- 제목: "앤아더라이프 심리상담연구소"
- 서브텍스트: "20년 이상의 경험과 전문성으로 당신을 돕겠습니다"

**2. 센터 소개 섹션**
- 텍스트: 연구소 설립 배경, 비전, 미션

**3. 상담 철학 섹션** (또는 /about/philosophy 별도 페이지)
- 핵심 접근 철학 설명
- 예시 이미지

**4. 시설 안내 섹션** (또는 /about/facility 별도 페이지)
- 시설 사진 갤러리 (lightbox 또는 캐러셀)
- 각 공간 설명 (상담실, 대기실, 휴게 공간 등)
- 접근성 정보 (장애인 시설, 주차 정보 등)

**5. 찾아오시는 길**
- 주소 텍스트
- 카카오맵 또는 네이버맵 임베드
- 대중교통 안내

**데이터 소스:** 코드
**렌더링:** SSG
**Schema:** LocalBusiness + Organization

---

### 7.6 교수진 목록 페이지 (/team)

#### 섹션 구조

**1. 페이지 헤더**
- 제목: "저희 교수진을 소개합니다"
- 설명: 센터의 전문 상담사들에 대해

**2. 교수진 카드 그리드**
- 3칼럼 (데스크탑) / 1칼럼 (모바일)
- 각 카드:
  - 프로필 사진 (정사각형)
  - 이름 (H3)
  - 직책 (서브텍스트)
  - 전문 분야 (태그 배열)
  - "프로필 보기" 링크 → /team/{slug}

**데이터 소스:** DB (authors)
**렌더링:** SSG
**Schema:** Person Schema (각 카드)

---

### 7.7 교수진 상세 페이지 (/team/[slug])

#### 섹션 구조

**1. 프로필 헤더**
- 프로필 사진 (좌측 또는 중앙)
- 이름 + 직책
- 전문 분야 태그

**2. 상세 정보 섹션**
- 소개 글 (bio)
- 학력 (credentials 배열)
- 경력 요약
- 전문 분야 상세 설명

**3. 상담 영역**
- 주요 상담 주제 (bullet list)

**4. 하단 CTA**
- "{이름} 상담사와 상담하기" 버튼 → /contact

**데이터 소스:** DB (authors)
**렌더링:** SSG
**Schema:** Person + LocalBusiness

---

### 7.8 교육 프로그램 목록 페이지 (/programs)

#### 섹션 구조

**1. 페이지 헤더**
- 제목: "전문 교육 프로그램"
- 설명: "심리상담 전문성 향상을 위한 다양한 과정"

**2. 프로그램 카드 그리드**
- 2~3칼럼 (데스크탑) / 1칼럼 (모바일)
- 각 카드:
  - 프로그램 이미지
  - 프로그램명 (H3)
  - 강사명
  - 상태 배지 (진행 중/예정/종료)
  - 간단 설명
  - "자세히 보기" 링크 → /programs/{slug}

**데이터 소스:** 코드 또는 DB (programs 테이블, 기획에 명시되지 않음)
**렌더링:** SSG

---

### 7.9 프로그램 상세 페이지 (/programs/[slug])

#### 섹션 구조

**1. 프로그램 헤더**
- 프로그램 이미지
- 프로그램명 (H1)
- 강사명 + 상태 배지

**2. 프로그램 개요**
- 프로그램 설명
- 대상 (예: 심리상담사, 임상심리사 등)
- 기간 및 일정
- 강사 프로필 (프로필 사진 + 이름 + 약력)

**3. 커리큘럼**
- 주차별 강의 주제
- 테이블 또는 아코디언 형식

**4. 수강료 및 등록**
- 수강료
- 등록 방법
- "수강 신청하기" CTA 버튼 → 수강 신청 폼 또는 외부 결제 페이지

**5. FAQ**
- 자주 묻는 질문

**데이터 소스:** 코드
**렌더링:** SSG
**Schema:** Course + Event

---

### 7.10 상담 예약/문의 페이지 (/contact)

#### 섹션 구조

**1. 페이지 헤더**
- 제목: "상담 예약/문의"
- 설명: "당신의 이야기를 듣겠습니다"

**2. 문의 폼 (좌측 또는 중앙)**
```
┌─────────────────────────────┐
│ 상담 문의 폼                 │
├─────────────────────────────┤
│ 이름 (텍스트 필드, 필수)     │
│ 연락처 (전화번호, 필수)       │
│ 이메일 (이메일, 필수)        │
│ 상담 유형 (드롭다운, 필수)    │
│  ├─ 개인상담                │
│  ├─ 부부상담                │
│  ├─ 가족상담                │
│  └─ 기타                    │
│ 희망 상담 일시 (날짜/시간)   │
│ 추가 메시지 (텍스트에어리어) │
│                             │
│ [제출 버튼] [초기화 버튼]    │
└─────────────────────────────┘
```

**폼 검증:**
- 클라이언트: React Hook Form + Zod
- 서버: Zod 재검증 + Rate limiting
- 제출 후: Supabase contact_inquiries 저장 + 이메일 발송

**데이터 소스:** 폼 입력
**Schema:** ContactPoint

---

**3. 연락처 정보 (우측 또는 하단)**
- 전화번호 (클릭 가능: tel: 링크)
- 이메일 (클릭 가능: mailto: 링크)
- 운영 시간 (요일별)
- 위치 (지도 임베드, 카카오맵/네이버맵)

---

**4. 다른 연락 방법**
- 카카오톡 상담 버튼 (카카오톡 채널 연결, 모바일)
- SNS 메시지 (선택사항)

---

**5. FAQ**
- "상담은 몇 일 후에 받을 수 있나요?"
- "초회 상담 시간은 얼마나 걸리나요?"
- "온라인 상담도 가능한가요?"
- "상담료는 얼마인가요?"

**데이터 소스:** 코드
**렌더링:** SSG

---

## 8. SEO 메타데이터 생성 규칙

### 8.1 Meta 태그 자동 생성

| Meta 태그 | 소스 | 규칙 | 최대 길이 |
|-----------|------|------|----------|
| `<title>` | posts.meta_title 또는 posts.title | 핵심 키워드 포함, 50~60자 | 60자 |
| `<meta name="description">` | posts.meta_description 또는 posts.excerpt | CTA 암시, 150~160자 | 155자 |
| `<meta name="keywords">` | posts.keywords 배열 | 쉼표 구분 (선택사항, 거의 무시됨) | - |
| `<meta name="viewport">` | 코드 | `width=device-width, initial-scale=1` | - |
| `<meta charset>` | 코드 | `UTF-8` | - |
| `<link rel="canonical">` | 현재 페이지 URL | Self-referencing | - |

### 8.2 Open Graph 태그

| OG 태그 | 소스 | 값 |
|---------|------|-----|
| `og:title` | posts.meta_title 또는 posts.title | 페이지 제목 |
| `og:description` | posts.meta_description 또는 posts.summary | 페이지 설명 |
| `og:image` | posts.og_image_url (동적 생성) | 1200x630px, Next.js ImageResponse |
| `og:image:width` | 고정 | 1200 |
| `og:image:height` | 고정 | 630 |
| `og:type` | 페이지 타입 | article (블로그) / website (기타) |
| `og:url` | 현재 페이지 URL | Canonical URL |
| `og:site_name` | 고정 | "앤아더라이프 심리상담연구소" |

### 8.3 Twitter Card 태그

| Twitter 태그 | 값 |
|-------------|-----|
| `twitter:card` | summary_large_image |
| `twitter:title` | posts.meta_title |
| `twitter:description` | posts.meta_description |
| `twitter:image` | og:image와 동일 |
| `twitter:creator` | @brand_handle (선택사항) |

### 8.4 JSON-LD Schema 마크업

#### Article Schema (블로그 포스트)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "포스트 제목",
  "description": "포스트 설명",
  "image": [
    "https://example.com/image.webp"
  ],
  "datePublished": "2026-04-06T00:00:00Z",
  "dateModified": "2026-04-06T12:00:00Z",
  "author": {
    "@type": "Person",
    "name": "작성자명"
  },
  "publisher": {
    "@type": "Organization",
    "name": "앤아더라이프",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

#### FAQPage Schema (블로그 포스트의 FAQ 섹션)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "질문 1",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "답변 1"
      }
    }
  ]
}
```

#### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    }
  ]
}
```

#### Organization Schema (홈페이지)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "앤아더라이프",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "description": "심리상담 및 교육 기관",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "서울시 ...",
    "addressLocality": "서울",
    "postalCode": "xxxxx",
    "addressCountry": "KR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "02-xxxx-xxxx",
    "email": "contact@example.com"
  },
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

---

## 9. 모바일 반응형 동작 규칙

### 9.1 Breakpoint 정의

| Device | Width | Tailwind | 주요 변화 |
|--------|-------|----------|----------|
| Mobile | < 640px | sm | 1칼럼, 풀너비 |
| Tablet | 640px ~ 1024px | md / lg | 2칼럼, padding 증가 |
| Desktop | ≥ 1024px | xl / 2xl | 3칼럼 이상, max-width 제한 |

### 9.2 주요 컴포넌트 반응형 동작

| 컴포넌트 | Mobile | Tablet | Desktop |
|----------|--------|--------|----------|
| 네비게이션 | 햄버거 메뉴 | 내비게이션 바 | 전체 내비게이션 바 |
| 블로그 카드 | 1칼럼 (풀너비) | 2칼럼 | 3칼럼 |
| 테이블 | 가로 스크롤 (래퍼) | 축소 폰트 | 정상 표시 |
| 이미지 | 100% 너비 | 최대 80% | 최대 너비 제한 |
| 사이드바 | 없음 (콘텐츠 아래) | 우측 표시 | 우측 고정 |
| 플로팅 CTA | 하단 카카오톡 아이콘 | 우측 고정 | 우측 고정 |

---

## 10. 접근성 (Accessibility) 규칙

### 10.1 WCAG 2.1 준수

- **색상 대비:** 텍스트 vs 배경 최소 4.5:1 (일반) / 3:1 (큰 텍스트)
- **폰트 크기:** 본문 최소 16px (모바일), 제목 계층 명확
- **대체 텍스트:** 모든 이미지에 `alt` 속성 (의미 있는 설명)
- **포커스 표시:** 모든 인터랙티브 요소에 명확한 focus outline
- **키보드 네비게이션:** Tab 키로 모든 상호작용 가능
- **ARIA 라벨:** 폼 필드, 버튼, 랜드마크에 명확한 라벨

### 10.2 구조화 마크업

- `<h1>` 페이지당 1개 (중복 금지)
- `<h2>`, `<h3>` 계층 순서 준수 (건너뛰기 금지)
- `<nav>`, `<main>`, `<footer>` 시맨틱 태그 사용
- `<form>` 필드와 `<label>` 명시적 연결 (for/id)

---

## 11. 성능 목표 및 측정

### 11.1 Core Web Vitals 목표

| 지표 | 목표 | 측정 도구 |
|------|------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights, Lighthouse |
| INP (Interaction to Next Paint) | < 200ms | PageSpeed Insights, Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights, Lighthouse |

### 11.2 SEO KPI

| 지표 | 목표 | 측정 도구 |
|------|------|----------|
| 인덱싱 비율 | 발행 콘텐츠의 95% 이상 | Google Search Console |
| 평균 검색 순위 | 주요 키워드 TOP 10 | Ahrefs, SEMrush |
| 월간 오가닉 트래픽 | 런칭 6개월 내 월 10,000+ 세션 | Google Analytics |
| 블로그 → CTA 전환율 | 상담 1%, 교육 0.5%, 뉴스레터 2% | Google Analytics + Supabase |

---

*본 IA 문서는 기획 문서의 기술 설계 및 콘텐츠 전략을 바탕으로 정보 구조, 네비게이션, SEO 최적화, 데이터 흐름을 상세히 정의합니다. 개발 및 구현 단계에서 이 문서를 참고하여 일관된 정보 구조와 사용자 경험을 보장합니다.*
