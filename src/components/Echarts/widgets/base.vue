<template>
  <div
    class="echart-hook"
    :id="uuid"
    :style="{
      width: unit == 'px' ? chartData[unit].width + unit : '100%',
      height: unit == 'px' ? chartData[unit].height - 2 + unit : '100%',
    }"
  ></div>
</template>

<script>
import short from "short-uuid";

export default {
  name: "echarts-base",
  inject: ["unit"],
  props: {
    chartData: { type: Object, default: () => ({}) }, // 表单数据
    design: { type: Boolean, default: true }, // 是否是设计模式
    hooks: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      chart: null,
      uuid: short.generate(),
    };
  },
  mounted() {
    this.createChart();
    this.hooks.redraw = this.redraw;
  },
  watch: {
    "chartData.px.width"() {
      this.redraw();
    },
    "chartData.px.height"() {
      this.redraw();
    },
  },
  methods: {
    async createChart() {
      await this.$nextTick();
      this.chart = this.$echart.init(document.getElementById(this.uuid));
      this.chart.setOption(this.chartData.data);
    },
    redraw() {
      this.chart.resize();
    },
  },
};
</script>
<style lang="scss">
.echart-hook {
}
</style>
