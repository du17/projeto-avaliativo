import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Titulo({ children }) {
  return <Text style={styles.titulo}>{children}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});
