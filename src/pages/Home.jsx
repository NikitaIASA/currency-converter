import React, { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import Home from "../components/Home";
import { getExchangeRate, getCurrencyList } from "../api/currenciesAPI";

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar("Fetching data failed", {variant: 'error'});
      }
    };

    fetchCurrencyData();
  }, [enqueueSnackbar]);

  // Fetching the exchange rate when either of the currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rates = await getExchangeRate(currencyFrom, currencyTo);
        setExchangeRate(rates);
      } catch (error) {
        enqueueSnackbar("Exchange failed", {variant: 'error'});
      }
    };
    fetchExchangeRate();
  }, [currencyFrom, currencyTo, enqueueSnackbar]);

  // Updating the converted amount when either the amount or exchange rate changes
  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [amountFrom, exchangeRate, currencyFrom, currencyTo]);

  return (
    <Home
      currencyFrom={currencyFrom}
      currencyTo={currencyTo}
      setCurrencyFrom={setCurrencyFrom}
      setCurrencyTo={setCurrencyTo}
      exchangeRate={exchangeRate}
      currencyList={currencyList}
      amountFrom={amountFrom}
      amountTo={amountTo}
      setAmountFrom={setAmountFrom}
      setAmountTo={setAmountTo}
      lastDateUpdate={lastDateUpdate}
      currencyRates={currencyRates}
    />
  );
};

export default HomePage;