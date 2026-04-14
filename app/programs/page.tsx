import type { Metadata } from 'next';
import Image from 'next/image';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateCourseSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProgramInquiryModal } from '@/components/forms/ProgramInquiryModal';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = generatePageMetadata({
  title: '상담사 교육',
  description:
    '앤아더라이프 심리상담연구소의 상담사 교육 과정을 소개합니다. CBT, MBSR, 아동청소년 상담, 수퍼비전 그룹 과정을 운영합니다.',
  path: '/programs',
});

interface RoadmapLevel {
  level: number;
  label: string;
}

interface Competency {
  title: string;
  description: string;
}

interface Program {
  title: string;
  status: '진행중' | '모집예정';
  duration: string;
  target: string;
  instructor: string;
  slug: string;
  description: string;
  intro?: string;
  roadmap?: RoadmapLevel[];
  competencies?: Competency[];
  price?: string;
  externalUrl?: string;
  image?: string;
}

const PROGRAMS: Program[] = [
  {
    title: 'Next Genogram 가계도 워크숍',
    status: '진행중',
    duration: '4시간 (14:00~18:00)',
    target: '상담 전문가 · 센터장',
    instructor: '이인수 대표',
    slug: 'next-genogram',
    description:
      '가계도 해석 능력을 사례 개념화에 적용하고, AI 기반 디지털 도구(마음토스)를 활용해 가계도 작성·분석을 실습하는 4시간 심화 마스터 클래스. 한국상담학회 교육연수 4시간 인정.',
    intro:
      '단순한 기호 암기를 넘어, 세대 간 정서적 유산을 추적하고 가족 역동을 읽는 통찰을 기릅니다. AI 기술을 활용해 수작업 30분 걸리던 가계도 작성을 3분으로 단축하는 실전 실습까지 포함합니다.',
    roadmap: [
      { level: 1, label: '세대 간 불안과 정서적 유산의 다세대 전수 과정 추적' },
      { level: 2, label: '표면적 증상 아래의 가족 체계 역동 분석' },
      { level: 3, label: '실제 임상 사례를 통한 가족 패턴 해독' },
      { level: 4, label: 'AI 사례 개념화 및 슈퍼비전 실습' },
      { level: 5, label: 'AI 가계도 작성·수정·완성 실전 실습' },
    ],
    price: '100,000원',
    externalUrl: 'https://nextgenogram.mindthos.com/',
    image: '/images/programs/next-genogram-workshop.webp',
  },
  {
    title: '상담사 수련프로그램',
    status: '진행중',
    duration: '연간 과정',
    target: '수련 상담사',
    instructor: '이인수 대표',
    slug: 'counselor-training',
    description:
      '한국상담학회, 한국가족치료학회 교육연수인증기관. 한국상담학회 전문상담사, 한국가족치료학회 자격 취득을 위한 체계적인 수련프로그램. 2급 인턴 수련생, 1급 레지던트 수련생의 상담전문가로서 올인원 수련과정. [마음토스 아카데미] 수련 교육 파트너십',
  },
  {
    title: '보웬가족체계치료 전문가과정',
    status: '모집예정',
    duration: '6개월 과정',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'bowen-family-systems',
    description: 'Bowen Center 정통 교육을 기반으로 한 가족체계이론 전문 과정',
    intro:
      '보웬가족체계치료는 개인의 문제를 고립시켜 보지 않고, 관계의 맥락과 다세대 가족체계 안에서 이해한다. 이 접근법은 문제의 근원을 파악하고 지속 가능한 해결책을 모색하는 강력한 프레임워크를 제공한다.',
    roadmap: [
      { level: 1, label: '체계론적 관점의 기초를 세우다' },
      { level: 2, label: '관계의 핵심 역동을 파악하다' },
      { level: 3, label: '치료사, 자기 성찰의 여정을 시작하다' },
      { level: 4, label: '정교한 치료적 기술을 연마하다' },
      { level: 5, label: '과정질문을 통한 분화, 가계도분석을 통해 통찰을 완성하다' },
    ],
  },
  {
    title: '구조적가족치료 전문가과정',
    status: '모집예정',
    duration: '6개월 과정',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'structural-family-therapy',
    description: 'Minuchin의 구조적 가족치료 이론과 기술을 체계적으로 학습하는 과정',
    intro:
      '막상 가족을 만나지만, 가족상담을 어떻게 이끌어야 하는지 어려운 사람에게 가족 내 경계선, 하위체계, 권력구조를 분석하여 문제의 역기능적 구조를 파악하고 재구조화하도록 돕는다.',
    roadmap: [
      { level: 1, label: '가족의 뼈대 찾아보다' },
      { level: 2, label: '가족체계에 합류하다' },
      { level: 3, label: '가족 역동의 춤을 추다' },
      { level: 4, label: '가족의 힘, 재배치하다' },
      { level: 5, label: '라이브 슈퍼비전을 통해 치료사로 거듭나다' },
    ],
  },
  {
    title: '사례개념화 연수과정',
    status: '진행중',
    duration: '분기별 운영',
    target: '상담 전문가',
    instructor: '이인수 대표',
    slug: 'case-conceptualization',
    description: '사례 분석과 개념화 능력을 심화하는 연수 프로그램',
    competencies: [
      {
        title: '자신감 있는 상담 설계',
        description: '명확한 가설/근거 기반한 상담 전략',
      },
      {
        title: '두려움 없는 사례 발표',
        description: '체계적인 설명과 논리적 근거 제시',
      },
      {
        title: '통합적인 상담의 눈',
        description: '개인심리와 체계론을 넘나드는 관점',
      },
      {
        title: '실용적인 글쓰기 능력 강화',
        description: '전문성이 드러나는 상담적 글쓰기 훈련',
      },
    ],
  },
];

