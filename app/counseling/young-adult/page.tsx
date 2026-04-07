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
  Briefcase, Compass, Heart, UserCircle,
  CloudRain, AlertCircle, Sparkles, HelpCircle,
  CheckCircle, AlertTriangle, Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '2030 청년상담 프로그램',
    description: '20~30대가 겪는 직장 스트레스, 진로 고민, 우울·불안을 위한 전문 상담. 첫 상담 무료, 회당 20,000원.',
    path: '/counseling/young-adult',
  }),
};

const concerns = [
  { icon: Briefcase, title: '직장 스트레스', desc: '번아웃, 상사 갈등, 과도한 업무로 지쳐가는 경우' },
  { icon: Compass, title: '진로 고민', desc: '취업·이직·커리어 방향을 찾지 못해 막막한 경우' },
  { icon: Users, title: '가족 관계', desc: '부모·형제와의 갈등, 기대 압박으로 힘든 경우' },
  { icon: Heart, title: '연인 관계', desc: '이별, 신뢰 문제, 반복되는 갈등 패턴이 있는 경우' },
  { icon: CloudRain, title: '우울·무기력', desc: '의욕이 없고, 아무것도 하기 싫고, 의미를 잃은 경우' },
  { icon: AlertCircle, title: '불안·걱정', desc: '미래가 두렵고, 작은 일에도 과도하게 긴장되는 경우' },
  { icon: UserCircle, title: '자기 이해', desc: '나는 누구인지, 무엇을 원하는지 잘 모르겠는 경우' },
  { icon: HelpCircle, title: '기타', desc: '위에 해당하지 않더라도 그냥 힘들다면 괜찮습니다' },
];

const faqs = [
  {
    q: '상담사는 어떤 분인가요?',
    a: '한국상담학회 수련과정을 밟고 있는 석·박사 수련생이 진행하며, 교수급 슈퍼바이저의 정기 슈퍼비전을 의무적으로 받습니다. 자격증만 있는 상담사가 아니라 체계적으로 관리되는 전문가입니다.',
  },
  {
    q: '비밀은 보장되나요?',
    a: '네. 상담 내용은 병원 진료기록에 남지 않으며, 외부에 공개되지 않습니다. 단, 본인 또는 타인의 생명이 위험한 경우에는 법적 의무에 따라 예외가 적용될 수 있습니다.',
  },
  {
    q: '왜 이렇게 저렴한가요?',
    a: '앤아더라이프는 수련생 상담 모델을 운영합니다. 수련생은 실습 경험을 쌓고, 내담자는 저렴하게 전문 상담을 받는 구조입니다. 슈퍼비전 시스템 덕분에 품질은 유지됩니다.',
  },
  {
    q: '몇 회기나 받아야 하나요?',
    a: '기본 6회기를 권장하지만, 상황에 따라 연장하거나 줄일 수 있습니다. 언제든 중단할 수 있으며, 강제로 이어가지 않습니다.',
  },
  {
    q: '전체 과정이 어떻게 되나요?',
    a: '① 신청서 작성 → ② 사전 조율(날짜·상담사 매칭) → ③ 정기 상담(주 1회, 50분) → ④ 종결·연장 여부 논의. 첫 상담 전에 상담사와 간단한 사전 안내 통화가 있습니다.',
  },
  {
    q: '큰 문제가 없어도 상담받아도 되나요?',
    a: '물론입니다. 상담은 심각한 정신질환 치료만을 위한 것이 아닙니다. 자기 이해, 성장, 스트레스 관리 목적으로도 충분히 활용할 수 있습니다.',
  },
  {
    q: '병원 치료와 어떻게 다른가요?',
    a: '병원(정신건강의학과)은 진단과 약물치료 중심이고, 상담은 대화를 통해 감정과 생각을 탐색하는 과정입니다. 병원 치료와 병행하는 것도 가능합니다.',
  },
  {
    q: '예약 취소·변경 규정이 있나요?',
    a: '상담 2일 전까지 취소하면 전액 환불, 1일 전 취소는 50% 환불, 당일 취소·노쇼는 환불이 어렵습니다. 변경은 가능한 한 빨리 연락해주세요.',
  },
  {
    q: '주변에 알려질까 봐 걱정돼요.',
    a: '상담은 병원 진료기록에 남지 않아 보험·취업 심사에 영향을 주지 않습니다. 요즘은 상담을 자기관리로 보는 시각이 늘고 있습니다.',
  },
  {
    q: '어떻게 신청하나요?',
    a: '아래 "첫 상담 신청하기" 버튼을 누르시거나 문의 페이지에서 간단한 신청서를 작성해주세요. 확인 후 2~3 영업일 내에 연락드립니다.',
  },
];

