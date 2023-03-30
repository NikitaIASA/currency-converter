import axios from 'axios';

export const getExchangeRate = async (currencyFrom, currencyTo) => {
  try {
    const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`);
    return data.rates[currencyTo];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrencyList = async () => {
  try {
    const {data} = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
    return Object.keys(data.rates);
  } catch (error) {
    console.error(error);
    return [];
  }
};