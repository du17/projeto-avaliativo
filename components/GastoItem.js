import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GastoItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={[styles.valor, item.tipo === 'despesa' ? styles.despesa : styles.receita]}>
        {item.tipo === 'despesa' ? '-' : '+'} R$ {parseFloat(item.valor).toFixed(2)}
      </Text>
      <Text style={styles.data}>{item.data}</Text>
      {item.tag ? <Text style={styles.tag}>#{item.tag}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  valor: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  despesa: {
    color: '#E53935',
  },
  receita: {
    color: '#4CAF50',
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  tag: {
    marginTop: 6,
    fontSize: 12,
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    color: '#555',
  },
});
