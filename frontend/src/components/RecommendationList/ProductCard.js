import React from 'react';

/**
 * Presentational card that shows a single recommended product: its name,
 * category and features.
 */
function ProductCard({ product }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {product.category}
        </span>
      </div>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </article>
  );
}

export default ProductCard;
