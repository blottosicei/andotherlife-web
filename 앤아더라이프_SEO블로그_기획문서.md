# 앤아더라이프 심리상담연구소 — SEO 블로그 웹사이트 기획 문서

**프로젝트명:** 앤아더라이프 심리상담연구소 웹사이트
**작성일:** 2026년 4월 6일
**버전:** v1.4 (이미지 생성 전략 — 나노바나나2 + OG Image 이중 활용 구조 추가)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목적
앤아더라이프 심리상담연구소의 온라인 거점으로서, SEO 최적화된 대규모 블로그 콘텐츠를 통해 심리상담이 필요한 내담자(예비 클라이언트)와 전문 상담사를 유입시키고, 상담 예약·교육 프로그램 수강·리드 수집 등의 전환 목표를 달성하는 웹사이트를 구축한다.

### 1.2 핵심 원칙

1. **SEO 퍼스트(SEO-First):** 모든 설계와 코드는 검색엔진 최적화 성능을 최우선으로 한다. Core Web Vitals, 구조화 데이터, 메타 태그, 사이트맵 등 기술적 SEO가 완벽하게 작동해야 한다.
2. **전환 중심 설계(Conversion-Driven):** 블로그로 유입된 사용자가 의도한 CTA(상담 예약, 교육 신청, 뉴스레터 구독)로 자연스럽게 유도되어야 한다.
3. **콘텐츠 자동화(Content Automation):** 블로그 콘텐츠는 Supabase DB에서 대규모로 관리하며, Claude Skills를 통해 키워드 리서치 → 콘텐츠 생성 → SEO 최적화 → 자동 발행까지 전 과정이 자동화된다.

### 1.3 타겟 사용자

| 구분 | 타겟 | 우선순위 | 핵심 니즈 | 주요 CTA |
|------|------|----------|-----------|----------|
| Primary | 심리상담이 필요한 내담자(예비 클라이언트) | ★★★ | 심리적 어려움 해결, 정보 탐색, 상담사 찾기 | 상담 예약/문의 |
| Secondary | 현직 상담 전문가 | ★★ | 보수교육, 수퍼비전, 전문성 향상 | 교육 프로그램 수강 신청 |

---

## 2. 기술 스택

### 2.1 프론트엔드: Next.js 15+ (App Router)

**선택 근거:**
- Vercel 배포에 최적화된 네이티브 지원
- App Router의 Server Components로 초기 로딩 속도 극대화
- SSG(Static Site Generation)로 블로그 페이지 사전 렌더링 → SEO 최적화
- ISR(Incremental Static Regeneration)로 대규모 콘텐츠의 효율적 갱신
- 내장 Image Optimization, Font Optimization으로 Core Web Vitals 최적화
- 내장 Metadata API로 페이지별 메타 태그 자동 관리

**핵심 라이브러리:**
- **UI 프레임워크:** Tailwind CSS v4 (유틸리티 퍼스트, 빠른 빌드)
- **컴포넌트:** shadcn/ui (접근성 기본 내장, 커스터마이징 용이)
- **상태 관리:** Zustand (가볍고 단순한 상태 관리)
- **폼 처리:** React Hook Form + Zod (타입 안전한 폼 검증)
- **애니메이션:** Framer Motion (부드러운 마이크로 인터랙션)
- **아이콘:** Lucide React

### 2.2 백엔드/DB: Supabase

**역할:** 블로그 콘텐츠 CMS + 사용자 데이터 관리

- **블로그 콘텐츠 저장:** 게시글, 카테고리, 태그, 메타데이터
- **예약/문의 데이터:** 상담 예약 및 문의 폼 데이터 저장
- **교육 프로그램 신청:** 수강 신청 데이터 관리
- **뉴스레터 구독자:** 이메일 리드 수집 및 관리
- **Analytics 이벤트:** 사용자 행동 데이터 저장 (선택사항)
- **Edge Functions:** 콘텐츠 발행 자동화 API, Webhook 처리

### 2.3 배포 및 관리: Vercel

- 자동 배포 (Git Push → 빌드 → 배포)
- Edge Network를 통한 글로벌 CDN
- ISR을 통한 대규모 블로그 페이지 효율적 관리
- Analytics & Speed Insights 내장
- 커스텀 도메인 연결

### 2.4 콘텐츠 자동화: Claude Skills

- **키워드 리서치:** 타겟 키워드 분석 및 콘텐츠 주제 도출
- **콘텐츠 생성:** SEO 최적화된 블로그 글 자동 작성
- **메타데이터 생성:** title, description, OG 태그, 구조화 데이터 자동 생성
- **스케줄 발행:** 정기적 콘텐츠 생성 및 Supabase 저장 → 자동 발행

---

## 3. 사이트 구조 (Information Architecture)

### 3.1 페이지 맵

```
/ (홈)
├── /blog (블로그 목록)
│   ├── /blog/[category] (카테고리별 목록)
│   │   └── /blog/[category]/[slug] (개별 포스트)
│   └── /blog/tag/[tag] (태그별 목록)
├── /about (센터 소개)
│   ├── /about/philosophy (상담 철학)
│   └── /about/facility (시설 안내)
├── /team (교수진/상담사 소개)
│   └── /team/[slug] (개별 프로필)
├── /programs (교육 프로그램)
│   └── /programs/[slug] (프로그램 상세)
├── /contact (상담 예약/문의)
├── /sitemap.xml (자동 생성)
└── /robots.txt
```

