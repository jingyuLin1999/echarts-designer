<!-- 3d图 -->
<template>
  <div class="d3-widget">
    <Base ref="baseRef" :chartData="chartData" :hooks="hooks" :design="design" :echarts="echarts"
      :chartsHandle="chartsHandle" />
  </div>
</template>
<script>
import { clone } from "ramda";
import BaseMixin from "./base.mixin";
import { defaultChartConfig } from "../utils/defaultData";
export default {
  name: "d3Chart",
  mixins: [BaseMixin],
  data() {
    return {
      
    };
  },
  mounted() { },
  watch: {
    "chartData.px.width"() {
      const { px, data } = this.chartData
      const { grid3D } = data;
      grid3D.boxWidth = parseInt(px.width / 2.8);
      this.$refs.baseRef.resize();
    },
    "chartData.px.height"() {
      this.$refs.baseRef.resize();
    },
  },
  methods: {
    defaultFieldAttr() {
      return {
        ...clone(defaultChartConfig),
      };
    },
  },
};
</script>
<style lang="scss"></style>