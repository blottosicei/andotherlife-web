import type { Metadata } from 'next';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { HeroSection } from '@/components/home/HeroSection';
import { ServiceSection } from '@/components/home/ServiceSection';
import { ProfessorIntro } from '@/components/home/ProfessorIntro';
import { LatestPosts } from '@/components/home/LatestPosts';
import { TeamHighlight } from '@/components/home/TeamHighlight';
import { TrustSection } from '@/components/home/TrustSection';
import { BottomCTA } from '@/components/cta/BottomCTA';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | 마음건강 심리상담`,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: 'website',
  },
};

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <SchemaMarkup schema={orgSchema} />
      <main>
        <HeroSection />
        <ServiceSection />
        <ProfessorIntro />
        <LatestPosts />
        <TeamHighlight />
        <TrustSection />
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-12">
          <BottomCTA ctaType="consultation" />
        </div>
      </main>
    </>
  );
}
