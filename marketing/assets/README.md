# Assets

광고 소재 데이터를 관리합니다. 실제 이미지/영상 파일은 외부 스토리지에 보관하고, 여기에는 메타데이터와 카피 등 텍스트 기반 소재를 관리합니다.

## 구조

- `copy-bank/` — 검증된 광고 카피 라이브러리
- `image-specs/` — 이미지 사양, 프롬프트, 메타데이터
- `templates/` — 반복 사용하는 소재 템플릿
- `competitor-refs/` — 경쟁사 광고 소재 레퍼런스
  - `meta/` — Meta(Facebook/Instagram) 광고 레퍼런스 이미지
  - `google/` — Google 광고 레퍼런스 (추후)
