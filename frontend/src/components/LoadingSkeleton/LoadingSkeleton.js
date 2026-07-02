import React from 'react';

const PANEL_CLASSES = 'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100';

function SkeletonRows() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="space-y-4">
      {rows.map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton placeholder shown while products load. It mirrors the real stacked
 * layout so the transition to loaded content feels seamless.
 */
function LoadingSkeleton() {
  const cards = Array.from({ length: 3 });

  return (
    <div className="space-y-6" aria-hidden="true">
      <div className={PANEL_CLASSES}>
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonRows />
          <SkeletonRows />
          <SkeletonRows />
        </div>
      </div>

      <div className={PANEL_CLASSES}>
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((_, index) => (
            <div key={index} className="rounded-xl border border-slate-100 p-4">
              <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
