<template>
  <div class="echart-hook" :id="uuid"></div>
</template>

<script>
let chart = null;
import "echarts-gl";
import "zrender/lib/svg/svg";
export default {
  name: "echarts-base",
  props: {
    chartData: { type: Object, default: () => ({}) }, // 表单数据
    design: { type: Boolean, default: true }, // 是否是设计模式
    hooks: { type: Object, default: () => ({}) },
    echarts: { type: Object, default: () => ({}) },
    chartsHandle: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      uuid: "ed_" + Math.random().toString(16).slice(2, 12),
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("beforeunload", this.clearChart);
      let chartId = this.chartData.id;
      this.createChart();
      this.hooks.resize[chartId] = this.resize;
      this.hooks.redraw[chartId] = this.redraw;
      this.hooks.chartData[chartId] = this.chartData;
      this.hooks.$echart[chartId] = this.$echart;
    });
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
        // 过滤条件改变导致数据改变或设计模式下
        this.redraw();
      },
      deep: true,
    },
    "echarts.theme"() {
      if (chart) {
        chart.clear();
        chart = null;
      }
      this.createChart();
    },
    "chartData.attribute.padding"() {
      this.redraw();
    },
  },
  methods: {
    createChart() {
      this.$nextTick(() => {
        if (!document.getElementById(this.uuid)) return;
        const { theme, background, renderType } = this.echarts;
        chart = this.$echart.init(document.getElementById(this.uuid), theme, {
          renderer: renderType || "canvas", // canvas  svg
        });
        const { id, data, attribute } = this.chartData;
        chart.setOption(Object.assign(data, { backgroundColor: background }));
        const { alwaysShow, seriesIndex, dataIndex } = attribute.tooltip;
        if (alwaysShow) {
          setTimeout(() => {
            chart.dispatchAction({
              type: "showTip",
              seriesIndex: seriesIndex,
              dataIndex: dataIndex,
            });
          });
        }
        this.chartsHandle[id] = chart;
        this.$emit("initialized", chart);
      });
    },
    redraw() {
      if (chart) {
        const { background } = this.echarts;
        let data = Object.assign(this.chartData.data, {
          backgroundColor: background,
        });
        chart.setOption(data, true);
      }
    },
    resize() {
      if (chart) chart.resize();
    },
    clearChart() {
      // 手动触发 destroy 相关的生命周期
      this.$destroy();
    },
  },
  beforeDestroy() {
    // 清空 beforeunload 事件处理函数
    window.removeEventListener("beforeunload", this.clearChart);
    if (chart) {
      // chart.dispose();
      chart.clear();
      chart = null;
    }
  },
};
</script>
<style lang="scss">
.echart-hook {
  width: 100%;
  height: 100%;
}
</style>
