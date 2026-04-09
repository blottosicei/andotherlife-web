# UTM 추적 규칙: 2030 청년상담 Meta 캠페인

## UTM 파라미터 규칙

| 파라미터 | 규칙 | 예시 |
|---------|------|------|
| utm_source | 플랫폼명 (소문자) | `meta` |
| utm_medium | 광고 유형 | `paid_social` |
| utm_campaign | 캠페인 슬러그 | `young-adult-counseling` |
| utm_content | 카피 세트 + 크리에이티브 ID | `copy-a_img-01` |
| utm_term | 오디언스 세트 | `interest-broad`, `concern-keywords` |

## URL 템플릿

### 기본 구조
```
https://notherlife.com/counseling/young-adult?utm_source=meta&utm_medium=paid_social&utm_campaign=young-adult-counseling&utm_content={ad_name}&utm_term={adset_name}
```

### 카피 세트별 예시 URL

**카피 세트 A — 감정 공감형**
```
https://notherlife.com/counseling/young-adult?utm_source=meta&utm_medium=paid_social&utm_campaign=young-adult-counseling&utm_content=copy-a_empathy&utm_term=interest-broad
```

**카피 세트 B — 가격 소구형**
```
https://notherlife.com/counseling/young-adult?utm_source=meta&utm_medium=paid_social&utm_campaign=young-adult-counseling&utm_content=copy-b_price&utm_term=interest-broad
```

**카피 세트 C — 비밀보장 소구형**
```
https://notherlife.com/counseling/young-adult?utm_source=meta&utm_medium=paid_social&utm_campaign=young-adult-counseling&utm_content=copy-c_privacy&utm_term=concern-keywords
```

## Meta 동적 파라미터 활용

Meta 광고 관리자에서 URL 파라미터 필드에 입력:
```
utm_source=meta&utm_medium=paid_social&utm_campaign=young-adult-counseling&utm_content={{ad.name}}&utm_term={{adset.name}}
```

## GA4 확인 포인트

- Acquisition > Traffic acquisition에서 `meta / paid_social` 확인
- utm_content별 전환율 비교 → 최적 카피 세트 파악
- utm_term별 전환율 비교 → 최적 오디언스 파악

## 네이밍 컨벤션 (Meta 광고 관리자)

| 레벨 | 네이밍 패턴 | 예시 |
|------|-----------|------|
| 캠페인 | `{목표}_{타깃}_{날짜}` | `lead_young-adult_2026-04` |
| 광고 세트 | `{오디언스}_{플레이스먼트}` | `interest-broad_ig-feed` |
| 광고 | `{카피세트}_{크리에이티브}` | `copy-a_empathy_img-01` |
