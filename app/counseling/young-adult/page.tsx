import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/constants/site';
import {
  ArrowRight, ArrowLeft,
  Sparkles, Clock, ShieldCheck,
  GraduationCap, Shield, Scale,
  FileText, PhoneCall, MessageCircle, CheckCircle,
  Brain, Puzzle, Search,
  AlertTriangle, Phone,
} from 'lucide-react';
import { ConcernChecklist } from './_components/ConcernChecklist';
import { TestimonialCarousel } from './_components/TestimonialCarousel';
import { FAQSection } from './_components/FAQSection';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: '2030 청년상담 프로그램',
    description: '20~30대가 겪는 직장 스트레스, 진로 고민, 우울·불안을 위한 전문 상담. 첫 상담 무료, 회당 20,000원. 한국상담학회 수련과정 + 교수급 슈퍼비전.',
    path: '/counseling/young-adult',
  }),
};

const faqsForSchema = [
  { question: '큰 문제가 없어도 상담받아도 되나요?', answer: '물론입니다. 상담은 심각한 정신질환 치료만을 위한 것이 아닙니다. 자기 이해, 성장, 스트레스 관리 목적으로도 충분히 활용할 수 있습니다.' },
  { question: '주변에 알려질까 봐 걱정돼요.', answer: '상담은 병원 진료기록에 남지 않아 보험·취업 심사에 영향을 주지 않습니다.' },
  { question: '상담사는 어떤 분인가요?', answer: '한국상담학회 수련과정을 밟고 있는 석·박사 수련생이 진행하며, 교수급 슈퍼바이저의 정기 슈퍼비전을 의무적으로 받습니다.' },
  { question: '심리검사도 함께 받을 수 있나요?', answer: 'MMPI-2, TCI 등을 상담과 병행할 수 있습니다. 검사 결과를 바탕으로 상담 방향을 설계하면 더 효과적입니다.' },
  { question: '왜 이렇게 저렴한가요?', answer: '수련생 상담 모델을 운영합니다. 수련생은 실습 경험을 쌓고, 내담자는 저렴하게 전문 상담을 받는 구조입니다.' },
  { question: '전체 과정이 어떻게 되나요?', answer: '① 신청서 작성 → ② 사전 조율 → ③ 정기 상담(주 1회, 50분) → ④ 종결·연장 여부 논의.' },
  { question: '몇 회기나 받아야 하나요?', answer: '기본 6회기를 권장하지만, 상황에 따라 연장하거나 줄일 수 있습니다. 언제든 중단 가능합니다.' },
  { question: '비밀은 보장되나요?', answer: '네. 상담 내용은 병원 진료기록에 남지 않으며, 외부에 공개되지 않습니다.' },
  { question: '예약 취소·변경 규정이 있나요?', answer: '상담 2일 전까지 취소하면 전액 환불, 1일 전 취소는 50% 환불, 당일 취소·노쇼는 환불이 어렵습니다.' },
  { question: '병원 치료와 어떻게 다른가요?', answer: '병원은 진단과 약물치료 중심이고, 상담은 대화를 통해 감정과 생각을 탐색하는 과정입니다. 병행도 가능합니다.' },
];

const contactHref = `/contact?type=${encodeURIComponent('2030 청년상담 프로그램')}`;

const trustPoints = [
  {
    icon: GraduationCap,
    title: '한국상담학회 수련과정',
    desc: '민간자격증이 아닌 학회 공인 수련 프로그램. 석·박사 과정의 전문 인력이 상담합니다.',
  },
  {
    icon: Shield,
    title: '교수급 정기 슈퍼비전',
    desc: '모든 상담 사례를 교수급 슈퍼바이저가 검토합니다. 상담사 혼자 판단하지 않습니다.',
  },
  {
    icon: Scale,
    title: '합리적 비용 구조',
    desc: '수련생은 실습 경험을, 내담자는 전문 상담을 저비용으로. 서로에게 이로운 모델입니다.',
  },
];

