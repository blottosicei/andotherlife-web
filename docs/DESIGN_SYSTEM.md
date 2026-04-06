# 앤아더라이프 심리상담연구소 — 디자인 시스템

---

## 1. 브랜드 아이덴티티

### 1.1 브랜드 키워드

따뜻한, 편안한, 신뢰감, 전문적인, 안정감

### 1.2 톤앤무드

**따뜻함 + 전문성의 혼합**

심리 상담의 특성상 내담자에게는 치료적 안정감을 주면서도, 전문가 집단에게는 신뢰할 수 있는 학술적 전문성을 동시에 전달해야 합니다.

### 1.3 브랜드 보이스

**공감적이면서 전문적인 어조**

- 어렵거나 거리감 있는 표현 지양
- 내담자의 감정을 인정하는 따뜻한 언어 사용
- 동시에 근거 기반의 신뢰할 수 있는 정보 전달

### 1.4 타겟별 톤 차이

#### 내담자 대상 콘텐츠
- 공감과 부드러움 강조
- 안정감과 희망 메시지
- 접근 가능하고 이해하기 쉬운 표현

#### 전문가/교육생 대상 콘텐츠
- 학술적이고 체계적인 어조
- 신뢰성 있는 근거와 데이터 제시
- 전문 용어 사용 가능

---

## 2. 디자인 토큰 (Design Tokens)

### 2.1 컬러 시스템

Tailwind CSS v4 커스텀 컬러로 정의하며, 각 컬러의 용도와 사용 맥락을 명시합니다.

#### Brand Colors

