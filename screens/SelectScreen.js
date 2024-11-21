// src/pages/BotaoIOT.js
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web'; // Usando React Native Web
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando ícones

// Página sem o botão de aumentar número e centralizando os botões de navegação
export default function BotaoIOT({ route, navigation }) {
  const { token } = route.params; // Recebendo os parâmetros passados via navegação

  return (
    <View style={styles.container}>
      {/* Barra de navegação centralizada na parte superior */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate('GraphScreen', { token })}
        >
          <Icon name="bar-chart" size={240} color="#fff" /> {/* Aumentando o ícone 10 vezes */}
          <Text style={styles.navigationButtonText}>GraphScreen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate('BotaoIOT', { token })}
        >
          <Icon name="code-fork" size={240} color="#fff" /> {/* Aumentando o ícone 10 vezes */}
          <Text style={styles.navigationButtonText}>BotaoIOT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Cor de fundo mais escura (escuro cinza/azul)
  },
  // Estilo para a barra de navegação no topo
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  // Centraliza os botões na horizontal
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',  // Para garantir que a barra ocupe a largura total da tela
  },
  navigationButton: {
    backgroundColor: 'rgb(0, 0, 139)',  // Cor dos botões alterada para RGB(0, 0, 139)
    borderRadius: 10,
    padding: 75,  // Aumentando o padding para aumentar o tamanho do botão
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,  // Aumentando a distância entre os botões
    width: 600,  // Aumentando a largura do botão
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 48,  // Aumentando a fonte do texto
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