### 3.2 페이지별 상세 사양

#### 홈페이지 (/)
- 히어로 섹션: 브랜드 메시지 + 핵심 CTA (상담 예약)
- 최신 블로그 포스트 캐러셀 (3~6개)
- 센터 핵심 서비스 소개 (상담/교육/연구)
- 교수진 하이라이트
- 신뢰 요소: 자격증, 수료 현황, 후기 등
- 하단 CTA 배너: 상담 문의 유도

#### 블로그 (/blog)
- **카테고리 필터링:** 탭 또는 사이드바 카테고리 네비게이션
- **검색 기능:** 키워드 기반 블로그 내 검색
- **페이지네이션:** 무한 스크롤 또는 숫자 페이지네이션 (SEO 고려 시 숫자 페이지네이션 권장)
- **포스트 카드:** 썸네일, 제목, 발췌, 카테고리, 작성일, 읽기 시간
- **사이드바:** 인기 글, 카테고리, CTA 배너

#### 개별 블로그 포스트 (/blog/[category]/[slug])
- 제목, 작성일, 카테고리, 태그, 읽기 시간
- 요약 박스: summary 필드 기반 핵심 내용 미리보기
- 본문 (Markdown → HTML 렌더링, 테이블 포함 시 반응형 래퍼 적용)
- TOC (Table of Contents) 자동 생성
- 관련 포스트 추천 (같은 카테고리/태그 기반)
- CTA 삽입 포인트: 본문 중간 + 하단 (카테고리별 다른 CTA)
- 참고 자료 섹션: 아웃링크 출처 목록 (references JSONB → 자동 렌더링)
- 소셜 공유 버튼
- 구조화 데이터 (Article, BreadcrumbList, FAQ 등)

#### 센터 소개 (/about)
- 연구소 비전, 미션, 핵심 가치
- 상담 철학 및 접근법
- 시설 사진 갤러리
- 오시는 길 (카카오맵/네이버맵 임베드)

#### 교수진/상담사 소개 (/team)
- 카드 그리드 레이아웃
- 프로필 사진, 이름, 직책, 전문 분야
- 개별 프로필 페이지: 학력, 경력, 자격증, 전문 영역 상세

#### 교육 프로그램 (/programs)
- 프로그램 카드 목록 (진행 중/예정/종료 상태 표시)
- 상세 페이지: 커리큘럼, 일정, 대상, 수강료, 강사 정보
- 수강 신청 CTA → 문의 폼 또는 외부 결제 페이지 연결

#### 상담 예약/문의 (/contact)
- 문의 폼: 이름, 연락처, 이메일, 상담 유형, 희망 일시, 문의 내용
- 전화 / 카카오톡 상담 연결 버튼
- 운영 시간 안내
- 오시는 길

---

## 4. 블로그 콘텐츠 전략

### 4.1 콘텐츠 카테고리 설계

| 카테고리 | 타겟 | 콘텐츠 예시 | CTA |
|----------|------|-------------|-----|
| 마음건강 | 내담자 | "불안할 때 시도할 수 있는 5가지 방법", "번아웃 자가진단 체크리스트" | 상담 예약/문의 |
| 심리상담 이야기 | 내담자 | "상담은 어떤 과정으로 진행되나요?", "첫 상담 전 알아야 할 것들" | 상담 예약/문의 |
| 관계/소통 | 내담자 | "부부갈등 해결을 위한 소통법", "직장 내 인간관계 스트레스 관리" | 상담 예약/문의 |
| 아동·청소년 | 내담자(부모) | "아이의 분리불안, 언제 전문가를 찾아야 할까", "청소년 우울증 신호" | 상담 예약/문의 |
| 자기성장 | 내담자 | "자존감을 높이는 일상 습관", "마음챙김 명상 시작 가이드" | 뉴스레터 구독 |
| 상담사 전문가 칼럼 | 전문가 | "상담 기법 심층 분석", "수퍼비전의 중요성" | 교육 프로그램 신청 |
| 교육·자격 정보 | 전문가 | "심리상담사 자격증 종류와 취득 과정", "보수교육 일정 안내" | 교육 프로그램 신청 |

### 4.2 콘텐츠 규모 및 발행 계획

- **초기 목표:** 500편 이상의 SEO 최적화 블로그 콘텐츠
- **발행 전략:** 프로그래매틱 SEO 방식으로 키워드 클러스터별 대량 생산
- **자동 발행:** 초기 대량 발행 이후 Claude Skills 스케줄 기반 정기 자동 발행 (일 1~3편)
- **콘텐츠 길이:** SEO 기준 1,500~3,000자 (한국어 기준)
- **콘텐츠 형식:** 본문 내 Markdown 테이블을 적극 활용하여 비교·수치·목록형 정보를 구조화 (아래 4.5절 참고)

### 4.3 SEO 키워드 전략

**키워드 계층 구조:**
- **메인 키워드:** 심리상담, 심리치료, 심리상담센터, 상담사
- **롱테일 키워드:** "불안장애 상담", "부부상담 효과", "아동심리상담 비용" 등
- **정보성 키워드:** "우울증 증상", "공황장애 대처법", "MBTI와 심리상담"
- **지역 키워드:** "[지역명] 심리상담센터", "[지역명] 심리치료"

