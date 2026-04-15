export default function BlogLoading() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 py-10">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-32 bg-[#f3f4f0] rounded mb-6 animate-pulse" />

      {/* Title */}
      <div className="mb-8">
        <div className="h-8 w-24 bg-[#f3f4f0] rounded animate-pulse" />
        <div className="h-4 w-64 bg-[#f3f4f0] rounded mt-2 animate-pulse" />
      </div>

      {/* Search bar skeleton */}
      <div className="mb-6">
        <div className="h-10 w-full bg-[#f3f4f0] rounded-lg animate-pulse" />
      </div>

      {/* Category tabs skeleton */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-[#f3f4f0] rounded-full animate-pulse" />
        ))}
      </div>

      {/* Post grid skeleton */}
      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-video bg-[#f3f4f0] animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-[#f3f4f0] rounded animate-pulse" />
                  <div className="h-3 w-full bg-[#f3f4f0] rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#f3f4f0] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-8 w-72 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
            <div className="h-5 w-16 bg-[#f3f4f0] rounded animate-pulse" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-[#f3f4f0] rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
