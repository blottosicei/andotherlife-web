'use client';

import { useState, useEffect, useCallback } from 'react';
import { YouthConsultationModal } from '@/components/forms/YouthConsultationModal';
import { trackCTAClick } from '@/lib/analytics/gtag';

interface YouthCTAButtonProps {
  ctaName: string;
  ctaLocation: string;
  className?: string;
  children: React.ReactNode;
}

export function YouthCTAButton({ ctaName, ctaLocation, className, children }: YouthCTAButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    trackCTAClick(ctaName, ctaLocation, '');
    setIsModalOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
      <YouthConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

/** 헤더 등 외부에서 커스텀 이벤트로 모달을 열 수 있도록 리스너 제공 */
export function YouthModalListener() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    window.addEventListener('open-youth-modal', handleOpen);
    return () => window.removeEventListener('open-youth-modal', handleOpen);
  }, [handleOpen]);

  return <YouthConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