**키워드 클러스터링:**
하나의 필러 콘텐츠(포괄적 가이드)를 중심으로 여러 클러스터 콘텐츠(세부 주제)를 내부 링크로 연결하는 토픽 클러스터 구조를 사용한다.

### 4.4 아웃링크(외부 링크) 전략

심리상담 콘텐츠는 Google YMYL(Your Money Your Life) 카테고리에 해당하므로, E-E-A-T(경험·전문성·권위성·신뢰성) 시그널 강화를 위해 신뢰할 수 있는 외부 소스로의 아웃링크가 필수적이다.

**아웃링크 대상 기관 (Tier별 분류):**

| Tier | 대상 | 예시 | 용도 |
|------|------|------|------|
| Tier 1 (학술/의료) | 학회, 연구기관, 학술 DB | 대한심리학회, 한국상담심리학회, APA, PubMed, 국립정신건강센터 | 연구 근거, 통계 수치, 진단 기준 인용 |
| Tier 2 (정부/공공) | 정부 기관, 공공 서비스 | 보건복지부, 정신건강복지센터, 자살예방상담전화(1393), 정신건강위기상담전화(1577-0199) | 공공 자원 안내, 긴급 연락처, 제도 정보 |
| Tier 3 (업계/자격) | 자격 발급기관, 협회 | 한국산업인력공단, 한국상담학회, 각 대학원 상담 프로그램 | 자격증 정보, 교육 과정, 전문가 대상 콘텐츠 |

**아웃링크 적용 규칙:**
- 블로그 포스트 1편당 최소 2~5개의 아웃링크를 포함한다
- 모든 아웃링크는 `rel="noopener noreferrer"`, `target="_blank"` 속성을 적용하여 사이트 이탈을 방지한다
- 광고성·제휴 링크는 `rel="sponsored"`, 사용자 생성 콘텐츠 링크는 `rel="ugc"`를 적용한다
- 글 하단에 "참고 자료" 섹션을 두어 본문에서 인용한 출처를 구조화하여 표시한다
- 아웃링크 대상 URL의 유효성을 주기적으로 검증하여 깨진 링크(404)를 방지한다

**콘텐츠 유형별 아웃링크 전략:**
- **내담자 대상 (마음건강, 관계/소통 등):** 공공기관 자원 + 학술 연구 인용 → 콘텐츠 신뢰도 강화 + 독자에게 실질적 도움
- **전문가 대상 (전문가 칼럼, 교육·자격 등):** 학술 논문 + 학회/협회 + 자격 기관 → 전문성 입증 + 정보 정확성
- **아동·청소년 카테고리:** 정부 가이드라인 + 교육부/여성가족부 자료 → YMYL 신뢰 시그널 극대화

### 4.5 본문 내 테이블(표) 활용 전략

비교·수치·목록형 정보가 포함되는 콘텐츠에는 Markdown 테이블을 적극 삽입한다. 테이블은 Google Featured Snippet(검색 결과 상단 요약 박스) 채택률을 높이고, 사용자 가독성을 크게 향상시킨다.

**테이블 삽입이 효과적인 콘텐츠 유형:**
- 비교형: "우울증 vs 번아웃 차이점", "개인상담 vs 집단상담 비교"
- 정보 정리형: "심리상담사 자격증 종류와 요건", "상담 유형별 특징과 비용"
- 체크리스트형: "번아웃 자가진단 체크리스트", "아동 심리 발달 단계별 특성"
- 수치형: "연령별 상담 이용 통계", "상담 기법별 효과 연구 요약"

**자동 생성 규칙:**
- Claude Skills 콘텐츠 생성 프롬프트에 "비교, 목록, 수치 데이터가 포함되는 주제는 Markdown 테이블을 삽입하라"는 규칙을 명시한다
- 테이블 포함 콘텐츠 비율 목표: 전체 블로그 글의 30~40%

**렌더링 처리:**
- Markdown → HTML 변환 시 `<table>` 태그를 반응형 래퍼(`<div style="overflow-x: auto">`)로 감싸서 모바일 가로 스크롤 이슈를 방지한다
- 테이블에 적절한 `<thead>`, `<th>` 구조를 보장하여 접근성(Accessibility)과 SEO 크롤링을 모두 충족한다

### 4.6 AEO(답변 엔진 최적화) 콘텐츠 구조 규칙

심리상담 콘텐츠는 Google AI Overview, ChatGPT Search, Perplexity 등 AI 답변 엔진에서 인용(citation)될 가능성을 극대화하기 위해 AEO 최적화 규칙을 적용한다. AEO는 기존 SEO와 병행하며, AI가 콘텐츠를 청크 단위로 파싱하고 인용하는 특성에 맞춘 구조 설계이다.

**핵심 원칙: 자기 완결적 청크(Self-Contained Unit)**
AI 답변 엔진은 글 전체를 인용하지 않고 섹션 단위로 잘라서 인용한다. 따라서 각 H2/H3 섹션이 다른 섹션을 참조하지 않고도 독립적으로 의미가 완결되어야 한다.

**섹션 길이 규칙:**
- H2/H3 소제목 사이의 본문: **200~350자(한국어 기준, 영문 120~180 words)** 유지
- 이 범위의 섹션이 AI 인용률 70% 더 높음 (AirOps 연구 기반)
- 200자 미만: 맥락 부족으로 인용 가치 저하
- 400자 초과: AI가 하나의 단위로 추출하기 어려움 → 소제목을 나눠서 분리

