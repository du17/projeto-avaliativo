// screens/NovoGastoScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { salvarGasto, carregarGastos } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function NovoGastoScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');
  const [tag, setTag] = useState('');
  const [tagsExistentes, setTagsExistentes] = useState([]);
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  useEffect(() => {
    carregarTagsExistentes();
  }, []);

  const carregarTagsExistentes = async () => {
    try {
      const lista = await carregarGastos();
      if (Array.isArray(lista)) {
        const tags = Array.from(new Set(lista.map(item => item.tag).filter(Boolean)));
        setTagsExistentes(tags);
      } else {
        setTagsExistentes([]);
      }
    } catch (error) {
      console.log('Erro ao carregar tags existentes:', error);
      setTagsExistentes([]);
    }
  };

  const aoSalvar = async () => {
    if (!descricao || !valor || !tag) return alert('Preencha todos os campos.');
    const novoGasto = {
      id: Date.now().toString(),
      descricao,
      valor,
      tipo,
      tag,
      data: data.toISOString()
    };
    await salvarGasto(novoGasto);
    setDescricao('');
    setValor('');
    setTag('');
    navigation.navigate('Histórico');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Novo Gasto</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor (ex: 50.00)"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.tipoContainer}>
          <TouchableOpacity
            style={[styles.tipoBotao, tipo === 'receita' && styles.tipoAtivo]}
            onPress={() => setTipo('receita')}
          >
            <Text style={styles.tipoTexto}>Receita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoBotao, tipo === 'despesa' && styles.tipoAtivo]}
            onPress={() => setTipo('despesa')}
          >
            <Text style={styles.tipoTexto}>Despesa</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subLabel}>Tags recentes:</Text>
        <FlatList
          horizontal
          data={tagsExistentes}
          keyExtractor={(item) => item}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chip} onPress={() => setTag(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <TextInput
          style={styles.input}
          placeholder="Nova tag ou personalizada"
          value={tag}
          onChangeText={setTag}
        />

        <TouchableOpacity style={styles.dataBtn} onPress={() => setMostrarData(true)}>
          <Ionicons name="calendar" size={20} color="#333" />
          <Text style={styles.dataTexto}>{data.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {mostrarData && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setMostrarData(false);
              if (selectedDate) setData(selectedDate);
            }}
          />
        )}
      </ScrollView>

      <TouchableOpacity style={styles.salvarBtn} onPress={aoSalvar}>
        <Ionicons name="save" size={24} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F2F4F6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    elevation: 1,
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  tipoBotao: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '45%',
    alignItems: 'center',
  },
  tipoAtivo: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  tipoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    borderRadius: 16,
  },
  dataBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
  },
  dataTexto: {
    fontSize: 16,
  },
  salvarBtn: {
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
