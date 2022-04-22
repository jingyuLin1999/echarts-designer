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
import BaseMixin from "./base.mixin";
export default {
  name: "bar",
  mixins: [BaseMixin],
  methods: {
    defaultFieldAttr() {
      return {
        listenKey: [""],
        attribute: { name: "" },
        dataSource: [],
        codding: "",
        data: {
          title: {
            text: "",
            left: "left",
            textStyle: {
              fontStyle: "normal",
              color: "",
            },
            subtext: "",
          },
          legend: {
            orient: "horizontal",
          },
        },
      };
    },
  },
};
</script>
<style lang="scss">
</style>