# 상담 프로그램 기획 문서

> 블로그 → 상담 프로그램 소개 → 상담 예약으로 이어지는 전환 퍼널 중간 단계

## 1. 전환 퍼널 변경

### Before
```
블로그 글 → CTA "상담 예약하기" → /contact (예약 폼)
```

### After
```
블로그 글 → CTA "○○상담 알아보기" → /counseling/[slug] (상담 소개) → CTA "상담 예약하기" → /contact
```

## 2. 상담 프로그램 목록 (예시)

| 프로그램 | slug | 대상 | match_keywords |
|---------|------|------|---------------|
| 개인상담 | individual | 우울, 불안, 트라우마 등 | 우울, 우울증, 불안, 불안장애, 공황, 공황장애, 트라우마, PTSD, 자존감, 자존감저하, 감정조절, 스트레스, 심리상담, 정서, 마음건강 |
| 부부상담 | couple | 부부/커플 갈등 | 부부, 부부갈등, 부부상담, 커플, 커플상담, 결혼, 이혼, 별거, 소통, 부부소통, 외도, 갈등해결, 관계회복 |
| 번아웃상담 | burnout | 직장인 번아웃 | 번아웃, 직장, 직장스트레스, 업무, 업무스트레스, 과로, 퇴사, 이직, 직장생활, 워라밸, 소진, 직무스트레스 |
| 2030상담 | young-adult | 20~30대 고민 | 20대, 30대, 취업, 취업스트레스, 진로, 진로고민, 대인관계, 독립, 자아정체성, 사회초년생, 청년, MZ |
| 아동청소년상담 | child-youth | 아동/청소년 + 부모 | 아동, 청소년, 아동상담, 청소년상담, 학교, 학교폭력, 왕따, 부모, 양육, 발달, 분리불안, 학교부적응, 틱, ADHD |
| 가족상담 | family | 가족 관계 | 가족, 가족상담, 가족갈등, 부모자녀, 세대갈등, 형제, 고부갈등, 원가족, 가족관계, 가정폭력 |

## 3. DB 구조

> **하이브리드 접근 방식:** DB는 CTA 자동 매칭과 `/counseling` 목록 카드 표시 용도로만 사용.
> 상세 페이지 콘텐츠(소개문, 진행 과정, FAQ 등)는 정적 코드 파일에서 직접 관리하여 디자인 자유도를 확보.

### 새 테이블: counseling_programs

```sql
CREATE TABLE counseling_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,        -- "couple", "young-adult"
  title TEXT NOT NULL,              -- "부부상담 프로그램"
  subtitle TEXT,                    -- "함께 성장하는 관계를 위한 전문 상담"
  -- CTA 커스터마이징
  cta_heading TEXT,                 -- "관계가 힘드신가요?"
  cta_button_text TEXT,             -- "부부상담 알아보기"
  -- 자동 매칭
  match_keywords TEXT[] DEFAULT '{}',
  -- 관리
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**제거된 필드 (정적 코드로 이동):** `description`, `target_audience`, `duration`, `process`, `thumbnail_url`, `meta_title`, `meta_description`, `schema_markup`
→ 이 정보들은 각 상세 페이지 코드 파일(`app/counseling/couple/page.tsx` 등)에서 직접 관리

### 기존 테이블 수정

```sql
-- posts: 발행 시점에 매칭된 프로그램 저장
ALTER TABLE posts
  ADD COLUMN counseling_program_id UUID REFERENCES counseling_programs(id);

-- categories: 태그 매칭 실패 시 폴백
ALTER TABLE categories
  ADD COLUMN default_program_id UUID REFERENCES counseling_programs(id);
