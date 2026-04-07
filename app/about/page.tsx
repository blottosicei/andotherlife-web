import type { Metadata } from 'next';
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
          <section aria-labelledby="vision-heading" className="mb-16">
            <h2
              id="vision-heading"
              className="mb-8 text-center text-2xl font-bold text-[#2f3331]"
            >
              우리가 추구하는 가치
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-xl border border-[#dde0dc] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#b1f0ce]">
                  <Eye className="h-7 w-7 text-[#1d5c42]" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#2f3331]">비전</h3>
                <p className="text-sm leading-relaxed text-[#5c605d]">
                  30년 경력의 전문성을 바탕으로, 모든 사람이 건강한 관계를 맺고 자신을 깊이 이해할 수 있도록 돕겠습니다.
                </p>
              </article>

              <article className="rounded-xl border border-[#dde0dc] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#b1f0ce]">
                  <Target className="h-7 w-7 text-[#1d5c42]" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#2f3331]">미션</h3>
                <p className="text-sm leading-relaxed text-[#5c605d]">
                  한국상담학회 인증 전문가 양성 체계를 통해, 높은 수준의 상담 서비스를 합리적 비용으로 제공합니다.
                </p>
              </article>

              <article className="rounded-xl border border-[#dde0dc] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#b1f0ce]">
                  <Heart className="h-7 w-7 text-[#1d5c42]" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#2f3331]">핵심가치</h3>
                <p className="text-sm leading-relaxed text-[#5c605d]">
                  보웬가족체계치료와 구조적가족치료를 기반으로 가족과 관계의 근본적 변화를 이끕니다.
                </p>
              </article>
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
                <p className="leading-relaxed text-[#5c605d]">
                  앤아더라이프는 보웬(Bowen) 가족체계이론과 미누친(Minuchin)의 구조적 가족치료를 기반으로 합니다. 개인의 문제를 가족이라는 체계 안에서 이해하고, 관계의 구조적 변화를 통해 근본적 회복을 추구합니다. 이인수 대표는 University of Pennsylvania와 The Bowen Center, Philadelphia Child and Family Therapy Training Center에서 직접 수련한 경험을 바탕으로, 국제적 수준의 상담 접근법을 국내에 도입하여 실천하고 있습니다.
                </p>
              </div>
              <div
                className="aspect-video rounded-xl bg-[#d4cfc7]"
                role="img"
                aria-label="상담 철학 이미지"
              />
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {['상담실 1', '상담실 2', '그룹룸', '대기실', '교육실', '접수데스크'].map(
                (label) => (
                  <div
                    key={label}
                    className="aspect-video rounded-xl bg-[#eceeeb]"
                    role="img"
                    aria-label={label}
                  />
                )
              )}
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