**두괄식 인용 블록(Citation Block) 규칙:**
- 모든 H2/H3 섹션의 첫 1~2문장에 **80~120자(한국어 기준, 영문 40~60 words)의 직접 답변**을 배치
- 이 첫 문장이 AI가 실제로 잘라가는 "인용 블록"이 됨
- 예시: "공황장애는 예상치 못한 상황에서 갑작스러운 극심한 공포와 함께 심장 박동 증가, 호흡 곤란 등의 신체 증상이 나타나는 불안장애의 한 유형이다." → AI가 바로 답변으로 활용 가능
- 나머지 문장에서 보충 설명, 예시, 근거를 덧붙이는 구조

**질문형 소제목(Question-Based Headings) 규칙:**
- H2/H3 소제목은 사용자가 실제로 검색하거나 AI에게 물어볼 법한 질문형으로 작성
- 질문형 소제목이 마케팅적 표현 대비 AI 인용률 2.8배 높음 (AirOps 연구 기반)
- 좋은 예: "공황장애란 무엇인가요?", "공황발작이 올 때 어떻게 대처하나요?"
- 나쁜 예: "당신의 마음을 지키는 방법", "불안에서 벗어나는 여정"

**FAQ 섹션 필수 포함:**
- 모든 블로그 포스트 하단에 FAQ 섹션(3~5개 질문)을 기본 포함
- 각 질문당 1~3문장 내 명확한 답변 제시
- FAQPage 구조화 데이터(Schema)를 적용하여 AI 엔진의 Q&A 추출 최적화
- FAQ는 AEO에서 가장 영향력 높은 최적화 요소 중 하나

**콘텐츠 신선도(Freshness) 관리:**
- 분기별로 업데이트하지 않은 페이지는 AI 인용 상실 확률 3배 증가 (AirOps 연구)
- 콘텐츠 최적화 스킬이 분기마다 기존 콘텐츠를 리프레시 (통계 업데이트, 최신 연구 반영, `updated_at` 갱신)
- `updated_at` 필드 갱신 시 구조화 데이터의 `dateModified`도 자동 업데이트

### 4.7 콘텐츠 메타 필드 활용 전략 (summary · keywords)

자동 생성되는 각 블로그 포스트에 SEO 및 사이트 내 활용을 위한 추가 메타 필드를 포함한다.

**summary (본문 요약):**
- 본문 핵심 내용을 3~5문장(200~400자)으로 요약한 별도 필드
- 기존 `excerpt`(메타 디스크립션, 155자)와는 다른 용도로 활용
- 활용처: 블로그 목록 포스트 카드 미리보기, 포스트 상단 요약 박스, 구조화 데이터 `description`, 뉴스레터 발송 시 콘텐츠 요약

**keywords (타겟 SEO 키워드 배열):**
- 해당 글이 타겟하는 SEO 키워드 목록 (TEXT[] 배열, 3~7개)
- 태그(tags)는 사용자 탐색용 분류, keywords는 SEO 타겟 키워드로 역할이 다름
- 활용처:
  - Supabase 풀텍스트 검색 인덱싱 → 사이트 내 블로그 검색 정확도 향상
  - 콘텐츠 중복(카니발리제이션) 방지 → 새 글 생성 전 기존 키워드와 비교
  - SEO 성과 추적 → Search Console 데이터와 매칭하여 글 단위 유입 분석
  - 관련 포스트 추천 알고리즘의 보조 시그널 (태그 + keywords 교차 매칭)

### 4.8 이미지 생성 전략 (나노바나나2 + OG Image)

블로그 대표 이미지는 나노바나나2(Nano Banana 2, Google Gemini 기반) API로 자동 생성하고, OG 이미지는 Next.js 내장 ImageResponse API로 대표 이미지를 배경 삼아 자동 합성한다.

**생성 도구:** 나노바나나2 API (Gemini 3 Flash Image)
- 1K 해상도 기준 이미지당 약 $0.067 (Batch API 사용 시 50% 할인)
- 초기 500편 기준 예상 비용: $17~$34
- 최대 14장의 스타일 레퍼런스 이미지 입력 지원 → 그림체 일관성 확보

**이미지 스타일 규칙:**
- 따뜻한 수채화/파스텔 톤의 미니멀 일러스트 (브랜드 톤앤무드와 일치)
- 텍스트 일절 포함하지 않음 (다목적 활용을 위해)
- 브랜드 컬러(딥 그린, 소프트 베이지, 웜 코랄)와 조화되는 색감
- 스타일 레퍼런스 이미지 2~3장을 사전 제작하여 모든 생성 요청에 함께 전달

**파일명 규칙:**
- 파일명은 해당 게시글의 `slug`와 동일하게 지정: `{slug}.webp`
- slug는 posts 테이블에서 UNIQUE이므로 파일명 충돌 없음
- 예시: `panic-disorder-coping-methods.webp`
- DB 레코드와 이미지 파일의 1:1 매칭으로 관리 용이

**Supabase Storage 구조:**
```
storage/
└── blog-images/
    └── thumbnails/
        ├── panic-disorder-coping-methods.webp
        ├── depression-early-symptoms.webp
        └── ...
```
- `thumbnail_url` 값: `{SUPABASE_URL}/storage/v1/object/public/blog-images/thumbnails/{slug}.webp`

**이중 활용 구조:**

