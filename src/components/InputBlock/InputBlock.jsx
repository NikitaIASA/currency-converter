import React from "react";

import classes from "./InputBlock.module.scss";

const InputBlock = ({
  currencyList,
  mainCurrencies,
  currency,
  amount,
  handleAmountChange,
  setAmount,
}) => {
  return (
    <div className={classes.inputBlock}>
      <div className={classes.currencyList}>
        <ul className={classes.mainCurrencies}>
          {mainCurrencies &&
            mainCurrencies.map((item) => (
              <li
                className={`${classes.mainCurrencies__item} ${
                  item === currency ? classes.active : ""
                }`}
                key={item}
                onClick={() => setAmount(item)}
              >
                {item}
              </li>
            ))}
        </ul>
        <select
          className={`${classes.select} ${
            !mainCurrencies.includes(currency) ? classes.active : ""
          }`}
          value={currency}
          onChange={(event) => setAmount(event.target.value)}
        >
          <option value="Others">Others</option>
          {currencyList &&
            currencyList
              .filter((curr) => !mainCurrencies.includes(curr))
              .map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
        </select>
      </div>
      <input
        className={classes.input}
        type="number"
        value={amount}
        onChange={handleAmountChange}
        min={0}
      />
    </div>
  );
};

export default InputBlock;
