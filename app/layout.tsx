import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAWrapper } from '@/components/cta/FloatingCTAWrapper';

const pretendard = localFont({
  src: [
    { path: '../public/fonts/Pretendard-Thin.woff2', weight: '100' },
    { path: '../public/fonts/Pretendard-ExtraLight.woff2', weight: '200' },
    { path: '../public/fonts/Pretendard-Light.woff2', weight: '300' },
    { path: '../public/fonts/Pretendard-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Pretendard-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Pretendard-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Pretendard-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Pretendard-ExtraBold.woff2', weight: '800' },
    { path: '../public/fonts/Pretendard-Black.woff2', weight: '900' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

const changwonDangam = localFont({
  src: '../public/fonts/ChangwonDangamRound.otf',
  variable: '--font-dangam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '앤아더라이프 심리상담연구소',
    template: '%s | 앤아더라이프 심리상담연구소',
  },
  description: '앤아더라이프 심리상담연구소 - 전문 심리상담과 가족치료, 부부상담, 아동청소년상담을 제공합니다.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://andtoherlife.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '앤아더라이프 심리상담연구소',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '앤아더라이프 심리상담연구소' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${changwonDangam.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-[#2d6a4f]"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <div id="main-content" className="pb-24">
          {children}
        </div>
        <Footer />
        <FloatingCTAWrapper />
      </body>
    </html>
  );
}
