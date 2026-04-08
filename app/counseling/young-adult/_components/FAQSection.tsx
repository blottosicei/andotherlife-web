'use client';

import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '큰 문제가 없어도 상담받아도 되나요?',
    a: '물론입니다. 상담은 심각한 정신질환 치료만을 위한 것이 아닙니다. 자기 이해, 성장, 스트레스 관리 목적으로도 충분히 활용할 수 있습니다.',
  },
  {
    q: '주변에 알려질까 봐 걱정돼요.',
    a: '상담은 병원 진료기록에 남지 않아 보험·취업 심사에 영향을 주지 않습니다. 요즘은 상담을 자기관리로 보는 시각이 늘고 있습니다.',
  },
  {
    q: '상담사는 어떤 분인가요?',
    a: '한국상담학회 수련과정을 밟고 있는 석·박사 수련생이 진행하며, 교수급 슈퍼바이저의 정기 슈퍼비전을 의무적으로 받습니다. 자격증만 있는 상담사가 아니라 체계적으로 관리되는 전문가입니다.',
  },
  {
    q: '심리검사도 함께 받을 수 있나요?',
    a: 'MMPI-2(성격·심리검사), TCI(기질·성격검사) 등을 상담과 병행할 수 있습니다. 검사 결과를 바탕으로 상담 방향을 설계하면 더 효과적입니다.',
  },
  {
    q: '왜 이렇게 저렴한가요?',
    a: '앤아더라이프는 수련생 상담 모델을 운영합니다. 수련생은 실습 경험을 쌓고, 내담자는 저렴하게 전문 상담을 받는 구조입니다. 슈퍼비전 시스템 덕분에 품질은 유지됩니다.',
  },
  {
    q: '전체 과정이 어떻게 되나요?',
    a: '① 신청서 작성 → ② 사전 조율(날짜·상담사 매칭) → ③ 정기 상담(주 1회, 50분) → ④ 종결·연장 여부 논의. 첫 상담 전에 상담사와 간단한 사전 안내 통화가 있습니다.',
  },
  {
    q: '몇 회기나 받아야 하나요?',
    a: '기본 6회기를 권장하지만, 상황에 따라 연장하거나 줄일 수 있습니다. 언제든 중단할 수 있으며, 강제로 이어가지 않습니다.',
  },
  {
    q: '비밀은 보장되나요?',
    a: '네. 상담 내용은 병원 진료기록에 남지 않으며, 외부에 공개되지 않습니다. 단, 본인 또는 타인의 생명이 위험한 경우에는 법적 의무에 따라 예외가 적용될 수 있습니다.',
  },
  {
    q: '병원 치료와 어떻게 다른가요?',
    a: '병원(정신건강의학과)은 진단과 약물치료 중심이고, 상담은 대화를 통해 감정과 생각을 탐색하는 과정입니다. 병원 치료와 병행하는 것도 가능합니다.',
  },
  {
    q: '예약 취소·변경 규정이 있나요?',
    a: '상담 2일 전까지 취소하면 전액 환불, 1일 전 취소는 50% 환불, 당일 취소·노쇼는 환불이 어렵습니다. 변경은 가능한 한 빨리 연락해주세요.',
  },
];

const INITIAL_COUNT = 7;

export function FAQSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);

  return (
    <section className="py-16 md:py-24 bg-[#f9f9f6]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center">자주 묻는 질문</h2>
        <div className="mt-10 rounded-2xl border border-[#e6e9e5] bg-white divide-y divide-[#f0ede8]">
          <Accordion>
            {visibleFaqs.map((faq, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="px-6 py-5 text-[#2f3331] font-medium text-[15px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-[#5c605d] text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {!showAll && faqs.length > INITIAL_COUNT && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-1 text-sm text-[#5c605d] hover:text-[#2d6a4f] transition-colors underline underline-offset-4"
            >
              나머지 질문 더보기
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
