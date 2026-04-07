const stats = [
  { value: '10,000+', label: '상담 진행' },
  { value: '500+', label: '교육 수료' },
  { value: '50+', label: '전문 상담사' },
  { value: '98%', label: '만족도' },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-2xl font-bold text-[#2f3331] md:text-3xl text-center mb-12">
          신뢰할 수 있는 이유
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="font-dangam text-4xl md:text-5xl text-[#2d6a4f] leading-none">
                {value}
              </span>
              <span className="mt-2 text-sm text-[#5c605d]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
