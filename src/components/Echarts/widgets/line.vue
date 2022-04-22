<!-- 
    折线图
-->
<template>
  <div class="line-widget">
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
import BaseMixin from "./base.mixin";
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
.line-widget {
}
</style>