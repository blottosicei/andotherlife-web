'use server';

import { createClient } from '@/lib/supabase/server';
import { programFormSchema } from '@/lib/validations/program';

export async function submitProgramRegistration(formData: FormData) {
  const raw = {
    program_name: formData.get('program_name') as string,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    affiliation: (formData.get('affiliation') as string) || undefined,
    message: (formData.get('message') as string) || undefined,
  };

  const parsed = programFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: '입력 정보를 확인해주세요.' };
  }

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('program_registrations').insert({
      program_name: parsed.data.program_name,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      affiliation: parsed.data.affiliation || null,
      message: parsed.data.message || null,
    });

    if (error) {
      return { success: false, error: '신청 처리에 실패했습니다.' };
    }
    return { success: true };
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다.' };
  }
}
