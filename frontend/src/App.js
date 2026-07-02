import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import getProducts from './services/product.service';
import recommendationService from './services/recommendation.service';

/**
 * Collects the unique values of a product attribute (e.g. "preferences" or
 * "features"), preserving first-appearance order. Feeds the form options.
 */
const getUniqueValues = (products, attribute) => {
  const values = products.flatMap((product) => product[attribute] ?? []);
  return [...new Set(values)];
};

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const data = await getProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            'Não foi possível carregar os produtos. Tente novamente mais tarde.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCalculateRecommendations = (preferences) => {
    const result = recommendationService.getRecommendations(
      preferences,
      products
    );
    setRecommendations(result);
    setHasSearched(true);
  };

  const preferenceOptions = getUniqueValues(products, 'preferences');
  const featureOptions = getUniqueValues(products, 'features');
  const isReady = !isLoading && !error;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mt-2 text-gray-600">
            Selecione suas preferências e funcionalidades para receber
            recomendações personalizadas.
          </p>
        </header>

        {isLoading && (
          <p className="text-center text-gray-600">Carregando produtos...</p>
        )}

        {error && (
          <p className="rounded-md bg-red-50 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        {isReady && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section className="rounded-lg bg-white p-6 shadow">
              <Form
                preferences={preferenceOptions}
                features={featureOptions}
                onSubmit={handleCalculateRecommendations}
              />
            </section>

            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Recomendações
              </h2>

              {!hasSearched && (
                <p className="text-gray-500">
                  Preencha o formulário e clique em &quot;Obter
                  recomendação&quot;.
                </p>
              )}

              {hasSearched && (
                <RecommendationList recommendations={recommendations} />
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
