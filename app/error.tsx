'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-brand-primary-700 mb-4">오류가 발생했습니다</h1>
      <p className="text-brand-gray-500 mb-8 text-lg">
        잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-brand-primary-700 px-6 py-3 text-white hover:bg-brand-primary-600 transition-colors"
      >
        다시 시도
      </button>
    </main>
  );
}
