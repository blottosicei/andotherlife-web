'use server';

import { createClient } from '@/lib/supabase/server';
import { programInquirySchema } from '@/lib/validations/program-inquiry';

export async function submitProgramInquiry(formData: FormData) {
  const raw = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    program_title: formData.get('program_title') as string,
    credit_status: formData.get('credit_status') as string,
  };

  const parsed = programInquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: '입력 정보를 확인해주세요.' };
  }

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('program_inquiries').insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      program_title: parsed.data.program_title,
      credit_status: parsed.data.credit_status,
    });

    if (error) {
      return { success: false, error: '문의 접수에 실패했습니다. 다시 시도해주세요.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다.' };
  }
}
