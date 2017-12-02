import axios from 'axios';

const hosts = {
  BRL: 'https://www.mercadobitcoin.net/api/BTC/ticker/',
  USD: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  EURO: 'https://api.coindesk.com/v1/bpi/currentprice.json',

};

const api = axios.create();

export default {
  BRL: () => api.get(hosts.BRL),
  USD: () => api.get(hosts.USD),
  EURO: () => api.get(hosts.EURO),

};
