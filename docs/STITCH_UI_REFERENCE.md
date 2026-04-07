# Stitch UI 디자인 레퍼런스

> Stitch MCP로 생성된 UI 디자인의 핵심 패턴을 정리한 개발 레퍼런스 문서.
> 프로젝트 ID: `16849157859419500677`

## 1. 생성된 스크린 목록

### 데스크톱 (8개)
| 페이지 | Screen ID | 비고 |
|--------|-----------|------|
| 홈페이지 | `0e4790550417423eaae75ba600d6690a` | 메인 랜딩 |
| 홈페이지 (변형) | `5b80f062d838463aa3e1501e79c96bd4` | 대안 레이아웃 |
| 블로그 목록 | `c6c6e1c3aa994ebb9a724fec22030906` | 카테고리 필터 + 사이드바 |
| 블로그 상세 | `11882f179ec349c0a37137610638b92b` | TOC + 본문 + CTA |
| 상담 예약/문의 | `ad15ea03f2e74396b0e161a5d52bd76b` | 폼 + 연락처 |
| 교수진 소개 | `730b072b2eae4d80b2de4cbb4a0246ef` | 카드 그리드 |
| 센터소개 | `f23dfa47576f4f48924f145928e970ad` | 비전/미션/시설 |
| 교육 프로그램 | `c92821c3017847dcbfd44d346b37b808` | 프로그램 카드 |

### 상담 프로그램 페이지 (미생성 — Sprint 5에서 Stitch 생성 예정)
| 페이지 | Screen ID | 비고 |
|--------|-----------|------|
| 상담 프로그램 목록 | *(미생성)* | `/counseling` — 프로그램 카드 그리드 |
| 상담 프로그램 상세 | *(미생성)* | `/counseling/[slug]` — 프로그램 소개 + CTA |

### 모바일 (3개)
| 페이지 | Screen ID | 비고 |
|--------|-----------|------|
| 홈페이지 | `554130f484d34073a06776feb81de87b` | 모바일 레이��웃 |
| 블로그 상세 | `44ede4e8fd4b4f4c9064bf68661e8e12` | 모바일 본문 |
| 블로그 목록 | `dd46ed55cb51439bb693a46e0f62bccb` | 모바일 카드 리스트 |

---

## 2. 디���인 토큰 (Stitch 추출)

### 2.1 컬러 시스템 (Material Design 3 기반)

#### Primary (딥 그린)
| 토큰 | 값 | 용도 |
|------|-----|------|
| primary | `#2d6a4f` | 주요 버튼, 링크, 강조 |
| primary-dim | `#1f5e44` | 호버 상태 |
| primary-container | `#b1f0ce` | 배지, 태그 배경 |
| on-primary | `#e6ffee` | primary 위 텍스트 |
| on-primary-container | `#1d5c42` | container 위 텍스트 |

#### Secondary (웜 그레이)
| ���큰 | 값 | 용�� |
|------|-----|------|
| secondary | `#615f59` | 보조 텍스트 |
| secondary-container | `#e7e2da` | 카드 배경, 사이드바 |
| on-secondary | `#fdf8f0` | secondary 위 텍스트 |

#### Tertiary (웜 브라운/코랄)
| 토큰 | 값 | 용도 |
|------|-----|------|
| tertiary | `#8c4f36` | CTA 버튼, 강조 |
| tertiary-container | `#fdae8f` | CTA 배경, 뱃지 |
| on-tertiary | `#fff7f5` | tertiary 위 텍스트 |

#### Surface (배경 계층)
| 토큰 | 값 | 용도 |
|------|-----|------|
| background | `#f9f9f6` | 페이지 배경 |
| surface | `#f9f9f6` | 기본 표면 |
| surface-container-lowest | `#ffffff` | 카드 배경 |
| surface-container-low | `#f3f4f0` | 섹션 배경 |
| surface-container | `#eceeeb` | 중첩 컨테이너 |
| surface-container-high | `#e6e9e5` | 강조 컨테이너 |
| surface-container-highest | `#e0e3df` | 최상위 컨테이너 |
| inverse-surface | `#0d0f0d` | 푸터 배경 |

#### 텍스트
| 토큰 | ��� | 용도 |
|------|-----|------|
| on-surface | `#2f3331` | 본문 텍스트 |
| on-surface-variant | `#5c605d` | 보조 텍스트, 메타 정보 |
| outline | `#777c78` | 테두리, 구분선 |
| outline-variant | `#afb3af` | 약한 테두리 |

#### 시맨틱
| 토큰 | 값 | 용도 |
|------|-----|------|
| error | `#a83836` | 에러 상태 |
| error-container | `#fa746f` | 에러 배경 |

### 2.2 타이포그래피

