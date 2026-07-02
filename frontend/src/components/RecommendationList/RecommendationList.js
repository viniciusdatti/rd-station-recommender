import React from 'react';
import ProductCard from './ProductCard';

/**
 * Presentational list of recommended products. Renders one card per product,
 * or a friendly message when there is no match.
 */
function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <p className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
        Nenhum produto atende a todas as preferências selecionadas.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {recommendations.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default RecommendationList;
