import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { carregarGastos, limparGastos } from '../utils/storage';

export default function HistoricoScreen() {
  const [gastos, setGastos] = useState([]);

  const carregar = async () => {
    const lista = await carregarGastos();
    setGastos(lista.reverse());
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const handleLimpar = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja apagar todas as movimentações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await limparGastos();
            setGastos([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={[styles.valor, item.tipo === 'despesa' ? styles.despesa : styles.receita]}>
        {item.tipo === 'despesa' ? '-' : '+'} R$ {parseFloat(item.valor).toFixed(2)}
      </Text>
      <Text style={styles.data}>{item.data}</Text>
      {item.tag ? <Text style={styles.tag}>#{item.tag}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Movimentações</Text>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma movimentação registrada ainda.</Text>
        }
      />

      <TouchableOpacity style={styles.botaoLimpar} onPress={handleLimpar}>
        <Text style={styles.textoLimpar}>Limpar Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
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
  botaoLimpar: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 3,
  },
  textoLimpar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
    color: '#777',
  },
});
