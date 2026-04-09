# 앤아더라이프 웹사이트 종합 SEO 감사 보고서

**감사일:** 2026-04-07
**사이트:** https://notherlife.com
**기술스택:** Next.js 16 (App Router) + Supabase + Tailwind CSS v4
**감사방법:** 소스코드 레벨 정적 분석 (claude-seo 4개 전문 에이전트 병렬 감사)

---

## 종합 점수

| 영역 | 점수 | 상태 |
|---|---|---|
| 기술 SEO | 74 / 100 | 개선 필요 |
| 구조화 데이터 | 68 / 100 | 개선 필요 |
| 콘텐츠 & 온페이지 SEO | 66 / 100 | 개선 필요 |
| 사이트맵 & 크롤링 구조 | 72 / 100 | 개선 필요 |
| **종합** | **70 / 100** | **기본 토대는 양호, 주요 개선 필요** |

---

## 잘 되어 있는 점

- `lang="ko"` 올바르게 설정
- 모든 페이지에 `metadata` 또는 `generateMetadata` 내보내기 존재
- `canonical URL`이 `alternates.canonical`로 모든 페이지에 설정
- 로컬 폰트 2종 모두 `display: 'swap'` 적용 (LCP 최적화)
- `next/image` 사용 + `avif`, `webp` 포맷 지원
- BreadcrumbList 스키마가 주요 페이지 전체에 적용
- FAQPage 스키마가 상담 상세 페이지 + 연락처에 적용
- 보안 헤더: HSTS, X-Frame-Options, X-Content-Type-Options 등 설정
- 접근성 skip-link ("본문으로 건너뛰기") 존재
- 시맨틱 HTML (`main`, `article`, `section`, `aria-labelledby`) 일관적 사용
- ISR `revalidate = 3600` 블로그 페이지에 설정
- IndexNow POST 엔드포인트 존재

---

## CRITICAL 이슈 (즉시 수정 필요)

### 1. NAP(이름/주소/전화) 데이터 불일치 [기술+콘텐츠+스키마]
- **파일:** `app/about/page.tsx:152`, `app/contact/page.tsx:158`, `components/layout/Footer.tsx:156`
- `/about` 주소: "서울시 마포구 잔다리로 73, 5층"
- `/contact` 주소: "서울특별시 강남구 (상세 주소)" (플레이스홀더)
- Footer 주소: "서울특별시 성동구 뚝섬로13길 38, 4층"
- 전화번호: `02-000-0000` (플레이스홀더)
- **영향:** Google Local Pack 노출 불가, 신뢰도 하락, 구조화 데이터 검증 실패
- **수정:** `SITE_CONFIG`에 공식 주소/전화를 중앙화하고 모든 페이지에서 참조

### 2. Article 스키마 — `url`, `mainEntityOfPage`, `publisher.logo` 누락 [스키마]
- **파일:** `lib/seo/schema.ts:3-30`
- Google Article 리치 결과에 필수인 `url`, `mainEntityOfPage` 미설정
- `image`가 null일 때 빈 문자열 `''` 반환 (스키마 검증 실패)
- `publisher.logo` 없음 (Article 리치 결과 자격 박탈)
- **수정:** `generateArticleSchema`에 `url`, `mainEntityOfPage` 파라미터 추가, `image` null 시 필드 생략, `publisher.logo` 추가

### 3. LocalBusiness 스키마 — 주소 불완전, 좌표 없음 [스키마]
- **파일:** `lib/seo/schema.ts:79-109`
- `addressLocality: '서울'`만 있고 `streetAddress`, `postalCode`, `addressRegion` 없음
- `geo` (위도/경도) 좌표 없음
- **영향:** Google Maps, Knowledge Panel 노출 불가
- **수정:** 완전한 주소 정보 + 좌표 추가

### 4. 개인정보처리방침/이용약관 페이지 미존재 [콘텐츠]
- **파일:** `components/layout/Footer.tsx:139-151`
- 두 링크 모두 `href="#"` (더미)
- **영향:** YMYL(건강) 사이트에서 E-E-A-T 신뢰도 심각한 결격. Google QRG에서 필수 요소
- **수정:** `/privacy`, `/terms` 페이지 생성 및 링크 연결

