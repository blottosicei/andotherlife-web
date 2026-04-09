# SEO 감사 후 남은 작업 목록

**작성일:** 2026-04-07
**상태:** SEO 코드 레벨 수정 완료, 아래 항목은 콘텐츠/자산/환경설정이 필요한 작업

---

## 1. 환경변수 설정 (Vercel / .env.local)

배포 전 반드시 설정해야 하는 환경변수입니다.

| 변수명 | 용도 | 예시 값 |
|---|---|---|
| `NEXT_PUBLIC_SITE_PHONE` | 대표 전화번호 (스키마 + contact 페이지) | `02-123-4567` |
| `NEXT_PUBLIC_SITE_EMAIL` | 대표 이메일 (기본값: `business@mindfullabs.ai`) | `business@mindfullabs.ai` |
| `NEXT_PUBLIC_KAKAO_CHANNEL` | 카카오톡 채널 URL | `https://pf.kakao.com/_xAbCdE` |
| `NEXT_PUBLIC_NAVER_BLOG` | 네이버 블로그 URL (Organization sameAs) | `https://blog.naver.com/notherlife` |
| `NEXT_PUBLIC_INSTAGRAM` | 인스타그램 URL (Organization sameAs) | `https://www.instagram.com/notherlife` |

**설정 방법:**
```bash
# .env.local (로컬 개발)
NEXT_PUBLIC_SITE_PHONE=02-123-4567
NEXT_PUBLIC_KAKAO_CHANNEL=https://pf.kakao.com/_xAbCdE
NEXT_PUBLIC_NAVER_BLOG=https://blog.naver.com/notherlife
NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/notherlife

# Vercel 대시보드 → Settings → Environment Variables 에서도 동일하게 설정
```

**영향 범위:**
- 전화번호: contact 페이지, LocalBusiness 스키마, Organization 스키마
- 소셜 URL: Organization 스키마의 `sameAs` 배열 (Google Knowledge Panel 구축)
- 카카오톡: FloatingCTA, contact 페이지 카카오 버튼

---

## 2. 이미지 자산 제작/등록

