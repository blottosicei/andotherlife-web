import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/constants/site';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Users, Clock, ArrowRight, ArrowLeft, Heart, MessageCircle, Handshake, AlertCircle, Flame, ShieldOff } from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '부부상담 프로그램',
    description: '부부/커플 간의 소통 문제, 갈등, 신뢰 회복을 위한 전문 상담 프로그램입니다.',
    path: '/counseling/couple',
  }),
};

const difficulties = [
  { icon: MessageCircle, title: '소통 부재·의사소통 불통', desc: '대화가 자주 다툼으로 이어지거나 서로의 말이 전달되지 않는 경우' },
  { icon: Flame, title: '부부 관계 갈등', desc: '반복적인 갈등 패턴으로 지치고, 해결 방법을 모르겠는 경우' },
  { icon: ShieldOff, title: '외도 문제', desc: '신뢰가 무너진 상황에서 관계를 회복할지 결정해야 하는 경우' },
  { icon: AlertCircle, title: '섹슈얼리티 문제', desc: '친밀감 단절, 욕구 차이 등 관계의 내밀한 영역에서 어려움이 있는 경우' },
];

const faqs = [
  {
    q: '부부 둘 다 참여해야 하나요?',
    a: '원칙적으로 둘 다 참여하는 것이 가장 효과적입니다. 다만 한쪽이 거부하는 경우 개인 상담으로 시작하고 이후 함께 참여하는 방식도 가능합니다. 상담사와 사전에 논의해주세요.',
  },
  {
    q: '상담 기간은 얼마나 걸리나요?',
    a: '보통 12~16회기를 권장합니다. 갈등의 깊이와 목표에 따라 달라지며, 초기 면담 후 상담사와 함께 계획을 세웁니다.',
  },
  {
    q: '비용은 어떻게 되나요?',
    a: '부부상담 비용은 개인상담과 다를 수 있습니다. 문의 페이지를 통해 자세한 안내를 받으실 수 있습니다.',
  },
  {
    q: '이혼을 고려 중인데 상담이 의미 있을까요?',
    a: '네. 이혼을 고려하는 단계에서도 상담은 의미 있습니다. 관계 회복이 목적이 아니더라도, 더 나은 결정을 위한 과정으로 활용할 수 있습니다.',
  },
  {
    q: '비밀은 보장되나요?',
    a: '모든 상담 내용은 엄격하게 비밀이 보장됩니다. 병원 진료기록에도 남지 않습니다. 본인 또는 타인의 생명이 위험한 경우에만 법적 의무에 따라 예외가 적용됩니다.',
  },
];

export default function CoupleCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '부부상담', url: `${SITE_CONFIG.url}/counseling/couple` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '부부상담 프로그램',
    description: '부부/커플 간의 소통 문제, 갈등, 신뢰 회복을 위한 전문 상담',
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
          { label: '부부상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>부부상담 프로그램</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            함께 성장하는 관계를 위한 전문 상담
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>부부, 커플, 연인</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-[#2d6a4f]" />
              <span>회당 50분, 주 1회, 12~16회 권장</span>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>부부상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            부부상담은 두 사람의 관계에서 발생하는 소통 문제, 갈등, 신뢰 손상 등을 전문 상담사와 함께 풀어가는 과정입니다.
            혼자 해결하기 어려운 관계의 어려움을 안전한 환경에서 이야기하고, 건강한 소통 방식을 배워갑니다.
          </p>
        </section>

        {/* Difficulties */}
        <section className="mb-16">
          <h2>이런 어려움이 있다면</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {difficulties.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-[#f0ede8]">
                <item.icon className="h-7 w-7 text-[#2d6a4f]" />
                <p className="mt-3 font-semibold text-[#2f3331]">{item.title}</p>
                <p className="mt-1 text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who needs it */}
        <section className="mb-16">
          <h2>이런 분들에게 도움이 됩니다</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: MessageCircle, title: '소통이 어려운 부부', desc: '대화가 자주 다툼으로 이어지거나, 서로의 감정을 이해하기 어려운 경우' },
              { icon: Heart, title: '신뢰 회복이 필요한 경우', desc: '외도, 거짓말 등으로 신뢰가 깨져 관계 회복을 원하는 경우' },
              { icon: Handshake, title: '큰 결정 앞에 선 커플', desc: '결혼, 이혼, 별거 등 중요한 결정을 앞두고 함께 고민하고 싶은 경우' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
                <item.icon className="h-8 w-8 text-[#2d6a4f]" />
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approaches */}
        <section className="mb-16">
          <h2>치료 접근법</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#f0ede8] bg-white p-6">
              <h3 className="font-semibold text-[#2f3331]">보웬 가족체계치료 (Bowen Family Systems Therapy)</h3>
              <p className="mt-2 text-sm text-[#5c605d] leading-relaxed">
                개인을 가족이라는 감정적 시스템의 일부로 보고, 세대 간 전이되는 관계 패턴을 탐색합니다.
                자기분화(self-differentiation)를 통해 보다 성숙하고 자율적인 관계를 형성하도록 돕습니다.
              </p>
            </div>
            <div className="rounded-xl border border-[#f0ede8] bg-white p-6">
              <h3 className="font-semibold text-[#2f3331]">구조적 가족치료 (Structural Family Therapy)</h3>
              <p className="mt-2 text-sm text-[#5c605d] leading-relaxed">
                가족 내 역할, 경계, 위계 구조를 분석하여 역기능적인 상호작용 패턴을 파악합니다.
                건강한 경계와 유연한 구조를 회복함으로써 관계의 균형을 되찾도록 지원합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>상담 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '초기 면담', desc: '부부 각자의 이야기를 듣고 상담 목표를 함께 설정합니다.' },
              { step: '2', title: '관계 패턴 탐색', desc: '반복되는 갈등 패턴과 소통 방식을 분석합니다.' },
              { step: '3', title: '변화 연습', desc: '새로운 소통 기술을 배우고 실제 상황에서 연습합니다.' },
              { step: '4', title: '관계 강화', desc: '변화를 일상에 정착시키고, 더 깊은 유대를 만들어갑니다.' },
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
          <h2 className="text-xl">관계가 힘드신가요?</h2>
          <p className="mt-2 text-[#5c605d]">전문 상담사가 함께합니다</p>
          <Link
            href={`/contact?type=${encodeURIComponent('부부상담 프로그램')}`}
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