### 5. 스텁 페이지 인덱싱 허용 [기술+콘텐츠]
- **파일:** `app/about/philosophy/page.tsx`, `app/about/facility/page.tsx`
- `<h1>` 태그만 있는 빈 페이지가 `noindex` 없이 공개 인덱싱 가능
- **영향:** 씬 콘텐츠로 사이트 전체 품질 평가 하락 가능
- **수정:** 즉시 `robots: { index: false, follow: true }` 추가

### 6. `generateStaticParams` 미구현 [기술]
- **파일:** 모든 동적 라우트 (`blog/[category]/[slug]`, `blog/[category]`, `blog/tag/[tag]`, `team/[slug]`)
- `revalidate = 3600` 설정되어 있으나 빌드 시 사전 렌더링 불가
- **영향:** 첫 방문자 LCP 성능 저하, Googlebot 크롤 시 느린 응답
- **수정:** 각 동적 페이지에 `generateStaticParams` export 추가

### 7. ~~Content Security Policy (CSP) 헤더~~ [제거 결정]
- **결정:** CSP 헤더 제거 (2026-04-09)
- **사유:** 사용자 입력 HTML 기능 없어 XSS 위험 낮음. GA, Meta Pixel, 네이버 지도 등 외부 서비스 연동 시마다 차단 문제 반복 발생. 운영 비용 대비 보안 이점 미미. HSTS, X-Frame-Options 등 기타 보안 헤더는 유지.

---

## HIGH 이슈 (빠른 시일 내 수정)

### 8. 사이트맵에 정적 상담 페이지 5개 누락 [사이트맵]
- `/counseling/individual`, `/couple`, `/family`, `/child-youth`, `/young-adult` 미포함
- 이 페이지들이 SEO 전환 퍼널의 핵심 랜딩 페이지
- **수정:** `app/sitemap.ts`의 `staticPages` 배열에 직접 추가

### 9. 홈페이지 — `WebSite` 스키마 + `SearchAction` 없음 [스키마]
- Organization 스키마만 있고 WebSite 스키마 없음
- **영향:** Google Sitelinks Searchbox 미표시
- **수정:** `WebSite` 스키마 + `potentialAction` SearchAction 추가

### 10. `/programs` — Course 스키마 없음 [스키마]
- 4개 교육 프로그램이 하드코딩되어 있으나 스키마 미적용
- **영향:** Course 리치 결과 미표시 (전문가 전환 퍼널 핵심)
- **수정:** `generateCourseListSchema` 함수 생성 및 적용

### 11. `/team` — Person 스키마 미사용 [스키마]
- `generatePersonSchema` 함수 존재하나 team 페이지에서 호출하지 않음
- **수정:** `authors.map(generatePersonSchema)` 적용

### 12. Organization 스키마 — `logo`, `sameAs`, `@id` 누락 [스키마]
- Knowledge Panel 구축에 필수인 `logo`, 소셜 프로필 링크, `@id` 없음
- **수정:** `generateOrganizationSchema`에 해당 필드 추가

### 13. `/counseling` — Service 스키마 없음 [스키마]
- 상담 프로그램 목록에 `Service` 스키마 미적용
- **수정:** `generateServiceSchema` 함수 생성

### 14. 루트 레이아웃 — 기본 OG 이미지/Twitter 카드 없음 [기술]
- **파일:** `app/layout.tsx:30-50`
- 블로그 외 페이지(about, team, programs 등) 소셜 공유 시 이미지 없음
- **수정:** `public/og-default.png` 생성 + root metadata에 기본 OG/Twitter 추가

### 15. robots.txt에 AI 크롤러 규칙 없음 [기술]
- GPTBot, ClaudeBot, PerplexityBot 등 AI 크롤러 제한 없음
- **영향:** 상담 프로그램 콘텐츠가 AI 훈련 데이터로 사용될 수 있음
- **수정:** AI 크롤러별 `disallow: '/'` 규칙 추가