const STATUS_STYLE: Record<Program['status'], string> = {
  진행중: 'bg-[#b1f0ce] text-[#1d5c42]',
  모집예정: 'bg-[#fdae8f] text-[#622e17]',
};

export default function ProgramsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '상담사 교육', url: `${SITE_CONFIG.url}/programs` },
  ]);

  const courseSchemas = PROGRAMS.map((program) =>
    generateCourseSchema({
      name: program.title,
      description: program.description,
      slug: program.slug,
      instructor: program.instructor,
      duration: program.duration,
    })
  );

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, ...courseSchemas]} />
      <main className="mx-auto max-w-[1280px] px-4 py-12">
        <Breadcrumb items={[{ label: '상담사 교육' }]} />

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#2f3331]">상담사 교육</h1>
          <p className="mt-2 text-[#5c605d]">
            심리상담 전문가를 위한 체계적인 교육 과정을 제공합니다.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2" role="list">
          {PROGRAMS.map((program) => (
            <li key={program.slug} className="flex">
              <article className="flex w-full flex-col overflow-hidden rounded-xl border border-[#dde0dc] bg-white shadow-sm transition-shadow hover:shadow-md">
                {/* Image */}
                <div className="relative h-48 w-full shrink-0">
                  <Image
                    src={program.image || '/images/center/seminar-room.webp'}
                    alt={`${program.title} 세미나실`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[program.status]}`}
                    >
                      {program.status}
                    </span>
                  </div>

                  <h2 className="mb-2 text-lg font-semibold text-[#2f3331]">{program.title}</h2>

                  <p className="mb-4 text-sm leading-relaxed text-[#5c605d]">
                    {program.description}
                  </p>

                  {/* Intro text */}
                  {program.intro && (
                    <p className="mb-4 rounded-lg bg-[#f3f4f0] px-4 py-3 text-sm leading-relaxed text-[#2f3331] italic border-l-2 border-[#2d6a4f]">
                      {program.intro}
                    </p>
                  )}

                  {/* Roadmap levels */}
                  {program.roadmap && (
                    <div className="mb-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2d6a4f]">
                        학습 로드맵
                      </p>
                      <ol className="space-y-2">
                        {program.roadmap.map((step) => (
                          <li key={step.level} className="flex items-start gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f] text-xs font-bold text-white">
                              {step.level}
                            </span>
                            <span className="pt-0.5 text-sm text-[#2f3331]">{step.label}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Core competencies */}
                  {program.competencies && (
                    <div className="mb-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2d6a4f]">
                        핵심 역량
                      </p>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {program.competencies.map((comp) => (
                          <li
                            key={comp.title}
                            className="rounded-lg border border-[#dde0dc] bg-[#f9f9f6] px-3 py-2"
                          >
                            <p className="text-xs font-semibold text-[#2d6a4f]">{comp.title}</p>
                            <p className="mt-0.5 text-xs text-[#5c605d]">{comp.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex gap-1">
                      <dt className="font-medium text-[#2f3331]">강사:</dt>
                      <dd className="text-[#5c605d]">{program.instructor}</dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="font-medium text-[#2f3331]">대상:</dt>
                      <dd className="text-[#5c605d]">{program.target}</dd>
                    </div>
                    <div className="col-span-2 flex gap-1">
                      <dt className="font-medium text-[#2f3331]">기간:</dt>
                      <dd className="text-[#5c605d]">{program.duration}</dd>
                    </div>
                    {program.price && (
                      <div className="col-span-2 flex gap-1">
                        <dt className="font-medium text-[#2f3331]">참가비:</dt>
                        <dd className="text-[#5c605d]">{program.price}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-auto flex gap-2">
                    {program.externalUrl && (
                      <a
                        href={program.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-[#2d6a4f] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1f5e44]"
                      >
                        상세보기 / 신청
                      </a>
                    )}
                    <ProgramInquiryModal
                      programTitle={program.title}
                      programTitles={PROGRAMS.map((p) => p.title)}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* CTA section */}
        <section
          aria-labelledby="programs-cta-heading"
          className="mt-12 rounded-2xl px-8 py-12 text-center"
          style={{ background: '#e7e2da' }}
        >
          <h2 id="programs-cta-heading" className="mb-3 text-2xl font-bold text-[#2f3331]">
            맞춤 교육이 필요하신가요?
          </h2>
          <p className="mb-6 text-[#5c605d]">
            기관 및 단체를 위한 맞춤형 교육 프로그램을 기획해 드립니다.
          </p>
          <ProgramInquiryModal
            programTitle={PROGRAMS[0].title}
            programTitles={PROGRAMS.map((p) => p.title)}
            variant="primary"
          />
        </section>
      </main>
    </>
  );
}
