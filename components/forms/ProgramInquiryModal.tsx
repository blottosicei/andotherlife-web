'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  programInquirySchema,
  type ProgramInquiryData,
  CREDIT_STATUSES,
} from '@/lib/validations/program-inquiry';
import { submitProgramInquiry } from '@/app/programs/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ProgramInquiryModalProps {
  programTitle: string;
  programTitles: string[];
  variant?: 'outline' | 'primary';
}

export function ProgramInquiryModal({ programTitle, programTitles, variant = 'outline' }: ProgramInquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProgramInquiryData>({
    resolver: zodResolver(programInquirySchema),
    defaultValues: {
      program_title: programTitle,
    },
  });

  const onSubmit = async (data: ProgramInquiryData) => {
    setSubmitStatus('idle');
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('phone', data.phone);
    formData.set('email', data.email);
    formData.set('program_title', data.program_title);
    formData.set('credit_status', data.credit_status);

    const result = await submitProgramInquiry(formData);
    if (result.success) {
      setSubmitStatus('success');
      reset();
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error ?? '오류가 발생했습니다.');
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSubmitStatus('idle');
      reset({ program_title: programTitle });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === 'primary'
            ? 'inline-block rounded-lg bg-[#2d6a4f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f5e44]'
            : 'inline-block rounded-lg border border-[#2d6a4f] px-4 py-2 text-sm font-medium text-[#2d6a4f] transition-colors hover:bg-[#2d6a4f] hover:text-white'
        }
      >
        교육 과정 문의하기
      </button>

      <DialogContent className="p-6 sm:max-w-md sm:p-8">
        <DialogHeader>
          <DialogTitle>교육 과정 문의</DialogTitle>
          <DialogDescription>
            교육 과정에 대해 궁금한 점을 문의해주세요.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
            </div>
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="h-10 w-full bg-[#2d6a4f] text-white hover:bg-[#245a41]"
            >
              닫기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 이름 */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-name" className="block text-sm font-medium text-[#2f3331]">
                이름 <span className="text-red-500">*</span>
              </label>
              <Input
                id="inquiry-name"
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
              <label htmlFor="inquiry-phone" className="block text-sm font-medium text-[#2f3331]">
                연락처 <span className="text-red-500">*</span>
              </label>
              <Input
                id="inquiry-phone"
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
              <label htmlFor="inquiry-email" className="block text-sm font-medium text-[#2f3331]">
                이메일 <span className="text-red-500">*</span>
              </label>
              <Input
                id="inquiry-email"
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

            {/* 교육 과정 */}
            <div className="space-y-1.5">
              <label htmlFor="inquiry-program" className="block text-sm font-medium text-[#2f3331]">
                교육 과정 <span className="text-red-500">*</span>
              </label>
              <select
                id="inquiry-program"
                className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:border-destructive"
                aria-invalid={!!errors.program_title}
                {...register('program_title')}
              >
                {programTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
              {errors.program_title && (
                <p className="text-xs text-red-500">{errors.program_title.message}</p>
              )}
            </div>

            {/* 학점 이수 여부 */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#2f3331]">
                학점 이수 여부 <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {CREDIT_STATUSES.map((status) => (
                  <label
                    key={status}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-input px-3 py-2 text-sm transition-colors has-[:checked]:border-[#2d6a4f] has-[:checked]:bg-[#b1f0ce]/30 has-[:checked]:text-[#2d6a4f] hover:bg-[#f3f4f0]"
                  >
                    <input
                      type="radio"
                      value={status}
                      className="sr-only"
                      {...register('credit_status')}
                    />
                    {status}
                  </label>
                ))}
              </div>
              {errors.credit_status && (
                <p className="text-xs text-red-500">{errors.credit_status.message}</p>
              )}
            </div>

            {/* 에러 메시지 */}
            {submitStatus === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* 제출 버튼 */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full bg-[#2d6a4f] text-white hover:bg-[#245a41] disabled:opacity-60"
            >
              {isSubmitting ? '접수 중...' : '문의하기'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
