import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-brand-primary-700 mb-4">404</h1>
      <p className="text-brand-gray-500 mb-8 text-lg">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-lg bg-brand-primary-700 px-6 py-3 text-white hover:bg-brand-primary-600 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
