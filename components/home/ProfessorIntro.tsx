import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Award, Briefcase, BookOpen } from 'lucide-react';

const CREDENTIALS = [
  '전문영역 수련감독자 (한국상담학회)',
  '전문상담사 1급 (한국상담학회)',
  '부부가족상담 슈퍼바이저 (한국가족치료학회)',
  '가족상담 슈퍼바이저 (한국가족관계학회)',
];

const CAREER = [
  '서울시 가정법원 가사상담위원',
  '(전) 상명대 복지상담대학원 교수',
  '(전) 한국상담학회 부부가족상담분과학회장',
  '(전) 여성가족부 가족정책 자문위원',
];

const PUBLICATIONS = [
  '가계도: 사정 및 평가 (2026)',
  '가족상담 (2026)',
  '보웬이론의 비밀 (2025)',
  '미누친의 가족치료 마스터하기 (2022)',
  '대인관계 의사소통 (2022) 외 다수',
];

export function ProfessorIntro() {
  return (
    <section className="bg-[#f5f0e8]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
          {/* Left: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-[#2d6a4f]/10" />
              <Image
                src="/images/profile_Lee.webp"
                alt="이인수 대표"
                width={400}
                height={500}
                className="relative z-10 rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2d6a4f]">
              대표 소개
            </p>
            <h2 className="font-dangam text-[36px] leading-tight text-[#2d6a4f] md:text-[42px]">
              이인수
            </h2>
            <p className="mt-1 text-lg text-[#5c605d]">
              대표 / 가족상담 전문가
            </p>

            <p className="mt-6 text-[#2f3331] leading-[1.8]">
              University of Pennsylvania에서 임상사회복지(MSW) 석사, 경희대학교에서
              가족상담교육 박사학위를 취득하고, 30년간 부부·가족상담 분야에서
              활동하고 있습니다. The Bowen Center과 Philadelphia Child and Family
              Therapy Training Center에서 가족치료 전문 수련을 받았습니다.
            </p>

            {/* Credentials */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2d6a4f]">
                <Award className="h-4 w-4" />
                <span>자격 및 인증</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CREDENTIALS.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-full border border-[#2d6a4f]/20 bg-white/60 px-3 py-1 text-xs text-[#2f3331]"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>

            {/* Career */}
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2d6a4f]">
                <Briefcase className="h-4 w-4" />
                <span>주요 경력</span>
              </div>
              <ul className="space-y-1">
                {CAREER.map((item) => (
                  <li key={item} className="text-sm text-[#5c605d]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Publications */}
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2d6a4f]">
                <BookOpen className="h-4 w-4" />
                <span>대표 저서</span>
              </div>
              <ul className="space-y-1">
                {PUBLICATIONS.map((pub) => (
                  <li key={pub} className="text-sm italic text-[#5c605d]">
                    {pub}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/team"
              className="mt-8 inline-flex items-center text-sm font-medium text-[#2d6a4f] hover:text-[#1f5e44] transition-colors"
            >
              교수진 전체 보기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
