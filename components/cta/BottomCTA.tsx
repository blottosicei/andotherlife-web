import Link from 'next/link';
import type { CounselingProgram } from '@/types/blog';

interface BottomCTAProps {
  ctaType: string;
  program?: CounselingProgram | null;
}

export function BottomCTA({ ctaType, program }: BottomCTAProps) {
  const isEducation = ctaType === 'education';

  // Determine heading, button text, and href based on program/ctaType
  let heading: string;
  let buttonLabel: string;
  let href: string;

  if (program) {
    heading = program.cta_heading || `${program.title}이 필요하신가요?`;
    buttonLabel = program.cta_button_text || `${program.title} 알아보기`;
    href = `/counseling/${program.slug}`;
  } else if (isEducation) {
    heading = '교육 과정으로 전문성을 높이세요';
    buttonLabel = '교육 과정 보기';
    href = '/programs';
  } else {
    heading = '전문가 상담을 받아보세요';
    buttonLabel = '상담 프로그램 보기';
    href = '/counseling';
  }

  return (
    <section
      className="mt-12 rounded-2xl px-8 py-12 text-center"
      style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1f5e44 100%)' }}
      aria-label="행동 유도"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">{heading}</h2>
      <Link
        href={href}
        className="inline-block rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2d6a4f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d6a4f]"
      >
        {buttonLabel}
      </Link>
    </section>
  );
}
