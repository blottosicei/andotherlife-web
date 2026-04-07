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
  CloudRain, AlertCircle, Brain, UserX,
  Repeat, Heart, Briefcase, Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '개인상담 (성인)',
    description: '우울, 불안, 강박, 공황, 대인관계 어려움 등 성인의 다양한 심리 문제를 위한 전문 개인상담 프로그램입니다.',
    path: '/counseling/individual',
  }),
};

const targets = [
  { icon: CloudRain, title: '우울·무기력', desc: '의욕 저하, 지속적인 슬픔, 일상 기능의 어려움' },
  { icon: AlertCircle, title: '불안·걱정', desc: '과도한 걱정, 긴장, 예기 불안, 범불안' },
  { icon: Repeat, title: '강박·반복 사고', desc: '반복적인 생각이나 행동으로 일상이 방해받는 경우' },
  { icon: Brain, title: '편집·공황', desc: '극심한 공포 발작, 비합리적인 의심과 불신' },
  { icon: UserX, title: '대인기피·사회공포', desc: '사람 만나기가 두렵고, 사회적 상황에서 극도로 긴장' },
  { icon: Users, title: '대인관계 어려움', desc: '갈등, 경계 설정, 지속적인 관계 문제' },
  { icon: Briefcase, title: '직장 내 스트레스', desc: '번아웃, 상사·동료 갈등, 과부하, 직장 내 괴롭힘' },
  { icon: Sparkles, title: '자아정체성·자존감', desc: '나는 누구인지, 무엇을 원하는지 탐색이 필요한 경우' },
];

const faqs = [
  {
    q: '개인상담은 어떻게 진행되나요?',
    a: '주 1회 50분, 상담사와 일대일로 진행됩니다. 초기에는 현재의 어려움과 목표를 탐색하고, 이후 개인 맞춤형 접근으로 진행합니다.',
  },
  {
    q: '몇 회기나 받아야 하나요?',
    a: '단기 목표(특정 문제 해결)는 8~12회기, 깊은 변화를 원할 경우 16회기 이상을 권장합니다. 상담사와 함께 계획을 세웁니다.',
  },
  {
    q: '상담과 약물치료를 병행해도 되나요?',
    a: '네. 정신건강의학과 약물치료와 상담을 함께 진행하는 경우 효과가 높아지는 경우가 많습니다. 병행 여부는 상담사와 상의하세요.',
  },
  {
    q: '비밀은 보장되나요?',
    a: '모든 내용은 엄격하게 비밀이 보장됩니다. 병원 진료기록에 남지 않으며, 생명 위험 상황에서만 법적 예외가 적용됩니다.',
  },
  {
    q: '상담사가 나를 이상하게 볼까봐 걱정돼요.',
    a: '상담사는 판단하지 않습니다. 어떤 이야기를 하셔도 안전합니다. 상담 공간은 오직 내담자를 위한 공간입니다.',
  },
];

export default function IndividualCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '개인상담 (성인)', url: `${SITE_CONFIG.url}/counseling/individual` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '개인상담 (성인)',
    description: '우울, 불안, 강박, 공황, 대인기피, 사회공포, 대인관계, 직장 스트레스 등 성인 전문 개인상담',
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
          { label: '개인상담 (성인)' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>개인상담 (성인)</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            나만의 어려움을 안전하게 이야기할 수 있는 공간
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>성인 (18세 이상)</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-[#2d6a4f]" />
              <span>회당 50분, 주 1회</span>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>개인상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            개인상담은 내담자와 상담사가 일대일로 만나 감정, 생각, 행동 패턴을 탐색하는 과정입니다.
            일상의 어려움부터 깊은 심리적 고통까지, 전문 상담사와 함께 안전하게 풀어나갑니다.
            비밀이 보장되는 공간에서 솔직하게 이야기할 수 있습니다.
          </p>
        </section>

        {/* Targets */}
        <section className="mb-16">
          <h2>이런 분들에게 도움이 됩니다</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {targets.map((item, i) => (
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
          <h2>상담 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '초기 탐색', desc: '현재 겪고 있는 어려움과 상담 목표를 함께 이야기합니다.' },
              { step: '2', title: '심층 이해', desc: '감정, 생각, 행동의 패턴을 탐색하고 뿌리를 이해합니다.' },
              { step: '3', title: '변화 실천', desc: '새로운 대처 방식을 배우고 일상에서 적용합니다.' },
              { step: '4', title: '성장 확인', desc: '변화를 점검하고 스스로 나아갈 수 있는 힘을 키웁니다.' },
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
          <h2 className="text-xl">혼자 감당하지 않아도 됩니다.</h2>
          <p className="mt-2 text-[#5c605d]">전문 상담사가 함께 이야기를 들어드립니다.</p>
          <Link
            href="/contact"
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
