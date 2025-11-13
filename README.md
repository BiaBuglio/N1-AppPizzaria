# 🍕 AppPizzaria — Pizzaria Control App em React Native
[![React Native](https://img.shields.io/badge/react--native-0.81.4-blue?logo=react)](https://reactnative.dev/)
[![SQLite](https://img.shields.io/badge/sqlite-local%20db-blueviolet?logo=sqlite)](https://www.sqlite.org/)
[![Node.js](https://img.shields.io/badge/node.js-server-green?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-0BSD-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()

Aplicativo mobile para controle de uma **Pizzaria e Esfirraria** desenvolvido em **React Native**, com comunicação via API com servidor **Node.js** e persistência em **SQLite**. Inclui login, seleção de produtos, carrinho de compras e acompanhamento de pedidos.

---

## 🧪 Tecnologias Utilizadas

| Tecnologia           | Função                             |
|----------------------|-------------------------------------|
| React Native         | Interface e lógica mobile           |
| Expo SQLite          | Banco de dados local                |
| React Navigation     | Navegação entre telas               |
| JavaScript (ES6)     | Lógica da aplicação                 |
| Async/Await          | Acesso assíncrono ao banco          |
| @react-native-picker/picker        | Seleção          |

---

## 🧩 Funcionalidades

✅ Controle de acesso com login e cadastro de usuários  
✅ Seleção de produtos (pizzas, esfirras, bebidas) carregados do servidor  
✅ Filtros por categoria de produtos  
✅ Carrinho de compras com edição de quantidades  
✅ Finalização de pedidos e acompanhamento em tempo real  
✅ Interface amigável e responsiva

---

## 🧱 Estrutura do Projeto

AppPizzaria/<br>
├── assets/ → Ícones (editar, deletar) <br>
├── componentes/ — telas (screens) do aplicativo<br>
|    ├── LoginScreen.js → Tela de login<br>
|    ├── RegisterScreen.js → Tela de cadastro<br>
|    ├── ProductListScreen.js → Lista de produtos com filtros<br>
|    ├── CartScreen.js → Carrinho de compras<br>
|    └── OrderTrackingScreen.js → Acompanhamento de pedidos<br>
├── services/ — lógica de acesso ao banco de dados e APIs<br>
|    ├── database.js → Conexão com SQLite local + criação das tabelas<br>
|    ├── api.js → Comunicação com servidor Node.js<br>
|    ├── cart.js → Gerenciamento do carrinho local<br>
|    └── orders.js → Gerenciamento de pedidos locais<br>
├── server/ — Aplicação servidor em Node.js<br>
|    ├── package.json → Dependências do servidor<br>
|    ├── database.js → Conexão com SQLite servidor + criação das tabelas<br>
|    └── server.js → Servidor Express com APIs<br>
├── App.js — ponto de entrada e configuração de navegação<br>
├── app.json # Configuração do app<br>
├── index.js # Ponto de entrada da aplicação<br>
├── package.json # Dependências e scripts do projeto<br>
└── .gitignore # Arquivos ignorados no controle de versão<br>

---

## 🚀 Como Executar o Projeto

### Servidor Node.js
1. **Instale as dependências do servidor**
```bash
cd server
npm install
```
2. **Execute o servidor**
```bash
npm start
```
O servidor rodará em `http://localhost:3000`.

### Aplicativo React Native
1. **Volte à raiz do projeto**
```bash
cd ..
```
2. **Instale as dependências**
```bash
npm install
```
3. **Execute o projeto**
```bash
npx expo start
```

---

## 💾 Estrutura do Banco de Dados (SQLite)

### Servidor (pizzeria.db)
- **users**: id, name, email, password
- **categories**: id, name
- **products**: id, name, price, image (base64), category_id
- **orders**: id, user_id, status, total, created_at
- **order_items**: id, order_id, product_id, quantity

### Mobile (pizzeria.db local)
- **cart**: id, product_id, name, price, image, quantity
- **orders**: id, server_order_id, status, total, created_at

---





