import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'meus_gastos';

export async function salvarGasto(novo) {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);
    const lista = dados ? JSON.parse(dados) : [];
    lista.push(novo);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch (e) {
    console.error('Erro ao salvar gasto:', e);
  }
}

export async function carregarGastos() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.error('Erro ao carregar gastos:', e);
    return [];
  }
}

export async function limparGastos() {
  try {
    await AsyncStorage.removeItem(CHAVE);
  } catch (e) {
    console.error('Erro ao limpar dados:', e);
  }
}
