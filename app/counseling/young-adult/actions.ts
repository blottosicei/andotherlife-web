'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const youthConsultationSchema = z.object({
  concerns: z.array(z.string()).min(1),
  additionalDescription: z.string().optional(),
  hasSuicidalRisk: z.boolean(),
  hasPsychiatricTreatment: z.boolean(),
  consultationType: z.enum(['대면', '비대면', '상관없음']),
  preferredRegion: z.string().optional(),
  availableDays: z.array(z.string()).min(1),
  availableTimes: z.array(z.string()).min(1),
  name: z.string().min(2),
  phone: z.string().regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/),
  birthYear: z.string().min(4).refine((val) => {
    const year = parseInt(val, 10);
    return !isNaN(year) && year >= 1987 && year <= 2007;
  }),
  gender: z.enum(['남성', '여성', '기타']),
  agreePrivacy: z.literal(true),
});

export type YouthConsultationData = z.infer<typeof youthConsultationSchema>;

export async function submitYouthConsultation(data: YouthConsultationData) {
  const parsed = youthConsultationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: '입력 정보를 확인해주세요.' };
  }

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('youth_consultations').insert({
      concerns: parsed.data.concerns,
      additional_description: parsed.data.additionalDescription || null,
      has_suicidal_risk: parsed.data.hasSuicidalRisk,
      has_psychiatric_treatment: parsed.data.hasPsychiatricTreatment,
      consultation_type: parsed.data.consultationType,
      preferred_region: parsed.data.preferredRegion || null,
      available_days: parsed.data.availableDays,
      available_times: parsed.data.availableTimes,
      name: parsed.data.name,
      phone: parsed.data.phone,
      birth_year: parsed.data.birthYear,
      gender: parsed.data.gender,
      agree_privacy: parsed.data.agreePrivacy,
    });

    if (error) {
      return { success: false, error: '신청 접수에 실패했습니다. 다시 시도해주세요.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Youth consultation submission error:', err);
    return { success: false, error: '서버 오류가 발생했습니다.' };
  }
}
