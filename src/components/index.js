import Vue from 'vue'

import Echarts from "./Echarts/index.vue"
Vue.component("Echarts", Echarts)

import EchartsDesign from "./Formdesign/index.vue"
Vue.component("EchartsDesign", EchartsDesign)

import * as echarts from 'echarts';
Vue.prototype.$echart = echarts;

export { Echarts, EchartsDesign }