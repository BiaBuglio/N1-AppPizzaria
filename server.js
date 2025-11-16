const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Change in production

app.use(cors());
app.use(bodyParser.json());

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function(err) {
    if (err) return res.status(400).json({ error: 'User already exists' });
    res.json({ message: 'User registered' });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Get products
app.get('/products', (req, res) => {
  db.all(`
    SELECT p.*, c.name as category
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create order
app.post('/orders', verifyToken, (req, res) => {
  const { items, total } = req.body;
  db.run('INSERT INTO orders (user_id, total) VALUES (?, ?)', [req.userId, total], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    const orderId = this.lastID;
    items.forEach(item => {
      db.run('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, item.product_id, item.quantity]);
    });
    res.json({ id: orderId, status: 'pending' });
  });
});

// Get order status
app.get('/orders/:id', verifyToken, (req, res) => {
  const orderId = req.params.id;
  db.get('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, req.userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Order not found' });
    res.json({ status: row.status });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
