import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView } from 'react-native';
import { Line, Bar, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function GraphScreen({ route }) {
  const [sensorData, setSensorData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('lastHour');
  const { token, username } = route.params; // Recebe o username também

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://localhost:3000/dados-sensores', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const filteredData = filterSensorData(data);
        setSensorData(filteredData);
      } catch (error) {
        console.error('Erro ao buscar dados dos sensores:', error);
      }
    };

    fetchSensorData();
  }, [token, timeRange]);

  const filterSensorData = (data) => {
    const now = new Date();
    return data.filter(item => {
      const itemDate = new Date(item.timestamp);
      switch (timeRange) {
        case 'lastHour':
          return itemDate >= new Date(now - 60 * 60 * 1000);
        case 'last24Hours':
          return itemDate >= new Date(now - 24 * 60 * 60 * 1000);
        case 'lastWeek':
          return itemDate >= new Date(now - 7 * 24 * 60 * 60 * 1000);
        case 'last30Days':
          return itemDate >= new Date(now - 30 * 24 * 60 * 60 * 1000);
        case 'allData':
          return true; 
        default:
          return true;
      }
    });
  };

  const createChartData = (label, dataKey, color) => ({
    labels: sensorData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label,
        data: sensorData.map(item => item[dataKey]),
        backgroundColor: color,
        borderColor: color,
        fill: false,
        tension: 0.1,
      },
    ],
  });

  const tempData = createChartData('Temperatura', 'Temperatura', 'rgba(255, 0, 0, 1)'); 
  const LumiData = createChartData('Luminosidade', 'Luminosidade', 'rgba(0, 0, 255, 1)');
  const ocupData = createChartData('Ocupação', 'Ocupacao', 'rgba(0, 255, 0, 1)');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
        beginAtZero: true,
      },
    },
  };

  const renderChart = (data) => {
    return (
      <View style={styles.chartContainer}>
        {(() => {
          switch (chartType) {
            case 'line':
              return <Line data={data} options={options} />;
            case 'bar':
              return <Bar data={data} options={options} />;
            case 'radar':
              return <Radar data={data} options={options} />;
            default:
              return <Line data={data} options={options} />;
          }
        })()}
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Gráfico de Dados dos Sensores</Text>
        </View>

        <Picker
          selectedValue={timeRange}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeRange(itemValue)}
        >
          <Picker.Item label="Última Hora" value="lastHour" />
          <Picker.Item label="Últimas 24 Horas" value="last24Hours" />
          <Picker.Item label="Última Semana" value="lastWeek" />
          <Picker.Item label="Últimos 30 Dias" value="last30Days" />
          <Picker.Item label="Todos os Dados" value="allData" />
        </Picker>

        <Picker
          selectedValue={chartType}
          style={styles.picker}
          onValueChange={(itemValue) => setChartType(itemValue)}
        >
          <Picker.Item label="Linha" value="line" />
          <Picker.Item label="Barra" value="bar" />
          <Picker.Item label="Radar" value="radar" />
        </Picker>

        <Text style={styles.chartLabel}>Temperatura</Text>
        {renderChart(tempData)}

        <Text style={styles.chartLabel}>Luminosidade</Text>
        {renderChart(LumiData)}

        <Text style={styles.chartLabel}>Ocupação</Text>
        {renderChart(ocupData)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#D3D3D3', // Fundo cinza claro
  },
  titleBox: {
    backgroundColor: '#fff', // Caixa branca para o título
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 54, // Aumento de 3x no tamanho do título
    color: '#000', // Cor do texto do título para preto
  },
  picker: {
    height: 60, // Aumento do tamanho do Picker
    width: 250, // Aumento do tamanho do Picker
    marginBottom: 30, // Aumento do espaçamento entre os Pickers
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    color: '#000', // Cor do texto dentro do Picker
    backgroundColor: '#fff', // Fundo branco para o Picker
  },
  chartLabel: {
    fontSize: 20, // Aumento do tamanho do texto do rótulo dos gráficos
    marginVertical: 15,
    color: '#000', // Cor do texto alterada para preto
  },
  chartContainer: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  scrollContainer: {
    backgroundColor: '#D3D3D3', // Fundo cinza claro para a tela
  },
  error: {
    color: 'red',
  },
});
