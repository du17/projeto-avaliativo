import React from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AnimatedGastoItem({ item, onDelete }) {
  const fadeAnim = new Animated.Value(1);

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item.id);
    });
  };

  return (
    <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
      <View>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={[styles.valor, item.tipo === 'despesa' ? styles.despesa : styles.receita]}>
          {item.tipo === 'despesa' ? '-' : '+'} R$ {parseFloat(item.valor).toFixed(2)}
        </Text>
        <Text style={styles.data}>{item.data}</Text>
        {item.tag ? <Text style={styles.tag}>#{item.tag}</Text> : null}
      </View>

      <TouchableOpacity style={styles.botaoApagar} onPress={handleDelete}>
        <Text style={styles.txtApagar}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 15,
    marginTop: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  botaoApagar: {
    backgroundColor: '#F44336',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtApagar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
