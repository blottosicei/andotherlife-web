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
  Heart, AlertCircle, CloudRain, BookOpen,
  UserX, Home, Utensils, VolumeX, Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '아동·청소년 상담',
    description: '애착 불안정, 학교 부적응, 우울·불안, 은둔형 외톨이, 섭식장애 등 아동·청소년을 위한 전문 상담 프로그램입니다.',
    path: '/counseling/child-youth',
  }),
};

const targets = [
  { icon: Heart, title: '애착 불안정', desc: '부모나 주 양육자와의 불안정한 애착으로 어려움이 있는 경우' },
  { icon: CloudRain, title: '정서 문제', desc: '감정 조절이 어렵고, 충동적이거나 지나치게 위축된 경우' },
  { icon: BookOpen, title: '학교 부적응', desc: '등교 거부, 학업 스트레스, 교우 관계 문제' },
  { icon: AlertCircle, title: '우울·불안', desc: '지속적인 무기력, 걱정, 두려움으로 일상이 힘든 경우' },
  { icon: Compass, title: '진로·정체성', desc: '나는 누구인지, 무엇을 원하는지 탐색이 필요한 청소년' },
  { icon: UserX, title: '은둔형 외톨이·고립', desc: '방에서 나오지 않거나 사회적 활동을 완전히 끊은 경우' },
  { icon: Home, title: '부모 갈등 영향', desc: '부모의 갈등·이혼 등으로 정서적 상처를 받은 경우' },
  { icon: Utensils, title: '섭식장애', desc: '거식증, 폭식증 등 음식과 몸에 대한 왜곡된 인식' },
  { icon: VolumeX, title: '선택적 함묵증', desc: '특정 상황에서 말을 하지 못하는 불안 관련 장애' },
];

const faqs = [
  {
    q: '몇 살부터 상담이 가능한가요?',
    a: '만 6세(초등학교 입학 연령)부터 고등학생(18세)까지 아동·청소년 상담을 진행합니다. 더 어린 연령은 별도 문의해주세요.',
  },
  {
    q: '부모도 함께 참여해야 하나요?',
    a: '아동의 경우 초기 부모 면담이 필수입니다. 청소년의 경우 당사자의 동의를 우선하며, 필요에 따라 부모 상담을 병행합니다.',
  },
  {
    q: '아이가 상담을 거부하면 어떻게 하나요?',
    a: '억지로 진행하지 않습니다. 상담 동기가 낮은 경우 부모 상담으로 시작해 아이의 환경을 먼저 지원하는 방식을 택할 수 있습니다.',
  },
  {
    q: '상담 내용이 부모에게 전달되나요?',
    a: '청소년의 경우 본인 동의 없이 내용을 전달하지 않습니다. 단, 위험 상황에서는 안전을 위해 보호자에게 알릴 수 있습니다.',
  },
  {
    q: '학교 상담사와 어떻게 다른가요?',
    a: '학교 상담사는 학교 내 지원에 초점을 두며, 전문 상담사는 더 심층적이고 지속적인 개입이 가능합니다. 병행도 가능합니다.',
  },
];

export default function ChildYouthCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '아동·청소년 상담', url: `${SITE_CONFIG.url}/counseling/child-youth` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '아동·청소년 상담',
    description: '애착 불안정, 학교 부적응, 우울·불안, 은둔형 외톨이, 섭식장애, 선택적 함묵증 등 아동·청소년 전문 상담',
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
          { label: '아동·청소년 상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>아동·청소년 상담</h1>
          <p className="mt-2 text-lg text-[#5c605d]">
            성장 과정의 어려움을 함께 헤쳐나가는 전문 상담
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>아동 (만 6세~), 청소년 (중·고등학생)</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-[#2d6a4f]" />
              <span>회당 50분, 주 1회</span>
            </div>
          </div>
        </section>

        {/* What is it */}
        <section className="mb-16">
          <h2>아동·청소년 상담이란?</h2>
          <p className="mt-4 text-[#2f3331] leading-[1.8]">
            아동과 청소년은 성인과 다른 방식으로 어려움을 표현합니다. 말로 표현하지 못하는 감정, 행동 변화,
            관계 문제 등을 전문적으로 이해하고 지원합니다. 아이의 발달 단계와 환경을 고려한 맞춤형 접근으로
            건강한 성장을 돕습니다.
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

        {/* Process */}
        <section className="mb-16">
          <h2>상담 진행 과정</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '부모·보호자 초기 면담', desc: '양육 환경, 발달 이력, 주요 어려움을 파악합니다.' },
              { step: '2', title: '아동·청소년 초기 회기', desc: '놀이, 대화, 활동을 통해 아이와 신뢰를 형성합니다.' },
              { step: '3', title: '정기 상담', desc: '아이의 감정·행동 패턴을 탐색하고 건강한 대처 방식을 배웁니다.' },
              { step: '4', title: '부모 코칭 병행', desc: '필요에 따라 부모 상담을 병행해 가정 환경을 지원합니다.' },
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
          <h2 className="text-xl">아이의 어려움, 함께 해결해드립니다.</h2>
          <p className="mt-2 text-[#5c605d]">전문 상담사가 아이와 가족을 지원합니다.</p>
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
