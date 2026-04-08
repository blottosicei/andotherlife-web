-- contact_inquiries: preferred_date 컬럼 제거, preferred_days 배열 컬럼 추가
ALTER TABLE contact_inquiries DROP COLUMN IF EXISTS preferred_date;
ALTER TABLE contact_inquiries ADD COLUMN preferred_days TEXT[] DEFAULT '{}';
