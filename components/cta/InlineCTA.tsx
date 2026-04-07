import Link from 'next/link';
import type { CounselingProgram } from '@/types/blog';

interface InlineCTAProps {
  ctaType: string;
  program?: CounselingProgram | null;
}

export function InlineCTA({ ctaType, program }: InlineCTAProps) {
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
    heading = '전문성을 높이고 싶으신가요?';
    buttonLabel = '교육 과정 보기';
    href = '/programs';
  } else {
    heading = '전문 상담이 필요하신가요?';
    buttonLabel = '상담 프로그램 보기';
    href = '/counseling';
  }

  return (
    <aside className="my-8 rounded-xl bg-[#e7e2da] p-6">
      <p className="mb-4 text-base font-semibold text-[#2f3331]">{heading}</p>
      <Link
        href={href}
        className="inline-block rounded-lg bg-[#2d6a4f] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1f5e44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] focus-visible:ring-offset-2"
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