1. **블로그 대표 이미지 (텍스트 없는 원본):**
   - 나노바나나2로 생성한 일러스트를 그대로 본문 상단에 표시
   - `thumbnail_url` 필드에 Supabase Storage URL 저장

2. **OG 이미지 (텍스트 오버레이 합성):**
   - Next.js `opengraph-image.tsx`에서 `thumbnail_url`의 일러스트를 배경으로 불러옴
   - 반투명 오버레이(그라디언트) + 글 제목 + 카테고리 + 앤아더라이프 로고를 레이어링
   - 1200x630px 사이즈, Vercel Edge Runtime에서 실시간 렌더링
   - `og_image_url` 필드가 null이면 자동 생성, 값이 있으면 커스텀 이미지 사용

**이미지 생성 프롬프트 구조:**
```
[고정 스타일 프롬프트]
"Minimal warm watercolor illustration, soft pastel tones with beige and muted green,
 no text, no letters, no words, clean composition, gentle and calming mood"

+ [스타일 레퍼런스 이미지 2~3장 첨부]

+ [주제별 소재 키워드 — 콘텐츠 생성 스킬이 글 주제에서 자동 추출]
예: "a person breathing calmly in nature, soft light, serene atmosphere"
```

---

## 5. 데이터베이스 설계 (Supabase)

### 5.1 핵심 테이블 구조

#### `posts` (블로그 게시글)
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                    -- 게시글 제목
  slug TEXT UNIQUE NOT NULL,              -- URL 슬러그
  excerpt TEXT,                           -- 발췌/요약 (메타 디스크립션 겸용)
  content TEXT NOT NULL,                  -- 본문 (Markdown, 테이블 포함 가능)
  summary TEXT,                           -- 본문 요약 (3~5문장, 200~400자)
  keywords TEXT[] DEFAULT '{}',           -- 타겟 SEO 키워드 배열 (3~7개)
  category_id UUID REFERENCES categories(id),
  thumbnail_url TEXT,                     -- 대표 이미지 URL (Supabase Storage: blog-images/thumbnails/{slug}.webp)
  author_id UUID REFERENCES authors(id),
  status TEXT DEFAULT 'draft',            -- draft | published | archived
  meta_title TEXT,                        -- SEO 메타 타이틀
  meta_description TEXT,                  -- SEO 메타 디스크립션
  og_image_url TEXT,                      -- OG 커스텀 이미지 URL (null이면 thumbnail_url 기반 자동 생성)
  schema_markup JSONB,                    -- 구조화 데이터 (Article, FAQ 등)
  references JSONB DEFAULT '[]'::jsonb,   -- 아웃링크 참고 자료 [{name, url, type, description}]
  cta_type TEXT DEFAULT 'consultation',   -- 카테고리별 CTA 유형
  reading_time INTEGER,                   -- 읽기 시간 (분)
  view_count INTEGER DEFAULT 0,          -- 조회수
  is_featured BOOLEAN DEFAULT FALSE,      -- 인기글/추천글 여부
  published_at TIMESTAMPTZ,               -- 발행일
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `categories` (카테고리)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                     -- 카테고리명
  slug TEXT UNIQUE NOT NULL,              -- URL 슬러그
  description TEXT,                       -- 카테고리 설명
  target_audience TEXT,                   -- 'client' | 'professional'
  default_cta_type TEXT,                  -- 기본 CTA 유형
  seo_title TEXT,                         -- 카테고리 페이지 SEO 타이틀
  seo_description TEXT,                   -- 카테고리 페이지 SEO 디스크립션
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `tags` (태그)
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `post_tags` (게시글-태그 관계)
```sql
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
```

#### `authors` (작성자/상담사)
```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,                             -- 직책
  bio TEXT,                               -- 소개
  profile_image_url TEXT,
  credentials TEXT[],                     -- 자격증 목록
  specialties TEXT[],                     -- 전문 분야
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `contact_inquiries` (상담 문의)
```sql
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  counseling_type TEXT,                   -- 상담 유형
  preferred_date TEXT,                    -- 희망 일시
  message TEXT,
  source_url TEXT,                        -- 유입 페이지 URL
  utm_source TEXT,                        -- UTM 파라미터
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',              -- new | contacted | scheduled | completed
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `program_registrations` (교육 프로그램 신청)
```sql
CREATE TABLE program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  affiliation TEXT,                       -- 소속
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `newsletter_subscribers` (뉴스레터 구독)
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source_url TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);
```

### 5.2 인덱스 전략
```sql
-- 블로그 성능 최적화 인덱스
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_posts_category ON posts(category_id, published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured, published_at DESC) WHERE is_featured = TRUE;
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

-- keywords 기반 검색 및 중복 방지용 GIN 인덱스
CREATE INDEX idx_posts_keywords ON posts USING GIN(keywords);

-- summary + content 풀텍스트 검색용 인덱스 (한국어)
CREATE INDEX idx_posts_fulltext ON posts USING GIN(
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, ''))
);
```

### 5.3 RLS (Row Level Security) 정책
- 게시글 읽기: `status = 'published'`인 글만 공개 접근 허용
- 게시글 쓰기/수정: 인증된 관리자만 가능
- 문의/신청 데이터: 쓰기는 공개(anon), 읽기는 관리자만

---

## 6. SEO 기술 설계

### 6.1 Core Web Vitals 최적화

