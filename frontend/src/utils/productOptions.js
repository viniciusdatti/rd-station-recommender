/**
 * Collects the unique values of a product attribute (e.g. "preferences" or
 * "features"), preserving first-appearance order. Feeds the form options.
 */
export const getUniqueValues = (products, attribute) => {
  const values = products.flatMap((product) => product[attribute] ?? []);
  return [...new Set(values)];
};
