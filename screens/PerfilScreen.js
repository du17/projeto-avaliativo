import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

const CHAVE_PERFIL = 'perfil_usuario';

export default function PerfilScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_PERFIL);
      if (dados) {
        const perfil = JSON.parse(dados);
        setNome(perfil.nome || '');
        setEmail(perfil.email || '');
        setFoto(perfil.foto || null);
      }
    } catch (e) {
      console.error('Erro ao carregar perfil:', e);
    }
  };

  const salvarPerfil = async () => {
    const perfil = { nome, email, foto };
    await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const escolherFotoAleatoria = () => {
    const urls = [
      'https://i.pravatar.cc/300?img=1',
      'https://i.pravatar.cc/300?img=12',
      'https://i.pravatar.cc/300?img=20',
    ];
    const aleatoria = urls[Math.floor(Math.random() * urls.length)];
    setFoto(aleatoria);
    setModalVisible(false);
  };

  const escolherDaGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setFoto(resultado.assets[0].uri);
    }

    setModalVisible(false);
  };

  const tirarFotoCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Permita o acesso à câmera.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setFoto(resultado.assets[0].uri);
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={
            foto
              ? { uri: foto }
              : require('../assets/avatar-placeholder.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.avatarTexto}>Alterar Foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
        <Text style={styles.textoSalvar}>Salvar Perfil</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Escolher Foto</Text>

            <TouchableOpacity style={styles.modalBotao} onPress={escolherFotoAleatoria}>
              <Text style={styles.modalTexto}>📸 Foto aleatória</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBotao} onPress={escolherDaGaleria}>
              <Text style={styles.modalTexto}>🖼️ Escolher da galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBotao} onPress={tirarFotoCamera}>
              <Text style={styles.modalTexto}>🤳 Tirar com a câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4F8',
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  avatarTexto: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    marginTop: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000088',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'stretch',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  modalBotao: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTexto: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancelar: {
    color: '#E53935',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 16,
  },
});
