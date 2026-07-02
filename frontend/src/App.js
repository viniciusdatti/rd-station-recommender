import React, { useEffect, useRef, useState } from 'react';
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

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-gray-500">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
        aria-hidden="true"
      />
      <p>Carregando produtos...</p>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const resultsRef = useRef(null);

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

  // On smaller screens the results sit below the form; bring them into view
  // after a search so the user immediately sees the outcome.
  useEffect(() => {
    if (!hasSearched) return;
    resultsRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }, [hasSearched, recommendations]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Selecione suas preferências e funcionalidades para receber
            recomendações personalizadas.
          </p>
        </header>

        {isLoading && <Spinner />}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        {isReady && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Suas preferências
              </h2>
              <Form
                preferences={preferenceOptions}
                features={featureOptions}
                onSubmit={handleCalculateRecommendations}
              />
            </section>

            <section
              ref={resultsRef}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:sticky lg:top-6 lg:scroll-mt-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recomendações
                </h2>
                {hasSearched && recommendations.length > 0 && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {recommendations.length}{' '}
                    {recommendations.length === 1 ? 'produto' : 'produtos'}
                  </span>
                )}
              </div>

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
