import db from './database';

export const saveOrder = (serverOrderId, status, total) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO orders (server_order_id, status, total) VALUES (?, ?, ?)',
      [serverOrderId, status, total]
    );
  });
};

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM orders ORDER BY created_at DESC',
        [],
        (tx, results) => {
          const orders = [];
          for (let i = 0; i < results.rows.length; i++) {
            orders.push(results.rows.item(i));
          }
          resolve(orders);
        },
        (tx, error) => reject(error)
      );
    });
  });
};
