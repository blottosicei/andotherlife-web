-- authors 테이블에 역할(role)과 정렬(sort_order) 컬럼 추가
ALTER TABLE authors ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'counselor';
ALTER TABLE authors ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS education TEXT;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS career TEXT[] DEFAULT '{}';
ALTER TABLE authors ADD COLUMN IF NOT EXISTS publications TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_authors_active_sort ON authors(is_active, sort_order) WHERE is_active = TRUE;
