import Vue from 'vue'
import App from './App.vue'

import * as echarts from 'echarts';
Vue.prototype.$echart = echarts;

import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
