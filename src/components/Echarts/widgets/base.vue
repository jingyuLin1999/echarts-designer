<template>
  <div class="echart-hook" :id="uuid"></div>
</template>

<script>
import short from "short-uuid";

export default {
  name: "echarts-base",
  props: {
    chartData: { type: Object, default: () => ({}) }, // 表单数据
    design: { type: Boolean, default: true }, // 是否是设计模式
    hooks: { type: Object, default: () => ({}) },
    echarts: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      chart: null,
      uuid: short.generate(),
    };
  },
  mounted() {
    this.createChart();
    this.hooks.resize = this.resize;
    this.hooks.redraw = this.redraw;
  },
  watch: {
    "chartData.px.width"() {
      this.resize();
    },
    "chartData.px.height"() {
      this.resize();
    },
    "chartData.data"() {
      this.redraw();
    },
  },
  methods: {
    redraw() {
      this.chart.setOption(this.chartData.data, true);
    },
    resize() {
      this.chart.resize();
    },
    createChart() {
      this.$nextTick(() => {
        this.chart = this.$echart.init(
          document.getElementById(this.uuid),
          this.echarts.bgColor
        );
        this.chart.setOption(this.chartData.data);
      });
    },
  },
};
</script>
<style lang="scss">
.echart-hook {
  width: 100%;
  height: 100%;
}
</style>