### 16. OG 이미지 — 슬러그 기반 제목 + 한글 폰트 미로드 [기술]
- **파일:** `app/blog/[category]/[slug]/opengraph-image.tsx`
- 슬러그에서 제목 생성 → 영문 표시. 한글 폰트 미로드 → 깨진 글자
- **수정:** DB에서 실제 제목 조회 + Pretendard 폰트 로드

### 17. 팀/시설 프로필 사진 플레이스홀더 [콘텐츠]
- 상담사 프로필, 시설 사진 모두 빈 `<div>` 플레이스홀더
- **영향:** YMYL 사이트에서 E-E-A-T 경험/전문성 신호 약화
- **수정:** 실제 사진 촬영 후 `next/image` 컴포넌트로 교체

---

## MEDIUM 이슈

### 18. 운영시간 불일치
- `/about`: 평일 10:00-19:00, 토 10:00-15:00
- `/contact`: 평일 09:00-18:00, 주말휴무
- `LocalBusiness` 스키마: 10:00-19:00
- **수정:** `SITE_CONFIG`에 중앙화

### 19. `locale` 불일치 — `ko-KR` vs `ko_KR`
- **파일:** `constants/site.ts:8`
- OG 프로토콜은 `ko_KR` (언더스코어) 요구
- **수정:** `'ko-KR'` → `'ko_KR'`

### 20. 404 페이지 metadata 없음
- **파일:** `app/not-found.tsx`
- `noindex` 미설정, 기본 사이트 타이틀 사용
- **수정:** 전용 metadata + `robots: noindex` 추가

### 21. 블로그 검색 결과 페이지 인덱싱 가능
- **파일:** `app/blog/page.tsx`
- `?search=` 쿼리 파라미터 페이지에 `noindex` 없음
- **수정:** 검색 파라미터 존재 시 `noindex` 동적 설정

### 22. 카테고리 파라미터 미검증 → 중복 콘텐츠 라우트
- **파일:** `app/blog/[category]/[slug]/page.tsx`
- 동일 글이 다른 카테고리 URL로 접근 가능
- **수정:** `category` 파라미터 검증 또는 DB 쿼리에 카테고리 필터 추가

### 23. IndexNow 키 파일 경로 오류
- **파일:** `app/api/indexnow/route.ts`
- 사양상 루트 레벨 `/{key}.txt` 필요하나 `/api/indexnow`에 위치
- **수정:** `public/{key}.txt` 정적 파일로 이동

### 24. FAQ 스키마 — 블로그 본문 내 `<body>` 렌더링 + Article 스키마와 미연결
- **파일:** `components/blog/FAQSection.tsx`
- `<head>` 대신 `<main>` 내부에 별도 `<script>` 태그로 렌더링
- **수정:** PostPage 최상위 SchemaMarkup에 FAQ 스키마 통합

### 25. Article → BlogPosting 타입 변경 권장
- 블로그 콘텐츠에 `BlogPosting`이 더 정확한 시맨틱
- AI/LLM 인용 시스템에서 더 나은 엔터티 분류

### 26. 홈 섹션 `aria-labelledby` 누락
- `HeroSection`, `TrustSection`, `ServiceSection` 등에 없음
- **수정:** 각 섹션의 `<h2>`에 id 추가 + `aria-labelledby` 연결

### 27. `programs/[slug]` 브레드크럼에 raw slug 사용
- `counselor-training` 대신 한글 프로그램명 표시 필요

### 28. `nav` 요소 `aria-label` 누락
- **파일:** `components/layout/Header.tsx:43`
- **수정:** `aria-label="주 메뉴"` 추가

### 29. TrustSection 통계 근거 없음
- "10,000+건 상담", "98% 만족도" 등 출처 미표기
- YMYL 사이트에서 검증 불가 수치는 신뢰도 저하 요인

### 30. 사이트맵 `lastModified`가 모두 `new Date()` (빌드 타임스탬프)
- 정적 페이지의 실제 수정일이 아닌 배포 시간 사용
- **수정:** 실제 발행/수정일로 고정

