import recommendationService, {
  RecommendationType,
} from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

const { getRecommendations } = recommendationService;

describe('recommendationService.getRecommendations', () => {
  describe('quando não há correspondências', () => {
    test('retorna lista vazia se nenhuma preferência/feature casa com os produtos', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Feature inexistente'],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('retorna lista vazia no modo SingleProduct sem correspondências', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });

    test('retorna lista vazia quando o usuário não seleciona nada', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toEqual([]);
    });
  });

  describe('modo SingleProduct', () => {
    test('retorna o único produto com maior afinidade', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('retorna apenas um produto mesmo havendo vários matches', () => {
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

  describe('modo MultipleProducts', () => {
    test('retorna todos os produtos com match, ordenados por score decrescente', () => {
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

    test('não inclui produtos sem nenhuma correspondência', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedRecommendationType: RecommendationType.MULTIPLE,
      };

      const recommendations = getRecommendations(formData, mockProducts);

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });
  });

  describe('regra crítica de desempate (empate no score → último produto válido)', () => {
    test('SingleProduct: entre dois produtos empatados, retorna o que aparece por último na lista', () => {
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

    test('SingleProduct: empate por preferência + feature também resolve pelo último válido', () => {
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

    test('o desempate é determinístico independente da ordem da seleção', () => {
      const selecaoOrdemA = {
        selectedPreferences: [
          'Automação de marketing',
          'Integração com chatbots',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };
      const selecaoOrdemB = {
        selectedPreferences: [
          'Integração com chatbots',
          'Automação de marketing',
        ],
        selectedRecommendationType: RecommendationType.SINGLE,
      };

      const resultadoA = getRecommendations(selecaoOrdemA, mockProducts);
      const resultadoB = getRecommendations(selecaoOrdemB, mockProducts);

      expect(resultadoA[0].name).toBe('RD Conversas');
      expect(resultadoB[0].name).toBe('RD Conversas');
    });
  });
});
