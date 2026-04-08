'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/app/actions/newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const result = await subscribeNewsletter(formData);

    if (result.success) {
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error ?? '오류가 발생했습니다.');
    }
    setIsSubmitting(false);
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
        구독해 주셔서 감사합니다!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label htmlFor="newsletter-email" className="sr-only">이메일 주소</label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="이메일 주소를 입력하세요"
          required
          className="h-9 w-full bg-white text-sm"
        />
      </div>
      {submitStatus === 'error' && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-9 w-full bg-[#2d6a4f] text-white hover:bg-[#245a41] disabled:opacity-60 text-sm"
      >
        {isSubmitting ? '처리 중...' : '구독하기'}
      </Button>
    </form>
  );
}
