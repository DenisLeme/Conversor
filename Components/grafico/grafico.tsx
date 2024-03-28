import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip
)

const Grafico: React.FC = () => {

  const [chart, setChart] = useState<number[]>([])

  const moeda: string[] = ['USD', 'Euro', 'Bitcoin']

  const url: string = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"

  useEffect(() => {
    const fetchMoeda = async () => {
      await fetch(url)
        .then(res => res.json())
        .then(valor => {
          const cotacao: number[] = [
            parseFloat(valor.USDBRL.bid),
            parseFloat(valor.EURBRL.bid),
            parseFloat(valor.BTCBRL.bid)
          ]

          setChart(cotacao)
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchMoeda()
  }, [url])

  const data = {
    labels: moeda,
    datasets: [{
      data: chart,
      backgroundColor: [
        'rgb(17, 48, 89)'
      ],
      borderColor: [
        'black',
      ],
      borderWidth: 2
    }]
  }

  const options = {

    scales: {
      y: {
        beginAtZero: true
      },
    }
  }

  return (
    <div className="grafico">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

export default Grafico;
