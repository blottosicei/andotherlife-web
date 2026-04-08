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
  Building2, Scale, GraduationCap, BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '사회공헌상담',
    description: '앤아더라이프는 정신건강 바우처, 서울시 가정법원 가사상담, 교육활동보호센터 등 다양한 공공기관과 협력하여 심리상담 서비스를 제공합니다.',
    path: '/counseling/social-contribution',
  }),
};

const services = [
  {
    icon: Building2,
    title: '정신건강 심리상담 바우처 사업',
    desc: '경제적 어려움으로 상담 접근이 어려운 분들을 위해 정부 바우처를 활용한 심리상담 서비스를 제공합니다.',
  },
  {
    icon: Scale,
    title: '서울시 가정법원 가사상담',
    desc: '가정법원과 협력하여 이혼, 양육권, 가족 갈등 등 법적 분쟁 과정에서의 심리적 어려움을 지원합니다.',
  },
  {
    icon: GraduationCap,
    title: '서울시 교육활동보호센터 협력기관',
    desc: '교원의 교육활동 침해 피해 회복을 위한 심리상담 및 정서적 지원을 제공하는 협력기관입니다.',
  },
  {
    icon: BookOpen,
    title: '서울 서부교육지원청 SEM119 협력기관',
    desc: '학생 정서·행동 위기 지원 사업(SEM119)의 협력기관으로서 위기 학생 및 가족 심리 지원에 참여합니다.',
  },
];

const faqs = [
  {
    q: '바우처 상담은 어떻게 신청하나요?',
    a: '정신건강 심리상담 바우처는 주민센터 또는 복지로(www.bokjiro.go.kr)를 통해 신청하실 수 있습니다. 자격 조건 충족 후 바우처가 발급되면 앤아더라이프에서 상담을 받으실 수 있습니다.',
  },
  {
    q: '가사상담은 어떤 분들이 받을 수 있나요?',
    a: '서울가정법원으로부터 가사상담이 의뢰된 분들이 대상입니다. 이혼 조정, 양육권 분쟁 등 가사 사건 당사자가 법원의 안내를 통해 상담에 연결됩니다.',
  },
  {
    q: '교원 심리상담은 일반 상담과 다른가요?',
    a: '교육활동 침해 피해 교원을 위한 상담은 교권 침해 트라우마, 직업 소진, 관계 회복에 특화된 접근을 사용합니다. 비밀이 보장되며 교육청과 정보가 공유되지 않습니다.',
  },
  {
    q: '사회공헌 상담도 전문성이 동일하게 보장되나요?',
    a: '네. 사회공헌 서비스도 일반 상담과 동일한 전문 상담사가 진행하며, 상담의 질은 차이가 없습니다. 모든 상담은 비밀이 보장됩니다.',
  },
];

export default function SocialContributionPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '사회공헌상담', url: `${SITE_CONFIG.url}/counseling/social-contribution` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '사회공헌상담',
    description: '정신건강 바우처, 가정법원 가사상담, 교육활동보호센터 등 공공기관 협력 심리상담 서비스',
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    serviceType: '공공기관 협력 심리상담',
    areaServed: { '@type': 'City', name: '서울' },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[
          { label: '상담 프로그램', href: '/counseling' },
          { label: '사회공헌상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>사회공헌상담</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            공공기관 협력 심리상담 서비스
          </p>
          <p className="mt-4 max-w-2xl text-[#2f3331] leading-[1.8]">
            앤아더라이프는 다양한 공공기관과 협력하여 심리상담 서비스를 제공합니다.
          </p>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>사회공헌상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            사회공헌상담은 공공기관 및 정부 지원 사업과의 협력을 통해 심리상담 접근성을 높이는 서비스입니다.
            경제적 부담 없이 전문 심리상담을 받을 수 있도록 돕거나, 법적·교육적 위기 상황에 놓인 분들에게
            정서적 지원을 제공합니다. 앤아더라이프는 지역사회와 함께하는 책임 있는 상담기관으로서
            공공 영역에서도 동일한 전문성과 윤리 기준을 유지합니다.
          </p>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2>협력 서비스 목록</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-[#f0ede8]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b1f0ce]">
                    <item.icon className="h-5 w-5 text-[#1f5e44]" />
                  </div>
                  <p className="font-semibold text-[#2f3331]">{item.title}</p>
                </div>
                <p className="text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>이용 안내</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '자격 확인', desc: '공공기관 또는 주민센터를 통해 서비스 이용 자격을 확인하세요.' },
              { step: '2', title: '신청 및 연계', desc: '해당 기관에 신청하거나 법원·교육청의 안내에 따라 상담이 연결됩니다.' },
              { step: '3', title: '초기 상담', desc: '앤아더라이프 상담사와 초기 면담을 통해 상담 방향을 결정합니다.' },
              { step: '4', title: '상담 진행', desc: '개인 상황에 맞는 전문 상담이 비밀 보장 하에 진행됩니다.' },
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
          <h2 className="text-xl">공공 서비스도 전문 상담이 가능합니다.</h2>
          <p className="mt-2 text-[#5c605d]">이용 가능한 서비스를 확인하고 상담을 신청해 보세요.</p>
          <Link
            href={`/contact?type=${encodeURIComponent('사회공헌상담')}`}
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
