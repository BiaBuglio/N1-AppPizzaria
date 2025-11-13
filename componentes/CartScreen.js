import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getCart, updateCartItem, clearCart, getCartTotal } from '../services/cart';
import { createOrder } from '../services/api';
import { saveOrderLocally } from '../services/orders';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cartData = await getCart();
    setCart(cartData);
    const totalPrice = await getCartTotal();
    setTotal(totalPrice);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    await updateCartItem(id, quantity);
    loadCart();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio');
      return;
    }
    try {
      const orderData = {
        items: cart.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
        total: total,
      };
      const order = await createOrder(orderData);
      await saveOrderLocally(order.id, 'pending', total);
      await clearCart();
      Alert.alert('Pedido realizado!', `ID do pedido: ${order.id}`);
      navigation.navigate('OrderTracking', { orderId: order.id });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar pedido');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      <View style={styles.quantity}>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
  },
  price: {
    fontWeight: 'bold',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
