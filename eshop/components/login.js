import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.100.155:3000/api/users/login', { email, password });
      if (response.data) {
        setVisible(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Login Failed', error.response.data.message);
      } else {
        setVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Login Successful👌</Dialog.Title>
        <Dialog.Description>
          Welcome back, <Text style={styles.bold}>Mr. Messi</Text>! 😊{'\n\n'}
          We have so many new products for you. {'\n\n'}
          Please enter our new <Text style={styles.bold}>Recommendations</Text> section by clicking on <Text style={styles.bold}>User</Text> and find our special selection of products just for you.
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={() => { setVisible(false); navigation.navigate('Home'); }} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Login;