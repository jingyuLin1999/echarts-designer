import Vue from 'vue'

import Echarts from "./Echarts/index.vue"
Vue.component("Echarts", Echarts)

// TODO monaco体积太大,需优化掉
import EchartsDesign from "./EchartsDesign/index.vue"
Vue.component("EchartsDesign", EchartsDesign)

import * as echarts from 'echarts';
Vue.prototype.$echart = echarts;

export { Echarts, EchartsDesign }