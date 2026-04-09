'use client';

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics/gtag';

interface CTALinkProps {
  href: string;
  ctaName: string;
  ctaLocation: string;
  className?: string;
  children: React.ReactNode;
}

export function CTALink({ href, ctaName, ctaLocation, className, children }: CTALinkProps) {
  const handleClick = () => {
    trackCTAClick(ctaName, ctaLocation, href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
