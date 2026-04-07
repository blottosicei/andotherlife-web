'use client';

import dynamic from 'next/dynamic';

const FloatingCTA = dynamic(() => import('@/components/cta/FloatingCTA').then(m => ({ default: m.FloatingCTA })), { ssr: false });

export function FloatingCTAWrapper() {
  return <FloatingCTA />;
}