const processSteps = [
  { icon: FileText, title: '신청서 작성', desc: '문의 페이지에서 간단한 신청서 작성', time: '5분' },
  { icon: PhoneCall, title: '사전 조율', desc: '담당자가 연락해 상담사 매칭·일정 확인', time: '2~3일 내' },
  { icon: MessageCircle, title: '정기 상담', desc: '주 1회 50분, 편안한 공간에서 대화', time: '기본 6회기' },
  { icon: CheckCircle, title: '종결 / 연장', desc: '원할 때 자유롭게 결정', time: '상담사와 논의' },
];

const psychTestQuestions = [
  { q: '"나는 왜 항상 불안하지?"', a: 'MMPI가 감정 패턴의 근거를 보여줍니다' },
  { q: '"나는 왜 관계에서 같은 실수를 반복하지?"', a: 'TCI가 기질적 성향을 알려줍니다' },
  { q: '"상담을 받고 싶은데 뭘 이야기해야 할지 모르겠어"', a: '검사 결과가 상담의 출발점이 됩니다' },
  { q: '"내가 정말 우울한 건지, 그냥 힘든 건지 모르겠어"', a: '객관적 데이터로 현재 상태를 확인합니다' },
];

export default function YoungAdultCounselingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 프로그램', url: `${SITE_CONFIG.url}/counseling` },
    { name: '2030 청년상담', url: `${SITE_CONFIG.url}/counseling/young-adult` },
  ]);

  const faqSchema = generateFAQSchema(faqsForSchema);

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

      <main>
        {/* ─── 1. Hero ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f5f2] via-[#f5f3ef] to-[#e7e2da]">
          {/* Hero background illustration — full coverage */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-young-adult.webp"
              alt=""
              fill
              className="object-cover object-center opacity-40 md:opacity-50"
              priority
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f0f5f2]/90 via-[#f5f3ef]/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 md:px-6">
            {/* Breadcrumb inside hero */}
            <div className="pt-8">
              <Breadcrumb items={[
                { label: '상담 프로그램', href: '/counseling' },
                { label: '2030 청년상담' },
              ]} />
            </div>

            <div className="pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28">
              <div className="max-w-xl">
                <h1 className="text-[28px] leading-[1.5] md:text-[36px] md:leading-[1.5]">
                  괜찮다고 말했지만,<br />
                  사실은 괜찮지 않은 날들.
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-[#5c605d]">
                  혼자 버티는 게 익숙해진 당신에게,<br className="hidden sm:block" />
                  이제는 다른 선택지가 있습니다.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Sparkles className="h-4 w-4 text-[#2d6a4f]" />
                    <span>첫 상담 무료</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Clock className="h-4 w-4 text-[#2d6a4f]" />
                    <span>회당 20,000원 / 50분</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <ShieldCheck className="h-4 w-4 text-[#2d6a4f]" />
                    <span>기록에 남지 않습니다</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-center md:items-start">
                  <Link
                    href={contactHref}
                    className="flex w-full items-center justify-center rounded-xl bg-[#2d6a4f] px-7 py-3.5 text-base font-medium text-white shadow-lg shadow-[#2d6a4f]/20 hover:bg-[#1f5e44] transition-colors md:inline-flex md:w-auto"
                  >
                    첫 상담 무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-sm text-[#8a8f8b]">5분이면 신청 완료</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Concern Checklist (client component) ─── */}
        <ConcernChecklist />

        {/* ─── 3. Psychological Testing Hook ─── */}
        <section className="bg-[#f0f5f2] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="text-center">막연한 고민, 심리검사로 선명해집니다.</h2>
            <p className="mt-3 text-center text-[#5c605d]">
              내가 왜 이런 감정을 느끼는지, 검사 결과가 말해줍니다.
            </p>

            {/* Test cards — full background image with text overlay */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="group relative h-72 overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg sm:h-80">
                <Image
                  src="/images/psych-mmpi.webp"
                  alt="MMPI-2 성격·심리검사 일러스트"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">MMPI-2 성격·심리검사</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    내 안의 불안, 우울, 스트레스가 어디서 오는지 객관적으로 확인합니다
                  </p>
                </div>
              </div>
              <div className="group relative h-72 overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg sm:h-80">
                <Image
                  src="/images/psych-tci.webp"
                  alt="TCI 기질·성격검사 일러스트"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Puzzle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">TCI 기질·성격검사</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    타고난 기질과 형성된 성격을 알면, 반복되는 패턴이 보입니다
                  </p>
                </div>
              </div>
            </div>

            {/* Curiosity items */}
            <div className="mt-10 space-y-4">
              <h3 className="text-center font-heading text-xl font-bold text-[#2d6a4f]">이런 궁금증이 있다면 심리검사를 받아보세요</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {psychTestQuestions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl bg-white p-4">
                    <Search className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                    <div>
                      <p className="text-sm font-medium text-[#2f3331]">{item.q}</p>
                      <p className="mt-1 text-sm text-[#5c605d]">
                        <span className="text-[#2d6a4f]">→</span> {item.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to contact for psych testing */}
            <div className="mt-10 text-center">
              <p className="text-sm text-[#5c605d]">
                앤아더라이프에서는 상담과 심리검사를 함께 진행할 수 있습니다.
              </p>
              <Link
                href={`/contact?type=${encodeURIComponent('심리검사')}`}
                className="mt-4 inline-flex items-center rounded-xl bg-[#2d6a4f] px-6 py-3 text-sm font-medium text-white hover:bg-[#1f5e44] transition-colors"
              >
                심리검사 받기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 4. Testimonials (client component) ─── */}
        <TestimonialCarousel />

        {/* ─── 5. Trust Section ─── */}
        <section className="bg-[#f9f9f6] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="text-center">전문상담 받고 싶은데, 비용이 부담된다면</h2>
            <p className="mt-3 text-center text-[#5c605d]">
              앤아더라이프는 수련 모델을 통해 비용 장벽을 낮췄습니다.
            </p>

            {/* Trust cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {trustPoints.map((item, i) => (
                <div key={i} className="rounded-2xl border border-[#e6e9e5] bg-white p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b1f0ce]">
                    <item.icon className="h-7 w-7 text-[#1f5e44]" />
                  </div>
                  <h3 className="mt-4 font-semibold text-[#2f3331]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c605d]">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Comparison — mobile cards / desktop table */}
            <div className="mt-10">
              {/* Mobile: stacked cards */}
              <div className="space-y-3 md:hidden">
                {[
                  { label: '비용', general: '회당 5~10만원', ours: '회당 2만원 (첫 회 무료)' },
                  { label: '자격', general: '민간자격증 혼재', ours: '한국상담학회 수련과정' },
                  { label: '품질 관리', general: '개인 역량에 의존', ours: '교수급 슈퍼비전 필수' },
                ].map((row, i) => (
                  <div key={i} className="rounded-xl border border-[#e6e9e5] bg-white p-4">
                    <p className="text-xs font-medium text-[#8a8f8b]">{row.label}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-sm text-[#5c605d] line-through">{row.general}</p>
                      <p className="text-sm font-semibold text-[#2d6a4f]">{row.ours}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop: table */}
              <table className="hidden md:table w-full border-collapse overflow-hidden rounded-2xl text-sm">
                <thead>
                  <tr className="bg-[#2d6a4f] text-white">
                    <th className="p-4 text-left font-semibold">항목</th>
                    <th className="p-4 text-left font-semibold">일반 사설 상담</th>
                    <th className="bg-[#1f5e44] p-4 text-left font-semibold">앤아더라이프</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ede8] bg-white">
                  <tr>
                    <td className="p-4 font-medium text-[#2f3331]">비용</td>
                    <td className="p-4 text-[#5c605d]">회당 5~10만원</td>
                    <td className="bg-[#f0f5f2] p-4 font-semibold text-[#2d6a4f]">회당 2만원 (첫 회 무료)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#2f3331]">자격</td>
                    <td className="p-4 text-[#5c605d]">민간자격증 혼재</td>
                    <td className="bg-[#f0f5f2] p-4 font-semibold text-[#2d6a4f]">한국상담학회 수련과정</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#2f3331]">품질 관리</td>
                    <td className="p-4 text-[#5c605d]">개인 역량에 의존</td>
                    <td className="bg-[#f0f5f2] p-4 font-semibold text-[#2d6a4f]">교수급 슈퍼비전 필수</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── 6. Mid-page CTA ─── */}
        <section className="bg-[#2d6a4f] py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              전문상담, 첫 회기는 무료로 경험해보세요.
            </h2>
            <Link
              href={contactHref}
              className="mt-8 inline-flex items-center rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#2d6a4f] shadow-lg hover:bg-[#b1f0ce] transition-colors"
            >
              첫 상담 신청하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-white/60">
              기록에 남지 않습니다 · 5분이면 신청 완료
            </p>
          </div>
        </section>

        {/* ─── 7. Process Timeline ─── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="text-center">이용 절차</h2>
            <p className="mt-3 text-center text-[#5c605d]">
              복잡하지 않습니다. 신청서 하나면 시작됩니다.
            </p>

            {/* Desktop horizontal */}
            <div className="mt-12 hidden md:flex md:items-start md:justify-between">
              {processSteps.map((step, i) => (
                <div key={i} className="flex flex-1 flex-col items-center text-center">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b1f0ce]">
                      <step.icon className="h-7 w-7 text-[#1f5e44]" />
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="absolute left-full top-1/2 h-px w-full -translate-y-1/2 border-t-2 border-dashed border-[#d4d9d5]" />
                    )}
                  </div>
                  <p className="mt-4 font-semibold text-[#2f3331]">{step.title}</p>
                  <p className="mt-1 text-sm text-[#5c605d]">{step.desc}</p>
                  <span className="mt-2 rounded-full bg-[#f0f5f2] px-3 py-1 text-xs text-[#8a8f8b]">{step.time}</span>
                </div>
              ))}
            </div>

            {/* Mobile vertical */}
            <div className="mt-10 space-y-6 md:hidden">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b1f0ce]">
                      <step.icon className="h-5 w-5 text-[#1f5e44]" />
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="mt-2 h-full w-px border-l-2 border-dashed border-[#d4d9d5]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-[#2f3331]">{step.title}</p>
                    <p className="mt-1 text-sm text-[#5c605d]">{step.desc}</p>
                    <span className="mt-2 inline-block rounded-full bg-[#f0f5f2] px-3 py-1 text-xs text-[#8a8f8b]">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. Pricing ─── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="text-center">투명한 비용 안내</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
              {/* Regular pricing card */}
              <div className="rounded-2xl border border-[#e6e9e5] bg-white p-8 text-center">
                <p className="text-sm font-medium text-[#5c605d]">회당 상담 비용</p>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-[#2f3331]">20,000</span>
                  <span className="ml-1 text-lg text-[#5c605d]">원</span>
                </p>
                <p className="mt-2 text-sm text-[#8a8f8b]">50분 기준 · 기본 6회기</p>
                <p className="mt-3 text-sm text-[#b0b5b1] line-through">일반 상담 5~10만원</p>
              </div>

              {/* Free first session card */}
              <div className="rounded-2xl bg-[#2d6a4f] p-8 text-center text-white shadow-xl">
                <div className="inline-flex items-center gap-1.5">
                  <p className="text-sm font-medium text-white/80">첫 상담</p>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider">SPECIAL</span>
                </div>
                <p className="mt-4 text-4xl font-bold">무료</p>
                <p className="mt-2 text-sm text-white/70">부담 없이 경험해보세요</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-[#8a8f8b]">
              언제든 중단 가능 · 강제 연장 없음
            </p>
          </div>
        </section>

        {/* ─── 9. FAQ (client component) ─── */}
        <FAQSection />

        {/* ─── 10. Crisis Notice ─── */}
        <section className="py-8">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-800">상담이 제한되는 경우</p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-700">
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
            </div>
          </div>
        </section>

        {/* ─── 11. Final CTA — BottomCTA style ─── */}
        <section className="py-8">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <div
              className="rounded-2xl px-8 py-12 text-center"
              style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1f5e44 100%)' }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white">
                혼자 고민할 결심 말고,<br />
                상담받을 결심을 해보세요.
              </h2>
              <Link
                href={contactHref}
                className="inline-block rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2d6a4f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d6a4f]"
              >
                첫 상담 신청하기
              </Link>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="py-10 text-center">
          <Link href="/counseling" className="inline-flex items-center text-sm font-medium text-[#5c605d] hover:text-[#2d6a4f] transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" /> 상담 프로그램 목록으로 돌아가기
          </Link>
        </div>
      </main>
    </>
  );
}
