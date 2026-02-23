# 🚀 Automax API

API desenvolvida como **teste técnico**, com foco em boas práticas de arquitetura, organização de código e integração com serviços externos.

O projeto realiza a **sincronização automática dos carrinhos de compra** da FakeStoreAPI, armazenando os dados localmente para consulta e manipulação.

A sincronização ocorre:

* ✅ Automaticamente a cada **1 hora** (via cron job)
* ✅ Na inicialização do servidor

---

## 📌 Objetivo

Demonstrar conhecimentos em:

* Estruturação de API REST
* Integração com APIs externas
* Persistência de dados com banco relacional
* Migrations com TypeORM
* Execução de tarefas agendadas (cron)
* Organização por camadas e versionamento de rotas

---

## 🔎 Endpoints disponíveis

Base URL:

```
http://localhost:5500/api/v1
```

### 📦 Listar todos os carrinhos

```
GET /database/cart
```

### 🛒 Buscar carrinho por ID

```
GET /database/cart/:id
```

Exemplo:

```
GET /database/cart/1
```

As requisições podem ser realizadas:

* Pelo navegador
* Via extensão **Rest Client** (arquivo `api.http`)
* Ferramentas como Postman ou Insomnia

---

## ⚙️ Como executar o projeto

### 1️⃣ Instalar dependências

```sh
npm install
```

### 2️⃣ Executar as migrations

```sh
npm run typeorm migration:run
```

### 3️⃣ Iniciar o servidor

```sh
npm run dev
```

Servidor disponível em:

```
http://localhost:5500
```

---

## 🏗️ Estrutura e Arquitetura

O projeto segue uma organização voltada à separação de responsabilidades, podendo incluir:

* Controllers
* Services / Use Cases
* Repositories
* Entidades (Entities)
* Camada de integração externa
* Configuração de cron jobs

---

## 🔄 Sincronização de Dados

Ao iniciar o servidor:

1. A aplicação consulta a FakeStoreAPI
2. Os carrinhos são persistidos no banco de dados sqlite
3. Um cron job agenda novas sincronizações a cada 1 hora
4. Os dados ficam disponíveis via endpoints REST

---

## 🧪 Observações

Este projeto tem caráter demonstrativo e foi desenvolvido para fins de avaliação técnica, priorizando clareza, organização e boas práticas.
