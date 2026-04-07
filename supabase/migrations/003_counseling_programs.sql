-- 상담 프로그램 테이블
CREATE TABLE counseling_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  cta_heading TEXT,
  cta_button_text TEXT,
  match_keywords TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ADD COLUMN counseling_program_id UUID REFERENCES counseling_programs(id);
ALTER TABLE categories ADD COLUMN default_program_id UUID REFERENCES counseling_programs(id);

CREATE INDEX idx_counseling_programs_slug ON counseling_programs(slug);
CREATE INDEX idx_counseling_programs_active ON counseling_programs(is_active, sort_order) WHERE is_active = TRUE;
CREATE INDEX idx_posts_counseling_program ON posts(counseling_program_id) WHERE counseling_program_id IS NOT NULL;

ALTER TABLE counseling_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active programs" ON counseling_programs FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage programs" ON counseling_programs FOR ALL USING (auth.role() = 'authenticated');
