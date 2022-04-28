import Vue from 'vue'
import "codemirror/mode/javascript/javascript.js";

import Echarts from "./Echarts/index.vue"
Vue.component("Echarts", Echarts)

import EchartsDesign from "./EchartsDesign/index.vue"
Vue.component("EchartsDesign", EchartsDesign)

import CoolNavigation from "./CoolNavigation/index.vue"
Vue.component("CoolNavigation", CoolNavigation)

import PerfectBorder from "./PerfectBorder/index.vue"
Vue.component("PerfectBorder", PerfectBorder)

import FlexBoxContainer from "./FlexBoxContainer/index.vue"
Vue.component("FlexBoxContainer", FlexBoxContainer)

import * as echarts from 'echarts';
Vue.prototype.$echart = echarts;

export { Echarts, EchartsDesign, CoolNavigation, PerfectBorder, FlexBoxContainer }