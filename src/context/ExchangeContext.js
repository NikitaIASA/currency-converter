import React, { useState } from "react";

export const ExchangeContext = React.createContext();

export const ExchangeProvider = ({ children }) => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("UAH");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [lastDateUpdate, setLastDateUpdate] = useState(null);

  return (
    <ExchangeContext.Provider
      value={{
        currencyFrom,
        setCurrencyFrom,
        currencyTo,
        setCurrencyTo,
        exchangeRate,
        setExchangeRate,
        currencyList,
        setCurrencyList,
        currencyRates,
        setCurrencyRates,
        amountFrom,
        setAmountFrom,
        amountTo,
        setAmountTo,
        lastDateUpdate,
        setLastDateUpdate
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};
