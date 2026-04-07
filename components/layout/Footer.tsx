import Link from 'next/link';
import { getCounselingPrograms } from '@/lib/supabase/queries';
import { SITE_CONFIG } from '@/constants/site';

const BLOG_CATEGORIES = [
  { href: '/blog/mental-health', label: '마음건강' },
  { href: '/blog/counseling-stories', label: '심리상담 이야기' },
  { href: '/blog/relationships-communication', label: '관계/소통' },
  { href: '/blog/children-youth', label: '아동·청소년' },
  { href: '/blog/self-growth', label: '자기성장' },
  { href: '/blog/expert-column', label: '전문가 칼럼' },
  { href: '/blog/education-certification', label: '교육·자격 정보' },
];

export async function Footer() {
  let programs: { title: string; slug: string }[] = [];
  try {
    programs = await getCounselingPrograms();
  } catch {
    // Supabase not available
  }

  return (
    <footer className="bg-[#0d0f0d]">
      {/* Main footer */}
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-dangam text-lg text-white">
              앤아더라이프
            </Link>
            <p className="mt-1 text-sm text-[#9c9d9b]">심리상담연구소</p>
            <p className="mt-3 text-xs leading-relaxed text-[#9c9d9b]">
              전문성과 따뜻함을 함께 갖춘
              <br />
              믿을 수 있는 상담 파트너
            </p>
          </div>

          {/* Blog */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#afb3af]">
              블로그
            </h3>
            <ul className="space-y-1.5">
              {BLOG_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-[#9c9d9b] hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Counseling */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#afb3af]">
              상담 프로그램
            </h3>
            <ul className="space-y-1.5">
              {programs.map((p: any) => (
                <li key={p.slug}>
                  <Link
                    href={`/counseling/${p.slug}`}
                    className="text-sm text-[#9c9d9b] hover:text-white transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/counseling"
                  className="text-sm text-[#9c9d9b] hover:text-white transition-colors"
                >
                  전체 보기
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#afb3af]">
              교육 프로그램
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-[#9c9d9b] hover:text-white transition-colors"
                >
                  전체 프로그램
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-sm text-[#9c9d9b] hover:text-white transition-colors"
                >
                  교수진 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#afb3af]">
              고객 지원
            </h3>
            <ul className="space-y-1.5">
              <li className="text-sm text-[#9c9d9b]">
                {SITE_CONFIG.email || 'business@mindfullabs.ai'}
              </li>
              <li className="text-sm text-[#9c9d9b]">
                서울시 마포구 잔다리로 73, 5층
              </li>
              <li className="text-sm text-[#9c9d9b]">합정역 도보 5분</li>
              <li className="text-sm text-[#9c9d9b] mt-2">월-금 10:00-19:00</li>
              <li className="text-sm text-[#9c9d9b]">토 10:00-15:00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 text-center">
          <p className="text-xs text-[#5c605d]">
            Copyright © Mindful Labs Inc. | All Rights Reserved
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[#5c605d] hover:text-[#9c9d9b] transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#5c605d] hover:text-[#9c9d9b] transition-colors"
            >
              이용약관
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#5c605d]">
            사업자등록번호 786-88-03152 | 통신판매신고번호 제2025-서울마포-0943호 |
            마인드풀랩스 주식회사(Mindful Labs Inc.) | 대표: 강호남
            <br />
            서울특별시 성동구 뚝섬로13길 38, 4층 (성수동)
          </p>
        </div>
      </div>
    </footer>
  );
}
