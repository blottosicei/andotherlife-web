'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/analytics/gtag';

interface PageViewTrackerProps {
  contentName: string;
  contentCategory: string;
}

export function PageViewTracker({ contentName, contentCategory }: PageViewTrackerProps) {
  useEffect(() => {
    trackViewContent(contentName, contentCategory);
  }, [contentName, contentCategory]);

  return null;
}
