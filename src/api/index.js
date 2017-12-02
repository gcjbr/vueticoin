import axios from 'axios';

const host = 'https://www.mercadobitcoin.net/api';
const endpoints = {
  value: 'BTC/ticker/',
};


const api = axios.create({
  baseURL: host,
});

export default {
  value: () => api.get(endpoints.value),
};
