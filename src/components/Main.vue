<template>
  <div>

  </div>
</template>

<script>

import api from '@/api';

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted () {
    api.value().then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  },
};
</script>
