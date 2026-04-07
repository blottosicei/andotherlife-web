/**
 * Gemini 기반 콘텐츠 교차 검증 모듈
 *
 * Claude가 작성한 초안을 Gemini가 검증하여 피드백을 제공합니다.
 * Gemini는 수정하지 않고 피드백만 제공하며, 최종 판단은 Claude가 합니다.
 */

export interface ReviewFeedback {
  factErrors: Array<{ location: string; issue: string; suggestion: string }>;
  ymylRisks: Array<{ location: string; risk: string; recommendation: string }>;
  missingInfo: Array<{ topic: string; reason: string }>;
  seoImprovements: Array<{ element: string; current: string; suggestion: string }>;
  overallScore: number; // 1-10
  summary: string;
}

const REVIEW_PROMPT = `당신은 심리상담 콘텐츠 전문 검증자입니다. 아래 블로그 글을 검증하고 피드백을 제공하세요.

## 검증 항목

1. **사실 오류 (factErrors)**: 잘못된 통계, 연구 인용, 심리학 용어, 치료 효과 과장
2. **YMYL 위험 (ymylRisks)**: 위험한 조언, 자격 없는 진단, 의료 행위에 해당하는 표현, 자해/자살 관련 안전장치 누락
3. **빠진 중요 정보 (missingInfo)**: 전문가 상담 권유 누락, 위기 상황 연락처 미안내, 면책 조항 부재
4. **SEO 개선점 (seoImprovements)**: 키워드 밀도, 제목/소제목 최적화, 메타 디스크립션 개선

## 응답 형식 (JSON만 출력)
{
  "factErrors": [{"location": "섹션/문장 위치", "issue": "문제점", "suggestion": "수정 제안"}],
  "ymylRisks": [{"location": "위치", "risk": "위험 내용", "recommendation": "권고사항"}],
  "missingInfo": [{"topic": "빠진 주제", "reason": "필요한 이유"}],
  "seoImprovements": [{"element": "요소", "current": "현재", "suggestion": "제안"}],
  "overallScore": 8,
  "summary": "전체 평가 요약 (2~3문장)"
}

이슈가 없는 항목은 빈 배열로 두세요. 점수는 1(심각한 문제)~10(완벽) 척도입니다.`;

/**
 * Gemini Flash로 콘텐츠를 검증하고 피드백을 반환합니다.
 */
export async function reviewContent(
  title: string,
  content: string,
  keywords: string[]
): Promise<ReviewFeedback | null> {
  const apiKey = process.env.NANOBANANA_API_KEY;
  if (!apiKey) {
    console.error('[reviewer] NANOBANANA_API_KEY not set');
    return null;
  }

  const userPrompt = `## 검증 대상 블로그 글

**제목:** ${title}
**키워드:** ${keywords.join(', ')}

**본문:**
${content}

위 글을 검증하고 JSON 형식으로 피드백을 제공하세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: REVIEW_PROMPT }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error(`[reviewer] Gemini API error: ${response.status}`);
      return null;
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[reviewer] No text in Gemini response');
      return null;
    }

    let jsonStr = text.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    return JSON.parse(jsonStr) as ReviewFeedback;
  } catch (error) {
    console.error('[reviewer] Error:', error);
    return null;
  }
}

/**
 * 피드백을 사람이 읽기 좋은 형태로 포맷합니다.
 */
export function formatFeedback(feedback: ReviewFeedback): string {
  const lines: string[] = [];

  lines.push(`\n📊 전체 점수: ${feedback.overallScore}/10`);
  lines.push(`📝 ${feedback.summary}\n`);

  if (feedback.factErrors.length > 0) {
    lines.push('❌ 사실 오류:');
    feedback.factErrors.forEach((e, i) => {
      lines.push(`  ${i + 1}. [${e.location}] ${e.issue}`);
      lines.push(`     → ${e.suggestion}`);
    });
    lines.push('');
  }

  if (feedback.ymylRisks.length > 0) {
    lines.push('⚠️ YMYL 위험:');
    feedback.ymylRisks.forEach((r, i) => {
      lines.push(`  ${i + 1}. [${r.location}] ${r.risk}`);
      lines.push(`     → ${r.recommendation}`);
    });
    lines.push('');
  }

  if (feedback.missingInfo.length > 0) {
    lines.push('📌 빠진 정보:');
    feedback.missingInfo.forEach((m, i) => {
      lines.push(`  ${i + 1}. ${m.topic}: ${m.reason}`);
    });
    lines.push('');
  }

  if (feedback.seoImprovements.length > 0) {
    lines.push('🔍 SEO 개선:');
    feedback.seoImprovements.forEach((s, i) => {
      lines.push(`  ${i + 1}. [${s.element}] ${s.current} → ${s.suggestion}`);
    });
    lines.push('');
  }

  if (
    feedback.factErrors.length === 0 &&
    feedback.ymylRisks.length === 0 &&
    feedback.missingInfo.length === 0
  ) {
    lines.push('✅ 사실 오류, YMYL 위험, 누락 정보 없음\n');
  }

  return lines.join('\n');
}
