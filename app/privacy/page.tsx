import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = generatePageMetadata({
  title: '개인정보처리방침',
  description: '앤아더라이프 심리상담연구소의 개인정보처리방침입니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '홈', url: SITE_CONFIG.url },
    { name: '개인정보처리방침', url: `${SITE_CONFIG.url}/privacy` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Breadcrumb items={[{ label: '개인정보처리방침' }]} />

        <h1 className="mb-8 text-3xl font-bold text-[#2f3331]">개인정보처리방침</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-[#5c605d]">
          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">1. 개인정보의 수집 및 이용 목적</h2>
            <p>
              앤아더라이프 심리상담연구소(이하 &quot;연구소&quot;)는 다음 목적을 위하여 개인정보를 수집 및 이용합니다.
              수집된 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
              별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>상담 예약 및 문의 접수</li>
              <li>상담사 교육 수강 신청</li>
              <li>뉴스레터 발송</li>
              <li>서비스 개선 및 통계 분석</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">2. 수집하는 개인정보 항목</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>상담 예약:</strong> 이름, 이메일, 전화번호, 상담 유형, 문의 내용</li>
              <li><strong>교육 신청:</strong> 이름, 이메일, 전화번호, 소속</li>
              <li><strong>뉴스레터:</strong> 이메일</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              연구소는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>상담 기록: 상담 종료 후 5년 (의료법)</li>
              <li>계약 또는 청약 철회 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">4. 개인정보의 제3자 제공</h2>
            <p>
              연구소는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 이용자의 동의가 있거나 법령의 규정에 의한 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">5. 개인정보의 파기</h2>
            <p>
              연구소는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없도록 안전하게
              삭제하며, 종이 문서는 분쇄 또는 소각하여 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">6. 이용자의 권리</h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요청할 수 있습니다.
              요청은 이메일({SITE_CONFIG.email})로 연락해 주시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#2f3331]">7. 개인정보 보호책임자</h2>
            <p>
              연구소는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보와 관련한
              이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>개인정보 보호책임자:</strong> 이인수 대표</li>
              <li><strong>이메일:</strong> {SITE_CONFIG.email}</li>
            </ul>
          </section>

          <p className="text-sm text-[#777c78]">
            본 개인정보처리방침은 2026년 4월 7일부터 시행됩니다.
          </p>
        </div>
      </main>
    </>
  );
}
