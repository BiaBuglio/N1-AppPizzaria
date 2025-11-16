import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getOrderStatus } from '../services/api';

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 5000); // Atualizar a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    try {
      const response = await getOrderStatus(orderId);
      setStatus(response.status);
      if (response.status === 'completed') {
        Alert.alert('Pedido Concluído', 'Seu pedido foi finalizado!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Pronto';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhamento do Pedido</Text>
      <Text style={styles.orderId}>Pedido #{orderId}</Text>
      <Text style={styles.status}>Status: {getStatusText(status)}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
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
    fontSize: 20,
    color: '#007bff',
    marginBottom: 30,
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
