import { z } from 'zod';

export const programFormSchema = z.object({
  program_name: z.string().min(1, '프로그램을 선택해주세요'),
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  affiliation: z.string().optional(),
  message: z.string().optional(),
});

export type ProgramFormData = z.infer<typeof programFormSchema>;
