// src/pages/BotaoIOT.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native-web'; // Usando React Native Web

// Página com o botão que alterna entre 0 e 1 para cada um dos botões
export default function BotaoIOT({ route, navigation }) {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [numero3, setNumero3] = useState(0);

  // Função para alternar entre 0 e 1
  const alternarNumero = (setNumero) => {
    setNumero((prevNumero) => (prevNumero === 0 ? 1 : 0)); // Alterna entre 0 e 1
  };

  const { token, username } = route.params; // Recebendo os parâmetros passados via navegação

  return (
    <View style={styles.container}>
      {/* Container para os botões alinhados lado a lado */}
      <View style={styles.buttonRow}>
        {/* Botão 1 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alternarNumero(setNumero1)}
          >
            <Text style={styles.buttonText}>Clique aqui</Text>
          </TouchableOpacity>
          <Text style={styles.numero}>{numero1}</Text>
        </View>

        {/* Botão 2 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alternarNumero(setNumero2)}
          >
            <Text style={styles.buttonText}>Clique aqui</Text>
          </TouchableOpacity>
          <Text style={styles.numero}>{numero2}</Text>
        </View>

        {/* Botão 3 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alternarNumero(setNumero3)}
          >
            <Text style={styles.buttonText}>Clique aqui</Text>
          </TouchableOpacity>
          <Text style={styles.numero}>{numero3}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonRow: {
    flexDirection: 'row',  // Alinha os botões horizontalmente
    justifyContent: 'center',  // Centraliza os botões
    alignItems: 'center',  // Alinha os itens verticalmente no centro
    width: '100%',  // Faz com que o container ocupe toda a largura
    marginTop: 20,   // Adiciona um pequeno espaço acima dos botões
  },
  buttonContainer: {
    alignItems: 'center',  // Alinha os botões e números no centro
    marginHorizontal: 40,  // Espaço entre os botões
  },
  numero: {
    fontSize: 50,          // Ajustando o tamanho do número
    marginTop: 10,         // Espaço entre o botão e o número
  },
  button: {
    backgroundColor: 'rgb(0, 0, 139)',  // Cor de fundo dos botões
    padding: 120,           // Aumentando o padding para aumentar o tamanho do botão
    width: 600,             // Largura ajustada dos botões
    height: 240,            // Altura ajustada dos botões
    borderRadius: 10,       // Bordas arredondadas para os botões
    justifyContent: 'center', // Para centralizar o texto dentro do botão
    alignItems: 'center',   // Centraliza o conteúdo do botão
  },
  buttonText: {
    fontSize: 48,           // Aumentando o tamanho da fonte do texto dentro do botão
    color: '#fff',          // Cor do texto
    fontWeight: 'bold',     // Deixa o texto em negrito
  },
});
