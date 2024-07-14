import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, Modal, TextInput, TouchableOpacity } from 'react-native';

const Shopping = ({ route, navigation }) => {
  const { cartItems: initialCartItems } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleProceedToPayment = () => {
    setModalVisible(true);
  };

  const handlePaymentSubmit = () => {
    // Aquí puedes manejar la lógica de pago
    alert(`Pago realizado con éxito con la tarjeta ${cardNumber}`);
    setCartItems([]);
    setModalVisible(false);
    navigation.navigate('Home', { cartItems: [] });
  };

  const handleExpiryDateChange = (text) => {
    // Remueve caracteres no numéricos
    const cleanedText = text.replace(/[^0-9]/g, '');
    // Divide el texto en MM y YY
    let formattedText = cleanedText;
    if (cleanedText.length > 2) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpiryDate(formattedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          )}
        />
      )}
      {cartItems.length > 0 && (
        <View style={styles.paymentContainer}>
          <Button title="Proceed to Payment" onPress={handleProceedToPayment} />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Card Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handlePaymentSubmit}>
                <Text style={styles.buttonText}>Submit Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paymentContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    emptyMessage: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });

  export default Shopping;