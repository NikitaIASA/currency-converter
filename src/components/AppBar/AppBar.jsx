import React from "react";

import classes from "./AppBar.module.scss";

const AppBar = ({ currencyRates, lastDateUpdate }) => {
  const dateOfLastUpdate = (new Date(lastDateUpdate * 1000)).toLocaleString(); 
  return (
    <header className={classes.header}>
      <div className={classes.header__inner}>
        <h1>Currency Converter</h1>
        <div className={classes.actualInfo}>
          <ul className={classes.actualInfo__rates}>
            <li>1 USD = <b>{(1 / currencyRates.USD).toFixed(2)}</b> UAH</li>
            <li>1 EUR = <b>{(1 / currencyRates.EUR).toFixed(2)}</b> UAH</li>
          </ul>
          <p className={classes.actualInfo__date}>Last update was: {dateOfLastUpdate} UTC</p>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
