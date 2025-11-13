import { getDbConnection } from './database';

export const saveOrderLocally = async (serverOrderId, status, total) => {
  const db = await getDbConnection();
  await db.runAsync('INSERT INTO orders (server_order_id, status, total) VALUES (?, ?, ?)', [serverOrderId, status, total]);
  await db.closeAsync();
};

export const getOrders = async () => {
  const db = await getDbConnection();
  const orders = await db.getAllAsync('SELECT * FROM orders ORDER BY created_at DESC');
  await db.closeAsync();
  return orders;
};

export const updateOrderStatus = async (serverOrderId, status) => {
  const db = await getDbConnection();
  await db.runAsync('UPDATE orders SET status = ? WHERE server_order_id = ?', [status, serverOrderId]);
  await db.closeAsync();
};
