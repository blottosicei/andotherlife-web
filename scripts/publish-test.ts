/**
 * 블로그 발행 스크립트 (로컬 실행)
 *
 * 사용법:
 *   1. Claude Code에서 콘텐츠 JSON을 scripts/content.json에 저장
 *   2. npx tsx scripts/publish-test.ts
 *
 * 필요 환경변수:
 *   - NANOBANANA_API_KEY (이미지 생성, 선택)
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY 또는 SUPABASE_SERVICE_ROLE_KEY
 */

import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { createClient } from '@supabase/supabase-js';

config({ path: resolve(__dirname, '../.env.local') });

function createSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

async function main() {
  console.log('=== 블로그 발행 (로컬 실행) ===\n');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase 환경변수 누락');
    process.exit(1);
  }

  // Read content JSON
  const contentPath = resolve(__dirname, 'content.json');
  if (!existsSync(contentPath)) {
    console.error('❌ scripts/content.json 파일이 없습니다.');
    process.exit(1);
  }

  const contentJson = JSON.parse(readFileSync(contentPath, 'utf-8'));
  const content = contentJson.content;

  // Basic validation
  if (!content?.title || !content?.slug || !content?.content) {
    console.error('❌ content.json에 title, slug, content가 필요합니다.');
    process.exit(1);
  }

  // 본문 끝 빈 FAQ 헤드라인 자동 제거 (FAQSection 컴포넌트가 별도 렌더링)
  content.content = content.content.replace(/\n+## 자주 묻는 질문\s*$/, '').trimEnd();

  // SEO 분석
  if (!contentJson.skipSeoAnalysis) {
    console.log('📈 SEO 분석 중...\n');
    try {
      execSync(
        'python3 scripts/seo-analysis/analyze.py scripts/content.json --output scripts/seo-report.json',
        { encoding: 'utf-8', cwd: resolve(__dirname, '..') }
      );
      const seoReport = JSON.parse(readFileSync(resolve(__dirname, 'seo-report.json'), 'utf-8'));
      const { overall_score, grade, scores, recommendations } = seoReport;
      console.log(`📊 SEO 분석 결과: ${overall_score}점 / ${grade}등급`);
      console.log(`  키워드: ${scores?.keyword ?? '-'}점 | 가독성: ${scores?.readability ?? '-'}점 | 메타: ${scores?.meta ?? '-'}점 | 구조: ${scores?.structure ?? '-'}점`);
      if (recommendations?.length > 0) {
        for (const rec of recommendations) {
          console.log(`  💡 ${rec}`);
        }
      }
      if (overall_score < 50) {
        console.warn(`⚠️ SEO 점수가 낮습니다 (${overall_score}점). 콘텐츠 개선을 권장합니다.`);
      }
      console.log('💾 SEO 리포트 저장: scripts/seo-report.json\n');
    } catch (err) {
      console.warn('⚠️ SEO 분석 스킵 (Python 실행 오류)');
    }
  } else {
    console.log('⏭️ SEO 분석 스킵\n');
  }

  // Step 0: Gemini 교차 검증
  if (!contentJson.skipReview) {
    console.log('🔍 Gemini 교차 검증 중...\n');
    try {
      const reviewPrompt = `당신은 심리상담 콘텐츠 전문 검증자입니다. 아래 블로그 글을 검증하고 피드백을 JSON으로 제공하세요.

검증 항목:
1. factErrors: 잘못된 통계, 연구 인용, 심리학 용어
2. ymylRisks: 위험한 조언, 자격 없는 진단, 의료 행위 표현
3. missingInfo: 전문가 상담 권유 누락, 위기 연락처 미안내
4. seoImprovements: 키워드 밀도, 제목/소제목 최적화
5. overallScore: 1~10점
6. summary: 전체 평가 2~3문장

JSON만 출력하세요.

제목: ${content.title}
키워드: ${content.keywords.join(', ')}
본문:
${content.content}`;

      const reviewResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.NANOBANANA_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: reviewPrompt }] }],
            generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
          }),
        }
      );

      if (reviewResponse.ok) {
        const reviewResult = await reviewResponse.json();
        const reviewText = reviewResult.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reviewText) {
          const feedback = JSON.parse(reviewText.trim());
          console.log(`📊 Gemini 점수: ${feedback.overallScore}/10`);
          console.log(`📝 ${feedback.summary}\n`);

          // 각 항목이 문자열 또는 객체일 수 있으므로 모두 처리
          const printItems = (label: string, items: any) => {
            if (!items || (Array.isArray(items) && items.length === 0)) return;
            if (!Array.isArray(items)) { items = [items]; }
            console.log(label);
            items.forEach((item: any, i: number) => {
              if (typeof item === 'string') {
                console.log(`  ${i + 1}. ${item}`);
              } else {
                const desc = item.issue || item.risk || item.topic || item.element || JSON.stringify(item);
                const detail = item.suggestion || item.recommendation || item.reason || '';
                console.log(`  ${i + 1}. ${desc}`);
                if (detail) console.log(`     → ${detail}`);
              }
            });
            console.log('');
          };

          printItems('❌ 사실 오류:', feedback.factErrors);
          printItems('⚠️ YMYL 위험:', feedback.ymylRisks);
          printItems('📌 빠진 정보:', feedback.missingInfo);
          printItems('🔍 SEO 개선:', feedback.seoImprovements);

          // 피드백 파일 저장 (Claude가 읽고 수정 판단용)
          const { writeFileSync } = await import('fs');
          writeFileSync(
            resolve(__dirname, 'review-feedback.json'),
            JSON.stringify(feedback, null, 2),
            'utf-8'
          );
          console.log('💾 피드백 저장: scripts/review-feedback.json\n');

          // 점수가 6점 미만이면 경고
          if (feedback.overallScore < 6) {
            console.warn('⚠️ 점수가 낮습니다. 콘텐츠 수정 후 다시 시도하세요.');
            console.warn('  scripts/review-feedback.json을 확인하세요.');
            process.exit(1);
          }
        }
      } else {
        console.warn('⚠️ Gemini 검증 스킵 (API 응답 오류)');
      }
    } catch (err) {
      console.warn('⚠️ Gemini 검증 스킵:', err);
    }
  } else {
    console.log('⏭️ Gemini 검증 스킵\n');
  }

  // Step 0.5: 아웃링크 검증
  if (content.references?.length > 0 && !contentJson.skipLinkCheck) {
    console.log(`🔗 아웃링크 검증 중 (${content.references.length}개)...\n`);
    const validRefs: any[] = [];
    const failedRefs: any[] = [];

    const checkUrl = async (url: string): Promise<{ ok: boolean; title: string }> => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(url, {
          method: 'GET', redirect: 'follow', signal: ctrl.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BlogLinkChecker/1.0)' },
        });
        clearTimeout(t);
        if (!res.ok) return { ok: false, title: '' };
        const html = await res.text();
        const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        return { ok: true, title: m ? m[1].trim() : '' };
      } catch {
        return { ok: false, title: '' };
      }
    };

    for (const ref of content.references) {
      // 1차: 원본 URL 검증
      const result = await checkUrl(ref.url);
      if (result.ok) {
        console.log(`  ✅ ${ref.name}`);
        console.log(`     ${ref.url} → ${result.title || '(확인됨)'}`);
        validRefs.push(ref);
        continue;
      }

      // 2차: 메인 도메인 폴백
      try {
        const mainDomain = new URL(ref.url).origin;
        if (mainDomain !== ref.url) {
          console.log(`  🔄 ${ref.name} — 원본 실패, 메인 도메인 시도: ${mainDomain}`);
          const fallback = await checkUrl(mainDomain);
          if (fallback.ok) {
            console.log(`  ✅ ${ref.name} — 메인 도메인으로 대체됨`);
            validRefs.push({ ...ref, url: mainDomain });
            continue;
          }
        }
      } catch {}

      // 3차: 실패 — 제거
      console.log(`  ❌ ${ref.name} — 접속 불가, 발행에서 제외`);
      console.log(`     ${ref.url}`);
      failedRefs.push({ ...ref });
    }

    console.log(`\n  결과: ${validRefs.length}개 통과 / ${failedRefs.length}개 실패`);

    // 검증 통과한 것만 발행에 포함 (발행은 멈추지 않음)
    content.references = validRefs;

    if (failedRefs.length > 0) {
      console.log(`\n  ⚠️ ${failedRefs.length}개 실패 → 자동 제거됨. ${validRefs.length}개만 발행에 포함.`);
    } else {
      console.log('  ✅ 모든 아웃링크 검증 통과!');
    }
    console.log('');
  }

  const supabase = createSupabase();

  // Get category
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', contentJson.categorySlug || 'mental-health')
    .single();

  if (!category) {
    console.error('❌ 카테고리를 찾을 수 없습니다');
    process.exit(1);
  }

  // Get author
  const { data: author } = await supabase
    .from('authors')
    .select('id')
    .limit(1)
    .single();

  // Step 1: Image generation
  let thumbnailUrl: string | null = null;
  if (!contentJson.skipImage && process.env.NANOBANANA_API_KEY) {
    console.log('📸 이미지 생성 중...');
    try {
      const visualKeywords = content.visual_keywords || [];
      const topicPrompt = visualKeywords.join(', ');
      const stylePrompt = 'Minimal warm watercolor illustration, soft pastel tones with beige and muted green, no text, no letters, no words, clean composition, gentle and calming mood';
      const fullPrompt = `${stylePrompt}. Topic: ${topicPrompt}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${process.env.NANOBANANA_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Generate an image: ${fullPrompt}` }] }],
            generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const parts = result.candidates?.[0]?.content?.parts;
        const imagePart = parts?.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));
        if (imagePart) {
          const sharp = (await import('sharp')).default;
          const rawBuffer = Buffer.from(imagePart.inlineData.data, 'base64');

          // 경량화: 1200px 폭, WebP, 품질 80
          const optimizedBuffer = await sharp(rawBuffer)
            .resize(1200, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

          const originalKB = Math.round(rawBuffer.length / 1024);
          const optimizedKB = Math.round(optimizedBuffer.length / 1024);
          console.log(`  원본: ${originalKB}KB → 최적화: ${optimizedKB}KB (${Math.round((1 - optimizedKB / originalKB) * 100)}% 감소)`);

          const fileName = `thumbnails/${content.slug}.webp`;

          const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(fileName, optimizedBuffer, {
              contentType: 'image/webp',
              upsert: true,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
            thumbnailUrl = urlData.publicUrl;
            console.log(`✅ 이미지 업로드: ${thumbnailUrl}`);
          } else {
            console.warn('⚠️ 이미지 업로드 실패:', uploadError.message);
          }
        }
      }
    } catch (err) {
      console.warn('⚠️ 이미지 생성 스킵:', err);
    }
  } else {
    console.log('⏭️ 이미지 생성 스킵');
  }

  // Step 2: CTA matching
  console.log('🔗 CTA 매칭 중...');
  let counselingProgramId: string | null = null;
  try {
    const { data: programs } = await supabase
      .from('counseling_programs')
      .select('id, title, slug, match_keywords')
      .eq('is_active', true)
      .eq('is_cta_enabled', true);

    if (programs && content.keywords) {
      let bestId: string | null = null;
      let bestScore = 0;
      for (const prog of programs) {
        const mk: string[] = (prog as any).match_keywords || [];
        let score = 0;
        for (const kw of content.keywords) {
          for (const m of mk) {
            if (kw.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(kw.toLowerCase())) {
              score++;
              break;
            }
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestId = prog.id;
          console.log(`  매칭: ${(prog as any).title} (점수: ${score})`);
        }
      }
      counselingProgramId = bestId;
    }
  } catch (err) {
    console.warn('⚠️ CTA 매칭 스킵');
  }
  console.log(counselingProgramId ? '✅ CTA 매칭 완료' : '⚠️ 매칭 없음 (카테고리 기본값 사용)');

  // Step 3: Build schema + save
  console.log('💾 DB 저장 중...');
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (content.faq || []).map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const readingTime = Math.max(1, Math.ceil((content.content?.length || 0) / 400));
  const ctaType = contentJson.targetAudience === 'professional' ? 'education' : 'consultation';

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title: content.title,
      slug: content.slug,
      content: content.content,
      excerpt: content.excerpt,
      summary: content.summary,
      keywords: content.keywords,
      category_id: category.id,
      author_id: author?.id || null,
      status: contentJson.status || 'draft',
      meta_title: content.meta_title,
      meta_description: content.meta_description,
      schema_markup: faqSchema,
      references: content.references,
      thumbnail_url: thumbnailUrl,
      counseling_program_id: counselingProgramId,
      reading_time: readingTime,
      cta_type: ctaType,
      published_at: contentJson.status === 'published' ? new Date().toISOString() : null,
    })
    .select('id, slug, title')
    .single();

  if (error) {
    console.error('❌ DB 저장 실패:', error.message);
    process.exit(1);
  }

  console.log(`\n✅ 발행 완료!`);
  console.log(`  제목: ${post.title}`);
  console.log(`  Slug: ${post.slug}`);
  console.log(`  ID: ${post.id}`);
  console.log(`  상태: ${contentJson.status || 'draft'}`);
  console.log(`  이미지: ${thumbnailUrl ? '생성됨' : '없음'}`);
  console.log(`  CTA: ${counselingProgramId ? '매칭됨' : '카테고리 기본값'}`);
}

main().catch(console.error);
