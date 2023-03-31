import axios from '../axios';

// Getting specific Exchange Rate
export const getExchangeRate = async (currencyFrom, currencyTo) => { 
  try {
    const { data } = await axios.get(`/${currencyFrom}`);
    return data.rates[currencyTo];
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Getting list of Currency rates
export const getCurrencyList = async () => {
  try {
    const {data} = await axios.get(`/UAH`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

