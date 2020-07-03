import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Chartkick.use(Chart))

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
