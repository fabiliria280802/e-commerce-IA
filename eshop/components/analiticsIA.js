// components/adminCenter
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnaliticsIA = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Center</Text>
      {/* Aquí agregarás el contenido del centro de administración */}
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
  },
});

export default AnaliticsIA;