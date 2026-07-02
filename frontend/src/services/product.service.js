import axios from 'axios';

/**
 * Product data access service.
 *
 * Single responsibility: fetch the product catalog from the json-server REST
 * API. Every hook/component depends only on this async interface, so the data
 * source can change without touching consumers.
 *
 * The base URL can be overridden with the REACT_APP_API_URL environment
 * variable; it falls back to the local json-server instance.
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const getProducts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/products`);
  return data;
};

export default getProducts;
