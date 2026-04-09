# Marketing

앤아더라이프 심리상담연구소 마케팅 프로젝트 루트 디렉토리.
웹사이트 리드 생성 및 전환 최적화를 위한 마케팅 데이터, 코드, 문서를 관리합니다.

## 디렉토리 구조

```
marketing/
  campaigns/       → 광고 캠페인별 데이터 (Meta, Google 등)
  reports/         → Claude 생성 광고 보고서 및 성과 분석
  assets/          → 광고 소재 데이터 (카피, 이미지 메타, 경쟁사 레퍼런스)
  docs/            → 마케팅 기획 문서 및 전략
  integrations/    → 슬랙봇, 웹훅 등 마케팅 자동화 연동 코드
  analytics/       → 블로그 오가닉 유입, UTM 추적, 전환 분석 데이터
```

## 캠페인 네이밍 규칙

캠페인 디렉토리는 `{플랫폼}/{캠페인-슬러그}/` 형식으로 생성합니다.

예시:
- `campaigns/meta/young-adult-counseling/` — Meta 청년상담 캠페인
- `campaigns/google/brand-search/` — Google 브랜드 검색 캠페인

## 보고서 네이밍 규칙

`{YYYY-MM-DD}_{캠페인슬러그}_{보고서유형}.md`

예시:
- `reports/2026-04-09_young-adult-counseling_weekly.md`
