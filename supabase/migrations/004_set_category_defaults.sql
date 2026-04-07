-- Set default counseling programs for categories
-- These will be updated once actual program IDs are known
-- For now, we'll use a script pattern that references by slug

UPDATE categories c SET default_program_id = cp.id
FROM counseling_programs cp
WHERE c.slug IN ('mental-health', 'counseling-stories', 'self-growth')
AND cp.slug = 'young-adult';

UPDATE categories c SET default_program_id = cp.id
FROM counseling_programs cp
WHERE c.slug IN ('relationships-communication')
AND cp.slug = 'couple';

UPDATE categories c SET default_program_id = cp.id
FROM counseling_programs cp
WHERE c.slug IN ('children-youth')
AND cp.slug = 'child-youth';
