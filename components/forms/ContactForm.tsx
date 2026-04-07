'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { submitContactInquiry } from '@/app/contact/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const COUNSELING_TYPES = [
  { value: '개인상담', label: '개인상담' },
  { value: '부부상담', label: '부부상담' },
  { value: '아동상담', label: '아동상담' },
  { value: '집단상담', label: '집단상담' },
  { value: '기타', label: '기타' },
];

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('phone', data.phone);
    formData.set('email', data.email);
    formData.set('counseling_type', data.counseling_type);
    if (data.preferred_date) formData.set('preferred_date', data.preferred_date);
    formData.set('message', data.message);

    const result = await submitContactInquiry(formData);
    if (result.success) {
      setSubmitStatus('success');
      reset();
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error ?? '오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      {/* 상담 유형 */}
      <div className="space-y-1.5">
        <label htmlFor="counseling_type" className="block text-sm font-medium text-[#2f3331]">
          상담 유형 <span className="text-red-500">*</span>
        </label>
        <select
          id="counseling_type"
          className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
          aria-invalid={!!errors.counseling_type}
          {...register('counseling_type')}
        >
          <option value="">상담 유형을 선택해주세요</option>
          {COUNSELING_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.counseling_type && (
          <p className="text-xs text-red-500">{errors.counseling_type.message}</p>
        )}
      </div>

      {/* 희망 일시 */}
      <div className="space-y-1.5">
        <label htmlFor="preferred_date" className="block text-sm font-medium text-[#2f3331]">
          희망 일시 <span className="text-xs text-[#5c605d] font-normal">(선택)</span>
        </label>
        <Input
          id="preferred_date"
          type="datetime-local"
          className="h-10 w-full"
          {...register('preferred_date')}
        />
      </div>

      {/* 문의 내용 */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-medium text-[#2f3331]">
          문의 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="문의하실 내용을 자세히 적어주세요 (10자 이상)"
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive resize-none"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* 성공/에러 메시지 */}
      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
        </div>
      )}
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
        {isSubmitting ? '접수 중...' : '상담 문의하기'}
      </Button>
    </form>
  );
}
