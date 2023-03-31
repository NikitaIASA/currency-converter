import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import { getExchangeRate, getCurrencyList } from "../api/currenciesAPI";

const HomePage = () => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("UAH");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [lastDateUpdate, setLastDateUpdate] = useState(null);

  // Fetching the currency list, rates and last data update on component mount
  useEffect(() => {
    const fetchCurrencyData = async () => { 
      try {
        const list = await getCurrencyList();
        setCurrencyList(Object.keys(list.rates));
        setCurrencyRates(list.rates);
        setLastDateUpdate(list.time_last_updated);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencyData();
  }, []);

  // Fetching the exchange rate when either of the currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rates = await getExchangeRate(currencyFrom, currencyTo);
        setExchangeRate(rates);
        console.log(rates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRate();
  }, [currencyFrom, currencyTo]);

// Loading saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("exchangeData")) || {};
    setCurrencyFrom(savedData.currencyFrom || "USD");
    setCurrencyTo(savedData.currencyTo || "UAH");
    setAmountFrom(savedData.amountFrom || 0);
    setAmountTo(savedData.amountTo || 0);
  }, []);

  // Saving data to localStorage when either of the currencies or amounts change
  useEffect(() => {
    const data = {
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
    };
    localStorage.setItem("exchangeData", JSON.stringify(data));
  }, [currencyFrom, currencyTo, amountFrom, amountTo]);

  // Updating the converted amount when either the amount or exchange rate changes
  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [amountFrom, exchangeRate, currencyFrom, currencyTo]);

  return (
    <Home
      lastDateUpdate={lastDateUpdate}
      currencyRates={currencyRates}
      currencyFrom={currencyFrom}
      setCurrencyFrom={setCurrencyFrom}
      setCurrencyTo={setCurrencyTo}
      currencyTo={currencyTo}
      exchangeRate={exchangeRate}
      currencyList={currencyList}
      amountFrom={amountFrom}
      amountTo={amountTo}
      setAmountFrom={setAmountFrom}
      setAmountTo={setAmountTo}
    />
  );
};

export default HomePage;