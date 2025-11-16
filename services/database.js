import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('pizzeria.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        name TEXT,
        price REAL,
        image TEXT,
        quantity INTEGER
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        server_order_id INTEGER,
        status TEXT,
        total REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
  });
};

export default db;