| 지표 | 목표 | 구현 방법 |
|------|------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | Next.js Image Optimization, 폰트 프리로드, 서버 컴포넌트 |
| INP (Interaction to Next Paint) | < 200ms | 클라이언트 JS 최소화, 코드 스플리팅 |
| CLS (Cumulative Layout Shift) | < 0.1 | 이미지 크기 명시, 폰트 fallback 설정 |

### 6.2 메타 태그 전략

모든 페이지에 다음 메타 태그를 자동 생성:
- `<title>` — 60자 이내, 핵심 키워드 포함
- `<meta name="description">` — 155자 이내, CTA 포함
- Open Graph 태그 (og:title, og:description, og:image, og:url, og:type)
- Twitter Card 태그
- Canonical URL
- hreflang (한국어 단일이므로 `ko`)

### 6.3 구조화 데이터 (Schema.org)

| 페이지 유형 | Schema 유형 | 주요 필드 |
|-------------|-------------|-----------|
| 홈페이지 | Organization, LocalBusiness | name, address, telephone, openingHours |
| 블로그 포스트 | Article, BreadcrumbList | headline, author, datePublished, image |
| FAQ 콘텐츠 | FAQPage | question, acceptedAnswer |
| 교수진 프로필 | Person | name, jobTitle, affiliation |
| 교육 프로그램 | Course, Event | name, description, provider, startDate |

### 6.4 사이트맵 및 크롤링 최적화

- **동적 사이트맵:** `sitemap.xml`을 Next.js에서 자동 생성 (Supabase에서 게시글 목록 조회)
- **robots.txt:** 크롤링 허용/차단 규칙 설정
- **내부 링크 전략:** 토픽 클러스터 기반 자동 내부 링크 생성
- **Breadcrumb:** 모든 페이지에 Breadcrumb 네비게이션 (SEO + UX)
- **URL 구조:** `/{category}/{slug}` 형태의 의미 있는 URL

### 6.5 성능 최적화

- **이미지:** Next.js Image 컴포넌트 (WebP/AVIF 자동 변환, lazy loading)
- **폰트:** `next/font`로 한글 웹폰트 최적화 (Pretendard 또는 Noto Sans KR)
- **번들 최적화:** Dynamic import, Tree shaking, Code splitting
- **캐싱:** ISR revalidation 전략 (블로그: 1시간, 정적 페이지: 24시간)
- **Prefetch:** 뷰포트 내 링크 자동 프리페치

---

## 7. 전환(CTA) 설계

### 7.1 전환 퍼널

```
[검색 유입] → [블로그 포스트 열람] → [CTA 노출] → [전환 액션]
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
             [상담 예약/문의]      [교육 프로그램 신청]     [뉴스레터 구독]
              (내담자 대상)        (전문가 대상)           (리드 수집)
```

### 7.2 CTA 배치 전략

| 위치 | CTA 유형 | 설명 |
|------|----------|------|
| 블로그 본문 중간 | 인라인 CTA 배너 | 콘텐츠와 관련된 맥락적 CTA |
| 블로그 하단 | 풀 와이드 CTA 섹션 | 카테고리별 다른 CTA (상담 vs 교육) |
| 사이드바 | 고정 CTA 위젯 | 상담 문의 또는 뉴스레터 구독 |
| 플로팅 버튼 | 카카오톡 상담 | 모바일 특화 즉시 상담 연결 |
| 팝업/슬라이드인 | 이탈 방지 팝업 | 페이지 이탈 시 뉴스레터 구독 유도 |
| 헤더 | 고정 CTA 버튼 | "상담 예약하기" 글로벌 CTA |

### 7.3 카테고리별 CTA 매핑

카테고리의 `target_audience`에 따라 자동으로 다른 CTA가 표시된다:
- **내담자 대상 콘텐츠:** "지금 상담 예약하기", "무료 상담 문의"
- **전문가 대상 콘텐츠:** "교육 과정 살펴보기", "수강 신청하기"
- **공통:** "뉴스레터 구독으로 최신 콘텐츠 받기"

---

## 8. 콘텐츠 자동화 파이프라인

### 8.1 자동화 아키텍처

```
[키워드 리서치]     Claude Skills (Ahrefs 연동)
       ↓
[콘텐츠 기획]       키워드 클러스터별 주제 선정
       ↓
[콘텐츠 생성]       Claude Skills로 SEO 최적화 글 자동 작성
       ↓
[아웃링크 삽입]     신뢰 기관 참고 자료 자동 매칭 + 본문 삽입 + references 필드 생성
       ↓
[아웃링크 검증]     삽입된 아웃링크 URL에 HTTP 요청 → 200 확인, 실패 시 대체 URL 또는 제거
       ↓
[요약·키워드 생성]  본문 기반 summary(3~5문장) + keywords(타겟 SEO 키워드 배열) 자동 추출
       ↓
[AEO 구조 검증]    섹션별 길이(200~350자), 두괄식 인용 블록, 질문형 소제목, FAQ 포함 여부 확인
       ↓
[메타데이터 생성]   meta title, description, OG tags, Schema(Article + FAQPage) 자동 생성
       ↓
[대표 이미지 생성]  나노바나나2 API로 텍스트 없는 일러스트 생성 → Supabase Storage 업로드 ({slug}.webp)
       ↓
[Supabase 저장]    posts 테이블에 draft 상태로 저장 (thumbnail_url에 Storage URL 포함)
       ↓
[검수 (선택)]       필요 시 사람이 검수 후 published로 변경
       ↓
[자동 발행]         status를 published로 변경 → ISR이 자동 반영
       ↓
[사이트맵 갱신]     Next.js가 sitemap.xml 자동 업데이트
```

