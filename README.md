# Recomendador de Produtos RD Station

Aplicação web que recomenda produtos da RD Station a partir das **preferências**
e **funcionalidades** selecionadas pelo usuário. É possível pedir um único
produto (o de maior afinidade) ou a lista completa de produtos compatíveis.

O projeto é um monorepo:

- **`frontend/`** — aplicação React (Create React App + Tailwind CSS).
- **`backend/`** — API REST simulada com [json-server](https://github.com/typicode/json-server).

## Requisitos

- **Node.js >= 18.3**
- **Yarn 1** (clássico)

Instalando o Node com `nvm`:

```bash
nvm install 18
nvm use 18
```

## Instalação

O script de instalação resolve as dependências da raiz, do backend e do
frontend de uma só vez:

```bash
./install.sh
```

> Se preferir instalar manualmente: `yarn install` na raiz e depois `yarn install`
> dentro de `backend/` e de `frontend/`.

## Execução

Suba o backend (json-server em `http://localhost:3001`) e o frontend
(`http://localhost:3000`) ao mesmo tempo:

```bash
yarn dev
```

Para rodar apenas a aplicação React em modo de desenvolvimento:

```bash
yarn start
```

> Observação: o `yarn start` sobe somente o frontend. Para que as recomendações
> tenham dados, o backend precisa estar no ar (use `yarn dev` ou
> `yarn start:backend` em outro terminal).

### Scripts (raiz)

| Script                | Descrição                                            |
| --------------------- | ---------------------------------------------------- |
| `yarn start`          | Inicia a aplicação React em modo de desenvolvimento. |
| `yarn start:frontend` | Inicia apenas o frontend (porta 3000).               |
| `yarn start:backend`  | Inicia apenas o backend / json-server (porta 3001).  |
| `yarn dev`            | Inicia frontend e backend simultaneamente.           |

A URL base da API pode ser sobrescrita pela variável `REACT_APP_API_URL`
(padrão: `http://localhost:3001`).

## Testes

```bash
cd frontend
yarn test            # modo interativo (watch)
CI=true yarn test    # execução única
```

## Decisão Arquitetural

A lógica de recomendação foi **isolada em um serviço puro**
(`frontend/src/services/recommendation.service.js`): uma função que recebe a
seleção do usuário e a lista de produtos e devolve os produtos recomendados, sem
depender de UI, estado ou chamadas de rede.

Esse isolamento traz dois benefícios diretos:

- **Testabilidade** — a regra de negócio é coberta por testes unitários rápidos e
  determinísticos, sem precisar renderizar componentes nem simular a rede.
- **Manutenibilidade** — a interface (React) e a fonte de dados (json-server)
  podem mudar sem afetar o cálculo da recomendação.

A responsabilidade fica assim distribuída:

- `Form.js` é um componente **de apresentação** (controlado): apenas coleta a
  seleção e a entrega via `onSubmit`.
- `App.js` **orquestra** o estado: busca os produtos na API, trata carregamento e
  erro, chama o serviço de recomendação e renderiza os resultados.
- `recommendation.service.js` concentra a **regra de negócio**.

### Ordenação e desempate

O ranking dos produtos usa ordenação por comparação, com complexidade
**O(n · log n)**. O **desempate é explícito e determinístico**: quando dois
produtos têm o mesmo score, vence o que aparece **por último** na lista original.

O critério é aplicado diretamente por índice na função de comparação, em vez de
depender da estabilidade do `Array.prototype.sort`. Isso garante o mesmo
resultado independentemente da engine de JavaScript.

## Tecnologias

- React 18, Create React App (`react-scripts` 5), Tailwind CSS 3, axios.
- json-server (backend), `concurrently` (orquestração dos scripts).
- Jest + React Testing Library.
