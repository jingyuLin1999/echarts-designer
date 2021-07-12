<template>
  <div
    class="echart-hook"
    :id="uuid"
    :style="{
      width: chartData.width + unit,
      height: chartData.height - 2 + unit,
    }"
  ></div>
</template>

<script>
import short from "short-uuid";
import * as echarts from "echarts";

export default {
  name: "echarts-base",
  props: {
    chartData: { type: Object, default: () => ({}) }, // 表单数据
  },
  inject: ["unit"],
  data() {
    return {
      uuid: short.generate(),
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    "chartData.width"() {
      this.redraw();
    },
    "chartData.height"() {
      this.redraw();
    },
  },
  methods: {
    async createChart() {
      await this.$nextTick();
      this.chart = this.$echart.init(document.getElementById(this.uuid));
      this.chart.setOption(this.chartData.chart);
    },
    redraw() {
      if (this.chartData.width) {
        this.chart.resize();
      }
    },
  },
};
</script>
<style lang="scss">
.echart-hook {
}
</style>
