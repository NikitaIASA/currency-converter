import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import Home from "../components/Home";
import { getExchangeRate, getCurrencyList } from "../api/currenciesAPI";
import { ExchangeContext } from "../context/ExchangeContext";

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    currencyFrom,
    currencyTo,
    exchangeRate,
    amountFrom,
    setExchangeRate,
    setCurrencyList,
    setCurrencyRates,
    setAmountTo,
    setLastDateUpdate,
  } = useContext(ExchangeContext);

  // Fetching the currency list, rates and last data update on component mount
  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const list = await getCurrencyList();
        setCurrencyList(Object.keys(list.rates));
        setCurrencyRates(list.rates);
        setLastDateUpdate(list.time_last_updated);
      } catch (error) {
        enqueueSnackbar("Fetching data failed", { variant: "error" });
      }
    };

    fetchCurrencyData();
  }, [enqueueSnackbar, setCurrencyList, setCurrencyRates, setLastDateUpdate]);

  // Fetching the exchange rate when either of the currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rates = await getExchangeRate(currencyFrom, currencyTo);
        setExchangeRate(rates);
      } catch (error) {
        enqueueSnackbar("Exchange failed", { variant: "error" });
      }
    };
    fetchExchangeRate();
  }, [currencyFrom, currencyTo, setExchangeRate,  enqueueSnackbar]);

  // Updating the converted amount when either the amount or exchange rate changes
  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [amountFrom, exchangeRate, currencyFrom, currencyTo, setAmountTo]);

  return (
    <Home/>
  );
};

export default HomePage;
