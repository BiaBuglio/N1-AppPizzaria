import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000'; // Ajuste para o IP do servidor se necessário

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const register = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const createOrder = async (items, total) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ items, total }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const getOrderStatus = async (orderId) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};
