<template>
  <div class="md-layout main">
    <div class="md-layout-item">        
        <span class="md-display-2">Seus</span> <input v-model="btc" type="text" placeholder="Quantos BTC você tem" /> <span class="md-display-2">BTC
        equivalem a <span class="converted">{{brl}}</span></span>
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
      brl: 0,
    };
  },
  watch: {
    btc(val) {
      api.value().then((res) => {
        this.$localStorage.set('btc', this.btc);
        let newval = this.btc.replace(",", ".") * res.data.ticker.sell;
        newval = accounting.formatMoney(newval,'R$', 2, ".", ",");
        this.brl = newval;

      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  mounted() {
    this.btc = this.$localStorage.get('btc');
  },
};
</script>
<style>

.md-layout.main {
  padding: 50px;
  max-width: 1200px;
  margin:auto;
  text-align: center;
  
}

.md-layout.main input {
  font-size: 2rem;  
  padding: 10px;
}

.converted {
  color: #443ffa;
}

</style>
