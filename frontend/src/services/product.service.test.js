import axios from 'axios';
import getProducts from './product.service';
import mockProducts from '../mocks/mockProducts';

jest.mock('axios');

describe('product.service.getProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches the product list from the /products endpoint', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    const products = await getProducts();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/products')
    );
    expect(products).toEqual(mockProducts);
  });

  test('propagates the error when the request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    await expect(getProducts()).rejects.toThrow('Network error');
  });
});
