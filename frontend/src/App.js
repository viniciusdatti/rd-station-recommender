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

  // Bring the results into view after a search so the user immediately sees the
  // outcome, even when the form is long.
  useEffect(() => {
    if (hasSearched) {
      resultsRef.current?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'start',
      });
    }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Selecione suas preferências e funcionalidades para receber
            recomendações personalizadas.
          </p>
        </header>

        {isLoading && <LoadingSkeleton />}

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        {isReady && (
          <div className="space-y-6">
            <section className={PANEL_CLASSES}>
              <h2 className="mb-6 text-lg font-semibold text-slate-900">
                Suas preferências
              </h2>
              <Form
                preferences={preferenceOptions}
                features={featureOptions}
                onSubmit={handleCalculateRecommendations}
              />
            </section>

            <section ref={resultsRef} className={`${PANEL_CLASSES} scroll-mt-6`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
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
                <p className="text-slate-500">
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
