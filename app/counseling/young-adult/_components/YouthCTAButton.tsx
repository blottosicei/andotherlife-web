'use client';

import { useState } from 'react';
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
