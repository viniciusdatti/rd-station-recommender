import recommendationService, {
  RecommendationType,
} from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

const { getRecommendations } = recommendationService;

describe('recommendationService.getRecommendations', () => {
  describe('when there are no matches', () => {
    test('returns an empty list when no preference or feature matches any product', () => {
      const formData = {
        selectedPreferences: ['Non-existent preference'],
        selectedFeatures: ['Non-existent feature'],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('returns an empty list in SingleProduct mode with no matches', () => {
      const formData = {
        selectedPreferences: ['Non-existent preference'],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('returns an empty list when the user selects nothing', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });
  });

  describe('SingleProduct mode', () => {
    test('returns the single product with the highest affinity', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('returns only one product even when multiple products match', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
    });
  });

  describe('MultipleProducts mode', () => {
    test('returns all matching products sorted by descending score', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('excludes products with no matches', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });
  });

  describe('critical tie-break rule (same score → last valid product wins)', () => {
    test('SingleProduct: when two products tie, returns the one that appears last in the list', () => {
      // "Automação de marketing" -> RD Station Marketing (id 2, score 1)
      // "Integração com chatbots" -> RD Conversas        (id 3, score 1)
      // Same score -> the product that appears last in the list wins.
      const formData = {
        selectedPreferences: [
          'Automação de marketing',
          'Integração com chatbots',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('SingleProduct: preference + feature tie also resolves to the last valid product', () => {
      // RD Station CRM       (id 1): 1 preference + 1 feature = score 2
      // RD Station Marketing (id 2): 1 preference + 1 feature = score 2
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('tie-break is deterministic regardless of selection order', () => {
      const selectionOrderA = {
        selectedPreferences: [
          'Automação de marketing',
          'Integração com chatbots',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };
      const selectionOrderB = {
        selectedPreferences: [
          'Integração com chatbots',
          'Automação de marketing',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const resultA = getRecommendations(selectionOrderA, mockProducts);
      const resultB = getRecommendations(selectionOrderB, mockProducts);

      expect(resultA[0].name).toBe('RD Conversas');
      expect(resultB[0].name).toBe('RD Conversas');
    });
  });
});
