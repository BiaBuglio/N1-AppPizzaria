import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './componentes/LoginScreen';
import RegisterScreen from './componentes/RegisterScreen';
import ProductListScreen from './componentes/ProductListScreen';
import CartScreen from './componentes/CartScreen';
import OrderTrackingScreen from './componentes/OrderTrackingScreen';

import { initDB } from './services/database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Produtos' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ title: 'Acompanhar Pedido' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

