import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.exchangerate-api.com/v4/latest",
});

export default instance;