**Primary: 딥 그린 (#2D6A4F)**
- 용도: 안정감, 치유, 성장, 주요 액션
- 활용: 주요 버튼, 강조 제목, 네비게이션 활성 상태
- 팔레트: primary-50 ~ primary-900 (10단계)
  - primary-50: #F0F5F2 (배경/호버)
  - primary-100: #D4E5DD
  - primary-500: #3D8668
  - primary-700: #2D6A4F (기본)
  - primary-900: #1B3A2A (다크)

**Secondary: 소프트 베이지 (#F5F0E8)**
- 용도: 따뜻함, 편안함, 배경, 카드 배경
- 활용: 섹션 배경, 약화된 강조, CTA 배경
- 팔레트: secondary-50 ~ secondary-900 (10단계)
  - secondary-50: #FDFCF9 (가장 밝음)
  - secondary-100: #F5F0E8 (기본)
  - secondary-300: #E8DCCF
  - secondary-700: #8B7355

**Accent: 웜 코랄/테라코타 (#C17B5F)**
- 용도: 에너지, CTA 강조, 알림, 주목
- 활용: CTA 버튼, 호버 상태, 강조 텍스트, 알림 아이콘
- 팔레트: accent-50 ~ accent-900 (10단계)
  - accent-50: #F9F1ED
  - accent-100: #F0DCD3
  - accent-500: #D89B7F
  - accent-700: #C17B5F (기본)
  - accent-900: #6B3F2F

#### Neutral Colors

**Gray Scale: #FAFAF7 ~ #1A1A1A**
- gray-50: #FAFAF7 — 최상단 배경
- gray-100: #F3F1ED
- gray-200: #E5DFD8 — 구분선, 경계
- gray-300: #D4CAC0 — 비활성 요소
- gray-500: #8B8577 — 보조 텍스트, 메타 정보
- gray-800: #333333 — 본문 텍스트 (높은 대비)
- gray-900: #1A1A1A — 제목, 최고 대비

**사용 규칙:**
- 본문 텍스트: gray-800
- 보조 텍스트: gray-500
- 비활성 상태: gray-300
- 구분선/보더: gray-200
- 배경: gray-50 또는 white

#### Semantic Colors

**Success: 녹색 계열**
- 색상: #10B981
- 용도: 폼 성공 상태, 발행/게시 완료, 확인 표시

**Warning: 주황 계열**
- 색상: #F59E0B
- 용도: 주의 메시지, draft 상태, 보류 중

**Error: 레드 계열**
- 색상: #EF4444
- 용도: 폼 에러, 필수 입력 표시, 경고

**Info: 블루 계열**
- 색상: #3B82F6
- 용도: 정보 알림, 안내 메시지, 추가 정보

### 2.2 타이포그래피

#### 폰트 패밀리

- **기본 폰트:** Pretendard (next/font로 최적화 로드)
- **대체 폰트:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

#### 타입 스케일

모바일 우선 / 데스크탑 스케일:

| 레벨 | 용도 | 모바일 | 데스크탑 | 굵기 | 줄 간격 | 자간 |
|------|------|--------|---------|------|---------|------|
| Display | 히어로 제목 | 36px / 2.25rem | 48px / 3rem | Bold (700) | 1.3 | -0.02em |
| H1 | 페이지 타이틀 | 30px / 1.875rem | 36px / 2.25rem | Bold (700) | 1.3 | -0.02em |
| H2 | 섹션 제목 | 24px / 1.5rem | 30px / 1.875rem | SemiBold (600) | 1.3 | -0.01em |
| H3 | 서브섹션 | 20px / 1.25rem | 24px / 1.5rem | SemiBold (600) | 1.3 | 0 |
| H4 | 카드 제목 | 18px / 1.125rem | 20px / 1.25rem | Medium (500) | 1.4 | 0 |
| Body Large | 블로그 본문 | — | 18px / 1.125rem | Regular (400) | 1.8 | 0 |
| Body | 기본 본문 | 16px / 1rem | 16px / 1rem | Regular (400) | 1.8 | 0 |
| Body Small | 메타, 캡션 | 14px / 0.875rem | 14px / 0.875rem | Regular (400) | 1.6 | 0 |
| Caption | 작은 레이블 | 12px / 0.75rem | 12px / 0.75rem | Regular (400) | 1.5 | 0 |

#### 폰트 굵기

- Regular (400): 본문, 일반 텍스트
- Medium (500): 강조된 본문, 레이블
- SemiBold (600): 소제목
- Bold (700): 제목, 강조

**한글 가독성 최적화:**
- 줄 간격: 본문 1.8, 제목 1.3
- 자간: 제목 -0.02em, 본문 0
- 단어 간격: 자동

### 2.3 간격 시스템 (Spacing)

Tailwind 기본 4px 베이스 (Tailwind scale: 1 = 4px)

| 레벨 | 픽셀 | Tailwind | 용도 |
|------|------|----------|------|
| xs | 4px | 1 | 아이콘 내부 여백, 매우 촘촘한 간격 |
| sm | 8px | 2 | 요소 간 최소 간격, 타이트한 레이아웃 |
| md | 16px | 4 | 카드 내부 패딩, 콘텐츠 기본 간격 |
| lg | 24px | 6 | 섹션 간 간격, 컴포넌트 간 여백 |
| xl | 32px | 8 | 큰 컴포넌트 간 간격, 카드 간 간격 |
| 2xl | 48px | 12 | 섹션 간 명확한 구분 |
| 3xl | 64px | 16 | 페이지 섹션 간 큰 여백 |
| 4xl | 96px | 24 | 히어로 등 대형 여백 |

**적용 원칙:**
- 모바일: 더 촘촘한 간격 (md~lg)
- 데스크탑: 넉넉한 간격 (lg~3xl)
- 블로그 본문: 단락 간 2xl

### 2.4 Border Radius

| 레벨 | 값 | 용도 |
|------|-----|------|
| none | 0 | 직각 필요한 요소 (테이블 등) |
| sm | 4px | 태그, 뱃지, 작은 인라인 요소 |
| md | 8px | 입력 필드, 작은 카드, 버튼 |
| lg | 12px | 카드, 모달, CTA 배너 |
| xl | 16px | 큰 카드, 대형 모달 |
| full | 9999px | 버튼, 아바타, 동그란 요소 |

**원칙:** 딱딱한 직각 최소화, 부드러운 곡선으로 따뜻한 느낌 전달

### 2.5 그림자 (Shadow)

Tailwind 기본 그림자 + 커스텀 정의

| 레벨 | 값 | 용도 |
|------|-----|------|
| sm | 0 1px 2px rgba(0,0,0,0.05) | 미묘한 깊이, 구분 필요한 경우 |
| md | 0 4px 6px rgba(0,0,0,0.07) | 카드 기본 상태 |
| lg | 0 10px 15px rgba(0,0,0,0.1) | 카드 호버, 강조 |
| xl | 0 20px 25px rgba(0,0,0,0.1) | 모달, 팝업, 최상단 레이어 |

**적용 규칙:**
- 카드: md (기본) → lg (호버)
- 모달/팝업: xl
- 텍스트 아래 가는 라인: shadow-sm

### 2.6 브레이크포인트

Tailwind 기본 브레이크포인트 + 커스텀:

| 이름 | 가로 폭 | 대상 | 사용 사례 |
|------|---------|------|----------|
| sm | 640px | 모바일 큰 화면 | 태블릿 이상 진입 시점 |
| md | 768px | 태블릿 | 레이아웃 변경 주요 지점 |
| lg | 1024px | 데스크탑 | 사이드바/2칼럼 레이아웃 |
| xl | 1280px | 와이드 데스크탑 | 최대 콘텐츠 너비 |
| 2xl | 1536px | 초대형 화면 | 추가 여백 처리 |

**반응형 설계 우선순위:**
1. 모바일 기본 (320px ~ 639px)
2. sm 이상 (640px ~)
3. md 이상 (768px ~)
4. lg 이상 (1024px ~)

### 2.7 레이아웃

#### 컨테이너 너비

- **최대 너비:** 1280px (lg 브레이크포인트)
- **블로그 본문 최대 너비:** 720px (최적 읽기 폭)
- **사이드바 너비:** 320px

#### 그리드 시스템

- **그리드:** 12칼럼 시스템
- **거터 (모바일):** 16px (양쪽)
- **거터 (데스크탑):** 24px (양쪽)
- **총 컨테이너 패딩:** 16px * 2 = 32px (모바일) / 24px * 2 = 48px (데스크탑)

#### 페이지 영역별 너비

```
max-width: 1280px (가장 일반적)
  ├─ Header: 100% 컨테이너 너비
  ├─ Main Content: 1280px - 거터
  └─ Footer: 100%

Blog Post Area: max-width: 720px
  └─ 카테고리별 중앙 정렬 + 양옆 sidecar 여백

Sidebar: 320px (md 이상)
  └─ TOC, CTA 위젯 등
```

---

## 3. 컴포넌트 라이브러리

### 3.1 레이아웃 컴포넌트

#### Header

**설명:** 로고 + 네비게이션 + CTA 버튼. 스크롤 시 배경색 변화.

**변형:**
- 기본: 투명 배경
- 스크롤됨: 흰색/secondary 배경 + 그림자

**반응형:**
- 모바일: 햄버거 메뉴 (3줄 아이콘)
- md 이상: 전체 네비게이션 표시

**상태:**
- 기본: 정상 상태
- sticky: 스크롤 시 상단 고정

**접근성:**
- 로고에 alt 텍스트
- 네비게이션 aria-label
- 현재 페이지 aria-current="page"

#### Footer

**설명:** 사이트맵 링크, 연락처, SNS, 저작권

**구조:**
- 4칼럼 (데스크탑): 회사 정보, 빠른 링크, 교육, 연락처
- 2칼럼 (태블릿)
- 1칼럼 (모바일)

**포함 요소:**
- 회사 로고 + 간단한 설명
- 사이트맵 (Home, Blog, About, Team, Programs, Contact)
- 교육 과정 링크
- 상담 문의 CTA
- SNS 링크 (카카오톡, 네이버 블로그, 인스타그램 등)
- 저작권, 개인정보처리방침, 이용약관

**색상:** 흰색 배경 또는 gray-900 (검정)
**텍스트:** gray-700 (연하게)

#### Navigation

**설명:** 메인 메뉴 (홈, 블로그, 소개, 교수진, 프로그램, 문의)

**구조:**
- 수평: 데스크탑
- 수직: 모바일 (햄버거 메뉴 펼침)

**상태:**
- 기본: gray-700
- 호버: primary-700
- 활성: primary-700 + 밑줄 또는 배경

**구현:**
- 데스크탑: navbar에 ul > li > a
- 모바일: Drawer/Modal (슬라이드인)

#### Breadcrumb

**설명:** 경로 표시. 구조화 데이터(BreadcrumbList) 포함.

**예시:**
```
Home > Blog > 심리상담 > 불안장애 관리법
```

**색상:**
- 텍스트: gray-500
- 분리자: gray-300
- 마지막 항목: gray-800 (진함)

**구현:**
- Schema.org BreadcrumbList 마크업 필수
- 모바일에서는 "현재 페이지" 중심으로 축약 가능

### 3.2 블로그 컴포넌트

#### PostCard

**설명:** 썸네일 + 카테고리 뱃지 + 제목 + excerpt + 작성일 + 읽기 시간

**구조:**
```
┌─────────────────────┐
│   [썸네일 이미지]    │
├─────────────────────┤
│ [카테고리 뱃지]      │
│ 제목 (2줄 제한)     │
│ Excerpt 텍스트      │
│ 작성일 · 읽기시간    │
└─────────────────────┘
```

**변형:**
- 기본 (수직): 블로그 목록에 사용
- 피처드 (수평): 메인 슬라이더, 추천 섹션

**상태:**
- 기본: shadow-md
- 호버: shadow-lg + translateY(-4px)

**색상:**
- 배경: white
- 제목: gray-900
- excerpt: gray-600
- 메타: gray-500

**반응형:**
- 모바일: 1칼럼
- md: 2칼럼
- lg: 3칼럼

#### PostContent

**설명:** Markdown → HTML 렌더링 영역

**포함 요소:**
- 제목 (h1, h2, h3 등)
- 단락 (p)
- 나열 (ul, ol)
- 인용구 (blockquote)
- 코드 블록 (pre, code)
- 테이블 (table)
- 이미지 (img)

**스타일 규칙:**
- 본문: gray-800, 16px/1.8
- 제목: primary-700, 굵기 증가
- 인용구: 왼쪽 border primary-700, 배경 secondary-50
- 코드 블록: 배경 gray-100, 전단폭 스크롤 가능
- 테이블: 반응형 래퍼 (수평 스크롤)

**이미지 처리:**
- Next.js Image 컴포넌트 사용
- lazy loading 활성화
- WebP 우선, PNG fallback
- 최대 너비: 100% (블로그 본문 너비 제한)

#### PostMeta

**설명:** 작성일, 카테고리, 태그 목록, 읽기 시간, 작성자 정보

**위치:** 포스트 제목 하단 + 포스트 하단 (공유 버튼 근처)

**표시 항목:**
- 작성일: "2024년 4월 6일" 형식
- 카테고리: 링크 가능
- 태그: 링크 가능 (# 프리픽스)
- 읽기 시간: "약 5분 읽기"
- 작성자: 아바타 + 이름 + 직책

**색상:** gray-500

#### SummaryBox

**설명:** 글 상단 핵심 요약 박스

**구조:**
```
┌─────────────────────────────┐
│ ├─ [Primary Border]         │
│ │                           │
│ │ 글의 핵심 내용을 3~5문장  │
│ │ 으로 요약합니다.          │
│ │                           │
└─────────────────────────────┘
```

**스타일:**
- 배경: secondary-50
- 왼쪽 border: primary-700 (4px)
- 패딩: lg 모든 방향
- 텍스트: gray-800

**사용 규칙:**
- summary 필드가 존재할 때만 표시
- 선택 사항이지만 권장

#### TableOfContents

**설명:** 우측 사이드바의 목차. 현재 스크롤 위치 동적 하이라이트.

**구조 (데스크탑):**
```
우측 고정 사이드바
├─ "목차" 제목
├─ h2 항목 (depth 1)
│  ├─ h3 항목 (depth 2, indent)
│  └─ h3 항목
└─ h2 항목
```

**구조 (모바일):**
- 접이식 (accordion) 형태
- 또는 숨김 처리

**상태:**
- 기본: gray-600
- 활성 (현재 섹션): primary-700 + 굵게
- 호버: primary-600

**기술:**
- Intersection Observer로 스크롤 위치 감지
- smooth scroll 링크

#### RelatedPosts

**설명:** 관련 포스트 3~4개 카드 그리드

**선택 로직:**
1. 같은 카테고리의 최신 포스트
2. 공통 태그가 가장 많은 포스트
3. 최신 발행된 포스트 (fallback)

**배치:**
- 3칼럼 (lg)
- 2칼럼 (md)
- 1칼럼 (모바일)

**카드 구조:** PostCard 동일

#### CategoryFilter

**설명:** 블로그 목록 상단의 카테고리 필터

**변형:**
- 탭 형태: 수평 정렬, 선택한 탭 밑줄
- 칩 형태: 클릭 가능한 작은 뱃지

**상태:**
- 비활성: gray-300, gray-600 텍스트
- 활성: primary-700 배경, white 텍스트

**동작:**
- 클릭 시 URL 파라미터 변경 (useRouter push)
- 초기 로드: URL 파라미터에서 활성 상태 복원

#### ReferencesList

**설명:** 참고 자료/출처 섹션 (포스트 하단)

**구조:**
```
## 참고 자료
1. [제목](https://...)
2. [제목](https://...)
3. [제목](https://...)
```

**스타일:**
- 번호 매기기 (ol)
- 외부 링크 아이콘 (작은 ↗ 아이콘)
- 색상: primary-700 링크, gray-600 설명

**접근성:**
- aria-label="Reference link, opens in new tab"
- target="_blank" + rel="noopener noreferrer"

### 3.3 CTA 컴포넌트

#### InlineCTA

**설명:** 본문 중간 배너. 카테고리별 다른 메시지.

**구조:**
```
┌──────────────────────────────┐
│ [secondary 배경]              │
│                              │
│ "상담이 필요하신가요?"       │
│ 자세한 설명 텍스트           │
│                              │
│          [accent 버튼]        │
│                              │
└──────────────────────────────┘
```

**변형:**
- 내담자 대상: "지금 상담 예약하기" (primary → accent 버튼)
- 전문가 대상: "교육 과정 살펴보기"

**배치:**
- 블로그 본문 중간 (1500~2000자 이후)
- 전체 너비

**색상:**
- 배경: secondary-50 또는 secondary-100
- 제목: primary-700
- 텍스트: gray-800
- 버튼: accent-700

#### BottomCTA

**설명:** 글 하단 풀 와이드 CTA 섹션

**구조:**
```
┌─────────────────────────────────┐
│ [Primary 그라디언트 배경]         │
│                                 │
│        큰 제목 (흰색)           │
│      부연 설명 텍스트            │
│                                 │
│    [Secondary 또는 White 버튼]  │
│                                 │
└─────────────────────────────────┘
```

**카테고리별 메시지:**
- 내담자: "전문가 상담을 받아보세요"
- 전문가: "교육 과정으로 전문성을 높이세요"

**배경:** primary-700 → primary-600 그라디언트 (위에서 아래로)
**텍스트:** white (높은 대비)
**버튼:** outline white 또는 secondary-50

**위치:** 관련 포스트 바로 전

#### SidebarCTA

**설명:** 사이드바에 고정된 위젯

**구조:**
```
┌─────────────────┐
│  [카드 배경]     │
│                 │
│ 제목             │
│ 설명 텍스트      │
│                 │
│  [CTA 버튼]     │
│                 │
└─────────────────┘
```

**변형:**
1. 상담 문의
2. 뉴스레터 구독

**색상:**
- 배경: white 또는 secondary-50
- border: gray-200 또는 shadow-md
- 버튼: primary-700 또는 accent-700

**동작:**
- 데스크탑 lg 이상: 고정 위치
- 모바일: 숨김 또는 하단으로 이동

#### FloatingCTA

**설명:** 우하단 고정 카카오톡 상담 버튼

**구조:**
- 원형 (diameter 56px)
- 카카오톡 아이콘
- 호버 시: 확대 + 텍스트 라벨

**색상:**
- 배경: #FFE812 (카카오톡 노랑) 또는 accent-700
- 아이콘: white 또는 검정

**배치:**
- 우측 하단
- 안전 영역 고려 (px-4 py-4)
- 모바일 특화

**동작:**
- 클릭 시: 카카오톡 상담 링크 또는 채팅 오픈

#### NewsletterPopup

**설명:** 이탈 방지 또는 스크롤 트리거 팝업

**구조:**
```
┌─────────────────────────────┐
│          [X 닫기 버튼]       │
│                             │
│      제목 (또는 이미지)      │
│     설명 텍스트 (2~3줄)      │
│                             │
│  [이메일 입력 필드]          │
│  [구독 버튼]                 │
│                             │
│  [Small Text] 개인정보 동의  │
│                             │
└─────────────────────────────┘
```

**트리거:**
- 페이지 이탈 감지 (exit intent)
- 또는 스크롤 50% 이후

**배경:** 모달 (반투명 오버레이)

**색상:**
- 배경: white
- 제목: gray-900
- 텍스트: gray-700
- 버튼: primary-700

### 3.4 폼 컴포넌트

#### Input

**설명:** 텍스트, 이메일, 전화번호 입력 필드

**상태:**
- 기본: border gray-200, 배경 white
- 포커스: border primary-700, ring primary-100
- 에러: border error-600, ring error-100
- 비활성: border gray-200, 배경 gray-50, 텍스트 gray-400

**스타일:**
- border-radius: md (8px)
- padding: md (16px)
- 폰트: 16px (모바일 줌 방지)

**접근성:**
- id 필수
- label 연결 (htmlFor)
- placeholder 사용 가능 (보조용)

#### Textarea

**설명:** 멀티라인 텍스트. 상담 문의 내용 등.

**특징:**
- 자동 높이 조절 (최소 4줄, 최대 10줄)
- resize: vertical

**상태:** Input과 동일

#### Select

**설명:** 상담 유형, 프로그램 선택 등

**구조:**
```
┌─────────────────────┐
│ 선택하세요 ▼         │
└─────────────────────┘

  [상담 유형 1]
  [상담 유형 2]
  [상담 유형 3]
```

**구현:** Native select 또는 Headless UI Select

**색상:** Input과 동일

#### Button

**설명:** 주요 액션 버튼

**변형:**

| 변형 | 배경 | 텍스트 | 용도 |
|------|------|--------|------|
| Primary (solid) | primary-700 | white | 주요 액션 |
| Secondary (outline) | transparent | primary-700 | 보조 액션 |
| Accent (solid) | accent-700 | white | CTA, 강조 |
| Ghost | transparent | gray-800 | 텍스트만 |
| Link | transparent | primary-700 | 인라인 링크 |

**크기:**
- sm: px-3 py-2, 14px (작은 버튼)
- md: px-4 py-2.5, 16px (기본)
- lg: px-6 py-3, 18px (크고 눈에 띄는)

**상태:**
- 기본: 기본 색상
- 호버: 1단계 어두운 색
- 액티브: 2단계 어두운 색
- 로딩: opacity 0.5, disabled 상태
- 비활성: gray-300, cursor not-allowed

**라운드:** border-radius-md (8px)

**그림자:** shadow-sm 또는 없음

#### FormField

**설명:** Input/Textarea/Select를 감싸는 래퍼

**구조:**
```
┌─────────────────────┐
│ <label>이름</label>  │
│ <input required />   │
│ {error && message}   │
└─────────────────────┘
```

**필드 구성:**
- label: 필수 마크 (*) 포함
- input: 상태에 따라 border 색 변경
- errorMessage: 빨간색 텍스트, 작은 폰트
- helperText: 부연 설명 (optional)

**간격:** mb-4 (필드 간 거리)

### 3.5 공통 컴포넌트

#### Badge

**설명:** 카테고리, 상태 표시

**구조:** 작은 라벨

**변형:**
- filled: 배경 colored, white 텍스트
- outline: 배경 transparent, border colored

**색상:** 카테고리별 자동 매핑
- 상담: primary
- 교육: accent
- 이론: secondary
- 기타: gray

**크기:**
- sm: px-2 py-1, 12px
- md: px-3 py-1.5, 14px

#### Tag

**설명:** 태그 목록. 클릭 가능. 작은 칩 형태.

**구조:** Badge보다 약간 큼

**색상:** gray-200 배경, gray-700 텍스트
**호버:** gray-300 배경, primary-700 링크

**기능:** 클릭 시 해당 태그로 필터링

#### Avatar

**설명:** 교수진/상담사 프로필 사진

**구조:** 원형 (1:1 비율)

**크기:**
- sm: 32px
- md: 48px
- lg: 96px

**폴백:** 이니셜 또는 기본 아이콘 (이미지 없을 때)

**색상:** border gray-200

#### Card

**설명:** 범용 카드 컨테이너

**구조:**
```
┌─────────────────────┐
│ [카드 배경]          │
│ ├─ 제목              │
│ ├─ 콘텐츠           │
│ └─ 버튼              │
└─────────────────────┘
```

**변형:**
- 기본: 배경 white, shadow-md
- 호버 가능: shadow-md → shadow-lg, 커서 pointer
- 피처드: 배경 secondary-50, border gray-200

**padding:** md (16px) 모든 방향

**border-radius:** lg (12px)

#### ShareButtons

**설명:** 포스트 공유 버튼 (카카오톡, 트위터, 페이스북, 링크 복사)

**구조:**
```
공유하기: [KakaoTalk] [Twitter] [Facebook] [Copy Link]
```

**아이콘:** 색깔 있는 아이콘 또는 gray-600

**기능:**
- 카카오톡: Web 메시지 API
- Twitter: intent 링크
- Facebook: Share 다이얼로그
- 링크 복사: clipboard API + 토스트 알림

**배치:** 포스트 하단, PostMeta 옆

---

## 4. 페이지별 레이아웃 가이드

### 4.1 홈페이지

**섹션 구성:**

1. **히어로 섹션**
   - 풀 너비, 최소 높이 60vh
   - 배경: 소프트 그라디언트 (primary-50 → secondary-50) 또는 일러스트
   - 콘텐츠: 큰 제목 (Display) + 서브타이틀 + 2개 CTA 버튼
   - 텍스트: 왼쪽 정렬 또는 중앙

2. **서비스 소개**
   - 3칼럼 카드 그리드 (md: 2칼럼, 모바일: 1칼럼)
   - 각 카드: 아이콘 + 제목 + 설명 (max 100자)
   - 배경: gray-50 또는 white

3. **최신 포스트**
   - "최근 업데이트된 콘텐츠" 제목
   - 4칼럼 PostCard 그리드 또는 캐러셀
   - 모바일: 스크롤 캐러셀

4. **교수진/상담사**
   - 아바타 (lg) + 이름 + 전문분야
   - 가로 스크롤 (캐러셀) 또는 3칼럼
   - 호버 시 약력 표시 또는 상세 페이지 링크

5. **신뢰 요소 (Trust Signals)**
   - 3~4개 숫자 카운터
   - 예: 상담 건수, 수료생 수, 커뮤니티 멤버, 만족도
   - 큰 숫자 + 라벨 + 설명

6. **하단 CTA**
   - BottomCTA 컴포넌트
   - Primary 배경, 흰색 텍스트
   - "지금 상담 예약하기" 또는 "교육 과정 신청"

### 4.2 블로그 목록

**레이아웃:**
- 데스크탑 lg: 2칼럼 (좌측 포스트 + 우측 사이드바)
- 태블릿 md: 1칼럼 + 사이드바 (아래로)
- 모바일: 1칼럼, 사이드바 숨김

**상단 섹션:**
- Breadcrumb 네비게이션
- 페이지 제목 + 설명
- CategoryFilter 탭/칩

**포스트 영역:**
- PostCard 그리드 또는 리스트
- 각 카드: 축약 레이아웃

**사이드바 (우측):**
- 검색 박스 (선택)
- 인기 카테고리
- 태그 클라우드
- SidebarCTA (상담 문의 또는 뉴스레터)

**하단:**
- 숫자 페이지네이션 (1, 2, 3... 다음)
- 또는 "더보기" 버튼 (무한 스크롤)

### 4.3 블로그 상세

**상단 섹션:**
1. Breadcrumb
2. 제목 (h1, Display 크기)
3. PostMeta (작성일, 카테고리, 태그, 읽기 시간)
4. 대표 이미지 (16:9 비율, full width)
5. SummaryBox (있을 경우)

**본문 영역 (lg 이상):**
- 좌측: 본문 콘텐츠 (최대 720px)
- 우측: TableOfContents (고정 사이드바)

**본문 콘텐츠:**
- PostContent (Markdown 렌더링)
- 중간에 InlineCTA 삽입
- 코드 블록, 이미지, 테이블 포함

**하단 섹션:**
1. PostMeta + ShareButtons
2. ReferencesList (참고 자료)
3. FAQ 섹션 (있을 경우)
4. BottomCTA
5. RelatedPosts (관련 포스트)

**모바일 레이아웃:**
- TableOfContents: 접이식 또는 숨김
- InlineCTA: 적절한 위치에 전체 너비로
- 사이드바 CTA: 하단으로 이동

### 4.4 교수진/상담사

**목록 페이지:**
- 카드 그리드 (3칼럼 → 2칼럼 → 1칼럼)
- 각 카드: Avatar (lg) + 이름 + 직책 + 전문분야 (태그)
- 호버 시 shadow-lg + 상세 페이지 링크

**상세 페이지:**
```
좌측                        우측
┌──────────────┐    ┌──────────────┐
│ 프로필 사진   │    │ 이름          │
│ (lg avatar)  │    │ 직책/자격증   │
│              │    │ 전문분야      │
│              │    │              │
│              │    │ 소개 텍스트   │
│              │    │ (약 200자)    │
│              │    │              │
│              │    │ 연락처        │
│              │    │ 상담 예약     │
└──────────────┘    └──────────────┘
```

### 4.5 교육 프로그램

**목록 페이지:**
- 카드 리스트 또는 그리드
- 각 카드:
  - 프로그램 썸네일
  - 제목
  - 상태 뱃지 (진행중/예정/종료)
  - 간단한 설명
  - 링크

**상세 페이지:**
1. 히어로 섹션 (프로그램 제목 + 배경)
2. 프로그램 정보 (기간, 시간, 비용, 대상)
3. 커리큘럼 (타임라인 또는 표)
4. 강사 정보 (Avatar + 이름 + 프로필)
5. 수강 신청 CTA
6. FAQ

---

## 5. 애니메이션 가이드라인

### 5.1 애니메이션 라이브러리

**Framer Motion** 사용

### 5.2 애니메이션 패턴

**페이지 전환:**
- 타입: fade-in
- 지속: 200ms
- 커브: ease-out

**카드 호버:**
- 타입: translateY(-4px) + shadow 증가
- 지속: 200ms
- 커브: ease-out

**CTA 등장 (스크롤 트리거):**
- 타입: slide-up + fade-in
- 지속: 300ms
- 커브: ease-out
- 트리거: Intersection Observer

**모달 열기:**
- 배경: fade-in (200ms)
- 모달: scale(0.95 → 1) + fade-in (200ms)
- 커브: ease-out

**로딩 인디케이터:**
- 타입: 스핀 또는 펄스
- 지속: 1~2초 루프
- 색상: primary-700

### 5.3 애니메이션 원칙

- **부드럽고 미묘하게:** 과한 움직임 금지
- **목적 명확:** 시각적 계층 강화 또는 상호작용 피드백
- **성능 우선:** GPU 가속화 (transform, opacity만 사용)
- **접근성:** prefers-reduced-motion 존중

**구현 예시:**
```jsx
// prefers-reduced-motion 존중
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animationProps = prefersReducedMotion ? { duration: 0 } : { duration: 0.2 };
```

---

## 6. 접근성 가이드라인

### 6.1 기준

WCAG 2.1 AA 준수

### 6.2 컬러 대비

| 요소 | 최소 대비도 |
|------|-----------|
| 본문 텍스트 (14px 이상) | 4.5:1 |
| 대형 텍스트 (18px Bold 이상) | 3:1 |
| UI 컴포넌트 / 그래픽 | 3:1 |

**검증 도구:** WebAIM Contrast Checker, axe DevTools

### 6.3 키보드 네비게이션

- 모든 인터랙티브 요소 (버튼, 링크, 폼) 포커스 가능
- 탭 순서 논리적 (left-to-right, top-to-bottom)
- focus indicator: outline primary-700 (2px)
- Focus trap: 모달에서는 포커스 갇기

**구현:**
```jsx
<button className="focus:outline-2 focus:outline-offset-2 focus:outline-primary-700">
  CTA 버튼
</button>
```

### 6.4 스크린 리더 지원

**시맨틱 HTML:**
- `<header>`, `<nav>`, `<main>`, `<footer>` 사용
- `<h1>`, `<h2>`, `<h3>` 계층 유지
- `<button>`, `<a>` 적절히 사용

**ARIA 속성:**
- aria-label: 아이콘 버튼에 필수
- aria-labelledby: 제목과 콘텐츠 연결
- aria-describedby: 추가 설명 제공
- aria-current="page": 현재 페이지 표시
- aria-expanded: 접이식 요소 상태
- aria-live: 동적 콘텐츠 업데이트

**이미지 alt 텍스트:**
- 모든 이미지에 alt 속성 필수
- 장식용: alt="" (빈 값)
- 콘텐츠용: 이미지 설명 (50~125자)

### 6.5 폼 접근성

- 모든 input에 label 연결 (htmlFor)
- 필수 필드: aria-required="true" 또는 required
- 에러 메시지: aria-describedby 연결
- 폼 전체: fieldset + legend 고려

**구현:**
```jsx
<label htmlFor="email">이메일 주소</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
  aria-describedby="email-error"
/>
{error && <span id="email-error">{error.message}</span>}
```

### 6.6 동영상/멀티미디어

- 자막 제공 (영상)
- 텍스트 대안 (오디오)
- 자동 재생 금지

---

## 7. 이미지 가이드라인

### 7.1 대표 이미지 (Thumbnail)

**소스:** Nanobanana2 생성 일러스트

**특징:**
- 텍스트 없음 (제목 등은 오버레이로)
- 파스텔 톤 (따뜻한 색상)
- 심리 상담 관련 주제 (사람, 감정, 성장 등)

**크기:** 1200 x 630px (16:9 비율 권장)

**파일:**
- 형식: WebP (우선), PNG (fallback)
- 최적화: TinyPNG, ImageOptim
- 경로: `/public/images/posts/{slug}.webp`

### 7.2 Open Graph 이미지

**생성:** 대표 이미지 배경 + 반투명 오버레이 + 제목/카테고리/로고

**구조:**
```
배경: 대표 이미지 (1200 x 630px)
오버레이: 검정 반투명 (opacity 0.3)

텍스트:
- 제목 (상단, 40px bold)
- 카테고리 (중앙, 24px)
- 로고 (좌하단)
```

**생성 방법:** next-og (npm 패키지) 또는 Vercel OG

### 7.3 프로필 사진

**요구사항:**
- 비율: 1:1 (정사각형)
- 최소: 200 x 200px
- 권장: 400 x 400px 이상

**특징:**
- 얼굴이 중앙에 위치
- 밝은 배경 (배경 제거 또는 원형 마스킹)

**파일:** WebP (우선), JPEG (fallback)

### 7.4 시설 사진

**비율:** 16:9
**최소:** 1280 x 720px
**특징:** 자연광, 따뜻한 톤, 전문성 있는 분위기

### 7.5 최적화 규칙

**파일 형식:**
- WebP 우선 (모던 브라우저, 더 작은 크기)
- PNG fallback (투명 필요 시)
- JPEG 최소화 (WebP로 대체)
- AVIF (선택, 매우 작음)

**Lazy Loading:**
```jsx
import Image from 'next/image';

<Image
  src="/images/posts/post-slug.webp"
  alt="포스트 제목"
  width={1200}
  height={630}
  loading="lazy"
  priority={false}  // 위쪽 이미지는 priority={true}
/>
```

**크기 명시:**
- 항상 width, height 지정 (Layout Shift 방지)
- Next.js Image 컴포넌트 사용 (자동 최적화)

**로컬 이미지:**
```jsx
import postImage from '@/public/images/posts/post-slug.webp';

<Image src={postImage} alt="..." />
```

---

## 8. 개발 체크리스트

### 8.1 브랜드 일관성

- [ ] 컬러 팔레트가 모든 컴포넌트에 일관되게 적용됨
- [ ] 타이포그래피 스케일이 휴대폰/데스크톱 모두에서 올바름
- [ ] 간격 시스템이 4px 베이스를 따름
- [ ] 모든 아이콘/이미지가 따뜻한 톤 유지

### 8.2 반응형 설계

- [ ] 모바일 (320px) 테스트 완료
- [ ] 태블릿 (768px) 테스트 완료
- [ ] 데스크톱 (1024px+) 테스트 완료
- [ ] 터치 타겟 최소 48px 확인

### 8.3 접근성

- [ ] WCAG AA 대비도 검증 (WebAIM Contrast Checker)
- [ ] 키보드 네비게이션 가능 확인
- [ ] 스크린 리더 테스트 (NVDA, JAWS)
- [ ] 모든 이미지에 alt 텍스트 있음
- [ ] prefers-reduced-motion 존중

### 8.4 성능

- [ ] 이미지 최적화 (WebP, lazy loading)
- [ ] Core Web Vitals 측정 (Lighthouse)
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 달성
- [ ] 번들 크기 최소화 (Code Splitting)

### 8.5 SEO 메타데이터

- [ ] 모든 페이지에 title, description 태그
- [ ] Open Graph 이미지 생성
- [ ] BreadcrumbList Schema 마크업
- [ ] 모바일 최적화 확인 (Mobile-Friendly Test)

---

## 9. 수정 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|----------|
| 1.0 | 2024-04-06 | 초기 문서 작성 |

---

*이 디자인 시스템 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
