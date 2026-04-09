import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Phone, Mail, Clock, MessageCircle, MapPin } from 'lucide-react';
import { NaverMap } from '@/components/common/NaverMap';
import { getCounselingPrograms } from '@/lib/supabase/queries';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = generatePageMetadata({
  title: '상담 예약/문의 | 앤아더라이프 심리상담연구소',
  description:
    '앤아더라이프 심리상담연구소에 상담을 예약하거나 문의하세요. 개인상담, 부부상담, 아동상담, 집단상담을 제공합니다.',
  path: '/contact',
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '초회 상담은 어떻게 진행되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '초회 상담은 50~60분 정도 진행됩니다. 상담사와 내담자가 처음 만나 현재의 어려움, 상담 목표, 기대사항 등을 이야기하며 앞으로의 상담 방향을 함께 설정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상담 기간은 보통 얼마나 걸리나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '상담 기간은 개인마다 다르지만, 일반적으로 단기 상담은 8~12회기, 장기 상담은 그 이상으로 진행됩니다. 상담사와 내담자가 함께 협의하여 적절한 기간을 결정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '온라인 상담도 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 화상 상담을 지원하고 있습니다. 거리나 시간 등의 이유로 대면 상담이 어려우신 분들을 위해 Zoom을 활용한 온라인 상담을 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '상담료는 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '상담료는 상담 유형에 따라 다릅니다. 개인상담, 부부상담, 아동상담, 집단상담별로 상이하며, 자세한 금액은 문의를 통해 안내드리고 있습니다.',
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    question: '초회 상담은 어떻게 진행되나요?',
    answer:
      '초회 상담은 50~60분 정도 진행됩니다. 상담사와 내담자가 처음 만나 현재의 어려움, 상담 목표, 기대사항 등을 이야기하며 앞으로의 상담 방향을 함께 설정합니다.',
  },
  {
    question: '상담 기간은 보통 얼마나 걸리나요?',
    answer:
      '상담 기간은 개인마다 다르지만, 일반적으로 단기 상담은 8~12회기, 장기 상담은 그 이상으로 진행됩니다. 상담사와 내담자가 함께 협의하여 적절한 기간을 결정합니다.',
  },
  {
    question: '온라인 상담도 가능한가요?',
    answer:
      '네, 화상 상담을 지원하고 있습니다. 거리나 시간 등의 이유로 대면 상담이 어려우신 분들을 위해 Zoom을 활용한 온라인 상담을 제공합니다.',
  },
  {
    question: '상담료는 어떻게 되나요?',
    answer:
      '상담료는 상담 유형에 따라 다릅니다. 개인상담, 부부상담, 아동상담, 집단상담별로 상이하며, 자세한 금액은 문의를 통해 안내드리고 있습니다.',
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type: defaultType } = await searchParams;
  const programs = await getCounselingPrograms();
  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담 예약/문의', url: `${SITE_CONFIG.url}/contact` },
  ]);

  return (
    <>
      <SchemaMarkup schema={[orgSchema, breadcrumbSchema, faqSchema]} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb items={[{ label: '상담 예약/문의' }]} />

        <h1 className="mb-2 text-2xl font-bold text-[#2f3331] md:text-3xl">
          상담 예약/문의
        </h1>
        <p className="mb-10 text-[#5c605d]">
          아래 양식을 작성해 주시면 빠른 시일 내에 연락드리겠습니다.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Left: Form (60%) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#e8ede9] bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-lg font-semibold text-[#2f3331]">상담 문의 양식</h2>
              <ContactForm programs={programs} defaultType={defaultType} />
            </div>
          </div>

          {/* Right: Contact info (40%) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact info card */}
            <div className="rounded-2xl border border-[#e8ede9] bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-[#2f3331]">연락처 정보</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                  <div>
                    <p className="text-xs text-[#5c605d]">전화</p>
                    <p className="text-sm font-medium text-[#2f3331]">
                      {SITE_CONFIG.phone || '070-8989-7532'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                  <div>
                    <p className="text-xs text-[#5c605d]">이메일</p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-sm font-medium text-[#2f3331] hover:text-[#2d6a4f] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                  <div>
                    <p className="text-xs text-[#5c605d]">운영 시간</p>
                    <p className="text-sm font-medium text-[#2f3331]">
                      평일 {SITE_CONFIG.hours.weekday.open} – {SITE_CONFIG.hours.weekday.close}
                    </p>
                    <p className="text-xs text-[#5c605d]">
                      토요일 {SITE_CONFIG.hours.saturday.open} – {SITE_CONFIG.hours.saturday.close} / 일·공휴일 휴무
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2d6a4f]" />
                  <div>
                    <p className="text-xs text-[#5c605d]">주소</p>
                    <p className="text-sm font-medium text-[#2f3331]">{SITE_CONFIG.address.full}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <NaverMap height="280px" />

            {/* KakaoTalk button */}
            <a
              href="https://pf.kakao.com/_xlFhps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl font-medium text-[#3C1E1E] transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#FFE812' }}
            >
              <MessageCircle className="h-5 w-5" />
              카카오톡으로 문의하기
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="mb-2 text-xl font-bold text-[#2f3331] md:text-2xl">자주 묻는 질문</h2>
          <p className="mb-8 text-[#5c605d]">상담에 관해 자주 받는 질문들을 모았습니다.</p>
          <div className="rounded-2xl border border-[#e8ede9] bg-white p-2 shadow-sm">
            <Accordion>
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="px-4 py-4 text-base font-medium text-[#2f3331] hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-[#5c605d]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </>
  );
}
