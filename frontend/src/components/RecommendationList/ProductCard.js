import React from 'react';

/**
 * Small check icon used in the feature list. Decorative only, hence aria-hidden.
 */
function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Presentational card that shows a single recommended product: its name,
 * category and features. Soft elevation that lifts on hover.
 */
function ProductCard({ product }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-base font-semibold text-slate-900">
          {product.name}
        </h3>
        <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {product.category}
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ProductCard;
