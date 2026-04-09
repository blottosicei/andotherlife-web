'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  return (
    <a
      href="https://pf.kakao.com/_xlFhps"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE812] shadow-lg hover:shadow-xl hover:scale-110 transition-all"
      aria-label="카카오톡 상담"
    >
      <MessageCircle className="h-7 w-7 text-[#3C1E1E]" />
    </a>
  );
}
