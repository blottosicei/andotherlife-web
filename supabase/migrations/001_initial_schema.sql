-- ============================================
-- 앤아더라이프 심리상담연구소 웹사이트 DB 스키마
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. categories (카테고리)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  target_audience TEXT DEFAULT 'client',
  default_cta_type TEXT DEFAULT 'consultation',
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. tags (태그)
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. authors (작성자/상담사)
-- ============================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  bio TEXT,
  profile_image_url TEXT,
  credentials TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. posts (블로그 게시글)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  summary TEXT,
  keywords TEXT[] DEFAULT '{}',
  category_id UUID NOT NULL REFERENCES categories(id),
  thumbnail_url TEXT,
  author_id UUID REFERENCES authors(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  schema_markup JSONB,
  references JSONB DEFAULT '[]'::jsonb,
  cta_type TEXT DEFAULT 'consultation',
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. post_tags (게시글-태그 관계)
-- ============================================
CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================
-- 6. contact_inquiries (상담 문의)
-- ============================================
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  counseling_type TEXT,
  preferred_date TEXT,
  message TEXT,
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. program_registrations (교육 프로그램 신청)
-- ============================================
CREATE TABLE program_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  affiliation TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. newsletter_subscribers (뉴스레터 구독)
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source_url TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- 인덱스
-- ============================================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_posts_category ON posts(category_id, published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured, published_at DESC) WHERE is_featured = TRUE;
CREATE INDEX idx_posts_updated ON posts(updated_at DESC);
CREATE INDEX idx_posts_keywords ON posts USING GIN(keywords);
CREATE INDEX idx_posts_fulltext ON posts USING GIN(
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, ''))
);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status, created_at DESC);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email) WHERE is_active = TRUE;

-- ============================================
-- RLS (Row Level Security)
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read for published posts
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

-- Public read for categories, tags, authors
CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);
CREATE POLICY "Public can read tags" ON tags
  FOR SELECT USING (true);
CREATE POLICY "Public can read authors" ON authors
  FOR SELECT USING (true);
CREATE POLICY "Public can read post_tags" ON post_tags
  FOR SELECT USING (true);

-- Public write for inquiries and subscriptions
CREATE POLICY "Public can submit inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit registrations" ON program_registrations
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated users can manage everything
CREATE POLICY "Authenticated can manage posts" ON posts
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage tags" ON tags
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage authors" ON authors
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage post_tags" ON post_tags
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can read inquiries" ON contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can read registrations" ON program_registrations
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can read subscribers" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- 초기 카테고리 데이터 시드
-- ============================================
INSERT INTO categories (name, slug, description, target_audience, default_cta_type, sort_order) VALUES
  ('마음건강', 'mental-health', '일상에서 마음건강을 지키는 방법과 심리적 어려움에 대한 이해', 'client', 'consultation', 1),
  ('심리상담 이야기', 'counseling-stories', '심리상담 과정과 경험에 대한 이야기', 'client', 'consultation', 2),
  ('관계/소통', 'relationships-communication', '건강한 관계를 위한 소통법과 갈등 해결 방법', 'client', 'consultation', 3),
  ('아동·청소년', 'children-youth', '아동과 청소년의 심리 발달과 정신건강', 'client', 'consultation', 4),
  ('자기성장', 'self-growth', '자존감, 마음챙김, 자기계발을 위한 심리학적 접근', 'client', 'newsletter', 5),
  ('상담사 전문가 칼럼', 'expert-column', '심리상담 전문가의 깊이 있는 분석과 칼럼', 'professional', 'education', 6),
  ('교육·자격 정보', 'education-certification', '심리상담사 자격증, 보수교육, 전문 교육 과정 정보', 'professional', 'education', 7);

-- ============================================
-- updated_at 자동 갱신 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
