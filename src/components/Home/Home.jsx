import React, {useEffect, useContext} from "react";
import AppBar from "../AppBar";
import InputBlock from "../InputBlock";
import { TbArrowsRightLeft } from "react-icons/tb";
import classes from "./Home.module.scss";
import { ExchangeContext } from "../../context/ExchangeContext";

const mainCurrencies = ["USD", "EUR", "UAH"];

const Home = () => {
  const {
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    exchangeRate,
    currencyList,
    amountFrom,
    setAmountFrom,
    amountTo,
    setAmountTo,
  } = useContext(ExchangeContext);

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
  }, [setCurrencyFrom, setCurrencyTo, setAmountFrom, setAmountTo]);

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
      <AppBar/>
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
