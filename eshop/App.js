import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

enableScreens();

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

