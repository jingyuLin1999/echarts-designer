<template>
  <div class="echart-hook" :id="uuid"></div>
</template>

<script>
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
      chart: null,
      uuid: Math.random().toString(16).slice(2, 12),
    };
  },
  mounted() {
    this.createChart();
    this.hooks.resize = this.resize;
    this.hooks.redraw = this.redraw;
    this.hooks.$echart = this.$echart;
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
      this.chart.dispose();
      this.createChart();
    },
    "chartData.attribute.padding"() {
      this.redraw();
    },
  },
  methods: {
    createChart() {
      this.$nextTick(() => {
        const { theme, background } = this.echarts;
        this.chart = this.$echart.init(
          document.getElementById(this.uuid),
          theme
        );
        const { id, data, attribute } = this.chartData;
        this.chart.setOption(
          Object.assign(data, { backgroundColor: background })
        );
        const { alwaysShow, seriesIndex, dataIndex } = attribute.tooltip;
        if (alwaysShow) {
          setTimeout(() => {
            this.chart.dispatchAction({
              type: "showTip",
              seriesIndex: seriesIndex,
              dataIndex: dataIndex,
            });
          });
        }
        this.chartsHandle[id] = this.chart;
        this.$emit("initialized", this.chart);
      });
    },
    redraw() {
      const { background } = this.echarts;
      let data = Object.assign(this.chartData.data, {
        backgroundColor: background,
      });
      this.chart.setOption(data, true);
    },
    resize() {
      this.chart.resize();
    },
  },
  beforeDestroy() {
    this.chart.dispose();
  },
};
</script>
<style lang="scss">
.echart-hook {
  width: 100%;
  height: 100%;
}
</style>
