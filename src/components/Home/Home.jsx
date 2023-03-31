import React from "react";
import AppBar from "../AppBar";
import InputBlock from "../InputBlock";
import { TbArrowsRightLeft } from "react-icons/tb";
import classes from "./Home.module.scss";

const mainCurrencies = ["USD", "EUR", "UAH"];

const Home = ({
  lastDateUpdate,
  currencyRates,
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
  const switchCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

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
    <>
      <AppBar currencyRates={currencyRates} lastDateUpdate={lastDateUpdate}  />
      <div className={classes.converter}>
        <InputBlock
          currencyList={currencyList}
          mainCurrencies={mainCurrencies}
          currency={currencyFrom}
          amount={amountFrom}
          handleAmountChange={handleAmountFromChange}
          setAmount={setCurrencyFrom}
        />
        <div className={classes.switchArrows} onClick={() => switchCurrencies()}>
          <TbArrowsRightLeft size={36} />
        </div>
        <InputBlock
          currencyList={currencyList}
          mainCurrencies={mainCurrencies}
          currency={currencyTo}
          amount={amountTo}
          handleAmountChange={handleAmountToChange}
          setAmount={setCurrencyTo}
        />
      </div>
    </>
  );
};

export default Home;
