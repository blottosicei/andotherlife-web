-- ============================================
-- 상담팀 10명 시드 데이터
-- ============================================

-- 기존 authors 데이터 초기화 (샘플 데이터 제거)
DELETE FROM authors WHERE slug NOT IN ('placeholder-keep-none');

-- 대표 (1명)
INSERT INTO authors (name, slug, title, bio, role, education, credentials, specialties, career, publications, sort_order, is_active) VALUES
(
  '이인수',
  'lee-insoo',
  '대표 / 가족상담 전문가',
  'University of Pennsylvania에서 임상사회복지(MSW) 석사, 경희대학교에서 가족상담 및 교육전공 박사학위를 취득하고, 30년간 부부·가족상담 분야에서 활동하고 있습니다. The Bowen Center과 Philadelphia Child and Family Therapy Training Center에서 가족치료 전문 수련을 받았습니다.',
  'representative',
  'University of Pennsylvania, Clinical Social Work (MSW) / 경희대학교 가족상담 및 교육전공 박사',
  ARRAY['전문영역 수련감독자 (한국상담학회 공인 194호)', '전문상담사 1급 (한국상담학회 공인 194호)', '부부가족상담 슈퍼바이저 (한국가족치료학회 공인 S24)', '가족상담 슈퍼바이저 (한국가족관계학회 공인 4호)'],
  ARRAY['부부상담', '가족상담', '보웬가족체계치료', '구조적가족치료'],
  ARRAY['심리상담연구소 앤아더라이프 대표', '서울시 가정법원 가사상담위원', 'The Bowen Center, Postgraduate Training Program: Bowen Theory Training 수료', 'Philadelphia Child and Family Therapist Training Center: Minuchin''s SFT Training 수료', 'Multicultural Family Therapy Institute: M. McGoldrick''s Intensive Training 수료', '(전) 상명대 복지상담대학원 가족상담치료학과 교수', '(전) 한국상담학회 부부가족상담분과학회 11대 회장', '(전) 여성가족부 가족정책 자문위원', '한국가족치료학회 자격관리위원 및 위원장 역임'],
  ARRAY['가계도: 사정 및 평가 (2026)', '가족상담 (2026)', '보웬이론의 비밀 (2025)', '미누친의 가족치료 마스터하기 (2022)', '대인관계 의사소통 (2022) 외 다수'],
  1,
  true
);

-- 슈퍼바이저 (4명)
INSERT INTO authors (name, slug, title, bio, role, education, credentials, specialties, sort_order, is_active) VALUES
(
  '이현숙',
  'lee-hyunsook',
  '슈퍼바이저',
  '치유상담대학원대학교 명예교수이자 임상실습교수로 재직하며, 한국상담학회 전문영역 수련감독자로서 후학 양성에 힘쓰고 있습니다.',
  'supervisor',
  '치유상담대학원대학교',
  ARRAY['전문영역 수련감독자 (한국상담학회)', '1급 전문상담사 (한국상담학회)', '치유상담대학원대학교 명예교수', '치유상담대학원대학교 임상실습교수'],
  ARRAY['상담 수련감독', '임상실습'],
  2,
  true
),
(
  '신영화',
  'shin-younghwa',
  '슈퍼바이저',
  '군산대 사회복지학과 명예교수로 재직하며, 한국내러티브치료학회 학회장을 역임한 부부가족상담 전문가입니다.',
  'supervisor',
  '군산대학교 사회복지학과',
  ARRAY['부부가족슈퍼바이저 (한국가족치료학회)', '군산대 사회복지학과 명예교수', '(전) 한국내러티브치료학회 학회장'],
  ARRAY['부부가족상담', '내러티브치료'],
  3,
  true
),
(
  '박찬희',
  'park-chanhee',
  '슈퍼바이저',
  '한국상담학회 1급 전문상담사, 한국상담심리학회 상담심리사 1급, 청소년상담사 1급, 임상심리사 1급 등 다수의 최고 수준 자격을 보유한 상담 전문가입니다.',
  'supervisor',
  NULL,
  ARRAY['1급 전문상담사 (한국상담학회)', '상담심리사 1급 (한국상담심리학회)', '청소년상담사 1급', '임상심리사 1급'],
  ARRAY['상담심리', '청소년상담', '임상심리'],
  4,
  true
),
(
  '노미화',
  'noh-mihwa',
  '슈퍼바이저',
  '한국상담학회 1급 전문상담사이자 한국가족치료학회 1급 부부가족상담사로, 부부·가족 영역에서 깊은 전문성을 갖추고 있습니다.',
  'supervisor',
  NULL,
  ARRAY['1급 전문상담사 (한국상담학회)', '1급 부부가족상담사 (한국가족치료학회)', '청소년상담사 1급'],
  ARRAY['부부가족상담', '청소년상담'],
  5,
  true
);

