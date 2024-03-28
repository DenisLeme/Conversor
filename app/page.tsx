"use client"
import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("US$ Dolar americano");
  const [inputValue, setInputValue] = useState("");
  const [realValue, setRealValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");

  const currencies = [
    { name: "US$ Dolar americano", imgSrc: "/convert/assets/estados-unidos.png" },
    { name: "€ Euro", imgSrc: "/convert/assets/euro.png" },
    { name: "BitCoin", imgSrc: "/convert/assets/bitCoin.png" }
  ];
  

  useEffect(() => {
    convertValues();
  }, [inputValue, selectedCurrency]); // Executar a conversão sempre que o valor de entrada ou a moeda selecionada mudar

  const convertValues = async () => {
    // Simulação de chamada à API
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json());

    const dolar = data.USDBRL.high;
    const euro = data.EURBRL.high;
    const bitCoin = data.BTCBRL.high;

    setRealValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(inputValue)));

    if (selectedCurrency === "US$ Dolar americano") {
      setConvertedValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(inputValue) / dolar));
    }

    if (selectedCurrency === "€ Euro") {
      setConvertedValue(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(inputValue) / euro));
    }

    if (selectedCurrency === "BitCoin") {
      setConvertedValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BTC' }).format(Number(inputValue) * bitCoin));
    }
  }

  const changeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCurrency(selectedValue);
  }

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="container p-4 bg-blue-900 shadow-lg rounded-lg">
        <header className="bg-blue-600 p-2 rounded-t-lg flex justify-center items-center">
          <h1 className="text-white text-lg font-semibold">Conversor de Moedas</h1>
        </header>
        <main className="p-4">
          <label className="text-gray-400">Converter <b>de</b></label>
          <select className="block bg-white border border-gray-300 rounded p-1 w-full text-black">
            <option>$ Real Brasileiro</option>
          </select>
          <label className="text-gray-400">Converter <b>para</b></label>
          <select className="block bg-white border border-gray-300 rounded p-1 w-full text-black" value={selectedCurrency} onChange={changeCurrency}>
            {currencies.map(currency => (
              <option key={currency.name}>{currency.name}</option>
            ))}
          </select>
          <label className="text-gray-400"><strong>Valor</strong></label>
          <input type="number" className="block bg-white border border-gray-300 rounded p-1 w-full text-black" placeholder="R$ 10.000,00" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

          <section className="border border-blue-600 rounded p-4 mt-4 flex flex-col items-center">
            <div className="container-currency flex flex-col items-center">
              <img src="/assets/brasil.png" alt="icone do Brasil" />
              <p className="text-gray-400 font-semibold">Real</p>
              <p className="text-blue-600 font-bold text-xl">{realValue}</p>
            </div>
            <div>
              <img className="arrow-img" src="/convert/assests/Vector.png" />
            </div>
            <div className="container-currency flex flex-col items-center">
            <img src={currencies.find(currency => currency.name === selectedCurrency)?.imgSrc} alt={`icone de ${selectedCurrency}`} />
              <p className="text-gray-400 font-semibold">{selectedCurrency}</p>
              <p className="text-blue-600 font-bold text-xl">{convertedValue}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
