# Campaigns

광고 캠페인별 데이터를 관리합니다.

## 구조

```
campaigns/
  meta/                → Meta (Facebook/Instagram) 광고 캠페인
    {campaign-slug}/   → 개별 캠페인 디렉토리
      campaign-brief.md    → 캠페인 개요, 목표, KPI
      ad-copies.md         → 광고 카피 변형
      audience-targeting.md → 타깃 오디언스 전략
      utm-tracking.md      → UTM 파라미터 규칙
      creatives/           → 광고 소재 관련 파일
  google/              → Google Ads 캠페인 (향후)
```

## 캠페인 라이프사이클

1. **기획**: campaign-brief.md 작성
2. **소재 준비**: ad-copies.md + creatives/
3. **타깃팅**: audience-targeting.md
4. **추적 설정**: utm-tracking.md
5. **운영**: reports/에 주간/월간 보고서 축적
6. **최적화**: 데이터 기반 소재·타깃 반복 개선
