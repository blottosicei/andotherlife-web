# 블로그 원스톱 발행

주제: $ARGUMENTS

## 지시사항

"$ARGUMENTS" 주제로 키워드 리서치부터 발행까지 한 번에 수행하세요. 주제가 비어 있으면 1단계에서 자동 추천합니다.

---

## 1단계: 키워드 리서치 (DataForSEO 실 데이터)

### 1-1. 주제가 없는 경우 (자동 추천)

주제가 비어 있거나 "$ARGUMENTS"가 빈 문자열이면:

1. 기회 키워드 분석을 실행하세요:

```bash
python3 scripts/seo-analysis/opportunity_scorer.py --top 10 --output scripts/seo-opportunities.json
```

2. 결과에서 기회 점수가 높은 상위 3개 키워드를 사용자에게 추천하세요
3. 사용자가 선택하면 해당 키워드로 아래 단계를 계속 진행하세요

### 1-2. 주제가 있는 경우 (DataForSEO 리서치)

1. DataForSEO로 실제 검색 데이터를 조회하세요:

```bash
python3 scripts/seo-analysis/keyword_research.py "$ARGUMENTS" --expand --serp --output scripts/keyword-report.json
```

2. `scripts/keyword-report.json`을 읽고 사용자에게 요약을 보여주세요:
   - 핵심 키워드 검색량/경쟁도
   - 추천 보조 키워드 (검색량 기준)
   - SERP 경쟁 분석 (상위 결과 제목, 평균 길이)
   - 기회 점수 상위 키워드

3. 리서치 결과에서 아래를 결정하세요:
   - **핵심 키워드** 1-2개 (검색량 높고 경쟁도 낮은 것)
   - **보조 키워드** 3-5개
   - **추천 카테고리** (`context/internal-links-map.md` 참조)
   - **타겟 독자** (내담자 client / 전문가 professional)
   - **CTA 전략** (연결할 상담 프로그램 또는 교육)
   - **FAQ 후보** 4-6개 (DataForSEO 관련 질문 데이터 활용)

리서치 요약을 사용자에게 보여준 뒤, 바로 2단계로 진행하세요.

---

## 2단계: SEO 최적화 블로그 작성

아래 파일들을 읽으세요:
- `context/brand-voice.md` — 톤앤매너, 금지 표현
- `context/style-guide.md` — 작문 규칙, 포맷팅
- `context/seo-guidelines.md` — SEO 기준
- `context/internal-links-map.md` — 내부 링크 전략

1단계의 실 데이터(검색량, SERP 경쟁 분석)를 반영하여 블로그 글을 작성하세요:

### 작성 규칙
- 본문 2,000-4,000자, H2 5-8개
- 첫 문단에 핵심 키워드 포함, 최소 2개 H2에 키워드 포함
- SERP 상위 결과 평균 길이를 참고하여 본문 길이 조절
- `context/brand-voice.md`의 톤앤매너 준수 (따뜻하고 전문적, YMYL 안전 규칙)
- `context/style-guide.md`의 포맷팅 준수 (문단 3-5문장, 이모지 금지)
- meta_title 30-60자, meta_description 120-155자
- 내부 링크 2-4개 (`context/internal-links-map.md` 참조)
- 외부 링크 1-3개 (학술/정부/전문기관)
- FAQ 4-6개 (1단계에서 선정한 후보 활용)
- 참조(references) 1-5개
- URL 슬러그: 영문 소문자, 하이픈, 3-5단어

### YMYL 안전 점검
- 의료 진단/처방 표현 금지
- "전문가와 상담하세요" 권유 포함
- 자해/자살 관련 시 위기상담 전화번호(1393, 109) 안내

### 출력

아래 JSON 형식으로 `scripts/content.json`에 저장하세요:

```json
{
  "categorySlug": "카테고리 슬러그",
  "targetAudience": "client 또는 professional",
  "status": "published",
  "skipImage": false,
  "content": {
    "title": "글 제목",
    "slug": "url-slug",
    "content": "## H2 제목\n\n본문...",
    "excerpt": "155자 이내 발췌",
    "summary": "200-400자 요약",
    "keywords": ["핵심키워드", "보조키워드1", "보조키워드2"],
    "meta_title": "SEO 메타 타이틀",
    "meta_description": "SEO 메타 디스크립션",
    "faq": [{"question": "질문?", "answer": "답변"}],
    "references": [{"name": "기관명", "url": "URL", "type": "academic|government|industry", "description": "설명"}],
    "visual_keywords": ["이미지 생성용 영문 키워드"]
  }
}
```

---

## 3단계: 인링크 삽입 (기존 블로그 글 연결)

