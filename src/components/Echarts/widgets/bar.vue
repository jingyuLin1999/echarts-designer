<!--  柱形图 -->
<template>
  <div class="bar-widget">
    <Base
      :chartData="chartData"
      :hooks="hooks"
      :design="design"
      :echarts="echarts"
      :chartsHandle="chartsHandle"
      @initialized="_registerChartEvent"
    />
  </div>
</template>
<script>
import { clone } from "ramda";
import BaseMixin from "./base.mixin";
import { defaultChartConfig } from "../utils/defaultData";
export default {
  name: "bar",
  mixins: [BaseMixin],
  methods: {
    defaultFieldAttr() {
      return {
        ...clone(defaultChartConfig),
      };
    },
  },
};
</script>
<style lang="scss">
</style>