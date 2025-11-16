import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getCart, removeFromCart, clearCart } from '../services/cart';
import { createOrder } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cartData = await getCart();
    setCart(cartData);
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    loadCart();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio!');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const items = cart.map(item => ({ product_id: item.id, quantity: item.quantity }));
    try {
      const response = await createOrder(items, total);
      await clearCart();
      navigation.navigate('OrderTracking', { orderId: response.id });
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>Qtd: {item.quantity}</Text>
      <Text style={styles.price}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.backButtonText}>Voltar às Compras</Text>
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
    fontSize: 16,
  },
  quantity: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
