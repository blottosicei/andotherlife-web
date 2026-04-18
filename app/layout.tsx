import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAWrapper } from '@/components/cta/FloatingCTAWrapper';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema';

const pretendard = localFont({
  src: [
    { path: '../public/fonts/Pretendard-Light.woff2', weight: '300' },
    { path: '../public/fonts/Pretendard-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Pretendard-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Pretendard-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Pretendard-Bold.woff2', weight: '700' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

const changwonDangam = localFont({
  src: '../public/fonts/ChangwonDangamRound.woff2',
  variable: '--font-dangam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '앤아더라이프 심리상담연구소',
    template: '%s | 앤아더라이프 심리상담연구소',
  },
  description: '앤아더라이프 심리상담연구소 - 전문 심리상담과 가족치료, 부부상담, 아동청소년상담을 제공합니다.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://andotherlife.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '앤아더라이프 심리상담연구소',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '앤아더라이프 심리상담연구소' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    other: {
      'naver-site-verification': ['6426e147850952519098ac33b69760591c4e8fc1', 'b3fec42988ee2d57e5ae75e87fe478ed7e6a8fe2'],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2d6a4f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${changwonDangam.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XMZ28TZQ62"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XMZ28TZQ62');
          `}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '820230440523302');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=820230440523302&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <SchemaMarkup schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-[#2d6a4f]"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content" className="pb-24">
          {children}
        </main>
        <Footer />
        <FloatingCTAWrapper />
      </body>
    </html>
  );
}
