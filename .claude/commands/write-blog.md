# SEO 최적화 블로그 글 작성

주제: $ARGUMENTS

## 지시사항

아래 컨텍스트 파일들을 모두 읽은 후, "$ARGUMENTS" 주제로 SEO 최적화된 블로그 글을 작성하세요.

### 참조할 컨텍스트

1. `context/brand-voice.md` — 톤앤매너, 금지 표현
2. `context/style-guide.md` — 작문 규칙, 포맷팅
3. `context/seo-guidelines.md` — SEO 기준, 키워드 밀도
4. `context/target-keywords.md` — 카테고리별 키워드
5. `context/internal-links-map.md` — 내부 링크 전략

### 작성 프로세스

#### 1단계: 키워드 선정
- `context/target-keywords.md`에서 관련 키워드 확인
- 핵심 키워드 1-2개, 보조 키워드 3-5개 선정

#### 2단계: 구조 설계
- H2 5-8개로 글 구조 설계
- 최소 2개 H2에 키워드 자연스럽게 포함
- 도입 → 본론(원인/증상/방법/사례) → 마무리 구조

#### 3단계: 본문 작성
- `context/brand-voice.md`의 톤앤매너 준수
- `context/style-guide.md`의 포맷팅 규칙 준수
- 2,000-4,000자 분량
- 첫 문단에 핵심 키워드 포함
- 학술 연구/정부 자료 인용 시 출처 명시

#### 4단계: SEO 요소 완성
- meta_title: 30-60자, 키워드 앞쪽 배치
- meta_description: 120-155자, 행동 유도 마무리
- FAQ 4-6개 (자연어 질문형)
- URL 슬러그: 영문 소문자, 3-5단어

#### 5단계: 내부 링크 배치
- `context/internal-links-map.md` 참조
- 본문 내 2-4개 내부 링크
- 관련 상담 프로그램 또는 교육 과정 연결

#### 6단계: YMYL 안전 점검
- 의료 진단/처방 표현 없는지 확인
- "전문가와 상담하세요" 권유 포함
- 자해/자살 관련 내용 시 위기상담 전화번호(1393, 109) 안내

### 출력 형식

`scripts/content.json` 형식으로 출력하세요:

```json
{
  "categorySlug": "카테고리 슬러그",
  "targetAudience": "client 또는 professional",
  "status": "draft",
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

완성된 JSON을 `scripts/content.json`에 저장하세요.