-- 전문상담원 (5명)
INSERT INTO authors (name, slug, title, bio, role, education, credentials, specialties, sort_order, is_active) VALUES
(
  '김희경',
  'kim-heekyung',
  '전문상담원',
  '상명대 가족복지학과 박사 수료 후, 부부가족상담사 1급 자격을 보유한 가족상담 전문가입니다.',
  'counselor',
  '상명대 가족복지학과 박사 수료',
  ARRAY['전문상담사 2급 (한국상담학회 공인)', '부부가족상담사 1급 (한국가족치료학회 공인)'],
  ARRAY['가족상담', '부부상담'],
  6,
  true
),
(
  '정연자',
  'jeong-yeonja',
  '전문상담원',
  '중앙대 아동청소년과 박사로, 아동·청소년 심리와 가족치료를 전문으로 합니다.',
  'counselor',
  '중앙대 아동청소년과 박사',
  ARRAY['부부가족상담사 2급 (한국가족치료학회 공인)'],
  ARRAY['아동청소년상담', '가족치료'],
  7,
  true
),
(
  '최희진',
  'choi-heejin',
  '전문상담원',
  '경희대 가족상담 및 교육전공 박사로, 부부가족상담 1급 자격을 보유한 전문 상담사입니다.',
  'counselor',
  '경희대 가족상담 및 교육전공 박사',
  ARRAY['부부가족상담사 1급 (한국가족치료학회 공인)', '전문상담사 2급 (한국상담학회 공인)'],
  ARRAY['가족상담', '부부상담'],
  8,
  true
),
(
  '박혜진',
  'park-hyejin',
  '전문상담원',
  '단국대 가족상담학과 석사로, 전문상담사, 청소년상담사, 부부가족상담사, 임상심리사 자격을 고루 갖춘 상담 전문가입니다.',
  'counselor',
  '단국대 가족상담학과 석사',
  ARRAY['전문상담사 2급 (한국상담학회 공인)', '청소년상담사 2급 (성평등가족부 공인)', '부부가족상담사 2급 (한국가족치료학회 공인)', '임상심리사 2급 (한국산업인력공단 공인)'],
  ARRAY['가족상담', '청소년상담', '임상심리'],
  9,
  true
),
(
  '강지은',
  'kang-jieun',
  '전문상담원',
  '숭실대 상담심리학과 석사로, 모래놀이치료와 임상심리 분야의 전문 자격을 갖춘 상담사입니다.',
  'counselor',
  '숭실대 상담심리학과 석사',
  ARRAY['전문상담사 2급 (한국상담학회 공인)', '청소년상담사 2급 (성평등가족부 공인)', '모래놀이치료사 1급 (한국임상놀이치료학회 공인)', '임상심리사 1급 (한국산업인력공단 공인)'],
  ARRAY['모래놀이치료', '임상심리', '청소년상담'],
  10,
  true
);

-- ============================================
-- 신규 상담 프로그램 3개 추가
-- ============================================

INSERT INTO counseling_programs (title, slug, subtitle, cta_heading, cta_button_text, match_keywords, sort_order, is_active) VALUES
(
  'EAP(기업)상담',
  'eap',
  '근로자 지원 프로그램 (Employee Assistance Program)',
  '기업 상담 문의하기',
  '문의하기',
  ARRAY['기업상담', 'EAP', '근로자지원', '직장스트레스', '직무갈등', '조직갈등', '직장인'],
  6,
  true
),
(
  '사회공헌상담',
  'social-contribution',
  '공공기관 협력 심리상담 서비스',
  '사회공헌상담 알아보기',
  '알아보기',
  ARRAY['바우처', '가정법원', '교육활동보호', '사회공헌', '공공상담'],
  7,
  true
),
(
  '심리검사',
  'psychological-testing',
  '전문 심리평가 서비스',
  '심리검사 예약하기',
  '예약하기',
  ARRAY['심리검사', '심리평가', '지능검사', 'MMPI', 'MBTI', '에니어그램', '가계도', '종합심리검사'],
  8,
  true
);
