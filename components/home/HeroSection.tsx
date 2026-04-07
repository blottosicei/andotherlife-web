import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f5f2] via-[#f5f0e8] to-[#fdf9f4] py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="max-w-2xl">
          <h1 className="font-dangam text-[36px] leading-[1.2] text-[#2d6a4f] md:text-[48px]">
            당신의 마음을 돌보는 것이{' '}
            <br className="hidden md:block" />
            우리의 일입니다
          </h1>
          <p className="mt-4 text-lg text-[#5c605d] md:text-xl">
            전문 심리상담사와 함께 마음건강을 시작하세요
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#2d6a4f] px-6 py-3 text-base font-medium text-white hover:bg-[#1f5e44] transition-colors"
            >
              상담 예약하기
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] px-6 py-3 text-base font-medium text-[#2d6a4f] hover:bg-[#2d6a4f]/5 transition-colors"
            >
              블로그 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
