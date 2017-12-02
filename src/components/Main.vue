<template>
  <div class="md-layout main">
    <div class="md-layout-item">
      Seus <input v-model="btc" type="text" placeholder="Quantos BTC você tem" /> BTC
      equivalem a R${{brl}}
    </div>
    
  </div>
</template>

<script>

import api from '@/api';

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
        this.brl = this.btc.replace(",", ".") * res.data.ticker.sell;
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
};
</script>
<style>

.md-layout.main {
  padding: 50px;
  max-width: 1200px;
  margin:auto;
  text-align: center;
  font-size: 3rem;
  line-height: 3rem;
}

.md-layout.main input {
  font-size: 2rem;  
  padding: 10px;
}

</style>