### 2-1. 기본 OG 이미지 (`public/og-default.png`)
- **용도:** 블로그 외 페이지(about, team, programs 등) 소셜 공유 시 표시
- **사이즈:** 1200 x 630px
- **내용 권장:** 로고 + 연구소명 + 대표 카피 ("전문 심리상담과 가족치료")
- **배경:** 브랜드 그린 그라데이션 (#2d6a4f → #1f5e44)
- **현재 상태:** `app/layout.tsx`에서 참조 중이나 파일 미존재

### 2-2. 로고 이미지 (`public/logo.png`)
- **용도:** Organization/LocalBusiness 스키마의 `publisher.logo`
- **사이즈:** 최소 112x112px, 권장 400x400px (정사각형)
- **포맷:** PNG (투명 배경 권장)
- **현재 상태:** `lib/seo/schema.ts`에서 `${SITE_CONFIG.url}/logo.png` 참조 중이나 파일 미존재

### 2-3. 상담사 프로필 사진
- **용도:** `/team` 목록 + `/team/[slug]` 상세 페이지 + Person 스키마 `image`
- **현재 상태:** 녹색 원형 플레이스홀더 div
- **필요 작업:**
  1. 상담사별 프로필 사진 촬영 (정면, 밝은 배경)
  2. Supabase Storage에 업로드
  3. `authors` 테이블의 `avatar_url` 컬럼에 URL 저장
  4. `team/page.tsx`와 `team/[slug]/page.tsx`의 플레이스홀더 div를 `<Image>` 컴포넌트로 교체
- **E-E-A-T 영향:** YMYL 사이트에서 실제 상담사 사진은 신뢰도에 직접적 영향

### 2-4. 시설 사진 (6장)
- **용도:** `/about` 페이지 시설 안내 섹션
- **현재 상태:** 회색 플레이스홀더 div (`role="img"`)
- **필요 사진:** 상담실 1, 상담실 2, 그룹룸, 대기실, 교육실, 접수데스크
- **필요 작업:**
  1. 6개 공간 사진 촬영
  2. `public/images/facility/` 또는 Supabase Storage에 업로드
  3. `about/page.tsx`의 플레이스홀더를 `<Image>` 컴포넌트로 교체
  4. 각 이미지에 구체적인 `alt` 텍스트 적용

---

## 3. 콘텐츠 작성

### 3-1. `/about/philosophy` 페이지
- **현재 상태:** `<h1>상담 철학</h1>`만 있는 스텁 (noindex 처리됨)
- **권장 콘텐츠:**
  - 보웬가족체계이론 소개 및 접근 방식
  - 구조적 가족치료 철학
  - 이인수 대표의 수련 배경 (UPenn, Bowen Center)
  - 상담 과정 설명 (초회 상담 → 정기 상담 → 종결)
- **완료 후:** `robots: { index: false }` 제거하여 인덱싱 허용

### 3-2. `/about/facility` 페이지
- **현재 상태:** `<h1>시설 안내</h1>`만 있는 스텁 (noindex 처리됨)
- **권장 콘텐츠:**
  - 시설 사진 갤러리 (2-3 항목에서 제작한 사진 활용)
  - 각 공간별 설명 (상담실 규모, 장비, 환경)
  - 접근성 안내 (엘리베이터, 주차 등)
- **완료 후:** `robots: { index: false }` 제거하여 인덱싱 허용

### 3-3. `/programs/[slug]` 프로그램 상세 페이지
- **현재 상태:** "프로그램 상세 페이지 준비 중입니다" 표시 (noindex 처리됨)
- **대상 프로그램 (4개):**
  - `counselor-training` (상담사 수련프로그램)
  - `bowen-family-systems` (보웬가족체계치료 전문가과정)
  - `structural-family-therapy` (구조적가족치료 전문가과정)
  - `case-conceptualization` (사례개념화 연수과정)
- **권장 콘텐츠:**
  - 프로그램 상세 설명, 커리큘럼
  - 대상/자격 요건
  - 수강 기간 및 일정
  - 수료 후 자격/혜택
  - 수강 신청 CTA
- **완료 후:** `robots: { index: false }` 제거 + sitemap에 추가

### 3-4. TrustSection 통계 근거
- **파일:** `components/home/TrustSection.tsx`
- **현재 상태:** "10,000+건 상담", "98% 만족도", "50+ 상담사" 등 하드코딩
- **필요 작업:** 각 수치에 대한 출처/근거 확인 후:
  - 실제 데이터 기반이면 출처 각주 추가
  - 검증 불가능하면 검증 가능한 수치로 교체 (예: "30년 경력", "석사 이상 100%")
- **YMYL 영향:** 검증 불가 통계는 Google 품질 평가에서 신뢰도 감점 요인

---

## 4. 주소 정보 확인

현재 코드에 3개의 서로 다른 주소가 존재했습니다. `SITE_CONFIG`에 마포구 주소로 통일했으나 확인이 필요합니다.

| 출처 | 주소 | 용도 |
|---|---|---|
| `constants/site.ts` (현재 설정) | 서울시 마포구 잔다리로 73, 5층 | 상담소 운영 주소 |
| `Footer.tsx` (기존) | 서울특별시 성동구 뚝섬로13길 38, 4층 | 법인 등록 주소? |

**확인 필요:**
- 마포구 주소가 실제 상담소 위치가 맞는지 확인
- Footer의 성동구 주소가 법인 등록 주소인 경우, Footer에 "(법인 소재지)" 등 구분 표기 권장
- `SITE_CONFIG.geo` 좌표 (37.5509, 126.9176)가 정확한지 네이버맵에서 확인
- `SITE_CONFIG.address.postalCode` (04051)가 정확한지 확인

---

## 5. `generateStaticParams` 구현

동적 라우트 4곳에 `generateStaticParams`를 추가하면 빌드 시 사전 렌더링되어 첫 방문 LCP가 개선됩니다.

| 파일 | 데이터 소스 |
|---|---|
| `app/blog/[category]/[slug]/page.tsx` | `posts` 테이블 + `categories` 조인 |
| `app/blog/[category]/page.tsx` | `categories` 테이블 |
| `app/blog/tag/[tag]/page.tsx` | `tags` 테이블 |
| `app/team/[slug]/page.tsx` | `authors` 테이블 |

**구현 예시 (`blog/[category]/[slug]/page.tsx`):**
```ts
export async function generateStaticParams() {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, category:categories(slug)')
    .eq('status', 'published');
  return (posts ?? []).map((p: any) => ({
    category: p.category?.slug ?? 'uncategorized',
    slug: p.slug,
  }));
}
```

**주의:** Supabase 연결이 빌드 환경에서도 가능해야 합니다. Vercel의 빌드 환경변수에 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 설정되어 있어야 합니다.

---

## 6. IndexNow 키 파일 경로 수정

- **현재:** `/api/indexnow` 엔드포인트에서 키 반환
- **문제:** IndexNow 프로토콜은 `https://notherlife.com/{key}.txt` (루트 레벨)에서 키 검증
- **수정:**
  1. IndexNow 키 값 확인 (`INDEXNOW_KEY` 환경변수)
  2. `public/{키값}.txt` 파일 생성 (내용: 키값만 한 줄)
  3. POST 엔드포인트 (`/api/indexnow`)는 그대로 유지

---

## 7. 카테고리 URL 중복 콘텐츠 방지

- **파일:** `app/blog/[category]/[slug]/page.tsx`
- **문제:** `getPostBySlug(slug)`가 카테고리 무관하게 슬러그만으로 조회 → 동일 글이 다른 카테고리 URL에서도 접근 가능
- **수정 방법:** `generateMetadata` 또는 페이지 컴포넌트에서 `category` 파라미터와 실제 `post.category.slug`를 비교하여 불일치 시 `notFound()` 호출

```ts
const { category, slug } = await params;
const post = await getPostBySlug(slug);
if (!post) notFound();
if (post.category?.slug && post.category.slug !== category) notFound();
```

---

## 우선순위 정리

| 우선순위 | 항목 | 소요 시간 |
|---|---|---|
| **즉시** | 환경변수 설정 (전화번호, 소셜 URL) | 10분 |
| **즉시** | 주소 정확성 확인 | 10분 |
| **즉시** | OG 기본 이미지 + 로고 제작 | 1시간 |
| **단기** | generateStaticParams 구현 | 30분 |
| **단기** | 카테고리 URL 중복 방지 | 15분 |
| **단기** | IndexNow 키 파일 이동 | 10분 |
| **중기** | 상담사 프로필 사진 | 사진 촬영 의존 |
| **중기** | 시설 사진 6장 | 사진 촬영 의존 |
| **중기** | philosophy/facility 콘텐츠 | 1-2시간/페이지 |
| **장기** | programs/[slug] 4개 상세 콘텐츠 | 2-3시간/페이지 |
| **장기** | TrustSection 통계 검증 | 데이터 확인 의존 |