### 8.2 Claude Skills 역할

1. **블로그 콘텐츠 생성 스킬:** 키워드, 카테고리, CTA 유형을 입력받아 SEO+AEO 최적화된 블로그 포스트를 자동 생성. 출력 항목: 제목, 본문(AEO 구조 규칙 적용 — 두괄식 인용 블록, 질문형 소제목, 섹션당 200~350자, FAQ 필수 포함), 요약, 타겟 키워드, 메타데이터, 구조화 데이터(Article + FAQPage), 아웃링크 참고 자료, 대표 이미지. 비교·수치형 주제는 본문 내 Markdown 테이블을 자동 삽입. 아웃링크 삽입 후 URL 유효성을 HTTP 요청으로 검증(200이 아닌 경우 대체 URL 탐색 또는 제거). 대표 이미지는 글 주제에서 시각적 소재 키워드를 추출하여 나노바나나2 API로 생성 후 Supabase Storage에 `{slug}.webp`로 업로드
2. **스케줄 발행 스킬:** 주기적으로 새로운 콘텐츠를 생성하고 Supabase에 자동 저장
3. **콘텐츠 최적화 스킬:** 기존 콘텐츠의 SEO/AEO 성능을 분석하고 메타데이터/내부 링크/아웃링크 개선 제안. 분기별 콘텐츠 리프레시(통계 업데이트, 최신 연구 반영, 깨진 아웃링크 교체, `updated_at` 및 구조화 데이터 `dateModified` 갱신) 수행
4. **아웃링크 검증 스킬:** 발행된 전체 콘텐츠의 아웃링크 URL 유효성을 주기적으로 검증하고, 깨진 링크(404)를 감지하여 대체 URL로 자동 교체하거나 알림 발송

### 8.3 Supabase Edge Function 연동

```
/functions/publish-post    → 게시글 상태 변경 + Vercel ISR 리밸리데이션 트리거
/functions/submit-inquiry  → 상담 문의 접수 + 이메일 알림 발송
/functions/subscribe       → 뉴스레터 구독 처리
```

---

## 9. 디자인 가이드

### 9.1 디자인 톤앤무드: 따뜻함 + 전문성

**디자인 키워드:** 따뜻한, 편안한, 신뢰감, 전문적인, 안정감

