// AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/homePage';
import ProductRecommendations from './components/productRecommendations';
import AdminCenter from './components/adminCenter';
import Login from './components/login';
import Register from './components/register';
import AnaliticsIA from './components/analiticsIA';
import Shopping from './components/shopping';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ProductRecommendations" component={ProductRecommendations} />
        <Stack.Screen name="AdminCenter" component={AdminCenter} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Analitics" component={AnaliticsIA}/>
        <Stack.Screen name="Shopping" component={Shopping} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

