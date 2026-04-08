import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/constants/site';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  Users, ArrowRight, ArrowLeft,
  Handshake, Briefcase, FlameKindling, Shield, HeartPulse,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'EAP(기업)상담',
    description: '직장인의 직무만족과 삶의 질 향상을 위한 근로자 지원 프로그램(EAP). 대인관계, 직무갈등, 번아웃, 조직갈등, 정서관리 전문 기업 심리상담입니다.',
    path: '/counseling/eap',
  }),
};

const serviceAreas = [
  { icon: Handshake, title: '대인관계', desc: '직장 내 대인관계 문제' },
  { icon: Briefcase, title: '직무갈등', desc: '업무 스트레스 및 직무 갈등' },
  { icon: FlameKindling, title: '스트레스 관리', desc: '번아웃 예방 및 스트레스 관리' },
  { icon: Shield, title: '조직갈등', desc: '팀 내 갈등 및 조직문화 적응' },
  { icon: HeartPulse, title: '정서관리', desc: '우울, 불안 등 정서적 어려움' },
];

const faqs = [
  {
    q: 'EAP 상담은 어떻게 진행되나요?',
    a: '회사와 상담기관 간의 협약을 바탕으로 근로자가 무료 또는 저비용으로 전문 상담을 이용할 수 있습니다. 온라인·대면 방식 모두 가능하며, 상담 내용은 철저히 비밀이 보장됩니다.',
  },
  {
    q: '상담 내용이 회사에 공개되나요?',
    a: '아닙니다. 상담 내용은 상담사와 내담자 사이에서 엄격하게 비밀이 보장됩니다. 회사에는 이용 통계(인원수 등 집계 수준)만 제공되며, 개인 정보나 상담 내용은 절대 공유되지 않습니다.',
  },
  {
    q: '어떤 직장인에게 EAP 상담이 필요한가요?',
    a: '번아웃, 직장 내 갈등, 과도한 업무 스트레스, 동료·상사와의 관계 문제, 우울·불안 등 정서적 어려움을 겪고 있는 모든 근로자에게 도움이 됩니다. 심각한 위기 상황이 아니더라도 예방 차원에서 이용할 수 있습니다.',
  },
  {
    q: '기업은 EAP 도입 시 어떤 효과를 기대할 수 있나요?',
    a: '구성원의 정신건강 지원을 통해 생산성 향상, 결근·이직률 감소, 직무만족도 개선 효과가 보고됩니다. 건강한 조직문화 조성과 기업의 사회적 책임(ESG) 실천에도 기여합니다.',
  },
];

export default function EapCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: 'EAP(기업)상담', url: `${SITE_CONFIG.url}/counseling/eap` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'EAP(기업)상담 – 근로자 지원 프로그램',
    description: '직장인의 직무만족과 삶의 질 향상을 위한 정신건강 지원 상담. 대인관계, 직무갈등, 번아웃, 조직갈등, 정서관리를 전문으로 합니다.',
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    serviceType: 'EAP 기업상담',
    areaServed: { '@type': 'Country', name: 'KR' },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[
          { label: '상담 프로그램', href: '/counseling' },
          { label: 'EAP(기업)상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>EAP(기업)상담</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            근로자 지원 프로그램 (Employee Assistance Program)
          </p>
          <p className="mt-3 text-base text-[#5c605d] leading-relaxed">
            직장인의 직무만족과 삶의 질 향상을 위한 정신건강 지원 상담
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>기업 · 기관 · 단체 근로자</span>
            </div>
          </div>
        </section>

        {/* What is EAP */}
        <section className="mb-16">
          <h2>EAP 기업상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            EAP(Employee Assistance Program)는 기업과 상담기관이 협약을 맺어 근로자에게 전문 심리상담 서비스를 제공하는 제도입니다.
            직무 스트레스, 번아웃, 대인관계 갈등, 정서적 어려움 등 직장 내외의 다양한 문제를 다루며,
            조직의 생산성을 높이고 구성원의 삶의 질을 향상시킵니다.
            모든 상담 내용은 철저히 비밀이 보장됩니다.
          </p>
        </section>

        {/* Service Areas */}
        <section className="mb-16">
          <h2>주요 서비스 영역</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {serviceAreas.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-[#f0ede8]">
                <item.icon className="h-7 w-7 text-[#2d6a4f]" />
                <p className="mt-3 font-semibold text-[#2f3331]">{item.title}</p>
                <p className="mt-1 text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>EAP 도입 및 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '협약 체결', desc: '기업과 앤아더라이프 연구소 간 EAP 서비스 협약을 맺습니다.' },
              { step: '2', title: '안내 및 접수', desc: '근로자에게 서비스 이용 방법을 안내하고, 신청을 받습니다.' },
              { step: '3', title: '매칭 및 상담', desc: '담당 상담사를 배정하고, 대면 또는 온라인으로 상담을 진행합니다.' },
              { step: '4', title: '사후 관리', desc: '상담 종결 후 필요에 따라 사후 지원 및 집계 보고서를 제공합니다.' },
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

        {/* Partners */}
        <section className="mb-16">
          <h2>협력 파트너</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            앤아더라이프 심리상담연구소는 다양한 기업·기관과 협력하여 근로자 정신건강 지원 서비스를 제공하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['(주)텔레스헬스', '다인C&M', 'EAP협회', '외 다수'].map((partner, i) => (
              <span
                key={i}
                className="rounded-full border border-[#b1f0ce] bg-[#f0f5f2] px-4 py-2 text-sm text-[#2d6a4f] font-medium"
              >
                {partner}
              </span>
            ))}
          </div>
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
          <h2 className="text-xl">건강한 조직문화, 함께 만들어 갑니다.</h2>
          <p className="mt-2 text-[#5c605d]">EAP 도입 문의 및 근로자 상담 예약을 도와드립니다.</p>
          <Link
            href={`/contact?type=${encodeURIComponent('EAP(기업)상담')}`}
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
