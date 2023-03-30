import React from "react";

import classes from "./InputBlock.module.scss";

const InputBlock = ({
  mainCurrencies,
  currency,
  amount,
  handleAmountChange,
  setAmount,
}) => (
  <div className={classes.InputBlock}>
    <ul className={classes.mainCurrencies}>
      {mainCurrencies.map((item) => (
        <li
          className={`${classes.mainCurrencies__item} ${item === currency ? classes.active : ""}`}
          key={item}
          onClick={() => setAmount(item)}
        >
          {item}
        </li>
      ))}
    </ul>
    <input
      className={classes.input}
      type="number"
      value={amount}
      onChange={handleAmountChange}
      placeholder={0}
    />
  </div>
);

export default InputBlock;