| 요소 | 폰트 | 용도 |
|------|------|------|
| Headline (h1, h2) | ChangwonDangamRound → Pretendard fallback | 페이지 타이틀, 섹션 제목 |
| Body | Pretendard | 본문, 설명 텍스트 |
| Label | Pretendard | 버튼, 뱃지, 메타 정보 |
| Icon | Material Symbols (FILL:0, wght:400) | → Lucide React로 대체 구현 |

### 2.3 Border Radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| radius-sm | `0.25rem` (4px) | 태그, 뱃지, 입력 필드 |
| radius-md | `0.5rem` (8px) | 버튼, 작은 카드 |
| radius-lg | `0.75rem` (12px) | 카드, 모달, CTA 배너 |
| radius-full | `9999px` | 아바타, 필터 탭 |

### 2.4 Surface 계층 (Elevation)

Stitch 디자인은 그림자 대신 **배경색 계층**으로 깊이감을 표현:
```
페이지 배경 (#f9f9f6)
  └─ 섹션 배경 (#f3f4f0, surface-container-low)
      └─ 카드 (#ffffff, surface-container-lowest)
          └─ 카드 내부 강조 (#e6e9e5, surface-container-high)
```

---

## 3. 페이지별 컴포넌트 패턴

### 3.1 홈페이지 (/)

