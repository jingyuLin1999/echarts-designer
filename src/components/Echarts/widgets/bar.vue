<!-- 
    bar chart
-->
<template>
  <div class="bar-wrapper">
    <Base
      :chartData="chartData"
      :hooks="hooks"
      :design="design"
      :echarts="echarts"
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
        title: {
          // 标题
          text: "", // 主标题
          subtext: "", // 副标题
        },
      };
    },
  },
};
</script>
<style lang="scss">
</style>