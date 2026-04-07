'use server';

import { createClient } from '@/lib/supabase/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function submitContactInquiry(formData: FormData) {
  const raw = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    counseling_type: formData.get('counseling_type') as string,
    preferred_date: (formData.get('preferred_date') as string) || undefined,
    message: formData.get('message') as string,
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: '입력 정보를 확인해주세요.' };
  }

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('contact_inquiries').insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      counseling_type: parsed.data.counseling_type,
      preferred_date: parsed.data.preferred_date || null,
      message: parsed.data.message,
    });

    if (error) {
      return { success: false, error: '문의 접수에 실패했습니다. 다시 시도해주세요.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다.' };
  }
}
