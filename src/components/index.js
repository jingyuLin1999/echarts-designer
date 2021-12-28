import Vue from 'vue'
import "codemirror/lib/codemirror.css"

import Echarts from "./Echarts/index.vue"
Vue.component("Echarts", Echarts)

import EchartsDesign from "./EchartsDesign/index.vue"
Vue.component("EchartsDesign", EchartsDesign)

import * as echarts from 'echarts';
Vue.prototype.$echart = echarts;

export { Echarts, EchartsDesign }