# 광고 소재 이미지 생성 가이드

## 개요

Meta 광고 캠페인용 이미지 소재를 자동 생성하는 스크립트입니다.
Gemini API로 배경 이미지를 생성하고, sharp로 카피 + 서브텍스트를 합성합니다.

## 사전 준비

### API 키
- **위치:** `.env.local` 파일의 `NANOBANANA_API_KEY`
- **모델:** `gemini-3.1-flash-image-preview`
- **발급:** [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### 의존성
- Node.js 18+
- sharp (next.js 의존성으로 이미 설치됨)

## 사용법

```bash
# 전체 18개 소재 생성
node scripts/generate-ad-images.mjs

# 특정 세트만 생성
node scripts/generate-ad-images.mjs --set 1

# 특정 세트의 특정 소재만 생성
node scripts/generate-ad-images.mjs --set 1 --ad A

# 배경 이미지는 그대로 두고 텍스트만 재합성
node scripts/generate-ad-images.mjs --composite-only
```

## 광고 세트 구조

| Set | 이름 | 소구점 | 소재 수 |
|-----|------|--------|---------|
| 1 | burnout | 번아웃/직장 스트레스 | 4개 (A~D) |
| 2 | breakup | 이별/연애 고민 | 4개 (A~D) |
| 3 | depression | 우울/무기력/감정 조절 | 4개 (A~D) |
| 4 | price | 가격 파괴형 | 3개 (A~C) |
| 5 | test | 심리검사 후킹형 | 3개 (A~C) |

## 출력 파일

```
marketing/campaigns/meta/young-adult-counseling/creatives/
├── backgrounds/           # 세트별 배경 이미지 (1200x1200)
│   ├── set1_burnout_bg.png
│   ├── set2_breakup_bg.png
│   ├── set3_depression_bg.png
│   ├── set4_price_bg.png
│   └── set5_test_bg.png
├── set1_burnout_a.png     # 최종 소재 (배경 + 카피 + 서브텍스트)
├── set1_burnout_b.png
├── ...
└── set5_test_c.png
```

## 파일 네이밍 규칙

- 배경: `set{번호}_{영문이름}_bg.png`
- 최종 소재: `set{번호}_{영문이름}_{소재ID}.png`

## 이미지 구조

각 소재는 3개 레이어로 구성됩니다:

1. **배경 이미지** — Gemini API로 생성한 1200x1200 사진
2. **그라데이션 오버레이** — 상단 투명 → 하단 반투명 검정 (텍스트 가독성)
3. **텍스트 레이어** — 메인 카피(58px 볼드) + 서브텍스트(28px) + 브랜드명(22px)

## 카피 수정 방법

`scripts/generate-ad-images.mjs` 파일의 `AD_SETS` 배열에서 직접 수정:

```javascript
{
  id: 1,
  name: "burnout",
  ads: [
    { id: "A", headline: "출근길이 무서워진 건\n언제부터였을까", sub: "첫 상담 무료 · 회당 2만원" },
    // ...
  ],
}
```

수정 후 텍스트만 재합성:
```bash
node scripts/generate-ad-images.mjs --composite-only
```

## 배경 이미지 재생성

배경 이미지가 이미 존재하면 자동으로 건너뜁니다. 재생성하려면:

```bash
# 특정 세트의 배경 삭제 후 재생성
rm marketing/campaigns/meta/young-adult-counseling/creatives/backgrounds/set1_burnout_bg.png
node scripts/generate-ad-images.mjs --set 1
```

## 비용

- Gemini API 이미지 생성: 약 $0.04/장 (1:1, 1K 해상도)
- 전체 5장 배경 생성: 약 $0.20
- 텍스트 합성은 로컬 처리 (무료)

## 광고 카피 기획 문서

상세한 광고 카피 기획은 같은 디렉토리의 `ad-copies.md`를 참조하세요.
