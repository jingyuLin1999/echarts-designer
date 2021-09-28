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
      return {};
    },
  },
};
</script>
<style lang="scss">
</style>