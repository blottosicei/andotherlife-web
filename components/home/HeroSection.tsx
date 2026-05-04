import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background image */}
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/70 via-[#0d0f0d]/50 to-[#0d0f0d]/20" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="max-w-2xl">
          <h1 className="sr-only">앤아더라이프 심리상담연구소</h1>
          <p className="mb-4 text-sm font-medium tracking-widest text-[#b1f0ce]/80 uppercase">
            심리상담연구소 앤아더라이프
          </p>
          <p className="font-dangam text-[36px] leading-[1.2] text-white md:text-[52px]">
            당신의 마음을 돌보는 것이{' '}
            <br className="hidden md:block" />
            우리의 일입니다
          </p>
          <p className="mt-4 font-dangam text-lg text-white/60 md:text-xl">
            &lsquo;그리고&rsquo; 다른 삶 &lsquo;&amp; Other Life&rsquo;
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            전문 심리상담사와 함께 마음건강을 시작하세요.
            체계론적 관점을 기반으로 관계의 근본적 변화를 이끕니다.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#2d6a4f] shadow-lg hover:bg-[#f0f5f2] transition-colors"
            >
              상담 예약하기
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              블로그 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
