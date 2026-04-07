import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '앤아더라이프 심리상담연구소 블로그';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function OGImage({ params }: Props) {
  const { slug } = await params;

  const title = decodeURIComponent(slug).replace(/-/g, ' ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #2d6a4f 0%, #1f5e44 50%, #347756 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: '#b1f0ce',
              marginBottom: '24px',
              letterSpacing: '0.1em',
            }}
          >
            앤아더라이프 심리상담연구소
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
