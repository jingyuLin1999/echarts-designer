<template>
  <div
    class="echart-hook"
    :id="uuid"
    :style="{ background: echarts.theme }"
  ></div>
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
    "chartData.data": {
      handler() {
        if (this.design) this.redraw();
      },
      deep: true,
    },
    "echarts.theme"() {
      this.chart.dispose();
      this.createChart();
    },
  },
  methods: {
    createChart() {
      this.$nextTick(() => {
        const theme = this.echarts.theme;
        this.chart = this.$echart.init(
          document.getElementById(this.uuid),
          theme == "#110C2A" ? "dark" : theme
        );
        this.chart.setOption(this.chartData.data);
        this.$emit("chartHandle", this.chart);
      });
    },
    redraw() {
      this.chart.setOption(this.chartData.data, true);
    },
    resize() {
      this.chart.resize();
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
