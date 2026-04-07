# 내부 링크 자동 삽입 기획

> 토픽 클러스터 SEO 전략의 핵심. 핵심 글(필러 콘텐츠)과 연관 글(클러스터 콘텐츠)을 내부 링크로 연결하여 사이트 권위도를 높이고 크롤러의 페이지 발견을 돕는다.

## 1. 개요

### 목표
블로그 본문에서 특정 키워드가 등장하면, 해당 키워드에 대한 핵심 글로 자동 링크를 삽입한다.

### 예시
"번아웃 상태에서는 **우울증**이 동반될 수 있습니다"
→ "번아웃 상태에서는 [우울증](/blog/mental-health/depression-complete-guide)이 동반될 수 있습니다"

### 구현 시점
- **1단계**: 핵심 글 50편 발행 후 (키워드-포스트 매핑 등록)
- **2단계**: 발행 파이프라인에 링크 삽입 로직 추가
- **3단계**: 기존 글 소급 적용 스크립트

## 2. DB 구조

### internal_link_rules 테이블

```sql
CREATE TABLE internal_link_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,              -- '우울증', '공황장애', '부부상담'
  post_id UUID REFERENCES posts(id),  -- 링크 대상 포스트
  post_slug TEXT NOT NULL,            -- 'depression-complete-guide'
  category_slug TEXT NOT NULL,        -- 'mental-health'
  max_links_per_post INTEGER DEFAULT 1,  -- 한 글에서 이 키워드 최대 링크 수
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 0,         -- 같은 키워드에 여러 글이면 우선순위 높은 것 선택
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_link_rules_keyword ON internal_link_rules(keyword) WHERE is_active = true;
CREATE INDEX idx_link_rules_active ON internal_link_rules(is_active);
```

### 예시 데이터

| keyword | post_slug | category_slug | priority |
|---------|-----------|---------------|----------|
| 우울증 | depression-complete-guide | mental-health | 10 |
| 공황장애 | panic-disorder-coping-methods | mental-health | 10 |
| 부부갈등 | couple-communication-tips | relationships-communication | 10 |
| 자존감 | self-esteem-daily-habits | self-growth | 5 |
| 번아웃 | burnout-recovery-strategies | mental-health | 10 |
| 등교 거부 | school-refusal-causes-and-parenting-tips | children-youth | 10 |
| 분리불안 | separation-anxiety-guide | children-youth | 8 |
| 마음챙김 | morning-mindfulness-meditation-guide | self-growth | 5 |

## 3. 링크 삽입 규칙

### 삽입하는 경우
- 본문 텍스트에서 키워드 **첫 등장**에만 링크
- 글 전체 내부 링크 **최대 5~7개** (너무 많으면 SEO 불이익)
- 키워드 길이 우선 (긴 키워드 먼저 매칭: "공황장애 대처" > "공황장애" > "공황")

### 삽입하지 않는 경우
- **자기 자신 글**로의 링크 (self-link 방지)
- **이미 링크 안에 있는 텍스트** (`[텍스트](url)` 안의 키워드)
- **H2/H3 소제목 안의 키워드** (소제목은 TOC 앵커가 있으므로)
- **인용구/코드 블록** 안의 키워드
- **같은 키워드가 이미 링크된 경우** (중복 방지)

## 4. 삽입 로직 (의사코드)

```typescript
function insertInternalLinks(
  markdown: string,
  rules: LinkRule[],
  currentPostSlug: string
): string {
  // 1. 활성 규칙을 키워드 길이 역순으로 정렬 (긴 것 먼저)
  const sorted = rules
    .filter(r => r.post_slug !== currentPostSlug)  // self-link 방지
    .sort((a, b) => b.keyword.length - a.keyword.length);

  let result = markdown;
  let linkCount = 0;
  const MAX_LINKS = 7;
  const linkedKeywords = new Set<string>();

  for (const rule of sorted) {
    if (linkCount >= MAX_LINKS) break;
    if (linkedKeywords.has(rule.keyword)) continue;

    // 정규식: 헤딩, 링크, 코드블록 안이 아닌 곳에서 키워드 매칭
    // 첫 번째 매칭만 치환
    const regex = new RegExp(
      `(?<![#\\[\\(])(?<!\\/)\\b${escapeRegex(rule.keyword)}\\b(?![\\]\\)])`,
      ''  // 'g' 아님 — 첫 등장만
    );

    if (regex.test(result)) {
      const link = `[${rule.keyword}](/blog/${rule.category_slug}/${rule.post_slug})`;
      result = result.replace(regex, link);
      linkCount++;
      linkedKeywords.add(rule.keyword);
    }
  }

  return result;
}
```

## 5. 파이프라인 적용 위치

```
Gemini 검증 → 아웃링크 검증 → 이미지 → CTA 매칭
  → [신규] 내부 링크 삽입 → DB 저장
```

## 6. 소급 적용 (역방향 스크립트)

새 핵심 글이 추가되어 link_rules에 새 규칙이 등록되면, 기존 published 포스트에도 링크를 삽입해야 한다.

```typescript
// scripts/relink-posts.ts
async function relinkAllPosts() {
  const rules = await getActiveLinkRules();
  const posts = await getAllPublishedPosts();

  for (const post of posts) {
    const updated = insertInternalLinks(post.content, rules, post.slug);
    if (updated !== post.content) {
      await updatePostContent(post.id, updated);
      console.log(`Updated: ${post.slug}`);
    }
  }
}
```

### 실행 시점
- 새 핵심 글 발행 후 수동 실행
- 또는 link_rules 변경 시 자동 트리거 (Supabase Trigger)

## 7. 주의사항

- **Markdown 수준에서 치환**: HTML이 아닌 Markdown 본문에서 처리해야 안전
- **정규식 한계**: 한국어는 `\b` word boundary가 안 맞을 수 있음 → 공백/구두점 기반 매칭 필요
- **역방향 무한 루프 방지**: 소급 스크립트가 이미 링크된 키워드를 다시 링크하지 않도록
- **성능**: 500편 × 50개 규칙 = 25,000번 검사 → 비동기 batch 처리 권장

## 8. 효과 예상

| 지표 | 기대 효과 |
|------|----------|
| 크롤링 효율 | 내부 링크로 페이지 발견율 향상 |
| 페이지 권위도 | 필러 콘텐츠로 링크 집중 → 핵심 키워드 순위 상승 |
| 사용자 체류 시간 | 관련 글 이동 → 세션 길이 증가 |
| 이탈률 | 연관 콘텐츠 제공 → 이탈률 감소 |

---

*작성일: 2026-04-07*
*상태: 기획 완료, 핵심 글 50편 발행 후 구현 예정*
