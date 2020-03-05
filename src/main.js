import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
