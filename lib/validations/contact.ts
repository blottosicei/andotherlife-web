import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  counseling_type: z.string().min(1, '상담 유형을 선택해주세요'),
  preferred_date: z.string().optional(),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