content.json 저장 후, 본문에 기존 발행 글로의 내부 링크를 삽입합니다.

### 3-1. 인링크 후보 키워드 추출

본문에서 인링크를 걸 수 있는 키워드를 추출하세요:
- `content.keywords`에 포함된 키워드
- 본문에 등장하는 주요 심리학 용어 (우울증, 번아웃, 자존감, 부부 갈등 등)
- 단, 현재 글의 핵심 주제 키워드는 제외 (자기 참조 방지)

### 3-2. 후보 글 조회

추출한 키워드 각각에 대해 Supabase에서 관련 발행 글을 조회하세요:

```sql
SELECT id, slug, title, excerpt, keywords, category_id
FROM posts
WHERE status = 'published'
  AND keywords @> ARRAY['키워드']::text[]
ORDER BY published_at DESC
LIMIT 3
```

각 키워드별로 최대 3개 후보 글을 가져옵니다.

### 3-3. 최적 글 선택 (본문 읽기 기반)

후보 글이 2개 이상이면, 각 글의 `excerpt`(또는 본문 앞 500자)를 읽고 판단하세요:
- 현재 글의 문맥에서 해당 키워드를 클릭한 독자가 **가장 자연스럽게 읽을 글**은 무엇인가?
- 키워드를 깊이 있게 다루는 글 우선
- 비슷한 글이면 최신 글 우선

### 3-4. 인링크 삽입

선택된 글을 본문에 마크다운 링크로 삽입하세요.

**삽입 규칙:**
- 각 키워드의 **첫 번째 등장 위치만** 링크 (중복 금지)
- **최대 4개** 인링크 (너무 많으면 SEO 불이익)
- **H2/H3 헤딩 안에는 삽입하지 않음** (헤딩 링크는 SEO 불이익)
- **이미 마크다운 링크 `[...](...)`인 텍스트는 스킵**
- **한 문단에 2개 이상 링크 금지**
- 긴 키워드 우선 매칭 ("우울증 극복" > "우울증")
- 링크 URL 형식: `/blog/{category-slug}/{post-slug}`

**삽입 예시:**

변경 전:
```
직장에서의 스트레스가 지속되면 번아웃으로 이어질 수 있습니다.
심한 경우 우울증 증상이 나타나기도 합니다.
```

변경 후:
```
직장에서의 스트레스가 지속되면 [번아웃](/blog/mental-health/burnout-recovery)으로 이어질 수 있습니다.
심한 경우 [우울증](/blog/mental-health/understanding-depression) 증상이 나타나기도 합니다.
```

### 3-5. 결과 보고 및 content.json 업데이트

삽입된 인링크 목록을 사용자에게 보여주세요:
```
🔗 인링크 삽입 결과:
  1. "번아웃" → /blog/mental-health/burnout-recovery (본문 3번째 문단)
  2. "우울증" → /blog/mental-health/understanding-depression (본문 5번째 문단)
```

인링크가 삽입된 본문으로 `scripts/content.json`의 `content.content`를 업데이트하세요.

후보 글이 없는 키워드는 스킵하고, 발행된 글이 아직 없어서 인링크를 삽입할 수 없는 경우 "⏭️ 인링크 스킵 (발행된 글 없음)"으로 안내하세요.

---

## 4단계: SEO 분석 + 발행

### 4-1. SEO 점수 확인

```bash
python3 scripts/seo-analysis/analyze.py scripts/content.json --output scripts/seo-report.json
```

결과에 따라:
- **A/B 등급 (70점 이상):** 바로 발행 진행
- **C 등급 (50-69점):** 권장 사항을 반영하여 content.json을 수정한 뒤 재분석. 2회 시도 후에도 C등급이면 사용자에게 진행 여부 확인
- **D/F 등급 (49점 이하):** 콘텐츠를 수정하고 재분석. 사용자에게 구체적 개선 사항 안내

### 4-2. 발행 실행

SEO 점수가 적절하면 발행 스크립트를 실행하세요:

```bash
npx tsx scripts/publish-test.ts
```

이 스크립트가 자동으로:
1. SEO 분석 (Python) — 이미 확인했으므로 참고용
2. Gemini 교차 검증 (사실 오류, YMYL 위험)
3. 아웃링크 검증
4. 이미지 생성 (Gemini)
5. CTA 매칭
6. DB 저장

### 4-3. 결과 보고

발행 결과를 사용자에게 보고하세요:
- 게시글 ID, 슬러그, 상태
- SEO 점수 및 등급
- Gemini 검증 점수
- 이미지 생성 여부
- CTA 매칭 결과
