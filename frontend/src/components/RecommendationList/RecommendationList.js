import React from 'react';
import ProductCard from './ProductCard';

/**
 * Presentational list of recommended products. Renders one card per product,
 * or a friendly message when there is no match.
 */
function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          Nenhum produto atende a todas as preferências selecionadas.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Tente remover alguns filtros e buscar novamente.
        </p>
      </div>
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
