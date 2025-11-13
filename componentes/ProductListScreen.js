import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Picker } from 'react-native';
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
      const cats = [...new Set(data.map(p => p.category))];
      setCategories(cats);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const handleAddToCart = async (product) => {
    await addToCart(product);
    alert('Produto adicionado ao carrinho!');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.product}>
      <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Ver Carrinho</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={filterByCategory}
        style={styles.picker}
      >
        <Picker.Item label="Todas as Categorias" value="" />
        {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
      </Picker>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cartButtonText: {
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  product: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
  },
});