### 31. 사이트맵 `changeFrequency`/`priority` — Google이 무시하는 필드
- 바이트 낭비. 삭제 가능

### 32. 이메일 주소 불일치
- `/about`: `business@mindfullabs.ai` (폴백)
- `/contact`: `business@mindfullabs.ai` (하드코딩)
- **수정:** `SITE_CONFIG.email`로 통일

---

## LOW 이슈

### 33. loading/error/not-found 페이지 — 존재하지 않는 Tailwind 클래스 사용
### 34. `twitter:site` 핸들 누락
### 35. `generatePageMetadata`에 `twitter` 카드 블록 없음
### 36. Person 스키마에 `knowsAbout`, `hasCredential` 없음
### 37. 내부 페이지에 `WebPage` 스키마 없음
### 38. `about/page.tsx` 인라인 style 속성 (컨벤션 위반)
### 39. KakaoTalk URL 플레이스홀더 (`https://pf.kakao.com` — 채널 ID 없음)
### 40. `hreflang` 미선언 (단일 언어 사이트이므로 낮은 우선순위)
### 41. SchemaMarkup 컴포넌트 — 배열 인덱스를 React key로 사용
### 42. 저작권 "Mindful Labs Inc." — 브랜드명과 불일치
### 43. `/team/[slug]` 동적 페이지 사이트맵 미포함

---

## 수정 우선순위 로드맵

### Phase 1: 즉시 (1-2일) — Critical 이슈
```
[ ] NAP 데이터 중앙화 (SITE_CONFIG에 주소/전화/이메일/운영시간 통합)
[ ] 플레이스홀더 데이터 교체 (contact 페이지 전화번호, 주소)
[ ] 스텁 페이지 noindex 추가 (philosophy, facility)
[ ] Article 스키마 url/mainEntityOfPage/publisher.logo 추가
[ ] LocalBusiness 스키마 완성 (주소, 좌표)
[ ] /privacy, /terms 페이지 생성
```

### Phase 2: 단기 (1주) — High 이슈
```
[ ] generateStaticParams 구현 (모든 동적 라우트)
[x] CSP 헤더 — 제거 결정 (외부 서비스 연동 충돌, XSS 위험 낮음)
[ ] 사이트맵에 정적 상담 페이지 추가
[ ] WebSite 스키마 + SearchAction 추가
[ ] Organization 스키마 보완 (logo, sameAs, @id)
[ ] Person 스키마 team 페이지 적용
[ ] Course 스키마 programs 페이지 적용
[ ] Service 스키마 counseling 페이지 적용
[ ] 기본 OG 이미지 생성 + root metadata 보완
[ ] AI 크롤러 robots.txt 규칙 추가
[ ] OG 이미지 한글 폰트 로드 + DB 제목 조회
```

### Phase 3: 중기 (2-4주) — Medium 이슈
```
[ ] 운영시간/이메일 통일
[ ] locale ko_KR 수정
[ ] 404 metadata 추가
[ ] 검색결과 noindex 처리
[ ] 카테고리 파라미터 검증
[ ] IndexNow 키 파일 경로 수정
[ ] FAQ 스키마 통합
[ ] BlogPosting 타입 변경
[ ] aria-label/labelledby 보완
[ ] 사이트맵 lastModified 실제 날짜 사용
```

### Phase 4: 장기 — 콘텐츠 보강
```
[ ] 실제 시설 사진 촬영 + 업로드
[ ] 상담사 프로필 사진 촬영 + 업로드
[ ] TrustSection 통계 근거 명시
[ ] philosophy/facility 콘텐츠 작성
[ ] programs/[slug] 상세 콘텐츠 작성
```

---

## 감사 도구
- claude-seo:seo-technical (기술 SEO)
- claude-seo:seo-schema (구조화 데이터)
- claude-seo:seo-content (콘텐츠 & 온페이지)
- claude-seo:seo-sitemap (사이트맵 & 크롤링)
