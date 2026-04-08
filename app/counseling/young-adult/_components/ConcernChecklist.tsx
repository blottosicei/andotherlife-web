'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const concerns = [
  '일요일 저녁만 되면 가슴이 답답해진다',
  '취업·이직을 앞두고 뭘 해야 할지 모르겠다',
  '부모님 기대에 짓눌리는 느낌이 든다',
  '연애가 매번 같은 패턴으로 끝난다',
  '아무것도 하기 싫고, 하루하루 의미를 모르겠다',
  '나는 대체 어떤 사람인지 잘 모르겠다',
];

export function ConcernChecklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(concerns.length).fill(false));
  const checkedCount = checked.filter(Boolean).length;

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center">이런 분들이라면, 상담을 받아보세요.</h2>
        <p className="mt-3 text-center text-[#5c605d]">
          해당되는 항목에 체크해보세요.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concerns.map((concern, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                'group flex items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-200',
                checked[i]
                  ? 'border-[#2d6a4f] bg-[#f0f5f2] shadow-sm'
                  : 'border-[#e6e9e5] bg-white hover:border-[#b1f0ce] hover:shadow-sm'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
                  checked[i]
                    ? 'border-[#2d6a4f] bg-[#2d6a4f]'
                    : 'border-[#c4c9c5] group-hover:border-[#2d6a4f]'
                )}
              >
                {checked[i] && <Check className="h-3.5 w-3.5 text-white" />}
              </span>
              <span className={cn(
                'text-[15px] leading-relaxed transition-colors',
                checked[i] ? 'text-[#2f3331] font-medium' : 'text-[#5c605d]'
              )}>
                {concern}
              </span>
            </button>
          ))}
        </div>

        {/* Fade-in message when 1+ checked */}
        <div
          className={cn(
            'mt-8 text-center transition-all duration-500',
            checkedCount > 0
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          <p className="text-lg font-medium text-[#2f3331]">
            {checkedCount >= 3
              ? '당신의 이야기를 들을 준비가 되어있습니다.'
              : '하나라도 해당된다면, 혼자 감당하지 않아도 됩니다.'}
          </p>
          {checkedCount >= 3 && (
            <Link
              href="/contact?type=2030%20%EC%B2%AD%EB%85%84%EC%83%81%EB%8B%B4%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8"
              className="mt-4 inline-flex items-center rounded-xl bg-[#2d6a4f] px-6 py-3 text-sm font-medium text-white hover:bg-[#1f5e44] transition-colors"
            >
              첫 상담 신청하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