```

## 4. CTA 매칭 로직

### 우선순위
```
1순위: posts.counseling_program_id (발행 시 자동 저장 또는 수동 지정)
2순위: categories.default_program_id (카테고리 기본값)
3순위: null → /counseling 전체 목록 페이지
```

### 매칭 시점: 콘텐츠 발행 시 (1회)

Claude Skills 자동 발행 파이프라인에서:
1. 콘텐츠 생성 → 태그/키워드 자동 부여
2. 태그+키워드 배열과 각 프로그램의 match_keywords 비교
3. 겹치는 키워드가 가장 많은 프로그램 선택
4. posts.counseling_program_id에 저장
5. 이후 접속 시 추가 연산 없음 (JOIN으로 한번에 조회)

### 매칭 쿼리 (발행 시 사용)

```sql
SELECT id, title, slug,
  array_length(
    ARRAY(SELECT unnest(match_keywords) INTERSECT SELECT unnest($1::text[])),
    1
  ) as match_count
FROM counseling_programs
WHERE is_active = true
ORDER BY match_count DESC NULLS LAST
LIMIT 1;
-- $1 = 포스트의 태그 + 키워드 결합 배열
```

### 재매칭 스크립트 (프로그램 추가/변경 시)

새 상담 프로그램 추가하거나 match_keywords를 변경했을 때,
기존 포스트들의 counseling_program_id를 일괄 재계산:

```sql
UPDATE posts SET counseling_program_id = (
  SELECT cp.id FROM counseling_programs cp
  WHERE cp.is_active = true
  ORDER BY array_length(
    ARRAY(SELECT unnest(cp.match_keywords) INTERSECT SELECT unnest(posts.keywords || posts_tags_array)),
    1
  ) DESC NULLS LAST
  LIMIT 1
)
WHERE status = 'published';
```

## 5. 페이지 구조

### /counseling (목록) — DB 기반
- 상담 프로그램 카드 그리드 (`counseling_programs` 테이블 조회)
- 각 카드: 제목, 부제목, CTA 버튼
- SEO: `generateMetadata`, `BreadcrumbList` Schema

### /counseling/[slug] (상세) — 정적 코드 파일
- **하이브리드 핵심:** 각 상세 페이지는 DB에 의존하지 않는 독립적인 정적 코드 파일
- 초기 구현 페이지:
  - `app/counseling/couple/page.tsx` — 부부상담
  - `app/counseling/young-adult/page.tsx` — 2030상담
- 각 페이지에서 자유롭게 구성 가능: 프로그램 소개, 대상, 기간, 진행 과정, FAQ, 상담사 프로필 등
- 하단 CTA → `/contact` (상담 예약 폼)
- SEO: 각 페이지 파일 내 `generateMetadata`, `BreadcrumbList` Schema 직접 정의

## 6. CTA 컴포넌트 변경

### InlineCTA / BottomCTA 수정

```typescript
interface CTAProps {
  ctaType: string;
  program?: {
    slug: string;
    title: string;
    cta_heading?: string;
    cta_button_text?: string;
  } | null;
}

// 링크 분기 로직:
// 1순위: program 있음 → /counseling/{slug} (프로그램 cta_button_text 사용)
// 2순위: program 없음 + consultation → /counseling (목록 페이지)
// 3순위: education → /programs (기존 교육 프로그램)
```

### 블로그 상세 페이지에서 program prop 전달

```typescript
// app/blog/[category]/[slug]/page.tsx
const post = await getPostWithProgram(slug);
// posts 쿼리 시 counseling_program_id JOIN으로 program 정보 함께 조회

<InlineCTA ctaType={post.cta_type} program={post.counseling_program} />
<BottomCTA ctaType={post.cta_type} program={post.counseling_program} />
```

## 7. 네비게이션 변경

Header 네비게이션:
```
기존: 블로그 | 센터소개 | 교수진 | 교육프로그램 | 상담예약
변경: 블로그 | 상담 프로그램 | 센터소개 | 교수진 | 교육프로그램 | 상담예약
```

## 8. 사이트맵 추가

app/sitemap.ts에 counseling_programs 쿼리 추가:
- /counseling (priority 0.9)
- /counseling/{slug} (priority 0.8)

---

*작성일: 2026-04-06*
*상태: 기획 확정, Sprint 5에서 구현 예정*