export default function YoungAdultCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '2030 청년상담', url: `${SITE_CONFIG.url}/counseling/young-adult` },
  ]);

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '2030 청년상담 프로그램',
    description: '20~30대 청년의 직장 스트레스, 진로, 우울·불안 전문 상담. 첫 상담 무료, 회당 20,000원.',
    provider: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    serviceType: '심리상담',
    areaServed: { '@type': 'Country', name: 'KR' },
    offers: {
      '@type': 'Offer',
      price: '20000',
      priceCurrency: 'KRW',
      description: '회당 50분 / 기본 6회기 / 첫 상담 무료',
    },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
        <Breadcrumb items={[
          { label: '상담 프로그램', href: '/counseling' },
          { label: '2030 청년상담' },
        ]} />

        {/* Hero */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#f0f5f2] to-[#e7e2da] p-8 md:p-12">
          <h1>상담, 부담스럽게 느껴졌다면.<br className="hidden md:block" /> 이제는 가볍게 시작해보세요.</h1>
          <p className="mt-3 text-lg text-[#5c605d]">
            20~30대를 위한 전문 청년상담 — 한국상담학회 수련과정 + 교수급 슈퍼비전
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-[#2d6a4f]" />
              <span>첫 상담 무료</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-[#2d6a4f]" />
              <span>회당 20,000원 / 50분</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium">
              <Users className="h-4 w-4 text-[#2d6a4f]" />
              <span>20대, 30대 청년</span>
            </div>
          </div>
        </section>

        {/* Concerns */}
        <section className="mb-16">
          <h2>이런 고민이 있다면</h2>
          <p className="mt-2 text-[#5c605d]">어떤 이유든 괜찮습니다. 혼자 감당하지 않아도 됩니다.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {concerns.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-[#f0ede8]">
                <item.icon className="h-7 w-7 text-[#2d6a4f]" />
                <p className="mt-3 font-semibold text-[#2f3331]">{item.title}</p>
                <p className="mt-1 text-sm text-[#5c605d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why us — comparison */}
        <section className="mb-16">
          <h2>왜 앤아더라이프인가?</h2>
          <p className="mt-2 text-[#5c605d]">같은 상담, 달라지는 것들을 비교해보세요.</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-[#2d6a4f] text-white">
                  <th className="p-4 text-left font-semibold">항목</th>
                  <th className="p-4 text-left font-semibold">일반 사설 상담</th>
                  <th className="p-4 text-left font-semibold bg-[#1f5e44]">앤아더라이프</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#f0ede8]">
                <tr>
                  <td className="p-4 font-medium text-[#2f3331]">비용</td>
                  <td className="p-4 text-[#5c605d]">회당 5~10만원</td>
                  <td className="p-4 text-[#2d6a4f] font-semibold">회당 2만원 (첫 회 무료)</td>
                </tr>
                <tr className="bg-[#f9f8f6]">
                  <td className="p-4 font-medium text-[#2f3331]">자격</td>
                  <td className="p-4 text-[#5c605d]">민간자격증 혼재</td>
                  <td className="p-4 text-[#2d6a4f] font-semibold">한국상담학회 수련과정</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-[#2f3331]">품질 관리</td>
                  <td className="p-4 text-[#5c605d]">개인 역량에 의존</td>
                  <td className="p-4 text-[#2d6a4f] font-semibold">교수급 슈퍼비전 필수</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2>상담 프로세스</h2>
          <ol className="mt-6 space-y-4">
            {[
              { step: '1', title: '신청서 작성', desc: '문의 페이지에서 간단한 신청서를 작성합니다. 5분이면 충분합니다.' },
              { step: '2', title: '사전 조율', desc: '담당자가 연락해 상담사 매칭과 일정을 조율합니다.' },
              { step: '3', title: '정기 상담', desc: '주 1회 50분, 나만의 공간에서 편하게 이야기합니다. 기본 6회기.' },
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

        {/* Pricing */}
        <section className="mb-16">
          <h2>가격 안내</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: Sparkles, label: '첫 상담', value: '무료', note: '부담 없이 시작' },
              { icon: Clock, label: '회당 비용', value: '20,000원', note: '50분 기준' },
              { icon: CheckCircle, label: '기본 회기', value: '6회기', note: '연장 가능' },
              { icon: Heart, label: '중단 정책', value: '언제든 가능', note: '강제 이어가기 없음' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm border border-[#f0ede8] text-center">
                <item.icon className="mx-auto h-8 w-8 text-[#2d6a4f]" />
                <p className="mt-3 text-sm text-[#5c605d]">{item.label}</p>
                <p className="mt-1 text-xl font-bold text-[#2f3331]">{item.value}</p>
                <p className="mt-1 text-xs text-[#8a8f8b]">{item.note}</p>
              </div>
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

        {/* Warning */}
        <section className="mb-16 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-800">상담이 제한되는 경우</p>
              <p className="mt-1 text-sm text-amber-700 leading-relaxed">
                자살 위기, 심각한 알코올·약물 중독, 급성 정신증, 심각한 외상 후 스트레스 장애(PTSD)의 경우
                전문 의료기관 연계가 필요할 수 있습니다. 아래 위기 상담 전화를 이용해주세요.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="tel:1393" className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:underline">
                  <Phone className="h-4 w-4" /> 자살예방상담전화 1393
                </a>
                <a href="tel:15770199" className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:underline">
                  <Phone className="h-4 w-4" /> 정신건강위기상담전화 1577-0199
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 rounded-xl bg-[#e7e2da] p-8 text-center">
          <h2 className="text-xl">혼자 끙끙 앓지 마세요.<br />첫 상담은 무료입니다.</h2>
          <p className="mt-2 text-[#5c605d]">지금 바로 신청서를 작성하면 2~3 영업일 내에 연락드립니다.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-lg bg-[#2d6a4f] px-6 py-3 text-base font-medium text-white hover:bg-[#1f5e44] transition-colors"
          >
            첫 상담 신청하기 <ArrowRight className="ml-2 h-4 w-4" />
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
