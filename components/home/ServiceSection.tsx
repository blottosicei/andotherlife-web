import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

const SERVICES = [
  {
    title: '심리상담',
    description:
      '개인, 부부, 가족, 아동·청소년까지. 30년 경력의 전문 상담팀이 당신의 마음에 귀 기울입니다. 보웬가족체계치료와 구조적가족치료를 기반으로 관계의 근본적 변화를 이끕니다.',
    bullets: [
      '개인 / 부부 / 가족 / 아동청소년 상담',
      '교수급 슈퍼비전 체계',
      '대면 · 비대면 모두 가능',
    ],
    image: '/images/service-counseling.webp',
    imageAlt: '전문 심리상담 일러스트',
    cta: { label: '상담 프로그램 보기', href: '/counseling' },
  },
  {
    title: '전문가 교육',
    description:
      '한국상담학회 인증 전문상담사 양성을 위한 체계적인 교육 수련 프로그램. 보웬가족체계치료, 구조적가족치료, 사례개념화 등 이론과 실습을 균형 있게 제공합니다.',
    bullets: [
      '상담사 수련프로그램',
      '전문가 과정 (보웬 / 구조적가족치료)',
      '사례개념화 연수',
    ],
    image: '/images/service-education.webp',
    imageAlt: '전문가 교육 프로그램 일러스트',
    cta: { label: '교육 프로그램 보기', href: '/programs' },
  },
  {
    title: '2030 청년상담',
    description:
      '합리적인 가격으로 만나는 전문 심리상담. 취업, 진로, 관계, 자기이해 등 20~30대의 고민에 전문 상담사가 함께합니다.',
    bullets: [
      '첫 상담 무료 / 회당 20,000원',
      '주 1회 50분 정기 상담',
      '교수급 지도감독 체계',
    ],
    image: '/images/service-youth.webp',
    imageAlt: '2030 청년상담 일러스트',
    cta: { label: '청년상담 알아보기', href: '/counseling/young-adult' },
    badge: '첫 상담 무료',
  },
];

export function ServiceSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="font-dangam text-[30px] text-[#2d6a4f] md:text-[36px]">
            앤아더라이프가 함께합니다
          </h2>
          <p className="mt-3 text-lg text-[#5c605d]">
            전문성과 따뜻함으로 마음의 변화를 이끕니다
          </p>
        </div>

        {/* Service rows */}
        <div className="space-y-20 md:space-y-28">
          {SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.title}
                className={`flex flex-col items-center gap-10 lg:gap-16 ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Image */}
                <div className="relative w-full lg:w-[45%]">
                  {service.badge && (
                    <span className="absolute -top-3 left-4 z-10 rounded-full bg-[#2d6a4f] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                      {service.badge}
                    </span>
                  )}
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={800}
                    height={500}
                    className="w-full rounded-2xl object-cover shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-[55%]">
                  <h3 className="text-[24px] font-bold text-[#2f3331] md:text-[28px]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[#5c605d] leading-[1.8]">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-[#2f3331]"
                      >
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#2d6a4f]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.cta.href}
                    className="mt-8 inline-flex items-center text-sm font-medium text-[#2d6a4f] hover:text-[#1f5e44] transition-colors"
                  >
                    {service.cta.label} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
