# 🍕 AppPizzaria — Aplicativo Mobile para Pizzaria

[![React Native](https://img.shields.io/badge/react--native-0.73.6-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/expo-~50.0.0-black?logo=expo)](https://expo.dev/)
[![SQLite](https://img.shields.io/badge/sqlite-local%20db-blueviolet?logo=sqlite)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/license-0BSD-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()

Aplicativo mobile para controle de uma **Pizzaria e Esfirraria** desenvolvido em **React Native com Expo**, com comunicação via API com servidor **Node.js** e persistência local em **SQLite**. Inclui login, seleção de produtos, carrinho de compras e acompanhamento de pedidos.

---

## 🧪 Tecnologias Utilizadas

| Tecnologia           | Função                             |
|----------------------|-------------------------------------|
| React Native         | Interface e lógica mobile           |
| Expo                 | Framework para desenvolvimento      |
| Expo SQLite          | Banco de dados local                |
| React Navigation     | Navegação entre telas               |
| JavaScript (ES6)     | Lógica da aplicação                 |
| AsyncStorage         | Armazenamento local de token        |
| @react-native-picker/picker | Seleção de categorias          |

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
├── assets/ → Ícones e imagens do app <br>
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
├── App.js — ponto de entrada e configuração de navegação<br>
├── app.json # Configuração do Expo<br>
├── index.js # Ponto de entrada da aplicação<br>
├── package.json # Dependências e scripts do projeto<br>
└── .gitignore # Arquivos ignorados no controle de versão<br>

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI: `npm install -g @expo/cli`
- Servidor Node.js rodando em `http://localhost:3000` (projeto separado)

### Passos
1. **Instale as dependências**
```bash
npm install
```
2. **Execute o projeto**
```bash
npx expo start
```
3. **Abra no dispositivo/simulador**
   - Instale o app Expo Go no dispositivo
   - Escaneie o QR code no terminal

---

## 💾 Estrutura do Banco de Dados

### Servidor (projeto separado)
- **users**: id, name, email, password
- **categories**: id, name
- **products**: id, name, price, image (base64), category_id
- **orders**: id, user_id, status, total, created_at
- **order_items**: id, order_id, product_id, quantity

### Mobile (SQLite local)
- **cart**: id, product_id, name, price, image, quantity
- **orders**: id, server_order_id, status, total, created_at

---





