const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pizzeria.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      total REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  // Insert sample data
  db.run(`INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Pizzas'), (2, 'Esfirras'), (3, 'Bebidas')`);

  db.run(`INSERT OR IGNORE INTO products (name, price, image, category_id) VALUES
    ('Pizza Margherita', 25.00, 'base64imagestring1', 1),
    ('Pizza Calabresa', 28.00, 'base64imagestring2', 1),
    ('Esfirra de Carne', 5.00, 'base64imagestring3', 2),
    ('Esfirra de Queijo', 4.50, 'base64imagestring4', 2),
    ('Coca-Cola', 3.00, 'base64imagestring5', 3),
    ('Suco de Laranja', 4.00, 'base64imagestring6', 3)
  `);
});

module.exports = db;
