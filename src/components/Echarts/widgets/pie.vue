<!-- 
    饼图
-->
<template>
  <div class="pie-widget">
    <Base
      :chartData="chartData"
      :hooks="hooks"
      :design="design"
      :echarts="echarts"
      :chartsHandle="chartsHandle"
    />
  </div>
</template>
<script>
import { clone } from "ramda";
import BaseMixin from "./base.mixin";
import { defaultChartConfig } from "../utils/defaultData";
export default {
  name: "basicline",
  mixins: [BaseMixin],
  data() {
    return {};
  },
  mounted() {},
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
.pie-widget {
}
</style>