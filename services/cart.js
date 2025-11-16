import db from './database';

export const addToCart = (product) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM cart WHERE product_id = ?',
      [product.id],
      (tx, results) => {
        if (results.rows.length > 0) {
          const existing = results.rows.item(0);
          tx.executeSql(
            'UPDATE cart SET quantity = ? WHERE product_id = ?',
            [existing.quantity + 1, product.id]
          );
        } else {
          tx.executeSql(
            'INSERT INTO cart (product_id, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)',
            [product.id, product.name, product.price, product.image, 1]
          );
        }
      }
    );
  });
};

export const getCart = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cart',
        [],
        (tx, results) => {
          const cart = [];
          for (let i = 0; i < results.rows.length; i++) {
            cart.push(results.rows.item(i));
          }
          resolve(cart);
        },
        (tx, error) => reject(error)
      );
    });
  });
};

export const removeFromCart = (productId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM cart WHERE product_id = ?',
        [productId],
        () => resolve(),
        (tx, error) => reject(error)
      );
    });
  });
};

export const clearCart = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM cart',
        [],
        () => resolve(),
        (tx, error) => reject(error)
      );
    });
  });
};