**컬러 팔레트 (제안):**
- **Primary:** 따뜻한 딥 그린 계열 (#2D6A4F) — 안정감, 치유, 성장
- **Secondary:** 소프트 베이지/크림 (#F5F0E8) — 따뜻함, 편안함
- **Accent:** 웜 코랄/테라코타 (#C17B5F) — 에너지, CTA 강조
- **Neutral:** 차콜 그레이 (#333333) — 본문 텍스트
- **Background:** 라이트 크림 (#FAFAF7) — 부드러운 배경

> ※ 기존 브랜드 자산(로고, 색상)이 있으므로 실제 구현 시 브랜드 가이드에 맞춰 조정

### 9.2 타이포그래피

- **본문:** Pretendard (가독성 최적화 한글 폰트)
- **제목:** Pretendard Bold 또는 별도 세리프 폰트 (전문성 강조)
- **본문 크기:** 16px (모바일) / 18px (데스크탑)
- **줄 간격:** 1.8 (한글 가독성 최적화)

### 9.3 레이아웃 원칙

- **모바일 퍼스트:** 반응형 디자인, 모바일 → 태블릿 → 데스크탑
- **블로그 포스트:** 최대 720px 본문 너비 (최적 읽기 폭)
- **충분한 여백:** 콘텐츠 간 넉넉한 spacing으로 편안한 느낌
- **부드러운 곡선:** border-radius 활용, 딱딱한 직각 최소화
- **이미지 스타일:** 따뜻한 톤의 일러스트 또는 자연/인물 사진

---

## 10. 프로젝트 디렉토리 구조

```
andtoherlife-web/
├── app/
│   ├── layout.tsx                 # 루트 레이아웃 (글로벌 메타, 폰트, 네비게이션)
│   ├── page.tsx                   # 홈페이지
│   ├── blog/
│   │   ├── page.tsx               # 블로그 목록
│   │   ├── [category]/
│   │   │   ├── page.tsx           # 카테고리별 목록
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # 개별 포스트
│   │   │       └── opengraph-image.tsx  # 동적 OG 이미지 (thumbnail 배경 + 제목 오버레이)
│   │   └── tag/[tag]/
│   │       └── page.tsx           # 태그별 목록
│   ├── about/
│   │   └── page.tsx               # 센터 소개
│   ├── team/
│   │   ├── page.tsx               # 교수진 목록
│   │   └── [slug]/
│   │       └── page.tsx           # 개별 프로필
│   ├── programs/
│   │   ├── page.tsx               # 프로그램 목록
│   │   └── [slug]/
│   │       └── page.tsx           # 프로그램 상세
│   ├── contact/
│   │   └── page.tsx               # 상담 예약/문의
│   ├── sitemap.ts                 # 동적 사이트맵 생성
│   └── robots.ts                  # robots.txt 설정
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Breadcrumb.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   ├── PostMeta.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── RelatedPosts.tsx
│   │   └── CategoryFilter.tsx
│   ├── cta/
│   │   ├── InlineCTA.tsx          # 본문 중간 CTA
│   │   ├── BottomCTA.tsx          # 하단 CTA 섹션
│   │   ├── SidebarCTA.tsx         # 사이드바 CTA
│   │   ├── FloatingCTA.tsx        # 플로팅 카카오톡 버튼
│   │   └── NewsletterPopup.tsx    # 뉴스레터 팝업
│   ├── forms/
│   │   ├── ContactForm.tsx        # 상담 문의 폼
│   │   ├── ProgramForm.tsx        # 수강 신청 폼
│   │   └── NewsletterForm.tsx     # 뉴스레터 구독 폼
│   ├── seo/
│   │   ├── SchemaMarkup.tsx       # 구조화 데이터 컴포넌트
│   │   └── MetaHead.tsx           # 메타 태그 유틸
│   └── ui/                        # shadcn/ui 컴포넌트
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Supabase 클라이언트
│   │   ├── server.ts              # 서버 사이드 클라이언트
│   │   └── queries.ts             # DB 쿼리 함수
│   ├── seo/
│   │   ├── metadata.ts            # 메타데이터 생성 유틸
│   │   ├── schema.ts              # 구조화 데이터 생성
│   │   └── sitemap.ts             # 사이트맵 생성 유틸
│   └── utils/
│       ├── markdown.ts            # Markdown → HTML 변환
│       ├── reading-time.ts        # 읽기 시간 계산
│       └── date.ts                # 날짜 포맷 유틸
├── styles/
│   └── globals.css                # 글로벌 스타일 + Tailwind
├── public/
│   ├── images/
│   └── fonts/
├── supabase/
│   ├── migrations/                # DB 마이그레이션 파일
│   └── functions/                 # Edge Functions
├── .env.local                     # 환경 변수
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. 개발 로드맵

### Phase 1: 기반 구축 (1~2주)
- Next.js 프로젝트 초기 설정 + Tailwind + shadcn/ui
- Supabase 프로젝트 생성 + DB 스키마 마이그레이션
- Vercel 배포 파이프라인 구축
- 기본 레이아웃 (Header, Footer, Navigation) 개발

### Phase 2: 핵심 페이지 개발 (2~3주)
- 블로그 목록/상세 페이지 (SSG + ISR)
- 센터 소개, 교수진 페이지
- 교육 프로그램 페이지
- 상담 예약/문의 폼

### Phase 3: SEO 최적화 (1~2주)
- 구조화 데이터 전체 구현
- 동적 사이트맵/robots.txt
- Core Web Vitals 최적화 및 검증
- 메타 태그 자동 생성 시스템

### Phase 4: CTA 및 전환 최적화 (1주)
- 카테고리별 CTA 시스템 구현
- 폼 처리 + Supabase 저장
- 플로팅 CTA, 뉴스레터 팝업

### Phase 5: 콘텐츠 자동화 (1~2주)
- Claude Skills 블로그 생성 스킬 구축
- 스케줄 기반 자동 발행 파이프라인
- 초기 500편 콘텐츠 대량 생성 및 발행

### Phase 6: QA 및 런칭 (1주)
- 크로스 브라우저/디바이스 테스트
- SEO 감사 (Lighthouse, PageSpeed Insights)
- Google Search Console 등록 + 사이트맵 제출
- 네이버 서치어드바이저 등록
- 프로덕션 배포 및 모니터링

---

## 12. 추천 도구 및 커넥터

### 12.1 이미 연결된 도구
- **Supabase MCP** ✅ — DB 관리, 마이그레이션, Edge Functions 직접 조작 가능

### 12.2 연결 추천 도구

| 도구 | 용도 | 우선순위 |
|------|------|----------|
| **Vercel MCP** | 배포 관리, 프로젝트 모니터링, 배포 이벤트 확인 | ★★★ |
| **Ahrefs MCP** | SEO 분석, 키워드 리서치, 백링크 분석, 경쟁사 분석 | ★★★ |
| **Marketing Plugin** | SEO 감사, 콘텐츠 작성, 캠페인 기획, 경쟁 분석 | ★★ |

### 12.3 Claude Skills 구축 계획

| 스킬명 | 역할 | 트리거 |
|--------|------|--------|
| `blog-content-generator` | SEO 최적화 블로그 포스트 생성 → Supabase 저장 | 키워드/카테고리 입력 |
| `blog-auto-publisher` | 스케줄 기반 정기 콘텐츠 생성 + 발행 | 일일/주간 스케줄 |
| `seo-meta-optimizer` | 기존 콘텐츠의 메타데이터/구조화 데이터 최적화 | SEO 분석 결과 기반 |

---

## 13. 성공 지표 (KPI)

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 월간 오가닉 트래픽 | 런칭 6개월 내 월 10,000+ 세션 | Google Analytics |
| Core Web Vitals | 모든 지표 "Good" 등급 | PageSpeed Insights |
| 블로그 → 상담 문의 전환율 | 1% 이상 | Supabase + GA 이벤트 |
| 블로그 → 교육 신청 전환율 | 0.5% 이상 | Supabase + GA 이벤트 |
| 뉴스레터 구독 전환율 | 2% 이상 | Supabase 구독자 수 |
| 인덱싱 비율 | 발행 콘텐츠의 95% 이상 인덱싱 | Google Search Console |
| 평균 검색 순위 | 주요 키워드 TOP 10 | Ahrefs / Search Console |

---

*본 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
