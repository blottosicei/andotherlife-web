'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { programFormSchema, type ProgramFormData } from '@/lib/validations/program';
import { submitProgramRegistration } from '@/app/actions/program';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PROGRAMS = [
  { value: '마음챙김 기반 스트레스 감소(MBSR)', label: '마음챙김 기반 스트레스 감소(MBSR)' },
  { value: '부모교육 프로그램', label: '부모교육 프로그램' },
  { value: '아동·청소년 집단상담', label: '아동·청소년 집단상담' },
  { value: '부부 관계 향상 프로그램', label: '부부 관계 향상 프로그램' },
  { value: '직장인 심리지원 프로그램', label: '직장인 심리지원 프로그램' },
  { value: '기타', label: '기타' },
];

type Props = {
  defaultProgram?: string;
};

export function ProgramForm({ defaultProgram }: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProgramFormData>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      program_name: defaultProgram ?? '',
    },
  });

  const onSubmit = async (data: ProgramFormData) => {
    setSubmitStatus('idle');
    const formData = new FormData();
    formData.set('program_name', data.program_name);
    formData.set('name', data.name);
    formData.set('phone', data.phone);
    formData.set('email', data.email);
    if (data.affiliation) formData.set('affiliation', data.affiliation);
    if (data.message) formData.set('message', data.message);

    const result = await submitProgramRegistration(formData);
    if (result.success) {
      setSubmitStatus('success');
      reset();
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error ?? '오류가 발생했습니다.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
        신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* 프로그램 선택 */}
      <div className="space-y-1.5">
        <label htmlFor="program_name" className="block text-sm font-medium text-[#2f3331]">
          프로그램 <span className="text-red-500">*</span>
        </label>
        <select
          id="program_name"
          className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
          aria-invalid={!!errors.program_name}
          {...register('program_name')}
        >
          <option value="">프로그램을 선택해주세요</option>
          {PROGRAMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {errors.program_name && (
          <p className="text-xs text-red-500">{errors.program_name.message}</p>
        )}
      </div>

      {/* 이름 */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-[#2f3331]">
          이름 <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          placeholder="홍길동"
          className="h-10 w-full"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* 연락처 */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="block text-sm font-medium text-[#2f3331]">
          연락처 <span className="text-red-500">*</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="010-0000-0000"
          className="h-10 w-full"
          aria-invalid={!!errors.phone}
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* 이메일 */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-[#2f3331]">
          이메일 <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          className="h-10 w-full"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* 소속 (선택) */}
      <div className="space-y-1.5">
        <label htmlFor="affiliation" className="block text-sm font-medium text-[#2f3331]">
          소속 <span className="text-xs text-[#5c605d] font-normal">(선택)</span>
        </label>
        <Input
          id="affiliation"
          placeholder="회사명 또는 소속기관"
          className="h-10 w-full"
          {...register('affiliation')}
        />
      </div>

      {/* 문의 내용 (선택) */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-medium text-[#2f3331]">
          문의 내용 <span className="text-xs text-[#5c605d] font-normal">(선택)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="문의하실 내용이 있으시면 적어주세요"
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          {...register('message')}
        />
      </div>

      {/* 성공/에러 메시지 */}
      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* 제출 버튼 */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full bg-[#2d6a4f] text-white hover:bg-[#245a41] disabled:opacity-60"
      >
        {isSubmitting ? '접수 중...' : '프로그램 신청하기'}
      </Button>
    </form>
  );
}
