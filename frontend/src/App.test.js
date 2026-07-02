import { render, screen } from '@testing-library/react';
import App from './App';
import getProducts from './services/product.service';
import mockProducts from './mocks/mockProducts';

jest.mock('./services/product.service');

describe('App', () => {
  beforeEach(() => {
    getProducts.mockResolvedValue(mockProducts);
  });

  test('renders the main recommender title', async () => {
    render(<App />);

    const heading = await screen.findByRole('heading', {
      name: /recomendador de produtos rd station/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();

    // Wait for the async product load to settle so its state update is flushed.
    expect(
      await screen.findByText(mockProducts[0].preferences[0])
    ).toBeInTheDocument();
  });
});
