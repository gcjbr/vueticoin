<template>
  <div class="main">
    <div>        
        <span>Your</span> <input v-model="btc" type="text" /> <span>BTC
        are worth 
        <select v-model="currency">
          <option value="BRL">R$</option>          
          <option value="USD">US$</option>
          <option value="EURO">€</option>
          
        </select>
        <span class="converted">{{result}}</span></span>
    </div>
    <div class="credit">
      <p>Made with ❤️ by <a href="http://gcj.io/">GCJ</a> </p>
      <p>Data from <a href="https://www.coindesk.com/">Coindesk's</a> and <a href="https://www.mercadobitcoin.com.br/">Mercado Bitcoin's</a> apis</p>
      <p> 🍺 If you like it and want to buy me a beer, here's my bitcoin address <strong>18vxL859Nvi3C3FaMdWSKKB6vpzcC88GrR</strong> :)</p>
    </div>
  </div>
</template>

<script>

import api from '@/api';
import accounting from 'accounting';

export default {
  data() {
    return {
      btc: null,
      result: 0,
      currency: 'USD',
    };
  },
  watch: {
    btc() {
      this.generate();
    },
    currency() {
      this.$localStorage.set('currency', this.currency);
      this.generate();
    },
  },
  methods: {
    generate() {
      // If currency is BRL
      if (this.currency === 'BRL') {
        api.BRL().then((res) => {
          this.$localStorage.set('btc', this.btc);
          let newval = this.btc.replace(',', '.') * res.data.ticker.sell;
          newval = accounting.formatMoney(newval, '', 2, '.', ',');
          this.result = newval;
        }).catch((error) => {
          console.log(error);
        });
      }
      // If currency is USD
      if (this.currency === 'USD') {
        api.USD().then((res) => {
          this.$localStorage.set('btc', this.btc);
          let newval = this.btc.replace(',', '.') * res.data.bpi.USD.rate_float;
          newval = accounting.formatMoney(newval, '', 2, ',', '.');
          this.result = newval;
        }).catch((error) => {
          console.log(error);
        });
      }
      // If currency is EURO
      if (this.currency === 'EURO') {
        api.USD().then((res) => {
          this.$localStorage.set('btc', this.btc);
          let newval = this.btc.replace(',', '.') * res.data.bpi.EUR.rate_float;
          newval = accounting.formatMoney(newval, '', 2, '.', ',');
          this.result = newval;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
  },
  mounted() {
    this.btc = this.$localStorage.get('btc');
    this.currency = this.$localStorage.get('currency');
  },
};
</script>
<style>

body {
  font-size: 3rem;
  font-family: 'Roboto';
  font-weight: 300;
}

.main {
  padding: 50px;
  max-width: 1200px;
  margin:auto;
  text-align: center;
  
}

.main input, .main select {
  font-size: 2rem;  
  padding: 10px;
  width: 120px;
}

.converted {
  color: #443ffa;
}

.credit {
  font-size: 1rem;
  margin-top: 120px;
}

</style>
