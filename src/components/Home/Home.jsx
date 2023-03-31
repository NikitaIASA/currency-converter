import React, {useEffect} from "react";
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
  // A function to switch currencies when the user clicks on the arrows
  const switchCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  // A function to handle changes in the "from" input field
  const handleAmountFromChange = (event) => {
    const newAmountFrom = parseFloat(event.target.value);
    const newAmountTo = newAmountFrom * exchangeRate;
    setAmountFrom(newAmountFrom);
    setAmountTo(newAmountTo);
  };
  
  // A function to handle changes in the "to" input field
  const handleAmountToChange = (event) => {
    const newAmountTo = parseFloat(event.target.value);
    const newAmountFrom = newAmountTo / exchangeRate;
    setAmountTo(newAmountTo);
    setAmountFrom(newAmountFrom);
  };

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

  return (
    <>
      <AppBar currencyRates={currencyRates} lastDateUpdate={lastDateUpdate} />
      <div className={classes.converter}>
        <InputBlock
          currencyList={currencyList}
          mainCurrencies={mainCurrencies}
          currency={currencyFrom}
          amount={amountFrom}
          handleAmountChange={handleAmountFromChange}
          setAmount={setCurrencyFrom}
        />
        <div
          className={classes.switchArrows}
          onClick={() => switchCurrencies()}
        >
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
