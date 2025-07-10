import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { carregarGastos } from '../utils/storage';
import { LineChart } from 'react-native-chart-kit';

export default function ResumoScreen() {
  const [totalReceita, setTotalReceita] = useState(0);
  const [totalDespesa, setTotalDespesa] = useState(0);

  const carregarResumo = async () => {
    const gastos = await carregarGastos();
    const receitas = gastos.filter(g => g.tipo === 'receita');
    const despesas = gastos.filter(g => g.tipo === 'despesa');

    const somaReceita = receitas.reduce((s, g) => s + parseFloat(g.valor || 0), 0);
    const somaDespesa = despesas.reduce((s, g) => s + parseFloat(g.valor || 0), 0);

    setTotalReceita(somaReceita);
    setTotalDespesa(somaDespesa);
  };

  useFocusEffect(
    useCallback(() => {
      carregarResumo();
    }, [])
  );

  const saldo = totalReceita - totalDespesa;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Receitas:</Text>
        <Text style={styles.valorReceita}>R$ {totalReceita.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Despesas:</Text>
        <Text style={styles.valorDespesa}>R$ {totalDespesa.toFixed(2)}</Text>
      </View>

      <View style={styles.cardSaldo}>
        <Text style={styles.label}>Saldo:</Text>
        <Text style={styles.valorSaldo}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <Text style={styles.graficoTitulo}>Histórico Gráfico</Text>
      <LineChart
        data={{
          labels: ['Receita', 'Despesa'],
          datasets: [{ data: [totalReceita, totalDespesa] }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.grafico}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4F8',
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardSaldo: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  valorReceita: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  valorDespesa: {
    fontSize: 18,
    color: '#E53935',
    fontWeight: 'bold',
  },
  valorSaldo: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  graficoTitulo: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  grafico: {
    borderRadius: 10,
  },
});
