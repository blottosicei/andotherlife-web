import type { Metadata } from 'next';
import Image from 'next/image';
import { Eye, Target, Heart } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BottomCTA } from '@/components/cta/BottomCTA';
import { SITE_CONFIG } from '@/constants/site';
import { NaverMap } from '@/components/common/NaverMap';

export const metadata: Metadata = generatePageMetadata({
  title: '센터 소개',
  description:
    '앤아더라이프 심리상담연구소를 소개합니다. 비전, 미션, 상담 철학, 시설 안내, 찾아오시는 길을 확인하세요.',
  path: '/about',
});

export default function AboutPage() {
  const orgSchema = generateLocalBusinessSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '센터 소개', url: `${SITE_CONFIG.url}/about` },
  ]);

  return (
    <>
      <SchemaMarkup schema={[orgSchema, breadcrumbSchema]} />
      <main>
        {/* Hero Banner */}
        <section
          className="relative flex min-h-[400px] items-center justify-center text-center"
          style={{
            background: 'linear-gradient(135deg, #2d6a4f 0%, #1f5e44 50%, #1a4d39 100%)',
          }}
          aria-label="센터 소개 히어로"
        >
          <div className="relative z-10 px-4 py-20">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              심리상담연구소 앤아더라이프
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/80">
              전문성과 따뜻함을 함께 갖춘 믿을 수 있는 상담 파트너
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1280px] px-4 py-12">
          <Breadcrumb items={[{ label: '센터 소개' }]} />

          {/* Vision / Mission / Values */}
          <section aria-labelledby="vision-heading" className="-mx-4 mb-16 bg-[#f0f5f2] px-4 py-16 md:-mx-6 md:px-6 md:py-20">
            <div className="mx-auto max-w-[1280px]">
              <h2
                id="vision-heading"
                className="mb-12 text-center font-dangam text-2xl text-[#2f3331] md:text-3xl"
              >
                우리가 추구하는 가치
              </h2>
              <div className="grid gap-0 md:grid-cols-3">
                {[
                  {
                    num: '01',
                    label: 'Vision',
                    title: '비전',
                    desc: '30년 경력의 전문성을 바탕으로, 모든 사람이 건강한 관계를 맺고 자신을 깊이 이해할 수 있도록 돕겠습니다.',
                    icon: Eye,
                  },
                  {
                    num: '02',
                    label: 'Mission',
                    title: '미션',
                    desc: '한국상담학회 인증 전문가 양성 체계를 통해, 높은 수준의 상담 서비스를 합리적 비용으로 제공합니다.',
                    icon: Target,
                  },
                  {
                    num: '03',
                    label: 'Core Value',
                    title: '핵심가치',
                    desc: '개인의 문제를 가족이라는 체계 안에서 이해하고, 관계의 구조적 변화를 통해 근본적 회복을 추구합니다.',
                    icon: Heart,
                  },
                ].map((item, idx) => (
                  <article
                    key={item.num}
                    className={`relative px-8 py-10 md:px-10 md:py-12 ${
                      idx < 2 ? 'border-b md:border-b-0 md:border-r border-[#2d6a4f]/10' : ''
                    }`}
                  >
                    <span className="absolute right-6 top-6 font-dangam text-5xl text-[#b1f0ce]/60 md:text-6xl">
                      {item.num}
                    </span>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2d6a4f]/60">
                      {item.label}
                    </p>
                    <div className="mb-4 flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-[#2d6a4f]" />
                      <h3 className="text-xl font-bold text-[#2f3331]">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-[1.8] text-[#5c605d]">
                      {item.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section
            aria-labelledby="philosophy-heading"
            className="mb-16 rounded-2xl px-8 py-12"
            style={{ background: '#e7e2da' }}
          >
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2
                  id="philosophy-heading"
                  className="mb-6 text-2xl font-bold text-[#2f3331]"
                >
                  상담 철학
                </h2>
                <div className="mb-6 border-l-4 border-[#2d6a4f] pl-5">
                  <h3 className="mb-3 text-lg font-semibold text-[#2f3331]">
                    &apos;그리고&apos; 다른 삶 &apos;&amp; Other Life&apos;
                  </h3>
                  <p className="mb-3 leading-relaxed text-[#5c605d]">
                    우리에게 없는 것은 우리가 겪는 시련을 이겨낼 수 있는 힘과 능력이 아니라 그것들이 잠재적 역량으로 우리 자신에게 있다는 사실을 자각하는 힘과 능력입니다. 상담이 필요한 지점, 상담이 개입하는 지점이 바로 여기입니다.
                  </p>
                  <p className="leading-relaxed text-[#5c605d]">
                    상담은 우리를 그런 지각과 용기로 안내하는 길잡이입니다. &apos;그리고 다른 삶&apos;은 우리의 고통과 슬픔의 원인이 되는 시련을 스스로 견디고 이겨냄으로써 우리가 살아가게 되는 그런 삶입니다. 인간의 삶의 궁극적 행복은 우리가 부단히 우리 자신의 삶을 살아간다는 데 있습니다.
                  </p>
                </div>
                <p className="leading-relaxed text-[#5c605d]">
                  앤아더라이프는 보웬(Bowen) 가족체계이론과 미누친(Minuchin)의 구조적 가족치료를 기반으로 합니다. 개인의 문제를 가족이라는 체계 안에서 이해하고, 관계의 구조적 변화를 통해 근본적 회복을 추구합니다. 이인수 대표는 University of Pennsylvania와 The Bowen Center, Philadelphia Child and Family Therapy Training Center에서 직접 수련한 경험을 바탕으로, 국제적 수준의 상담 접근법을 국내에 도입하여 실천하고 있습니다.
                </p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-white p-12 md:p-16">
                <Image
                  src="/images/logo-set.webp"
                  alt="앤아더라이프 심리상담연구소 로고"
                  width={400}
                  height={400}
                  className="max-w-[400px]"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </section>

          {/* Facility Gallery */}
          <section aria-labelledby="facility-heading" className="mb-16">
            <h2
              id="facility-heading"
              className="mb-8 text-center text-2xl font-bold text-[#2f3331]"
            >
              시설 안내
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { src: '/images/center/counseling-room.webp', label: '개인 상담실' },
                { src: '/images/center/lounge.webp', label: '가족상담실' },
                { src: '/images/center/seminar-room.webp', label: '교육 세미나실' },
                { src: '/images/center/entrance.webp', label: '센터 입구' },
              ].map(({ src, label }) => (
                <figure key={label} className="flex flex-col gap-2">
                  <Image
                    src={src}
                    alt={label}
                    width={600}
                    height={338}
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                  <figcaption className="text-center text-sm text-[#5c605d]">{label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Location */}
          <section aria-labelledby="location-heading" className="mb-16">
            <h2
              id="location-heading"
              className="mb-8 text-center text-2xl font-bold text-[#2f3331]"
            >
              찾아오시는 길
            </h2>
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <NaverMap height="350px" />
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-[#2f3331]">주소</h3>
                  <p className="text-[#5c605d]">서울시 마포구 잔다리로 73, 5층</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#2f3331]">운영 시간</h3>
                  <ul className="space-y-1 text-sm text-[#5c605d]">
                    <li>월 – 금: 10:00 – 19:00</li>
                    <li>토: 10:00 – 15:00</li>
                    <li>일 · 공휴일: 휴무</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#2f3331]">대중교통</h3>
                  <ul className="space-y-1 text-sm text-[#5c605d]">
                    <li>합정역 도보 5분</li>
                    <li>홍대입구역 도보 10분</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#2f3331]">이메일</h3>
                  <p className="text-[#5c605d]">{SITE_CONFIG.email}</p>
                </div>
              </div>
            </div>
          </section>

          <BottomCTA ctaType="consultation" />
        </div>
      </main>
    </>
  );
}
