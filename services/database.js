// db.js
import * as SQLite from 'expo-sqlite';

// Abrir conexão
export async function getDbConnection() {
  const db = await SQLite.openDatabaseAsync('pizzeria.db');
  return db;
}

// Inicializar as tabelas
export async function initDB() {
  const db = await getDbConnection();

  // Tabela para carrinho local (não sincronizado com servidor)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      quantity INTEGER NOT NULL DEFAULT 1
    );
  `);

  // Tabela para pedidos locais (para acompanhar status)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      server_order_id INTEGER,
      status TEXT NOT NULL,
      total REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.closeAsync();
}
