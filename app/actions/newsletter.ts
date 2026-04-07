'use server';

import { createClient } from '@/lib/supabase/server';
import { newsletterSchema } from '@/lib/validations/newsletter';

export async function subscribeNewsletter(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
    name: (formData.get('name') as string) || undefined,
  };

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: '올바른 이메일을 입력해주세요.' };
  }

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('newsletter_subscribers').insert({
      email: parsed.data.email,
      name: parsed.data.name || null,
    });

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: '이미 구독 중인 이메일입니다.' };
      }
      return { success: false, error: '구독 처리에 실패했습니다.' };
    }
    return { success: true };
  } catch {
    return { success: false, error: '서버 오류가 발생했습니다.' };
  }
}
