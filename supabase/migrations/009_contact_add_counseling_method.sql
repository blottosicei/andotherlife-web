-- Add counseling_method column to contact_inquiries
ALTER TABLE contact_inquiries
  ADD COLUMN counseling_method text CHECK (counseling_method IN ('대면', '비대면', '상관없음'));
