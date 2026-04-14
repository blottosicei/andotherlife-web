# 블로그 발행

$ARGUMENTS

## 지시사항

`scripts/content.json`의 블로그 글을 검증하고 발행합니다.

### 1단계: content.json 확인

`scripts/content.json`을 읽고 필수 필드가 모두 있는지 확인하세요:
- title, slug, content, excerpt, summary, keywords
- meta_title, meta_description, faq, references
- categorySlug, targetAudience

### 2단계: SEO 분석 (Python)

아래 명령어를 실행하여 SEO 점수를 확인하세요:

```bash
python3 scripts/seo-analysis/analyze.py scripts/content.json --output scripts/seo-report.json
```

결과를 확인하고:
- A/B 등급: 발행 진행
- C 등급: 개선 포인트를 사용자에게 알리고 진행 여부 확인
- D/F 등급: 개선이 필요한 항목을 구체적으로 안내하고 수정 제안

### 3단계: 발행 실행

SEO 점수가 적절하면 발행 스크립트를 실행하세요:

```bash
npx tsx scripts/publish-test.ts
```

이 스크립트가 자동으로 수행하는 작업:
1. SEO 분석 (Python)
2. Gemini 교차 검증 (사실 오류, YMYL 위험)
3. 아웃링크 검증
4. 이미지 생성 (Gemini)
5. CTA 매칭
6. DB 저장

### 4단계: 결과 확인

발행 결과를 사용자에게 보고하세요:
- 게시글 ID, 슬러그, 상태
- SEO 점수 및 등급
- 이미지 생성 여부
- CTA 매칭 결과
