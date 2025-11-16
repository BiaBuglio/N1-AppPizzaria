import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Picker } from 'react-native';
import { getProducts } from '../services/api';
import { addToCart } from '../services/cart';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Produto adicionado ao carrinho!');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.product}>
      <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={filterProducts}
        style={styles.picker}
      >
        <Picker.Item label="Todas as Categorias" value="" />
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Ver Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  product: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#28a745',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cartButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
