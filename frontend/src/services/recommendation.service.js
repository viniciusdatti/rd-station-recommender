/**
 * Product recommendation service.
 *
 * Single responsibility: given the user's form selection and the product list,
 * compute an affinity score per product and return the most relevant
 * recommendation(s). It knows nothing about the UI or the API.
 *
 * Expected data shape:
 *   product  -> { id, name, category, preferences: string[], features: string[] }
 *   formData -> {
 *     selectedPreferences: string[],
 *     selectedFeatures: string[],
 *     selectedRecommendationType: 'SingleProduct' | 'MultipleProducts',
 *   }
 */

export const RecommendationType = Object.freeze({
  SINGLE: 'SingleProduct',
  MULTIPLE: 'MultipleProducts',
});

/**
 * Counts how many items of `candidates` are present in `selectedSet`.
 * A Set keeps each lookup at O(1).
 *
 * @param {string[]} candidates - product attributes (preferences or features)
 * @param {Set<string>} selectedSet - items chosen by the user
 * @returns {number} number of matches
 */
const countMatches = (candidates = [], selectedSet) =>
  candidates.reduce(
    (matches, candidate) => (selectedSet.has(candidate) ? matches + 1 : matches),
    0
  );

/**
 * Computes the affinity score of a single product.
 * Each matching preference and each matching feature is worth 1 point.
 *
 * @param {object} product
 * @param {Set<string>} selectedPreferences
 * @param {Set<string>} selectedFeatures
 * @returns {number} total product score
 */
const scoreProduct = (product, selectedPreferences, selectedFeatures) =>
  countMatches(product.preferences, selectedPreferences) +
  countMatches(product.features, selectedFeatures);

/**
 * Ranks the matched products from most to least relevant.
 *
 * Critical tie-break rule: when two products share the same score, the one that
 * appears LAST in the original list wins. The tie-break is therefore applied
 * explicitly by descending `originalIndex`, without relying on the stability of
 * Array.prototype.sort.
 *
 * Complexity: O(n log n), optimal for comparison-based sorting.
 *
 * @param {{ product: object, score: number, originalIndex: number }[]} scored
 * @returns {object[]} ordered products
 */
const rankByRelevance = (scored) =>
  [...scored]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.originalIndex - a.originalIndex; // tie: last valid product wins
    })
    .map((entry) => entry.product);

/**
 * Returns the recommended products based on the preferences and features
 * selected by the user.
 *
 * @param {object} formData
 * @param {object[]} products
 * @returns {object[]} recommended products (empty when there is no match)
 */
const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = RecommendationType.MULTIPLE,
  } = formData;

  const preferencesSet = new Set(selectedPreferences);
  const featuresSet = new Set(selectedFeatures);

  const matchedProducts = products
    .map((product, originalIndex) => ({
      product,
      originalIndex,
      score: scoreProduct(product, preferencesSet, featuresSet),
    }))
    .filter((entry) => entry.score > 0);

  const ranked = rankByRelevance(matchedProducts);

  if (selectedRecommendationType === RecommendationType.SINGLE) {
    return ranked.slice(0, 1);
  }

  return ranked;
};

const recommendationService = { getRecommendations };

export default recommendationService;
