import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import { getExchangeRate, getCurrencyList } from "../api/currenciesAPI";

const HomePage = () => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("UAH");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const list = await getCurrencyList();
        setCurrencyList(list);
        console.log(list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencyList();
  }, []);

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

  return (
    <Home
      currencyFrom={currencyFrom}
      setCurrencyFrom={setCurrencyFrom}
      setCurrencyTo={setCurrencyTo}
      currencyTo={currencyTo}
      exchangeRate={exchangeRate}
      setExchangeRate={setExchangeRate}
      currencyList={currencyList}
    />
  );
};

export default HomePage;
