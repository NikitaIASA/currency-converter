import React, { useState, useEffect } from "react";

import InputBlock from "../InputBlock";
import classes from "./Home.module.scss";

const mainCurrencies = ["USD", "EUR", "UAH"];

const Home = ({
  currencyFrom,
  setCurrencyFrom,
  setCurrencyTo,
  currencyTo,
  exchangeRate,
  currencyList,
  amountFrom,
  amountTo,
  setAmountTo,
  setAmountFrom,
}) => {


  // const switchCurrencies = () => {
  //   setCurrencyFrom(currencyTo);
  //   setCurrencyTo(currencyFrom);
  // };

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
        currencyList={currencyList}
        mainCurrencies={mainCurrencies}
        currency={currencyFrom}
        amount={amountFrom}
        handleAmountChange={handleAmountFromChange}
        setAmount={setCurrencyFrom}
      />
      {/* <button className={classes.switchButton} onClick={switchCurrencies}>
        &#8596;
      </button> */}
      <InputBlock
        currencyList={currencyList}
        mainCurrencies={mainCurrencies}
        currency={currencyTo}
        amount={amountTo}
        handleAmountChange={handleAmountToChange}
        setAmount={setCurrencyTo}
      />
    </div>
  );
};

export default Home;
