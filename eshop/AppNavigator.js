// AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/homePage';
import ProductRecommendations from './components/productRecommendations';
import AdminCenter from './components/adminCenter';
import Login from './components/login';
import Register from './components/register';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ProductRecommendations" component={ProductRecommendations} />
        <Stack.Screen name="AdminCenter" component={AdminCenter} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
