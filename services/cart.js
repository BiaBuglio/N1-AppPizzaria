import { getDbConnection } from './database';

export const addToCart = async (product) => {
  const db = await getDbConnection();
  const existing = await db.getFirstAsync('SELECT * FROM cart WHERE product_id = ?', [product.id]);
  if (existing) {
    await db.runAsync('UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?', [product.id]);
  } else {
    await db.runAsync('INSERT INTO cart (product_id, name, price, image, quantity) VALUES (?, ?, ?, ?, 1)', [product.id, product.name, product.price, product.image]);
  }
  await db.closeAsync();
};

export const getCart = async () => {
  const db = await getDbConnection();
  const cart = await db.getAllAsync('SELECT * FROM cart');
  await db.closeAsync();
  return cart;
};

export const updateCartItem = async (id, quantity) => {
  const db = await getDbConnection();
  if (quantity <= 0) {
    await db.runAsync('DELETE FROM cart WHERE id = ?', [id]);
  } else {
    await db.runAsync('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id]);
  }
  await db.closeAsync();
};

export const clearCart = async () => {
  const db = await getDbConnection();
  await db.runAsync('DELETE FROM cart');
  await db.closeAsync();
};

export const getCartTotal = async () => {
  const db = await getDbConnection();
  const result = await db.getFirstAsync('SELECT SUM(price * quantity) as total FROM cart');
  await db.closeAsync();
  return result.total || 0;
};
