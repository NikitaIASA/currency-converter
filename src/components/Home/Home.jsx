import React, { useState } from "react";

import InputBlock from "../InputBlock";
import classes from "./Home.module.scss";

const mainCurrencies = ["USD", "EUR", "UAH"];

const Home = ({
  currencyFrom,
  setCurrencyFrom,
  setCurrencyTo,
  setExchangeRate,
  currencyTo,
  exchangeRate,
  currencyList,
}) => {
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [showOtherCurrencies, setShowOtherCurrencies] = useState(false);

  const handleAmountFromChange = (event) => {
    const newAmountFrom = parseFloat(event.target.value);
    const newAmountTo = newAmountFrom * exchangeRate;
    setAmountFrom(newAmountFrom);
    setAmountTo(newAmountTo);
  };

  const handleAmountToChange = (event) => {
    const newAmountTo = parseFloat(event.target.value);
    const newAmountFrom = newAmountTo / exchangeRate;
    setAmountTo(newAmountTo);
    setAmountFrom(newAmountFrom);
  };

  return (
    <div className={classes.converter}>
      <InputBlock
        mainCurrencies={mainCurrencies}
        currency={currencyFrom}
        amount={amountFrom}
        handleAmountChange={handleAmountFromChange}
        setAmount={setCurrencyFrom}
      />
      <InputBlock
        mainCurrencies={mainCurrencies}
        currency={currencyTo}
        amount={amountTo}
        handleAmountChange={handleAmountToChange}
        setAmount={setCurrencyTo}
      />
      {/* <div>
        <label>From:</label>
        <select
          value={currencyFrom}
          onChange={(event) => setCurrencyFrom(event.target.value)}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div> */}
      {/* <div>
        <select
          value={currencyTo}
          onChange={(event) => setCurrencyTo(event.target.value)}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};

export default Home;
