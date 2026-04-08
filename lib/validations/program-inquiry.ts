import { z } from 'zod';

export const CREDIT_STATUSES = ['이수 중', '이수 완료', '전문 자격 보유 중'] as const;

export const programInquirySchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  program_title: z.string().min(1, '교육 과정을 선택해주세요'),
  credit_status: z.enum(CREDIT_STATUSES, { error: '학점 이수 여부를 선택해주세요' }),
});

export type ProgramInquiryData = z.infer<typeof programInquirySchema>;
