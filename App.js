import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './componentes/LoginScreen';
import RegisterScreen from './componentes/RegisterScreen';
import ProductListScreen from './componentes/ProductListScreen';
import CartScreen from './componentes/CartScreen';
import OrderTrackingScreen from './componentes/OrderTrackingScreen';
import { initDB } from './services/database';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
