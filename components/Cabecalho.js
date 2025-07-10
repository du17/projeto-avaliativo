
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cabecalho({ titulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
