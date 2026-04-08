'use client';

import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: '퇴사할지 버틸지, 머릿속에서 맴돌기만 했어요. 상담사님이 정답을 알려준 건 아닌데, 대화하면서 제가 진짜 힘들었던 게 \'일\' 자체가 아니라 \'인정받지 못한다는 느낌\'이었다는 걸 알게 됐어요. 그걸 알고 나니까 선택이 좀 더 명확해졌어요.',
    age: 29,
    role: '직장 3년차',
  },
  {
    quote: '매주 월요일마다 상담받으러 가는 게 일주일을 버티는 힘이었어요. 친구한테는 차마 못 하는 말들, 여기선 편하게 할 수 있었어요. 가격이 부담 없어서 시작했는데, 돌이켜보면 그게 제 인생에서 가장 잘한 소비였어요.',
    age: 25,
    role: '대학원생',
  },
  {
    quote: '면접 떨어질 때마다 \'나는 안 되나 봐\'라는 생각에 갇혀있었는데, 상담을 통해 그게 사실이 아니라 \'패턴\'이라는 걸 알게 됐어요. 심리검사 결과 보면서 제 성격 특성을 객관적으로 본 게 특히 도움이 됐어요.',
    age: 27,
    role: '취업준비생',
  },
  {
    quote: '연애할 때마다 집착하게 되는 제가 싫었어요. TCI 검사 받고 나서 \'아, 내가 원래 이런 기질이구나\'를 알게 된 게 첫 번째 변화였고, 거기서부터 상담이 시작된 느낌이었어요. 지금은 그 패턴을 알아차리는 것만으로도 많이 달라졌어요.',
    age: 31,
    role: '프리랜서',
  },
];

const stats = [
  { label: '누적 상담', value: '500회+' },
  { label: '평균 만족도', value: '4.8/5' },
  { label: '재방문율', value: '72%' },
];

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    const child = scrollRef.current.children[clamped] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    setCurrentIndex(clamped);
  }, []);

  return (
    <section className="bg-[#f9f9f6] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center">먼저 경험한 사람들의 이야기</h2>

        {/* Desktop grid */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Mobile carousel — 1 card per swipe */}
        <div className="relative mt-10 md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-[calc(100vw-3rem)] shrink-0 snap-center">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6e9e5] bg-white hover:bg-[#f0f5f2] transition-colors disabled:opacity-30"
              aria-label="이전 후기"
            >
              <ChevronLeft className="h-4 w-4 text-[#5c605d]" />
            </button>
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-5 bg-[#2d6a4f]' : 'w-2 bg-[#d4d9d5]'
                  }`}
                  aria-label={`후기 ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              disabled={currentIndex === testimonials.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6e9e5] bg-white hover:bg-[#f0f5f2] transition-colors disabled:opacity-30"
              aria-label="다음 후기"
            >
              <ChevronRight className="h-4 w-4 text-[#5c605d]" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-sm"
            >
              <span className="text-sm font-semibold text-[#2d6a4f]">{s.value}</span>
              <span className="text-sm text-[#5c605d]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, age, role }: { quote: string; age: number; role: string }) {
  return (
    <div className="relative rounded-2xl border border-[#e6e9e5] bg-white p-7 shadow-sm md:p-8">
      <span className="absolute top-4 left-5 text-5xl font-serif text-[#b1f0ce] opacity-60 select-none leading-none">
        &ldquo;
      </span>
      <p className="relative z-10 mt-6 text-[15px] leading-relaxed text-[#2f3331]">
        {quote}
      </p>
      <p className="mt-5 text-sm text-[#8a8f8b]">
        — {age}세, {role}
      </p>
    </div>
  );
}
