import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/constants/site';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  Users, Clock, ArrowRight, ArrowLeft,
  GitBranch, UserMinus, Repeat, Heart, MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '가족상담',
    description: '가족 관계 갈등, 삼각관계, 정서적 단절, 세대간 전이 갈등, 부모자녀 관계를 위한 전문 가족상담 프로그램입니다.',
    path: '/counseling/family',
  }),
};

const targets = [
  { icon: MessageCircle, title: '가족 관계 갈등', desc: '가족 구성원 간의 반복적인 다툼과 소통 단절' },
  { icon: GitBranch, title: '가족 내 삼각관계', desc: '두 사람의 갈등에 제3자가 끌려들어 긴장이 분산되는 패턴' },
  { icon: UserMinus, title: '가족 간 정서적 단절', desc: '겉으로는 잘 지내지만 감정적으로 멀어진 가족' },
  { icon: Repeat, title: '세대 간 전이 갈등', desc: '조부모-부모-자녀로 이어지는 반복되는 관계 패턴' },
  { icon: Heart, title: '부모자녀 관계 갈등', desc: '자녀의 독립, 부모의 통제, 기대와 실망의 반복' },
];

const faqs = [
  {
    q: '가족 모두가 참여해야 하나요?',
    a: '이상적으로는 갈등 관련 구성원이 함께 참여하는 것이 효과적입니다. 그러나 한 명이 먼저 시작해 가족 시스템에 변화를 일으키는 것도 가능합니다.',
  },
  {
    q: '가족상담 기간은 얼마나 걸리나요?',
    a: '가족 구조와 갈등의 복잡성에 따라 다르지만 보통 12~20회기를 권장합니다. 초기 면담 후 상담사와 구체적으로 논의합니다.',
  },
  {
    q: '보웬 가족체계치료가 무엇인가요?',
    a: '개인을 가족 감정 시스템의 일부로 보고, 세대 간 전이 패턴과 자기분화 수준을 탐색하는 접근법입니다. 가족 내 역할과 관계 패턴을 이해하고 변화시키는 데 효과적입니다.',
  },
  {
    q: '비용은 얼마인가요?',
    a: '가족상담 비용은 참여 인원에 따라 달라질 수 있습니다. 문의 페이지를 통해 자세한 안내를 받으실 수 있습니다.',
  },
  {
    q: '상담 내용은 비밀이 보장되나요?',
    a: '네. 모든 상담 내용은 외부에 공개되지 않습니다. 단, 가족 구성원 간의 정보 공유 범위는 사전에 상담사와 합의합니다.',
  },
];

export default function FamilyCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '가족상담', url: `${SITE_CONFIG.url}/counseling/family` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '가족상담',
    description: '가족 관계 갈등, 삼각관계, 정서적 단절, 세대간 전이, 부모자녀 관계 전문 가족상담',
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    serviceType: '심리상담',
    areaServed: { '@type': 'Country', name: 'KR' },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[
          { label: '상담 프로그램', href: '/counseling' },
          { label: '가족상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>가족상담</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            가족이라는 시스템을 이해하고, 관계를 회복하는 전문 상담
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>가족 구성원 (개인 또는 전체)</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-[#2d6a4f]" />
              <span>회당 50분, 주 1회, 12~20회 권장</span>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>가족상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            가족상담은 개인의 문제를 가족이라는 관계 시스템 안에서 바라보는 접근입니다.
            한 가족 구성원의 어려움은 대부분 가족 전체의 상호작용 패턴과 연결되어 있습니다.
            가족 내 역할, 경계, 소통 방식을 탐색하고 건강한 관계를 회복하도록 지원합니다.
          </p>
        </section>

        {/* Targets */}
        <section className="mb-16">
          <h2>이런 어려움이 있다면</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {targets.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-[#f0ede8]">
                <item.icon className="h-7 w-7 text-[#2d6a4f]" />
                <p className="mt-3 font-semibold text-[#2f3331]">{item.title}</p>
                <p className="mt-1 text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2>치료 접근법</h2>
          <div className="mt-6 rounded-xl border border-[#f0ede8] bg-white p-6">
            <h3 className="font-semibold text-[#2f3331]">보웬 가족체계치료 (Bowen Family Systems Therapy)</h3>
            <p className="mt-2 text-sm text-[#5c605d] leading-relaxed">
              보웬 이론은 가족을 하나의 감정적 단위(emotional unit)로 봅니다.
              세대 간 전이되는 관계 패턴, 삼각관계, 정서적 단절, 자기분화 수준을 탐색합니다.
              각 구성원이 보다 성숙하고 자율적으로 기능하면서도 가족과 연결될 수 있도록 돕습니다.
              가족도(genogram)를 활용해 세대 간 패턴을 시각화하고 이해하는 작업을 함께 합니다.
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>상담 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '초기 가족 평가', desc: '가족 구조, 역할, 갈등 패턴을 파악합니다.' },
              { step: '2', title: '패턴 탐색', desc: '반복되는 관계 패턴과 세대 간 전이를 이해합니다.' },
              { step: '3', title: '변화 개입', desc: '새로운 소통 방식과 건강한 경계를 연습합니다.' },
              { step: '4', title: '관계 재구조화', desc: '변화를 일상에 정착시키고 지속 가능한 관계를 만듭니다.' },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b1f0ce] text-sm font-semibold text-[#1d5c42]">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-[#2f3331]">{item.title}</p>
                  <p className="text-sm text-[#5c605d]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2>자주 묻는 질문</h2>
          <div className="mt-6 rounded-xl border border-[#f0ede8] bg-white divide-y divide-[#f0ede8]">
            <Accordion>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={String(i)}>
                  <AccordionTrigger className="px-5 py-4 text-[#2f3331] font-medium text-sm">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 text-[#5c605d] text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 rounded-xl bg-[#e7e2da] p-8 text-center">
          <h2 className="text-xl">가족 관계, 혼자 해결하지 않아도 됩니다.</h2>
          <p className="mt-2 text-[#5c605d]">전문 상담사가 가족의 이야기를 함께 듣겠습니다.</p>
          <Link
            href={`/contact?type=${encodeURIComponent('가족상담')}`}
            className="mt-6 inline-flex items-center rounded-lg bg-[#2d6a4f] px-6 py-3 text-base font-medium text-white hover:bg-[#1f5e44] transition-colors"
          >
            상담 예약하기 <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>

        <div className="text-center">
          <Link href="/counseling" className="inline-flex items-center text-sm font-medium text-[#5c605d] hover:text-[#2d6a4f] transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" /> 상담 프로그램 목록으로 돌아가기
          </Link>
        </div>
      </main>
    </>
  );
}
