# 🍦 Sorveteria API

API RESTful para gerenciamento de produtos de uma sorveteria. Construída com Node.js, TypeScript, Express e MongoDB.

---

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticação
- **Jest** para testes unitários

---

## 📋 Pré-requisitos

- Node.js >= 18
- MongoDB (local ou Atlas)

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/Jpontess/Sorveteria-backend.git

# Entre na pasta
cd Sorveteria-backend

# Instale as dependências
npm install
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
MONGO_URI=mongodb://localhost:27017/sorveteria
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d
PORT=3000
```

---

## ▶️ Como Rodar

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

---

## 🧪 Testes

```bash
npm test
```

---

## 📌 Rotas

### Health

| Método | Rota      | Descrição                     | Auth |
|--------|-----------|-------------------------------|------|
| GET    | `/health` | Verifica se a API está online | ❌   |

---

### Autenticação

| Método | Rota             | Descrição       | Auth |
|--------|------------------|-----------------|------|
| POST   | `/auth/register` | Cria um usuário | ❌   |
| POST   | `/auth/login`    | Realiza o login | ❌   |

#### Exemplo — Register

**Request:**
```json
POST /auth/register
Content-Type: application/json

{
  "name": "João"
  "password": "1234"
}
```

**Response `201`:**
```json
{
  "message": "Usuário criado com sucesso"
}
```

#### Exemplo — Login

**Request:**
```json
POST /auth/login
Content-Type: application/json

{
  "name": "João",
  "password": "1234"
}
```

**Response `200`:**
```json
{
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Use o token retornado no header `Authorization` das rotas protegidas.

---

### Produtos

> ⚠️ Todas as rotas de produto exigem autenticação.  
> Adicione o header: `Authorization: Bearer <token>`

| Método | Rota                   | Descrição               |
|--------|------------------------|-------------------------|
| GET    | `/product`             | Lista todos os produtos |
| POST   | `/product/create`      | Cria um produto         |
| GET    | `/product/:id`         | Busca produto por ID    |
| PATCH  | `/product/edit/:id`    | Edita um produto        |
| DELETE | `/product/deleted/:id` | Remove um produto       |

#### Exemplo — Criar Produto

**Request:**
```json
POST /product/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Flocos",
  "description": "Massa de Flocos 1,500L",
  "price": 10.00,
  "quantity": 10,
  "image": "caminho_img",
  "category": "Massa",
  "isAvailable": true
}
```

**Response `201`:**
```json
{
  	"message": "Produto criado com sucesso",
	"data": {
		"name": "Flocos",
		"description": "Massa de Flocos 1,500L",
		"price": 10,
		"quantity": 10,
		"image": "caminho_img",
		"category": "Massa",
		"isAvailable": true,
		"_id": "69e3e7c78a8690ff75a0274c",
		"createdAt": "2026-04-18T20:21:27.090Z",
		"updatedAt": "2026-04-18T20:21:27.090Z",
		"__v": 0
	}
}
```

#### Exemplo — Listar Produtos

**Request:**
**Response `200`:**
```json
[
  {
    	"_id": "69e3e7c78a8690ff75a0274c",
		"name": "Flocos",
		"description": "Massa de Flocos 1,500L",
		"price": 10,
		"quantity": 10,
		"image": "caminho_img",
		"category": "Massa",
		"isAvailable": true,
		"createdAt": "2026-04-18T20:21:27.090Z",
		"updatedAt": "2026-04-26T22:03:35.839Z",
		"__v": 0,
		"isDeleted": true
  }
]
```

## 🗂️ Estrutura do Projeto

src/
├── Controllers/        # Camada de controle HTTP
│   └── test/           # Testes unitários
├── services/           # Regras de negócio
├── repository/         # Acesso ao banco de dados
├── middlewares/        # Autenticação JWT
└── routes/             # Definição das rotas
