import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const ProductRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://localhost:3000/recommend', { userId });
        setRecommendations(response.data);
      } catch (error) {
        setError(true);
        setRecommendations(fallbackProducts);
      }
    };

    fetchRecommendations();
  }, [userId]);

  const fallbackProducts = [
    { id: 1, name: 'FIFA 2024 PS5', price: '$25', description: "The best FIFA of all times", image: "https://i.ebayimg.com/images/g/IVkAAOSwbWZlXLat/s-l1200.webp" },
    { id: 2, name: 'Macbook PRO 2019', price: '$2000', description: "Greatest pc in the world", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 3, name: 'Surface PRO 7', price: '$300', description: "", image: "https://m.media-amazon.com/images/I/61qS1eDVy9S._AC_SL1500_.jpg" },
    { id: 4, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 5, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 6, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
    { id: 7, name: 'Fallback Product 3', price: '$30', description: "", image: "https://i.insider.com/5d29153bb44ce766967db30f?width=1200&format=jpeg" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Recommendations</Text>
      {error ? (
        <FlatList
          data={fallbackProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
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
  cardDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default ProductRecommendations;