**Header (sticky)**
- 배경: `surface-container-lowest` (#ffffff)
- 로고: "앤아더라이프" (font-dangam)
- 네비게이션: 수평 링크 (블로그, 센터소개, 교수진, 교육프로그램, 상담예약)
- CTA 버튼: "상담 예약하기" (tertiary #8c4f36, 라운드)

**Hero Section**
- 배경: primary-container → secondary-container 그라디언트
- 대제목: font-dangam, primary (#2d6a4f)
- 부제목: on-surface-variant (#5c605d)
- 버튼 2개: Primary 실선 + Outline

**서비스 카드 (3칼럼)**
- 배경: surface-container-lowest (#ffffff)
- 아이콘: primary (#2d6a4f)
- 그림자: 은은한 surface-tint 기반

**최신 블로그 포스트 (3칼럼)**
- PostCard: 썸네일 (16:9) + 카테고리 뱃지 + 제목 + 발췌 + 메타
- 카테고리 뱃지: primary-container 배경, on-primary-container 텍스트

**교수진 하이라이트 (4칼럼)**
- 배경 섹션: secondary-container (#e7e2da)
- 원형 프로필 사진
- 전문분야 태그: outline 테두리

**신뢰 통계 (4칼럼)**
- 큰 숫자: primary (#2d6a4f), font-dangam
- 라벨: on-surface-variant

**Bottom CTA 배너**
- 배경: primary (#2d6a4f) 또는 그라디언트
- 텍스트: on-primary (#e6ffee)
- 버튼: surface-container-lowest 배경, primary 텍스트

**Footer**
- 배경: inverse-surface (#0d0f0d)
- 텍스트: inverse-on-surface (#9c9d9b)
- 4칼럼 레이아웃

### 3.2 블로그 목록 (/blog)

**카테고리 필터**
- 활성 탭: primary 배경, on-primary 텍스트, radius-full
- 비활성 탭: outline 테두리, on-surface 텍스트

**PostCard 그리드 (3칼럼, gap 24px)**
- 카드: surface-container-lowest, radius-lg, 호버 시 shadow 증가
- 썸네일: 16:9 비율, radius-lg (상단만)
- 카테고리 뱃지: primary-container 배경, 썸네일 위 오버레이
- 제목: on-surface, font-weight 600, 2줄 truncate
- 발췌: on-surface-variant, 2줄 truncate
- 메타: on-surface-variant, 작은 폰트 (작성자 + 날짜 + 읽기시간)

**사이드바 (우측 320px)**
- 검색박스: surface-container 배경, outline 테두리
- 인기 글: 번호 매기기 리스트
- 카테고리: 이름 + 글 수 뱃지
- 뉴스레터 CTA: secondary-container 배경, 이메일 입력 + primary 버튼

**페이지네이션**
- 현재 페이지: primary 배경, radius-full
- 기타: outline 테두리

### 3.3 블로그 상세 (/blog/[category]/[slug])

**2칼럼 레이아웃 (데스크톱)**
- 본문: max-width 720px
- 사이드바 (TOC): 320px, sticky

**포스트 헤더**
- 카테고리 뱃지: primary-container
- H1: font-dangam, on-surface
- 메타: 아바타 + 작성자 + 날짜 + 읽기시간 (on-surface-variant)

**요약 박스 (SummaryBox)**
- "이 글의 핵심" 라벨 + 💡 아이콘
- 배경: tertiary-container (#fdae8f) 또는 secondary-container (#e7e2da)
- 좌측 보더: primary 4px

**TOC (Table of Contents)**
- 배경: surface-container-low
- 활성 항목: primary 텍스트, 좌측 보더 primary
- 비활성: on-surface-variant

**본문 스타일**
- H2: font-dangam, primary
- H3: Pretendard semibold, primary
- 본문: on-surface (#2f3331), line-height 1.8
- blockquote: 좌측 primary 보더, surface-container-low 배경
- 테이블: surface-container-high 헤더, outline 보더

**인라인 CTA (InlineCTA)**
- 배경: secondary-container (#e7e2da)
- 제목: on-surface
- 버튼: tertiary (#8c4f36) 배경

**FAQ 섹션**
- 아코디언: expand_more 아이콘
- 배경: surface-container-low
- 보더: outline-variant

**참고 자료 (ReferencesList)**
- 번호 리스트
- 외부 링크: primary 텍스트 + open_in_new 아이콘

**관련 포스트 (3칼럼)**
- PostCard 동일 패턴

### 3.4 상담 예약/문의 (/contact)

**2칼럼 레이아웃 (60:40)**
- 좌측: 문의 폼
- 우측: 연락처 정보 카드 + 지도

**폼 필드**
- 라벨: on-surface, font-weight 500
- 입력: surface-container-lowest 배경, outline 보더
- 포커스: primary 보더 + primary ring
- 에러: error 보더 + error 텍스트
- 제출 버튼: primary 배경, full-width

**연락처 카드**
- 배경: surface-container-lowest
- 아이콘: primary
- 카카오톡 버튼: #FFE812 배경

**FAQ 아코디언**
- 4개 항목, surface-container-low 배경

### 3.5 교수진 (/team)

**카드 그리드 (3칼럼)**
- 카드: surface-container-lowest, radius-lg
- 원형 프로필 사진: 120px, radius-full
- 전문분야 태그: outline 테두리, radius-full
- "프로필 보기": primary outline 버튼

### 3.6 센터소개 (/about)

**히어로**: 이미지 + 오버레이 (inverse-surface 반투명) + 흰색 텍스트
**비전/미션**: 3칼럼 카드, primary 아이콘
**상담 철학**: 2칼럼 (텍스트 + 이미지), secondary-container 배경
**시설 갤러리**: 2x3 그리드, radius-lg
**찾아오시는 길**: 2칼럼 (지도 + 정보)

### 3.7 교육 프로그램 (/programs)

**프로그램 카드 (수평 레이아웃)**
- 좌측: 썸네일 (정사각형)
- 우측: 상태 뱃지 + 제목 + 강사 + 기간 + 대상 + 설명
- 상태 뱃지: "진행중" (primary), "모집예정" (tertiary-container), "종료" (outline)
- "자세히 보기": primary outline 버튼

---

## 4. 모바일 패턴

### 공통 변경
- Header: 로고 + 햄버거 메뉴 (드로어)
- 카드 그리드: 1칼럼
- 사이드바: 콘텐츠 아래로 이동 또는 숨김
- TOC: 접이식 아코디언
- 플로팅 CTA: 카카오톡 버튼 (우하단, #FFE812)
- 터치 타겟: 최소 48px

### 블로그 목록 (모바일)
- 카테고리 필터: 수평 스크롤 칩
- PostCard: 1칼럼, 풀너비 썸네일

### 블로그 상세 (모바일)
- 본문: 풀너비 (패딩 16px)
- TOC: 접이식 상단
- 관련 포스트: 수평 스크롤

---

## 5. Stitch → 개발 매핑

| Stitch 토큰 | Tailwind 클래스 | CSS 변수 |
|-------------|----------------|----------|
| primary | `text-primary` / `bg-primary` | `var(--primary)` |
| primary-container | `bg-brand-primary-100` | `#b1f0ce` |
| secondary-container | `bg-brand-secondary-100` | `#e7e2da` → `var(--secondary)` |
| tertiary | `text-brand-accent-800` | `#8c4f36` |
| tertiary-container | `bg-brand-accent-200` | `#fdae8f` |
| surface | `bg-background` | `var(--background)` |
| surface-container-lowest | `bg-white` | `#ffffff` |
| surface-container-low | `bg-brand-gray-100` | `#f3f4f0` |
| surface-container | `bg-brand-gray-200` | `#eceeeb` |
| on-surface | `text-foreground` | `var(--foreground)` |
| on-surface-variant | `text-muted-foreground` | `var(--muted-foreground)` |
| outline | `border-border` | `var(--border)` |
| inverse-surface | `bg-brand-gray-900` | `#0d0f0d` |
| radius-lg | `rounded-xl` | `0.75rem` |
| radius-full | `rounded-full` | `9999px` |
| font-heading | `font-heading` / `.font-dangam` | `var(--font-dangam)` |
| font-body | `font-sans` | `var(--font-pretendard)` |

---

*이 문서는 Stitch 디자인 결과를 기반으로 자동 생성되었으며, 개발 시 UI 일관성을 위한 레퍼런스로 사용됩니다.*
*최종 수정: 2026-04-06*
