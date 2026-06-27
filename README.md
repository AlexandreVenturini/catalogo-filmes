# Catálogo de Filmes — API REST com Node.js e MongoDB

Sistema de gestão de catálogo de filmes desenvolvido com Node.js, Express e MongoDB. Permite gerenciar filmes, diretores e gêneros via API REST, com pipelines de agregação para análise dos dados.

## Tecnologias

- Node.js
- Express.js
- MongoDB (driver nativo)
- dotenv

## Pré-requisitos

- Node.js instalado
- MongoDB rodando localmente ou URI de conexão disponível

## Instalação

```bash
git clone https://github.com/AlexandreVenturini/catalogo-filmes.git
cd catalogo-filmes
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis com os dados da sua conexão MongoDB.

## Popular o banco

```bash
node scripts/seed.js
```

O script insere 33 filmes, 10 diretores e 7 gêneros, além de criar os índices necessários.

## Executar o servidor

```bash
# produção
npm start

# desenvolvimento (com hot reload)
npm run dev
```

O servidor sobe em `http://localhost:3000`.

---

## Endpoints

### Filmes

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/filmes` | Lista todos os filmes (aceita filtros e projeção) |
| GET | `/filmes/:id` | Busca filme por ID |
| POST | `/filmes` | Cria um filme |
| POST | `/filmes/lote` | Cria vários filmes de uma vez |
| PATCH | `/filmes/:id` | Atualiza campos do filme |
| PATCH | `/filmes/:id/avaliacoes` | Adiciona uma avaliação ao filme |
| DELETE | `/filmes/:id` | Remove um filme por ID |
| DELETE | `/filmes/filtro` | Remove filmes por filtro |

**Filtros disponíveis em GET /filmes:**
- `ano` — filtra por ano de lançamento
- `genero_id` — filtra por gênero
- `diretor_id` — filtra por diretor
- `campos` — projeção de campos separados por vírgula (ex: `campos=titulo,ano`)

### Diretores

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/diretores` | Lista todos os diretores |
| GET | `/diretores/:id` | Busca diretor por ID |
| POST | `/diretores` | Cria um diretor |
| POST | `/diretores/lote` | Cria vários diretores de uma vez |
| PATCH | `/diretores/:id` | Atualiza dados do diretor |
| DELETE | `/diretores/:id` | Remove um diretor por ID |
| DELETE | `/diretores/filtro` | Remove diretores por filtro |

### Gêneros

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/generos` | Lista todos os gêneros |
| GET | `/generos/:id` | Busca gênero por ID |
| POST | `/generos` | Cria um gênero |
| POST | `/generos/lote` | Cria vários gêneros de uma vez |
| PATCH | `/generos/:id` | Atualiza dados do gênero |
| DELETE | `/generos/:id` | Remove um gênero por ID |
| DELETE | `/generos/filtro` | Remove gêneros por filtro |

### Agregações

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/agregacoes/media-avaliacoes` | Média de notas por filme, ordenado pela melhor avaliação |
| GET | `/agregacoes/top5` | Top 5 filmes com maior média de avaliações |
| GET | `/agregacoes/filmes-por-diretor` | Total de filmes agrupados por diretor |
| GET | `/agregacoes/distribuicao-por-genero` | Distribuição de filmes por gênero com média de duração |

---

## Modelagem

### Collections

**filmes** — collection principal
- Referência para `diretores` via `diretor_id`
- Referência para `generos` via `genero_id`
- Array `avaliacoes` embutido (embedding)

**diretores** — entidade independente referenciada por filmes

**generos** — entidade independente referenciada por filmes

### Decisões de modelagem

**Embedding — `avaliacoes`**: avaliações pertencem exclusivamente ao filme e são sempre consultadas junto com ele. Não fazem sentido fora desse contexto, por isso são embutidas no documento.

**Referência — `diretor_id`**: um diretor pode ter vários filmes. Manter como documento separado evita duplicação e permite buscar a filmografia completa via agregação.

**Referência — `genero_id`**: gêneros são reutilizados por muitos filmes. Referência mantém consistência e permite filtrar por gênero com índice.

### Índices criados

| Collection | Campo | Motivo |
|------------|-------|--------|
| filmes | `titulo` | Busca por título |
| filmes | `genero_id` | Filtro por gênero |
| filmes | `diretor_id` | Filtro e join por diretor |
| filmes | `ano` | Ordenação por ano |
| diretores | `nome` | Busca por nome |
| generos | `nome` | Busca por nome |
