import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/constants/site';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  ArrowRight, ArrowLeft,
  Brain, Heart, User, Users, Baby,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '심리검사',
    description: '웩슬러 지능검사, MMPI-2, MBTI 등 과학적으로 검증된 심리검사 도구를 활용하여 정확한 심리평가를 제공합니다.',
    path: '/counseling/psychological-testing',
  }),
};

const categories = [
  {
    icon: Brain,
    title: '종합심리검사',
    items: ['웩슬러 지능검사 (K-WAIS / K-WISC)', '정서검사', '투사검사 (로르샤흐, HTP 등)'],
    desc: '인지, 정서, 성격을 통합적으로 평가하는 가장 포괄적인 심리평가 패키지입니다.',
  },
  {
    icon: Heart,
    title: '성인정서평가',
    items: ['MMPI-2 (다면적 인성검사)', 'TCI (기질 및 성격검사)', 'SCT (문장완성검사)'],
    desc: '성인의 심리적 증상, 성격 특성, 정서 상태를 심층적으로 평가합니다.',
  },
  {
    icon: User,
    title: '성격유형검사',
    items: ['MBTI 검사', '에니어그램 검사'],
    desc: '개인의 성격 유형과 행동 패턴을 이해하여 자기 이해와 대인관계 향상에 활용합니다.',
  },
  {
    icon: Users,
    title: '가족역동검사',
    items: ['가계도 (Genogram)', '가족놀이가계도', '가족세우기 검사'],
    desc: '가족 구조와 관계 패턴을 탐색하여 가족 역동과 세대 간 영향을 이해합니다.',
  },
  {
    icon: Baby,
    title: '자녀행동평가',
    items: ['부모자녀상호작용검사 (PCIT)', '자녀놀이평가'],
    desc: '아동의 행동과 부모-자녀 상호작용 패턴을 평가하여 양육 방향을 안내합니다.',
  },
];

const faqs = [
  {
    q: '심리검사는 상담과 어떻게 다른가요?',
    a: '심리검사는 표준화된 도구를 사용해 개인의 인지, 정서, 성격 등을 객관적으로 측정하는 평가 과정입니다. 상담은 이를 기반으로 변화와 성장을 위해 지속적으로 만나는 과정이며, 심리검사 결과는 상담 방향 설정에 유용하게 활용됩니다.',
  },
  {
    q: '검사 결과는 어떻게 전달되나요?',
    a: '검사 완료 후 전문 상담사가 결과를 분석하여 해석 상담을 진행합니다. 검사 결과 보고서와 함께 쉽게 이해할 수 있도록 설명해 드리며, 향후 상담이나 생활에서의 적용 방향도 안내합니다.',
  },
  {
    q: '어떤 검사를 받아야 할지 모르겠어요.',
    a: '걱정하지 않으셔도 됩니다. 초기 상담을 통해 현재 상황과 목적에 맞는 검사를 전문 상담사가 안내해 드립니다. 목적(자기 이해, 진로, 자녀 양육, 치료 계획 등)에 따라 적합한 검사가 달라집니다.',
  },
  {
    q: '검사 결과가 외부에 유출되지 않나요?',
    a: '모든 검사 결과는 철저히 비밀이 보장됩니다. 법적 예외 상황을 제외하고는 어떠한 기관에도 공유되지 않으며, 병원 진료기록에도 남지 않습니다.',
  },
];

export default function PsychologicalTestingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '심리검사', url: `${SITE_CONFIG.url}/counseling/psychological-testing` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '심리검사',
    description: '웩슬러 지능검사, MMPI-2, MBTI 등 과학적으로 검증된 심리검사 도구를 활용한 전문 심리평가 서비스',
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    serviceType: '심리평가',
    areaServed: { '@type': 'Country', name: 'KR' },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[
          { label: '상담 프로그램', href: '/counseling' },
          { label: '심리검사' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>심리검사</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            전문 심리평가 서비스
          </p>
          <p className="mt-4 max-w-2xl text-[#2f3331] leading-[1.8]">
            과학적으로 검증된 심리검사 도구를 활용하여 정확한 심리평가를 제공합니다.
          </p>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>심리검사란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            심리검사는 표준화된 도구와 전문적 해석을 통해 개인의 인지 능력, 정서 상태, 성격 특성, 행동 패턴 등을
            객관적으로 파악하는 과정입니다. 자기 이해를 넓히거나, 상담 방향을 설정하거나, 자녀의 발달 상태를
            확인하는 데 활용됩니다. 앤아더라이프의 심리검사는 숙련된 전문가가 실시하고 해석하여
            결과의 정확성과 신뢰성을 보장합니다.
          </p>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2>검사 종류</h2>
          <div className="mt-6 space-y-5">
            {categories.map((cat, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-[#f0ede8]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b1f0ce]">
                    <cat.icon className="h-5 w-5 text-[#1f5e44]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#2f3331]">{cat.title}</h3>
                </div>
                <p className="text-sm text-[#5c605d] leading-relaxed mb-3">{cat.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <li
                      key={j}
                      className="rounded-full bg-[#f0f5f2] px-3 py-1 text-xs font-medium text-[#2d6a4f]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>검사 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '사전 상담', desc: '검사 목적과 현재 상황을 파악하여 적합한 검사를 선정합니다.' },
              { step: '2', title: '검사 실시', desc: '전문 상담사의 안내에 따라 검사를 실시합니다. 소요 시간은 검사 종류에 따라 다릅니다.' },
              { step: '3', title: '채점 및 분석', desc: '검사 결과를 전문가가 분석하고 종합적인 해석 보고서를 작성합니다.' },
              { step: '4', title: '결과 해석 상담', desc: '결과를 쉽게 이해할 수 있도록 해석해 드리고, 앞으로의 방향을 함께 의논합니다.' },
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
          <h2 className="text-xl">나를 더 깊이 이해하는 첫걸음.</h2>
          <p className="mt-2 text-[#5c605d]">전문 심리검사로 객관적인 자기 이해를 시작해 보세요.</p>
          <Link
            href={`/contact?type=${encodeURIComponent('심리검사')}`}
            className="mt-6 inline-flex items-center rounded-lg bg-[#2d6a4f] px-6 py-3 text-base font-medium text-white hover:bg-[#1f5e44] transition-colors"
          >
            검사 예약하기 <ArrowRight className="ml-2 h-4 w-4" />
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
