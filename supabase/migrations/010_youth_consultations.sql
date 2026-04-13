-- 2030 청년상담 모달 폼 전용 테이블
CREATE TABLE IF NOT EXISTS youth_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Step 1: 고민 / 스크리닝
  concerns TEXT[] NOT NULL DEFAULT '{}',
  additional_description TEXT,
  has_suicidal_risk BOOLEAN NOT NULL DEFAULT FALSE,
  has_psychiatric_treatment BOOLEAN NOT NULL DEFAULT FALSE,
  -- Step 2: 상담 방식 / 일정
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('대면', '비대면', '상관없음')),
  preferred_region TEXT,
  available_days TEXT[] NOT NULL DEFAULT '{}',
  available_times TEXT[] NOT NULL DEFAULT '{}',
  -- Step 3: 기본 정보
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_year TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('남성', '여성', '기타')),
  agree_privacy BOOLEAN NOT NULL DEFAULT TRUE,
  -- 관리용
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'matched', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS 활성화
ALTER TABLE youth_consultations ENABLE ROW LEVEL SECURITY;

-- anon 사용자 INSERT 허용 (폼 제출용)
CREATE POLICY "anon_insert_youth_consultations"
  ON youth_consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- service_role 전체 접근 (관리자용)
CREATE POLICY "service_role_all_youth_consultations"
  ON youth_consultations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE youth_consultations IS '2030 청년상담 프로그램 모달 폼 신청 데이터';
