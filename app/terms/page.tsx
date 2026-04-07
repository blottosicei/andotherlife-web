import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = generatePageMetadata({
  title: '이용약관',
  description: '앤아더라이프 심리상담연구소의 서비스 이용약관입니다.',
  path: '/terms',
});

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '이용약관', url: `${SITE_CONFIG.url}/terms` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumb items={[{ label: '이용약관' }]} />

        <h1 className="mb-8 text-3xl font-bold text-[#2f3331]">이용약관</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-[#5c605d]">
          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제1조 (목적)</h2>
            <p>
              본 약관은 앤아더라이프 심리상담연구소(이하 &quot;연구소&quot;)가 제공하는 웹사이트 서비스의
              이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제2조 (서비스의 내용)</h2>
            <p>연구소는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>심리상담 정보 제공 (블로그, 콘텐츠)</li>
              <li>상담 프로그램 안내 및 예약 접수</li>
              <li>교육 프로그램 안내 및 수강 신청</li>
              <li>뉴스레터 발송</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제3조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>타인의 개인정보를 도용하는 행위</li>
              <li>서비스에 게재된 정보를 무단으로 변경하는 행위</li>
              <li>연구소가 허용하지 않은 방법으로 정보를 수집하는 행위</li>
              <li>기타 관계 법령에 위반되는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제4조 (콘텐츠의 저작권)</h2>
            <p>
              웹사이트에 게재된 모든 콘텐츠(글, 이미지, 영상 등)의 저작권은 연구소에 있으며,
              무단 복제, 배포, 전송 등을 금지합니다. 개인적 학습 목적의 열람은 허용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제5조 (면책 조항)</h2>
            <p>
              웹사이트에 게재된 콘텐츠는 정보 제공 목적이며, 전문적인 심리상담이나 치료를 대체하지 않습니다.
              구체적인 심리적 어려움이 있는 경우 반드시 전문 상담사와 상담하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">제6조 (약관의 변경)</h2>
            <p>
              연구소는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지함으로써
              효력이 발생합니다.
            </p>
          </section>

          <p className="text-sm text-[#777c78]">
            본 이용약관은 2026년 4월 7일부터 시행됩니다.
          </p>
        </div>
      </main>
    </>
  );
}
