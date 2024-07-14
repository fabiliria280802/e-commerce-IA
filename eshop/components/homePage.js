import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const fallbackProducts = [
    { id: 1, name: 'FIFA 2024 PS5', price: '$25', description: "The best FIFA of all times", image: "https://i.ebayimg.com/images/g/IVkAAOSwbWZlXLat/s-l1200.webp" },
    { id: 2, name: 'Macbook PRO 2019', price: '$2000', description: "Greatest pc in the world", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 3, name: 'Surface PRO 7', price: '$300', description: "", image: "https://m.media-amazon.com/images/I/61qS1eDVy9S._AC_SL1500_.jpg" },
    { id: 4, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 5, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 6, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 7, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        setError(true);
        setProducts(fallbackProducts);
      }
    };

    fetchProducts();
  }, []);

  const handleInfo = (product) => {
    // Manejar la lógica de mostrar información del producto
    alert(`Información del producto: \n${product.description}`);
  };

  const handleAddToCart = (product) => {
    // Manejar la lógica de agregar el producto al carrito
    setCartCount(cartCount + 1); // Incrementar el contador del carrito
    alert(`Producto agregado al carrito:  ${product.name}`);
  };

  const handleRecommendations = () => {
    // Navegar a la pestaña de ProductRecommendations
    closeMenu();
    navigation.navigate('ProductRecommendations');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Product Catalog</Text>
        <View style={styles.userInfo}>
          <Icon name="shopping-cart" style={styles.userIcons} />
          <Text style={styles.cartCount}>{cartCount}</Text>
          <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu} style={styles.menuTrigger}>
                  <Icon name="user" style={styles.userIcons} />
                  <Text style={styles.userName}>Messi</Text>
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={handleRecommendations} title="Recomendaciones" />
              {/* Agrega más opciones aquí si es necesario */}
            </Menu>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardPrice}>{item.price}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Info" onPress={() => handleInfo(item)} />
              <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 30,
  },
  userIcons: {
    fontSize: 20,
    color: "#000",
    padding: 5,
  },
  cartCount: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 16,
    color: "#000",
  },
  userName: {
    marginLeft: 5,
    fontSize: 16,
  },
  menuTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  cardImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
  },
});

export default HomePage;
