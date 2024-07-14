// components/productRecommendations/ProductRecommendations.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

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
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/api/recommendations');
        setRecommendations(response.data);
      } catch (error) {
        setError(true);
        setProducts(fallbackProducts);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Recommendations</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.price}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductRecommendations;

