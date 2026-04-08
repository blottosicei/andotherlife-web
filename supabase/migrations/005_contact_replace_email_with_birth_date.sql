-- contact_inquiries: email 컬럼 제거, birth_date 컬럼 추가
ALTER TABLE contact_inquiries DROP COLUMN IF EXISTS email;
ALTER TABLE contact_inquiries ADD COLUMN birth_date DATE;
