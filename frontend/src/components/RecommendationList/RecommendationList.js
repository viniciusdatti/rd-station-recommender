import React from 'react';
import ProductCard from './ProductCard';

/**
 * Friendly empty state shown when the search returns no match.
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <svg
        className="h-12 w-12 text-slate-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
        />
      </svg>
      <p className="mt-3 text-sm font-medium text-slate-600">
        Nenhum produto corresponde à sua seleção.
      </p>
      <p className="mt-1 text-xs text-slate-400">
        Tente ajustar as preferências ou funcionalidades e buscar novamente.
      </p>
    </div>
  );
}

/**
 * Presentational list of recommended products. Renders one card per product,
 * or a friendly empty state when there is no match.
 */
function RecommendationList({ recommendations }) {
  const hasRecommendations = recommendations.length > 0;

  const content = hasRecommendations ? (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {recommendations.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  ) : (
    <EmptyState />
  );

  return content;
}

export default RecommendationList;
