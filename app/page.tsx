"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

const Home: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [inputValue, setInputValue] = useState("");
  const [realValue, setRealValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");

  const currencies = [
    { name: "USD" },
    { name: "€ Euro" },
    { name: "BitCoin" }
  ];
 
  useEffect(() => {
    convertValues();
  }, [inputValue, selectedCurrency]); // Executar a conversão sempre que o valor de entrada ou a moeda selecionada mudar

  const convertValues = async () => {
    //Chamada API
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json());

    const dolar = data.USDBRL.high;
    const euro = data.EURBRL.high;
    const bitCoin = data.BTCBRL.high;

    setRealValue(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(inputValue)));

    if (selectedCurrency === "USD") {
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
    <>
    <div className="flex self-center items-center justify-center bg-[#091D42] h-[20vh]">
    <Image src={'/assets/rzkdigital.png'} alt="RZK-logo" width={200} height={200} />
    </div>
    <div className="bg-[#091D42] w-full h-[80vh] flex flex-col justify-start items-center ">
      <div className="p-4 bg-[#5ABF9A] shadow-xl w-2/4 ">
        <section className="bg-[#091D4250] p-2  flex justify-center items-center">
          <p className="text-[#091D42] text-3xl font-semibold">Conversor de Moedas</p>
        </section>
        <main className="p-4 flex flex-col gap-2">
          <label className="text-[#091D42]">Converter <b>de</b></label>
          <div className="text-[#091D42] flex flex-row w-full border-b-2 border-[#091D4250] items-center px-2 bg-[#ffffff50] h-[40px]">
          <select  style={{all: 'unset'}} className="block bg-transparent p-1 text-[#091D42] placeholder-[#091D42] w-full">
            <option>$ Real Brasileiro</option>
          </select>
          </div>
          <label className="text-[#091D42]">Converter <b>para</b></label>
          <div className="text-[#091D42] flex flex-row w-full border-b-2 border-[#091D4250] items-center px-2 bg-[#ffffff50] h-[40px]">
          <select className="block bg-transparent p-1 text-[#091D42] placeholder-[#091D42] w-full [appearance:none] " value={selectedCurrency} onChange={changeCurrency}>
            {currencies.map(currency => (
              <option  className="text-[#091D42] flex flex-row w-full border-b-2 border-[#091D4250] items-center px-2 bg-[#5ABF9A] h-[40px]" key={currency.name}>{currency.name}</option>
            ))}
          </select>
          </div>
          <label className="text-[#091D42]"><strong>Valor</strong></label>
          <div className="text-[#091D42] flex flex-row w-full border-b-2 border-[#091D4250] items-center px-2 bg-[#ffffff50] h-[40px]">
          <div>R$ </div>
          <input type="number" style={{all: 'unset'}} className="block bg-transparent p-1 text-[#091D42] placeholder-[#091D42] w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder=" 10.000,00" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>

          <section className="border-t-2 border-[#091D42] rounded p-4 mt-4 flex flex-col items-start">
            <div className="container-currency flex flex-col items-start">
              <p className="text-[#091D42] font-semibold">Real</p>
              <p className="text-[#091D42] font-bold text-xl">{realValue}</p>
            </div>
            <div>
            </div>
            <div className="container-currency flex flex-col items-start">
              <p className="text-[#091D42] font-semibold">{selectedCurrency}</p>
              <p className="text-[#091D42] font-bold text-xl">{convertedValue}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  );
}

export default Home;
