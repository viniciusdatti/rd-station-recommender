# Frontend — Recomendador de Produtos RD Station

Aplicação React (Create React App + Tailwind CSS) do recomendador de produtos.
Consome a API de produtos do backend (`json-server`) em
`http://localhost:3001/products`.

> Para instruções completas do monorepo (instalação, `yarn dev`, backend), veja
> o [README da raiz](../README.md).

## Scripts

- `yarn start` — ambiente de desenvolvimento em `http://localhost:3000`.
- `yarn build` — build de produção em `build/`.
- `yarn test` — testes (Jest + React Testing Library).

## Configuração

A URL base da API pode ser sobrescrita pela variável de ambiente
`REACT_APP_API_URL` (padrão: `http://localhost:3001`).

## Estrutura principal

- `src/App.js` — orquestra o estado: busca produtos na API, trata carregamento e
  erro, chama o serviço de recomendação e renderiza os resultados.
- `src/components/Form/` — formulário de apresentação (controlado) e seus campos
  (`CheckboxGroup`, `RecommendationType`).
- `src/components/RecommendationList/` — lista e cards dos produtos recomendados.
- `src/services/recommendation.service.js` — regra de negócio da recomendação
  (score, ordenação e desempate: em caso de empate, vence o último produto
  válido).
- `src/services/product.service.js` — acesso à API de produtos via axios.
