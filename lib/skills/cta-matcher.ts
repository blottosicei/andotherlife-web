import { createClient } from '@/lib/supabase/server';

interface MatchResult {
  id: string;
  title: string;
  slug: string;
  cta_heading: string | null;
  cta_button_text: string | null;
}

/**
 * Find the best matching counseling program for given keywords.
 * Compares keywords against each program's match_keywords array.
 * Returns the program with the most keyword overlaps, or null if none match.
 */
export async function matchCounselingProgram(
  keywords: string[]
): Promise<MatchResult | null> {
  if (!keywords || keywords.length === 0) return null;

  const supabase = await createClient();

  // Get all active programs with their match_keywords
  const { data: programs, error } = await supabase
    .from('counseling_programs')
    .select('id, title, slug, cta_heading, cta_button_text, match_keywords')
    .eq('is_active', true)
    .eq('is_cta_enabled', true);

  if (error || !programs || programs.length === 0) return null;

  // Find best match by counting keyword overlaps
  let bestMatch: MatchResult | null = null;
  let bestScore = 0;

  for (const program of programs as any[]) {
    const programKeywords: string[] = program.match_keywords || [];
    let score = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = keyword.toLowerCase().trim();
      for (const mk of programKeywords) {
        const normalizedMk = mk.toLowerCase().trim();
        // Check both exact match and partial containment
        if (normalizedKeyword === normalizedMk ||
            normalizedKeyword.includes(normalizedMk) ||
            normalizedMk.includes(normalizedKeyword)) {
          score++;
          break; // Count each keyword only once
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = {
        id: program.id,
        title: program.title,
        slug: program.slug,
        cta_heading: program.cta_heading,
        cta_button_text: program.cta_button_text,
      };
    }
  }

  return bestMatch;
}
