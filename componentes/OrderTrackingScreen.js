import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getOrderStatus } from '../services/api';
import { updateOrderStatus } from '../services/orders';

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrderStatus(orderId);
        setStatus(data.status);
        await updateOrderStatus(orderId, data.status);
      } catch (error) {
        console.error(error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Pedido</Text>
      <Text style={styles.orderId}>Pedido ID: {orderId}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.buttonText}>Voltar às Compras</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
