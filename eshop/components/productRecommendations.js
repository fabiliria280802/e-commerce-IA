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
    { id: 1, name: 'FIFA 2023 PS5', price: '$20', description: "The hardest FIFA of all times", image: "https://5.imimg.com/data5/SELLER/Default/2022/8/ZW/MH/QS/140642735/fifa-2023-ps5-ps4-.jpeg" },
    { id: 2, name: 'Magic Mouse 2', price: '$200', description: "Greatest mouse in the world", image: "https://think-ecuador.com/wp-content/uploads/2020/10/Magic-Mouse-2-Color-Plata.jpg" },
    { id: 3, name: 'Apple iPhone 15 Pro Max', price: '$1400', description: "RAM: 8 GB \nBro \nConection USB-C & WiFi 6 \N256 GB", image: "https://i.blogs.es/f93223/iphone-13-pro-00-01/650_1200.jpg" },
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


